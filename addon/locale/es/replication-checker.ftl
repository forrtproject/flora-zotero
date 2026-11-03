# Zotero Replication Checker Locale File - Spanish (Español)
# Modern Fluent format (.ftl)

## Menu Items
replication-checker-tools-menu = Verificar replicaciones en la biblioteca actual
replication-checker-context-menu = Verificar replicaciones
replication-checker-context-menu-ban = Bloquear replicación
replication-checker-context-menu-add-original = Añadir original
replication-checker-context-menu-add-originals = Añadir originales

## Progress Messages
replication-checker-progress-checking-library = Verificando replicaciones
replication-checker-progress-checking-collection = Verificando replicaciones en la colección
replication-checker-progress-scanning-library = Analizando biblioteca...
replication-checker-progress-scanning-collection = Analizando colección...
replication-checker-progress-found-dois = Se encontraron { $itemCount } elementos con DOI ({ $uniqueCount } únicos)
replication-checker-progress-checking-database = Consultando base de datos de replicaciones...
replication-checker-progress-no-dois = No se encontraron elementos con DOI en la colección
replication-checker-progress-complete = Verificación completa
replication-checker-progress-failed = Verificación fallida
replication-checker-progress-match-count =
    { $count ->
        [one] Se encontró 1 elemento con replicaciones
       *[other] Se encontraron { $count } elementos con replicaciones
    }
replication-checker-progress-copying-readonly = Copiando elementos de la biblioteca de solo lectura a la biblioteca personal...

## Alerts
replication-checker-alert-title = Zotero Replication Checker
replication-checker-alert-no-dois-selected = No se encontraron DOI en los elementos seleccionados.
replication-checker-alert-no-collection = Por favor seleccione una colección antes de ejecutar esta verificación.
replication-checker-alert-no-originals-available = No hay estudios originales disponibles para esta replicación.
replication-checker-alert-no-doi = El elemento seleccionado no tiene DOI.
replication-checker-add-original-success = "{ $title }" añadido con éxito a "{ $folderName }".
replication-checker-add-original-exists = "{ $title }" ya está en su biblioteca — etiquetas, notas y relaciones actualizadas en "{ $folderName }".
replication-checker-add-original-add-all-btn = Añadir todos los originales
replication-checker-add-original-confirm =
    { $count ->
        [one] Se encontró 1 artículo original para esta replicación. Seleccione qué originales desea añadir a su biblioteca.
       *[other] Se encontraron { $count } artículos originales para esta replicación. Seleccione qué originales desea añadir a su biblioteca.
    }
replication-checker-add-original-select-btn = Seleccionar qué originales añadir
replication-checker-add-original-batch-success =
    { $newCount ->
        [one] Se añadió 1 nuevo y se actualizó { $existingCount } estudio original existente en "{ $folderName }".
       *[other] Se añadieron { $newCount } nuevos y se actualizaron { $existingCount } estudios originales existentes en "{ $folderName }".
    }
replication-checker-add-original-batch-new-only =
    { $count ->
        [one] Se añadió exitosamente 1 estudio original a "{ $folderName }".
       *[other] Se añadieron exitosamente { $count } estudios originales a "{ $folderName }".
    }
replication-checker-add-original-batch-exists-only =
    { $count ->
        [one] 1 estudio original ya en su biblioteca — etiquetas, notas y relaciones actualizadas en "{ $folderName }".
       *[other] { $count } estudios originales ya en su biblioteca — etiquetas, notas y relaciones actualizadas en "{ $folderName }".
    }
replication-checker-error-title = Replication Checker - Error
replication-checker-error-api = No se pudieron recuperar datos de la API - verifique su conexión a Internet o inténtelo de nuevo más tarde.
replication-checker-error-body =
    Error al verificar { $target } para replicaciones:

    { $details }

    No se pudieron recuperar datos de la API - verifique su conexión a Internet o inténtelo de nuevo más tarde.
replication-checker-target-library = la biblioteca actual
replication-checker-target-selected = los elementos seleccionados
replication-checker-target-collection = la colección seleccionada

## Ban Feature
replication-checker-ban-title = Bloquear replicaciones
replication-checker-ban-confirm =
    { $count ->
        [one] ¿Está seguro de que desea bloquear 1 replicación?
       *[other] ¿Está seguro de que desea bloquear { $count } replicaciones?
    }

    Estos elementos serán movidos a la papelera y no se añadirán de nuevo en futuras verificaciones.
