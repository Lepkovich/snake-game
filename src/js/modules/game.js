import {Snake} from "./snake.js";
import {Food} from "./food.js";

export class Game {
    // для удобства, чтобы не искать в конструкторе наши глобальные поля, вынесем их сюда
    snake = null;
    size = 0;
    context = null;
    grid = false;
    border = false;
    positionsCount = null;
    positionsSize = null;
    scoreElement = null;
    score = 0;
    interval = null;

    constructor(context, settings) {
        //приняли из App.js
        this.context = context; //контекст
        this.positionsCount = settings.positionsCount; //переменную positionsCount
        this.positionsSize = settings.positionsSize; //переменную positionSize
        this.size = this.positionsSize * this.positionsCount;

        this.scoreElement = document.getElementById('score');
        this.canvas = document.getElementById('canvas');
        document.getElementById('start').onclick = () => {
            this.startGame();
        }
        document.getElementById('grid').onclick = () => {
            this.grid = this.grid === false; //по клику меняем отображение сетки
            this.showGrid(this.grid);
        }
        document.getElementById('border').onclick = () => {
            this.border = this.border === false; //по клику меняем отображение границы
            this.showBorder(this.border, this.canvas);

        }
    }

    startGame() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.food = new Food(this.context, this.positionsCount, this.positionsSize);
        this.snake = new Snake(this.context, this.positionsCount, this.positionsSize);
        this.food.setNewFoodPosition();

        this.interval = setInterval(this.gameProcess.bind(this), 100); //будем запускать gameProcess каждую секунду
    }

    gameProcess() {
        //очищаем поле от координат 0,0 на ширину и высоту поля
        this.context.clearRect(0, 0, this.positionsCount * this.positionsSize, this.positionsCount * this.positionsSize);
        this.showGrid(this.grid);
        this.food.showFood();
        let result = this.snake.showSnake(this.food.foodPosition, this.border); //передадим змее еще и позицию еды
        if (result) {
            if (result.collision) {
                this.endGame();
            } else if (result.gotFood) {
                this.score += 1;
                this.scoreElement.innerText = this.score;
                this.food.setNewFoodPosition();
            }
        }
    }

    endGame() {
        clearInterval(this.interval); //остановим обновление интервалов

        //напишем итоговый результат на канвасе
        this.context.fillStyle = 'black'; //чернила черные
        this.context.font = 'bold 48px Arial';
        this.context.textAlign = 'center';
        this.context.fillText('Вы набрали: ' + this.score + ' очков!',
            (this.positionsCount * this.positionsSize) / 2, (this.positionsCount * this.positionsSize) / 2);
        //разместили надпись с координатами по центру канваса
    }

    showGrid(grid) {
        this.context.lineWidth = 1;
        for (let x = 0; x <= this.size; x += this.positionsSize) {
            this.context.moveTo(0.5 + x + this.positionsSize, 0);
            this.context.lineTo(0.5 + x + this.positionsSize, this.size + this.positionsSize);
        }

        for (let x = 0; x <= this.size; x += this.positionsSize) {
            this.context.moveTo(0, 0.5 + x + this.positionsSize);
            this.context.lineTo(this.size + this.positionsSize, 0.5 + x + this.positionsSize);
        }
        if (grid) {
            this.context.strokeStyle = "black";
        } else {
            this.context.strokeStyle = "green";
        }
        this.context.stroke();
    }

    showBorder(border, canvas) {
        if (border) {
            console.log('убираем границу');
            canvas.classList.remove('canvas-no-border');
        } else {
            canvas.setAttribute('class', 'canvas-no-border')

        }

    }
}