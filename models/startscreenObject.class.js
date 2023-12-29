class StartScreen extends DrawableObject {

    canvas;
    ctx;
    img;
    isVisible = true;

    width = 720;
    height = 480;

    startScreen = '../game/img/9_intro_outro_screens/start/startscreen_1.png';


    constructor() {
        super();
        this.loadImage(this.startScreen);
        this.x = 0;
        this.y = 0;

        
    }

}