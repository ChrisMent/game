/**
 * Grundlegende Klasse für Objekte, die im Spiel gezeichnet werden können.
 * Verwaltet das Laden und Zeichnen von Bildern sowie das Zeichnen von Kollisionsbereichen.
 */
class DrawableObject {
    img; // Bild-Objekt für das DrawableObject
    ImgStorage = {}; // Speicher für geladene Bilder
    currentImage = 0; // Index für das aktuell angezeigte Bild

    /**
     * Lädt ein Bild und setzt es als Bild-Objekt des DrawableObject.
     * 
     * @param {string} path - Pfad des Bildes, das geladen werden soll.
     */
    loadImage(path) {
        this.img = new Image(); // Erstellung eines neuen Bild-Objekts
        this.img.onload = () => {
            // Handler, der ausgeführt wird, wenn das Bild erfolgreich geladen wurde
            this.imageLoaded = true; // Optional: Indikator, dass das Bild geladen ist
        };
        this.img.onerror = () => {
            // Fehlerbehandlung, wenn das Bild nicht geladen werden kann
            console.error("Fehler beim Laden des Bildes:", path);
        };
        this.img.src = path; // Setzen des Bildpfades, startet den Ladevorgang
    }
    
    /**
     * Lädt eine Reihe von Bildern und speichert sie im Bildspeicher.
     * 
     * @param {string[]} arr - Array von Bildpfaden, die geladen werden sollen.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image(); // Erstellung eines neuen Bild-Objekts für jeden Pfad
            img.onload = () => {
                this.ImgStorage[path] = img; // Speichern des geladenen Bildes im Speicher
            };
            img.src = path; // Setzen des Bildpfades, startet den Ladevorgang
        });
    }

    /**
     * Zeichnet das Objekt auf einem Canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - Der 2D-Kontext des Canvas, auf dem gezeichnet wird.
     */
    draw(ctx) {
        // Überprüfung, ob ein Bild vorhanden ist und vollständig geladen wurde
        if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
            // Zeichnen des Bildes auf dem Canvas
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Zeichnet ein Rechteck um das Objekt, um Kollisionsbereiche zu visualisieren.
     * 
     * @param {CanvasRenderingContext2D} ctx - Der 2D-Kontext des Canvas, auf dem das Rechteck gezeichnet wird.
     */
    drawRect(ctx) {
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}
