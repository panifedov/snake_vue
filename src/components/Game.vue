<template>
<div class="game">
   <button class="btn" @click="check()"></button>
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
      this.startGame()
   },
   mounted() {
      //document.addEventListener("keydown", (event) => this.keyboardDown(event));
      //document.addEventListener("keyup", (event) => this.keyboardUp(event));
   },
   computed: {
      mapState() {
         return  this.$store.getters['mapState']
      },
      snake() {
         return  this.$store.getters['getSnake']
      },
      food() {
         return  this.$store.getters['getFood']
      },
      snakeDirection(){
         return this.$store.getters['getSnakeDirection']
      },
      getSnakeHead() {
         return this.$store.getters['getSnakeHead']
      },
      getNextSnakeHead() {
         return this.$store.getters['getNextSnakeHead']
      }
   },
   methods: {
      //Стилизация блоков
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
      //Тестовая проверка
      check(){
         this.calculateSnakeNextHead()
         this.moveSnakeHead()
      },
      //                                                             HELP METHODS
      randomize() {
         let y = Math.floor(Math.random() * (19-1)+1)
         let x = Math.floor(Math.random() *(19-1)+1)
         return [y,x]
      },
      arePointsEqual([y1,x1] , [y2,x2]) {
         return y1 === y2 && x1 === x2
      },
      ifPartOfSnake([y,x]) {
         this.snake.forEach(array => {
            if(arePointsEqual([array[0],array[1]] , [y,x]) == false ){
               return true
            } else {
               return false
            }
         });
      },
      //                                                                MAIN METHODS 
      calculateSnakeNextHead(){
         const direction = this.getSnakeDirection
         this.getSnakeHead
         this.getSnakeDirection
         if(direction == "Right"){
            let y = this.getSnakeHead[0]
            let x = this.getSnakeHead[1]++
            let point = [y,x]
            this.$store.dispatch('setNextSnakeHead', point )
         }
         if(direction == "Left"){
            let y = this.getSnakeHead[0]
            let x = this.getSnakeHead[1]--
            let point = [y,x]
            this.$store.dispatch('setNextSnakeHead', point )
         }
         if(direction == "Up"){
            let y = this.getSnakeHead[0]--
            let x = this.getSnakeHead[1]
            let point = [y,x]
            this.$store.dispatch('setNextSnakeHead', point )
         }
         if(direction == "Down"){
            let y = this.getSnakeHead[0]++
            let x = this.getSnakeHead[1]
            let point = [y,x]
            this.$store.dispatch('setNextSnakeHead', point )
         }

      },
      isSnakeCrash(){
         let nextHead = this.getNextSnakeHead
         let snake = this.getSnake
         snake.forEach(array => {
            if(this.arePointsEqual([array[0],array[1]] , [nextHead[0],nextHead[1]] ) == true) {
               this.$store.dispatch('setGameState', 3)
            }
         });
      },
      isSnakeOutOfMap(){
         if(this.getSnakeNextHead[0] < 0) {
            this.$store.dispatch('setGameState', 3)
         } 
         if(this.getSnakeNextHead[0] > 19) {
            this.$store.dispatch('setGameState', 3)
         } 
         if(this.getSnakeNextHead[1] < 0) {
            this.$store.dispatch('setGameState', 3)
         } 
         if(this.getSnakeNextHead[1] > 19) {
            this.$store.dispatch('setGameState', 3)
         } 
      },
      ifSnakeIfOnFood(){
         if(this.getNextSnakeHead == this.getFood){
            false
         } else {
            true
         }
      },
      moveSnakeHead(){
         this.$store.dispatch('moveSnakeHead')
      },
      cutSnakeTail(){
         this.$store.dispatch('cutSnakeTail')
      },
      regenerateFood() {
         let food = this.randomize()
         if(ifPartOfSnake(food) == true) {
            return this.regenerateFood() // почему возвращается метод а не food??
         }
         this.$store.dispatch('setFood',food)
      },
      loop() {
         this.calculateSnakeNextHead()
         this.isSnakeCrash()
         this.isSnakeOutOfMap()
         if(this.ifSnakeIfOnFood() == true){
            this.moveSnakeHead()
            this.regenerateFood()
         } else {
            this.moveSnakeHead()
            this.cutSnakeTail()
         }
      },
      startGame() {
         this.$store.dispatch('clearMap')
         this.$store.dispatch('initSnake')
         this.$store.dispatch('initFood')
         setTimeout(() => {
            this.loop()
         }, 4000);
      }
   }
}
</script>

<style>
body {
   background-color: rgb(0, 0, 0);
}
.game {
   width: 100%;
   height: 100%;
}
.btn {
   height: 300px;
   width: 300px;
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