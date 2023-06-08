import {Snake} from "./snake.js";
import {Food} from "./food.js";

export class Game {
    // для удобства, чтобы не искать в конструкторе наши глобальные поля, вынесем их сюда
    snake = null;
    context = null;
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

        this.scoreElement = document.getElementById('score');
        document.getElementById('start').onclick = () => {
            this.startGame();
        }
        document.getElementById('grid').onclick = () => {
            // если сетка есть, то убрать ее, если сетки нет, то включить
        }
        document.getElementById('border').onclick = () => {
            // если граница есть, то убрать ее, если границы нет, то добавить
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
        // this.showGrid(); если играем без сетки
        this.food.showFood();
       let result =  this.snake.showSnake(this.food.foodPosition); //передадим змее еще и позицию еды
        if (result) {
            if (result.collision) {
                this.endGame();
            } else if (result.gotFood) {
                this.score +=1;
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
            (this.positionsCount * this.positionsSize)/2, (this.positionsCount * this.positionsSize)/2);
        //разместили надпись с координатами по центру канваса
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