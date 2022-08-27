<template>
<div class="game">
   <button class="btn" @click="check()"></button>
   <div class="map">
      <div class="line"
       v-for="line in mapState" 
       :key="line" >
         <div class="block" 
         :style="{'background-color':blockColor(block)}" 
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
      //this.startGame()
      this.$store.dispatch('initSnake')
      this.$store.dispatch('initFood')
   },
   mounted() {
      //document.addEventListener("keydown", (event) => this.keyboardDown(event));
      //document.addEventListener("keyup", (event) => this.keyboardUp(event));
   },
   computed: {
      mapState () {
         return  this.$store.getters[ 'mapState' ]
      },
      snake () {
         return  this.$store.getters[ 'getSnake' ]
      },
      getFood () {
         return  this.$store.getters[ 'getFood' ]
      },
      snakeDirection () {
         return this.$store.getters[ 'getSnakeDirection' ]
      },
      getSnakeHead () {
         return this.$store.getters[ 'getSnakeHead' ]
      },
      getNextSnakeHead () {
         return this.$store.getters[ 'getNextSnakeHead' ]
      }
   },
   methods: {
      //Стилизация блоков
      blockColor ( block ) {
         if( block > 0) {
            if( block === 1){
               return 'green'
            }if( block === 2) {
               return 'red'
            } else {
               return 'black'
            }
         }
      },
      //Тестовая проверка
      check (){
         //let y = this.getSnakeHead[0]
         //let x = this.getSnakeHead[1]
         //let newX 
         //newX = x+1
         //let point = [y,newX]
         //this.$store.dispatch('setNextSnakeHead', point )// кладу в state setNextSnakeHead новую голову
         //this.$store.dispatch('moveSnakeHead')//вызываю метод 
         //this.cutSnakeTail() 
         //this.isSnakeOutOfMap()
         //this.ifSnakeIfOnFood()
         //this.regenerateFood()
         //if(this.ifSnakeIfOnFood() == true){
           // this.regenerateFood()
         //}
         //this.isSnakeCrash()
         ////////////////////////////////////////////////////////////////////////////////////
         //this.calculateSnakeNextHead()
         //this.isSnakeCrash()
         this.isSnakeOutOfMap()
         if(this.ifSnakeIfOnFood() == true){
            this.moveSnakeHead()
            this.regenerateFood()
         } else {
            this.moveSnakeHead()
            this.cutSnakeTail()
         }
      },
      //                                                             HELP METHODS
      randomize () {
         let y = Math.floor( Math.random () * ( 19-1 ) + 1 )
         let x = Math.floor( Math.random () * ( 19-1 ) + 1 )
         return [ y , x ]
      },
      arePointsEqual( [ y1 , x1 ] , [ y2 , x2 ] ) {
         return y1 === y2 && x1 === x2
      },
      ifPartOfSnake( [ y , x ]) {
         let snake = this.snake
         snake.forEach(array => {
            if(this.arePointsEqual( [ array[0] , array[1] ] , [ y , x ] ) == false ){
               return true
            } else {
               return false
            }
         });
      },
      //                                                                MAIN METHODS 
      calculateSnakeNextHead () {
         const direction = this.snakeDirection
         this.getSnakeHead
         this.getSnakeDirection
         if( direction == "Right" ){
            let y = this.getSnakeHead[0]
            let x = this.getSnakeHead[1]
            let newX 
            newX = x+1
            let point = [ y , newX ]
            this.$store.dispatch( 'setNextSnakeHead' , point )
         }
         if( direction == "Left"){
            let y = this.getSnakeHead[0]
            let x = this.getSnakeHead[1]
            let newX 
            newX = x-1
            let point = [ y , newX ]
            this.$store.dispatch( 'setNextSnakeHead' , point )
         }
         if( direction == "Up"){
            let y = this.getSnakeHead[0]
            let x = this.getSnakeHead[1]
            let newY 
            newY = y-1
            let point = [ newY , x ]
            this.$store.dispatch( 'setNextSnakeHead' , point )
         }
         if(direction == "Down"){
            let y = this.getSnakeHead[0]
            let x = this.getSnakeHead[1]
            let newY 
            newY = y+1
            let point = [ newY , x ]
            this.$store.dispatch( 'setNextSnakeHead' , point )
         }
      },
      isSnakeCrash () {
         let nextHead = this.getNextSnakeHead
         let snake = this.snake
         snake.forEach( array => {
            if(this.arePointsEqual( [array[0] , array[1] ] , [ nextHead[0] , nextHead[1] ] ) == true) {
               this.$store.dispatch( 'setGameState' , 2 )
            }
         });
      },
      isSnakeOutOfMap () {
         let x = this.getNextSnakeHead[1]
         let y = this.getNextSnakeHead[0]
         if( y < 0 ) {
            this.$store.dispatch( 'setGameState' , 2 )
         } 
         if( y > 19 ) {
            this.$store.dispatch( 'setGameState' , 2 )
         } 
         if( x < 0 ) {
            this.$store.dispatch( 'setGameState' , 2 )
         } 
         if( x > 19 ) {
            this.$store.dispatch( 'setGameState' , 2 )
         } 
      },
      ifSnakeIfOnFood () {
         let headY = this.getNextSnakeHead[0]
         let headX = this.getNextSnakeHead[1]
         let foodY = this.getFood[0]
         let foodX = this.getFood[1]
         if( headX == foodX && headY == foodY ){
            true
         } else {
            false
         }
      },
      async moveSnakeHead () {
         this.$store.dispatch( 'moveSnakeHead' )
      },
      cutSnakeTail () {
         this.$store.dispatch( 'cutSnakeTail' )
      },
      regenerateFood () {
         let food = this.randomize()
         if( this.ifPartOfSnake(food) == true ) {
            return this.regenerateFood() 
         }
         this.$store.dispatch( 'setFood' , food )
      },
     // loop() {
     //    this.calculateSnakeNextHead()
      //   this.isSnakeCrash()
      //   this.isSnakeOutOfMap()
     //    if(this.ifSnakeIfOnFood() == true){
      //      this.moveSnakeHead()
      //      this.regenerateFood()
       //  } else {
      //      this.moveSnakeHead()
       //     this.cutSnakeTail()
       //  }
     // },
      //startGame() {
        // this.$store.dispatch('clearMap')
        // this.$store.dispatch('initSnake')
        // this.$store.dispatch('initFood')
         //setTimeout(() => {
       //     this.loop()
        // }, 400);
    //  }
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