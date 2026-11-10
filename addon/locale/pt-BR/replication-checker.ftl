# Zotero Replication Checker Locale File - Portuguese Brazil (Português do Brasil)
# Modern Fluent format (.ftl)

## Menu Items
replication-checker-tools-menu = Verificar replicações na biblioteca atual
replication-checker-context-menu = Verificar replicações
replication-checker-context-menu-ban = Banir replicação
replication-checker-context-menu-add-original = Adicionar original
replication-checker-context-menu-add-originals = Adicionar originais

## Progress Messages
replication-checker-progress-checking-library = Verificando replicações
replication-checker-progress-checking-collection = Verificando replicações na coleção
replication-checker-progress-scanning-library = Analisando biblioteca...
replication-checker-progress-scanning-collection = Analisando coleção...
replication-checker-progress-found-dois = { $itemCount } itens com DOIs encontrados ({ $uniqueCount } únicos)
replication-checker-progress-checking-database = Consultando banco de dados de replicações...
replication-checker-progress-no-dois = Nenhum item com DOI encontrado na coleção
replication-checker-progress-complete = Verificação concluída
replication-checker-progress-failed = Verificação falhou
replication-checker-progress-match-count =
    { $count ->
        [one] 1 item com replicações encontrado
       *[other] { $count } itens com replicações encontrados
    }
replication-checker-progress-copying-readonly = Copiando itens da biblioteca (somente leitura) para a biblioteca pessoal...

## Alerts
replication-checker-alert-title = Zotero Replication Checker
replication-checker-alert-no-dois-selected = Nenhum DOI encontrado nos itens selecionados.
replication-checker-alert-no-collection = Selecione uma coleção antes de executar esta verificação.
replication-checker-alert-no-originals-available = Nenhum estudo original disponível para esta replicação.
replication-checker-alert-no-doi = O item selecionado não possui DOI.
replication-checker-add-original-success = "{ $title }" adicionado com sucesso a "{ $folderName }".
replication-checker-add-original-exists = "{ $title }" já está em sua biblioteca — etiquetas, notas e relações atualizadas em "{ $folderName }".
replication-checker-add-original-add-all-btn = Adicionar todos os originais
replication-checker-add-original-confirm =
    { $count ->
        [one] Encontrado 1 artigo original para esta replicação. Selecione quais originais deseja adicionar à sua biblioteca.
       *[other] Encontrados { $count } artigos originais para esta replicação. Selecione quais originais deseja adicionar à sua biblioteca.
    }
replication-checker-add-original-select-btn = Selecionar quais originais adicionar
replication-checker-add-original-batch-success =
    { $newCount ->
        [one] 1 novo e { $existingCount } estudo original existente atualizados em "{ $folderName }".
       *[other] { $newCount } novos e { $existingCount } estudos originais existentes atualizados em "{ $folderName }".
    }
replication-checker-add-original-batch-new-only =
    { $count ->
        [one] 1 estudo original adicionado com sucesso a "{ $folderName }".
       *[other] { $count } estudos originais adicionados com sucesso a "{ $folderName }".
    }
replication-checker-add-original-batch-exists-only =
    { $count ->
        [one] 1 estudo original já em sua biblioteca — etiquetas, notas e relações atualizadas em "{ $folderName }".
       *[other] { $count } estudos originais já em sua biblioteca — etiquetas, notas e relações atualizadas em "{ $folderName }".
    }
replication-checker-error-title = Replication Checker - Erro
replication-checker-error-api = Não foi possível recuperar dados da API - verifique sua conexão com a Internet ou tente novamente mais tarde.
replication-checker-error-body =
    Falha ao verificar { $target } para replicações:

    { $details }

    Não foi possível recuperar dados da API - verifique sua conexão com a Internet ou tente novamente mais tarde.
replication-checker-target-library = a biblioteca atual
replication-checker-target-selected = os itens selecionados
replication-checker-target-collection = a coleção selecionada

## Ban Feature
replication-checker-ban-title = Banir replicações
replication-checker-ban-confirm =
    { $count ->
        [one] Tem certeza de que deseja banir 1 replicação?
       *[other] Tem certeza de que deseja banir { $count } replicações?
    }

    Estes itens serão movidos para a lixeira e não serão readicionados em verificações futuras.
