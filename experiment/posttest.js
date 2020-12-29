
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
      question: "Temperature to be maintained in this experiment is?",
      answers: {
        a: "25&deg;C",
        b: "26&deg;C",
        c: "27&deg;C",
        d: "28&deg;C"
      },
      correctAnswer: "c"
    },

    {
      question: "This test is conducted to determine Specific Gravity of?",
      answers: {
        a: "Semi-solid bitumen",
        b: "Solid bitumen",
        c: "Liquid bitumen",
        d: "Harden bitumen"
      },
      correctAnswer: "a"
    },

    {
      question: "Capacity of Specific Gravity bottle used in this experiment is?",
      answers: {
        a: "10ml",
        b: "15ml",
        c: "25ml",
        d: "50ml"
      },
      correctAnswer: "d"
    },
    {
      question: "IS code used for bitumen test is?",
      answers: {
        a: "IS 1401 to 1250 (1988)",
        b: "IS 1200 to 1220 (1979)",
        c: "IS 1201 to 1220 (1978)",
        d: "IS 1200 to 1230 (2000)"
      },
      correctAnswer: "c"
    },
    {
      question: "Specific gravity of bitumen is important to understand the<br>1. Quality of bitumen<br>2. Rate of spread of bitumen<br>3. Consistency of bitumen",
      answers: {
        a: "Only 2 is correct",
        b: "Only 3 is correct",
        c: "1 and 2 are correct",
        d: "All are correct"
      },
      correctAnswer: "c"
    }
  ];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
