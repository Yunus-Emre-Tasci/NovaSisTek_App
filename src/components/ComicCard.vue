<template>
  <div class="card">
    <img class="thumbnail" :src="`${item.thumbnail.path}.jpg`" alt="">
    <div @click="onClickBox" :class="item.inBox?'boxActive':''" class="like"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" :fill="item.inBox ? '#1874ff' : 'none'"
        stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
        
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg></div>

   <div @click="goToDetail" class="content">
    <div class="title">
      <div v-if="item.title"><h3 >{{item.title}}</h3></div>
    <div v-else><h3>Title</h3></div>
    </div>
    <div class="description">
      <div v-if="item.description">{{ item.description }}</div>
      <div v-else>Marvel</div>
    </div>
    <div class="creators">
      <span><h4>Creators:</h4> </span>
       <div v-if="item.creators && item.creators.items.length > 0">
         <div class="creator">
          <div v-for="creator in item.creators.items" :key="creator.id">
             {{ creator.name }},
          </div>
        </div>
      </div>
      <div v-else>
        Marvel
      </div>
    </div>
   </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { toRefs } from 'vue';

export default {
  props: ['item'],
  name: 'ComicCard',
  setup(props,{ emit }){
    const { item } = toRefs(props);
    console.log(item.value);
    const router = useRouter();

    const onClickBox = () => {
      emit('onClickBox', props.item);
    };

    const goToDetail = () => {
      router.push({ path: '/detail', query: { itemId: item.value.id } });
    };

    return {
      goToDetail,
      onClickBox,
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