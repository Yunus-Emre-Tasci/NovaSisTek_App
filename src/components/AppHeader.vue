<template>
  <div class="appHeader dark-mode">
    <div class="logo" @click="goToHome">NovaSisTek</div>
    <div class="box" @click="toggleShopContext">
      <div class="badge" v-if="basketsLength !== 0">{{ basketsLength }}</div>
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"
        stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
        
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <!-- <ShopContext v-show="show" @goBasket="hideShopContext" /> -->
    </div>
    <div class="toggleTheme">
      <!-- <button type="button"
      @click="toggleDarkMode"
      :class="{
        'dark-mode': darkMode,
      }">

      </button> -->
      <nav class="fixed flex justify-end p-2 top-8 right-2">
  <button
    type="button"
    title="Toggle dark/light mode"
    @click="toggleDarkMode"
    class="flex items-center p-3 mr-2 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
  >
  <span v-if="darkMode">
    <svg
      aria-hidden="true"
      icon="moon"
      class="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
    </span>
    <span v-else>
    <svg
      aria-hidden="true"
      icon="sun"
      class="w-4 h-4"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
    </span>
  </button>
</nav>

    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
// import ShopContext from './ShopContext.vue';

export default {
  name: 'AppHeader',
  props: {
    darkMode: Boolean,
    toggleDarkMode: Function,
  },
//   components: { ShopContext },
  setup() {
    const router = useRouter();
    const store = useStore();
    const show = ref(false);

    const basketsLength = computed(() => {
      return store.getters.getBasketsLength;
    });

    const toggleShopContext = () => {
      if (basketsLength.value !== 0) {
        show.value = !show.value;
      }
    };

    const hideShopContext = () => {
      show.value = false;
    };

    const goToHome = () => {
      router.push('/');
    };

    return {
      show,
      basketsLength,
      toggleShopContext,
      hideShopContext,
      goToHome,
    };
  },
};
</script>

<style scoped lang="scss">
.dark-mode {
  background-color: #333;
  color: #fff;
}
.appHeader {
  background: #fff;
  border-bottom: 1px solid #eff1f3;
  padding-left: 64px;
  padding-right: 64px;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: #fff;
    border-radius: 100%;
    background-color: #1874ff;
    font-size: 10px;
    top: -8px;
    right: -8px;
    position: absolute;
  }

  .box {
    position: relative;
    cursor: pointer;
    color: #374051;
    transition: all 0.5s;

    &:hover {
      color: #1874ff;
    }
  }

  .logo {
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 6px;
  }
}
nav {
  position: fixed;
  display: flex;
  justify-content: flex-end;
  padding: 2px;
  top: 8px;
  right: 2px;

  button {
    display: flex;
    align-items: center;
    padding: 3px;
    margin-right: 2px;
    font-size: 12px;
    font-weight: 500;
    color: #4b5563;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    transition: background-color 0.2s, color 0.2s;
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: #edf2f7;
      color: #1e40af;
    }

    &:focus {
      z-index: 10;
      outline: 2px solid transparent;
      outline-offset: 2px;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }

    &:focus svg {
      stroke: #1e40af;
    }

    /* &[data-testid="togglebutton"] {
      &[title="Toggle dark/light mode"] {
        // Özel stillemeler buraya eklenebilir
      }
    } */
  }

  svg[aria-hidden="true"] {
    width: 16px;
    height: 16px;
    fill: currentColor;
    color: #4b5563;
  }
}

</style>
