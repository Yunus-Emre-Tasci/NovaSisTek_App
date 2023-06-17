<template>
  <div class="contextWrapper">
    <div
      class="contextItem"
      :class="{ borderBottom: (basketsLength - 1) !== i }"
      v-for="(item, i) in baskets"
      :key="item.id"
    >
      <div class="image">
        <img :src="item.image" />
      </div>
      <div class="content">
        <!-- buraya title yazılabilir  -->

        <!-- <div class="title">{{ item.title }}</div>
        <div class="price">{{ item.price }} TL</div> -->
      </div>
    </div>
    <!-- <div class="contextItem complateBox" @click="goBasket">
      Sepete Git !
    </div> -->
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'LikedComics',
  setup() {
    const store = useStore();
    // const baskets = ref([]);   buna gerek yok
    // const basketsLength = ref(0);  buna gerek yok

    const basketsLength = computed(() => {
      return store.getters.getBasketsLength;
    }); 

    const baskets = computed(() => {
      return store.getters.getBaskets;
    }); 
 
    // const goBasket = () => {
    //   this.$router.push('/basket-preview')
    //   this.$emit('goBasket')
    // };

    return {
      baskets,
      basketsLength,
    };
  },
};
</script>

<style scoped lang="scss">
.contextWrapper {
  z-index: 10;
  background-color: #fff;
  position: absolute;
  right: 0;
  padding-top: 8px;
  padding-bottom: 8px;
  filter: drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.15));
  border-radius: 8px;
  max-width: 600px;
  min-width: 250px;
  width: max-content;

  .borderBottom {
    border-bottom: 1px solid #dee2e6;
  }

  .contextItem {
    margin-bottom: 8px;
    display: flex;
    padding-left: 16px;
    padding-right: 16px;

    .image {
      margin-right: 12px;

      > img {
        width: 50px;
        height: 50px;
        object-fit: fill;
      }
    }

    .content {
      font-weight: 500;
      display: flex;
      flex-direction: column;

      .price {
        margin-top: 4px;
        color: #1874ff;
        font-size: 12px;
      }

      .title {
        font-size: 20px;
        font-weight: 600;
        color: #262b37 !important;
      }
    }
  }

  .complateBox {
    border-top: 1px solid #dee2e6;
    align-items: center;
    justify-content: center;
    padding-bottom: 16px;
    padding-top: 16px;
    color: #1874ff;
  }
}
</style>

