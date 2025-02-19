<template>
  <div id="app">
    <Home />  </div>
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