replication-checker-ban-success =
    { $count ->
        [one] 1 replicação banida com sucesso.
       *[other] { $count } replicações banidas com sucesso.
    }
replication-checker-alert-no-replications-selected = Nenhum item de replicação selecionado.

## Dialog
replication-checker-dialog-title = Estudos de Replicação Encontrados
replication-checker-dialog-intro =
    Estudos de replicação encontrados para:
    "{ $title }"
replication-checker-dialog-count =
    { $count ->
        [one] 1 replicação encontrada:
       *[other] { $count } replicações encontradas:
    }
replication-checker-dialog-item =
    { $index }. { $title }
    ({ $year })
       Resultado: { $outcome }
replication-checker-dialog-more =
    { $count ->
        [one] ...e mais 1 replicação
       *[other] ...e mais { $count } replicações
    }
replication-checker-dialog-question = Deseja adicionar informações de replicação?
replication-checker-dialog-progress-title = Informações de Replicação Adicionadas
replication-checker-dialog-progress-line = Informações de replicação adicionadas a "{ $title }"
replication-checker-notif-replication-new =
    { $count ->
        [one] 1 nova replicação adicionada com sucesso a "{ $folderName }".
       *[other] { $count } novas replicações adicionadas com sucesso a "{ $folderName }".
    }
replication-checker-notif-replication-exists =
    { $count ->
        [one] 1 replicação já em sua biblioteca — etiquetas, notas e relações atualizadas em "{ $folderName }".
       *[other] { $count } replicações já em sua biblioteca — etiquetas, notas e relações atualizadas em "{ $folderName }".
    }
replication-checker-notif-replication-mixed =
    { $newCount ->
        [one] 1 nova e { $existingCount } replicação existente atualizadas em "{ $folderName }".
       *[other] { $newCount } novas e { $existingCount } replicações existentes atualizadas em "{ $folderName }".
    }
replication-checker-dialog-is-replication-title = Estudo Original Encontrado
replication-checker-dialog-is-replication-message =
    { $count ->
        [one] Nenhuma replicação encontrada, mas este parece ser um estudo de replicação. 1 artigo original encontrado. Deseja adicioná-lo à sua biblioteca?
       *[other] Nenhuma replicação encontrada, mas este parece ser um estudo de replicação. { $count } artigos originais encontrados. Selecione quais originais deseja adicionar à sua biblioteca.
    }

## Read-Only Library Handling
replication-checker-readonly-dialog-title = Biblioteca detectada (somente leitura)
replication-checker-readonly-dialog-message =
    { $replicationCount ->
        [one] Esta biblioteca tem acesso somente leitura. Encontramos { $itemCount } item(ns) com 1 replicação.
       *[other] Esta biblioteca tem acesso somente leitura. Encontramos { $itemCount } item(ns) com { $replicationCount } replicações.
    }

    Deseja copiar os artigos originais e suas replicações para a "pasta de replicações" da sua biblioteca pessoal?

## Shared Group Library Handling
replication-checker-group-dialog-title = Adicionar à biblioteca de grupo compartilhada?
replication-checker-group-dialog-message =
    O FLoRA encontrou replicações ou reproduções para { $itemCount } item(ns) na biblioteca de grupo "{ $libraryName }".

    Adicioná-las cria itens, notas e etiquetas que todos os membros deste grupo verão. Em vez disso, você pode copiar os artigos originais e suas replicações e reproduções para sua biblioteca pessoal.
replication-checker-group-dialog-add-btn = Adicionar à biblioteca de grupo
replication-checker-group-dialog-copy-btn = Copiar para minha biblioteca

## Results Messages
replication-checker-results-title-library = Análise da Biblioteca Concluída
replication-checker-results-title-selected = Análise dos Itens Selecionados Concluída
replication-checker-results-title-collection = Análise da Coleção Concluída
replication-checker-results-total = Total de itens verificados: { $count }
replication-checker-results-dois = Itens com DOIs: { $count }
replication-checker-results-found =
    { $count ->
        [one] 1 item tem replicações, armazenado em "{ $folderName }".
       *[other] { $count } itens têm replicações, armazenados em "{ $folderName }".
    }
