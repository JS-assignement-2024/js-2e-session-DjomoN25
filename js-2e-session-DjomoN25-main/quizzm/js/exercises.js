document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('user');
    document.getElementById('user-welcome').textContent = `Bienvenue, ${userName}!`;
});

let selectedOperations = [];
let numberOfExercises = 0;
let exercises = [];

const selectOperation = (operation) => {
    const button = document.getElementById(`btn-${operation}`);
    const isSelected = selectedOperations.includes(operation);
    isSelected ? selectedOperations.splice(selectedOperations.indexOf(operation), 1) : selectedOperations.push(operation);
    button.classList.toggle('selected', !isSelected);
};

const generateExercises = () => {
    numberOfExercises = parseInt(document.getElementById('num-exercises').value, 10);
    if (selectedOperations.length === 0 || numberOfExercises <= 0) {
        alert("Choisis au moins une opération ;)");
        return;
    }

    exercises = Array.from({ length: numberOfExercises }, () => {
        const operation = selectedOperations[Math.floor(Math.random() * selectedOperations.length)];
        const [num1, num2] = [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1];
        const { exercise, answer } = generateExercise(operation, num1, num2);
        return { operation, num1, num2, exercise, answer };
    });

    displayExercises();
    document.getElementById('submit-button').style.display = 'block';
};

const generateExercise = (operation, num1, num2) => {
    switch (operation) {
        case 'addition': return { exercise: `${num1} + ${num2}`, answer: num1 + num2 };
        case 'subtraction': return { exercise: `${num1} - ${num2}`, answer: num1 - num2 };
        case 'multiplication': return { exercise: `${num1} * ${num2}`, answer: num1 * num2 };
        case 'division': return { exercise: `${num1 * num2} / ${num2}`, answer: num1 * num2 / num2 };
    }
};

const displayExercises = () => {
    const container = document.getElementById('drag-drop-container');
    container.innerHTML = '';
    
    const exerciseContainer = document.createElement('div');
    exerciseContainer.id = 'exercise-container';

    const answerContainer = document.createElement('div');
    answerContainer.id = 'answer-container';

    const answers = exercises.flatMap((ex, index) => {
        const exerciseDiv = createExerciseDiv(ex, index);
        exerciseContainer.appendChild(exerciseDiv);

        const dropPart = Object.keys(ex).find(key => key !== 'exercise' && key !== 'answer');
        return dropPart !== 'answer' ? createAnswerDiv(ex[dropPart], index) : [];
    });

    answerContainer.append(...shuffleArray(answers));
    container.append(exerciseContainer, answerContainer);
};

const createExerciseDiv = (ex, index) => {
    const exerciseDiv = document.createElement('div');
    exerciseDiv.className = 'exercise';
    exerciseDiv.id = `exercise-${index}`;

    const parts = ['num1', 'num2'];
    const dropPart = parts[Math.floor(Math.random() * parts.length)];

    parts.forEach(part => {
        const partDiv = document.createElement(part === dropPart ? 'div' : 'div');
        partDiv.className = part === dropPart ? 'drop-zone' : 'static-part';
        partDiv.id = `${part}-${index}`;
        partDiv.ondrop = drop;
        partDiv.ondragover = allowDrop;
        partDiv.textContent = ex[part] || '';
        exerciseDiv.appendChild(partDiv);
    });

    exerciseDiv.insertAdjacentHTML('afterbegin', `<div class="static-part">${getOperatorSymbol(ex.operation)}</div>`);
    exerciseDiv.insertAdjacentHTML('beforeend', '<div class="static-part">=</div>');
    exerciseDiv.insertAdjacentHTML('beforeend', `<div class="static-part" id="answer-${index}">${ex.answer}</div>`);

    return exerciseDiv;
};

const createAnswerDiv = (answer, index) => {
    const answerDiv = document.createElement('div');
    answerDiv.className = 'answer';
    answerDiv.id = `answer-${index}`;
    answerDiv.draggable = true;
    answerDiv.ondragstart = drag;
    answerDiv.textContent = answer;
    return answerDiv;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const getOperatorSymbol = (operation) => {
    const symbols = { addition: '+', subtraction: '-', multiplication: '*', division: '/' };
    return symbols[operation] || '';
};

const allowDrop = (ev) => ev.preventDefault();
const drag = (ev) => ev.dataTransfer.setData("text", ev.target.id);
const drop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
};

const submitAnswers = () => {
    console.log("JavaScript file reloaded");
    let correct = 0;

    exercises.forEach((ex, index) => {
        const num1Div = document.getElementById(`num1-${index}`);
        const num2Div = document.getElementById(`num2-${index}`);
        const answerDiv = document.getElementById(`answer-${index}`);

        const num1Answer = num1Div ? parseInt(num1Div.innerText) : ex.num1;
        const num2Answer = num2Div ? parseInt(num2Div.innerText) : ex.num2;
        const resultAnswer = answerDiv ? parseInt(answerDiv.innerText) : ex.answer;

        const isNum1Correct = num1Answer === ex.num1;
        const isNum2Correct = num2Answer === ex.num2;
        const isAnswerCorrect = resultAnswer === ex.answer;

        if (num1Div) num1Div.style.backgroundColor = isNum1Correct ? 'green' : 'red';
        if (num2Div) num2Div.style.backgroundColor = isNum2Correct ? 'green' : 'red';

        if (isNum1Correct && isNum2Correct && isAnswerCorrect) correct++;
    });

    alert(`Tu as eu ${correct} bonnes réponses!`);

    fetch('http://localhost/quizzm/_api/api.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: localStorage.getItem('user'),
            score: correct,
            numquest: numberOfExercises,
            type: 'savescore'
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Erreur HTTP, statut ' + response.status);
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            console.log('Score sauvegardé:', data);
        } else {
            document.getElementById('message').textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
};
