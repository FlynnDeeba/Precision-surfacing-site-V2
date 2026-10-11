
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
