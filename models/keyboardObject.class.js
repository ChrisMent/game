class KeyboardObject {
    moveRight = false;
    moveLeft = false;
    pushSpace = false;

    handleKeyDown(event) {
        if (event.key === "ArrowLeft") {
            this.moveLeft = true;
        } else if (event.key === "ArrowRight") {
            this.moveRight = true;
            //console.log("moveRight gesetzt auf:", this.moveRight); // Loggen, wenn moveRight auf true gesetzt wird
        } else if (event.key === " ") {
            this.pushSpace = true;
        }
    }

    handleKeyUp(event) {
        if (event.key === "ArrowLeft") {
            this.moveLeft = false;
        } else if (event.key === "ArrowRight") {
            this.moveRight = false;
            //console.log("moveRight gesetzt auf:", this.moveRight); // Loggen, wenn moveRight auf false gesetzt wird
        } else if (event.key === " ") {
            this.pushSpace = false;
        }
    }
}


