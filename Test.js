/* constructor method of creating Classes*/
function Person(name) {
    this.name = name;
    this.sayHello = function () {
        console.log("Hello " + this.name + "!");
    }
}

let Malcolm = new Person("Malcolm");
Malcolm.sayHello();

/* load JSON data for quiz answers */
function loadInData() {

}

// Calculates the percentage completed with the given score and amount of questions
function calculatePercentage(score) {
    return (score / numberOfQuestions) * 100;
}

function printScore(score) {
    if (score >= 0 && score <= 100) {
        console.log("Score achieved: " + score + "/" + numberOfQuestions);
        let percentage = calculatePercentage(score);
        console.log(percentage + "%");
    }
}

/* */
function quizOver() {
    printScore();
}