replication-checker-results-none = Nenhuma replicação encontrada.
replication-checker-results-reproductions-found =
    { $count ->
        [one] 1 item tem reproduções, armazenado em "{ $folderName }".
       *[other] { $count } itens têm reproduções, armazenados em "{ $folderName }".
    }
replication-checker-results-reproductions-none = Nenhuma reprodução encontrada.
replication-checker-results-footer = Veja as notas para detalhes ou selecione itens para reverificar.

## Tags
replication-checker-tag = Foi Replicado
replication-checker-tag-is-replication = É uma Replicação
replication-checker-tag-added-by-checker = Adicionado pelo Replication Checker
replication-checker-tag-success = Replicação: Bem-sucedida
replication-checker-tag-failure = Replicação: Falhou
replication-checker-tag-mixed = Replicação: Mista
replication-checker-tag-multiple-originals = Replicação: Múltiplos originais
replication-checker-tag-readonly-origin = Original presente em biblioteca (somente leitura)
replication-checker-tag-has-been-replicated = Foi Replicado
replication-checker-tag-has-been-reproduced = Foi Reproduzido
replication-checker-tag-in-flora = Em FLoRA

## Note Template
replication-checker-note-title = Replicações Encontradas
replication-checker-note-warning = Esta nota é gerada automaticamente. Se você editá-la, uma nova nota será criada na próxima verificação e esta versão será mantida como está.
replication-checker-note-intro = Este estudo foi replicado:
replication-checker-note-feedback = Achou este resultado útil? Forneça feedback <a href="{ $url }" target="_blank">aqui</a>!
replication-checker-note-data-issues = Encontrou algum problema nos dados? Por favor, reporte-o <a href="{ $url }" target="_blank">aqui</a>!
replication-checker-note-footer = Gerado pelo Zotero Replication Checker usando o FLoRA (FORRT Library of Reproduction and Replication Attempts)

## Replication Item Details
replication-checker-li-no-title = Nenhum título disponível
replication-checker-li-no-authors = Nenhum autor disponível
replication-checker-li-no-journal = Sem revista
replication-checker-li-na = N/D
replication-checker-li-doi-label = DOI:
replication-checker-li-outcome = Resultado Relatado pelo Autor:
replication-checker-li-link = Este estudo tem um relatório vinculado:

## First Run Prompt
replication-checker-prompt-title = Bem-vindo ao Zotero Replication Checker!
replication-checker-prompt-first-run =
    Obrigado por instalar o Zotero Replication Checker!

    Este plugin ajuda você a descobrir estudos de replicação para sua pesquisa verificando os itens da sua biblioteca no FLoRA (FORRT Library of Reproduction and Replication Attempts).

    Deseja analisar sua biblioteca em busca de replicações agora?

    • Clique em "OK" para iniciar a análise (isso pode levar alguns minutos)
    • Clique em "Cancelar" para pular - você sempre pode analisar mais tarde pelo menu Ferramentas

reproduction-checker-readonly-dialog-title = Biblioteca somente leitura detectada
reproduction-checker-readonly-dialog-message =
    Esta biblioteca é somente leitura. Encontramos { $itemCount } item(ns) com { $reproductionCount } reprodução(ões).

    Deseja copiar os artigos originais e suas reproduções para a pasta de reproduções da sua biblioteca pessoal?

