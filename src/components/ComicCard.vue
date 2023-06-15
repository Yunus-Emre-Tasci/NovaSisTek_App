<template>
  <div class="card" @click="goToDetail">
    <img class="thumbnail" :src="`${item.thumbnail.path}.jpg`" alt="">

   <div class="content">
    <div class="title">{{item.title}}</div>
    <div class="description">{{ item.description }}</div>
    <div class="creators">
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
  setup(props){
    const { item } = toRefs(props);
    console.log(item.value);
    const router = useRouter();
    const goToDetail = () => {
      router.push({ path: '/detail', query: { itemId: item.value.id } });
    };
    return {
      goToDetail,
    };
  }

}
</script>

<style scoped lang="scss">
.card{
  width: 250px;
  height: 300px;
  margin: 10px auto;
  border: 1px solid red;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 5px;
  cursor: pointer;
  position: relative;

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
    height: 100%;
    border-radius: 2rem;
    background-color: rgba(51,51, 51, 0.7  );
  }
  &:hover .content{
    transform: translateY(0%);
  }
}
   /* .creator{ */
    /* display: flex; */
    /* justify-content: center; */
   /* } */
</style>