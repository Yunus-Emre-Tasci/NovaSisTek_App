<template>
  <div :class="isDarkMode ? 'dark-mode' : ''" class="scrollToTop" v-if="visible"
      @click="scrollToTop">
      <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
  </div>
</template>

<script>
import { ref, onMounted, computed  } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ScrollToTop',
  setup() {
    const visible = ref(false);
    const store = useStore();

    const isDarkMode = computed(() => {
      return store.state.darkMode;
    });

    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      visible.value = scrolled > 200;
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    onMounted(() => {
      window.addEventListener('scroll', toggleVisible);
    });

    return {
      visible,
      scrollToTop,
      isDarkMode,
    };
  },
};
</script>

<style scoped lang="scss">
  .scrollToTop{
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 60px;
    width: 40px;
    height: 40px;
    left: 93vw;
    border:0.5px solid rgba(51, 51, 51, 0.9);
    background-color: rgba(51, 51, 51, 0.9);
    border-radius: 100%;
    z-index: 10;
    cursor: pointer;
    color: white;
    .arrow{
        z-index: 20;
    }

    &:hover{
        color: red;
    }
  }

  .dark-mode{
    background-color:white;
    color:rgba(51, 51, 51, 0.9);
  }
</style>
