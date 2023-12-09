class Statusbar extends DrawableObject {
    
    CHARACTER_LIFE_IMG = ['../game/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
                            '../game/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
                            '../game/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
                            '../game/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
                            '../game/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
                            '../game/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
                            ]

    COLLECTED_BOTTLES_IMG = ['../game/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
                             '../game/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
                             '../game/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
                             '../game/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
                             '../game/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
                             '../game/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png'
                            ]

    constructor(x, y, width, height, type) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.percentage = 100;

        // Entscheiden, welche Bildpfade basierend auf dem Typ verwendet werden sollen
        if (type === 'life') {
            this.images = this.CHARACTER_LIFE_IMG;
        } else if (type === 'bottle') {
            this.images = this.COLLECTED_BOTTLES_IMG;
        }

        this.loadImages(this.images);
        this.setPercentage(100);
    }

    setPercentage(percentage){
        this.percentage = percentage
        let path = this.CHARACTER_LIFE_IMG[this.resolveImageIndex()]
        this.img = this.ImgStorage[path];
    }

    resolveImageIndex(){
            if(this.percentage == 100) {
                return 5
            } else if (this.percentage > 80) {
                return 4
            } else if (this.percentage > 60) {
                return 3
            } else if (this.percentage > 40) {
                return 2
            } else if (this.percentage > 20) {
                return 1
            } else {
                return 0
            }
    }

    showImages(){
        console.log('Bilder: ', this.img)
    }


}