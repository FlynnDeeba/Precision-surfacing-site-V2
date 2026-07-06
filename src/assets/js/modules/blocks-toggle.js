/**
 * Blocks Toggle Module
 * Opens an inline detail card above the grid when a block type card is clicked.
 * Colour swatches let the user browse variants within that type.
 */

export function initBlocksToggle() {
  const section = document.getElementById('blocksSection');
  if (!section) return;

  const dataScript = document.getElementById('blockTypesData');
  if (!dataScript) return;

  const types = JSON.parse(dataScript.textContent);
  const cards = section.querySelectorAll('.block-type-card');
  const detailCard = document.getElementById('blockDetailCard');
  if (!detailCard) return;

  const detailImg = detailCard.querySelector('.block-detail-img');
  const detailGradient = detailCard.querySelector('.block-detail-gradient');
  const detailName = detailCard.querySelector('.block-detail-name');
  const detailTypeDesc = detailCard.querySelector('.block-detail-type-desc');
  const detailSwatches = document.getElementById('blockDetailSwatches');
  const detailClose = detailCard.querySelector('.block-detail-close');

  let activeIndex = -1;

  function showColour(colour, typeName) {
    if (colour.image) {
      detailImg.src = colour.image;
      detailImg.alt = `${typeName} – ${colour.name} block paving`;
      detailImg.style.display = 'block';
      detailGradient.style.display = 'none';
    } else {
      detailImg.style.display = 'none';
      detailGradient.style.display = 'block';
      detailGradient.style.background = colour.gradient || '';
    }
  }

  function buildSwatches(type, activeColourIndex) {
    detailSwatches.innerHTML = '';

    type.colours.forEach((colour, i) => {
      const swatch = document.createElement('div');
      swatch.className = 'block-detail-swatch' + (i === activeColourIndex ? ' active' : '');

      const thumb = document.createElement('div');
      thumb.className = 'swatch-thumb';

      if (colour.image) {
        const img = document.createElement('img');
        img.src = colour.image;
        img.alt = colour.name;
        img.loading = 'lazy';
        thumb.appendChild(img);
      } else {
        const grad = document.createElement('div');
        grad.className = 'swatch-gradient';
        grad.style.background = colour.gradient || '';
        thumb.appendChild(grad);
      }

      const label = document.createElement('span');
      label.className = 'swatch-label';
      label.textContent = colour.name;

      swatch.appendChild(thumb);
      swatch.appendChild(label);

      swatch.addEventListener('click', () => {
        detailSwatches.querySelectorAll('.block-detail-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        showColour(colour, type.name);
      });

      detailSwatches.appendChild(swatch);
    });
  }

  function openDetail(index) {
    const type = types[index];
    detailName.textContent = type.name;
    detailTypeDesc.textContent = type.description;
    showColour(type.colours[0], type.name);
    buildSwatches(type, 0);

    cards.forEach((c, i) => c.classList.toggle('is-selected', i === index));
    activeIndex = index;
    detailCard.classList.add('active');

    // Scroll so the detail card is visible
    setTimeout(() => {
      detailCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  }

  function closeDetail() {
    detailCard.classList.remove('active');
    cards.forEach(c => c.classList.remove('is-selected'));
    activeIndex = -1;
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (activeIndex === index) {
        closeDetail();
      } else {
        openDetail(index);
      }
    });
  });

  detailClose.addEventListener('click', closeDetail);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && detailCard.classList.contains('active')) {
      closeDetail();
    }
  });
}
