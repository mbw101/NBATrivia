<template>
  <div id="app_div" class="rounded"> <!-- p-5 -->
    <!-- most text including quiz start, start button and score -->
    <h1 id="newTitle" class="p-3" v-if="!started || finished">NBA Trivia App</h1>

    <img id="imageDisplay" v-if="!finished" :src="imageSource"/>

    <template v-if="!started">
      <!-- start button for quiz -->
      <b-button block variant="secondary" v-on:click="started = !started" id="startButton" v-if="!started && !finished" class="p-4 mt-3 mx-auto">Start Quiz</b-button>

      <!-- This is a different id, so I can adjust the spacing without the other items such as buttons, question, etc -->
      <p id="startingCreditText">Copyright &copy; 2020 Malcolm Wright</p>
    </template>

    <!-- actual quiz part includes the question, the answers, and the user's score-->
    <template v-if="!finished && started">
      <h4 id="question" class="pt-4">{{ question }}</h4>
      <div id="topRow" class="row pl-4 pr-4 mt-3">
        <b-button pill id="aButton" v-on:click="checkAnswer('a')"
        class="m-1 col" v-bind:class="[answer1Colour]" size="sm">{{ answer1 }}</b-button>
        <b-button pill id="bButton" v-on:click="checkAnswer('b')" v-bind:class="[answer2Colour]" class="m-1 col answer2Colour" size="sm">{{ answer2 }}</b-button>
      </div>
      <div id="bottomRow" class="row pl-4 pr-4"> 
        <b-button pill id="cButton" v-on:click="checkAnswer('c')" v-bind:class="[answer3Colour]" class="m-1 col answer3Colour" size="sm">{{ answer3 }}</b-button>
        <b-button pill id="dButton" v-on:click="checkAnswer('d')" v-bind:class="[answer4Colour]" class="m-1 col answer4Colour" size="sm">{{ answer4 }}</b-button>
      </div>

      <div id="scoreRow" class="row mx-auto">
        <p id="score" class="mr-3 mt-3 d-inline-block">Score: {{ score }}/{{ amountOfQuestions }}</p>

        <b-button pill id="nextButton" v-on:click="nextQuestion()" class="m-1 row ml-3">Next Question</b-button>        
      </div>

      <p id="creditText">Copyright &copy; 2020 Malcolm Wright</p>
    </template>

    <template v-if="finished">
      <h4 id="finalScore" v-if="finished">Your final score is {{ score }} / {{ amountOfQuestions }} </h4>
      <h3 id="finalMessage" v-if="finished">{{finalMessage}}</h3>
      <div class="d-flex justify-content-center">
        <button pill v-if="finished" id="playAgainButton" v-on:click="playAgain()" type="button" class="btn btn-sm">Play again</button>
      </div>

      <p id="finalMessage" class="pt-5" v-if="finished">Check out my <a href="https://mbw101.github.io/" target="_blank">website</a></p>
      <p id="creditText">Copyright &copy; 2020 Malcolm Wright</p>
    </template>
    
  </div>
</template>

<script>
import axios from "axios";

// constants and variable that holds our json questions
const numberOfQuestions = 25;
var questionData;

// these functions are responsible for the sounds
function playCorrectSound() {
  var correctSound = new Audio("../../static/soundCorrect.wav");
  correctSound.volume = 0.4;
  correctSound.play();
}
function playIncorrectSound() {
  var incorrectSound = new Audio("../../static/soundIncorrect.wav");
  incorrectSound.volume = 0.4;
  incorrectSound.play();
}

