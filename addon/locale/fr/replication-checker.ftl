# Zotero Replication Checker Locale File - French (Français)
# Modern Fluent format (.ftl)

## Menu Items
replication-checker-tools-menu = Vérifier la bibliothèque actuelle pour les réplications
replication-checker-context-menu = Vérifier les réplications
replication-checker-context-menu-ban = Exclure la réplication
replication-checker-context-menu-add-original = Ajouter l'original
replication-checker-context-menu-add-originals = Ajouter les originaux

## Progress Messages
replication-checker-progress-checking-library = Vérification des réplications
replication-checker-progress-checking-collection = Vérification des réplications dans la collection
replication-checker-progress-scanning-library = Analyse de la bibliothèque...
replication-checker-progress-scanning-collection = Analyse de la collection...
replication-checker-progress-found-dois = { $itemCount } éléments avec des DOI trouvés ({ $uniqueCount } uniques)
replication-checker-progress-checking-database = Consultation de la base de données de réplication...
replication-checker-progress-no-dois = Aucun élément avec des DOI trouvé dans la collection
replication-checker-progress-complete = Vérification terminée
replication-checker-progress-failed = Vérification échouée
replication-checker-progress-match-count =
    { $count ->
        [one] 1 élément avec des réplications trouvé
       *[other] { $count } éléments avec des réplications trouvés
    }
replication-checker-progress-copying-readonly = Copie des éléments de la bibliothèque en lecture seule vers la bibliothèque personnelle...

## Alerts
replication-checker-alert-title = Zotero Replication Checker
replication-checker-alert-no-dois-selected = Aucun DOI trouvé dans les éléments sélectionnés.
replication-checker-alert-no-collection = Veuillez sélectionner une collection avant d'exécuter cette vérification.
replication-checker-alert-no-originals-available = Aucune étude originale disponible pour cette réplication.
replication-checker-alert-no-doi = L'élément sélectionné n'a pas de DOI.
replication-checker-add-original-success = "{ $title }" ajouté avec succès dans "{ $folderName }".
replication-checker-add-original-exists = "{ $title }" est déjà dans votre bibliothèque — étiquettes, notes et relations mises à jour dans "{ $folderName }".
replication-checker-add-original-add-all-btn = Ajouter tous les originaux
replication-checker-add-original-confirm =
    { $count ->
        [one] 1 article original trouvé pour cette réplication. Veuillez sélectionner les originaux que vous souhaitez ajouter à votre bibliothèque.
       *[other] { $count } articles originaux trouvés pour cette réplication. Veuillez sélectionner les originaux que vous souhaitez ajouter à votre bibliothèque.
    }
replication-checker-add-original-select-btn = Sélectionner les originaux à ajouter
replication-checker-add-original-batch-success =
    { $newCount ->
        [one] 1 nouvelle étude originale ajoutée et { $existingCount } existante mise à jour dans "{ $folderName }".
       *[other] { $newCount } nouvelles études originales ajoutées et { $existingCount } existantes mises à jour dans "{ $folderName }".
    }
replication-checker-add-original-batch-new-only =
    { $count ->
        [one] 1 étude originale ajoutée avec succès dans "{ $folderName }".
       *[other] { $count } études originales ajoutées avec succès dans "{ $folderName }".
    }
replication-checker-add-original-batch-exists-only =
    { $count ->
        [one] 1 étude originale déjà dans votre bibliothèque — étiquettes, notes et relations mises à jour dans "{ $folderName }".
       *[other] { $count } études originales déjà dans votre bibliothèque — étiquettes, notes et relations mises à jour dans "{ $folderName }".
    }
replication-checker-error-title = Replication Checker - Erreur
replication-checker-error-api = Impossible de récupérer les données depuis l'API - vérifiez votre connexion Internet ou réessayez plus tard.
replication-checker-error-body =
    Échec de la vérification de { $target } pour les réplications :

    { $details }

    Impossible de récupérer les données depuis l'API - vérifiez votre connexion Internet ou réessayez plus tard.
replication-checker-target-library = la bibliothèque actuelle
replication-checker-target-selected = les éléments sélectionnés
replication-checker-target-collection = la collection sélectionnée

