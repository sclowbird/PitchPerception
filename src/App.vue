<template>
  <div id="app">
    <img
      style="width:50%; margin:0 auto;"
      alt="Vue logo"
      src="./assets/Logo2_PitchPerception.svg"
    />
    <svg></svg>
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
    return {
      accessToken: ""
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