// vue object
export default {
  name: "quiz",

  data: function() {
    return {
      started: false,
      finished: false,
      answeredQuestion: false,
      question: "TEST",
      finalMessage: "",
      score: 0,
      amountOfQuestions: numberOfQuestions,
      questionNumber: 1,
      answer1: "A",
      answer2: "B",
      answer3: "C",
      answer4: "D",
      correctOption: "",
      imageSource: "",
      answer1Colour: "regularAnswer",
      answer2Colour: "regularAnswer",
      answer3Colour: "regularAnswer",
      answer4Colour: "regularAnswer",
    };
  },
  methods: {
    updateQuestion: function() {
      // check score and get the next question and answer
      this.question = questionData[this.questionNumber - 1].question;
      this.answer1 = questionData[this.questionNumber - 1].a;
      this.answer2 = questionData[this.questionNumber - 1].b;
      this.answer3 = questionData[this.questionNumber - 1].c;
      this.answer4 = questionData[this.questionNumber - 1].d;
      this.correctOption = questionData[this.questionNumber - 1].answer;
      this.imageSource = "static/" + questionData[this.questionNumber - 1].image;
      console.log(this.imageSource);

      // reset button class colours for the new question
      this.answer1Colour = "regularAnswer";
      this.answer2Colour =  "regularAnswer";
      this.answer3Colour =  "regularAnswer";
      this.answer4Colour =  "regularAnswer";
    },
    checkAnswer: function(option) {
      // the margin bottom for h1 has to be changed (h1 is the title header)
      if (!this.answeredQuestion) {
        console.log("Selected answer: " + option);
        console.log("Correct answer: " + this.correctOption);

        // 1 represents a correct response and 0 for an incorrect one
        let correctResponse = 0;

        // add to score if correct and play the respective score
        if (option == this.correctOption) {
          console.log("CORRECT");
          playCorrectSound();
          this.score += 1;
          correctResponse = 1;
        } else {
          playIncorrectSound();
          console.log("INCORRECT");
          correctResponse = 0;
        }

        //change the right answer to green and red if it's incorrect
        if (option == 'a') {
          // the user picked A
          if (correctResponse == 1) {
            this.answer1Colour = "correctAnswer";
          }
          else {
            this.answer1Colour = "wrongAnswer";
          }
        }
        else if (option == 'b') {
          // the user picked A
          if (correctResponse == 1) {
            this.answer2Colour = "correctAnswer";
          }
          else {
            this.answer2Colour = "wrongAnswer";
          }
        }
        else if (option == 'c') {
          // the user picked A
          if (correctResponse == 1) {
            this.answer3Colour = "correctAnswer";
          }
          else {
            this.answer3Colour = "wrongAnswer";
          }
        }
        else if (option == 'd') {
          // the user picked A
          if (correctResponse == 1) {
            this.answer4Colour = "correctAnswer";
          }
          else {
            this.answer4Colour = "wrongAnswer";
          }
        }

        if (correctResponse == 0) {
          // highlight the right answer
          if (this.correctOption == 'a') {
            this.answer1Colour = "correctAnswer";
          }
          else if (this.correctOption == 'b') {
            this.answer2Colour = "correctAnswer";
          }
          else if (this.correctOption == 'c') {
            this.answer3Colour = "correctAnswer";
          }
          else if (this.correctOption == 'd') {
            this.answer4Colour = "correctAnswer";
          }
        }
        // record that it has been answered, so they can't answer it more than once
        this.answeredQuestion = true;

        // go to next question unless we have reached the last one
        console.log("Amt:" + this.amountOfQuestions);
        console.log("Question #:" + this.questionNumber - 1);
      }
    },
    loadQuestions: function() {
      console.log("\n *START* \n");

      if (questionData == null) {

        // read in json file using axios
        axios.get("questions.json").then(response => {
          // print out for testing and save in global variable
          questionData = response.data;
          console.log(questionData);

          // set up the first question
          this.question = questionData[0].question;
          this.answer1 = questionData[0].a;
          this.answer2 = questionData[0].b;
          this.answer3 = questionData[0].c;
          this.answer4 = questionData[0].d;
          this.correctOption = questionData[0].answer;
          this.imageSource = "../../static/" + questionData[0].image;
          console.log(this.imageSource);
        })
        .catch(error => {
        if (!error.response) {
            // network error
            this.errorStatus = 'Error: Network Error';
            console.log("TESTING !#");
        } else {
            this.errorStatus = error.response.data.message;
        }
      });
      }
    },
    playAgain: function() {
      // restart quiz back to normal and go to start section
      this.score = 0;
      this.questionNumber = 1;
      this.finished = false;
      this.started = false;

      // set up the first question again
      this.question = questionData[0].question;
      this.answer1 = questionData[0].a;
      this.answer2 = questionData[0].b;
      this.answer3 = questionData[0].c;
      this.answer4 = questionData[0].d;
      this.correctOption = questionData[0].answer;
      this.imageSource = "../../static/" + questionData[0].image;

      // reset button classes for their colours
      this.answer1Colour = "regularAnswer";
      this.answer2Colour =  "regularAnswer";
      this.answer3Colour =  "regularAnswer";
      this.answer4Colour =  "regularAnswer";
      console.log(this.imageSource);
    },
    nextQuestion: function() {
      // go to the next question
      this.questionNumber += 1;
      // reset toggle for question
      this.answeredQuestion = false;

      if (this.questionNumber <= this.amountOfQuestions) {
        this.updateQuestion();
      } else {
        this.finished = true;

        // decide final msg to user based on their final score
        if (this.score < this.amountOfQuestions / 4) {
          this.finalMessage = "You may have to review your nba trivia";
          console.log(this.amountOfQuestions / 4);
        } else if (this.score < this.amountOfQuestions / 2) {
          this.finalMessage = "You had a good attempt at it";
          console.log(this.amountOfQuestions / 2);
        } else if (this.score < (this.amountOfQuestions * 3) / 4) {
          this.finalMessage = "You have good knowledge of the NBA!";
          console.log((this.amountOfQuestions * 3) / 4);
        } else if (this.score < numberOfQuestions) {
          this.finalMessage = "You have great knowledge of the NBA!";
        } else {
          this.finalMessage = "Fantastic, you got perfect!";
        }
      }
    }
  },
  created: function() {
    // loads the json questions when app is first started
    this.loadQuestions();
    console.log("Ran created function!");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");

/* CSS styles for each screen */
body {
  background-color: #eee5e9;
  font-family: "Montserrat", sans-serif;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
}

h1 {
  margin: auto;
  text-align: center;
}

#app_div {
  background-color: #CED097;
  border: black;
  border-width: 3px;
  border-style: solid;
  text-align: center;
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
}

#question {
  padding-left: 10%;
  padding-right: 10%;
  word-break: break-word;
  /* this is the height of a question with two lines.
    It keeps the design constant regardless of the question length.*/
  height: 82px;
}

