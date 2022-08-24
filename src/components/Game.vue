<template>
<div class="game">
   <div class="score-container">
      <div class="score-info">
         <h1>SCORE</h1>
         <span class="point">0</span>
      </div>
   </div>
   <div class="map">
      <div class="line"
       v-for="line in mapState" 
       :key="line" >
         <div class="block" 
         :style="{  'background-color': blockColor(block)}" 
         v-for="block in line"
         :block="block" 
         :key="block">
         </div>
      </div>
   </div>
</div>
</template>

<script>
export default {
   name:"GameVue", 
   created() {
      
   },
   computed: {
      mapState() {
         return  this.$store.getters['mapState']
      },
      snake() {
         return  this.$store.getters['getSnake']
      },
      food() {
         this.$store.dispatch("setFood", 1,2)
      }
   },
   methods: {
      blockColor(block) {
         if(block> 0) {
            if(block === 1){
               return 'green'
            }if(block === 2) {
               return 'red'
            } else {
               return 'black'
            }
         }
      },
      //HELP METHODS
      randomize() {
         let y = Math.floor(Math.random() * (19-1)+1)
         let x = Math.floor(Math.random() *(19-1)+1)
         return [y,x]
      },
      arePointsEqual([y1,x1] , [y2,x2]) {
         return y1 === y2 && x1 === x2
      },
      isPartOfSnake() {
      },
      initSnake() {
      }
   }
}
</script>

<style>
body {
   background-color: rgb(0, 0, 0);
}
.btn {
   width: 200px;
}
.map {
   margin: auto;
   margin-top: 5%;
   height: 2000px;
   width: 2000px;
   border-style: solid solid solid solid;
   border-color: rgb(45, 160, 16);
}

.line {
   height: 100px;
   display: flex;
}
.block {
   height: 100%;
   width: 30%;
   border-style:groove;
   border-width:  1px;
   border-color: rgb(82, 196, 54);
	display: block !important;
}
.snake {
   height: 100%;
    width: 30%;
    border-style: groove;
    border-width: 1px;
    border-color: rgb(82, 196, 54);
    display: block !important;
    background-color: #fff;
}
.food {
   height: 100%;
    width: 30%;
    border-style: groove;
    border-width: 1px;
    border-color: rgb(82, 196, 54);
    display: block !important;
    background-color: #f80202;
}
.score-container {
   display: flex;
    justify-content: center;
    /* margin-right: 5%; */
    margin-top: 5%;
    /* width: 300px; */
    /* height: 300px; */
    flex-direction: row-reverse;
    align-content: stretch;
}
.score-info {
    /* justify-content: space-between; */
    color: green;
    text-align: center;
    font-size: -webkit-xxx-large;
}
.point {

}
</style>