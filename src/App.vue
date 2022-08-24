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

export default {
  name: 'App',
  components: {
   InitGame,
   Game,
   GameOver,
  },
  computed: {
   gameStatus() {
      return this.$store.getters['gameStatus']
   }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
</style>
