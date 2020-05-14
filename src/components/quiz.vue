<template>
  <div id="app_div" class="p-5 rounded">
    <h1 id="title" v-if="!started">Easy NBA Trivia App</h1>
    <h1 id="newTitle" v-if="started">Easy NBA Trivia App</h1>
    <h4 id="finalScore" v-if="finished">Your final score is {{ score }} / {{ amountOfQuestions }} </h4>
    <p id="finalMessage" v-if="finished">{{finalMessage}}</p>
    <p id="finalMessage" v-if="finished">Check out my <a href="https://mbw101.github.io/" target="_blank">website.</a></p>
    <b-button pill v-if="finished" id="playAgainButton" v-on:click="playAgain()" class="pb-3, m-1" size="sm">Play again</b-button>

    <!-- start button for quiz -->
    <b-button block variant="secondary" v-on:click="started = !started" id="startButton" v-if="!started" class="p-4 mx-auto">Start Quiz</b-button>
    
    <!-- actual quiz part includes the question, the answers, and the user's score-->
    <template v-else-if="!finished">
      <h4 id="question">{{ question }}</h4>
      <b-button pill id="aButton" v-on:click="checkAnswer('a')" class="pb-3, m-1" size="sm">{{ answer1 }}</b-button>
      <b-button pill id="bButton" v-on:click="checkAnswer('b')" class="pb-3, m-1" size="sm">{{ answer2 }}</b-button>
      <b-button pill id="cButton" v-on:click="checkAnswer('c')" class="pb-3, m-1" size="sm">{{ answer3 }}</b-button>
      <b-button pill id="dButton" v-on:click="checkAnswer('d')" class="pb-3, m-1" size="sm">{{ answer4 }}</b-button>
      <p id="score" class="mt-5">Score: {{ score }}/{{ amountOfQuestions }}</p>
    </template>

    <p id="credit">Made by Malcolm Wright</p>
  </div>
</template>

<script>
import app from "../App.vue";
import axios from 'axios';

//Vue.config.productionTip = false

const numberOfQuestions = 10;
let defaultColour = 'grey';
let correctColour = 'green';
let wrongColour = 'red';
var questionData;

/* resets everything for the quiz */
function resetQuiz() {
    quiz.score = 0;
}

// vue object 
export default {
  name: 'quiz',

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
    }
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
            this.marginBottom = '5%';
            this.activeColor = 'blue';
            console.log("Selected answer: " + option);
            console.log("Correct answer: " + this.correctOption);

            // add to score if correct
            if (option == this.correctOption) {
              console.log("CORRECT");
                this.score += 1;
            }
            else {
                console.log("INCORRECT");
            }

            // go to next question
            this.questionNumber += 1;

            // go to next question unless we have reached the last one
            console.log("Amt:" + this.amountOfQuestions);
            console.log("Question #:" + this.questionNumber);

            if (this.questionNumber <= this.amountOfQuestions) {
              this.updateQuestion();
            }
            else {
              this.finished = true;

              // decide final msg to user based on their final score
              if (this.score < 3) {
                this.finalMessage = "I hope you know where you went wrong.";
              }
              else if (this.score < 5) {
                this.finalMessage = "You have to brush up on your NBA trivia knowledge a little";
              }
              else if (this.score < 7) {
                this.finalMessage = "You got average knowledge of the NBA";
              }
              else if (this.score < 9) {
                this.finalMessage = "You have great knowledge of the NBA";
              }
              else {
                this.finalMessage = "Fantastic, you got perfect!";
              }
            }
        },
        loadQuestions: function() { 
          console.log("\n *START* \n");

          // read in json file using axios
          axios.get('./static/questions.json')
          .then(response => {      
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
        },
        playAgain: function() {
          // restart quiz back to normal and go to start section
          // TODO: on second time around, first question is being skipped
          this.score = 0;
          this.questionNumber = 1;
          this.finished = false;
          this.started = false;
        }
    },
    created: function() {
      // loads the json questions when app is first started
      this.loadQuestions();
    },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

body {
  background-color: #EEE5E9;
  font-family: 'Montserrat', sans-serif;
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
  background-color: #F1BF98;
  padding-left: 25%;
  width: 100%;
  border: black;
  border-width: 3px;
  border-style: solid;
  text-align: center;
  position: relative;
  display: grid;
}

#question {
  white-space: pre-wrap;
}

#title {
  margin-bottom: 50%;
}

#newTitle {
  margin-bottom: 5%;
}

#question {
  margin-bottom: 5%;

}

.btn-secondary {
  font-size: x-large;
  background-color: #CC2936;
  color: #212529;
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

</style>
