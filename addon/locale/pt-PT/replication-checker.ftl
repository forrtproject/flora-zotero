# Zotero Replication Checker Locale File - Portuguese Europe (Português Europeu)
# Modern Fluent format (.ftl)

## Menu Items
replication-checker-tools-menu = Verificar replicações na biblioteca atual
replication-checker-context-menu = Verificar replicações
replication-checker-context-menu-ban = Proibir replicação
replication-checker-context-menu-add-original = Adicionar original

## Progress Messages
replication-checker-progress-checking-library = A verificar replicações
replication-checker-progress-checking-collection = A verificar replicações na coleção
replication-checker-progress-scanning-library = A analisar biblioteca...
replication-checker-progress-scanning-collection = A analisar coleção...
replication-checker-progress-found-dois = { $itemCount } itens com DOIs encontrados ({ $uniqueCount } únicos)
replication-checker-progress-checking-database = A consultar a base de dados de replicações...
replication-checker-progress-no-dois = Nenhum item com DOI encontrado na coleção
replication-checker-progress-complete = Verificação concluída
replication-checker-progress-failed = A verificação falhou
replication-checker-progress-match-count = { $count } item(ns) com replicações encontrado(s)
replication-checker-progress-copying-readonly = A copiar itens da biblioteca (só de leitura) para a biblioteca pessoal...

## Alerts
replication-checker-alert-title = Zotero Replication Checker
replication-checker-alert-no-dois-selected = Nenhum DOI encontrado nos itens selecionados.
replication-checker-alert-no-collection = Selecione uma coleção antes de executar esta verificação.
replication-checker-alert-no-originals-available = Nenhum estudo original disponível para esta replicação.
replication-checker-alert-no-doi = O item selecionado não possui DOI.
replication-checker-add-original-success = Estudo original adicionado com êxito: { $title }
replication-checker-add-original-confirm = { $count } estudo(s) original(ais) encontrado(s) para esta replicação. Deseja adicionar todos à sua biblioteca?
replication-checker-add-original-batch-success = { $count } estudo(s) original(ais) adicionado(s) com êxito à sua biblioteca.
replication-checker-error-title = Replication Checker - Erro
replication-checker-error-api = Não foi possível obter dados da API — verifique a sua ligação à Internet ou tente novamente mais tarde.
replication-checker-error-body =
    Falha ao verificar { $target } para replicações:

    { $details }

    Não foi possível obter dados da API — verifique a sua ligação à Internet ou tente novamente mais tarde.
replication-checker-target-library = a biblioteca atual
replication-checker-target-selected = os itens selecionados
replication-checker-target-collection = a coleção selecionada

## Ban Feature
replication-checker-ban-title = Proibir replicações
replication-checker-ban-confirm =
    Tem a certeza de que pretende proibir { $count } replicação(ões)?

    Estes itens serão movidos para o lixo e não serão adicionados novamente em verificações futuras.
replication-checker-ban-success = { $count } replicação(ões) proibida(s) com êxito.
replication-checker-alert-no-replications-selected = Nenhum item de replicação selecionado.

## Dialog
replication-checker-dialog-title = Estudos de Replicação Encontrados
replication-checker-dialog-intro = Estudos de replicação encontrados para:\n"{ $title }"
replication-checker-dialog-count = { $count } replicação(ões) encontrada(s):
replication-checker-dialog-item = { $index }. { $title }\n({ $year })\n   Resultado: { $outcome }
replication-checker-dialog-more = ...e mais { $count } replicação(ões)
replication-checker-dialog-question = Deseja adicionar informações de replicação?
replication-checker-dialog-progress-title = Informações de Replicação Adicionadas
replication-checker-dialog-progress-line = Informações de replicação adicionadas a "{ $title }"
replication-checker-dialog-is-replication-title = Estudo Original Encontrado
replication-checker-dialog-is-replication-message = Nenhuma replicação encontrada, mas este parece ser um estudo de replicação.\n\nDeseja adicionar o(s) artigo(s) original(ais)?

## Read-Only Library Handling
replication-checker-readonly-dialog-title = Biblioteca detetada (só de leitura)
replication-checker-readonly-dialog-message =
    Esta biblioteca tem acesso só de leitura. Foram encontrados { $itemCount } item(ns) com { $replicationCount } replicação(ões).

    Deseja copiar os artigos originais e as suas replicações para a pasta de replicações da sua biblioteca pessoal?

## Results Messages
replication-checker-results-title-library = Análise da Biblioteca Concluída
replication-checker-results-title-selected = Análise dos Itens Selecionados Concluída
replication-checker-results-title-collection = Análise da Coleção Concluída
replication-checker-results-total = Total de itens verificados: { $count }
replication-checker-results-dois = Itens com DOIs: { $count }
replication-checker-results-found = { $count } item(ns) tem/têm replicações.
replication-checker-results-none = Nenhuma replicação encontrada.
replication-checker-results-reproductions-found = { $count } item(ns) tem/têm reproduções.
replication-checker-results-reproductions-none = Nenhuma reprodução encontrada.
replication-checker-results-footer = Consulte as notas para obter detalhes ou selecione itens para reverificar.

