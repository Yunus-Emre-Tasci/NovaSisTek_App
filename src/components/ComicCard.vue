<template>
  <div class="card" @click="goToDetail">
  <div class="title">{{item.title}}</div>
  <!-- <div class="description">{{ item.description }}</div> -->
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
</template>

<script>
import { useRouter } from 'vue-router';
import { toRefs } from 'vue';

export default {
  props: ['item'],
  name: 'ComicCard',
  setup(props){
    const { item } = toRefs(props);
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
}
   .creator{
    display: flex;
    justify-content: center;
   }
</style>