## Onboarding
onboarding-check-library-title = Biblioteca, coleção ou itens
onboarding-check-library-body = Use o menu Ferramentas para uma biblioteca inteira, ou clique com o botão direito em uma coleção ou em itens.
onboarding-check-auto-title = Verificações automáticas
onboarding-check-auto-body = Novos itens são verificados ao serem adicionados, e sua biblioteca pessoal, conforme uma programação.
onboarding-check-original-title = Adicionar original
onboarding-check-original-body = Salvou uma replicação sem o original? Clique com o botão direito para adicionar o estudo original.
onboarding-check-ban-title = Bloquear replicação
onboarding-check-ban-body = Clique com o botão direito em uma replicação ou reprodução indesejada para bloqueá-la; ela não será adicionada novamente.
onboarding-results-lead = O que o plugin cria fica em uma coleção FLoRA, e cada artigo se explica sozinho.
onboarding-results-collection-title = Uma coleção FLoRA
onboarding-results-collection-body = Replicações, reproduções e originais vinculados têm cada um uma subcoleção.
onboarding-results-notes-title = Notas
onboarding-results-notes-body = As notas de replicações e reproduções encontradas listam cada estudo, seu resultado e links.
onboarding-results-tags-title = Etiquetas
onboarding-results-tags-body = Filtre pelo tipo de artigo e pelo resultado de suas replicações ou reproduções.
onboarding-results-links-title = Vinculados nos dois sentidos
onboarding-results-links-body = Os originais e suas replicações ou reproduções aparecem como itens relacionados entre si.
onboarding-features-title = Feito para o trabalho de pesquisa
onboarding-features-lead = Mais algumas coisas que vale saber antes de começar.
onboarding-features-privacy-title = Privado por padrão
onboarding-features-privacy-body = Seus DOIs não são enviados. Apenas os 3 primeiros caracteres de um código embaralhado saem do computador, e a correspondência é local.
onboarding-features-groups-title = Bibliotecas de grupo compartilhadas
onboarding-features-new = Novo
onboarding-features-groups-body = Você decide nas Configurações: perguntar, sempre adicionar ou só etiquetas e notas.
onboarding-features-autocheck-title = Verificações programadas
onboarding-features-autocheck-body = Diárias, semanais ou mensais, na biblioteca pessoal, nas de grupo ou em ambas.
onboarding-features-readonly-title = Bibliotecas somente leitura
onboarding-features-readonly-body = O plugin pergunta e depois copia originais e estudos para sua biblioteca pessoal.
onboarding-features-banned-title = Lista de bloqueios
onboarding-features-banned-body = Veja nas Configurações tudo o que bloqueou e restaure quando quiser.
onboarding-features-verdict-title = Um ponto de partida, não um veredito
onboarding-features-verdict-body = As etiquetas refletem como os autores descrevem seus resultados. Uma replicação que falhou pode refletir acaso, baixo poder, falhas próprias ou condições alteradas, não apenas um original falso.
onboarding-features-languages-title = 6 idiomas
onboarding-features-languages-body = Segue o idioma do Zotero.
onboarding-welcome-title = Algo da sua biblioteca já foi replicado?
onboarding-welcome-lead = O Replication Checker compara sua biblioteca com o FLoRA, a FORRT Library of Reproduction and Replication Attempts, e mostra quais artigos foram replicados ou reproduzidos.
onboarding-welcome-tags-title = Etiquetas
onboarding-welcome-tags-body = Veja quais artigos têm replicações e quais foram os resultados.
onboarding-welcome-notes-title = Notas
onboarding-welcome-notes-body = Cada artigo encontrado recebe uma nota com estudos, resultados e links de DOI.
onboarding-welcome-studies-title = Estudos
onboarding-welcome-studies-body = Replicações e reproduções são adicionadas a uma única coleção FLoRA.
onboarding-check-title = Verifique o quanto quiser
onboarding-check-lead = Faça uma verificação em uma biblioteca inteira, em uma coleção ou em alguns itens.
onboarding-results-title = Tudo fica em um só lugar
onboarding-atlas-title = Veja o panorama geral
onboarding-atlas-lead = Editar → Configurações → Replication Checker mostra contagens atualizadas do FLoRA para cada uma das suas bibliotecas.
onboarding-atlas-stats-title = Contados por DOI único
onboarding-atlas-stats-body = Um artigo salvo duas vezes conta uma vez. Itens sem DOI utilizável ficam de fora.
onboarding-atlas-open-title = Abrir no FLoRA Atlas
onboarding-atlas-open-body = Explore seus artigos no Atlas. A lista é criptografada e o link expira após 30 dias.
onboarding-scan-title = Pronto para verificar sua biblioteca?
onboarding-scan-lead = A primeira verificação pode levar alguns minutos, dependendo do tamanho da sua biblioteca.
onboarding-scan-note = Você também pode verificar depois pelo menu Ferramentas e reabrir este guia pelo menu Ajuda.
onboarding-btn-next = Próximo
onboarding-btn-back = Voltar
onboarding-btn-skip = Pular tour
onboarding-btn-done = Começar
onboarding-btn-scan = Verificar minha biblioteca
onboarding-btn-later = Agora não
onboarding-btn-close = Fechar
onboarding-step = Etapa { $current } de { $total }

