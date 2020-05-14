<template>
  <div id="app_div">
    <router-view/>
  </div>
</template>

<script>
/*Vue.component('app', {

});*/

export default {
  name: 'app'
}

</script>

<style>

body {
  background-color: #08415C;
  font-family: 'Montserrat', sans-serif;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
}

body, html {
  height: 100%;
  align-items: center;
}

/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}*/

/*#app {
    width: 50%;
    border: black;
    border-width: 3px;
    border-style: solid;
    text-align: center;
    position: relative;
    display: grid;
}*/
</style>