## Ban Feature
replication-checker-ban-title = Exclure les réplications
replication-checker-ban-confirm =
    { $count ->
        [one] Êtes-vous sûr de vouloir exclure 1 réplication ?
       *[other] Êtes-vous sûr de vouloir exclure { $count } réplications ?
    }

    Ces éléments seront déplacés vers la corbeille et ne seront pas rajoutés lors des vérifications futures.
replication-checker-ban-success =
    { $count ->
        [one] 1 réplication exclue avec succès.
       *[other] { $count } réplications exclues avec succès.
    }
replication-checker-alert-no-replications-selected = Aucun élément de réplication sélectionné.

## Dialog
replication-checker-dialog-title = Études de réplication trouvées
replication-checker-dialog-intro =
    Études de réplication trouvées pour :
    "{ $title }"
replication-checker-dialog-count =
    { $count ->
        [one] 1 réplication trouvée :
       *[other] { $count } réplications trouvées :
    }
replication-checker-dialog-item =
    { $index }. { $title }
    ({ $year })
       Résultat : { $outcome }
replication-checker-dialog-more =
    { $count ->
        [one] ...et 1 réplication supplémentaire
       *[other] ...et { $count } réplications supplémentaires
    }
replication-checker-dialog-question = Souhaitez-vous ajouter des informations de réplication ?
replication-checker-dialog-progress-title = Informations de réplication ajoutées
replication-checker-dialog-progress-line = Informations de réplication ajoutées à "{ $title }"
replication-checker-notif-replication-new =
    { $count ->
        [one] 1 nouvelle réplication ajoutée avec succès dans "{ $folderName }".
       *[other] { $count } nouvelles réplications ajoutées avec succès dans "{ $folderName }".
    }
replication-checker-notif-replication-exists =
    { $count ->
        [one] 1 réplication déjà dans votre bibliothèque — étiquettes, notes et relations mises à jour dans "{ $folderName }".
       *[other] { $count } réplications déjà dans votre bibliothèque — étiquettes, notes et relations mises à jour dans "{ $folderName }".
    }
replication-checker-notif-replication-mixed =
    { $newCount ->
        [one] 1 nouvelle et { $existingCount } réplication existante mises à jour dans "{ $folderName }".
       *[other] { $newCount } nouvelles et { $existingCount } réplications existantes mises à jour dans "{ $folderName }".
    }
replication-checker-dialog-is-replication-title = Étude originale trouvée
replication-checker-dialog-is-replication-message =
    { $count ->
        [one] Aucune réplication trouvée, mais il semble que ce soit une étude de réplication. 1 article original trouvé. Souhaitez-vous l'ajouter à votre bibliothèque ?
       *[other] Aucune réplication trouvée, mais il semble que ce soit une étude de réplication. { $count } articles originaux trouvés. Veuillez sélectionner les originaux que vous souhaitez ajouter à votre bibliothèque.
    }

## Read-Only Library Handling
replication-checker-readonly-dialog-title = Bibliothèque en lecture seule détectée
replication-checker-readonly-dialog-message =
    { $replicationCount ->
        [one] Cette bibliothèque est en lecture seule. Nous avons trouvé { $itemCount } élément(s) avec 1 réplication.
       *[other] Cette bibliothèque est en lecture seule. Nous avons trouvé { $itemCount } élément(s) avec { $replicationCount } réplications.
    }

    Souhaitez-vous copier les articles originaux et leurs réplications dans le "dossier réplications" de votre bibliothèque personnelle ?

## Shared Group Library Handling
replication-checker-group-dialog-title = Ajouter à la bibliothèque de groupe partagée ?
replication-checker-group-dialog-message =
    FLoRA a trouvé des réplications ou des reproductions pour { $itemCount } document(s) dans la bibliothèque de groupe « { $libraryName } ».

    Les ajouter crée des documents, des notes et des marqueurs visibles par tous les membres de ce groupe. Vous pouvez plutôt copier les articles originaux et leurs réplications et reproductions dans votre bibliothèque personnelle.
replication-checker-group-dialog-add-btn = Ajouter à la bibliothèque de groupe
replication-checker-group-dialog-copy-btn = Copier dans ma bibliothèque

