import {Game} from "./modules/game.js";

class App {

    settings = {
        positionsCount: 30,
        positionsSize: 20
    }
    constructor() {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', (this.settings.positionsCount * this.settings.positionsSize).toString()); //приведем number к строке
        canvas.setAttribute('height', this.settings.positionsCount * this.settings.positionsSize.toString());//сам js также это делает, если нужно
        document.getElementById('game-field').appendChild(canvas);//размещаем наш canvas внутрь container

        const context = canvas.getContext('2d') //создаем контекст для canvas, указываем, что у нас 2d графика

        new Game(context, this.settings); //запускаем игру из класса game
        //передаем контекст и settings
    }
}

(new App());