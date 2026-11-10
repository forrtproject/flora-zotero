# Zotero Replication Checker Locale File - European Portuguese (Português Europeu, Portugal)
# Modern Fluent format (.ftl)

## Menu Items / Itens do menu
replication-checker-tools-menu = Verificar replicações na biblioteca atual
replication-checker-context-menu = Verificar replicações
replication-checker-context-menu-ban = Excluir replicação
replication-checker-context-menu-add-original = Adicionar original
replication-checker-context-menu-add-originals = Adicionar originais

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
replication-checker-progress-match-count =
    { $count ->
        [one] Encontrado 1 item com replicações
       *[other] Encontrados { $count } itens com replicações
    }
replication-checker-progress-copying-readonly = A copiar itens da biblioteca só de leitura para a biblioteca pessoal...

## Alerts / Alertas
replication-checker-alert-title = Zotero Replication Checker
replication-checker-alert-no-dois-selected = Não foram encontrados DOIs nos itens selecionados.
replication-checker-alert-no-collection = Selecione uma coleção antes de executar esta verificação.
replication-checker-alert-no-originals-available = Não há estudos originais disponíveis para esta replicação.
replication-checker-alert-no-doi = O item selecionado não tem DOI.
replication-checker-add-original-success = "{ $title }" adicionado com sucesso a "{ $folderName }".
replication-checker-add-original-exists = "{ $title }" já está na sua biblioteca — etiquetas, notas e relações atualizadas em "{ $folderName }".
replication-checker-add-original-add-all-btn = Adicionar todos os originais
replication-checker-add-original-confirm =
    { $count ->
        [one] Foi encontrado 1 artigo original para esta replicação. Selecione quais originais pretende adicionar à sua biblioteca.
       *[other] Foram encontrados { $count } artigos originais para esta replicação. Selecione quais originais pretende adicionar à sua biblioteca.
    }
replication-checker-add-original-select-btn = Selecionar quais originais adicionar
replication-checker-add-original-batch-success =
    { $newCount ->
        [one] Adicionado 1 novo e atualizado { $existingCount } estudo original existente em "{ $folderName }".
       *[other] Adicionados { $newCount } novos e atualizados { $existingCount } estudos originais existentes em "{ $folderName }".
    }
replication-checker-add-original-batch-new-only =
    { $count ->
        [one] Foi adicionado com sucesso 1 estudo original a "{ $folderName }".
       *[other] Foram adicionados com sucesso { $count } estudos originais a "{ $folderName }".
    }
replication-checker-add-original-batch-exists-only =
    { $count ->
        [one] 1 estudo original já na sua biblioteca — etiquetas, notas e relações atualizadas em "{ $folderName }".
       *[other] { $count } estudos originais já na sua biblioteca — etiquetas, notas e relações atualizadas em "{ $folderName }".
    }
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
    { $count ->
        [one] Tem a certeza de que pretende excluir 1 replicação?
       *[other] Tem a certeza de que pretende excluir { $count } replicações?
    }

    Estes itens serão movidos para o lixo e não voltarão a ser adicionados em verificações futuras.

replication-checker-ban-success =
    { $count ->
        [one] 1 replicação excluída com sucesso.
       *[other] { $count } replicações excluídas com sucesso.
    }
replication-checker-alert-no-replications-selected = Não foram selecionados itens de replicação.

## Dialog
replication-checker-dialog-title = Estudos de replicação encontrados
replication-checker-dialog-intro =
    Estudos de replicação encontrados para:
    "{ $title }"
