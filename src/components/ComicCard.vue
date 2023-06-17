<template>
  <div class="home">
    <h2>Comics</h2>
    <div class="flex">
      <ComicCard
        v-on:onClickBox="onClickBox($event)"
        v-for="item in displayedComics"
        :item="item"
        :key="item.id"
      />
    </div>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import ComicCard from '@/components/ComicCard.vue';
import axios from "axios";
import { useStore } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    ComicCard
  },
  setup() {
    const comics = ref([]);
    const store = useStore();
    const baseUrl = process.env.VUE_APP_BASE_URL;
    const hash = process.env.VUE_APP_HASH;
    const apiKey = process.env.VUE_APP_API_KEY;

    const currentPage = ref(1);
    const itemsPerPage = 40;

    const getAllComics = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}`, {
          params: {
            ts: 1,
            limit: itemsPerPage,
            offset: (currentPage.value - 1) * itemsPerPage,
            apikey: apiKey,
            hash: hash,
          }
        });

        comics.value = data.data.results.map((comic) => {
          return {
            ...comic,
            inBox: false,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };

    const onClickBox = (item) => {
      const basketArr = [...store.getters.getBaskets];
      const isExistInBasket = basketArr.find((b) => b.id === item.id);

      if (isExistInBasket) {
        const idx = comics.value.findIndex((i) => i.id === item.id);
        if (idx > -1) {
          comics.value[idx].inBox = false;
        }
        store.dispatch('removeBasket', item);
      } else {
        const idx = comics.value.findIndex((i) => i.id === item.id);
        if (idx > -1) {
          comics.value[idx].inBox = true;
        }
        store.dispatch('addBasket', item);
      }
    };

    const totalPages = computed(() => Math.ceil(comics.value.length / itemsPerPage));
    const displayedComics = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return comics.value.slice(start, end);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    onMounted(() => {
      getAllComics();
    });

    return {
      displayedComics,
      onClickBox,
      currentPage,
      totalPages,
      nextPage,
      prevPage
    };
  }
}
</script>

<style scoped lang="scss">
.card{
  width: 250px;
  height: 300px;
  margin: 10px auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  position: relative;
  box-shadow: 2px 2px 4px rgba(0,0,0,0.6);
  .like{
    position: absolute;
    top:2px;
    right:2px;
    color:rgba(255, 0, 0, 0.815);
    cursor: pointer;
  }
  .boxActive{
    color:#1874ff;
  }
  .thumbnail{
    width: 100%;
    height: 100%;
  }
  .content{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    overflow: hidden;
    max-height: 100%;
    transform: translateY(100%);
    transition: transform 1s ease-in-out;
    width: 100%;
    height: 90%;
    border-radius: 2rem;
    color:white;
    background-color: rgba(51,51, 51, 0.7 );

    .title{
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .description{
      margin-top:8px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .creators{
      margin-top:20px;
      display: flex;
      /* justify-content: center; */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &:hover .content{
    transform: translateY(0%);
  }
}
</style>