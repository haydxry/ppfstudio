function istanbulToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const part = type => parts.find(item => item.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
function displayVisitDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Gün seçilmedi';
  const [year,month,day] = value.split('-');
  return `${day}.${month}.${year}`;
}
function quoteMessage(form) {
  const values = new FormData(form);
  const value = name => String(values.get(name) || '').trim();
  const visit = value('requestKind') === 'visit';
  const lines = [
    visit ? 'Merhaba Berk PPF Studio, aracım için stüdyo ziyareti planlamak istiyorum.' : 'Merhaba Berk PPF Studio, aracım için bilgi ve teklif almak istiyorum.',
    '',
    `Marka: ${value('brand') || 'Henüz yazılmadı'}`,
    `Model: ${value('model') || 'Henüz yazılmadı'}`,
    ...(value('year') ? [`Model yılı: ${value('year')}`] : []),
    `Hizmet: ${value('service')}`,
    ...(value('note') ? [`Not: ${value('note')}`] : []),
    ...(form.dataset.advisorContext ? [`Koruma seçimi: ${form.dataset.advisorContext}`] : []),
    ...(visit ? ['', `Tercih edilen gün: ${displayVisitDate(value('visitDate'))}`, `Zaman tercihi: ${value('visitTime')}`, 'Bu gün ve zaman için uygunluğunuzu teyit edebilir misiniz?'] : [])
  ];
  return lines.join('\n');
}
const quoteForm = document.querySelector('#quote');
function updateRequestSummary() {
  if (!quoteForm) return;
  const visit = quoteForm.elements.requestKind.value === 'visit';
  const date = quoteForm.elements.visitDate;
  document.querySelector('#visit-fields').hidden = !visit;
  date.disabled = !visit;
  date.required = visit;
  date.min = istanbulToday();
  quoteForm.elements.visitTime.disabled = !visit;
  const missing = [];
  if (!quoteForm.elements.brand.value.trim()) missing.push('marka');
  if (!quoteForm.elements.model.value.trim()) missing.push('model');
  if (visit && (!date.value || !date.validity.valid)) missing.push('bugün veya sonrası için ziyaret günü');
  if (!quoteForm.elements.year.validity.valid) missing.push('dört rakamlı model yılı');
  const readiness = document.querySelector('#request-readiness');
  const status = missing.length ? `Tamamlanacak: ${missing.join(', ')}.` : 'Mesajınız hazır. Bilgileri kontrol edip WhatsApp’ta açabilirsiniz.';
  if (readiness.textContent !== status) readiness.textContent = status;
  readiness.classList.toggle('ready', missing.length === 0);
  document.querySelector('#request-preview').textContent = quoteMessage(quoteForm);
}
if (quoteForm) {
  quoteForm.addEventListener('input', updateRequestSummary);
  quoteForm.addEventListener('change', updateRequestSummary);
  quoteForm.addEventListener('submit', event => {
    event.preventDefault();
    for (const name of ['brand','model']) quoteForm.elements.namedItem(name).value = quoteForm.elements.namedItem(name).value.trim();
    updateRequestSummary();
    if (!quoteForm.reportValidity()) return;
    window.location.assign(`https://wa.me/905301512808?text=${encodeURIComponent(quoteMessage(quoteForm))}`);
  });
  updateRequestSummary();
  window.addEventListener('pageshow', updateRequestSummary);
}

const advisorPriority = document.querySelector('#priority');
const advisorDriving = document.querySelector('#driving');
const recommendations = {
  front: {service:'Bölgesel PPF kaplama', reason:'Ön bölge koruması için tampon, kaput ve aynaların birlikte değerlendirilmesiyle başlayabilirsiniz.'},
  full: {service:'Komple PPF kaplama', reason:'Tüm boyalı dış yüzeylerde koruma isteğiniz için komple PPF kapsamını görüşebilirsiniz.'},
  care: {service:'Seramik kaplama', reason:'Parlaklık ve kolay temizlik önceliğiniz için seramik kaplamayı değerlendirebilirsiniz. Seramik kaplama, taş izlerine karşı PPF ile aynı korumayı sağlamaz.'},
  paint: {service:'Boya düzeltme', reason:'Mevcut hare ve yüzey kusurları için önce boya durumunun incelenmesini görüşebilirsiniz. Uygun işlem, kusurun derinliği ve boya durumuna göre belirlenir.'}
};
function updateRecommendation() {
  const recommendation = recommendations[advisorPriority.value];
  document.querySelector('#recommendation-title').textContent = recommendation.service;
  const roadNote = advisorDriving.value === 'highway' && ['front','full'].includes(advisorPriority.value)
    ? ' Uzun yol kullanımınızı da belirterek ön panellerin kapsamını stüdyoyla netleştirin.' : '';
  document.querySelector('#recommendation-reason').textContent = recommendation.reason + roadNote;
  document.querySelector('#recommendation-status').textContent = '';
}
if (advisorPriority && advisorDriving) {
  advisorPriority.addEventListener('change', updateRecommendation);
  advisorDriving.addEventListener('change', updateRecommendation);
  document.querySelector('#apply-recommendation').addEventListener('click', () => {
    const form = document.querySelector('#quote');
    form.elements.namedItem('service').value = recommendations[advisorPriority.value].service;
    form.dataset.advisorContext = `${advisorDriving.selectedOptions[0].textContent}; öncelik: ${advisorPriority.selectedOptions[0].textContent}`;
    updateRequestSummary();
    document.querySelector('#recommendation-status').textContent = 'Öneriniz teklif formuna eklendi. Araç bilgilerinizi tamamlayın.';
    form.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    form.elements.namedItem('brand').focus({preventScroll:true});
  });
}

const faqFilters = document.querySelectorAll('[data-faq-filter]');
faqFilters.forEach(button => button.addEventListener('click', () => {
  const topic = button.dataset.faqFilter;
  faqFilters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  let visibleCount = 0;
  document.querySelectorAll('[data-faq-topic]').forEach(item => {
    const visible = topic === 'all' || item.dataset.faqTopic === topic || item.dataset.faqTopic === 'genel';
    item.hidden = !visible;
    if (!visible) item.open = false;
    if (visible) visibleCount++;
  });
  document.querySelector('#faq-count').textContent = `${visibleCount} soru gösteriliyor`;
  document.querySelector('#question-topic').value = topic;
}));
document.querySelector('#ask-question')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const question = form.elements.namedItem('question');
  question.value = question.value.trim();
  if (!form.reportValidity()) return;
  const topic = form.elements.namedItem('topic').selectedOptions[0].textContent;
  const message = `Merhaba Berk PPF Studio, bir sorum var.\nHizmet: ${topic}\nSorum: ${question.value}`;
  window.location.assign(`https://wa.me/905301512808?text=${encodeURIComponent(message)}`);
});