replication-checker-ban-success =
    { $count ->
        [one] Se bloqueó exitosamente 1 replicación.
       *[other] Se bloquearon exitosamente { $count } replicaciones.
    }
replication-checker-alert-no-replications-selected = No se seleccionaron elementos de replicación.

## Dialog
replication-checker-dialog-title = Estudios de replicación encontrados
replication-checker-dialog-intro =
    Estudios de replicación encontrados para:
    "{ $title }"
replication-checker-dialog-count =
    { $count ->
        [one] Se encontró 1 replicación:
       *[other] Se encontraron { $count } replicaciones:
    }
replication-checker-dialog-item =
    { $index }. { $title }
    ({ $year })
       Resultado: { $outcome }
replication-checker-dialog-more =
    { $count ->
        [one] ...y 1 replicación más
       *[other] ...y { $count } replicaciones más
    }
replication-checker-dialog-question = ¿Desea añadir información de replicación?
replication-checker-dialog-progress-title = Información de replicación añadida
replication-checker-dialog-progress-line = Información de replicación añadida a "{ $title }"
replication-checker-notif-replication-new =
    { $count ->
        [one] Se añadió exitosamente 1 nueva replicación a "{ $folderName }".
       *[other] Se añadieron exitosamente { $count } nuevas replicaciones a "{ $folderName }".
    }
replication-checker-notif-replication-exists =
    { $count ->
        [one] 1 replicación ya en su biblioteca — etiquetas, notas y relaciones actualizadas en "{ $folderName }".
       *[other] { $count } replicaciones ya en su biblioteca — etiquetas, notas y relaciones actualizadas en "{ $folderName }".
    }
replication-checker-notif-replication-mixed =
    { $newCount ->
        [one] Se añadió 1 nueva y se actualizó { $existingCount } replicación existente en "{ $folderName }".
       *[other] Se añadieron { $newCount } nuevas y se actualizaron { $existingCount } replicaciones existentes en "{ $folderName }".
    }
replication-checker-dialog-is-replication-title = Estudio original encontrado
replication-checker-dialog-is-replication-message =
    { $count ->
        [one] No se encontraron replicaciones, pero esto parece ser un estudio de replicación. Se encontró 1 artículo original. ¿Desea añadirlo a su biblioteca?
       *[other] No se encontraron replicaciones, pero esto parece ser un estudio de replicación. Se encontraron { $count } artículos originales. ¿Desea seleccionar cuáles originales añadir a su biblioteca?
    }

## Read-Only Library Handling
replication-checker-readonly-dialog-title = Biblioteca de solo lectura detectada
replication-checker-readonly-dialog-message =
    { $replicationCount ->
        [one] Esta biblioteca es de solo lectura. Encontramos { $itemCount } elemento(s) con 1 replicación.
       *[other] Esta biblioteca es de solo lectura. Encontramos { $itemCount } elemento(s) con { $replicationCount } replicaciones.
    }

    ¿Desea copiar los artículos originales y sus replicaciones a la "carpeta de replicaciones" de su biblioteca personal?

## Shared Group Library Handling
replication-checker-group-dialog-title = ¿Añadir a la biblioteca de grupo compartida?
replication-checker-group-dialog-message =
    FLoRA ha encontrado replicaciones o reproducciones para { $itemCount } elemento(s) en la biblioteca de grupo «{ $libraryName }».

    Al añadirlas se crean elementos, notas y etiquetas que verán todos los miembros de este grupo. En su lugar, puedes copiar los artículos originales y sus replicaciones y reproducciones a tu biblioteca personal.
replication-checker-group-dialog-add-btn = Añadir a la biblioteca de grupo
replication-checker-group-dialog-copy-btn = Copiar a mi biblioteca

## Results Messages
replication-checker-results-title-library = Análisis de biblioteca completo
replication-checker-results-title-selected = Análisis de elementos seleccionados completo
replication-checker-results-title-collection = Análisis de colección completo
replication-checker-results-total = Total de elementos verificados: { $count }
replication-checker-results-dois = Elementos con DOI: { $count }
replication-checker-results-found =
    { $count ->
        [one] 1 elemento tiene replicaciones, almacenado en "{ $folderName }".
       *[other] { $count } elementos tienen replicaciones, almacenados en "{ $folderName }".
    }
