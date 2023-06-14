<template>
  <div  @click="goToDetail">
  <div class="title">{{item.title}}</div>
  <div class="description">{{ item.description }}</div>
  <div class="creators">
      <div v-for="creator in item.creators" :key="creator.id">
        {{ creator.name }}
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

<style>

</style>