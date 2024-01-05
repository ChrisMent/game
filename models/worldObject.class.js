/**
 * Hauptklasse für die Spielwelt, die verschiedene Elemente des Spiels verwaltet und koordiniert.
 * 
 * @property {InfoScreen} infoScreen - Instanz der InfoScreen-Klasse für Informationsanzeigen.
 * @property {Character} character - Das spielbare Charakterobjekt.
 * @property {Bottle} bottle - Eine Instanz der Bottle-Klasse.
 * @property {Bottle[]} bottles - Array zur Speicherung aktiver Flaschen im Spiel.
 * @property {Bottle[]} groundBottles - Array zur Speicherung von Flaschen, die am Boden liegen.
 * @property {Coin[]} groundCoins - Array zur Speicherung von Münzen, die gesammelt werden können.
 * @property {HTMLCanvasElement} canvas - Das HTML-Canvas-Element, auf dem das Spiel gezeichnet wird.
 * @property {KeyboardObject} keyboard - Instanz der KeyboardObject-Klasse für Tastatureingaben.
 * @property {number} camera_x - Horizontale Position der Kamera im Spiel.
 * @property {StartScreen} startScreen - Instanz der StartScreen-Klasse für den Startbildschirm.
 * 
 * @param {HTMLCanvasElement} canvas - Das Canvas-Element für das Spiel.
 * @param {KeyboardObject} keyboard - Objekt für die Verwaltung der Tastatureingaben.
 * @param {Level} level - Das aktuelle Level des Spiels.
 */
class WorldObject {
    infoScreen = new InfoScreen();
    character = new Character()
    bottle = new Bottle() 
    bottles = []
    groundBottles = []
    groundCoins = []
    canvas;
    keyboard;
    camera_x = 0
    startScreen;

