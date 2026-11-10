# Zotero Replication Checker Locale File - German
# Modern Fluent format (.ftl)

## Menu Items
replication-checker-tools-menu = Aktuelle Bibliothek auf Replikationen prüfen
replication-checker-context-menu = Auf Replikationen prüfen
replication-checker-context-menu-ban = Replikation sperren
replication-checker-context-menu-add-original = Original hinzufügen
replication-checker-context-menu-add-originals = Originale hinzufügen

## Progress Messages
replication-checker-progress-checking-library = Prüfung auf Replikationen läuft
replication-checker-progress-checking-collection = Prüfung auf Replikationen in Sammlung
replication-checker-progress-scanning-library = Bibliothek wird durchsucht...
replication-checker-progress-scanning-collection = Sammlung wird durchsucht...
replication-checker-progress-found-dois = { $itemCount } Einträge mit DOIs gefunden ({ $uniqueCount } einzigartig)
replication-checker-progress-checking-database = Abfrage der Replikationsdatenbank...
replication-checker-progress-no-dois = Keine Einträge mit DOIs in der Sammlung gefunden
replication-checker-progress-complete = Prüfung abgeschlossen
replication-checker-progress-failed = Prüfung fehlgeschlagen
replication-checker-progress-match-count =
    { $count ->
        [one] 1 Eintrag mit Replikationen gefunden
       *[other] { $count } Einträge mit Replikationen gefunden
    }
replication-checker-progress-copying-readonly = Kopiere Einträge aus schreibgeschützter Bibliothek in persönliche Bibliothek...

## Alerts
replication-checker-alert-title = Zotero Replication Checker
replication-checker-alert-no-dois-selected = Keine DOIs in den ausgewählten Einträgen gefunden.
replication-checker-alert-no-collection = Bitte wählen Sie eine Sammlung aus, bevor Sie diese Prüfung ausführen.
replication-checker-alert-no-originals-available = Keine Originalstudien für diese Replikation verfügbar.
replication-checker-alert-no-doi = Ausgewählter Eintrag hat keine DOI.
replication-checker-add-original-success = "{ $title }" erfolgreich zu "{ $folderName }" hinzugefügt.
replication-checker-add-original-exists = "{ $title }" ist bereits in Ihrer Bibliothek — Tags, Notizen und Beziehungen wurden in "{ $folderName }" aktualisiert.
replication-checker-add-original-add-all-btn = Alle Originale hinzufügen
replication-checker-add-original-confirm =
    { $count ->
        [one] 1 Originalstudie für diese Replikation gefunden. Bitte wählen Sie aus, welche Originale Sie zu Ihrer Bibliothek hinzufügen möchten.
       *[other] { $count } Originalstudien für diese Replikation gefunden. Bitte wählen Sie aus, welche Originale Sie zu Ihrer Bibliothek hinzufügen möchten.
    }
replication-checker-add-original-select-btn = Originale zur Hinzufügung auswählen
replication-checker-add-original-batch-success =
    { $newCount ->
        [one] 1 neue und { $existingCount } vorhandene Originalstudien in "{ $folderName }" aktualisiert.
       *[other] { $newCount } neue und { $existingCount } vorhandene Originalstudien in "{ $folderName }" aktualisiert.
    }
replication-checker-add-original-batch-new-only =
    { $count ->
        [one] 1 Originalstudie erfolgreich zu "{ $folderName }" hinzugefügt.
       *[other] { $count } Originalstudien erfolgreich zu "{ $folderName }" hinzugefügt.
    }
replication-checker-add-original-batch-exists-only =
    { $count ->
        [one] 1 Originalstudie bereits in Ihrer Bibliothek — Tags, Notizen und Beziehungen in "{ $folderName }" aktualisiert.
       *[other] { $count } Originalstudien bereits in Ihrer Bibliothek — Tags, Notizen und Beziehungen in "{ $folderName }" aktualisiert.
    }
