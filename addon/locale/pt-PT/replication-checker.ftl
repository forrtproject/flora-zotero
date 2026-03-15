# Zotero Replication Checker Locale File - European Portuguese (Português Europeu, Portugal)
# Modern Fluent format (.ftl)

## Menu Items / Itens do menu 
replication-checker-tools-menu = Verificar replicações na biblioteca atual
replication-checker-context-menu = Verificar replicações
replication-checker-context-menu-ban = Excluir replicação
replication-checker-context-menu-add-original = Adicionar original

## Progress Messages / Mensagens de progresso
replication-checker-progress-checking-library = A verificar replicações
replication-checker-progress-checking-collection = A verificar replicações na coleção
replication-checker-progress-scanning-library = A analisar a biblioteca...
replication-checker-progress-scanning-collection = A analisar a coleção...
replication-checker-progress-found-dois = Encontrados { $itemCount } itens com DOI ({ $uniqueCount } únicos)
replication-checker-progress-checking-database = A verificar na base de dados de replicações...
replication-checker-progress-no-dois = Não foram encontrados itens com DOI na coleção
replication-checker-progress-complete = Verificação concluída
replication-checker-progress-failed = Falha na verificação
replication-checker-progress-match-count = Encontrado(s) { $count } item(ns) com replicações
replication-checker-progress-copying-readonly = A copiar itens da biblioteca só de leitura para a biblioteca pessoal...

## Alerts / Alertas
replication-checker-alert-title = Zotero Replication Checker
replication-checker-alert-no-dois-selected = Não foram encontrados DOIs nos itens selecionados.
replication-checker-alert-no-collection = Selecione uma coleção antes de executar esta verificação.
replication-checker-alert-no-originals-available = Não há estudos originais disponíveis para esta replicação.
replication-checker-alert-no-doi = O item selecionado não tem DOI.
replication-checker-add-original-success = Estudo original adicionado com sucesso: { $title }
replication-checker-add-original-confirm = Foram encontrado(s) { $count } estudo(s) original(is) para esta replicação. Pretende adicioná-los todos à sua biblioteca?
replication-checker-add-original-batch-success = Foram adicionados com sucesso { $count } estudo(s) original(is) à sua biblioteca.
replication-checker-error-title = Replication Checker - Erro
replication-checker-error-api = Não foi possível obter dados da API - verifique a sua ligação à Internet ou tente novamente mais tarde.
replication-checker-error-body =
    Falha ao verificar { $target } quanto a replicações:

    { $details }

    Não foi possível obter dados da API - verifique a sua ligação à Internet ou tente novamente mais tarde.
replication-checker-target-library = a biblioteca atual
replication-checker-target-selected = os itens selecionados
replication-checker-target-collection = a coleção selecionada

## Ban Feature / Exclusão 
replication-checker-ban-title = Excluir replicações
replication-checker-ban-confirm =
    Tem a certeza de que pretende excluir { $count } replicação(ões)?

    Estes itens serão movidos para o lixo e não voltarão a ser adicionados em verificações futuras.

replication-checker-ban-success = { $count } replicação(ões) excluída(s) com sucesso.
replication-checker-alert-no-replications-selected = Não foram selecionados itens de replicação.


## Dialog
replication-checker-dialog-title = Estudos de replicação encontrados
replication-checker-dialog-intro = Estudos de replicação encontrados para:\n"{ $title }"
replication-checker-dialog-count = Encontrada(s) { $count } replicação(ões):
replication-checker-dialog-item = { $index }. { $title }\n({ $year })\n   Resultado: { $outcome }
replication-checker-dialog-more = ...e mais { $count } replicação(ões)
replication-checker-dialog-question = Pretende adicionar a informação sobre replicação?
replication-checker-dialog-progress-title = Informação de replicação adicionada
replication-checker-dialog-progress-line = Informação de replicação adicionada a "{ $title }"
replication-checker-dialog-is-replication-title = Estudo original encontrado
replication-checker-dialog-is-replication-message = Não foram encontradas replicações, mas este parece ser um estudo de replicação.\n\nPretende adicionar o(s) artigo(s) original(is)?

