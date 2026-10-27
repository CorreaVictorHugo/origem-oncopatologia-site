# Manutenção e publicação

## Conteúdo e identidade

Edite textos e seções em `index.html`. A paleta está em `paleta.css`; os estilos de base estão em `styles.css`, e os ajustes de composição e movimento estão em `origem.css`. Preserve a ordem das três folhas no HTML.

As imagens usadas na página ficam em `assets/`. As capturas em `screenshots/` servem à apresentação do repositório e devem ser atualizadas quando houver mudanças visuais relevantes.

## Contato

Em `origem.js`, substitua `whatsappNumber = null` somente após confirmar o número oficial do laboratório. Use uma string com DDI, DDD e número, apenas com dígitos. Sem essa configuração, o botão continua levando à seção de contato. A mensagem inicial pode ser ajustada em `whatsappMessage`.

## Publicação no Netlify

Este é um site estático: não há comando de build. Publique a raiz do projeto, incluindo `index.html`, as três folhas CSS, `origem.js` e `assets/`. Documentação e capturas não são necessárias para executar o site.

Se usar a CLI do Netlify, autentique-se e informe explicitamente o ID do projeto de destino:

```bash
netlify deploy --dir . --site ID_DO_PROJETO --prod --no-build
```

Não versione credenciais nem a pasta `.netlify/`. Esta instrução descreve publicação manual; o repositório não configura publicação automática por Git.

## Antes do lançamento oficial

- Confirmar serviços, textos institucionais, credenciais e canais de atendimento com o laboratório.
- Configurar o contato oficial e testar os links.
- Validar a navegação no computador e no celular, inclusive teclado e preferência de redução de movimento.
- Remover `noindex, nofollow` apenas quando a versão estiver aprovada para indexação.
- Atualizar o endereço da demonstração no README se o domínio ou nome do projeto mudar.

## Conferência local

Execute `python -m http.server 8000` na raiz e abra `http://localhost:8000`. Confira a abertura do menu, o fechamento com Escape, as âncoras das seções, as imagens e a ausência de rolagem horizontal em telas pequenas. Para conferir a sintaxe do JavaScript com Node.js, use `node --check origem.js`.