replication-checker-dialog-count =
    { $count ->
        [one] Encontrada 1 replicação:
       *[other] Encontradas { $count } replicações:
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
replication-checker-dialog-question = Pretende adicionar a informação sobre replicação?
replication-checker-dialog-progress-title = Informação de replicação adicionada
replication-checker-dialog-progress-line = Informação de replicação adicionada a "{ $title }"
replication-checker-notif-replication-new =
    { $count ->
        [one] 1 nova replicação adicionada com sucesso a "{ $folderName }".
       *[other] { $count } novas replicações adicionadas com sucesso a "{ $folderName }".
    }
replication-checker-notif-replication-exists =
    { $count ->
        [one] 1 replicação já na sua biblioteca — etiquetas, notas e relações atualizadas em "{ $folderName }".
       *[other] { $count } replicações já na sua biblioteca — etiquetas, notas e relações atualizadas em "{ $folderName }".
    }
replication-checker-notif-replication-mixed =
    { $newCount ->
        [one] Adicionada 1 nova e atualizada { $existingCount } replicação existente em "{ $folderName }".
       *[other] Adicionadas { $newCount } novas e atualizadas { $existingCount } replicações existentes em "{ $folderName }".
    }
replication-checker-dialog-is-replication-title = Estudo original encontrado
replication-checker-dialog-is-replication-message =
    { $count ->
        [one] Não foram encontradas replicações, mas este parece ser um estudo de replicação. Foi encontrado 1 artigo original. Pretende adicioná-lo à sua biblioteca?
       *[other] Não foram encontradas replicações, mas este parece ser um estudo de replicação. Foram encontrados { $count } artigos originais. Selecione quais originais pretende adicionar à sua biblioteca.
    }

## Read-Only Library Handling
replication-checker-readonly-dialog-title = Biblioteca só de leitura detetada
replication-checker-readonly-dialog-message =
    { $replicationCount ->
        [one] Esta biblioteca é só de leitura. Foram encontrados { $itemCount } item(ns) com 1 replicação.
       *[other] Esta biblioteca é só de leitura. Foram encontrados { $itemCount } item(ns) com { $replicationCount } replicações.
    }

    Pretende copiar os artigos originais e as respetivas replicações para a pasta de replicações da sua biblioteca pessoal?

## Shared Group Library Handling
replication-checker-group-dialog-title = Adicionar à biblioteca de grupo partilhada?
replication-checker-group-dialog-message =
    O FLoRA encontrou replicações ou reproduções para { $itemCount } item(ns) na biblioteca de grupo "{ $libraryName }".

    Adicioná-las cria itens, notas e etiquetas que todos os membros deste grupo verão. Em alternativa, pode copiar os artigos originais e as respetivas replicações e reproduções para a sua biblioteca pessoal.
replication-checker-group-dialog-add-btn = Adicionar à biblioteca de grupo
replication-checker-group-dialog-copy-btn = Copiar para a minha biblioteca

## Results Messages / Mensagens de Resultado
replication-checker-results-title-library = Análise da biblioteca concluída
replication-checker-results-title-selected = Análise dos itens selecionados concluída
replication-checker-results-title-collection = Análise da coleção concluída
replication-checker-results-total = Total de itens verificados: { $count }
replication-checker-results-dois = Itens com DOI: { $count }
replication-checker-results-found =
    { $count ->
        [one] 1 item com replicações, armazenado em "{ $folderName }".
       *[other] { $count } itens com replicações, armazenados em "{ $folderName }".
    }
replication-checker-results-none = Nenhuma replicação encontrada.
replication-checker-results-reproductions-found =
    { $count ->
        [one] 1 item com reproduções, armazenado em "{ $folderName }".
       *[other] { $count } itens com reproduções, armazenados em "{ $folderName }".
    }
replication-checker-results-reproductions-none = Não foram encontradas reproduções.
replication-checker-results-footer = Consulte as notas para mais detalhes ou selecione itens para nova verificação.

## Tags
replication-checker-tag = Foi replicado
replication-checker-tag-is-replication = É replicação
replication-checker-tag-added-by-checker = Adicionado pelo Replication Checker
replication-checker-tag-success = Replicação: Bem-sucedida
replication-checker-tag-failure = Replicação: Falhou
replication-checker-tag-mixed = Replicação: Mista
replication-checker-tag-multiple-originals = Replicação: Múltiplos originais
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
replication-checker-note-footer = Gerado pelo Zotero Replication Checker com base no FLoRA (FORRT Library of Reproduction and Replication Attempts)

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

   Este plugin ajuda a encontrar estudos de replicação para a sua investigação, ao verificar os itens da sua biblioteca no FLoRA (FORRT Library of Reproduction and Replication Attempts).

   Pretende analisar agora a sua biblioteca para procurar replicações?

    • Clique em "OK" para iniciar a análise (pode demorar alguns minutos)
    • Clique em "Cancel" para ignorar por agora - poderá sempre analisar mais tarde a partir do menu Ferramentas.

reproduction-checker-readonly-dialog-title = Biblioteca só de leitura detetada
reproduction-checker-readonly-dialog-message =
    Esta biblioteca é só de leitura. Encontrámos { $itemCount } item(ns) com { $reproductionCount } reprodução(ões).

    Pretende copiar os artigos originais e as respetivas reproduções para a pasta de reproduções da sua biblioteca pessoal?

## Onboarding
onboarding-check-library-title = Biblioteca, coleção ou itens
onboarding-check-library-body = Use o menu Ferramentas para uma biblioteca inteira, ou clique com o botão direito numa coleção ou em itens.
onboarding-check-auto-title = Verificações automáticas
onboarding-check-auto-body = Os novos itens são verificados ao serem adicionados e a sua biblioteca pessoal segundo um calendário.
onboarding-check-original-title = Adicionar original
onboarding-check-original-body = Guardou uma replicação sem o original? Clique com o botão direito para adicionar o estudo original.
onboarding-check-ban-title = Bloquear replicação
onboarding-check-ban-body = Clique com o botão direito numa replicação ou reprodução indesejada para a bloquear; não voltará a ser adicionada.
onboarding-results-lead = O que o plugin cria fica numa coleção FLoRA, e cada artigo explica-se a si próprio.
onboarding-results-collection-title = Uma coleção FLoRA
onboarding-results-collection-body = As replicações, reproduções e originais associados têm cada um uma subcoleção.
onboarding-results-notes-title = Notas
onboarding-results-notes-body = As notas de replicações e reproduções encontradas listam cada estudo, o seu resultado e ligações.
onboarding-results-tags-title = Etiquetas
onboarding-results-tags-body = Filtre pelo tipo de artigo e pelo resultado das suas replicações ou reproduções.
onboarding-results-links-title = Ligados nos dois sentidos
onboarding-results-links-body = Os originais e as respetivas replicações ou reproduções surgem como itens relacionados entre si.
onboarding-features-title = Feito para o trabalho de investigação
onboarding-features-lead = Mais algumas coisas que vale a pena saber antes de começar.
onboarding-features-privacy-title = Privado por conceção
onboarding-features-privacy-body = Os seus DOI não são enviados. Apenas os 3 primeiros caracteres de um código baralhado saem do computador, e a correspondência é local.
onboarding-features-groups-title = Bibliotecas de grupo partilhadas
onboarding-features-new = Novo
onboarding-features-groups-body = Decide nas Definições: perguntar, adicionar sempre ou só etiquetas e notas.
onboarding-features-autocheck-title = Verificações agendadas
onboarding-features-autocheck-body = Diárias, semanais ou mensais, na biblioteca pessoal, nas de grupo ou em ambas.
onboarding-features-readonly-title = Bibliotecas só de leitura
onboarding-features-readonly-body = O plugin pergunta e depois copia originais e estudos para a sua biblioteca pessoal.
onboarding-features-banned-title = Lista de bloqueios
onboarding-features-banned-body = Veja nas Definições tudo o que bloqueou e restaure quando quiser.
onboarding-features-verdict-title = Um ponto de partida, não um veredicto
onboarding-features-verdict-body = As etiquetas refletem a forma como os autores descrevem os seus resultados. Uma replicação que falhou pode refletir acaso, baixa potência, falhas próprias ou condições alteradas, não apenas um original falso.
onboarding-features-languages-title = 6 idiomas
onboarding-features-languages-body = Segue o idioma do Zotero.
onboarding-welcome-title = Algo da sua biblioteca já foi replicado?
onboarding-welcome-lead = O Replication Checker compara a sua biblioteca com o FLoRA, a FORRT Library of Reproduction and Replication Attempts, e mostra que artigos foram replicados ou reproduzidos.
onboarding-welcome-tags-title = Etiquetas
onboarding-welcome-tags-body = Veja que artigos têm replicações e quais foram os resultados.
onboarding-welcome-notes-title = Notas
onboarding-welcome-notes-body = Cada artigo encontrado recebe uma nota com estudos, resultados e ligações DOI.
onboarding-welcome-studies-title = Estudos
onboarding-welcome-studies-body = As replicações e reproduções são adicionadas a uma única coleção FLoRA.
onboarding-check-title = Verifique o quanto quiser
onboarding-check-lead = Execute uma verificação numa biblioteca inteira, numa coleção ou em alguns itens.
onboarding-results-title = Tudo fica num só lugar
onboarding-atlas-title = Veja o panorama geral
onboarding-atlas-lead = Editar → Definições → Replication Checker mostra contagens atualizadas do FLoRA para cada uma das suas bibliotecas.
onboarding-atlas-stats-title = Contados por DOI único
onboarding-atlas-stats-body = Um artigo guardado duas vezes conta uma vez. Os itens sem DOI utilizável ficam de fora.
onboarding-atlas-open-title = Abrir no FLoRA Atlas
onboarding-atlas-open-body = Explore os seus artigos no Atlas. A lista é encriptada e a ligação expira ao fim de 30 dias.
onboarding-scan-title = Pronto para verificar a sua biblioteca?
onboarding-scan-lead = A primeira verificação pode demorar alguns minutos, consoante o tamanho da sua biblioteca.
onboarding-scan-note = Também pode verificar mais tarde no menu Ferramentas e reabrir este guia no menu Ajuda.
onboarding-btn-next = Seguinte
onboarding-btn-back = Anterior
onboarding-btn-skip = Saltar visita
onboarding-btn-done = Começar
onboarding-btn-scan = Verificar a minha biblioteca
onboarding-btn-later = Agora não
onboarding-btn-close = Fechar
onboarding-step = Passo { $current } de { $total }

    💡 Pode aceder a este guia a qualquer momento:
    Ajuda → Guia do Utilizador do Replication Checker

## Reproduction Feature - Menu Items
reproduction-checker-context-menu-ban = Excluir reprodução

## Reproduction Feature - Tags
reproduction-checker-tag = Foi reproduzido
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
reproduction-checker-tag-multiple-originals = Reprodução: Múltiplos originais

## Reproduction Feature - Note Template
reproduction-checker-note-title = Reproduções encontradas
reproduction-checker-note-warning = Esta nota é gerada automaticamente. Se a editar, será criada uma nova nota na próxima verificação e esta versão será mantida tal como está.
reproduction-checker-note-intro = Este estudo foi reproduzido:
reproduction-checker-note-feedback = Este resultado foi útil? Envie o seu feedback <a href="{ $url }" target="_blank">aqui</a>!
reproduction-checker-note-data-issues = Encontrou algum problema nos dados? Por favor, reporte-o <a href="{ $url }" target="_blank">aqui</a>!
reproduction-checker-note-footer = Gerado pelo Zotero Replication Checker com base no FLoRA (FORRT Library of Reproduction and Replication Attempts)

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
    { $count ->
        [one] Tem a certeza de que pretende excluir 1 reprodução?
       *[other] Tem a certeza de que pretende excluir { $count } reproduções?
    }

    Estes itens serão movidos para o lixo e não voltarão a ser adicionados em verificações futuras.

reproduction-checker-ban-success =
    { $count ->
        [one] 1 reprodução excluída com sucesso.
       *[other] { $count } reproduções excluídas com sucesso.
    }

## Reproduction Feature - Dialog
replication-checker-dialog-title-studies = Estudos relacionados encontrados
replication-checker-dialog-intro-studies =
    Estudos encontrados para:
    «{ $title }»
replication-checker-dialog-question-studies = Pretende adicionar estas informações à sua biblioteca?
reproduction-checker-dialog-title = Estudos de reprodução encontrados
reproduction-checker-dialog-intro =
    Estudos de reprodução encontrados para:
    "{ $title }"
reproduction-checker-dialog-count =
    { $count ->
        [one] Encontrada 1 reprodução:
       *[other] Encontradas { $count } reproduções:
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
reproduction-checker-dialog-question = Pretende adicionar informação sobre reprodução?
reproduction-checker-dialog-progress-title = Informação de reprodução adicionada
reproduction-checker-dialog-progress-line = Informação de reprodução adicionada a "{ $title }"

## Reproduction Feature - Progress
reproduction-checker-progress-reproductions-found =
    { $count ->
        [one] Encontrado 1 item com reproduções
       *[other] Encontrados { $count } itens com reproduções
    }

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
pref-folder-title = Nome da pasta de replicações
pref-repro-folder-title = Nome da pasta de reproduções
pref-originals-replication-folder-title = Pasta de originais (ligada a replicações)
pref-originals-reproduction-folder-title = Pasta de originais (ligada a reproduções)

## Collection Names
pref-root-folder-title = Coleção principal do FLoRA
pref-collections-title = Nomes das coleções FLoRA
pref-collections-description = Clique no lápis para mudar o nome de uma coleção e na marca para guardar. As coleções mudam de nome de imediato, e todos os itens ficam onde estão.
pref-collections-edit = Mudar o nome
pref-collections-save = Guardar
pref-collections-cancel = Cancelar
pref-collections-error-empty = Introduza um nome.
pref-collections-error-duplicate = Outra coleção FLoRA já usa este nome.
pref-collections-error-save = Não foi possível mudar o nome da coleção. Tente novamente.
pref-autocheck-libraries-title = Bibliotecas incluídas nas verificações agendadas
pref-autocheck-libraries-personal = Apenas a biblioteca pessoal (recomendado)
pref-autocheck-libraries-groups = Apenas bibliotecas de grupo
pref-autocheck-libraries-all = Todas as bibliotecas
pref-autocheck-libraries-hint = As bibliotecas de grupo só de leitura são ignoradas, porque nada lhes pode ser adicionado.
pref-group-add-title = Adicionar itens a bibliotecas de grupo
pref-group-add-ask = Perguntar sempre (recomendado)
pref-group-add-always = Adicionar sempre os itens
pref-group-add-tags = Adicionar só etiquetas e notas, sem novos itens
pref-group-add-hint = Aplica-se às bibliotecas de grupo que pode editar. Nas bibliotecas só de leitura, o plugin pergunta sempre antes de copiar para a sua biblioteca pessoal.

## Stats Pane
pref-stats-title = As suas estatísticas do FLoRA
pref-stats-description = Estatísticas com base na sua biblioteca do Zotero atual
pref-stats-has-replication = Artigos com replicações
pref-stats-has-reproduction = Artigos com reproduções
pref-stats-is-replication = Artigos identificados como replicações
pref-stats-originals = Artigos originais monitorizados
pref-stats-refresh = Atualizar estatísticas
pref-stats-no-originals = Não foram encontrados artigos originais monitorizados na sua biblioteca. Execute primeiro uma verificação de replicações.
pref-stats-open-atlas = Abrir no FLoRA Atlas ↗
pref-stats-view-flora = Ver base de dados FLoRA →

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