replication-checker-error-title = Replication Checker - Fehler
replication-checker-error-api = Daten konnten nicht von der API abgerufen werden - überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut.
replication-checker-error-body =
    Fehler beim Prüfen von { $target } auf Replikationen:

    { $details }

    Daten konnten nicht von der API abgerufen werden - überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut.
replication-checker-target-library = die aktuelle Bibliothek
replication-checker-target-selected = die ausgewählten Einträge
replication-checker-target-collection = die ausgewählte Sammlung

## Ban Feature
replication-checker-ban-title = Replikationen sperren
replication-checker-ban-confirm =
    { $count ->
        [one] Sind Sie sicher, dass Sie 1 Replikation sperren möchten?
       *[other] Sind Sie sicher, dass Sie { $count } Replikationen sperren möchten?
    }

    Diese Einträge werden in den Papierkorb verschoben und bei zukünftigen Prüfungen nicht erneut hinzugefügt.
replication-checker-ban-success =
    { $count ->
        [one] 1 Replikation erfolgreich gesperrt.
       *[other] { $count } Replikationen erfolgreich gesperrt.
    }
replication-checker-alert-no-replications-selected = Keine Replikationseinträge ausgewählt.

## Dialog
replication-checker-dialog-title = Replikationsstudien gefunden
replication-checker-dialog-intro =
    Replikationsstudien gefunden für:
    "{ $title }"
replication-checker-dialog-count =
    { $count ->
        [one] 1 Replikation gefunden:
       *[other] { $count } Replikationen gefunden:
    }
replication-checker-dialog-item =
    { $index }. { $title }
    ({ $year })
       Ergebnis: { $outcome }
replication-checker-dialog-more =
    { $count ->
        [one] ...und 1 weitere Replikation
       *[other] ...und { $count } weitere Replikationen
    }
replication-checker-dialog-question = Möchten Sie Replikationsinformationen hinzufügen?
replication-checker-dialog-progress-title = Replikationsinformationen hinzugefügt
replication-checker-dialog-progress-line = Replikationsinformationen zu "{ $title }" hinzugefügt
replication-checker-notif-replication-new =
    { $count ->
        [one] 1 neue Replikation erfolgreich zu "{ $folderName }" hinzugefügt.
       *[other] { $count } neue Replikationen erfolgreich zu "{ $folderName }" hinzugefügt.
    }
replication-checker-notif-replication-exists =
    { $count ->
        [one] 1 Replikation bereits in Ihrer Bibliothek — Tags, Notizen und Beziehungen in "{ $folderName }" aktualisiert.
       *[other] { $count } Replikationen bereits in Ihrer Bibliothek — Tags, Notizen und Beziehungen in "{ $folderName }" aktualisiert.
    }
replication-checker-notif-replication-mixed =
    { $newCount ->
        [one] 1 neue und { $existingCount } vorhandene Replikationen in "{ $folderName }" aktualisiert.
       *[other] { $newCount } neue und { $existingCount } vorhandene Replikationen in "{ $folderName }" aktualisiert.
    }
replication-checker-dialog-is-replication-title = Originalstudie gefunden
replication-checker-dialog-is-replication-message =
    { $count ->
        [one] Keine Replikationen gefunden, aber dies scheint eine Replikationsstudie zu sein. 1 Originalartikel gefunden. Möchten Sie ihn zu Ihrer Bibliothek hinzufügen?
       *[other] Keine Replikationen gefunden, aber dies scheint eine Replikationsstudie zu sein. { $count } Originalartikel gefunden. Bitte wählen Sie aus, welche Originale Sie zu Ihrer Bibliothek hinzufügen möchten.
    }

## Read-Only Library Handling
replication-checker-readonly-dialog-title = Schreibgeschützte Bibliothek erkannt
replication-checker-readonly-dialog-message =
    { $replicationCount ->
        [one] Diese Bibliothek ist schreibgeschützt. Wir haben { $itemCount } Eintrag/Einträge mit 1 Replikation gefunden.
       *[other] Diese Bibliothek ist schreibgeschützt. Wir haben { $itemCount } Eintrag/Einträge mit { $replicationCount } Replikationen gefunden.
    }

    Möchten Sie die Originalartikel und ihre Replikationen in den "Replikationsordner" Ihrer persönlichen Bibliothek kopieren?

