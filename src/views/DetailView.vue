<template>
  <div class="detail">
    <img v-if="image" :src="`${image}.jpg`" :alt="details.title"/>
    <img v-else src="https://cdn.marvel.com/u/prod/marvel/i/mg/b/40/image_not_available/clean.jpg" :alt="details.title"/>
    <div class="content">
      <div class="title"><h2>{{ details.title }}</h2></div>
      <div class="text" >
        <div v-if="text"><div><p>{{ text }}</p></div></div>
        <div v-else>MARVEL TEXTS</div>
      </div>
      <div class="creators">
        <h4>CREATORS</h4>
        <div class="creator" v-if="creators.length>0"><div v-for="creator in creators" :key="creator.id"><li>{{ creator }}</li></div></div>
        <div class="creator" v-else><li>Marvel Heros</li></div>
      </div>
      <div class="characters">
        <h4>CHARACTERS</h4>
        <div class="character" v-if="characters.length>0"><div v-for="character in characters" :key="character.id"><li>{{ character }}</li></div></div>
        <div class="character" v-else><li>Marvel Heros</li></div>
      </div>
      <div class="moreDetail"><a :href="url" target="_blank">More Detail ⇲</a></div>
    </div>

    
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
    const url=ref("");
    const creators=ref([]);
    const characters=ref([]);
    const text=ref("")
    const image=ref("")
    

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
        text.value=data.data.results[0].textObjects[0].text
        image.value=data.data.results[0].images[0].path
        console.log(url.value);
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
      text,
      image,
    };
  },
};
</script>

<style scoped lang="scss">
.detail{
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 15px;

  img{
    min-width: 40%;
    height:550px ;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.6);
    /* img{
      width: 100%;
      height: auto;
    } */
  }
  .content{
    padding: 20px;
    min-height: 100vh;
    .title{
      text-align: center;
      h2{
        font-size: 25px;
        font-weight: 700px;
        @media (max-width: 768px) {
        font-size: 16px;
       }
      }
    }
    .text{
      margin-top:10px;
      p{
        letter-spacing: 2px;
        @media (max-width: 768px) {
        font-size: 12px;
       }
      }
    }
    .creators{
      margin-top: 10px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
      @media (max-width: 768px) {
        font-size: 14px;
       }
      h4{
        border-bottom: 1px solid red;
      }
      .creator{
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        li{
        margin-top:5px;
        list-style-type: none;
        color: #fff;
        outline: none;
        border: none;
        font-weight: 600;
        border-radius: 0.2vw;
        background-color: rgba(51,51, 51, 0.5);
        padding: 3px 6px;
        transition: all 0.3s easy;

        &:hover{
          background-color: white;
          color:black
        }
      }
      }
    }
    .characters{
      margin-top: 10px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
      @media (max-width: 768px) {
        font-size: 14px;
       }
      h4{
        border-bottom: 1px solid red;
      }
      .character{
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        li{
        margin-top:5px;
        list-style-type: none;
        color: #fff;
        outline: none;
        border: none;
        font-weight: 600;
        border-radius: 0.2vw;
        background-color: rgba(51,51, 51, 0.5);
        padding: 3px 6px;
        transition: all 0.3s easy;

        &:hover{
          background-color: white;
          color:black
        }
      }
      }
    }
    .moreDetail{
        margin-top: 20px;
        padding-top:10px;
        text-align: center;
        a{
          padding: 8px 20px;
          text-decoration: none;
          color: rgba(255, 0, 0, 0.781); 
          outline: none;
          border: none;
          font-size:18px;
          font-weight: 700;
          border-radius: 0.2vw;
          background-color: rgba(51,51,   51, 0.5);
          transition: all 0.5s easy;
  
          &:hover{
            background-color: rgba(255, 0, 0, 0.781);
            color:black;
          }
      }
      }
  }
}
</style>

