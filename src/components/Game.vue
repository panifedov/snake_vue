<template>
<div class="game">
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
    name: "GameVue",
    created() {
      this.startGame()
    },
    mounted() {
        document.addEventListener("keydown", (event) => this.setLastPressedKey(event));
        document.addEventListener("keyup", (event) => this.setLastPressedKey(event));
    },
    computed: {
        mapState() {
            return this.$store.getters['mapState']
        },
        snake() {
            return this.$store.getters['getSnake']
        },
        getFood() {
            return this.$store.getters['getFood']
        },
        snakeDirection() {
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
            if (block > 0) {
                if (block === 1) {
                    return 'green'
                }
                if (block === 2) {
                    return 'red'
                } else {
                    return 'black'
                }
            }
        },
        //                                                             HELP METHODS
        randomize() {
            let y = Math.floor(Math.random() * (19 - 1) + 1)
            let x = Math.floor(Math.random() * (19 - 1) + 1)
            return [y, x]
        },
        arePointsEqual([y1, x1], [y2, x2]) {
            return y1 === y2 && x1 === x2
        },
        ifPartOfSnake([y, x]) {
            let snake = this.snake
            snake.forEach(array => {
                if (this.arePointsEqual([array[0], array[1]], [y, x]) == false) {
                    return true
                } else {
                    return false
                }
            });
        },
        //                                                                MAIN METHODS 
        setLastPressedKey(event){
         let direction 
         if (event.key === "ArrowLeft") {
            direction = "Left"
            this.$store.dispatch('setLastPressedKey', direction)
         }
         if (event.key === "ArrowRight") {
            direction = "Right"
            this.$store.dispatch('setLastPressedKey', direction)
         }
         if (event.key === "ArrowUp") {
            direction = "Up"
            this.$store.dispatch('setLastPressedKey', direction)
         }
         if (event.key === "ArrowDown") {
            direction = "Down"
            this.$store.dispatch('setLastPressedKey', direction)
         }
        },
        calculateSnakeNextHead() {
            const direction = this.snakeDirection
            this.getSnakeHead
            this.getSnakeDirection
            if (direction == "Right" && direction !== "Left") {
                let y = this.getSnakeHead[0]
                let x = this.getSnakeHead[1]
                let newX
                newX = x + 1
                let point = [y, newX]
                this.$store.dispatch('setNextSnakeHead', point)
            }
            if (direction == "Left" && direction !== "Right") {
                let y = this.getSnakeHead[0]
                let x = this.getSnakeHead[1]
                let newX
                newX = x - 1
                let point = [y, newX]
                this.$store.dispatch('setNextSnakeHead', point)
            }
            if (direction == "Up" && direction !=="Down") {
                let y = this.getSnakeHead[0]
                let x = this.getSnakeHead[1]
                let newY
                newY = y - 1
                let point = [newY, x]
                this.$store.dispatch('setNextSnakeHead', point)
            }
            if (direction == "Down" && direction !=="Up") {
                let y = this.getSnakeHead[0]
                let x = this.getSnakeHead[1]
                let newY
                newY = y + 1
                let point = [newY, x]
                this.$store.dispatch('setNextSnakeHead', point)
            }
        },
        isSnakeCrash() {
            let nextHead = this.getNextSnakeHead
            let snake = this.snake
            snake.forEach(array => {
                if (this.arePointsEqual([array[0], array[1]], [nextHead[0], nextHead[1]]) == true) {
                    this.$store.dispatch('setGameState', 2)
                }
            });
        },
        isSnakeOutOfMap() {
            let x = this.getNextSnakeHead[1]
            let y = this.getNextSnakeHead[0]
            if (y < 0) {
                this.$store.dispatch('setGameState', 2)
            }
            if (y > 19) {
                this.$store.dispatch('setGameState', 2)
            }
            if (x < 0) {
                this.$store.dispatch('setGameState', 2)
            }
            if (x > 19) {
                this.$store.dispatch('setGameState', 2)
            }
        },
        isSnakeIfOnFood() {
            let headY = this.getNextSnakeHead[0]
            let headX = this.getNextSnakeHead[1]
            let foodY = this.getFood[0]
            let foodX = this.getFood[1]
            
            if (headX == foodX && headY == foodY) {
               return true
            } else {
               return false
            }
        },
        moveSnakeHead() {
            this.$store.dispatch('moveSnakeHead')
        },
        cutSnakeTail() {
            this.$store.dispatch('cutSnakeTail')
        },
        regenerateFood() {
            let food = this.randomize()
            console.log(food);
            if (this.ifPartOfSnake(food) == true) {
                return this.regenerateFood()
            }
            console.log(food);
            this.$store.dispatch('setFood', food)
        },
         loop() {
           this.calculateSnakeNextHead()
           this.isSnakeCrash()
           this.isSnakeOutOfMap()
            if(this.isSnakeIfOnFood() === true){
               this.moveSnakeHead()
               this.regenerateFood()
            } else {
              this.moveSnakeHead()
              this.cutSnakeTail()
            }
          setTimeout(() => {
             this.loop()
            }, 400);
         },
        startGame() {
            this.$store.dispatch('clearMap')
            this.$store.dispatch('initSnake')
            this.$store.dispatch('initFood')
            setTimeout(() => {
             this.loop()
            }, 1000);
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