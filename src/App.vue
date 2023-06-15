<!-- <template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template> -->
<template>
  <div :class="{'dark-mode': darkMode}">
  <AppHeader :darkMode="darkMode" :toggleDarkMode="toggleDarkMode" />
  <Container />
  </div>
</template>

<script>
import Container from "./components/Container.vue";
import AppHeader from "./components/AppHeader.vue"
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'App',
  components: {
    AppHeader,
    Container
  },
  setup() {
    const store = useStore();
    // const darkMode = ref(store.state.darkMode);
    const darkMode = computed(() => store.state.darkMode);

    const toggleDarkMode = () => {
      store.commit('toggleDarkMode');
      darkMode.value = !darkMode.value;
    };

    return {
      darkMode,
      toggleDarkMode,
    };
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  font-family: 'Poppins', sans-serif;
}
.dark-mode {
  background-color: #333;
  color: #fff;
}
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
