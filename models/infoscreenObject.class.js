/**
 * Klasse für den InfoScreen.
 * Verwaltet die Anzeige eines Informationsbildschirms im Spiel.
 */
class InfoScreen {
    isVisible = false; // Sichtbarkeitsstatus des InfoScreens

    /**
     * Zeichnet den InfoScreen auf das Canvas.
     * Wird nur gezeichnet, wenn `isVisible` auf true gesetzt ist.
     * 
     * @param {CanvasRenderingContext2D} ctx - Der 2D-Kontext des Canvas, auf dem der InfoScreen gezeichnet wird.
     */
    draw(ctx) {
        if (this.isVisible) {
            // Zeichnungslogik für den InfoScreen, wenn er sichtbar ist
            // Hier können Sie beispielsweise Texte, Bilder oder Hintergründe zeichnen
        }
    }
}