replication-checker-results-none = No se encontraron replicaciones.
replication-checker-results-reproductions-found =
    { $count ->
        [one] 1 elemento tiene reproducciones, almacenado en "{ $folderName }".
       *[other] { $count } elementos tienen reproducciones, almacenados en "{ $folderName }".
    }
replication-checker-results-reproductions-none = No se encontraron reproducciones.
replication-checker-results-footer = Ver notas para detalles o seleccionar elementos para reverificar.

## Tags
replication-checker-tag = Ha sido replicado
replication-checker-tag-is-replication = Es una replicación
replication-checker-tag-added-by-checker = Añadido por Replication Checker
replication-checker-tag-success = Replicación: Exitosa
replication-checker-tag-failure = Replicación: Fallida
replication-checker-tag-mixed = Replicación: Mixta
replication-checker-tag-multiple-originals = Replicación: Múltiples originales
replication-checker-tag-readonly-origin = Original presente en biblioteca de solo lectura
replication-checker-tag-has-been-replicated = Ha sido replicado
replication-checker-tag-has-been-reproduced = Ha sido reproducido
replication-checker-tag-in-flora = En FLoRA

## Note Template
replication-checker-note-title = Replicaciones encontradas
replication-checker-note-warning = Esta nota es generada automáticamente. Si la edita, se creará una nueva nota en la próxima verificación y esta versión se conservará tal cual.
replication-checker-note-intro = Este estudio ha sido replicado:
replication-checker-note-feedback = ¿Encontró útil este resultado? Proporcione comentarios <a href="{ $url }" target="_blank">aquí</a>!
replication-checker-note-data-issues = ¿Encontró algún problema en los datos? Por favor repórtelo <a href="{ $url }" target="_blank">aquí</a>!
replication-checker-note-footer = Generado por Zotero Replication Checker usando la Base de datos de literatura FORRT (FLoRA)

## Replication Item Details
replication-checker-li-no-title = Sin título disponible
replication-checker-li-no-authors = Sin autores disponibles
replication-checker-li-no-journal = Sin revista
replication-checker-li-na = N/D
replication-checker-li-doi-label = DOI:
replication-checker-li-outcome = Resultado reportado por el autor:
replication-checker-li-link = Este estudio tiene un informe vinculado:

## First Run Prompt
replication-checker-prompt-title = ¡Bienvenido a Zotero Replication Checker!
replication-checker-prompt-first-run =
    ¡Gracias por instalar Zotero Replication Checker!

    Este complemento le ayuda a descubrir estudios de replicación para su investigación verificando los elementos de su biblioteca en la Base de datos de literatura FORRT (FLoRA).

    ¿Desea analizar su biblioteca en busca de replicaciones ahora?

    • Haga clic en "Aceptar" para comenzar el análisis (esto puede tardar unos minutos)
    • Haga clic en "Cancelar" para omitir - siempre puede analizar más tarde desde el menú Herramientas

reproduction-checker-readonly-dialog-title = Biblioteca de solo lectura detectada
reproduction-checker-readonly-dialog-message =
    Esta biblioteca es de solo lectura. Hemos encontrado { $itemCount } elemento(s) con { $reproductionCount } reproducción(es).

    ¿Quieres copiar los artículos originales y sus reproducciones a la carpeta de reproducciones de tu biblioteca personal?

