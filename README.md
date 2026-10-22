# Casa do Imigrante — demonstração estática

Pacote pronto para GitHub Pages. **Não precisa de PHP, MySQL, install.php ou compilação para publicar.**

## Publicar pelo navegador

1. Extraia o ZIP no computador.
2. No GitHub, crie um repositório chamado `casa-do-imigrante-demo` (ou outro nome).
3. Para usar Pages no GitHub Free, o repositório deve ser público. Pages em repositório privado depende do plano. Este pacote contém somente demonstrações e código de frontend, sem dados privados ou credenciais.
4. Abra **Add file → Upload files** e envie o CONTEÚDO da pasta extraída, de modo que `index.html`, `assets/`, `images/`, `dados-demo.json` e `.nojekyll` fiquem diretamente na raiz do repositório. Não envie o ZIP como arquivo e não crie uma pasta extra envolvendo os arquivos.
5. Faça o commit na branch `main`.
6. Abra **Settings → Pages → Build and deployment**.
7. Em Source, selecione **Deploy from a branch**. Em Branch, selecione `main` e `/(root)`. Clique em Save.
8. Aguarde o processo do GitHub concluir e copie o link mostrado na mesma página. Em Actions, o processo de Pages pode ser acompanhado se necessário.

Exemplo de endereço, que NÃO foi criado por este pacote:
`https://SEU-USUARIO.github.io/casa-do-imigrante-demo/`

Não habilite Jekyll nem adicione workflow de build Node para este pacote: os arquivos já estão compilados. `.nojekyll` deve estar na raiz. Você pode usar o nome de repositório que quiser; todos os recursos usam caminhos relativos.

## Navegação

- Português: `?lang=pt`
- Castelhano: `?lang=es`
- Detalhe de exemplo: `?lang=pt&imovel=CDI-005`
- Painel demonstrativo: `?pagina=admin`

Os links usam parâmetros na mesma página para que a atualização de detalhes, idiomas e painel funcione no GitHub Pages sem redirecionamentos ou configuração de servidor. Não tente abrir `/pt` ou `/admin` nessa demonstração; esses caminhos são da versão PHP/MySQL.

## O que funciona

Catálogo com fotos, detalhes por imóvel, filtros, ordenação, paginação, favoritos locais no navegador, versões PT/ES, carrossel institucional com banheiro e quarto amplo, galeria e prévia pública do painel. O gerador de assinaturas funciona no navegador e pode baixar PNG, JPG, PDF e HTML. Os links no HTML da assinatura são clicáveis; imagens PNG/JPG são apenas imagens. A cópia formatada depende do suporte e das permissões do navegador e do cliente de e-mail.

## Limites da apresentação

**O painel é uma demonstração PÚBLICA e não tem autenticação.** Não cadastre clientes reais e não coloque informações privadas neste repositório. A demonstração de CRM tem somente etapas vazias. Cadastro, edição, upload, usuários, notificações, SMTP, integrações e exportações administrativas reais continuam disponíveis no pacote PHP/MySQL, não neste pacote.

Formulários demonstrativos não enviam, não gravam e não encaminham informações. Favoritos ficam apenas neste navegador. Os dados da assinatura são processados localmente para produzir os arquivos, sem salvar um cadastro. Não há login real nem senha administrativa nesta versão.

Endereço e horários são exemplos identificados como ilustrativos. O mapa mostra uma referência na Avenida Paulista. Telefones, e-mails públicos e WhatsApp não foram preenchidos com contatos inventados. Para demonstração de um contato real, preencha dados-demo.json conscientemente antes de publicar; ao configurar WhatsApp, o clique abre o aplicativo/site para o visitante continuar.

Os imóveis, valores e fotos do catálogo são de demonstração. Fotos institucionais de casa simples, banheiro e quarto foram geradas com IA. Não representam unidades efetivamente ofertadas. O logo original da Casa do Imigrante foi preservado. Copyright Yousis Tecnologia e Soluções LTDA, com link para yousis.com.br.

A página tem `noindex,nofollow`: é uma apresentação, não o site de produção para indexação.

## Editar a apresentação sem recompilar

Edite `dados-demo.json` com um editor de texto e mantenha a sintaxe JSON válida. `settings` controla marca, contatos, mapa e textos; `properties` contém os imóveis ilustrativos. Para imagens, use caminhos relativos como `./images/minha-foto.jpg`. Depois envie os arquivos alterados ao GitHub e aguarde a publicação. Atualize a página para recarregar os dados.

## Código-fonte opcional

A pasta `fonte/` permite recompilar o frontend. Ela não é necessária para servir os arquivos já prontos. Use Node.js 22.13+:

```sh
cd fonte
npm install
npm run check
npm test
npm run build
```

O build fica em `fonte/dist/`. Para publicar uma alteração de código, copie o CONTEÚDO de `fonte/dist/` para a raiz do repositório, substituindo os assets antigos e os arquivos correspondentes. Se editou dados-demo.json na raiz, replique essa edição em fonte/public/dados-demo.json antes de recompilar para não perder os exemplos alterados.

Para testar localmente, após compilar execute `npm run preview` dentro de fonte e abra o endereço exibido. Não abra index.html por duplo clique (`file://`), porque módulos JavaScript e leitura do JSON precisam de HTTP/HTTPS.

## Validação realizada

TypeScript e build aprovados. Testes de rotas em raiz/subpasta, PT/ES, detalhes, filtros, favoritos, paginação, logo na assinatura e bloqueio de envios/APIs privadas. Verificação HTTP local do HTML, dos assets e de todas as fotos em subpasta. Não houve publicação na conta GitHub do usuário nem teste interativo em navegador nesta sessão.

Documentação oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
