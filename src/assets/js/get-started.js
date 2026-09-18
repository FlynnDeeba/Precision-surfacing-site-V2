
(function(){
  var data={service:[],application:"",size:"",timeline:"",name:"",postcode:"",phone:"",email:"",notes:""};
  var step=1, TOTAL=4;
  var steps=document.querySelectorAll('.step');
  var count=document.getElementById('count');
  var back=document.getElementById('back'), next=document.getElementById('next');

  function pad(n){return n<10?'0'+n:''+n;}
  function render(){
    steps.forEach(function(s){s.classList.toggle('active', +s.dataset.step===step);});
    count.innerHTML='<b>'+pad(step)+'</b> / '+pad(TOTAL);
    back.classList.toggle('hide', step===1);
    next.firstChild.textContent = (step===TOTAL ? 'Request my quote ' : 'Continue ');
    updateReady();
    document.querySelectorAll('.rail-steps li').forEach(function(li){
      var n=+li.dataset.rstep;
      li.classList.toggle('active', n===step);
      li.classList.toggle('done', n<step);
    });
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function isComplete(s){
    if(s===1) return data.service.length>0;
    if(s===2) return !!data.application;
    if(s===3) return !!data.timeline;
    if(s===4){
      var nm=document.getElementById('name').value.trim();
      var pc=document.getElementById('pc').value.trim();
      var ph=document.getElementById('phone').value.trim();
      var em=document.getElementById('email').value.trim();
      return !!nm && !!pc && !!ph && validEmail(em);
    }
    return true;
  }
  function updateReady(){ next.classList.toggle('ready', isComplete(step)); }

  /* service cards */
  /* surface cards — multi-select */
  document.getElementById('svc').addEventListener('click',function(e){
    var c=e.target.closest('.card'); if(!c)return;
    if(c.classList.contains('any')){
      var turnOn=!c.classList.contains('sel');
      document.querySelectorAll('#svc .card').forEach(function(x){x.classList.remove('sel');x.setAttribute('aria-pressed','false');});
      if(turnOn){c.classList.add('sel');c.setAttribute('aria-pressed','true');}
    } else {
      var any=document.querySelector('#svc .card.any');
      if(any){any.classList.remove('sel');any.setAttribute('aria-pressed','false');}
      var on=c.classList.toggle('sel');
      c.setAttribute('aria-pressed',on?'true':'false');
    }
    data.service=[].slice.call(document.querySelectorAll('#svc .card.sel')).map(function(x){return x.dataset.val;});
    updateReady();
  });

  /* single-select groups (cards + segmented bars) */
  function wireSelect(containerId, childSel, field, groupId){
    var box=document.getElementById(containerId); if(!box)return;
    box.addEventListener('click',function(e){
      var c=e.target.closest(childSel); if(!c||!box.contains(c))return;
      box.querySelectorAll(childSel).forEach(function(x){x.classList.remove('sel');});
      c.classList.add('sel'); data[field]=c.dataset.val;
      if(groupId) document.getElementById(groupId).classList.remove('err');
      updateReady();
    });
  }
  wireSelect('appgrid','.appcard','application','g-app');
  wireSelect('sizebar','.seg','size',null);
  wireSelect('timebar','.seg','timeline','g-time');
  ['name','pc','phone','email'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.addEventListener('input',updateReady);
  });

  /* optional photos (step 3) — resized in-browser so the payload stays well
     under Netlify's 6MB function body limit (base64 adds ~33% on top). */
  var MAX_PHOTOS=4, MAX_EDGE=1600, JPEG_Q=0.72, MAX_B64=3.6*1024*1024;
  var photos=[];
  var phInput=document.getElementById('photos');
  var phDrop=document.getElementById('phDrop');
  var phList=document.getElementById('phList');
  var phNote=document.getElementById('phNote');

  function phTotal(){var n=0;photos.forEach(function(p){n+=p.bytes;});return n;}
  function setNote(msg,warn){
    if(!phNote)return;
    if(!msg){phNote.hidden=true;phNote.textContent='';phNote.classList.remove('warn');return;}
    phNote.hidden=false;phNote.textContent=msg;phNote.classList.toggle('warn',!!warn);
  }
  function renderPhotos(){
    if(!phList)return;
    phList.innerHTML='';
    phList.hidden=!photos.length;
    photos.forEach(function(p,i){
      var cell=document.createElement('div'); cell.className='ph-item';
      var im=document.createElement('img'); im.src=p.dataUrl; im.alt=p.name;
      var x=document.createElement('button');
      x.type='button'; x.className='ph-x'; x.innerHTML='&times;';
      x.setAttribute('aria-label','Remove '+p.name);
      x.addEventListener('click',function(){photos.splice(i,1);renderPhotos();});
      cell.appendChild(im); cell.appendChild(x); phList.appendChild(cell);
    });
    var t=phDrop&&phDrop.querySelector('.ph-drop-t');
    if(t) t.textContent = photos.length ? 'Add another photo' : 'Add photos of the area';
    setNote(photos.length ? photos.length+' of '+MAX_PHOTOS+' added' : '');
  }

  /* draw to a canvas at a sane size and re-encode as JPEG */
  function shrink(file){
    return new Promise(function(resolve,reject){
      var url=URL.createObjectURL(file), img=new Image();
      img.onload=function(){
        URL.revokeObjectURL(url);
        var scale=Math.min(1, MAX_EDGE/Math.max(img.naturalWidth,img.naturalHeight));
        var w=Math.max(1,Math.round(img.naturalWidth*scale));
        var h=Math.max(1,Math.round(img.naturalHeight*scale));
        var cv=document.createElement('canvas'); cv.width=w; cv.height=h;
        var cx=cv.getContext('2d');
        cx.fillStyle='#fff'; cx.fillRect(0,0,w,h);   /* flatten alpha for JPEG */
        cx.drawImage(img,0,0,w,h);
        var dataUrl=cv.toDataURL('image/jpeg',JPEG_Q);
        var b64=dataUrl.slice(dataUrl.indexOf(',')+1);
        if(!b64){reject();return;}
        resolve({dataUrl:dataUrl,b64:b64,bytes:b64.length});
      };
      img.onerror=function(){URL.revokeObjectURL(url);reject();};
      img.src=url;
    });
  }

  function addFiles(list){
    var picked=[].slice.call(list||[]).filter(function(f){return /^image\//.test(f.type);});
    if(!picked.length)return;
    var room=MAX_PHOTOS-photos.length;
    if(room<=0){setNote('You can attach up to '+MAX_PHOTOS+' photos.',true);return;}
    var overflow=picked.length-room;
    picked=picked.slice(0,room);
    setNote('Processing…');
    Promise.all(picked.map(function(f){
      return shrink(f).then(function(r){
        return {name:f.name||'photo',dataUrl:r.dataUrl,b64:r.b64,bytes:r.bytes};
      }).catch(function(){return null;});
    })).then(function(done){
      var dropped=0;
      done.forEach(function(p){
        if(!p||phTotal()+p.bytes>MAX_B64){dropped++;return;}
        photos.push(p);
      });
      renderPhotos();
      if(overflow>0) setNote('Only the first '+MAX_PHOTOS+' photos were added.',true);
      else if(dropped) setNote(dropped+(dropped>1?' photos':' photo')+" couldn't be added — try a smaller image.",true);
    });
  }

  if(phInput&&phDrop){
    phInput.addEventListener('change',function(){addFiles(phInput.files);phInput.value='';});
    ['dragenter','dragover'].forEach(function(ev){
      phDrop.addEventListener(ev,function(e){e.preventDefault();phDrop.classList.add('drag');});
    });
    ['dragleave','drop'].forEach(function(ev){
      phDrop.addEventListener(ev,function(e){e.preventDefault();phDrop.classList.remove('drag');});
    });
    phDrop.addEventListener('drop',function(e){
      if(e.dataTransfer&&e.dataTransfer.files) addFiles(e.dataTransfer.files);
    });
  }

  function setErr(id,on){document.getElementById(id).classList.toggle('err',on);}
  function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}

  function validate(){
    if(step===1){
      if(!data.service.length){flash(next);return false;}
      return true;
    }
    if(step===2){
      if(!data.application){document.getElementById('g-app').classList.add('err');return false;}
      return true;
    }
    if(step===3){
      if(!data.timeline){document.getElementById('g-time').classList.add('err');return false;}
      return true;
    }
    if(step===4){
      data.name=document.getElementById('name').value.trim();
      data.postcode=document.getElementById('pc').value.trim();
      data.phone=document.getElementById('phone').value.trim();
      data.email=document.getElementById('email').value.trim();
      data.notes=document.getElementById('notes').value.trim();
      var ok=true;
      setErr('f-name',!data.name); if(!data.name)ok=false;
      setErr('f-pc',!data.postcode); if(!data.postcode)ok=false;
      setErr('f-phone',!data.phone); if(!data.phone)ok=false;
      var emOk=validEmail(data.email); setErr('f-email',!emOk); if(!emOk)ok=false;
      return ok;
    }
    return true;
  }

  function flash(el){el.animate([{transform:'translateX(0)'},{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(0)'}],{duration:240});}

  next.addEventListener('click',function(){
    if(!validate())return;
    if(step<TOTAL){step++;render();}
    else{submit();}
  });
  back.addEventListener('click',function(){if(step>1){step--;render();}});

  function submit(){
    var hp=document.getElementById('hp'); data.company = hp ? hp.value : '';
    data.photos = photos.map(function(p,i){
      return {filename:'photo-'+(i+1)+'.jpg', content:p.b64};
    });
    next.disabled=true; next.firstChild.textContent='Sending… ';
    fetch('/.netlify/functions/submit-lead',{
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)
    }).then(function(r){return r.ok;}).catch(function(){return false;})
      .then(function(ok){ next.disabled=false; showDone(ok); });
  }
  function showDone(ok){
    document.querySelectorAll('.step').forEach(function(s){s.style.display='none';});
    document.getElementById('nav').style.display='none';
    count.innerHTML='<b>Done</b>';
    document.querySelectorAll('.rail-steps li').forEach(function(li){li.classList.remove('active');li.classList.add('done');});
    var nm=data.name?(', '+data.name):'';
    if(!ok){
      document.getElementById('doneTitle').innerHTML='Almost <em>there.</em>';
      document.getElementById('doneBody').innerHTML='Sorry — something went wrong sending your request. Please call <strong>07836 441717</strong> or email <strong>info@psurfacing.co.uk</strong> and we’ll sort it right away.';
      document.getElementById('done').classList.add('show');
      window.scrollTo({top:0,behavior:'smooth'});
      return;
    }
    document.getElementById('doneTitle').innerHTML='Request <em>received.</em>';
    var svc=data.service.length?data.service.join(', '):'surfacing';
    document.getElementById('doneBody').textContent='Thanks'+nm+' — your '+svc.toLowerCase()+' enquiry is in. We\u2019ll be in touch within one working day to book your free site visit.';
    document.getElementById('done').classList.add('show');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  render();
})();
