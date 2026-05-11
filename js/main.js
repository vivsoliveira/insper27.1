/* ═══════════════════════════════════════════════════════════════
   THE GOLDEN ERA — main.js
   Funções: navegação entre páginas, ticker, countdown, formulário
   ═══════════════════════════════════════════════════════════════ */

// ────────────────────────────────────────────────────────────────
// 1. DATA ATUAL NO MASTHEAD
// ────────────────────────────────────────────────────────────────
(function setCurrentDate() {
  const el = document.getElementById('current-date');
  if (!el) return;
  const now = new Date();
  const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  el.textContent = now.toLocaleDateString('pt-BR', opts);
})();


// ────────────────────────────────────────────────────────────────
// 2. NAVEGAÇÃO ENTRE PÁGINAS
// ────────────────────────────────────────────────────────────────
const navButtons = document.querySelectorAll('.nav-btn');
const pages      = document.querySelectorAll('.page');

/**
 * Navega para a seção indicada pelo ID.
 * @param {string} targetId — ex: 'precadastro', 'lancamento', 'sorteios', 'baile'
 */
function navigateTo(targetId) {
  // Remove active de tudo
  pages.forEach(p => {
    p.classList.remove('active');
  });
  navButtons.forEach(b => b.classList.remove('active'));

  // Ativa a página alvo
  const targetPage = document.getElementById(targetId);
  const targetBtn  = document.querySelector(`.nav-btn[data-target="${targetId}"]`);

  if (targetPage) {
    // Força re-trigger da animação
    targetPage.classList.remove('active');
    void targetPage.offsetWidth; // reflow
    targetPage.classList.add('active');
  }
  if (targetBtn) targetBtn.classList.add('active');

  // Scroll suave até o topo do jornal
  const newspaper = document.getElementById('newspaper-main');
  if (newspaper) {
    newspaper.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Ouve cliques nos botões de nav
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    if (target) navigateTo(target);
  });
});

// Expõe globalmente (usado no HTML com onclick)
window.navigateTo = navigateTo;


// ────────────────────────────────────────────────────────────────
// 3. TICKER — duplicação automática para loop perfeito
// ────────────────────────────────────────────────────────────────
(function setupTicker() {
  const content = document.getElementById('ticker-content');
  if (!content) return;

  // Duplica o conteúdo para loop contínuo
  const clone = content.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  content.parentNode.appendChild(clone);

  // Ajusta a velocidade se o texto for muito curto ou longo
  const totalWidth = content.scrollWidth;
  const speed = Math.max(20, totalWidth / 40); // segundos
  content.style.animationDuration = `${speed}s`;
  clone.style.animationDuration   = `${speed}s`;
})();


