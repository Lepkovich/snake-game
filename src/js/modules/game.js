import {Snake} from "./snake.js";

export class Game {
    // для удобства, чтобы не искать в конструкторе наши глобальные поля, вынесем их сюда
    snake = null;
    context = null;
    positionsCount = null;
    positionsSize = null;

    constructor(context, settings) {
        //приняли из App.js
        this.context = context; //контекст
        this.positionsCount = settings.positionsCount; //переменную positionsCount
        this.positionsSize = settings.positionsSize; //переменную positionSize

        document.getElementById('start').onclick = () => {
            this.startGame();
        }
    }

    startGame() {
        this.snake = new Snake(this.context, this.positionsCount, this.positionsSize);

        setInterval(this.gameProcess.bind(this), 100); //будем запускать gameProcess каждую секунду
    }

    gameProcess() {
        //очищаем поле от координат 0,0 на ширину и высоту поля
        this.context.clearRect(0, 0, this.positionsCount * this.positionsSize, this.positionsCount * this.positionsSize);
        this.showGrid();
        this.snake.showSnake();
    }

    showGrid() {
        const size = this.positionsCount * this.positionsSize;
        for (let x = 0; x <= size; x += this.positionsSize) {
            this.context.moveTo(0.5 + x + this.positionsSize, 0);
            this.context.lineTo(0.5 + x + this.positionsSize, size + this.positionsSize);
        }

        for (let x = 0; x <= size; x += this.positionsSize) {
            this.context.moveTo(0, 0.5 + x + this.positionsSize);
            this.context.lineTo(size + this.positionsSize, 0.5 + x + this.positionsSize);
        }
        this.context.strokeStyle = "black";
        this.context.stroke();
    }

}