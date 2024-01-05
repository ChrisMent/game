class EndGameObject {
    constructor(ctx, canvas, world) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.world = world; // Referenz auf das WorldObject
    }

    showEndScreen() {
        // Verzögert das Zeichnen des Endscreens um 3 Sekunden
        setTimeout(() => {
            this.prepareForEndScreen();
            this.world.endScreenTriggered = true;
            this.drawEndScreen(); // Zeichnen des Endscreens
        }, 3000);
    }

    // Vorbereitungen für das Anzeigen des Endbildschirms
    prepareForEndScreen() {
        clearInterval(this.interval);
        this.world.gameIsRunning = false;
        this.world.character.stopAnimation();
        SoundManager.toggleMute(true);
        this.hideAllObjects();
        this.world.character.visible = false;
    }

    // Verbirgt alle Gegner, Flaschen und Münzen
    hideAllObjects() {
        if (this.world.enemies) {
            this.world.enemies.forEach(enemy => enemy.visible = false);
        }
        if (this.world.bottles) {
            this.world.bottles.forEach(bottle => bottle.visible = false);
        }
        if (this.world.coins) {
            this.world.coins.forEach(coin => coin.visible = false);
        }
    }

    drawEndScreen() {
        if (this.world.endScreenTriggered && this.world.endScreenImageLoaded) {
            this.ctx.drawImage(this.world.endScreenImage, 0, 0, this.canvas.width, this.canvas.height);
        }
    }

    // Methode, die aufgerufen wird, wenn das Spiel verloren ist
    gameOver() {
        this.world.gameOverTriggered = true;
        this.prepareForGameOver();
        this.drawGameOverScreen();
    }

    // Vorbereitungen für das Anzeigen des Game-Over-Bildschirms
    prepareForGameOver() {
        clearInterval(this.world.interval);
        this.world.gameIsRunning = false;
        this.world.character.stopAnimation();
        SoundManager.toggleMute(true); // Alle Sounds ausschalten
        this.hideAllObjects();
        this.world.character.visible = false;
    }

    drawGameOverScreen() {
        if (this.world.gameOverImageLoaded) {
            this.ctx.drawImage(this.world.gameOverImage, 0, 0, this.canvas.width, this.canvas.height);
        }
    }

}
