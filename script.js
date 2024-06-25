let currentQuestions = [];

function generateWorksheet() {
    const numQuestions = document.getElementById('num-questions').value;
    const operation = document.getElementById('operation').value;
    const digits = document.getElementById('digits').value;
    const showAnswers = document.getElementById('show-answers').checked;

    const operations = {
        "Addition": "+",
        "Subtraction": "-",
        "Multiplication": "*",
        "Division": "/"
    };

    currentQuestions = [];
    for (let i = 0; i < numQuestions; i++) {
        let num1, num2;
        if (operation === "Division") {
            num2 = getRandomInt(digits);
            num1 = num2 * getRandomInt(digits);
        } else {
            num1 = getRandomInt(digits);
            num2 = getRandomInt(digits);
            if (operation === "Subtraction" && num1 < num2) {
                [num1, num2] = [num2, num1];
            }
        }
        const question = `${num1} ${operations[operation]} ${num2}`;
        const answer = eval(question);
        currentQuestions.push({ question, answer });
    }

    displayWorksheet(currentQuestions, showAnswers);
}

function getRandomInt(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayWorksheet(questions, showAnswers) {
    const worksheetDiv = document.getElementById('worksheet');
    worksheetDiv.innerHTML = '';
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.textContent = `Q${index + 1}: ${q.question} = ${showAnswers ? q.answer : ''}`;
        worksheetDiv.appendChild(questionDiv);
    });
}

document.getElementById('show-answers').addEventListener('change', function() {
    displayWorksheet(currentQuestions, this.checked);
});
