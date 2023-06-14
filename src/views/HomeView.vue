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
// @ is an alias to /src
import { ref,onMounted } from 'vue';
import ComicCard from '@/components/ComicCard.vue'

export default {
  name: 'HomeView',
  components: {
    ComicCard
  },
  setup(){
    const comics = ref([]);

    const getAllComics = () => {
      fetch('https://gateway.marvel.com/v1/public/comics?ts=1&limit=20&apikey=52ae5ab647eca4d395566c57ad8e7a93&hash=768e97c70447bfec05829a99930774dd')
        .then((res) => res.json())
        .then((json) => {
          console.log(json.data.results);
          comics.value=json.data.results
        });
    };

    onMounted(() => {
      getAllComics();
    });

    return {
      comics
    };
  }
}
</script>