.btn-secondary, #playAgainButton {
  font-size: x-large;
  background-color: #7EBDC3;
  color: #212529;
}

#aButton, #bButton, #cButton, #dButton {
  width: 30%;
  display: block;
}

#playAgainButton {
  width: 50%;
  margin: auto;
  padding: 2%;
}

#score {
  font-size: 24px;
}

#startButton {
  text-align: center;
  /* centers the button in the middle of the parent div */
  width: 50%;
  /* top: 50%;
  left: 50%; */
  margin: auto;
}

#sectionHeight {
  width: 100%;
  height: 150%;
} 

#creditText {
  font-size: 24px;
}  

#startingCreditText {
  font-size: 24px;
  position: relative;
}

#imageDisplay {
  width: 450px;
  height: 260px;
  margin: auto;
  margin-top: 0;
}

.correctAnswer {
  background-color: green;
}

.wrongAnswer {
  background-color: #cc2936;
}

.regularAnswer {
  background-color: #7EBDC3;
}


/* media queries */
@media only screen and (max-width: 768px) {
  #app_div {
    background-color: #CED097;
    border: black;
    border-width: 3px;
    border-style: solid;
    text-align: center;
    position: relative;
    display: grid;
    width: 100%;
    height: 100%;
  }

  #imageDisplay {
    width: 100%;
    height: 200px;
    margin: auto;
    margin-top: 0;
  }
}

@media only screen and (max-width: 414px) {
  #newTitle {
    font-size: 35px;
  } 

  #startingCreditText {
    font-size: 18px;
  }

  #creditText {
    font-size: 18px;
  }

  #aButton, #bButton, #cButton, #dButton, #nextButton {
    font-size: 18px;
    height: 80px;
    text-overflow: ellipsis;
    overflow: hidden;
  } 

  #finalMessage {
    font-size: 18px;
    padding-left: 10%;
    padding-right: 10%;
  }

  #playAgainButton {
    font-size: 28px;
  }

  #question {
    font-size: 18px;
  }

  #score {
    font-size: 18px;
    margin-top: 2rem !important;
  }
}

@media only screen and (max-width: 380px) {
  #newTitle {
    font-size: 28px;
  } 

  #question {
    font-size: 16px;
  }

  #startingCreditText {
    font-size: 20px;
  }

  #imageDisplay {
    width: 100%;
    height: 150px;
    margin: auto;
    margin-top: 0;
  }
}

@media only screen and (max-width: 320px) {
  .btn-secondary {
    color: #212529;
  }

  #question {
    font-size: 14px;
  }

  #playAgainButton {
    font-size: 24px;
    width: 75%;
  }

  #startButton {
    font-size: 18px;
  }

  #startingCreditText {
    font-size: 16px;
  }

  #aButton, #bButton, #cButton, #dButton {
    font-size: 14px;
    height: 80px;
    text-overflow: ellipsis;
    overflow: hidden;
  } 

  #creditText {
    font-size: 14px;
  }

  /* #score {
    margin: 0;
  } */
}

@media only screen and (max-height: 700px) and (min-width: 769px) {
  #imageDisplay {
    width: 45%;
    height: 200px;
    margin: auto;
    margin-top: 0;
  }  

  /* #score {
    margin-top: 0px !important; /* overrides the bootstrap margin set in the class 
  } */
}

</style>
