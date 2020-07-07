<template>
  <div id="app_div">
    <router-view />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "app"
};
</script>

<style>
body {
  background-color: #DFF2D8;
  font-family: "Montserrat", sans-serif;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
}

body,
html {
  height: 100%;
  align-items: center;
}

#app_div {
  width: 75%;
  height: 80%;
}

/* media queries */
@media only screen and (max-width: 768px) {
  #app_div {
    width: 100%;
    height: 100%;
    position: fixed;
  }
}

@media only screen and (max-height: 700px) and (min-width: 769px) {
  #app_div {
    width: 75%;
    height: 90%;
  }
}

</style>
