export class Snake {

    // для удобства, чтобы не искать в конструкторе наши глобальные поля, вынесем их сюда
    currentDirection = 'right';
    snake = [
        {x: 10, y: 20}
    ]
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
            if (event.key === 'ArrowLeft' && this.currentDirection !== 'right') {
                this.currentDirection = 'left';
            } else if (event.key === 'ArrowRight' && this.currentDirection !== 'left') {
                this.currentDirection = 'right';
            } else if (event.key === 'ArrowUp' && this.currentDirection !== 'down') {
                this.currentDirection = 'up';
            } else if (event.key === 'ArrowDown' && this.currentDirection !== 'up') {
                this.currentDirection = 'down';
            }
        })
    }

    showSnake(foodPosition) {
        let result = {
            gotFood: false,
            collision: false
        };
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

        if(foodPosition && foodPosition.x === newHeadPosition.x && foodPosition.y === newHeadPosition.y) {
            //если координаты головы змеи совпадают с координатами еды
            result.gotFood = true;
        } else {
            this.snake.pop(); //удалим последний элемент из массива змейки (хвост)
        }


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
        if (!this.checkNewPositionForCollision(newHeadPosition)) { //проверим не попала ли координаты головы в массив тела
            this.snake.unshift(newHeadPosition) //добавляем элемент в начала массива
        } else {
            result.collision = true;
        }
        return result;
    }

    checkNewPositionForCollision(newHeadPosition) {
        for (let i = 0; i <this.snake.length; i++) {
            if (newHeadPosition.x === this.snake[i].x && newHeadPosition.y === this.snake[i].y) {
                return true;
            }
        }
        return false;
    }
}