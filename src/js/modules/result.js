export class Result {
    constructor() {

    }

    loadData() {
        return fetch('./table.json')
            .then(response => response.json())
            .then(data => {
                // Возвращаем загруженные данные
                return data;
            })
            .catch(error => {
                console.error('Ошибка загрузки данных:', error);
            });
    }

    displayTable() {
        // Получаем данные из файла table.json
        this.loadData()
            .then(data => {
                console.log(data)
            });
    }
}