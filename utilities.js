// get value between startValue and endValue
function getRandom(startValue, endValue) {
    return Math.floor(startValue + Math.random() * (endValue - startValue + 1));
}


// swap 2 value
function swap(a, b) {
    return [b, a];
}


// create unique array
function createUniqueArray(forceValue, arrLength = 4) {
    let uniqueArray = new Array();
    uniqueArray.push(forceValue);

    for (let i = 1; i < arrLength; i++) {
        let isLoop, value;
        do {
            isLoop = false;
            value = getRandom(0, questions.length - 1);

            for (let j = 0; j < i; j++) {
                if (value == uniqueArray[j]) {
                    isLoop = true;
                    break;
                }
            }
        } while (isLoop);

        uniqueArray.push(value);
    }

    let i = 0;
    let j = getRandom(0, 3);
    [uniqueArray[i], uniqueArray[j]] = swap(uniqueArray[i], uniqueArray[j]);

    const objAnswer = {
        uniqueArray: uniqueArray,
        indexAnswer: j
    };
    console.log(`new object answers:`);
    console.log(objAnswer);

    return objAnswer;
}


// load question
function loadQuestion(questionElement, answerElements, indexQuestion) {
    // console.log(`indexQuestion: ${indexQuestion}`)
    const selectedQuestion = questions[indexQuestion];

    questionElement.innerHTML = selectedQuestion.title;
    talk(selectedQuestion.title);
    const objIndex = createUniqueArray(indexQuestion);
    for (let i = 0; i < 4; i++) {
        const otherQuestion = questions[objIndex.uniqueArray[i]];
        answerElements[i].innerHTML = otherQuestion.answer;
    }

    return objIndex.indexAnswer;
}


// add row into output-table
function addRowOutputTable($tbody, numberQuestion, titleValue, answerValue, isCorrect) {
    let tr = document.createElement('tr');
    tr.className = isCorrect ? 'correct-answer' : 'incorrect-answer';

    tr.innerHTML =
        `
        <td><b>Câu ${numberQuestion}: </b></td>
        <td>${titleValue}</td>
        <td>${answerValue}</td>
        <td><input type="checkbox" onclick="checkboxClickEvent(this);"/></td>
    `;

    tr.onclick = () => {
        talk(titleValue);
    };

    // add tr as first child into #tbody
    if ($tbody[0].childElementCount == 0) {
        $tbody.append(tr);
    }
    else {
        $tbody.children(':first').before(tr);
    }
}


// checkbox click event
function checkboxClickEvent(sender) {
    const parent = sender.parentNode.parentNode;
    const children = parent.getElementsByTagName('td');
    const numberQuestionElement = children[0];
    let arr = numberQuestionElement.innerText.split(' ');
    let numberQuestion = parseInt(arr[1]);

    if (sender.checked) {
        // add row
        const titleValueElement = children[1];
        const answerValueElement = children[2];
        addRowQuestionsMark(numberQuestion, titleValueElement.innerHTML, answerValueElement.innerHTML);
    }
    else {
        // delete row
        deleteRowQuestionsMark(numberQuestion);
    }
}


// add row into questions-mark table
function addRowQuestionsMark(numberQuestion, titleValue, answerValue) {
    const $tbody = $('#answers-mark tbody');

    let tr = document.createElement('tr');
    tr.id = numberQuestion;
    tr.innerHTML = `<td>${titleValue}</td>
                  <td>${answerValue}</td>`;
    tr.onclick = (e) => {
        talk(titleValue);
    }

    $tbody.append(tr);
}


// remove row into questions-mark table
function deleteRowQuestionsMark(numberQuestion) {
    const $tr = $(`#answers-mark tbody tr#${numberQuestion}`);
    if ($tr[0] != null) {
        $tr.remove();
    }
}


// speak text 
const synth = window.speechSynthesis;
function talk(textValue) {
    const msg = new SpeechSynthesisUtterance(textValue);
    // msg.lang = 'vi';
    synth.speak(msg);
}
