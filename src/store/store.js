import Vue from "vue";
import Vuex from "vuex";
import * as constants from "../constants/constants.js"

Vue.use(Vuex);

export default new Vuex.Store({
   state:{
      gameStatus:1,
      lastPressedKey:"ArrowRight",
      snake:[[0,0],[0,1],[0,2]],
      food:[0,6],
      snakeDirection:"Right",
      snakeNewDirection:null,
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
         return state.snake[state.snake.length-1]
      },
      getNextSnakeHead(state) {
         return state.nextSnakeHead
      },
      getNewSnakeDirection(state){
         return state.snakeNewDirection
      }
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
      setLastPressedKey({commit}, pressedKey){
         commit('setLastPressedKey', pressedKey)
      },
      setNewSnakeDirection({commit}, newDirection) {
         commit('setNewSnakeDirection', newDirection)
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
         for(let i = 0 ; i < 20; i ++){
            state.mapState.push(Array(20).fill(0))
         }
      },
      setNextSnakeHead(state,point){
         state.nextSnakeHead = point
         state.snakeNewDirection = null
      },
      moveSnakeHead(state){
         let nextHead = state.nextSnakeHead
         let y = nextHead[0]
         let x = nextHead[1]
         state.snake.push(nextHead)
         state.mapState[y][x] = 1
         state.nextSnakeHead = null
      },
      cutSnakeTail(state) {
         let tail = state.snake[0]
         state.mapState[tail[0]].splice(tail[1],1,0)
         state.snake.shift()
      },
      setFood(state,food) {
         state.food = food
         state.mapState[state.food[0]].splice(state.food[1],1,2)
      },
      setNewSnakeDirection(state, newDirection){
         state.snakeNewDirection = newDirection
      },
      setLastPressedKey(state, pressedKey) {
         state.lastPressedKey = pressedKey
         if(pressedKey == "ArrowRight"){
            if(state.snakeDirection == constants.DIRECTION_LEFT && pressedKey == "ArrowRight") {
               state.snakeNewDirection = null
               return state.snakeNewDirection 
            }
            state.snakeDirection = constants.DIRECTION_RIGHT
         }
         if(pressedKey == "ArrowLeft"){
            if(state.snakeDirection == constants.DIRECTION_RIGHT && pressedKey == "ArrowLeft") {
               state.snakeNewDirection = null
               return state.snakeNewDirection 
            }
            state.snakeDirection = constants.DIRECTION_LEFT
         }
         if(pressedKey == "ArrowUp"){
            if(state.snakeDirection == constants.DIRECTION_DOWN && pressedKey == "ArrowUp") {
               state.snakeNewDirection = null
               return state.snakeNewDirection 
            }
            state.snakeDirection = constants.DIRECTION_UP
         }
         if(pressedKey == "ArrowDown"){
            if(state.snakeDirection == constants.DIRECTION_UP && pressedKey == "ArrowDown") {
               state.snakeNewDirection = null
               return state.snakeNewDirection 
            }
            state.snakeDirection = constants.DIRECTION_DOWN
         }
      }
   }
});