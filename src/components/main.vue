<template>
  <div id="app">
    <h1 id="title" v-if="!started">NBA Trivia made by Malcolm Wright</h1>
    <h1 id="newTitle" v-if="started">NBA Trivia - Malcolm Wright</h1>

    <b-button block variant="primary" v-on:click="started = !started" id="startButton" v-if="!started" class="p-4 mx-auto">Start Quiz</b-button>
    <template v-else>
      <h2 id="question">{{ message }}</h2>
      <b-button lg="4" id="aButton" v-on:click="checkAnswer('A')" class="pb-4, m-1">A</b-button>
      <b-button lg="4" id="bButton" v-on:click="checkAnswer('B')" class="pb-4, m-1">B</b-button>
      <b-button lg="4" id="cButton" v-on:click="checkAnswer('C')" class="pb-4, m-1">C</b-button>
      <b-button lg="4" id="dButton" v-on:click="checkAnswer('D')" class="pb-4, m-1">D</b-button>
      <p id="score" class="mt-5">Score: {{ score }}/{{ amountOfQuestions }}</p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      started: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

body {
  background-color: #EEEEEE;
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

body, html {
  margin: 0;
  height: 100%;
}

#app {
    width: 50%;
    border: black;
    border-width: 3px;
    border-style: solid;
    text-align: center;
    position: relative;
    display: grid;
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
  font-size: xx-large;
}

#score {
  font-size: 24px;
}

#startButton {
  text-align: center;
  /* centers the button in the middle of the parent div */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
}

</style>
