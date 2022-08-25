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
      this.initialization()
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
      },
      //Установка еды и змеи в map
      initizalization() {
         this.$store.dispatch('initFood')
         this.$store.dispatch('initSnake')
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
      //HELP METHODS
     // isPartOfSnake() {
         //snake.forEach(element => {
        //    arePointsEqual()
        // });
      //},
      //                                                                MAIN METHODS 
      //Считаем дальнейшую точку головы змеи
      calculateSnakeNextHead() {
         //берём текущую голову змеи  
         //let head = this.snake.slice(-1)
         //увеличиваем на 1 
        // head.forEach(array => {
         //   array[1]++
         //});
         //добавляем его в setnextSnakeHead
         //this.$store.dispatch('setNexSnakeHead', head)
         //добавляем его cut tail
         this.$store.dispatch('cutSnakeTail')
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