// ────────────────────────────────────────────────────────────────
// 4. COUNTDOWN — defina a data da live abaixo
// ────────────────────────────────────────────────────────────────
(function setupCountdown() {
  // ⚠️ ALTERE A DATA DA LIVE AQUI (formato: 'YYYY-MM-DDTHH:MM:SS')
  const LIVE_DATE = new Date('2026-05-17T20:00:00');

  const els = {
    days:    document.getElementById('cd-days'),
    hours:   document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const now  = new Date();
    const diff = LIVE_DATE - now;

    if (diff <= 0) {
      if (els.days)    els.days.textContent    = '00';
      if (els.hours)   els.hours.textContent   = '00';
      if (els.minutes) els.minutes.textContent = '00';
      if (els.seconds) els.seconds.textContent = '00';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (els.days)    els.days.textContent    = pad(days);
    if (els.hours)   els.hours.textContent   = pad(hours);
    if (els.minutes) els.minutes.textContent = pad(minutes);
    if (els.seconds) els.seconds.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();


// ────────────────────────────────────────────────────────────────
// 5. FORMULÁRIO DE PRÉ-CADASTRO
// ────────────────────────────────────────────────────────────────
(function setupForm() {
  const form     = document.getElementById('cadastro-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome  = form.nome.value.trim();
    const email = form.email.value.trim();

    if (!nome || !email) {
      feedback.textContent = '⚠ Preencha nome e e-mail.';
      feedback.style.color = '#e07050';
      return;
    }

    // ──────────────────────────────────────────────────────────────
    // INTEGRAÇÃO COM BACKEND / PLANILHA
    // Substitua o bloco abaixo pela sua lógica real:
    //
    //   fetch('/api/cadastro', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ nome, email, curso: form.curso.value })
    //   })
    //   .then(r => r.json())
    //   .then(data => { feedback.textContent = '✦ Cadastro confirmado!'; })
    //   .catch(err => { feedback.textContent = 'Erro ao cadastrar.'; });
    //
    // Por ora, simula um cadastro bem-sucedido:
    // ──────────────────────────────────────────────────────────────
    feedback.textContent = '✦ Cadastro confirmado! Bem-vindo(a) à estrada.';
    feedback.style.color = '#c49a2a';

    // Atualiza o contador de inscritos (simulado)
    const cntInscritos = document.getElementById('cnt-inscritos');
    if (cntInscritos) {
      const atual = parseInt(cntInscritos.textContent.replace(/\D/g, ''), 10);
      animateCounter(cntInscritos, atual, atual + 1, 600);
    }

    form.reset();
  });
})();


// ────────────────────────────────────────────────────────────────
// 6. ANIMAÇÃO DE CONTADORES (efeito typewriter numérico)
// ────────────────────────────────────────────────────────────────
/**
 * Anima um elemento de texto de `from` até `to`.
 * @param {HTMLElement} el
 * @param {number} from
 * @param {number} to
 * @param {number} duration — ms
 */
function animateCounter(el, from, to, duration) {
  const start = performance.now();
  const range = to - from;

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(from + range * eased).toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// Anima os contadores ao entrar na view (IntersectionObserver)
(function observeCounters() {
  const counters = document.querySelectorAll('.counter__num[id]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const finalValue = parseInt(el.textContent.replace(/\D/g, ''), 10);
      animateCounter(el, 0, finalValue, 1200);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();


// ────────────────────────────────────────────────────────────────
// 7. DIAS RESTANTES (dinâmico)
// ────────────────────────────────────────────────────────────────
(function setupPreCadastroCountdown() {
  const el = document.getElementById('cnt-days');
  if (!el) return;

  const EVENT_DATE = new Date('2026-05-13T11:30:00');

  function update() {
    const diff  = EVENT_DATE - new Date();
    el.textContent = diff <= 0 ? '0' : Math.ceil(diff / (1000 * 60 * 60));
  }

  update();
  setInterval(update, 60000);
})();


// ────────────────────────────────────────────────────────────────
// 8. LINK DO PRÉ-CADASTRO — visível apenas 13/05 09h → 16/05 00h
// ────────────────────────────────────────────────────────────────
(function controlPrecadastroLink() {
  const OPEN  = new Date('2026-05-13T09:00:00');
  const CLOSE = new Date('2026-05-16T00:00:00');

  const soon      = document.getElementById('precadastro-soon');
  const open      = document.getElementById('precadastro-open');
  const onlineTxt = document.getElementById('online-link-text');

  function check() {
    const now    = new Date();
    const active = now >= OPEN && now < CLOSE;

    if (soon) soon.style.display = active ? 'none'  : '';
    if (open) open.style.display = active ? ''      : 'none';

    if (onlineTxt) {
      onlineTxt.innerHTML = active
        ? '<a href="https://www.eformei.com.br/sistema/cadastro_aluno.php?turma=199766" target="_blank" rel="noopener" style="color:inherit;">Acessar link — apenas cadastro, sem brinde ou sorteio</a>'
        : 'Link em breve — apenas cadastro, sem brinde ou sorteio';
    }
  }

  check();
  setInterval(check, 60000);
})();

// ────────────────────────────────────────────────────────────────
// 9. LOGO — drag & drop / clique para upload (preview)
// ────────────────────────────────────────────────────────────────
(function setupLogoUpload() {
  const slot = document.querySelector('.logo-placeholder');
  if (!slot) return;

  // Cria input de arquivo oculto
  const input = document.createElement('input');
  input.type   = 'file';
  input.accept = 'image/*';
  input.style.display = 'none';
  document.body.appendChild(input);

  slot.addEventListener('click', () => input.click());

  slot.addEventListener('dragover', e => {
    e.preventDefault();
    slot.style.borderColor = 'var(--gold)';
  });
  slot.addEventListener('dragleave', () => {
    slot.style.borderColor = '';
  });
  slot.addEventListener('drop', e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) applyLogo(file);
  });

  input.addEventListener('change', () => {
    if (input.files[0]) applyLogo(input.files[0]);
  });

  function applyLogo(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      slot.innerHTML = `<img src="${e.target.result}" alt="Logo Formatura" />`;
      slot.style.border = 'none';
      slot.style.background = 'transparent';
    };
    reader.readAsDataURL(file);
  }
})();
