# The Golden Era — Landing Page de Formatura
> Comissão de Formatura · Insper 2027

## Estrutura de Arquivos

```
formo-landing/
├── index.html          ← Arquivo principal (abra no browser)
├── css/
│   └── style.css       ← Todo o estilo (cores, tipografia, layout)
├── js/
│   └── main.js         ← Interações (nav, countdown, ticker, formulário)
└── assets/
    └── (coloque sua logo aqui)
```

---

## Como Usar no VSCode

1. Abra a pasta `formo-landing` no VSCode
2. Instale a extensão **Live Server** (ritwickdey.LiveServer)
3. Clique com botão direito em `index.html` → **Open with Live Server**
4. O site abrirá automaticamente no browser com hot reload

---

## Personalizações Principais

### 🖼️ Logo
**Opção 1 — Arrastar & Soltar:** Arraste sua logo direto para o círculo no topo da página.
**Opção 2 — Código:** No `index.html`, localize o bloco `.logo-placeholder` e substitua por:
```html
<img src="assets/sua-logo.png" alt="Logo Formatura" />
```

### 📅 Data da Live (countdown)
Em `js/main.js`, linha ~60:
```js
const LIVE_DATE = new Date('2027-09-01T20:00:00'); // ← altere aqui
```

### 📅 Data do Baile (dias restantes)
Em `js/main.js`, linha ~120:
```js
const EVENT_DATE = new Date('2027-11-20T00:00:00'); // ← altere aqui
```

### 📋 Formulário de Cadastro
Em `js/main.js`, localize o comentário `INTEGRAÇÃO COM BACKEND` e substitua pela sua
chamada à API (Google Sheets, Notion, Mailchimp, etc.).

### 🎨 Cores
Em `css/style.css`, as variáveis no `:root` controlam tudo:
```css
--paper:   #f2e0b8;   /* cor do papel */
--ink:     #1a1008;   /* cor do texto/tinta */
--gold:    #c49a2a;   /* dourado */
--rust:    #8b3a1c;   /* vermelho ferrugem (letras maiores) */
```

### ✉️ Ticker (notícias da semana)
No `index.html`, localize a section `.news-ticker` e edite os `<span>` de notícias.

### 🗓️ Textos de Conteúdo
Cada seção (`#precadastro`, `#lancamento`, `#sorteios`, `#baile`) está comentada
no `index.html` — edite diretamente os textos nos artigos.

---

## Deploy

Para publicar online (sem backend), você pode usar:
- **Netlify** — arraste a pasta para netlify.com/drop
- **Vercel** — `vercel deploy` via CLI
- **GitHub Pages** — push para repositório público

---

*The Golden Drive · Departure → Acceleration → Connection → Arrival → Dawn*