## Onboarding
onboarding-check-library-title = Biblioteca, colección o elementos
onboarding-check-library-body = Usa el menú Herramientas para toda una biblioteca, o haz clic derecho en una colección o elementos.
onboarding-check-auto-title = Comprobaciones automáticas
onboarding-check-auto-body = Los elementos nuevos se comprueban al añadirlos y tu biblioteca personal según un calendario.
onboarding-check-original-title = Añadir original
onboarding-check-original-body = ¿Guardaste una replicación sin su original? Haz clic derecho para añadir el estudio original.
onboarding-check-ban-title = Bloquear replicación
onboarding-check-ban-body = Haz clic derecho en una replicación o reproducción no deseada para bloquearla; no volverá a añadirse.
onboarding-results-lead = Lo que crea el plugin va dentro de una colección FLoRA, y cada artículo se explica por sí mismo.
onboarding-results-collection-title = Una colección FLoRA
onboarding-results-collection-body = Las replicaciones, reproducciones y originales vinculados tienen cada uno una subcolección.
onboarding-results-notes-title = Notas
onboarding-results-notes-body = Las notas de replicaciones y reproducciones encontradas enumeran cada estudio, su resultado y enlaces.
onboarding-results-tags-title = Etiquetas
onboarding-results-tags-body = Filtra por el tipo de artículo y por el resultado de sus replicaciones o reproducciones.
onboarding-results-links-title = Vinculados en ambos sentidos
onboarding-results-links-body = Los originales y sus replicaciones o reproducciones aparecen como elementos relacionados entre sí.
onboarding-features-title = Pensado para la forma de trabajar en investigación
onboarding-features-lead = Algunas cosas más que conviene saber antes de empezar.
onboarding-features-privacy-title = Privado por diseño
onboarding-features-privacy-body = Tus DOI no se envían. Solo los 3 primeros caracteres de un código codificado salen de tu ordenador, y la coincidencia es local.
onboarding-features-groups-title = Bibliotecas de grupo compartidas
onboarding-features-new = Nuevo
onboarding-features-groups-body = Tú decides en Ajustes: preguntar, añadir siempre o solo etiquetas y notas.
onboarding-features-autocheck-title = Comprobaciones programadas
onboarding-features-autocheck-body = Diarias, semanales o mensuales, en tu biblioteca personal, las de grupo o ambas.
onboarding-features-readonly-title = Bibliotecas de solo lectura
onboarding-features-readonly-body = El plugin pregunta y luego copia originales y estudios a tu biblioteca personal.
onboarding-features-banned-title = Lista de bloqueos
onboarding-features-banned-body = Consulta en Ajustes todo lo bloqueado y restáuralo cuando quieras.
onboarding-features-verdict-title = Un punto de partida, no un veredicto
onboarding-features-verdict-body = Las etiquetas reflejan cómo los autores describen sus resultados. Una replicación fallida puede reflejar azar, baja potencia, sus propios defectos o cambios en las condiciones, no solo un original falso.
onboarding-features-languages-title = 6 idiomas
onboarding-features-languages-body = Sigue el idioma de Zotero.
onboarding-welcome-title = ¿Se ha replicado algo de tu biblioteca?
onboarding-welcome-lead = Replication Checker compara tu biblioteca con FLoRA, la FORRT Literature Database, y muestra qué artículos se han replicado o reproducido.
onboarding-welcome-tags-title = Etiquetas
onboarding-welcome-tags-body = Comprueba qué artículos tienen replicaciones y cuál fue su resultado.
onboarding-welcome-notes-title = Notas
onboarding-welcome-notes-body = Cada artículo encontrado recibe una nota con sus estudios, resultados y enlaces DOI.
onboarding-welcome-studies-title = Estudios
onboarding-welcome-studies-body = Las replicaciones y reproducciones se añaden a una sola colección FLoRA.
onboarding-check-title = Comprueba tanto o tan poco como quieras
onboarding-check-lead = Ejecuta una comprobación en toda una biblioteca, una colección o unos pocos elementos.
onboarding-results-title = Todo queda en un solo lugar
onboarding-atlas-title = Ve el panorama general
onboarding-atlas-lead = Editar → Ajustes → Replication Checker muestra recuentos actualizados de FLoRA para cada una de tus bibliotecas.
onboarding-atlas-stats-title = Contados por DOI único
onboarding-atlas-stats-body = Un artículo guardado dos veces cuenta una vez. Los elementos sin DOI utilizable se excluyen.
onboarding-atlas-open-title = Abrir en FLoRA Atlas
onboarding-atlas-open-body = Explora tus artículos en el Atlas. La lista está cifrada y el enlace caduca a los 30 días.
onboarding-scan-title = ¿Listo para analizar tu biblioteca?
onboarding-scan-lead = El primer análisis puede tardar unos minutos, según el tamaño de tu biblioteca.
onboarding-scan-note = También puedes analizarla más tarde desde el menú Herramientas y volver a abrir esta guía desde el menú Ayuda.
onboarding-btn-next = Siguiente
onboarding-btn-back = Atrás
onboarding-btn-skip = Omitir recorrido
onboarding-btn-done = Empezar
onboarding-btn-scan = Analizar mi biblioteca
onboarding-btn-later = Ahora no
onboarding-btn-close = Cerrar
onboarding-step = Paso { $current } de { $total }