    constructor(canvas, keyboard, level) {  
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.startScreen = new StartScreen();
        this.level = level; 
        this.groundBottles = level.groundBottles;
        this.groundCoins = level.coins;
        this.character = new Character(this); 
        this.endboss = new Endboss(this);
        this.level.enemies.push(this.endboss);
        this.endGameObject = new EndGameObject(this.ctx, this.canvas, this);
        this.setWorld();
        this.initializeStatusbar();
        this.initializeEndscreen();        
        this.initializeGameOver();
        this.initializeClouds()
        this.draw();
        this.run();
    }
    /**
     * Startet die Spiellogik und setzt Intervalle für Kollisionserkennung und Spielupdates.
     */
    run() {
        this.interval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.checkForBottleCollection();
            this.checkForCoinCollection();
            
            if (this.endboss.lives <= 0 && !this.endScreenTriggered) {
                this.endGameObject.showEndScreen();
            }

            if (this.character.lives <= 0 && !this.gameOverTriggered) {
                this.endGameObject.gameOver();
            }
        }, 200);
    }

    initializeEndscreen(){
       this.endScreenTriggered = false;
       this.endScreenImage = new Image();
       this.endScreenImage.src = '../game/img/9_intro_outro_screens/youwin.png';
       this.endScreenImage.onload = () => {
            this.endScreenImageLoaded = true;
       } 
    }

    initializeGameOver(){
        this.gameOverImage = new Image();
        this.gameOverImage.src = '../game/img/9_intro_outro_screens/game_over/ohnoyoulost!.png';
        this.gameOverImage.onload = () => {
            this.gameOverImageLoaded = true;
        }
     }

    initializeStatusbar(){
        this.statusbars = {
            life: new Statusbar(15, 0, 75, 75, 'life', 0, this.ctx),
            bottle: new Statusbar(110, 10, 63, 63, 'bottle', 0, this.ctx),
            coin: new Statusbar(200, 10, 63, 63, 'coin', 0, this.ctx),
            endboss: new Statusbar(640, 15, 63, 63, 'endboss', 0, this.ctx),
        };
    }

    initializeClouds(){
        this.clouds = [];
        this.clouds.push(new Cloud(0)); // Wolke am Anfang
        this.clouds.push(new Cloud(2400 / 2)); // Wolke in der Mitte
        this.clouds.push(new Cloud(2400 - 350)); // Wolke am Ende
    }

    //! Kollisions- und Sammellogik
    /**
     * Überprüft Kollisionen und Interaktionen im Spiel.
     */
    checkCollisions() {
        this.checkEnemyCollisions();
    
        // Überprüfen Sie die Kollisionen zwischen den Flaschen und dem Endboss
        if (this.endboss) {
            this.endboss.checkBottleCollisions(this.bottles);
        }
    }
    /**
     * Überprüft Kollisionen zwischen dem Charakter und Feinden.
     * Bei Kollision wird entweder der Tod des Feindes oder ein Treffer am Charakter verarbeitet.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.jumpOnChicken(enemy)) {
                enemy.playDeathAnimation();
                this.removeEnemy(enemy, index);
            } else if (this.character.isColliding(enemy) && !this.character.jumpOnChicken(enemy)) {
                this.character.hit();
                this.drawLivesCount();
            }
        });
    }
    /**
     * Entfernt einen Feind aus dem Spiel.
     * @param {MoveableObject} enemy - Das Feindobjekt, das entfernt wird.
     * @param {number} index - Index des Feindes im Array `enemies`.
     */
    removeEnemy(enemy, index) {
        // Entfernen des Enemys aus dem Spiel
        this.level.enemies.splice(index, 1);
    }
    /**
     * Überprüft, ob der Charakter Flaschen vom Boden aufsammelt.
     */
    checkForBottleCollection() {
        this.groundBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                // Sammle die Flasche
                this.collectBottle(index);
            }
        });
    }
    /**
     * Überprüft, ob der Charakter Münzen vom Boden aufsammelt.
     */
    checkForCoinCollection() {
        this.groundCoins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                // Sammle die Münze
                this.collectCoin(index);
            }
        });
    }
    /**
     * Sammelt eine Flasche und aktualisiert den Zähler des Charakters.
     * @param {number} index - Index der Flasche im groundBottles-Array.
     */
    collectBottle(index) {
        this.groundBottles.splice(index, 1); // Entferne die Flasche vom Boden
        this.character.bottlesCollected++; // Füge eine Flasche zum Sammelzähler hinzu
        this.character.collect_bottle_sound.play(); // Sound abspielen
    
    }
    /**
     * Sammelt eine Münze und aktualisiert den Münzzähler des Charakters.
     * @param {number} index - Index der Münze im groundCoins-Array.
     */
    collectCoin(index) {
        this.groundCoins.splice(index, 1); // Entferne die Münze vom Boden
        this.character.coinsCollected++; // Erhöhe die Anzahl der gesammelten Münzen
        this.character.collect_coin_sound.play(); // Optional: Sound abspielen für das Sammeln einer Münze
    }
    /**
     * Überprüft, ob eine Flasche geworfen wird, und fügt sie zum Spiel hinzu.
     */
    checkThrowObject() {
        if (this.keyboard.throwBottle && this.character.bottlesCollected > 0) {
            let bottle = new throwAbleObject(this.character.x + 40, this.character.y + 100);
            this.bottles.push(bottle);
            
            // Eine gesammelte Flasche abziehen, da sie geworfen wurde
            this.character.bottlesCollected--;

        }
    }
    
    //! Setzt die Welt für das Charakter-Objekt
    setWorld(){
        this.character.world = this
        this.character.animate();
    }

    //!Spielwelt
    /**
     * Zeichnet die Spielwelt und verwaltet, welcher Bildschirm angezeigt wird.
     */
    draw() {
        this.selectScreenToDraw();

        if (!this.gameOverTriggered && !this.endScreenTriggered) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.infoScreen.draw(this.ctx);
            this.drawGameScreen();
        }
        // Forderung des nächsten Zeichenrahmens
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Entscheidet, welcher Bildschirm gezeichnet werden soll, basierend auf dem Spielzustand.
     */
    selectScreenToDraw() {
        if (this.gameOverTriggered) {
            this.endGameObject.drawGameOverScreen(); // Verwenden der Methode aus der EndGameObject-Klasse
        } else if (this.endScreenTriggered) {
            this.endGameObject.drawEndScreen(); // Verwenden der Methode aus der EndGameObject-Klasse
        }
    }
    /**
     * Zeichnet das reguläre Spiel, einschließlich aller Spielobjekte und Statusanzeigen.
     */
    drawGameScreen() {
        if (this.startScreen.isVisible) {
            this.startScreen.draw(this.ctx);
        } else {
            this.prepareCanvasForGameObjects();
            this.drawGameObjects();
            this.restoreCanvasState();
            this.drawFixedObjects();
        }
    }
    /**
     * Bereitet den Canvas für das Zeichnen von Spielobjekten vor, 
     * einschließlich des Verschiebens der Kamera-Position.
     */
    prepareCanvasForGameObjects() {
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.updateCameraPosition();
    }

    /**
     * Zeichnet alle beweglichen und unbeweglichen Spielobjekte auf dem Canvas.
     */
    drawGameObjects() {
        this.addBackgroundObjectsToMap();
        if (this.clouds) {
            this.clouds.forEach(cloud => cloud.draw(this.ctx));
        }
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.groundBottles);
        this.addObjectsToMap(this.groundCoins);
        this.addToMap(this.character);
        this.checkCollisions();
        this.character.applyGravityToCharacter();
        this.addObjectsToMap(this.bottles);
    }

    /**
     * Stellt den ursprünglichen Zustand des Canvas nach dem Zeichnen von Objekten wieder her.
     */
    restoreCanvasState() {
        this.ctx.restore();
    }

    /**
     * Zeichnet feste Objekte wie Statusleisten.
     */
    drawFixedObjects() {
        this.addToMap(this.statusbars.life);
        this.addToMap(this.statusbars.bottle);
        this.addToMap(this.statusbars.coin);
        if (this.camera_x >= -2200 && this.camera_x <= -1800) {
            this.addToMap(this.statusbars.endboss);
        }
        this.drawCollectedBottlesCount();
        this.drawLivesCount();
        this.drawCollectedCoinsCount();
    }
  
    //! Hilfsmethoden für das Zeichnen
        /**
     * Zeichnet die Anzahl der gesammelten Flaschen.
     */
    drawCollectedBottlesCount() {
        if (this.statusbars.bottle.type === 'bottle') {
            this.ctx.font = "48px rio-grande"; // Schriftart und -größe
            this.ctx.fillStyle = "white"; // Farbe des Textes
            this.ctx.fillText(this.character.bottlesCollected, this.statusbars.bottle.x + 50, this.statusbars.bottle.y + 51);
        }
    }
    /**
     * Zeichnet die Anzahl der gesammelten Münzen.
     */
    drawCollectedCoinsCount() {
        if (this.statusbars.coin.type === 'coin') {
            this.ctx.font = "48px rio-grande"; 
            this.ctx.fillStyle = "white"; 
            this.ctx.fillText(this.character.coinsCollected, this.statusbars.coin.x + 60.5, this.statusbars.coin.y + 52);
        }
    }
    /**
     * Zeichnet die Anzahl der verbleibenden Leben des Charakters und des Endbosses.
     */
    drawLivesCount() {
        if (this.statusbars.life.type === 'life') {
            this.ctx.font = "48px rio-grande"; 
            this.ctx.fillStyle = "white"; 
            this.ctx.fillText(this.character.lives, this.statusbars.life.x + 70, this.statusbars.life.y + 59.5);
        }
        // Zeichnen der Leben des Endbosses, wenn die Kamera im entsprechenden Bereich ist
        if (this.camera_x >= -2200 && this.camera_x <= -1800 && this.statusbars.endboss.type === 'endboss') {
            this.ctx.fillStyle = "white"; // Andere Farbe für den Endboss
            this.ctx.fillText(this.endboss.lives, this.statusbars.endboss.x - 25, this.statusbars.endboss.y + 45);
        }
    }
    /**
     * Fügt Hintergrundobjekte zur Zeichnungsmappe hinzu.
     */
    addBackgroundObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
    }
    /**
     * Aktualisiert die Position der Kamera basierend auf der Position des Charakters.
     */
    updateCameraPosition() {
        this.camera_x = -this.character.x + 100;
    }
    /**
     * Fügt Objekte zum Canvas hinzu und berücksichtigt dabei ihre Position und Ausrichtung.
     * @param {DrawableObject[]} objects - Array von zeichenbaren Objekten.
     */
    addObjectsToMap(objects) {
        if (!objects) {
            return;
        }

        objects.forEach(object => {
            this.addToMap(object);
        });
    }
    
    /**
     * Fügt ein Objekt zum Canvas hinzu und zeichnet es.
     * Dreht das Objekt horizontal, wenn es in die entgegengesetzte Richtung zeigt, 
     * und stellt nach dem Zeichnen seine ursprüngliche Ausrichtung wieder her.
     * @param {DrawableObject} object - Das zu zeichnende Objekt.
     */
    addToMap(object) {
        // Überprüfen, ob das Objekt in die entgegengesetzte Richtung gedreht werden soll
        if (object.otherDirection) {
            // Wenn ja, drehe das Bild horizontal
            this.flipImage(object);
        }

        // Zeichne das Objekt auf das Canvas
        object.draw(this.ctx);

        // Stelle die ursprüngliche Richtung des Objekts wieder her, falls es gedreht wurde
        if (object.otherDirection) {
            this.flipImageRestore(object);
        }
    }
    /**
     * Dreht ein Objekt horizontal, um es in entgegengesetzter Richtung zu zeichnen.
     * @param {DrawableObject} object - Das zu drehende Objekt.
     */
    flipImage(object) {
        // Speichern des aktuellen Zustands des Canvas-Kontexts
        this.ctx.save();
        // Verschiebe das Canvas um die Breite des Objekts nach rechts und spiegele es horizontal
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);

        // Korrigiere die X-Position des Objekts, damit es am richtigen Ort erscheint
        object.x = object.x * -1;
    }
    // Funktion zum Wiederherstellen des ursprünglichen Zustands nach der Drehung
    flipImageRestore(object) {
        // Stelle die ursprüngliche X-Position des Objekts wieder her
        object.x = object.x * -1;
        // Stelle den ursprünglichen Zustand des Canvas-Kontexts wieder her
        this.ctx.restore();
    }
    
}