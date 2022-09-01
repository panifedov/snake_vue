<template>
	<div class="gameover" @click="this.restart">
		<h1>GAME OVER</h1>
      <div class="gameover-key">
         <h2>press Any Key to return on main screen</h2>
      </div>
      <div class="labale">
      <h4>GitHub</h4>
      </div>
	</div>
</template>
<script>
export default {
	created() {
		document.addEventListener("keydown", () => this.restart());
	},
	methods: {
		restart() {
			location.reload();
		},
	},
};
</script>
<style>
.gameover {
   font-family: 'Silkscreen', cursive;
	position: absolute;
	z-index: 1;
	top: 20%;
	width: 100%;
	text-align: center;
	cursor: pointer;
}
.gameover-key {
   margin-top: 5% ;
   color: aliceblue;
   font-family: 'Silkscreen', cursive;
}
.labale {
   text-align: center;
   margin-top: 15%;
   font-family: 'Indie Flower', cursive;
}
</style>