## Results Messages
replication-checker-results-title-library = Analyse de la bibliothèque terminée
replication-checker-results-title-selected = Analyse des éléments sélectionnés terminée
replication-checker-results-title-collection = Analyse de la collection terminée
replication-checker-results-total = Total des éléments vérifiés : { $count }
replication-checker-results-dois = Éléments avec des DOI : { $count }
replication-checker-results-found =
    { $count ->
        [one] 1 élément a des réplications, stocké dans "{ $folderName }".
       *[other] { $count } éléments ont des réplications, stockés dans "{ $folderName }".
    }
replication-checker-results-none = Aucune réplication trouvée.
replication-checker-results-reproductions-found =
    { $count ->
        [one] 1 élément a des reproductions, stocké dans "{ $folderName }".
       *[other] { $count } éléments ont des reproductions, stockés dans "{ $folderName }".
    }
replication-checker-results-reproductions-none = Aucune reproduction trouvée.
replication-checker-results-footer = Consultez les notes pour plus de détails ou sélectionnez des éléments à revérifier.

## Tags
replication-checker-tag = A été répliqué
replication-checker-tag-is-replication = Est une réplication
replication-checker-tag-added-by-checker = Ajouté par Replication Checker
replication-checker-tag-success = Réplication : Réussie
replication-checker-tag-failure = Réplication : Échouée
replication-checker-tag-mixed = Réplication : Mitigée
replication-checker-tag-multiple-originals = Réplication : Plusieurs originaux
replication-checker-tag-readonly-origin = Original présent dans une bibliothèque en lecture seule
replication-checker-tag-has-been-replicated = A été répliqué
replication-checker-tag-has-been-reproduced = A été reproduit
replication-checker-tag-in-flora = Dans FLoRA

## Note Template
replication-checker-note-title = Réplications trouvées
replication-checker-note-warning = Cette note est générée automatiquement. Si vous la modifiez, une nouvelle note sera créée lors de la prochaine vérification et cette version sera conservée telle quelle.
replication-checker-note-intro = Cette étude a été répliquée :
replication-checker-note-feedback = Avez-vous trouvé ce résultat utile ? Donnez votre avis <a href="{ $url }" target="_blank">ici</a> !
replication-checker-note-data-issues = Avez-vous trouvé des problèmes dans les données ? Veuillez les signaler <a href="{ $url }" target="_blank">ici</a> !
replication-checker-note-footer = Généré par Zotero Replication Checker en utilisant la base de données de littérature FORRT (FLoRA)

## Replication Item Details
replication-checker-li-no-title = Aucun titre disponible
replication-checker-li-no-authors = Aucun auteur disponible
replication-checker-li-no-journal = Aucune revue
replication-checker-li-na = N/D
replication-checker-li-doi-label = DOI :
replication-checker-li-outcome = Résultat rapporté par l'auteur :
replication-checker-li-link = Cette étude a un rapport lié :

## First Run Prompt
replication-checker-prompt-title = Bienvenue dans Zotero Replication Checker !
replication-checker-prompt-first-run =
    Merci d'avoir installé Zotero Replication Checker !

    Ce plugin vous aide à découvrir des études de réplication en vérifiant automatiquement vos éléments de bibliothèque avec la base de données de littérature FORRT (FLoRA).

    Souhaitez-vous analyser votre bibliothèque pour les réplications maintenant ?

    • Cliquez sur "OK" pour commencer l'analyse (cela peut prendre quelques minutes)
    • Cliquez sur "Annuler" pour ignorer - vous pouvez toujours analyser plus tard depuis le menu Outils

reproduction-checker-readonly-dialog-title = Bibliothèque en lecture seule détectée
reproduction-checker-readonly-dialog-message =
    Cette bibliothèque est en lecture seule. Nous avons trouvé { $itemCount } document(s) avec { $reproductionCount } reproduction(s).

    Voulez-vous copier les articles originaux et leurs reproductions dans le dossier de reproductions de votre bibliothèque personnelle ?

