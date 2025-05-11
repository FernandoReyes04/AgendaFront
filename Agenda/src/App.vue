<template>
  <div id="app">
    <Home />  
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Home from './components/Home.vue';

export default defineComponent({
  name: 'App',
  components: {
    Home
  }
});
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  font-family: var(--app-font-primary, 'Roboto', sans-serif);
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>