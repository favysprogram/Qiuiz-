const questions = [
    {
      question: "What is Anna's favorite pet?",
      answers: ["cat", "dog", "snake", "rat"],
      correct: 2   
    },
    {
      question: "What hobby does she enjoy the most?",
      answers: [
        "Swimming during summer",
        "Baking cookies",
        "Shopping with friends",
        "Reading novels"
      ],
      correct: 3
    },
    {
      question: "Which of these is the best way she cooks an egg?",
      answers: [" Boiled", "Hard boiled", "Fried", "Not boiled"],
      correct: 2
    },
    {
      question: "What does she do when angry?",
      answers: ["Throw tantrums", "Cry", "Punch things", "walks away"],
      correct: 2
    },
    {
      question: "How do you make Anna happy?",
      answers: [
        "New wigs",
        "Cakes",
        "Ice cream",
        "Take her shopping"
      ],
      correct: 3
    },
    {
      question: "What genre of movie does Anna watch?",
      answers: ["Romance", "Comedy", "Horror", "Action"],
      correct: 1
    },
    {
      question: "How old is Anna?",
      answers: ["20", "25", "22", "29"],
      correct: 2
    }
  ];

  
  let currentQuestionIndex = 0;  
  let score = 0;                  
  let answerChosen = false;       

 
  const questionText   = document.getElementById("question-text");
  const answersList    = document.getElementById("answers-list");
  const nextBtn        = document.getElementById("next-btn");
  const progressLabel  = document.getElementById("progress-label");
  const progressFill   = document.getElementById("progress-fill");
  const quizScreen     = document.getElementById("quiz-screen");
  const resultsScreen  = document.getElementById("results-screen");
  const scoreNumber    = document.getElementById("score-number");
  const resultsEmoji   = document.getElementById("results-emoji");
  const resultsHeading = document.getElementById("results-heading");
  const restartBtn     = document.getElementById("restart-btn");

  
  function showQuestion() {
    
    const currentQuestion = questions[currentQuestionIndex];

    
    answerChosen = false;
    nextBtn.classList.remove("visible");   // hide Next button

    
    progressLabel.textContent =
      "Question " + (currentQuestionIndex + 1) + " of " + questions.length;

    
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    progressFill.style.width = progressPercent + "%";

    
    questionText.textContent = currentQuestion.question;

    
    answersList.innerHTML = "";

    
    const letters = ["A", "B", "C", "D"];

   
    currentQuestion.answers.forEach(function(answer, index) {

      
      const btn = document.createElement("button");
      btn.classList.add("answer-btn");

      
      btn.innerHTML =
        '<span class="answer-letter">' + letters[index] + '</span>' +
        '<span>' + answer + '</span>';

     
      btn.addEventListener("click", function() {
        checkAnswer(index, btn);
      });

      
      answersList.appendChild(btn);
    });
  }

  
  function checkAnswer(chosenIndex, clickedBtn) {
   
    if (answerChosen) return;

    
    answerChosen = true;

   
    const correctIndex = questions[currentQuestionIndex].correct;

    
    const allButtons = answersList.querySelectorAll(".answer-btn");

    
    allButtons.forEach(function(btn) {
      btn.disabled = true;
    });

    
    if (chosenIndex === correctIndex) {
     
      clickedBtn.classList.add("correct");
      
      score = score + 1;
    } else {
      
      clickedBtn.classList.add("wrong");
      
      allButtons[correctIndex].classList.add("correct");
    }

    
    nextBtn.classList.add("visible");
  }

  
  function goToNextQuestion() {
   
    currentQuestionIndex = currentQuestionIndex + 1;

   
    if (currentQuestionIndex >= questions.length) {
     
      showResults();
    } else {
      
      showQuestion();
    }
  }

 
  function showResults() {
    
    quizScreen.style.display = "none";
    resultsScreen.classList.add("visible");

    
    scoreNumber.textContent = score + " / " + questions.length;

    
    const percentage = score / questions.length;  // e.g. 0.71 for 5/7

    if (percentage === 1) {
      resultsEmoji.textContent   = "🏆";
      resultsHeading.textContent = "Perfect Score!";
    } else if (percentage >= 0.7) {
      resultsEmoji.textContent   = "🎉";
      resultsHeading.textContent = "Great Job!";
    } else if (percentage >= 0.4) {
      resultsEmoji.textContent   = "👍";
      resultsHeading.textContent = "Not Bad!";
    } else {
      resultsEmoji.textContent   = "📚";
      resultsHeading.textContent = "Keep Practicing!";
    }
  }

  
  function restartQuiz() {
    currentQuestionIndex = 0;  
    score = 0;                 
    answerChosen = false;

    
    resultsScreen.classList.remove("visible");
    quizScreen.style.display = "block";

    
    showQuestion();
  }

 
  nextBtn.addEventListener("click", goToNextQuestion);
  restartBtn.addEventListener("click", restartQuiz);

  
  showQuestion();