<template>
  <div id="app">
    <div id="nav">
      <router-link :class="{'router-link-exact-active': $route.path ==='/'}" to="/fraction-calculator">Задание №1</router-link> |
      <router-link to="/comments">Задание №2</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Poiret+One|Material+Icons");
#app {
  font-family: 'Poiret One';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
