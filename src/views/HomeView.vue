<template>
  <div class="home">
    <h2>Comics</h2>
    <div class="flex">
    <ComicCard
    v-on:onClickBox="onClickBox($event)"
      
      v-for="item in comics"
      :item="item"
      :key="item.id"
    />
  </div>
  </div>
</template>

<script>
import { ref,onMounted } from 'vue';
import ComicCard from '@/components/ComicCard.vue'
import axios from "axios"
import { useStore } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    ComicCard
  },
  setup(){
    const comics = ref([]);
    const store = useStore();
    
    const baseUrl=process.env.VUE_APP_BASE_URL
    const hash = process.env.VUE_APP_HASH;
    const apiKey = process.env.VUE_APP_API_KEY;

    const getAllComics = async() => {
      try {
        const {data}=await axios.get(`${baseUrl}`,{
            params: {
              ts: 1,
              limit: 20,
              apikey: apiKey,
              hash: hash,
            }
          })
      // console.log(data);
      comics.value=data.data.results
      } catch (error) {
        console.log(error);
      }
    };

    const onClickBox = (data) => {
      const basketArr = [...store.getters.getBaskets];
      console.log(basketArr);
      // const isExistInBasket = basketArr?.find((b) => b.id === data.id);
      // if (isExistInBasket) {
      //   const idx = data.value.findIndex((i) => i.id === data.id);
      //   if (idx > -1) {
      //     data.value[idx].inBox = false;
      //   }
      //   store.dispatch('removeBasket', data);
      // } else {
      //   const idx = data.value.findIndex((i) => i.id === data.id);
      //   addBasketService(data);
      //   if (idx > -1) {
      //     data.value[idx].inBox = true;
      //   }
      //   store.dispatch('addBasket', data);
      // }
    };

    onMounted(() => {
      getAllComics();
    });

    return {
      comics,
      onClickBox,
    };
  }
}
</script>

<style scoped lang="scss">
.home{
  h2{
    margin-top:-15px
  }
}
   .flex{
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
   }
</style>
