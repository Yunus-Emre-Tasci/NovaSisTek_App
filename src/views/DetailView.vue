<template>
  <div>
    Detay Sayfası
    <div>{{ itemId }}</div>
    <div>{{ details.title }}</div>
    <div>
      <div v-if="details.description"><div>{{ details.description }}</div></div>
      <div v-else>MARVEL</div>
    </div>
    <div>
      <div v-if="creators.length>0"><div v-for="creator in creators" :key="creator.id">{{ creator }}</div></div>
      <div v-else>Marvel</div>
    </div>
    <div>
      <div v-if="characters.length>0"><div v-for="character in characters" :key="character.id">{{ character }}</div></div>
      <div v-else>Marvel</div>
    </div>
    <div>{{ url }}</div>

    
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
    const details = ref([]);
    const url=ref(null);
    const creators=ref([]);
    const characters=ref([]);
    

    const apiKey = process.env.VUE_APP_API_KEY;
    const hash = process.env.VUE_APP_HASH;
    const baseUrl=process.env.VUE_APP_BASE_URL

    onMounted(() => {
      itemId.value = router.currentRoute.value.query.itemId;
      fetchDetail(itemId.value)
    });

    const fetchDetail = async (id) => {
      try {
        const {data} = await axios.get(
          `${baseUrl}/${id}`,
          {
            params: {
              ts: 1,
              apikey: apiKey,
              hash: hash,
            },
          }
        );
        console.log(data.data.results[0]);
        details.value = data.data.results[0];
        url.value=data.data.results[0].urls[0].url
        creators.value=data.data.results[0].creators.items.map((item)=>item.name)
        characters.value=data.data.results[0].characters.items.map((item)=>item.name)
      } catch (error) {
        console.error(error);
      }
    };

    return {
      itemId,
      details,
      url,
      creators,
      characters,
    };
  },
};
</script>

<style>
</style>

