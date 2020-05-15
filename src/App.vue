<template>
  <div id="app_div">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
body {
  background-color: #08415c;
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
</style>
