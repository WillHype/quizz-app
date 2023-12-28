const questions = [
    {
        question : "Originally given the Japanese title 'Puckman', what 1980s arcade game was inducted into the Guinness Book of Records as the 'Most Successful Coin-Operated' Game in 2005?",
        answers:[
            {text: "Bomberman", correct: false },
            {text: "Pac-Man", correct: true },
            {text: "Mega Man", correct: false },
            {text: "Rayman", correct: false },
        ]
    },
    {
        question : "Making his debut in 1990's 'Super Mario World,' what is the name of the enemy-eating, egg-throwing green dinosaur who serves as a sidekick to Mario and Luigi in the Mario franchise?",
        answers:[
            {text: "Denver", correct: false },
            {text: "Bowser", correct: false },
            {text: "Megatron", correct: false },
            {text: "Yoshi", correct: true },
        ]
    },{
        question : "Pocket, Light, Color, and Advance were all styles or variants of what video game hardware system?",
        answers:[
            {text: "Neo Geo", correct: false },
            {text: "Nintendo DS", correct: false },
            {text: "Game Boy", correct: true },
            {text: "Playstation", correct: false },
        ]
    },{
        question : "What 1996 video game kicked off a long-running film and game franchise and eleveated the 'horror' genre of video games into the mainstream?",
        answers:[
            {text: "Resident Evil", correct: true },
            {text: "Silent Hill", correct: false },
            {text: "Dead space", correct: false },
            {text: "Tomb Raider", correct: false },
        ]
    },
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();