## Read-Only Library Handling
replication-checker-readonly-dialog-title = Biblioteca só de leitura detetada
replication-checker-readonly-dialog-message =
    Esta biblioteca é só de leitura. Foram encontrados { $itemCount } item(ns) com { $replicationCount } replicação(ões).

    Pretende copiar os artigos originais e as respetivas replicações para a pasta de replicações da sua biblioteca pessoal?

## Results Messages / Mensagens de Resultado
replication-checker-results-title-library = Análise da biblioteca concluída
replication-checker-results-title-selected = Análise dos itens selecionados concluída
replication-checker-results-title-collection = Análise da coleção concluída
replication-checker-results-total = Total de itens verificados: { $count }
replication-checker-results-dois = Itens com DOI: { $count }
replication-checker-results-found = { $count } item(ns) com replicações.
replication-checker-results-none = Nenhuma replicação encontrada.
replication-checker-results-reproductions-found = { $count } item(ns) com reproduções.
replication-checker-results-reproductions-none = Não foram encontradas reproduções.
replication-checker-results-footer = Consulte as notas para mais detalhes ou selecione itens para nova verificação.

## Tags
replication-checker-tag = Tem replicação
replication-checker-tag-is-replication = É replicação
replication-checker-tag-added-by-checker = Adicionado pelo Replication Checker
replication-checker-tag-success = Replicação: Bem-sucedida
replication-checker-tag-failure = Replicação: Falhou
replication-checker-tag-mixed = Replicação: Mista
replication-checker-tag-readonly-origin = Original presente em biblioteca só de leitura
replication-checker-tag-has-been-replicated = Foi replicado
replication-checker-tag-has-been-reproduced = Foi reproduzido
replication-checker-tag-in-flora = Em FLoRA

## Note Template
replication-checker-note-title = Replicações encontradas
replication-checker-note-warning = Esta nota é gerada automaticamente. Se a editar, será criada uma nova nota na próxima verificação e esta versão será mantida tal como está.
replication-checker-note-intro = Este estudo foi replicado:
replication-checker-note-feedback = Este resultado foi útil? Envie o seu feedback <a href="{ $url }" target="_blank">aqui</a>!
replication-checker-note-data-issues = Encontrou algum problema nos dados? Por favor, reporte-o <a href="{ $url }" target="_blank">aqui</a>!
replication-checker-note-footer = Gerado pelo Zotero Replication Checker com base na FORRT Literature Database (FLoRA)

## Replication Item Details
replication-checker-li-no-title = Sem título disponível
replication-checker-li-no-authors = Sem autores disponíveis
replication-checker-li-no-journal = Sem revista
replication-checker-li-na = N/A
replication-checker-li-doi-label = DOI:
replication-checker-li-outcome = Resultado reportado pelos autores:
replication-checker-li-link = Este estudo tem um relatório associado:

## First Run Prompt
replication-checker-prompt-title = Boas-vindas ao Zotero Replication Checker!
replication-checker-prompt-first-run =
   Obrigado por instalar o Zotero Replication Checker!

   Este plugin ajuda a encontrar estudos de replicação para a sua investigação, ao verificar os itens da sua biblioteca na FORRT Literature Database (FLoRA).

   Pretende analisar agora a sua biblioteca para procurar replicações?

    • Clique em "OK" para iniciar a análise (pode demorar alguns minutos)
    • Clique em "Cancel" para ignorar por agora - poderá sempre analisar mais tarde a partir do menu Ferramentas.

