class StartScreen extends DrawableObject {

    canvas;
    ctx;
    img;
    isVisible = true;
    START = document.getElementById('startButton');
    INSTRUCTIONS = document.getElementById('instructionsButton');

    width = 720;
    height = 480;

    startScreen = '../img_pollo_locco/img/9_intro_outro_screens/start/startscreen_1.png';

    constructor() {
        super();
        this.loadImg(this.startScreen);
        this.x = 0;
        this.y = 0;
        this.checkVisibility();
    }

    checkVisibility() {
        setInterval(() => {
            if (!this.isVisible) {
                this.setButtonsVisibillity('none');
            }
        }, 100);
    }

    setButtonsVisibillity(condition) {
        this.START.style.display = condition;
        this.INSTRUCTIONS.style.display = condition;
    }


}