## Shared Group Library Handling
replication-checker-group-dialog-title = Zur geteilten Gruppenbibliothek hinzufügen?
replication-checker-group-dialog-message =
    FLoRA hat Replikationen oder Reproduktionen für { $itemCount } Eintrag/Einträge in der Gruppenbibliothek „{ $libraryName }“ gefunden.

    Beim Hinzufügen entstehen Einträge, Notizen und Tags, die alle Mitglieder dieser Gruppe sehen. Sie können die Originalartikel mit ihren Replikationen und Reproduktionen stattdessen in Ihre persönliche Bibliothek kopieren.
replication-checker-group-dialog-add-btn = Zur Gruppenbibliothek hinzufügen
replication-checker-group-dialog-copy-btn = In meine Bibliothek kopieren

## Results Messages
replication-checker-results-title-library = Bibliotheksscan abgeschlossen
replication-checker-results-title-selected = Scan ausgewählter Einträge abgeschlossen
replication-checker-results-title-collection = Sammlungsscan abgeschlossen
replication-checker-results-total = Geprüfte Einträge insgesamt: { $count }
replication-checker-results-dois = Einträge mit DOIs: { $count }
replication-checker-results-found =
    { $count ->
        [one] 1 Eintrag hat Replikationen, gespeichert in "{ $folderName }".
       *[other] { $count } Einträge haben Replikationen, gespeichert in "{ $folderName }".
    }
replication-checker-results-none = Keine Replikationen gefunden.
replication-checker-results-reproductions-found =
    { $count ->
        [one] 1 Eintrag hat Reproduktionen, gespeichert in "{ $folderName }".
       *[other] { $count } Einträge haben Reproduktionen, gespeichert in "{ $folderName }".
    }
replication-checker-results-reproductions-none = Keine Reproduktionen gefunden.
replication-checker-results-footer = Notizen für Details ansehen oder Einträge erneut prüfen.

## Tags
replication-checker-tag = Wurde repliziert
replication-checker-tag-is-replication = Ist Replikation
replication-checker-tag-added-by-checker = Hinzugefügt von Replication Checker
replication-checker-tag-success = Replikation: Erfolgreich
replication-checker-tag-failure = Replikation: Fehlgeschlagen
replication-checker-tag-mixed = Replikation: Gemischt
replication-checker-tag-multiple-originals = Replikation: Mehrere Originale
replication-checker-tag-readonly-origin = Original in schreibgeschützter Bibliothek vorhanden
replication-checker-tag-has-been-replicated = Wurde repliziert
replication-checker-tag-has-been-reproduced = Wurde reproduziert
replication-checker-tag-in-flora = In FLoRA

## Note Template
replication-checker-note-title = Replikationen gefunden
replication-checker-note-warning = Diese Notiz wird automatisch generiert. Wenn Sie sie bearbeiten, wird bei der nächsten Prüfung eine neue Notiz erstellt und diese Version bleibt unverändert erhalten.
replication-checker-note-intro = Diese Studie wurde repliziert:
replication-checker-note-feedback = War dieses Ergebnis hilfreich? Geben Sie <a href="{ $url }" target="_blank">hier</a> Feedback!
replication-checker-note-data-issues = Haben Sie Probleme mit den Daten gefunden? Bitte melden Sie diese <a href="{ $url }" target="_blank">hier</a>!
replication-checker-note-footer = Erstellt von Zotero Replication Checker unter Verwendung der FORRT Literaturdatenbank (FLoRA)

## Replication Item Details
replication-checker-li-no-title = Kein Titel verfügbar
replication-checker-li-no-authors = Keine Autoren verfügbar
replication-checker-li-no-journal = Keine Zeitschrift
replication-checker-li-na = k. A.
replication-checker-li-doi-label = DOI:
replication-checker-li-outcome = Von Autoren berichtetes Ergebnis:
replication-checker-li-link = Diese Studie hat einen verknüpften Bericht:

