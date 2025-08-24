# Team «Quality Assurance» – Entwickler von *spark✨*

## Challenge
**Design The Brain behind Better Habit Building**

---

## Technische Informationen für die Jury

### Aktueller Stand des Sourcecodes
🔗 [GitHub Repository](https://github.com/maximilianspiess/bern-hackt-team-qa)

---

## Ausgangslage
Das Start-up *The108Company* hat mit **Fridge** eine fortgeschrittene App entwickelt, die beim Aufbau und Halten neuer Gewohnheiten unterstützt.  
Da viele damit langfristig scheitern, setzt *Fridge* auf soziale Elemente wie Videos und Leaderboards.

---

## Worauf habt ihr euch fokussiert?
Da der Gründer im persönlichen Austausch betonte, wie wichtig ihm eine **authentische und nicht-toxische Community** ist, haben wir uns entschieden:

- Content-Posts und den Wettbewerbsaspekt des Leaderboards etwas in den Hintergrund zu rücken
- Fokus stattdessen auf **Vernetzung von Nutzern mit ähnlichen Zielen**
- Förderung von **nachhaltigem Engagement**

---

## Welche technischen Grundsatzentscheide habt ihr gefällt?
Unser Motto lautete:
> *„Wir entwickeln so viel wie in 36 Stunden möglich ist.”*

Daraus ergaben sich folgende Entscheidungen:

- **Frontend:** Angular (Progressive Web App) → mobile-only Design für schnellen Alltagseinsatz
- **Backend:** NestJS (statt Spring Boot, da moderner und zugänglicher)
- **Grundidee:** Bekannte, moderne Technologien für schnelle Umsetzung

---

## Technischer Aufbau

### Verwendete Komponenten & Frameworks

**Frontend:**
- Framework: Angular
- UI: Angular Material Components
- Charts: JS Charts

**Backend:**
- Framework: NestJS

---

### Einsatz der Technologien

- **Frontend (Angular SPA):**
    - Etabliertes Framework für komplexe Web-Apps
    - TypeScript-Typisierung für mehr Sicherheit
    - Schnelle & klar strukturierte Entwicklung

- **Backend (NestJS):**
    - Schichtenbasierte Architektur (Controller-Service-Repository-Pattern)
    - Flexible und saubere Trennung logischer Teile
    - Bereitstellung einer REST-API inkl. Authentifizierung, Validierung und Ressourcenbereitstellung

---

## Implementation

### Besonderheiten
- Nutzer sammeln **„sparks“**
- Zusammenarbeit mit Marken → *sparks* können in **Goodies & Coupons** eingetauscht werden
- **Sparks werden vergeben für:**
    - Abhaken von Tageszielen
    - Hochladen von Bildern & Videos
    - Interaktion mit anderen Nutzern

Das Backend vergibt unterschiedliche *spark*-Werte je nach Aktion.  
Zukünftig könnten Partner ihre Angebote auf einem Portal registrieren und verwalten (derzeit statisch).

---

## Was ist technisch besonders cool?
Ein Kernaspekt ist das **Matching von Personen mit ähnlichen Interessen**:

- Habits der Benutzer werden **vektorisiert und geclustert**
- So können Nutzer mit ähnlichen Interessen gefunden werden – auch wenn sie unterschiedliche Bezeichnungen verwenden

---

## Abgrenzung & Offene Punkte

- Fokus zunächst auf **MVP** → Erweiterung durch mehr Gamification-Elemente denkbar
- Punktesystem von *Fridge* übernommen, aber:
    - Kein Fokus auf lange Bildschirmzeit
    - Zielgruppe = Menschen, die die beste Version ihrer selbst werden möchten
- Ursprüngliche Idee (**anonymer Doppelgänger-Match**) musste verworfen werden, da Usertests nicht zielführend waren

---
