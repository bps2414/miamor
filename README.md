# 💕 Thalita & Bryan — 6 Meses Juntos

> Microsite comemorativo de 6 meses de relacionamento.
> **Data de início:** 04/09/2025 · **Comemoração:** 04/03/2026

---

## 📁 Estrutura do Projeto

```
dist/
├── index.html          ← Arquivo principal (abra direto no navegador!)
└── assets/
    ├── photo1.jpg       ← Substitua pelas suas fotos!
    ├── photo2.jpg
    ├── photo3.jpg
    ├── photo4.jpg
    ├── photo5.jpg
    ├── photo6.jpg
    └── song.mp3         ← Coloque a música especial aqui
```

---

## 🚀 Como Rodar

### Método 1 — Direto no navegador
Abra o arquivo `dist/index.html` com duplo-clique. Funciona offline!

### Método 2 — Servidor local
```bash
cd dist
python -m http.server 8000
```
Acesse: **http://localhost:8000**

Para acessar pelo celular na mesma rede Wi-Fi:
```bash
# Descubra seu IP local:
ipconfig   # Windows
# Abra no celular: http://SEU_IP:8000
```

---

## 🖼️ Como Personalizar

### Fotos
1. Coloque 6 fotos na pasta `dist/assets/` com os nomes: `photo1.jpg` até `photo6.jpg`
2. No `index.html`, altere os `src` das imagens na seção **Gallery** (procure por `picsum.photos`)
3. Atualize os textos `alt` com descrições reais das fotos

> **Dica:** Imagens de 1200px de largura em formato WebP são ideais para performance.

### Música
1. Coloque um arquivo `song.mp3` na pasta `dist/assets/`
2. O player já está configurado para `assets/song.mp3`

### Mensagens do Typewriter
No JavaScript, procure o array `messages` dentro de `typewriter` e edite as frases:
```js
const messages = [
  'Obrigado por cada risada, Thalita. 💕',
  'Cada dia com você é um presente, meu amor.',
  // ... adicione as suas mensagens aqui
];
```

---

## ✨ Funcionalidades

| Recurso | Descrição |
|---|---|
| 🎯 Hero Gigante | Data em destaque com animação de entrada |
| ⌨️ Typewriter | Mensagens românticas com efeito de digitação |
| ⏳ Contagem Regressiva | Timer até 04/03/2026 (muda se a data passou) |
| 📸 Galeria | Grid responsivo com lightbox (← → Esc) |
| 🎵 Player de Áudio | Play/pause, progresso, volume — sem autoplay |
| 🎉 Confetti | Botão + partículas de coração no canvas |
| 💌 Mural de Recados | Salva no localStorage do navegador |
| 📱 QR Code | Gera QR para compartilhar o link |
| 💾 Download | Baixa a página como HTML |
| 🌓 Tema Dia/Noite | Alternador no canto superior direito |
| ♿ Acessibilidade | ARIA labels, contraste AA, navegação por teclado |

### Atalhos de Teclado
- **C** → Dispara confetti
- **P** → Play/Pause da música
- **G** → Rola até a galeria

---

## ✅ Checklist de Testes

- [ ] Abrir `index.html` direto no navegador
- [ ] `python -m http.server 8000` → testar em `http://localhost:8000`
- [ ] Testar em mobile (abrir pelo IP local na mesma rede)
- [ ] Verificar contrastes (Lighthouse → Accessibility)
- [ ] Navegação por teclado (Tab entre elementos, atalhos C/P/G)
- [ ] Testar leitor de tela (NVDA / VoiceOver)
- [ ] Performance via Lighthouse (deve ser > 90)
- [ ] Lightbox: clique, setas ← →, Esc para fechar
- [ ] Player de áudio: play, pause, progresso, volume
- [ ] Botão Comemorar: confetti + corações
- [ ] Tema: alternar claro/escuro
- [ ] Mural de recados: enviar, verificar persistência
- [ ] QR Code: gerar e escanear com celular
- [ ] Download: baixar página como HTML

---

## 🌐 Deploy & Compartilhamento

### GitHub Pages
```bash
git init
git add .
git commit -m "feat: microsite 6 meses Thalita & Bryan"
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```
Vá em **Settings → Pages → Source: main / root** → seu site estará em `https://SEU_USUARIO.github.io/SEU_REPO/dist/`

### Netlify / Vercel
Arraste a pasta `dist/` diretamente no painel de deploy.

### Compartilhar via WhatsApp
1. Comprima a pasta `dist/` em um `.zip`
2. Envie pelo WhatsApp Web ou upload no Google Drive
3. Ou use o QR Code gerado pelo site para compartilhar o link

### ngrok (temporário)
```bash
ngrok http 8000
```
> ⚠️ **Atenção:** Links do ngrok são temporários e públicos. Não deixe rodando desnecessariamente.

---

## 🔒 Segurança

- Nenhum dado sensível é armazenado ou transmitido
- Mural de recados usa apenas `localStorage` (local no navegador)
- Texto é sanitizado antes de exibição (sem `innerHTML` direto)
- **CSP sugerida para deploy:**
```
default-src 'self' https:; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https:; script-src 'self' 'unsafe-inline'; media-src 'self'; font-src 'self' https:;
```

---

## 💡 Sugestões de Melhorias

- **Lottie Animations** — Substituir SVGs decorativos por animações Lottie
- **GSAP** — Para animações de scroll mais sofisticadas
- **Service Worker** — Para funcionar 100% offline como PWA
- **Analytics** — Google Analytics com banner de consentimento (LGPD)
- **Mais fotos** — Expandir galeria para 12+ fotos com categorias

---

## ❤️ Para o Bryan

Ei Bryan! Este site é pra você personalizar e surpreender a Thalita. Aqui vai o resumo rápido:

1. **Fotos**: Coloque 6 fotos especiais na pasta `assets/` (renomeie para `photo1.jpg`...`photo6.jpg`)
2. **Música**: Coloque a música favorita de vocês como `assets/song.mp3`
3. **Mensagens**: Edite as frases no typewriter com coisas que só vocês sabem
4. **Teste**: Abra no navegador, veja se tá tudo lindo
5. **Envie**: Compacte e mande pelo WhatsApp ou suba no GitHub Pages

Boa sorte! 💜