## Onboarding
onboarding-features-privacy-title = Confidentiel par conception
onboarding-features-privacy-body = Vos DOI ne sont pas envoyés. Seuls les 3 premiers caractères d'un code brouillé quittent votre ordinateur, et la correspondance se fait localement.
onboarding-features-groups-title = Bibliothèques de groupe partagées
onboarding-features-new = Nouveau
onboarding-features-readonly-title = Bibliothèques en lecture seule
onboarding-features-readonly-body = Le plugin demande, puis copie les originaux et les études dans votre bibliothèque personnelle.
onboarding-features-verdict-title = Un point de départ, pas un verdict
onboarding-features-verdict-body = Les étiquettes reflètent la façon dont les auteurs décrivent leurs résultats. Une réplication échouée peut refléter le hasard, une faible puissance, ses propres défauts ou des conditions modifiées, pas seulement un original faux.
onboarding-features-languages-title = 6 langues
onboarding-features-languages-body = Suit la langue de Zotero.
onboarding-welcome-title = Des travaux de votre bibliothèque ont-ils été répliqués ?
onboarding-welcome-lead = Replication Checker compare votre bibliothèque à FLoRA, la FORRT Literature Database, et indique quels articles ont été répliqués ou reproduits.
onboarding-welcome-tags-title = Marqueurs
onboarding-welcome-tags-body = Voyez quels articles ont des réplications et quels en sont les résultats.
onboarding-welcome-notes-title = Notes
onboarding-welcome-notes-body = Chaque article trouvé reçoit une note avec ses études, résultats et liens DOI.
onboarding-welcome-studies-title = Études
onboarding-welcome-studies-body = Les réplications et reproductions sont ajoutées à une seule collection FLoRA.
onboarding-scan-title = Prêt à analyser votre bibliothèque ?
onboarding-scan-lead = La première analyse peut prendre quelques minutes selon la taille de votre bibliothèque.
onboarding-scan-note = Vous pouvez aussi analyser plus tard depuis le menu Outils et rouvrir ce guide depuis le menu Aide.
onboarding-btn-next = Suivant
onboarding-btn-back = Retour
onboarding-btn-skip = Passer la visite
onboarding-btn-done = Commencer
onboarding-btn-scan = Analyser ma bibliothèque
onboarding-btn-later = Pas maintenant
onboarding-btn-close = Fermer
onboarding-features-title = Bon à savoir
onboarding-features-groups-body = Rien n'est ajouté à une bibliothèque partagée sans votre accord. Vous pouvez modifier ce choix dans les Paramètres.
onboarding-btn-tour = Faire la visite
onboarding-btn-remind = Me le rappeler plus tard
onboarding-btn-open-settings = Ouvrir les Paramètres
onboarding-done-title = C'est tout
onboarding-done-lead = Votre bibliothèque a déjà été vérifiée. Vous pouvez rouvrir cette visite à tout moment depuis le menu Aide.
onboarding-example-prefix = Exemple de la visite FLoRA
onboarding-tour-tools-title = Vérifier toute une bibliothèque
onboarding-tour-tools-body = Sélectionnez une bibliothèque à gauche, puis choisissez cette option.
onboarding-tour-menu-title = Vérifier quelques articles
onboarding-tour-menu-body = Faites un clic droit sur des documents sélectionnés ou une collection. « Ajouter l'original » et « Exclure la réplication » se trouvent aussi ici.
onboarding-tour-example-title = Un article d'exemple
onboarding-tour-example-body = Après une vérification, les articles trouvés ressemblent à ceci. L'exemple est supprimé à la fin de la visite.
onboarding-tour-autocheck-title = Vérifications automatiques
onboarding-tour-autocheck-body = À quelle fréquence le plugin vérifie votre bibliothèque, et si les nouveaux documents sont vérifiés dès leur ajout.
onboarding-tour-libraries-title = Bibliothèques et bibliothèques de groupe
onboarding-tour-libraries-body = Les bibliothèques couvertes par les vérifications planifiées, et ce que fait une vérification dans une bibliothèque de groupe partagée.
onboarding-tour-stats-title = Vos statistiques FLoRA
onboarding-tour-stats-body = Chiffres par bibliothèque. Le lien vers l'Atlas est chiffré et expire après 30 jours.
onboarding-tour-banned-title = Liste des bannissements
onboarding-tour-banned-body = Retirez une entrée pour qu'elle puisse être ajoutée à nouveau.
onboarding-tour-names-title = Noms des collections
onboarding-tour-names-body = Renommez les collections FLoRA. Les documents restent à leur place.

## Reproduction Feature - Menu Items
reproduction-checker-context-menu-ban = Exclure la reproduction

