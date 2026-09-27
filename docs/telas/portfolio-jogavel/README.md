# Portfólio jogável

## Objetivo e acesso

Apresentar João Duarte, seus projetos, experiência, habilidades e contatos em um console retrô. Acesso público, sem autenticação, coleta de dados, formulário ou backend novo.

## Fluxo

A abertura oferece entrada no estúdio e acesso direto ao menu. No estúdio, o personagem explora uma grade de 12 × 8 células; computadores, retrato, estante, bancada e terminal abrem as cinco seções. Aproximação a uma célula de distância permite interação. Objetos também são botões acessíveis e clicáveis.

Setas ou WASD movimentam, Enter/A interage, Escape/B volta e M/Start abre o menu. O direcional de toque repete o movimento enquanto pressionado e para ao soltar, cancelar o gesto ou perder o foco da janela. Teclado continua ativando links e botões nativos com Enter. Não há sons ou conteúdo bloqueado por progresso.

Ao abrir conteúdo, a movimentação pausa. Voltar restaura a posição no estúdio; em um projeto, volta primeiro à lista; em imagem ampliada, fecha primeiro a projeção holográfica. O menu oferece acesso imediato a todas as seções.

## Conteúdo

Os quatro projetos e seus metadados vêm de `src/app/game/projects.data.ts`, reutilizado pelo componente legado. Habilidades usam `skills.data.ts`. Sobre, experiência e contato estão em `content.data.ts`.

Projetos têm uma apresentação baseada no catálogo disponível, suas tecnologias principais, uma página por imagem e links. As habilidades mostram o percentual atual em uma barra de 0% a 100%. Textos usam paginação medida no navegador e recalculada quando a área disponível muda. Nenhuma seção depende de rolagem.

Links externos abrem em outra aba com `noopener noreferrer`. E-mail usa `mailto:`; currículo e documentação apontam para os PDFs existentes em assets. Não é enviada nenhuma mensagem automaticamente.

## Layout, estados e acessibilidade

Página fixa na viewport dinâmica. Em celular retrato, moldura menor e controles abaixo da tela. Em viewport baixa/paisagem, controles laterais deixam mais espaço para conteúdo. O console usa CSS e o cenário utiliza SVG, sem WebGL.

Estados: abertura, estúdio, menu e seção; dentro dos projetos, lista, páginas e projeção holográfica. A projeção escurece o plano de fundo e apresenta a captura fora do console; fecha pelo botão, clique no fundo, Escape ou B. Limites de mapa e colisões impedem atravessar objetos. Paginação desabilita os controles nos extremos.

Textos, links e botões são HTML semântico, com foco visível e nomes acessíveis. Barras de habilidade usam `progressbar` com mínimo, máximo e valor atual. A projeção é um diálogo modal com botão de fechamento focado ao abrir. Mudanças de seção focam a tela; indicador de proximidade e número de página têm anúncio acessível. `prefers-reduced-motion` remove animações e transições.

## Dependências e impactos

Angular 19 standalone e SSR existentes. Listeners do Angular são removidos automaticamente; temporizadores e ResizeObserver têm limpeza no ciclo de destruição. APIs do navegador só são usadas no cliente.

A página principal substitui a composição antiga de cards e modais. Componentes legados permanecem disponíveis, com catálogo compartilhado para evitar divergência. Não há alterações no backend, banco, rotas públicas ou deploy.

## Validação

Executar `npm run build` e `npm test -- --watch=false --browsers=ChromeHeadless`. O runner Karma precisa abrir uma porta local e iniciar Chrome. A validação visual deve conferir desktop, celular retrato/paisagem, viewport equivalente a zoom de 200%, colisões, menu, paginação, galeria, downloads e movimento reduzido.

### Resultado da implementação

Build de produção e prerenderização aprovados; 17 testes Karma/ChromeHeadless aprovados. Verificadas 198 páginas de conteúdo em viewports 1440×900, 390×844, 320×568, 844×390 e 720×450, sem transbordamento de texto após correção da atualização da paginação. Galerias dos quatro projetos percorridas com ampliação e retorno. Currículo e documentação responderam HTTP 200 no servidor local. Hidratação confirmada sem erros na recarga final.

A viewport 720×450 representa o espaço CSS de uma janela 1440×900 com zoom de 200%; não substitui teste de zoom nativo em todos os navegadores. Validação realizada em Chrome de desktop com viewport mobile; dispositivo físico e leitor de tela não foram testados. Nenhum commit ou deploy realizado.