## First Run Prompt
replication-checker-prompt-title = Willkommen beim Zotero Replication Checker!
replication-checker-prompt-first-run =
    Vielen Dank für die Installation des Zotero Replication Checkers!

    Dieses Plugin hilft Ihnen, Replikationsstudien für Ihre Forschung zu entdecken, indem es Ihre Bibliothekseinträge mit der FORRT Literaturdatenbank (FLoRA) abgleicht.

    Möchten Sie Ihre Bibliothek jetzt auf Replikationen scannen?

    • Klicken Sie "OK", um den Scan zu starten (dies kann einige Minuten dauern)
    • Klicken Sie "Abbrechen", um zu überspringen - Sie können später jederzeit über das Menü scannen

reproduction-checker-readonly-dialog-title = Schreibgeschützte Bibliothek erkannt
reproduction-checker-readonly-dialog-message =
    Diese Bibliothek ist schreibgeschützt. Wir haben { $itemCount } Eintrag/Einträge mit { $reproductionCount } Reproduktion(en) gefunden.

    Möchten Sie die Originalartikel und ihre Reproduktionen in den Reproduktionsordner Ihrer persönlichen Bibliothek kopieren?

## Onboarding
onboarding-features-privacy-title = Datenschutz von Anfang an
onboarding-features-privacy-body = Ihre DOIs werden nicht übertragen. Nur die ersten 3 Zeichen eines verschlüsselten Codes verlassen Ihren Computer, der Abgleich erfolgt lokal.
onboarding-features-groups-title = Geteilte Gruppenbibliotheken
onboarding-features-new = Neu
onboarding-features-readonly-title = Schreibgeschützte Bibliotheken
onboarding-features-readonly-body = Das Plugin fragt und kopiert dann Originale und Studien in Ihre persönliche Bibliothek.
onboarding-features-verdict-title = Ein Ausgangspunkt, kein Urteil
onboarding-features-verdict-body = Tags spiegeln wider, wie Autoren ihre Ergebnisse beschreiben. Eine fehlgeschlagene Replikation kann auf Zufall, geringe Power, eigene Mängel oder veränderte Bedingungen zurückgehen, nicht nur auf ein falsches Original.
onboarding-features-languages-title = 6 Sprachen
onboarding-features-languages-body = Folgt Ihrer Zotero-Sprache.
onboarding-welcome-title = Wurde etwas aus Ihrer Bibliothek repliziert?
onboarding-welcome-lead = Replication Checker gleicht Ihre Bibliothek mit FLoRA, der FORRT Literature Database, ab und zeigt, welche Arbeiten repliziert oder reproduziert wurden.
onboarding-welcome-tags-title = Tags
onboarding-welcome-tags-body = Sehen Sie, welche Arbeiten Replikationen haben und wie diese ausgingen.
onboarding-welcome-notes-title = Notizen
onboarding-welcome-notes-body = Jede gefundene Arbeit erhält eine Notiz mit Studien, Ergebnissen und DOI-Links.
onboarding-welcome-studies-title = Studien
onboarding-welcome-studies-body = Replikationen und Reproduktionen landen in einer gemeinsamen FLoRA-Sammlung.
onboarding-scan-title = Bereit, Ihre Bibliothek zu prüfen?
onboarding-scan-lead = Die erste Prüfung kann je nach Größe Ihrer Bibliothek einige Minuten dauern.
onboarding-scan-note = Sie können auch später über das Menü „Werkzeuge“ prüfen und diese Anleitung im Menü „Hilfe“ erneut öffnen.
onboarding-btn-next = Weiter
onboarding-btn-back = Zurück
onboarding-btn-skip = Tour überspringen
onboarding-btn-done = Loslegen
onboarding-btn-scan = Bibliothek prüfen
onboarding-btn-later = Nicht jetzt
onboarding-btn-close = Schließen
onboarding-features-title = Wissenswertes
onboarding-features-groups-body = Ohne Rückfrage wird nichts zu einer geteilten Bibliothek hinzugefügt. Das können Sie in den Einstellungen ändern.
onboarding-btn-tour = Rundgang starten
onboarding-btn-remind = Später erinnern
onboarding-btn-open-settings = Einstellungen öffnen
onboarding-done-title = Das war's
onboarding-done-lead = Ihre Bibliothek wurde bereits geprüft. Sie können diesen Rundgang jederzeit über das Hilfe-Menü erneut öffnen.
onboarding-example-prefix = FLoRA-Rundgang-Beispiel
onboarding-tour-tools-title = Eine ganze Bibliothek prüfen
onboarding-tour-tools-body = Wählen Sie links eine Bibliothek und dann diesen Eintrag.
onboarding-tour-menu-title = Einzelne Artikel prüfen
onboarding-tour-menu-body = Klicken Sie mit der rechten Maustaste auf ausgewählte Einträge oder eine Sammlung. „Original hinzufügen“ und „Replikation sperren“ finden Sie hier ebenfalls.
onboarding-tour-example-title = Ein Beispielartikel
onboarding-tour-example-body = Nach einer Prüfung sehen gefundene Artikel so aus. Das Beispiel wird am Ende des Rundgangs entfernt.
onboarding-tour-autocheck-title = Automatische Prüfungen
onboarding-tour-autocheck-body = Wie oft das Plugin Ihre Bibliothek prüft und ob neue Einträge beim Hinzufügen geprüft werden.
onboarding-tour-libraries-title = Bibliotheken und Gruppenbibliotheken
onboarding-tour-libraries-body = Welche Bibliotheken geplante Prüfungen abdecken und was eine Prüfung in einer geteilten Gruppenbibliothek tut.
onboarding-tour-stats-title = Ihre FLoRA-Statistik
onboarding-tour-stats-body = Zahlen pro Bibliothek. Der Atlas-Link ist verschlüsselt und läuft nach 30 Tagen ab.
onboarding-tour-banned-title = Sperrliste
onboarding-tour-banned-body = Entfernen Sie einen Eintrag, damit er wieder hinzugefügt werden kann.
onboarding-tour-names-title = Sammlungsnamen
onboarding-tour-names-body = Benennen Sie die FLoRA-Sammlungen um. Die Einträge bleiben, wo sie sind.

