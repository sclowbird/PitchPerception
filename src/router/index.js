import Vue from "vue";
import Router from "vue-router";
import PitchLanding from "@/components/PitchLanding";
import PitchPerception from "@/components/PitchPerception";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: {
        name: "PitchLanding"
      }
    },
    {
      path: "/PitchLanding",
      name: "PitchLanding",
      component: PitchLanding
    },
    {
      path: "/:accessToken",
      name: "PitchPerception",
      component: PitchPerception
    }
  ]
});
