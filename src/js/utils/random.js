export class Random {
    static getRandomInt(min, max) { //статической сделали для того, чтобы ее можно было использовать без создания экземпляров классов
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}