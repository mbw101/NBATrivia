/*
Malcolm Wright
March 17th, 2020
*/
"use strict";

const numberOfQuestions = 50;
let defaultColour = 'grey';
let correctColour = 'green';
let wrongColour = 'red';

/* read in the json file with all the questions */
function loadQuestions() {

}

/* resets everything for the quiz */
function resetQuiz() {
    app.score = 0;
}

var app = new Vue({
    el: '#app',
    data: {
        started: false,
        // this is just for testing, we will want to read from the JSON file
        message: '1. How many players scored 100 points?',
        amountOfQuestions: numberOfQuestions,
        score: 0,
        fontSize: 30
    },
    computed: {
        getMarginBottom: function() {
          return this.marginBottom;
        },

        getColour: function() {
            return this.activeColor;
        }
    },
    methods: {
        checkAnswer: function(option) {
            // this is also for testing, we will want the correct
            // response from the respective question inside the JSON file
            // the margin bottom for h1 has to be changed (h1 is the title header)
            let correctOption = 'A';

            /* change margin to 5% */
            this.marginBottom = '5%';
            this.activeColor = 'blue';
            getJSON( "questions.json", function( data ) {
                console.log(data.a);
            })

            if (correctOption == option) {
                this.score += 1;
            }
            else {
                resetQuiz();
            }
        },
        updateQuestion: function() {
            // check score and get the next question and answer
        }
    }
})
