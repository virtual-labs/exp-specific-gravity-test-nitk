
// Don't touch the below code

(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");


// Don't touch the above code




// Write your MCQs here --- Start --- --------------------

const myQuestions = [
  {
    question: "What is Specific Gravity of bitumen?",
    answers: {
      a: "Ratio of mass of given volume of substance to equal volume of water",
      b: "Ratio of mass of given volume of substance to equal volume of mass",
      c: "Ratio of mass of given water of substance to equal volume of substance",
      d: "Ratio all over mass to water"
    },
    correctAnswer: "a"
  },

  {
    question: "Specific gravity of bitumen directly conveys the quality of bitumen. (say True of False)",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "a"
  },
  {
    question: "Why Specific Gravity test is done?",
    answers: {
      a: "To know the grade",
      b: "To know its quality",
      c: "To know about its durability",
      d: "To know the toughness"
    },
    correctAnswer: "b"
  },
  {
    question: "Specific value of bitumen ranges from?",
    answers: {
      a: "0.98 to 1.20",
      b: "2.00 to 2.08",
      c: "0.99 to 1.00",
      d: "0.62 to 0.63"
    },
    correctAnswer: "a"
  },
  {
    question: "The presence of mineral impurities decreases the specific gravity of bitumen ( Say True or False)",
    answers: {
      a: "True",
      b: "False"
    },
    correctAnswer: "b"
  }
];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
