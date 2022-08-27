<template>
   <div class="wrapper-game-over">
      <div class="header">
         <span class="game-over">GAME OVER</span>
      </div>
      <div class="restart-container">
         <button class="btn-restart" @click="restart()">RESTART</button>
      </div>
   </div>
</template>

<script>
export default {
   name:"GameOver",
   methods:{
      restart(){
         console.log('restart');
         this.$store.dispatch("setGameState", 0)
      }
   },
}
</script>

<style>
body {
   background-color: rgb(0, 0, 0);
   color: rgb(255, 255, 255);
}
.wrapper-game-over {
   position: absolute;
    /* display: contents; */
   margin-top: 30%;
   width: 100%;
   height: 100%;
}
.header {
   position: absolute;
   text-align: center;
   /* display: contents; */
   /*margin-top: 30%;*/
   width: 100%;
   height: 100%;
}
.game-over {
   font-size: -webkit-xxx-large;
   color: #b31818;
}
.restart-container {
   margin-top: 5%;
   text-align: center;
}
.btn-restart {
   font-size: 30px;
   background-color: #000;
   border: none;
   color: #1a801f;

}
.btn-restart:hover {
   color: #f7df09;
}
</style>