## Tags
replication-checker-tag = Tem Replicação
replication-checker-tag-is-replication = É uma Replicação
replication-checker-tag-added-by-checker = Adicionado pelo Replication Checker
replication-checker-tag-success = Replicação: Bem-sucedida
replication-checker-tag-failure = Replicação: Falhada
replication-checker-tag-mixed = Replicação: Mista
replication-checker-tag-readonly-origin = Original presente em biblioteca (só de leitura)
replication-checker-tag-has-been-replicated = Foi Replicado
replication-checker-tag-has-been-reproduced = Foi Reproduzido
replication-checker-tag-in-flora = Em FLoRA

## Note Template
replication-checker-note-title = Replicações Encontradas
replication-checker-note-warning = Esta nota é gerada automaticamente. Se for editada, será criada uma nova nota na próxima verificação e esta versão será mantida como está.
replication-checker-note-intro = Este estudo foi replicado:
replication-checker-note-feedback = Este resultado foi útil? Deixe o seu feedback <a href="{ $url }" target="_blank">aqui</a>!
replication-checker-note-data-issues = Encontrou algum problema nos dados? Por favor, reporte-o <a href="{ $url }" target="_blank">aqui</a>!
replication-checker-note-footer = Gerado pelo Zotero Replication Checker com recurso à Base de Dados de Literatura FORRT (FLoRA)

## Replication Item Details
replication-checker-li-no-title = Nenhum título disponível
replication-checker-li-no-authors = Nenhum autor disponível
replication-checker-li-no-journal = Sem revista
replication-checker-li-na = N/D
replication-checker-li-doi-label = DOI:
replication-checker-li-outcome = Resultado Reportado pelo Autor:
replication-checker-li-link = Este estudo tem um relatório associado:

## First Run Prompt
replication-checker-prompt-title = Bem-vindo ao Zotero Replication Checker!
replication-checker-prompt-first-run =
    Obrigado por instalar o Zotero Replication Checker!

    Este plugin ajuda a descobrir estudos de replicação para a sua investigação, verificando os itens da sua biblioteca na Base de Dados de Literatura FORRT (FLoRA).

    Deseja analisar a sua biblioteca em busca de replicações agora?

    • Clique em "OK" para iniciar a análise (pode demorar alguns minutos)
    • Clique em "Cancelar" para ignorar — pode sempre analisar mais tarde através do menu Ferramentas

## Onboarding
onboarding-welcome-title = Bem-vindo ao Replication Checker!
onboarding-welcome-content =
    Obrigado por instalar o Zotero Replication Checker!

    Este plugin ajuda a descobrir estudos de replicação e reprodução, verificando automaticamente os itens da sua biblioteca na Base de Dados de Literatura FORRT (FLoRA).

    ✨ Funcionalidades principais:
    • Verifica toda a biblioteca, coleções ou itens individuais
    • Deteta tanto replicações como reproduções computacionais
    • Gere artigos com múltiplos estudos originais
    • Adiciona notas com etiquetas de resultado e ligações DOI
    • Etiqueta itens automaticamente (ex. «Tem Replicação», «É uma Replicação»)
    • Oferece adicionar o estudo original quando uma replicação é detetada
    • Suporte para bibliotecas de grupo só de leitura — copia itens para a biblioteca pessoal
    • Nomes de pastas configuráveis para replicações e reproduções
    • Proíbe replicações indesejadas em verificações futuras

    Vamos fazer uma visita guiada rápida para começar!

onboarding-tools-title = Verificar toda a sua biblioteca
onboarding-tools-content =
    📍 Local: Ferramentas → Verificar biblioteca atual para replicações

    🔍 O que faz:
    • Analisa todos os itens com DOIs
    • Consulta a base de dados FLoRA
    • Cria notas com detalhes
    • Etiqueta itens por resultado

    💡 Sugestão: Pode demorar alguns minutos consoante o tamanho da biblioteca.

onboarding-context-title = Verificar coleções e itens
onboarding-context-content =
    📚 Para coleções:
    Clique com o botão direito na coleção → Verificar replicações

    📄 Para itens individuais:
    Clique com o botão direito nos itens → Verificar replicações

    🚫 Proibir replicações:
    Clique com o botão direito nos itens de replicação → Proibir replicação
    • Impede que replicações indesejadas sejam adicionadas novamente

    ⚙️ Definições:
    Editar → Definições → Replication Checker
    • Frequência de verificação automática
    • Verificação automática de novos itens

onboarding-scan-title = Pronto para analisar a sua biblioteca?
onboarding-scan-content =
    Deseja analisar a sua biblioteca em busca de replicações agora?

    • Clique em "Sim" para iniciar a análise
      (pode demorar alguns minutos)

    • Clique em "Não" para ignorar — pode sempre analisar mais tarde através do menu Ferramentas

    💡 Aceda a este guia em qualquer momento:
    Ajuda → Guia do Utilizador do Replication Checker

## Reproduction Feature - Menu Items
reproduction-checker-context-menu-ban = Proibir reprodução