## Reproduction Feature - Menu Items
reproduction-checker-context-menu-ban = Reproduktion sperren

## Reproduction Feature - Tags
reproduction-checker-tag = Wurde reproduziert
reproduction-checker-tag-is-reproduction = Ist Reproduktion
reproduction-checker-tag-added-by-checker = Hinzugefügt von Replication Checker
reproduction-checker-tag-readonly-origin = Original in schreibgeschützter Bibliothek vorhanden

## Reproduction Feature - Outcome Tags
reproduction-checker-tag-outcome-cs-robust = Reproduktion: Rechnerisch erfolgreich, Robust
reproduction-checker-tag-outcome-cs-challenges = Reproduktion: Rechnerisch erfolgreich, Robustheitsprobleme
reproduction-checker-tag-outcome-cs-not-checked = Reproduktion: Rechnerisch erfolgreich, Robustheit nicht geprüft
reproduction-checker-tag-outcome-ci-robust = Reproduktion: Rechnerische Probleme, Robust
reproduction-checker-tag-outcome-ci-challenges = Reproduktion: Rechnerische Probleme, Robustheitsprobleme
reproduction-checker-tag-outcome-ci-not-checked = Reproduktion: Rechnerische Probleme, Robustheit nicht geprüft
reproduction-checker-tag-multiple-originals = Reproduktion: Mehrere Originale

