const chickens = Array.from({ length: 1 }, () => new Chicken());
const enemies = [...chickens, new Endboss()];


const level1 = new Level(
        enemies,

    [
        new Cloud(),
    ],

    [
        
        new BackgroundImage('../game/img/5_background/layers/air.png', 719 * -1),
        new BackgroundImage('../game/img/5_background/layers/3_third_layer/2.png', 719 * -1),
        new BackgroundImage('../game/img/5_background/layers/2_second_layer/2.png', 719 * -1),
        new BackgroundImage('../game/img/5_background/layers/1_first_layer/2.png', 719 * -1),
        new BackgroundImage('../game/img/5_background/layers/air.png', 0),
        new BackgroundImage('../game/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundImage('../game/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundImage('../game/img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundImage('../game/img/5_background/layers/air.png', 719),
        new BackgroundImage('../game/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundImage('../game/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundImage('../game/img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundImage('../game/img/5_background/layers/air.png', 719 * 2),
        new BackgroundImage('../game/img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundImage('../game/img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundImage('../game/img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundImage('../game/img/5_background/layers/air.png', 719 * 3),
        new BackgroundImage('../game/img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundImage('../game/img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundImage('../game/img/5_background/layers/1_first_layer/2.png', 719 * 3),
       
    ]



);