## Reproduction Feature - Tags
reproduction-checker-tag = Tem Reprodução
reproduction-checker-tag-is-reproduction = É uma Reprodução
reproduction-checker-tag-added-by-checker = Adicionado pelo Replication Checker
reproduction-checker-tag-readonly-origin = Original presente em biblioteca (só de leitura)

## Reproduction Feature - Outcome Tags
reproduction-checker-tag-outcome-cs-robust = Reprodução: Computacionalmente bem-sucedida, Robusta
reproduction-checker-tag-outcome-cs-challenges = Reprodução: Computacionalmente bem-sucedida, Desafios de robustez
reproduction-checker-tag-outcome-cs-not-checked = Reprodução: Computacionalmente bem-sucedida, Robustez não verificada
reproduction-checker-tag-outcome-ci-robust = Reprodução: Problemas computacionais, Robusta
reproduction-checker-tag-outcome-ci-challenges = Reprodução: Problemas computacionais, Desafios de robustez
reproduction-checker-tag-outcome-ci-not-checked = Reprodução: Problemas computacionais, Robustez não verificada

## Reproduction Feature - Note Template
reproduction-checker-note-title = Reproduções Encontradas
reproduction-checker-note-warning = Esta nota é gerada automaticamente. Se for editada, será criada uma nova nota na próxima verificação e esta versão será mantida como está.
reproduction-checker-note-intro = Este estudo foi reproduzido:
reproduction-checker-note-feedback = Este resultado foi útil? Deixe o seu feedback <a href="{ $url }" target="_blank">aqui</a>!
reproduction-checker-note-data-issues = Encontrou algum problema nos dados? Por favor, reporte-o <a href="{ $url }" target="_blank">aqui</a>!
reproduction-checker-note-footer = Gerado pelo Zotero Replication Checker com recurso à Base de Dados de Literatura FORRT (FLoRA)

## Reproduction Feature - Item Details
reproduction-checker-li-no-title = Nenhum título disponível
reproduction-checker-li-no-authors = Nenhum autor disponível
reproduction-checker-li-no-journal = Sem revista
reproduction-checker-li-na = N/D
reproduction-checker-li-doi-label = DOI:
reproduction-checker-li-outcome = Resultado da Reprodução:
reproduction-checker-li-link = Este estudo tem um relatório associado:

## Reproduction Feature - Alerts
reproduction-checker-alert-no-reproductions-selected = Nenhum item de reprodução selecionado.
reproduction-checker-ban-title = Proibir reproduções
reproduction-checker-ban-confirm =
    Tem a certeza de que pretende proibir { $count } reprodução(ões)?

    Estes itens serão movidos para o lixo e não serão adicionados novamente em verificações futuras.
reproduction-checker-ban-success = { $count } reprodução(ões) proibida(s) com êxito.

## Reproduction Feature - Dialog
reproduction-checker-dialog-title = Estudos de Reprodução Encontrados
reproduction-checker-dialog-intro = Estudos de reprodução encontrados para:\n"{ $title }"
reproduction-checker-dialog-count = { $count } reprodução(ões) encontrada(s):
reproduction-checker-dialog-item = { $index }. { $title }\n({ $year })\n   Resultado: { $outcome }
reproduction-checker-dialog-more = ...e mais { $count } reprodução(ões)
reproduction-checker-dialog-question = Deseja adicionar informações de reprodução?
reproduction-checker-dialog-progress-title = Informações de Reprodução Adicionadas
reproduction-checker-dialog-progress-line = Informações de reprodução adicionadas a "{ $title }"

## Reproduction Feature - Progress
reproduction-checker-progress-reproductions-found = { $count } item(ns) com reproduções encontrado(s)

## Preference Pane
pref-autocheck-title = Verificação Automática da Biblioteca para Replicações
pref-autocheck-description = Verificar automaticamente estudos de replicação na sua biblioteca em intervalos regulares
pref-autocheck-disabled = Desativado (apenas verificação manual)
pref-autocheck-daily = Diário (verificar a cada 24 horas)
pref-autocheck-weekly = Semanal (verificar a cada 7 dias)
pref-autocheck-monthly = Mensal (verificar a cada 30 dias)
pref-autocheck-new-items = Verificar automaticamente novos itens adicionados à biblioteca (recomendado)
pref-autocheck-new-items-hint = Desative esta opção se preferir executar todas as verificações de replicação manualmente.
pref-autocheck-note = A verificação automática é executada em segundo plano enquanto o Zotero está aberto. Pode sempre verificar manualmente através do menu Ferramentas.
pref-blacklist-title = Replicações Proibidas
pref-blacklist-description = Gerir as replicações proibidas de aparecer na sua biblioteca
pref-blacklist-col-replication = Artigo de Replicação
pref-blacklist-col-original = Artigo Original
pref-blacklist-col-type = Tipo
pref-blacklist-col-banned = Proibido em
pref-blacklist-empty = Nenhuma replicação proibida
pref-blacklist-remove = Remover selecionado
pref-blacklist-clear = Limpar todas as replicações proibidas
pref-blacklist-hint = As replicações proibidas não serão adicionadas novamente em verificações futuras. Pode proibir replicações através do menu de contexto.