## Reproduction Feature - Note Template
reproduction-checker-note-title = Reproduktionen gefunden
reproduction-checker-note-warning = Diese Notiz wird automatisch generiert. Wenn Sie sie bearbeiten, wird bei der nächsten Prüfung eine neue Notiz erstellt und diese Version bleibt unverändert erhalten.
reproduction-checker-note-intro = Diese Studie wurde reproduziert:
reproduction-checker-note-feedback = War dieses Ergebnis hilfreich? Geben Sie <a href="{ $url }" target="_blank">hier</a> Feedback!
reproduction-checker-note-data-issues = Haben Sie Probleme mit den Daten gefunden? Bitte melden Sie diese <a href="{ $url }" target="_blank">hier</a>!
reproduction-checker-note-footer = Erstellt von Zotero Replication Checker unter Verwendung der FORRT Literaturdatenbank (FLoRA)

## Reproduction Feature - Item Details
reproduction-checker-li-no-title = Kein Titel verfügbar
reproduction-checker-li-no-authors = Keine Autoren verfügbar
reproduction-checker-li-no-journal = Keine Zeitschrift
reproduction-checker-li-na = k. A.
reproduction-checker-li-doi-label = DOI:
reproduction-checker-li-outcome = Reproduktionsergebnis:
reproduction-checker-li-link = Diese Studie hat einen verknüpften Bericht:

## Reproduction Feature - Alerts
reproduction-checker-alert-no-reproductions-selected = Keine Reproduktionseinträge ausgewählt.
reproduction-checker-ban-title = Reproduktionen sperren
reproduction-checker-ban-confirm =
    { $count ->
        [one] Sind Sie sicher, dass Sie 1 Reproduktion sperren möchten?
       *[other] Sind Sie sicher, dass Sie { $count } Reproduktionen sperren möchten?
    }

    Diese Einträge werden in den Papierkorb verschoben und bei zukünftigen Prüfungen nicht erneut hinzugefügt.
reproduction-checker-ban-success =
    { $count ->
        [one] 1 Reproduktion erfolgreich gesperrt.
       *[other] { $count } Reproduktionen erfolgreich gesperrt.
    }

## Reproduction Feature - Dialog
replication-checker-dialog-title-studies = Zugehörige Studien gefunden
replication-checker-dialog-intro-studies =
    Studien gefunden für:
    „{ $title }“
replication-checker-dialog-question-studies = Möchten Sie diese Informationen zu Ihrer Bibliothek hinzufügen?
reproduction-checker-dialog-title = Reproduktionsstudien gefunden
reproduction-checker-dialog-intro =
    Reproduktionsstudien gefunden für:
    "{ $title }"
reproduction-checker-dialog-count =
    { $count ->
        [one] 1 Reproduktion gefunden:
       *[other] { $count } Reproduktionen gefunden:
    }
reproduction-checker-dialog-item =
    { $index }. { $title }
    ({ $year })
       Ergebnis: { $outcome }
reproduction-checker-dialog-more =
    { $count ->
        [one] ...und 1 weitere Reproduktion
       *[other] ...und { $count } weitere Reproduktionen
    }
reproduction-checker-dialog-question = Möchten Sie Reproduktionsinformationen hinzufügen?
reproduction-checker-dialog-progress-title = Reproduktionsinformationen hinzugefügt
reproduction-checker-dialog-progress-line = Reproduktionsinformationen zu "{ $title }" hinzugefügt

## Reproduction Feature - Progress
reproduction-checker-progress-reproductions-found =
    { $count ->
        [one] 1 Eintrag mit Reproduktionen gefunden
       *[other] { $count } Einträge mit Reproduktionen gefunden
    }

## Preference Pane
pref-autocheck-title = Automatische Bibliotheksprüfung auf Replikationen
pref-autocheck-description = Ihre Bibliothek wird automatisch in regelmäßigen Abständen auf Replikationsstudien geprüft
pref-autocheck-disabled = Deaktiviert (nur manuelle Prüfung)
pref-autocheck-daily = Täglich (alle 24 Stunden prüfen)
pref-autocheck-weekly = Wöchentlich (alle 7 Tage prüfen)
pref-autocheck-monthly = Monatlich (alle 30 Tage prüfen)
pref-autocheck-new-items = Neu hinzugefügte Bibliothekseinträge automatisch prüfen (empfohlen)
pref-autocheck-new-items-hint = Deaktivieren Sie diese Option, wenn Sie alle Replikationsprüfungen manuell durchführen möchten.
pref-autocheck-note = Die automatische Prüfung läuft im Hintergrund, wenn Zotero geöffnet ist. Sie können weiterhin manuell über das Menü Werkzeuge prüfen.
pref-folder-title = Name des Replikationsordners
pref-repro-folder-title = Name des Reproduktionsordners
pref-originals-replication-folder-title = Originalordner (verknüpft mit Replikationen)
pref-originals-reproduction-folder-title = Originalordner (verknüpft mit Reproduktionen)

