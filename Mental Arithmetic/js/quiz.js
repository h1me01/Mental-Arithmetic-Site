let counterRight = 0;
let counterWrong = 0;
let min = 3;
let sec = "00";
let question;
let questionSolution;
let allowClicking = false;
let difficulty = 0;


$(function () {
    $('.schw_link').on('click', function () {
        ResetAll();

        $('.schw_link').removeClass('schw_links_addClass');
        $('.quiz_antworten').removeClass('antw_links_addClass');
        $(this).addClass('schw_links_addClass');

        if ($(this).text() == 'EASY') {
            difficulty = 100;
        } else if ($(this).text() == 'MEDIUM') {
            difficulty = 1000;
        } else if ($(this).text() == 'DIFFICULT') {
            difficulty = 10000;
        }

        CreateQuiz();
    });

    $('.quiz_antworten').on('click', function () {
        if ($(this).text() == questionSolution) {
            $('.quiz_antworten').removeClass('antw_links_addClass');
            counterRight++;
            $('#richtig_counter').text(`Richtig: ${counterRight}`);
            CreateQuestions(difficulty);
        } else {
            $(this).addClass('antw_links_addClass');
            counterWrong++;
            $('#falsch_counter').text(`Falsch: ${counterWrong}`);
        }
    });
});

const CreateQuiz = () => {
    CreateQuestions(difficulty);
    Timer();
};

const CreateQuestions = (diff) => {
    const number1 = Math.floor(Math.random() * diff);
    const number2 = Math.floor(Math.random() * diff);
    const random = Math.floor(Math.random() * 4);

    switch (random) {
        case 0:
            question = `${number1} + ${number2}`;
            questionSolution = number1 + number2;
            break;
        case 1:
            question = `${number1} - ${number2}`;
            questionSolution = number1 - number2;
            break;
        case 2:
            question = `${number1} * ${number2}`;
            questionSolution = number1 * number2;
            break;
        case 3:
            question = `${number1} / ${number2}`;
            questionSolution = (number1 / number2).toFixed(2);
            break;
    }

    const answers = Array.from({ length: 4 }, (_, i) => {
        if (i === random) {
            return questionSolution;
        } else {
            return questionSolution - Math.floor(Math.random() * 10 + 1);
        }
    });

    $('.quiz_antworten').each((index, element) => {
        $(element).text(answers[index]);
    });

    $('#quizfrage').text(`What's the solution of ${question}?`);
};

const ResetAll = () => {
    counterRight = 0;
    counterWrong = 0;
    min = 3;
    sec = "00";
};