## Reproduction Feature - Tags
reproduction-checker-tag = A été reproduit
reproduction-checker-tag-is-reproduction = Est une reproduction
reproduction-checker-tag-added-by-checker = Ajouté par Replication Checker
reproduction-checker-tag-readonly-origin = Original présent dans une bibliothèque en lecture seule

## Reproduction Feature - Outcome Tags
reproduction-checker-tag-outcome-cs-robust = Reproduction : Succès informatique, Robuste
reproduction-checker-tag-outcome-cs-challenges = Reproduction : Succès informatique, Défis de robustesse
reproduction-checker-tag-outcome-cs-not-checked = Reproduction : Succès informatique, Robustesse non vérifiée
reproduction-checker-tag-outcome-ci-robust = Reproduction : Problèmes informatiques, Robuste
reproduction-checker-tag-outcome-ci-challenges = Reproduction : Problèmes informatiques, Défis de robustesse
reproduction-checker-tag-outcome-ci-not-checked = Reproduction : Problèmes informatiques, Robustesse non vérifiée
reproduction-checker-tag-multiple-originals = Reproduction : Plusieurs originaux

## Reproduction Feature - Note Template
reproduction-checker-note-title = Reproductions trouvées
reproduction-checker-note-warning = Cette note est générée automatiquement. Si vous la modifiez, une nouvelle note sera créée lors de la prochaine vérification et cette version sera conservée telle quelle.
reproduction-checker-note-intro = Cette étude a été reproduite :
reproduction-checker-note-feedback = Avez-vous trouvé ce résultat utile ? Donnez votre avis <a href="{ $url }" target="_blank">ici</a> !
reproduction-checker-note-data-issues = Avez-vous trouvé des problèmes dans les données ? Veuillez les signaler <a href="{ $url }" target="_blank">ici</a> !
reproduction-checker-note-footer = Généré par Zotero Replication Checker en utilisant la base de données de littérature FORRT (FLoRA)

## Reproduction Feature - Item Details
reproduction-checker-li-no-title = Aucun titre disponible
reproduction-checker-li-no-authors = Aucun auteur disponible
reproduction-checker-li-no-journal = Aucune revue
reproduction-checker-li-na = N/D
reproduction-checker-li-doi-label = DOI :
reproduction-checker-li-outcome = Résultat de la reproduction :
reproduction-checker-li-link = Cette étude a un rapport lié :

## Reproduction Feature - Alerts
reproduction-checker-alert-no-reproductions-selected = Aucun élément de reproduction sélectionné.
reproduction-checker-ban-title = Exclure les reproductions
reproduction-checker-ban-confirm =
    { $count ->
        [one] Êtes-vous sûr de vouloir exclure 1 reproduction ?
       *[other] Êtes-vous sûr de vouloir exclure { $count } reproductions ?
    }

    Ces éléments seront déplacés vers la corbeille et ne seront pas rajoutés lors des vérifications futures.
reproduction-checker-ban-success =
    { $count ->
        [one] 1 reproduction exclue avec succès.
       *[other] { $count } reproductions exclues avec succès.
    }

## Reproduction Feature - Dialog
replication-checker-dialog-title-studies = Études associées trouvées
replication-checker-dialog-intro-studies =
    Études trouvées pour :
    « { $title } »
replication-checker-dialog-question-studies = Souhaitez-vous ajouter ces informations à votre bibliothèque ?
reproduction-checker-dialog-title = Études de reproduction trouvées
reproduction-checker-dialog-intro =
    Études de reproduction trouvées pour :
    "{ $title }"
reproduction-checker-dialog-count =
    { $count ->
        [one] 1 reproduction trouvée :
       *[other] { $count } reproductions trouvées :
    }
reproduction-checker-dialog-item =
    { $index }. { $title }
    ({ $year })
       Résultat : { $outcome }
reproduction-checker-dialog-more =
    { $count ->
        [one] ...et 1 reproduction supplémentaire
       *[other] ...et { $count } reproductions supplémentaires
    }
reproduction-checker-dialog-question = Souhaitez-vous ajouter des informations de reproduction ?
reproduction-checker-dialog-progress-title = Informations de reproduction ajoutées
reproduction-checker-dialog-progress-line = Informations de reproduction ajoutées à "{ $title }"

## Reproduction Feature - Progress
reproduction-checker-progress-reproductions-found =
    { $count ->
        [one] 1 élément avec des reproductions trouvé
       *[other] { $count } éléments avec des reproductions trouvés
    }

