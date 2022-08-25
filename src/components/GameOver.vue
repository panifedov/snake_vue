<template>
   <div class="wrapper-game-over">
      <div class="header">
         <span class="game-over">GAME OVER</span>
      </div>
      <div class="restart-container">
         <button class="restart">RESTART</button>
      </div>
   </div>
</template>

<script>
export default {
   name:"GameOver"

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
.restart {
   font-size: 30px;
   background-color: #000;
   border: none;
   color: #218e27;

}
.restart:hover {
   background-color: #fff;
   color: #537429;
}
</style>