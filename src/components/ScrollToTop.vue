<template>
  <div :class="isDarkMode ? 'dark-mode' : ''" class="scrollToTop" v-if="visible"
      @click="scrollToTop">
    <div class="" >
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
    </div>
  </div>
</template>

<!-- class="fixed w-100 bottom-20 h-4 left-[91vw] text-5xl z-1 cursor-pointer text-red-600 hover:text-red-400 dark:text-white dark:hover:text-gray-400" -->

<script>
import { ref, onMounted, computed  } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ScrollToTop',
  components: {
    FaArrowCircleUp,
  },
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
    bottom: 20px;
    width: 100%;
    height: 4px;
    left: 91vw;
    font-size: 5xl;
    z-index: 10;
    cursor: pointer;
    color: #dc2626;

    &:hover{
        color: #f87171;
    }
  }

  .dark-mode{
    color:white
  }
</style>