## Reproduction Feature - Menu Items
reproduction-checker-context-menu-ban = Banir reprodução

## Reproduction Feature - Tags
reproduction-checker-tag = Foi Reproduzido
reproduction-checker-tag-is-reproduction = É uma Reprodução
reproduction-checker-tag-added-by-checker = Adicionado pelo Replication Checker
reproduction-checker-tag-readonly-origin = Original presente em biblioteca (somente leitura)

## Reproduction Feature - Outcome Tags
reproduction-checker-tag-outcome-cs-robust = Reprodução: Computacionalmente bem-sucedida, Robusta
reproduction-checker-tag-outcome-cs-challenges = Reprodução: Computacionalmente bem-sucedida, Desafios de robustez
reproduction-checker-tag-outcome-cs-not-checked = Reprodução: Computacionalmente bem-sucedida, Robustez não verificada
reproduction-checker-tag-outcome-ci-robust = Reprodução: Problemas computacionais, Robusta
reproduction-checker-tag-outcome-ci-challenges = Reprodução: Problemas computacionais, Desafios de robustez
reproduction-checker-tag-outcome-ci-not-checked = Reprodução: Problemas computacionais, Robustez não verificada
reproduction-checker-tag-multiple-originals = Reprodução: Múltiplos originais

## Reproduction Feature - Note Template
reproduction-checker-note-title = Reproduções Encontradas
reproduction-checker-note-warning = Esta nota é gerada automaticamente. Se você editá-la, uma nova nota será criada na próxima verificação e esta versão será mantida como está.
reproduction-checker-note-intro = Este estudo foi reproduzido:
reproduction-checker-note-feedback = Achou este resultado útil? Forneça feedback <a href="{ $url }" target="_blank">aqui</a>!
reproduction-checker-note-data-issues = Encontrou algum problema nos dados? Por favor, reporte-o <a href="{ $url }" target="_blank">aqui</a>!
reproduction-checker-note-footer = Gerado pelo Zotero Replication Checker usando o FLoRA (FORRT Library of Reproduction and Replication Attempts)

## Reproduction Feature - Item Details
reproduction-checker-li-no-title = Nenhum título disponível
reproduction-checker-li-no-authors = Nenhum autor disponível
reproduction-checker-li-no-journal = Sem revista
reproduction-checker-li-na = N/D
reproduction-checker-li-doi-label = DOI:
reproduction-checker-li-outcome = Resultado da Reprodução:
reproduction-checker-li-link = Este estudo tem um relatório vinculado:

## Reproduction Feature - Alerts
reproduction-checker-alert-no-reproductions-selected = Nenhum item de reprodução selecionado.
reproduction-checker-ban-title = Banir reproduções
reproduction-checker-ban-confirm =
    { $count ->
        [one] Tem certeza de que deseja banir 1 reprodução?
       *[other] Tem certeza de que deseja banir { $count } reproduções?
    }

    Estes itens serão movidos para a lixeira e não serão readicionados em verificações futuras.
reproduction-checker-ban-success =
    { $count ->
        [one] 1 reprodução banida com sucesso.
       *[other] { $count } reproduções banidas com sucesso.
    }

## Reproduction Feature - Dialog
replication-checker-dialog-title-studies = Estudos relacionados encontrados
replication-checker-dialog-intro-studies =
    Estudos encontrados para:
    «{ $title }»
replication-checker-dialog-question-studies = Deseja adicionar estas informações à sua biblioteca?
reproduction-checker-dialog-title = Estudos de Reprodução Encontrados
reproduction-checker-dialog-intro =
    Estudos de reprodução encontrados para:
    "{ $title }"
reproduction-checker-dialog-count =
    { $count ->
        [one] 1 reprodução encontrada:
       *[other] { $count } reproduções encontradas:
    }
reproduction-checker-dialog-item =
    { $index }. { $title }
    ({ $year })
       Resultado: { $outcome }
reproduction-checker-dialog-more =
    { $count ->
        [one] ...e mais 1 reprodução
       *[other] ...e mais { $count } reproduções
    }
reproduction-checker-dialog-question = Deseja adicionar informações de reprodução?
reproduction-checker-dialog-progress-title = Informações de Reprodução Adicionadas
reproduction-checker-dialog-progress-line = Informações de reprodução adicionadas a "{ $title }"