## Onboarding
onboarding-welcome-title = Boas-vindas ao Zotero Replication Checker!
onboarding-welcome-content =
    Obrigado por instalar o Zotero Replication Checker!

    Este plugin ajuda a encontrar estudos de replicação para a sua investigação, ao verificar os itens da sua biblioteca na FORRT Literature Database (FLoRA).

    ✨ Funcionalidades principais:
    • Verificação automática de DOIs na base de dados de replicações
    • Funciona com a biblioteca inteira, coleções ou itens individuais
    • Cria notas associadas com informação sobre replicação
    • Assinala e atribui etiquetas aos itens de acordo com o estado da replicação
    • Adiciona estudos originais quando existirem replicações
    • Permite excluir replicações indesejadas de verificações futuras

    Vamos fazer uma visita rápida para começar!

onboarding-tools-title = Verifique toda a sua biblioteca
onboarding-tools-content =
    📍 Localização: Ferramentas → Verificar replicações na biblioteca atual

    🔍 O que faz:
    • Analisa todos os itens com DOI
    • Consulta a base de dados FLoRA
    • Cria notas com detalhes
    • Atribui etiquetas aos itens de acordo com o resultado

    💡 Sugestão: Pode demorar alguns minutos, dependendo do tamanho da biblioteca.

onboarding-context-title = Verifique coleções e itens
onboarding-context-content =
    📚 Para coleções:
    Clique com o botão direito na coleção → Verificar replicações

    📄 Para itens individuais:
    Clique com o botão direito nos itens → Verificar replicações

    🚫 Excluir replicações:
    Clique com o botão direito nos itens de replicação → Excluir replicação
    • Impede que replicações indesejadas voltem a ser adicionadas

    ⚙️ Preferências:
    Editar → Configurações → Zotero Replication Checker
    • Frequência de verificação automática
    • Verificação automática de novos itens

onboarding-scan-title = Pretende analisar a sua biblioteca?
onboarding-scan-content =
    Pretende analisar agora a sua biblioteca para procurar replicações?

    • Clique em "Sim" para iniciar a análise
      (isto pode demorar alguns minutos)

    • Clique em "Não" para ignorar por agora - poderá analisar mais tarde a partir do menu Ferramentas.


    💡 Pode aceder a este guia a qualquer momento:
    Ajuda → Guia do Utilizador do Replication Checker

## Reproduction Feature - Menu Items
reproduction-checker-context-menu-ban = Excluir reprodução

## Reproduction Feature - Tags
reproduction-checker-tag = Tem reprodução
reproduction-checker-tag-is-reproduction = É reprodução
reproduction-checker-tag-added-by-checker = Adicionado pelo Replication Checker
reproduction-checker-tag-readonly-origin = Original presente em biblioteca só de leitura

## Reproduction Feature - Outcome Tags
reproduction-checker-tag-outcome-cs-robust = Reprodução: Execução computacional bem-sucedida, robusta
reproduction-checker-tag-outcome-cs-challenges = Reprodução: Execução computacional bem-sucedida, com desafios de robustez
reproduction-checker-tag-outcome-cs-not-checked = Reprodução: Execução computacional bem-sucedida, robustez não verificada
reproduction-checker-tag-outcome-ci-robust = Reprodução: Problemas computacionais, robusta
reproduction-checker-tag-outcome-ci-challenges = Reprodução: Problemas computacionais, com desafios de robustez
reproduction-checker-tag-outcome-ci-not-checked = Reprodução: Problemas computacionais, robustez não verificada

## Reproduction Feature - Note Template
reproduction-checker-note-title = Reproduções encontradas
reproduction-checker-note-warning = Esta nota é gerada automaticamente. Se a editar, será criada uma nova nota na próxima verificação e esta versão será mantida tal como está.
reproduction-checker-note-intro = Este estudo foi reproduzido:
reproduction-checker-note-feedback = Este resultado foi útil? Envie o seu feedback <a href="{ $url }" target="_blank">aqui</a>!
reproduction-checker-note-data-issues = Encontrou algum problema nos dados? Por favor, reporte-o <a href="{ $url }" target="_blank">aqui</a>!
reproduction-checker-note-footer = Gerado pelo Zotero Replication Checker com base na FORRT Literature Database (FLoRA)

