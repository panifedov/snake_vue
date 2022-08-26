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
      getSnakeHead(state){
         return state.snake.slice(-1)
      },
      getNextSnakeHead(state) {
         return state.nextSnakeHead
      },
   },
   actions:{
      setGameState({ commit }, value) {
			commit("setGameState", value);
		},
      clearMap({commit}){
         commit('clearMap')
      },
      initFood({commit}){
         commit('initFood')
      },
      initSnake({commit}) {
         commit('setSnake')
      },
      setNextSnakeHead({commit}, poin){
         commit('setNextSnakeHead',poin)
      },
      moveSnakeHead({commit}){
         commit('moveSnakeHead')
      },
      cutSnakeTail({commit}){
         commit('cutSnakeTail')
      },
      setFood({commit}, food) {
         commit('setFood',food)
      },
      setLastPressedKey({commit}, item){
         commit('setLastPressedKey', item)
      }
   },
   methods: {
   },
   mutations:{
      setGameState(state,value) {
         state.gameStatus = value;
      },
      initFood(state) {
         state.mapState[state.food[0]].splice(state.food[1],1,2)
      },
      setSnake(state){
         for(let i = 0 ; i <state.snake.length ; i++){
            let y = state.snake[i][0]
            let x = state.snake[i][1]
            state.mapState[y].splice(x,1,1)
         }
      },
      clearMap(state) {
         state.mapState = []
         for(let i = 0 ; i < 21; i ++){
            state.mapState.push(Array(20).fill(0))
         }
      },
      setNextSnakeHead(state,point){
         state.nextSnakeHead = point
      },
      moveSnakeHead(state){
         state.snake.push(state.nextSnakeHead)//добавили в змею
         state.mapState.nextSnakeHead[0].splice(state.nextSnakeHead[1],1,1)//в карту
         state.nextSnakeHead = null//сделали null
      },
      cutSnakeTail(state) {
         let tail = state.snake[0]
         state.mapState[tail[0]].splice(tail[1],1,0)
         state.snake.shift()
      },
      setFood(state,food) {
         state.food = food
      },
      setLastPressedKey(state, item) {
         state.snakeDirection = item
      }
   }
});