## Reproduction Feature - Progress
reproduction-checker-progress-reproductions-found =
    { $count ->
        [one] 1 item com reproduções encontrado
       *[other] { $count } itens com reproduções encontrados
    }

## Preference Pane
pref-autocheck-title = Verificação Automática da Biblioteca para Replicações
pref-autocheck-description = Verificar automaticamente estudos de replicação em sua biblioteca em intervalos regulares
pref-autocheck-disabled = Desativado (somente verificação manual)
pref-autocheck-daily = Diário (verificar a cada 24 horas)
pref-autocheck-weekly = Semanal (verificar a cada 7 dias)
pref-autocheck-monthly = Mensal (verificar a cada 30 dias)
pref-autocheck-new-items = Verificar automaticamente novos itens adicionados à biblioteca (recomendado)
pref-autocheck-new-items-hint = Desative esta opção se preferir executar todas as verificações de replicação manualmente.
pref-autocheck-note = A verificação automática é executada em segundo plano quando o Zotero está aberto. Você ainda pode verificar manualmente pelo menu Ferramentas.
pref-folder-title = Nome da Pasta de Replicações
pref-repro-folder-title = Nome da Pasta de Reproduções
pref-originals-replication-folder-title = Pasta de Originais (vinculada a replicações)
pref-originals-reproduction-folder-title = Pasta de Originais (vinculada a reproduções)

## Collection Names
pref-root-folder-title = Coleção principal do FLoRA
pref-collections-title = Nomes das coleções FLoRA
pref-collections-description = Clique no lápis para renomear uma coleção e na marca para salvar. As coleções são renomeadas na hora, e todos os itens continuam onde estão.
pref-collections-edit = Renomear
pref-collections-save = Salvar
pref-collections-cancel = Cancelar
pref-collections-error-empty = Digite um nome.
pref-collections-error-duplicate = Outra coleção FLoRA já usa este nome.
pref-collections-error-save = Não foi possível renomear a coleção. Tente novamente.
pref-autocheck-libraries-title = Bibliotecas incluídas nas verificações programadas
pref-autocheck-libraries-personal = Somente a biblioteca pessoal (recomendado)
pref-autocheck-libraries-groups = Somente bibliotecas de grupo
pref-autocheck-libraries-all = Todas as bibliotecas
pref-autocheck-libraries-hint = Bibliotecas de grupo somente leitura são ignoradas, pois nada pode ser adicionado a elas.
pref-group-add-title = Adicionar itens a bibliotecas de grupo
pref-group-add-ask = Perguntar sempre (recomendado)
pref-group-add-always = Sempre adicionar itens
pref-group-add-tags = Adicionar só etiquetas e notas, sem novos itens
pref-group-add-hint = Vale para bibliotecas de grupo que você pode editar. Em bibliotecas somente leitura, o plugin sempre pergunta antes de copiar para sua biblioteca pessoal.

## Stats Pane
pref-stats-title = Suas Estatísticas do FLoRA
pref-stats-description = Estatísticas baseadas em sua biblioteca do Zotero atual
pref-stats-has-replication = Artigos com replicações
pref-stats-has-reproduction = Artigos com reproduções
pref-stats-is-replication = Artigos identificados como replicações
pref-stats-originals = Artigos originais rastreados
pref-stats-refresh = Atualizar Estatísticas
pref-stats-no-originals = Nenhum artigo original rastreado encontrado em sua biblioteca. Execute primeiro uma verificação de replicações.
pref-stats-open-atlas = Abrir no FLoRA Atlas ↗
pref-stats-view-flora = Ver Base de Dados FLoRA →

pref-blacklist-title = Replicações Banidas
pref-blacklist-description = Gerenciar a exibição de replicações banidas na sua biblioteca
pref-blacklist-col-replication = Artigo de Replicação
pref-blacklist-col-original = Artigo Original
pref-blacklist-col-type = Tipo
pref-blacklist-col-banned = Banido em
pref-blacklist-empty = Nenhuma replicação banida
pref-blacklist-remove = Remover selecionado
pref-blacklist-clear = Limpar todas as replicações banidas
pref-blacklist-hint = Replicações banidas não serão readicionadas em verificações futuras. Você pode banir replicações usando o menu de contexto.
