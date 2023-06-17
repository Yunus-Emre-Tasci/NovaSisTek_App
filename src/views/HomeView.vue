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
      
      comics.value = data.data.results.map((comic) => {
        return {
          ...comic,
          inBox: false, // Başlangıç değeri false olarak ayarla
        };
      });
      } catch (error) {
        console.log(error);
      }
    };

    const onClickBox = (item) => {
  const basketArr = [...store.getters.getBaskets];
  console.log(basketArr);
  console.log(store.getters.getBaskets);
  console.log(store.getters.getBasketsLength);
  const isExistInBasket = basketArr.find((b) => b.id === item.id);
  if (isExistInBasket) {
    const idx = comics.value.findIndex((i) => i.id === item.id);
    console.log(idx);
    if (idx > -1) {
      comics.value[idx].inBox = false;
    }
    store.dispatch('removeBasket', item);
  } else {
    const idx = comics.value.findIndex((i) => i.id === item.id);
    console.log(idx);
    if (idx > -1) {
      comics.value[idx].inBox = true;
    }
    store.dispatch('addBasket', item);
  }
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
    margin-top:-18px;
    text-shadow:2px 2px 5px rgba(0, 0, 0, 0.5);
    letter-spacing:4px;
  }
}
   .flex{
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
   }
</style>