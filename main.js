const $question = $('.question')[0];
const $answers = $('button.answer');
const $tbody = $('#output-table tbody');


$('#audio-icon').click(function (e) {
    e.preventDefault();
    talk($question.innerText);
});


const indexQuestions = createUniqueArray(0, questions.length).uniqueArray;
let currentIndex = 0;
let totalIncorectAnswer = 0;
console.log(`-------------------------------------------`);
console.log(`current question: ${currentIndex + 1}`);
console.log(`indexQuestions: ${indexQuestions[currentIndex]}`);
let indexTrueAnswer = loadQuestion($question, $answers, indexQuestions[currentIndex]);
$('#current-question').html(currentIndex + 1);
$('#total-question').html(questions.length);


// click button -> (process) -> show output -> next question
// *process:
//  + get index button (idx)
//  + compare idx to true answer(indexAnswer)
//  + show notify
$answers.click(function (e) {
    e.preventDefault();

    let isCorrect = true;
    $answers[indexTrueAnswer].classList.add('correct-answer');
    if (this != $answers[indexTrueAnswer]) {
        this.classList.add('incorrect-answer');
        isCorrect = false;
        totalIncorectAnswer++;
    }

    setTimeout(() => {
        console.log($(this).html() + ' click');
        alert('next question');

        $answers.removeClass('correct-answer');
        $answers.removeClass('incorrect-answer');

        if (currentIndex > indexQuestions.length - 1) {
            alert('finish');
            return;
        }

        addRowOutputTable($tbody, currentIndex + 1, $question.innerText, $answers[indexTrueAnswer].innerText, isCorrect);

        currentIndex++;
        console.log(`-------------------------------------------`);
        console.log(`>>> current question: ${currentIndex + 1} <<<`);
        console.log(`indexQuestions: ${indexQuestions[currentIndex]}`);
        indexTrueAnswer = loadQuestion($question, $answers, indexQuestions[currentIndex]);
        $('#current-question').html(currentIndex + 1);
        $('#total-correct-answer').html(currentIndex - totalIncorectAnswer);
        $('#total-incorrect-answer').html(totalIncorectAnswer);
    }, 1);
});
