(function () {
    // Здесь я создаю функцию конструктор объектов
    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    // В прототипы добавляю метод для отображения вопроса и вариантов ответа
    Question.prototype.displayQuestion = function () {
        console.log(this.question);
        for (let i = 0; i < this.answers.length; i++) {
            console.log((i + 1) + ': ' + this.answers[i]);
        }
    };

    // Это метод для проверки ответа и отображения результата
    Question.prototype.checkAnswer = function (answer, callback) {
        let sc;
        if (answer === this.correctAnswer) {
            console.log('Правильно!');
            sc = callback(true);
        } else {
            console.log('Неправильно.');
            sc = callback(false);
        }
        this.displayScore(sc);
    };

    // Вот это метод для отображения текущего счета. Было сложно найти это решение
    Question.prototype.displayScore = function (score) {
        console.log('Ваш текущий счет: ' + score);
        console.log('-----------------------------');
    };

    // Создаю вопросы для игры. У меня же идут аргументы: вопрос, ответы, правильныйОтвет
    const q1 = new Question(
        'Какая столица Франции?',
        ['Берлин', 'Мадрид', 'Париж', 'Лиссабон'],
        3
    );

    const q2 = new Question(
        'Какой язык программирования используется для frontend-разработки?',
        ['Python', 'JavaScript', 'C++', 'Java'],
        2
    );

    const q3 = new Question(
        'Кто написал "Войну и мир"?',
        ['Толстой', 'Достоевский', 'Пушкин', 'Чехов'],
        1
    );

    const q4 = new Question(
        'Сколько планет в Солнечной системе?',
        ['7', '8', '9', '10'],
        2
    );

    // Массив с вопросами. Куда же я без массивов.
    const questions = [q1, q2, q3, q4];

    // Функция для выбора случайного вопроса и его отображения
    function nextQuestion() {
        const n = Math.floor(Math.random() * questions.length);
        questions[n].displayQuestion();

        const answer = prompt('Введите номер правильного ответа (или введите "exit" для выхода):');

        if (answer !== null && answer.toLowerCase() !== 'exit') {
            const parsedAnswer = parseInt(answer);
            // Теперь проверяем ответ, уменьшая его на 1, чтобы он соответствовал индексу массива
            questions[n].checkAnswer(parsedAnswer, keepScore);
            nextQuestion();
        }
    }

    // Функция для отслеживания счета. Вот здесь второй раз приуныл.
    function score() {
        let sc = 0;
        return function (correct) {
            if (correct) {
                sc++;
            }
            return sc;
        };
    }

    const keepScore = score();

    // Запуск игры
    nextQuestion();
})();