<template>
   <div id="app">
      <Login/>
      <!-- <div id="nav">
         <router-link to="/">Home</router-link> |
         <router-link to="/about">About</router-link>
      </div>
      <router-view/> -->
   </div>
</template>


<script>
import Login from './views/Login.vue'

export default {
   name: 'App',
   components: {
      Login
   }
}
</script>

<style>
#app {
   font-family: montserrat, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;

   display: flex;
   align-items: center;
   justify-content: center;

   margin: 0;
   padding: 0;
   height: 100vh;
   overflow: hidden;
   box-sizing: border-box;
   

   background-color: rgb(224, 225, 225);
   color: #343b41;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
