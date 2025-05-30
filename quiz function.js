(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
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
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'green';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length} <br> Go back to check your answers`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Which is an example of a shrub?",
        answers: {
          a: "Mango tree",
          b: "Tomato plant",
          c: "Lemon"
        },
        correctAnswer: "c"
      },
      {
        question: "Which of the following type of plants has thick, hard and woody stem?",
        answers: {
          a: "Shrub",
          b: "Herb",
          c: "Tree"
        },
        correctAnswer: "c"
      },
      {
        question: "What is an annual plant?",
        answers: {
          a: "A plant that lives for several years is a perennial plant",
          b: "this is biennial plnt",
          c: "the word anual means to occur every year"
        },
        correctAnswer: "c"
      },
      {
        question: "How can you tell the age of tree?",
        answers: {
          a: "by counting the rings on the trunk",
          b: "by measuring the tree width",
          c: "by counting the nuber of leaves"
        },
        correctAnswer:"a"
      },
      {
        question: "What is a Pomegranate?",
        answers: {
          a: "Creepers",
          b: "Shrubs",
          c: "Herbs"
        },
        correctAnswer: "c"
      },
      {
        question: "How does a plant get water from soil?",
        answers: {
          a: "plants uses its leaves to harness the sun energy",
          b: "A plants use its roots to draw up water and nutrients from the soil",
          c: "though water does travel up a plant stem."
        },
        correctAnswer:"b"
      },
      {
        question: "What are leaves for?",
        answers: {
          a: "to protect flowers from insects and other animals",
          b: "the leaves absorb the suns energy and convert it into food in a process called photosynthesis",
          c: "to protect plants from the rain."
        },
        correctAnswer:"b"
      },
      {
        question: "What is deciduous plant?",
        answers: {
          a: "A plant that bears cone is a coniferous plant,and most are evergreen.",
          b: "A evergreen plant keeps its leaves all year round",
          c: "A decidous plants leaves are shed every fall."
        },
        correctAnswer:"c"
      },
      {
        question: "The tobacco plant Nicotiana tobacum belongs to the family?",
        answers: {
          a: "Moraceae.",
          b: "Urticaceae",
          c: "Solanaceae."
        },
        correctAnswer:"c"
      },
      {
        question: "A plant that has seeds but no flowers and fruits?",
        answers: {
          a: "Bryophytes",
          b: "jmosses",
          c: "pteriodophytes",
          d: "Gymnosperms"
        },
        correctAnswer: "d"
      }
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  