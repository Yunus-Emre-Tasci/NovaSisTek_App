<template>
  <div class="appHeader">
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
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
// import ShopContext from './ShopContext.vue';

export default {
  name: 'AppHeader',
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
</style>
