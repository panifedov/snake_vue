import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
   state:{
      gameStatus:0,
      lastPressedKey:"ArrowRight",
      snake:[[0,0],[0,1],[0,2]],
      food:[],
      snakeDirection:"Right",
      nextSnakeHead:[],
      mapState:[
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      ],
   },
   getters: {
      mapState(state) {
         return state.mapState
      },
      gameStatus(state) {
         return state.gameStatus
      },
      getFood(state) {
         return state.food
      },
      getSnake(state) {
         return state.snake
      },
      getSnakeDirection(state){
         return state.snakeDirection
      }

   },
   actions:{
      setGameState({ commit }, value) {
			commit("setGameState", value);
		},
      setFood({commit}, y,x){
         commit("setFood", (y,x))
      },
   },
   methods: {
   },
   mutations:{
      setGameState(state,value) {
         state.gameStatus = value;
      },
      setFood(state) {
         state.food = [1,2]
         let y = state.food[0]
         let x = state.food[1]
         state.mapState[y].splice(x,1,2)
      }
   }
});