## Collection Names
pref-root-folder-title = FLoRA-Hauptsammlung
pref-collections-title = Namen der FLoRA-Sammlungen
pref-collections-description = Klicken Sie auf den Stift, um eine Sammlung umzubenennen, und auf das Häkchen, um zu speichern. Sammlungen werden sofort umbenannt, alle Einträge bleiben, wo sie sind.
pref-collections-edit = Umbenennen
pref-collections-save = Speichern
pref-collections-cancel = Abbrechen
pref-collections-error-empty = Geben Sie einen Namen ein.
pref-collections-error-duplicate = Eine andere FLoRA-Sammlung verwendet diesen Namen bereits.
pref-collections-error-save = Die Sammlung konnte nicht umbenannt werden. Bitte versuchen Sie es erneut.
pref-autocheck-libraries-title = Bibliotheken für geplante Prüfungen
pref-autocheck-libraries-personal = Nur persönliche Bibliothek (empfohlen)
pref-autocheck-libraries-groups = Nur Gruppenbibliotheken
pref-autocheck-libraries-all = Alle Bibliotheken
pref-autocheck-libraries-hint = Gruppenbibliotheken, die Sie nur lesen können, werden übersprungen, da dort nichts hinzugefügt werden kann.
pref-group-add-title = Einträge zu Gruppenbibliotheken hinzufügen
pref-group-add-ask = Jedes Mal fragen (empfohlen)
pref-group-add-always = Einträge immer hinzufügen
pref-group-add-tags = Nur Tags und Notizen hinzufügen, keine neuen Einträge
pref-group-add-hint = Gilt für Gruppenbibliotheken, die Sie bearbeiten können. Bei schreibgeschützten Bibliotheken fragt das Plugin immer, bevor es in Ihre persönliche Bibliothek kopiert.

## Stats Pane
pref-stats-title = Ihre FLoRA-Statistiken
pref-stats-description = Statistiken basierend auf Ihrer aktuellen Zotero-Bibliothek
pref-stats-has-replication = Artikel mit Replikationen
pref-stats-has-reproduction = Artikel mit Reproduktionen
pref-stats-is-replication = Als Replikationen identifizierte Artikel
pref-stats-originals = Verfolgte Originalartikel
pref-stats-refresh = Statistiken aktualisieren
pref-stats-no-originals = Keine verfolgten Originalartikel in Ihrer Bibliothek gefunden. Führen Sie zuerst eine Replikationsprüfung durch.
pref-stats-open-atlas = In FLoRA Atlas öffnen ↗
pref-stats-view-flora = FLoRA-Datenbank anzeigen →

pref-blacklist-title = Gesperrte Replikationen
pref-blacklist-description = Verwalten Sie Replikationen, die Sie aus Ihrer Bibliothek ausgeschlossen haben.
pref-blacklist-col-replication = Replikationsartikel
pref-blacklist-col-original = Originalartikel
pref-blacklist-col-type = Typ
pref-blacklist-col-banned = Gesperrt am
pref-blacklist-empty = Keine gesperrten Replikationen
pref-blacklist-remove = Auswahl entfernen
pref-blacklist-clear = Alle gesperrten Replikationen löschen
pref-blacklist-hint = Gesperrte Replikationen werden bei zukünftigen Prüfungen nicht erneut hinzugefügt. Sie können Replikationen über das Kontextmenü sperren.