## Reproduction Feature - Menu Items
reproduction-checker-context-menu-ban = Bloquear reproducción

## Reproduction Feature - Tags
reproduction-checker-tag = Ha sido reproducido
reproduction-checker-tag-is-reproduction = Es una reproducción
reproduction-checker-tag-added-by-checker = Añadido por Replication Checker
reproduction-checker-tag-readonly-origin = Original presente en biblioteca de solo lectura

## Reproduction Feature - Outcome Tags
reproduction-checker-tag-outcome-cs-robust = Reproducción: Computacionalmente exitosa, Robusta
reproduction-checker-tag-outcome-cs-challenges = Reproducción: Computacionalmente exitosa, Desafíos de robustez
reproduction-checker-tag-outcome-cs-not-checked = Reproducción: Computacionalmente exitosa, Robustez no verificada
reproduction-checker-tag-outcome-ci-robust = Reproducción: Problemas computacionales, Robusta
reproduction-checker-tag-outcome-ci-challenges = Reproducción: Problemas computacionales, Desafíos de robustez
reproduction-checker-tag-outcome-ci-not-checked = Reproducción: Problemas computacionales, Robustez no verificada
reproduction-checker-tag-multiple-originals = Reproducción: Múltiples originales

## Reproduction Feature - Note Template
reproduction-checker-note-title = Reproducciones encontradas
reproduction-checker-note-warning = Esta nota es generada automáticamente. Si la edita, se creará una nueva nota en la próxima verificación y esta versión se conservará tal cual.
reproduction-checker-note-intro = Este estudio ha sido reproducido:
reproduction-checker-note-feedback = ¿Encontró útil este resultado? Proporcione comentarios <a href="{ $url }" target="_blank">aquí</a>!
reproduction-checker-note-data-issues = ¿Encontró algún problema en los datos? Por favor repórtelo <a href="{ $url }" target="_blank">aquí</a>!
reproduction-checker-note-footer = Generado por Zotero Replication Checker usando la Base de datos de literatura FORRT (FLoRA)

## Reproduction Feature - Item Details
reproduction-checker-li-no-title = Sin título disponible
reproduction-checker-li-no-authors = Sin autores disponibles
reproduction-checker-li-no-journal = Sin revista
reproduction-checker-li-na = N/D
reproduction-checker-li-doi-label = DOI:
reproduction-checker-li-outcome = Resultado de la reproducción:
reproduction-checker-li-link = Este estudio tiene un informe vinculado:

## Reproduction Feature - Alerts
reproduction-checker-alert-no-reproductions-selected = No se seleccionaron elementos de reproducción.
reproduction-checker-ban-title = Bloquear reproducciones
reproduction-checker-ban-confirm =
    { $count ->
        [one] ¿Está seguro de que desea bloquear 1 reproducción?
       *[other] ¿Está seguro de que desea bloquear { $count } reproducciones?
    }

    Estos elementos serán movidos a la papelera y no se añadirán de nuevo en futuras verificaciones.
reproduction-checker-ban-success =
    { $count ->
        [one] Se bloqueó exitosamente 1 reproducción.
       *[other] Se bloquearon exitosamente { $count } reproducciones.
    }

## Reproduction Feature - Dialog
replication-checker-dialog-title-studies = Estudios relacionados encontrados
replication-checker-dialog-intro-studies =
    Estudios encontrados para:
    «{ $title }»
replication-checker-dialog-question-studies = ¿Desea añadir esta información a su biblioteca?
reproduction-checker-dialog-title = Estudios de reproducción encontrados
reproduction-checker-dialog-intro =
    Estudios de reproducción encontrados para:
    "{ $title }"
reproduction-checker-dialog-count =
    { $count ->
        [one] Se encontró 1 reproducción:
       *[other] Se encontraron { $count } reproducciones:
    }
reproduction-checker-dialog-item =
    { $index }. { $title }
    ({ $year })
       Resultado: { $outcome }
reproduction-checker-dialog-more =
    { $count ->
        [one] ...y 1 reproducción más
       *[other] ...y { $count } reproducciones más
    }
reproduction-checker-dialog-question = ¿Desea añadir información en el/los estudio/s de reproducción encontrados?
reproduction-checker-dialog-progress-title = Información de reproducción añadida
reproduction-checker-dialog-progress-line = Información de reproducción añadida a "{ $title }"

