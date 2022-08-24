<template>
  <div class="intro">
   <div class="intro-text"><h4>SNAKE GAME</h4></div>
   <div class="intro-button">
      <button class="btn-start" @click="start()">START</button>
      <button class="btn-records">RECORDS</button>
   </div>
   <div class="labale">
      <h4>GitHub</h4>
      </div>
  </div>
</template>

<script>
 
export default {
   name: "InitGame",
   data() {
      return {
      }
   },
   methods:{
   start() {
      this.$store.dispatch("setGameState", 1)
   },
   }

}
</script>

<style>
body {
   background-color: rgb(0, 0, 0);
   color: rgb(35, 141, 35);
}
.intro-text {
   position: relative;
   font-family: 'Indie Flower', cursive;
   text-align: center;
   font-size: 150px;
   margin-top: 10%;
   color: rgb(35, 141, 35);
}
.intro-button {
   display: flex;
   flex-direction: column;
}
.btn-start {
   font-size: 70px;
   font-family: 'Indie Flower', cursive;
   background-color: rgb(0, 0, 0);
   color: #fff;
   text-decoration: none;
   border: none;
}
.btn-records {
   font-size: 70px;
   font-family: 'Indie Flower', cursive;
   background-color: rgb(0, 0, 0);
   color: #fff;
   text-decoration: none;
   border: none;
}
.btn-start:hover {
   color: rgb(40, 153, 40);
}
.btn-records:hover {
   color: rgb(40, 153, 40);
}
.labale {
   text-align: center;
   margin-top: 15%;
   font-family: 'Indie Flower', cursive;
}
</style>