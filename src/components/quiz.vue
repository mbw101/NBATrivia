<template>
  <div id="app_div" class="rounded"> <!-- p-5 -->
    <!-- most text including quiz start, start button and score -->
    <h1 id="newTitle" class="p-3">Easy NBA Trivia App</h1>

    <template v-if="!started">
      <!-- start button for quiz -->
      <b-button block variant="secondary" v-on:click="started = !started" id="startButton" v-if="!started && !finished" class="p-4 mx-auto">Start Quiz</b-button>

      <!-- This is a different id, so I can adjust the spacing without the other items such as buttons, question, etc -->
      <p id="startingCreditText">Made by Malcolm Wright</p>
    </template>

    <!-- actual quiz part includes the question, the answers, and the user's score-->
    <template v-if="!finished && started">
      <h4 id="question" class="pt-4">{{ question }}</h4>
      <b-button pill id="aButton" v-on:click="checkAnswer('a')" class="pb-3, m-1" size="sm">{{ answer1 }}</b-button>
      <b-button pill id="bButton" v-on:click="checkAnswer('b')" class="pb-3, m-1" size="sm">{{ answer2 }}</b-button>
      <b-button pill id="cButton" v-on:click="checkAnswer('c')" class="pb-3, m-1" size="sm">{{ answer3 }}</b-button>
      <b-button pill id="dButton" v-on:click="checkAnswer('d')" class="pb-3, m-1" size="sm">{{ answer4 }}</b-button>
      <p id="score" class="mt-5">Score: {{ score }}/{{ amountOfQuestions }}</p>
      <p id="creditText">Made by Malcolm Wright</p>
    </template>

    <template v-if="finished">
      <h4 id="finalScore" v-if="finished">Your final score is {{ score }} / {{ amountOfQuestions }} </h4>
      <p id="finalMessage" v-if="finished">{{finalMessage}}</p>
      <button pill v-if="finished" id="playAgainButton" v-on:click="playAgain()" type="button" class="btn btn-sm">Play again</button>

      <p id="finalMessage" class="pt-5" v-if="finished">Check out my <a href="https://mbw101.github.io/" target="_blank">website</a></p>
      <p id="creditText">Made by Malcolm Wright</p>
    </template>
    
  </div>
</template>

<script>
import app from "../App.vue";
import axios from "axios";

//Vue.config.productionTip = false

// constants and variable that holds our json questions
const numberOfQuestions = 11;
let defaultColour = "grey";
let correctColour = "green";
let wrongColour = "red";
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

  components: {
    app
  },
  data: function() {
    return {
      started: false,
      finished: false,
      question: "TEST",
      finalMessage: "",
      score: 0,
      amountOfQuestions: numberOfQuestions,
      questionNumber: 1,
      answer1: "A",
      answer2: "B",
      answer3: "C",
      answer4: "D",
      correctOption: ""
    };
  },
  computed: {
    getColour: function() {
      return this.activeColor;
    }
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
    },
    checkAnswer: function(option) {
      // the margin bottom for h1 has to be changed (h1 is the title header)

      /* change margin to 5% */
      this.marginBottom = "5%";
      this.activeColor = "blue";
      console.log("Selected answer: " + option);
      console.log("Correct answer: " + this.correctOption);

      // add to score if correct and play the respective score
      if (option == this.correctOption) {
        console.log("CORRECT");
        playCorrectSound();
        this.score += 1;
      } else {
        playIncorrectSound();
        console.log("INCORRECT");
      }

      // go to next question unless we have reached the last one
      console.log("Amt:" + this.amountOfQuestions);
      console.log("Question #:" + this.questionNumber - 1);

      // go to next question
      this.questionNumber += 1;
        
      if (this.questionNumber <= this.amountOfQuestions) {
        this.updateQuestion();
      } else {
        this.finished = true;

        // decide final msg to user based on their final score
        if (this.score < 3) {
          this.finalMessage = "I hope you know where you went wrong.";
        } else if (this.score < 5) {
          this.finalMessage =
            "You have to brush up on your NBA trivia knowledge a little";
        } else if (this.score < 7) {
          this.finalMessage = "You got average knowledge of the NBA";
        } else if (this.score < 9) {
          this.finalMessage = "You have great knowledge of the NBA";
        } else {
          this.finalMessage = "Fantastic, you got perfect!";
        }
      }
    },
    loadQuestions: function() {
      console.log("\n *START* \n");

      if (questionData == null) {
        // read in json file using axios
        axios.get("./static/questions.json").then(response => {
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
  background-color: #f1bf98;
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
  margin-bottom: 5%;
  padding-left: 10%;
  padding-right: 10%;
  overflow: hidden;
  word-break: break-word;
}

.btn-secondary, #playAgainButton {
  font-size: x-large;
  background-color: #cc2936;
  color: #212529;
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  margin-top: 25%;
}

@media only screen and (max-width: 768px) {
  #app_div {
    background-color: #f1bf98;
    border: black;
    border-width: 3px;
    border-style: solid;
    text-align: center;
    position: relative;
    display: grid;
    /*width: 100%;*/
    /*width: 75%;
    height: 80%;*/
    width: 100%;
  }
}

@media only screen and (max-width: 414px) {
  #newTitle {
    font-size: 35px;
  } 

  #startingCreditText {
    margin-top: 85%;
    font-size: 20px;
  }
}

@media only screen and (max-width: 380px) {
  #newTitle {
    font-size: 24px;
  } 

  #startingCreditText {
    margin-top: 85%;
    font-size: 20px;
  }
}

@media only screen and (max-width: 320px) {
  .btn-secondary, #playAgainButton {
    font-size: large;
    background-color: #cc2936;
    color: #212529;
  }

  #startingCreditText {
    margin-top: 85%;
  }

  #creditText {
    font-size: 14px;
  }
}

</style>
