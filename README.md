# Kinopolis Automation Dashboard 🎬

Ein modernes, reaktionsschnelles Dashboard zur Überwachung von Kinovorstellungen, Auslastungen und Plakatwechsel-Aufgaben für Kinopolis-Standorte.

![Dashboard Preview](https://trailer.kinopolis.de/media/img/logos/kinopolis.png)

## Features 🚀

-   **Echtzeit-Daten**: Live-Scraping von Kinopolis-Sitzplänen und Spielzeiten.
-   **Modernes Design**: Dunkles Theme mit Glassmorphism-Ästhetik und flüssigen Animationen.
-   **Standort-Auswahl**: Einfacher Wechsel zwischen verschiedenen Kinos (z.B. Darmstadt KINOPOLIS, Citydome, Rex).
-   **Dringende Alerts**: Automatische Benachrichtigung, wenn die letzte Vorstellung eines Tages beginnt, um den Plakatwechsel vorzubereiten.
-   **Interaktivität**: Zusammenklappbare Alert-Sektionen und detaillierte Auslastungsanzeigen.
-   **Mobile Ready**: Vollständig optimiert für Smartphones und Tablets.

## Tech Stack 🛠️

-   **Frontend**: HTML5, Vanilla CSS, JavaScript (Vite)
-   **Backend**: Node.js, Express, Cheerio (Web Scraping)
-   **Entwicklung**: Git-basiertes Workflow-Management

## Installation & Setup 💻

### Voraussetzungen
-   [Node.js](https://nodejs.org/) (v16 oder höher)
-   npm (wird mit Node.js installiert)

### Schritt-für-Schritt
1.  **Repository klonen**:
    ```bash
    git clone [repo-url]
    cd kinopolis-automation
    ```

2.  **Abhängigkeiten installieren**:
    ```bash
    npm install
    ```

3.  **Entwicklungsserver starten**:
    Das Projekt verwendet ein duales Setup für Backend und Frontend.
    ```bash
    # Startet sowohl das Backend (Port 3001) als auch das Frontend (Port 5173)
    npm run dev
    ```

4.  **Dashboard öffnen**:
    Öffne [http://localhost:5173](http://localhost:5173) in deinem Browser.

## Projektstruktur 📁

-   `server.js`: Das Herzstück des Backends. Übernimmt das Scraping und die API-Endpunkte.
-   `index.html`: Das gesamte Frontend inklusive CSS (Styling) und Client-seitiger Logik.
-   `package.json`: Projektkonfiguration und Abhängigkeiten.
-   `.gitignore`: Definiert, welche Dateien nicht in Git versioniert werden sollen (z.B. `node_modules`).

## Branches 🌳

-   `main`: Stabiler Code mit allen Kernfunktionen.
-   `feature/dashboard-v1`: Der aktuelle Entwicklungs-Branch für das neue UI und Daten-Optimierungen.

## Mitwirkende ✨

Entwickelt für Kinopolis Automatisierungsprozesse.

---
*Hinweis: Dieses Projekt ist ein Automatisierungswerkzeug und steht in keinem offiziellen Zusammenhang mit der Kinopolis Management GmbH.*
