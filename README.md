# Movelaria Firenze — Landing Page

## Como rodar

```bash
npm install
npm run dev
# abre http://localhost:5173
```

## Como adicionar as fotos (sem editar código!)

Coloque as fotos na pasta `public/images/` com exatamente estes nomes:

| Arquivo              | Foto                          |
|----------------------|-------------------------------|
| `quarto.jpg`         | Dormitório / penteadeira      |
| `gaveta-joias.jpg`   | Gaveteiro porta-joias         |
| `sala-estar.jpg`     | Sala de estar                 |
| `adega.jpg`          | Adega / bar                   |
| `cozinha.jpg`        | Cozinha planejada             |
| `banheiro.jpg`       | Banheiro / pia                |

Assim que os arquivos estiverem na pasta, as fotos aparecem
automaticamente no carrossel. Enquanto não estiverem,
aparece um placeholder elegante indicando o que falta.

> Se suas fotos forem .png ou .jpeg, renomeie para .jpg
> OU ajuste o array `projects` em `src/MovelariaFirenze.jsx`.

## Build para produção

```bash
npm run build
# sobe a pasta dist/ na Vercel, Netlify ou hospedagem
```

## Personalização

- **Textos do carrossel:** array `projects` no topo de `src/MovelariaFirenze.jsx`
- **Cores:** objeto `C` no topo do arquivo
- **Google Maps:** procure `PLACEHOLDER` na seção Contact
- **WhatsApp/telefone/endereço:** constantes no topo do arquivo