## Reproduction Feature - Item Details
reproduction-checker-li-no-title = Sem título disponível
reproduction-checker-li-no-authors = Sem autores disponíveis
reproduction-checker-li-no-journal = Sem revista
reproduction-checker-li-na = N/A
reproduction-checker-li-doi-label = DOI:
reproduction-checker-li-outcome = Resultado da reprodução:
reproduction-checker-li-link = Este estudo tem um relatório associado:

## Reproduction Feature - Alerts / Alertas
reproduction-checker-alert-no-reproductions-selected = Não foram selecionados itens de reprodução.
reproduction-checker-ban-title = Excluir reproduções
reproduction-checker-ban-confirm =
    Tem a certeza de que pretende excluir { $count } reprodução(ões)?

    Estes itens serão movidos para o lixo e não voltarão a ser adicionados em verificações futuras.

reproduction-checker-ban-success = { $count } reprodução(ões) excluída(s) com sucesso.

## Reproduction Feature - Dialog
reproduction-checker-dialog-title = Estudos de reprodução encontrados
reproduction-checker-dialog-intro = Estudos de reprodução encontrados para:\n"{ $title }"
reproduction-checker-dialog-count = Encontrada(s) { $count } reprodução(ões):
reproduction-checker-dialog-item = { $index }. { $title }\n({ $year })\n   Resultado: { $outcome }
reproduction-checker-dialog-more = ...e mais { $count } reprodução(ões)
reproduction-checker-dialog-question = Pretende adicionar informação sobre reprodução?
reproduction-checker-dialog-progress-title = Informação de reprodução adicionada
reproduction-checker-dialog-progress-line = Informação de reprodução adicionada a "{ $title }"

## Reproduction Feature - Progress
reproduction-checker-progress-reproductions-found = Encontrado(s) { $count } item(ns) com reproduções

## Preference Pane
pref-autocheck-title = Verificar automaticamente a biblioteca para replicações
pref-autocheck-description = Verifica automaticamente a sua biblioteca quanto a estudos de replicação em intervalos regulares
pref-autocheck-disabled = Desativado (apenas verificação manual)
pref-autocheck-daily = Diária (verificação a cada 24 horas)
pref-autocheck-weekly = Semanal (verificação a cada 7 dias)
pref-autocheck-monthly = Mensal (verificar a cada 30 dias)
pref-autocheck-new-items = Verificar automaticamente novos itens adicionados à biblioteca (recomendado)
pref-autocheck-new-items-hint = Desative esta opção se preferir executar manualmente todas as verificações de replicação.
pref-autocheck-note = A verificação automática decorre em segundo plano quando o Zotero está aberto. Continua a poder verificar manualmente através do menu Ferramentas.

##
pref-folder-title = Nome da pasta de replicações
pref-folder-description = Nome da coleção do Zotero onde os itens de replicação são armazenados
pref-folder-hint = Alterar isto irá renomear automaticamente a coleção existente. Todos os itens permanecerão na mesma coleção.
pref-repro-folder-title = Nome da pasta de reproduções
pref-repro-folder-description = Nome da coleção do Zotero onde os itens de reprodução são armazenados
pref-repro-folder-hint = Alterar isto irá renomear automaticamente a coleção existente. Todos os itens permanecerão na mesma coleção.

##
pref-blacklist-title = Replicações excluídas
pref-blacklist-description = Gerir as replicações que excluiu para que não apareçam na sua biblioteca
pref-blacklist-col-replication = Artigo de replicação
pref-blacklist-col-original = Artigo original
pref-blacklist-col-type = Tipo
pref-blacklist-col-banned = Excluído em
pref-blacklist-empty = Não existem replicações excluídas
pref-blacklist-remove = Remover selecionado(s)
pref-blacklist-clear = Limpar todas as replicações excluídas
pref-blacklist-hint = As replicações excluídas não voltarão a ser adicionadas em verificações futuras. Pode excluir replicações através do menu contextual.
