<template>
  <div class="home">
    <h2>Hello</h2>
    <div class="grid">
    <ComicCard
      
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

export default {
  name: 'HomeView',
  components: {
    ComicCard
  },
  setup(){
    const comics = ref([]);
    
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
      // fetchCreators();
      } catch (error) {
        console.log(error);
      }
    };

  //   const fetchCreators = async () => {
  //     for (let i = 0; i < comics.value.length; i++) {
  //   const comic = comics.value[i];
  //   try {
  //     const response = await axios.get(
  //       `https://gateway.marvel.com/v1/public/comics/${comic.id}/creators`,
  //       {
  //         params: {
  //           ts: 1,
  //           apikey: process.env.VUE_APP_MARVEL_API_KEY,
  //           hash: process.env.VUE_APP_MARVEL_API_HASH
  //         }
  //       }
  //     );
  //     console.log(response);
  //     const creators = response.data.data.results;
  //     comic.creators = creators;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  //   };

    onMounted(() => {
      getAllComics();
    });

    return {
      comics
    };
  }
}
</script>
