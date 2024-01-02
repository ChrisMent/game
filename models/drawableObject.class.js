class DrawableObject {
    img; // Bild-Objekt für das DrawableObject
    ImgStorage = {}; // Speicher für geladene Bilder
    currentImage = 0; // Index für das aktuell angezeigte Bild

    // Methoden

    // Methode zum Laden eines einzelnen Bildes
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
    
    // Methode zum Laden mehrerer Bilder
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image(); // Erstellung eines neuen Bild-Objekts für jeden Pfad
            img.onload = () => {
                this.ImgStorage[path] = img; // Speichern des geladenen Bildes im Speicher
            };
            img.src = path; // Setzen des Bildpfades, startet den Ladevorgang
        });
    }

    // Methode zum Zeichnen des Objekts auf dem Canvas
    draw(ctx) {
        // Überprüfung, ob ein Bild vorhanden ist und vollständig geladen wurde
        if (this.img && this.img.complete && this.img.naturalWidth !== 0) {
            // Zeichnen des Bildes auf dem Canvas
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    // Methode zum Zeichnen eines Rechtecks um das Objekt (zur Visualisierung von Kollisionsbereichen)
    drawRect(ctx) {
        // Zeichnen eines Rechtecks für Character-Objekte
        if (this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }

        // Zeichnen eines Rechtecks für Chicken-Objekte
        if (this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}
