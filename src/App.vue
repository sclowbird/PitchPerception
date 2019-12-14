<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <PitchLanding msg="Welcome to Pitch Perception" />

    <router-view />
  </div>
</template>

<script>
import PitchLanding from "./components/PitchLanding.vue";
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
