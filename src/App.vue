<template>
  <div id="app">
   <InitGame v-if="gameStatus === 0 "/>
   <Game v-if="gameStatus === 1 "/>
   <GameOver v-if="gameStatus === 2 "/>
  </div>
</template>

<script>
import InitGame from './components/InitGame.vue'
import Game from './components/Game.vue'
import GameOver from './components/GameOver.vue'
//import constants from "../../src/constants/constants.js"
//var KEY_FLAG = true;

export default {
  name: 'App',
  mounted() {
      document.addEventListener("keyDown", (event) => this.setLastPressedKey(event));
      document.addEventListener("keyup", (event) => this.setLastPressedKey(event));
   },
  components: {
   InitGame,
   Game,
   GameOver,
  },
  computed: {
   gameStatus() {
      return this.$store.getters['gameStatus']
   },
   getSnakeDirection() {
      return this.$store.getters['getSnakeDirection']
   },
   getNewSnakeDirection() {
      return this.$store.getters['getNewSnakeDirection']
   }
  },
  methods: {
   setLastPressedKey(event){
         let pressedKey = event.key
         this.$store.dispatch('setLastPressedKey', pressedKey)
      },
  }
}
</script>

<style>
.body {
   height: 100%;
   width: 100%;
   overflow: hidden;
}
.app {
   height: 100%;
   width: 100%;
}
@import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
</style>
