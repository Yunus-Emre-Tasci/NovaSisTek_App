<template>
  <div>
    Detay Sayfası
    <div>{{ itemId }}</div>
    <div>{{ characters.fullName }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'DetailView',
  setup() {
    const itemId = ref(null);
    const router=useRouter()
    const characters = ref([]);

    const apiKey = process.env.VUE_APP_API_KEY;
    const hash = process.env.VUE_APP_HASH;
    const baseUrl=process.env.VUE_APP_BASE_URL

    onMounted(() => {
      itemId.value = router.currentRoute.value.query.itemId;
      fetchCharacters()
    });

    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}${itemId.value}/creators`,
          {
            params: {
              ts: 1,
              apikey: apiKey,
              hash: hash,
            },
          }
        );
        console.log(response.data.data.results);
        characters.value = response.data.data.results;
      } catch (error) {
        console.error(error);
      }
    };

    return {
      itemId,
      characters,
    };
  },
};
</script>

<style>
</style>