## Preference Pane
pref-autocheck-title = Vérification automatique de la bibliothèque pour les réplications
pref-autocheck-description = Vérifier automatiquement votre bibliothèque pour les études de réplication à intervalles réguliers
pref-autocheck-disabled = Désactivé (vérification manuelle uniquement)
pref-autocheck-daily = Quotidien (vérifier toutes les 24 heures)
pref-autocheck-weekly = Hebdomadaire (vérifier tous les 7 jours)
pref-autocheck-monthly = Mensuel (vérifier tous les 30 jours)
pref-autocheck-new-items = Vérifier automatiquement les nouveaux éléments ajoutés à la bibliothèque (recommandé)
pref-autocheck-new-items-hint = Désactivez cette option si vous préférez effectuer toutes les vérifications de réplication manuellement.
pref-autocheck-note = La vérification automatique s'exécute en arrière-plan lorsque Zotero est ouvert. Vous pouvez toujours vérifier manuellement depuis le menu Outils.
pref-folder-title = Nom du dossier de réplication
pref-repro-folder-title = Nom du dossier de reproduction
pref-originals-replication-folder-title = Dossier des originaux (liés aux réplications)
pref-originals-reproduction-folder-title = Dossier des originaux (liés aux reproductions)

## Collection Names
pref-root-folder-title = Collection principale FLoRA
pref-collections-title = Noms des collections FLoRA
pref-collections-description = Cliquez sur le crayon pour renommer une collection, puis sur la coche pour enregistrer. Les collections sont renommées immédiatement et tous les documents restent en place.
pref-collections-edit = Renommer
pref-collections-save = Enregistrer
pref-collections-cancel = Annuler
pref-collections-error-empty = Saisissez un nom.
pref-collections-error-duplicate = Une autre collection FLoRA utilise déjà ce nom.
pref-collections-error-save = La collection n'a pas pu être renommée. Veuillez réessayer.
pref-autocheck-libraries-title = Bibliothèques incluses dans les vérifications planifiées
pref-autocheck-libraries-personal = Bibliothèque personnelle uniquement (recommandé)
pref-autocheck-libraries-groups = Bibliothèques de groupe uniquement
pref-autocheck-libraries-all = Toutes les bibliothèques
pref-autocheck-libraries-hint = Les bibliothèques de groupe en lecture seule sont ignorées, car rien ne peut y être ajouté.
pref-group-add-title = Ajout de documents aux bibliothèques de groupe
pref-group-add-ask = Demander à chaque fois (recommandé)
pref-group-add-always = Toujours ajouter les documents
pref-group-add-tags = Ajouter seulement les marqueurs et notes, aucun nouveau document
pref-group-add-hint = S'applique aux bibliothèques de groupe modifiables. Pour les bibliothèques en lecture seule, le plugin demande toujours avant de copier dans votre bibliothèque personnelle.

## Stats Pane
pref-stats-title = Vos statistiques FLoRA
pref-stats-description = Statistiques basées sur votre bibliothèque Zotero actuelle
pref-stats-has-replication = Articles avec réplications
pref-stats-has-reproduction = Articles avec reproductions
pref-stats-is-replication = Articles identifiés comme réplications
pref-stats-originals = Articles originaux suivis
pref-stats-refresh = Actualiser les statistiques
pref-stats-no-originals = Aucun article original suivi trouvé dans votre bibliothèque. Effectuez d'abord une vérification des réplications.
pref-stats-open-atlas = Ouvrir dans FLoRA Atlas ↗
pref-stats-view-flora = Voir la base de données FLoRA →

pref-blacklist-title = Réplications exclues
pref-blacklist-description = Gérer les réplications que vous avez exclues de votre bibliothèque
pref-blacklist-col-replication = Article de réplication
pref-blacklist-col-original = Article original
pref-blacklist-col-type = Type
pref-blacklist-col-banned = Exclu le
pref-blacklist-empty = Aucune réplication exclue
pref-blacklist-remove = Supprimer la sélection
pref-blacklist-clear = Effacer toutes les réplications exclues
pref-blacklist-hint = Les réplications exclues ne seront pas rajoutées lors des vérifications futures. Vous pouvez exclure des réplications depuis le menu contextuel.
