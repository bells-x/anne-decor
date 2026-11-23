# Anne Decorações — onde a sua ideia ganha forma

Site institucional e de encomendas para um ateliê de decorações artesanais para bebês.
Página única, sem dependências de build: basta abrir o `index.html` no navegador.

## O que tem no site

- **Criações:** detalhe de porta para maternidade, laços para RN, roupinhas de crochê,
  letreiros, decoração de cabeceira, porta-algodões e porta-cotonetes.
- **Personalização:** cada peça é feita sob encomenda, com nome do bebê, tema e paleta de cores.
- **Como encomendar:** três passos, do primeiro contato à entrega.
- **Depoimentos, dúvidas frequentes e formulário de pedido** que monta a mensagem e abre o WhatsApp.
- **Ilustrações em SVG** feitas sob medida (nenhuma foto externa é necessária).
- **Borboletas decorativas** animadas, como um jardim fofo.

## Estrutura de arquivos

```
index.html          página completa (HTML semântico)
styles.css          identidade visual, layout e responsividade
script.js           menu, animações, FAQ, formulário e link do WhatsApp
assets/             ilustrações SVG (hero, ateliê, favicon e 7 categorias)
README.md           este arquivo
```

## Antes de publicar

### 1. Número do WhatsApp

O número está centralizado no topo do `script.js`:

```js
const CONFIG = {
  whatsapp: "5586995103651", // troque pelo número real (DDI + DDD + número)
  ...
};
```

Ao carregar a página, o script atualiza todos os links marcados com `data-wa`,
então basta alterar esse valor.

### 2. Instagram e e-mail

No rodapé do `index.html`, atualize:

- `https://www.instagram.com/anne_decor` → perfil real do ateliê;
- `anne_decor@gmail.com` → e-mail real (aparece também como `mailto:`).

### 3. Textos e preços

- Nome, textos e depoimentos: direto no `index.html`.
- Preços “a partir de”: nos atributos `data-price` dos cards e das `<option>` do formulário.
- Cores da marca: variáveis no início do `styles.css` (`:root`).

### 4. Fotos no lugar das ilustrações

Cada card usa uma ilustração SVG em `assets/`. Para trocar por fotos:

1. Coloque as imagens em `assets/` (ex.: `foto-porta.jpg`).
2. No `index.html`, substitua o `src` do `<img>` correspondente.
3. Ajuste o `alt` para descrever a peça fotografada.

Mantenha a proporção próxima de **360 × 260** nos cards e **520 × 620** no hero.

## Como visualizar

Abra o `index.html` diretamente no navegador ou rode um servidor local simples:

```powershell
# PowerShell, na pasta do projeto
python -m http.server 5173   # se tiver Python
# ou use a extensão Live Server do VS Code
```

Depois acesse `http://localhost:5173`.

## Publicação

O site é 100% estático. Pode ser publicado em Netlify, Vercel, GitHub Pages,
Cloudflare Pages ou qualquer hospedagem que sirva arquivos estáticos — envie
`index.html`, `styles.css`, `script.js` e a pasta `assets/`.

## Acessibilidade e desempenho

- Navegação por teclado, link “pular para o conteúdo” e foco visível.
- `aria-expanded` / `aria-hidden` no menu e no FAQ.
- Respeita `prefers-reduced-motion`.
- Fontes do Google com fallback para o sistema; o site continua legível offline.
- Borboletas decorativas são desativadas em modo de movimento reduzido.
