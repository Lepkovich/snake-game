export class Snake {

    currentDirection = 'right';
    snake = [
        {x: 10, y: 20}
    ]
    // для удобства, чтобы не искать в конструкторе наши глобальные поля, вынесем их сюда
    context = null;
    positionsCount = null;
    positionsSize = null;

    constructor(context, positionsCount, positionsSize) {
        //приняли из game.js
        this.context = context; //контекст
        this.positionsCount = positionsCount; //переменную positionsCount
        this.positionsSize = positionsSize; //переменную positionSize

        this.addKeyboardHandler()

    }

    addKeyboardHandler() { //отрабатываем нажатие на клавиатуру
        document.addEventListener('keydown', (event) => {
            //нельзя выбрать противооложное направление
            if (event.key === 'arrowLeft' && this.currentDirection !== 'right') {
                this.currentDirection = 'left';
            } else if (event.key === 'arrowRight' && this.currentDirection !== 'left') {
                this.currentDirection = 'right';
            } else if (event.key === 'arrowUp' && this.currentDirection !== 'down') {
                this.currentDirection = 'up';
            } else if (event.key === 'arrowDown' && this.currentDirection !== 'up') {
                this.currentDirection = 'down';
            }
        })
    }

    showSnake() {
        for (let i = 0; i < this.snake.length; i++) {
            this.context.fillStyle = 'black';
            this.context.beginPath();
            this.context.fillRect(this.snake[i].x * this.positionsSize - this.positionsSize,
                this.snake[i].y * this.positionsSize - this.positionsSize,
                this.positionsSize, this.positionsSize);
            //заполнить квадрат по координатам xy шириной и высотой
        }

        let newHeadPosition = {
            x: this.snake[0].x,
            y: this.snake[0].y
        }

        this.snake.pop(); //удалим последний элемент из массива змейки (хвост)

        if (this.currentDirection === 'left') {
            if (newHeadPosition.x === 1) {
                newHeadPosition.x = this.positionsCount
            } else {
                newHeadPosition.x -= 1;
            }
        } else if (this.currentDirection === 'right') {
            if (newHeadPosition.x === this.positionsCount) {
                newHeadPosition.x = 1
            } else {
                newHeadPosition.x += 1;
            }
        } else if (this.currentDirection === 'up') {
            if (newHeadPosition.y === 1) {
                newHeadPosition.y = this.positionsCount;
            } else {
                newHeadPosition.y -= 1;
            }
        } else if (this.currentDirection === 'down') {
            if (newHeadPosition.y === this.positionsCount) {
                newHeadPosition.y = 1;
            } else {
                newHeadPosition.y += 1;
            }
        }

        this.snake.unshift(newHeadPosition) //добавляем элемент в начала массива
    }
}