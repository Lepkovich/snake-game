export class Game {
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
        this.showGrid();
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