import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
   state:{
      gameStatus:0,
      lastPressedKey:"ArrowRight",
      snake:[[0,0],[0,1],[0,2]],
      food:[0,6],
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
      },
      getNextSnakeHead(){
         return state.nextSnakeHead
      },
   },
   actions:{
      setGameState({ commit }, value) {
			commit("setGameState", value);
		},
      initFood({commit}){
         commit('setFood')
      },
      initSnake({commit}) {
         commit('setSnake')
      },
      getSnakeHead({commit}){
         commit('getSnakeHead')
      },
      setNexSnakeHead({commit},head){
         commit('setNexSnakeHead',head)
      },
      cutSnakeTail({commit},) {
         commit('cutSnakeTail')
      },
      moveSnakeHead({commit}) {
         commit('moveSnakeHead')
      }
   },
   methods: {
   },
   mutations:{
      setGameState(state,value) {
         state.gameStatus = value;
      },
      setFood(state) {
         state.mapState[state.food[0]].splice(state.food[1],1,2)
      },
      setSnake(state){
         for(let i = 0 ; i <state.snake.length ; i++){
            let y = state.snake[i][0]
            let x = state.snake[i][1]
            state.mapState[y].splice(x,1,1)
         }
      },
      //getNextSnakeHead(state){
         //state
      //},
      setNexSnakeHead(state,head){
         state.snake.push(head)
         state.nextSnakeHead = head
         for(let i = 0 ; i <state.snake.length ; i++){
            let y = state.snake[i][0]
            let x = state.snake[i][1]
            state.mapState[y].splice(x,1,1)
         }
      },
      cutSnakeTail(state) {
         state.snake.shift()
         for(let i = 0 ; i <state.snake.length ; i++){
            let y = state.snake[i][0]
            let x = state.snake[i][1]
            state.mapState[y].splice(x,1,1)
         }
      },
      //moveSnakeHead(state) {
         //let headSnake = state.snake.slice(-1)
         //не знаю как 
      //},
   }
});