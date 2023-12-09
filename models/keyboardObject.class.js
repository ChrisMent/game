class KeyboardObject {
    moveRight = false;
    moveLeft = false;
    pushSpace = false;
    throwBottle = false;

    handleKeyDown(event) {
        if (event.key === "ArrowLeft") {
            this.moveLeft = true;
        } else if (event.key === "ArrowRight") {
            this.moveRight = true;
        } else if (event.key === " ") {
            this.pushSpace = true;
        } else if (event.key === "Enter") {
            this.throwBottle = true
        }
    }

    handleKeyUp(event) {
        if (event.key === "ArrowLeft") {
            this.moveLeft = false;
        } else if (event.key === "ArrowRight") {
            this.moveRight = false;
        } else if (event.key === " ") {
            this.pushSpace = false;
        } else if (event.key === "Enter") {
            this.throwBottle = false
        }  
    }
}


