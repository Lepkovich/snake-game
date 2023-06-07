import {Random} from "../utils/random.js";

export class Food {
    // для удобства, чтобы не искать в конструкторе наши глобальные поля, вынесем их сюда
    foodRadius = null;
    foodPosition = { //отвечает за координаты еды
        x:1,
        y:1
    }
    context = null;
    positionsCount = null;
    positionsSize = null;
    constructor(context, positionsCount, positionsSize) {
        //приняли из game.js
        this.context = context; //контекст
        this.positionsCount = positionsCount; //переменную positionsCount
        this.positionsSize = positionsSize; //переменную positionSize

        this.foodRadius = this.positionsSize / 2; //радиус круга
    }

    setNewFoodPosition() {
        this.foodPosition = {
            x: Random.getRandomInt(1, this.positionsSize),
            y: Random.getRandomInt(1, this.positionsSize)
        }
    }
    showFood() {
        this.context.fillStyle = 'white'; //закраска белым цветом
        this.context.beginPath(); //опустили перо
        this.context.arc(this.foodPosition.x * this.positionsSize - this.foodRadius,
            this.foodPosition.y * this.positionsSize - this.foodRadius, this.foodRadius, 0, 2 * Math.PI) //нарисовали кружок
        this.context.fill()
    }
}