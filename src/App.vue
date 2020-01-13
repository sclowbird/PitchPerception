<template>
  <div id="app">
    <img id="pp-logo" alt="Vue logo" src="./assets/Logo2_PitchPerception.svg" />
    <router-view />
  </div>
</template>

<script>
import PitchLanding from "./components/PitchLanding.vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "app",
  data: () => {
    return {};
  }
};
</script>

<style>
p {
  color: #f7b202;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
  background-color: #fffbfb00;
}

#pp-logo {
  width: 53%;
  margin: 0 auto;
}

@media (min-width: 1200px) {
  #pp-logo {
    width: 32%;
    margin: 0 auto;
  }
}

@media (min-width: 1800px) {
  #pp-logo {
    width: 15%;
    margin: 0 auto;
  }
}
</style>