## Reproduction Feature - Progress
reproduction-checker-progress-reproductions-found =
    { $count ->
        [one] Se encontró 1 elemento con reproducciones
       *[other] Se encontraron { $count } elementos con reproducciones
    }

## Preference Pane
pref-autocheck-title = Verificación automática de biblioteca para replicaciones
pref-autocheck-description = Verificar automáticamente su biblioteca para estudios de replicación en intervalos regulares
pref-autocheck-disabled = Desactivado (solo verificación manual)
pref-autocheck-daily = Diario (verificar cada 24 horas)
pref-autocheck-weekly = Semanal (verificar cada 7 días)
pref-autocheck-monthly = Mensual (verificar cada 30 días)
pref-autocheck-new-items = Verificar automáticamente los nuevos elementos añadidos a la biblioteca (recomendado)
pref-autocheck-new-items-hint = Desactive esta opción si prefiere ejecutar todas las verificaciones de replicación manualmente.
pref-autocheck-note = La verificación automática se ejecuta en segundo plano cuando Zotero está abierto. Aún puede verificar manualmente usando el menú Herramientas.
pref-folder-title = Nombre de la carpeta de replicaciones
pref-repro-folder-title = Nombre de la carpeta de reproducciones
pref-originals-replication-folder-title = Carpeta de originales (vinculada a replicaciones)
pref-originals-reproduction-folder-title = Carpeta de originales (vinculada a reproducciones)

## Collection Names
pref-root-folder-title = Colección principal FLoRA
pref-collections-title = Nombres de colecciones FLoRA
pref-collections-description = Haz clic en el lápiz para renombrar una colección y en la marca para guardar. Las colecciones se renombran al momento y todos los elementos siguen en su sitio.
pref-collections-edit = Renombrar
pref-collections-save = Guardar
pref-collections-cancel = Cancelar
pref-collections-error-empty = Escribe un nombre.
pref-collections-error-duplicate = Otra colección FLoRA ya usa este nombre.
pref-collections-error-save = No se pudo renombrar la colección. Inténtalo de nuevo.
pref-autocheck-libraries-title = Bibliotecas incluidas en las comprobaciones programadas
pref-autocheck-libraries-personal = Solo la biblioteca personal (recomendado)
pref-autocheck-libraries-groups = Solo bibliotecas de grupo
pref-autocheck-libraries-all = Todas las bibliotecas
pref-autocheck-libraries-hint = Las bibliotecas de grupo de solo lectura se omiten, porque no se puede añadir nada a ellas.
pref-group-add-title = Añadir elementos a bibliotecas de grupo
pref-group-add-ask = Preguntar cada vez (recomendado)
pref-group-add-always = Añadir siempre los elementos
pref-group-add-tags = Añadir solo etiquetas y notas, sin elementos nuevos
pref-group-add-hint = Se aplica a las bibliotecas de grupo que puedes editar. En las de solo lectura, el plugin siempre pregunta antes de copiar a tu biblioteca personal.

## Stats Pane
pref-stats-title = Sus estadísticas de FLoRA
pref-stats-description = Estadísticas basadas en su biblioteca de Zotero actual
pref-stats-has-replication = Artículos con replicaciones
pref-stats-has-reproduction = Artículos con reproducciones
pref-stats-is-replication = Artículos identificados como replicaciones
pref-stats-originals = Artículos originales rastreados
pref-stats-refresh = Actualizar estadísticas
pref-stats-no-originals = No se encontraron artículos originales rastreados en su biblioteca. Ejecute primero una verificación de replicaciones.
pref-stats-open-atlas = Abrir en FLoRA Atlas ↗
pref-stats-view-flora = Ver base de datos FLoRA →

pref-blacklist-title = Replicaciones bloqueadas
pref-blacklist-description = Gestionar replicaciones que ha bloqueado de su biblioteca
pref-blacklist-col-replication = Artículo de replicación
pref-blacklist-col-original = Artículo original
pref-blacklist-col-type = Tipo
pref-blacklist-col-banned = Bloqueado el
pref-blacklist-empty = No hay replicaciones bloqueadas
pref-blacklist-remove = Eliminar selección
pref-blacklist-clear = Limpiar todas las replicaciones bloqueadas
pref-blacklist-hint = Las replicaciones bloqueadas no se añadirán de nuevo en futuras verificaciones. Puede bloquear replicaciones usando el menú contextual.
