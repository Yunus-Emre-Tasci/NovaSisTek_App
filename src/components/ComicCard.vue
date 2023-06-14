<template>
  <div  @click="goToDetail"> {{item.title}} </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  props: ['item'],
  name: 'ComicCard',
  setup(){
    const router = useRouter();
    const goToDetail = () => {
      router.push('/detail');
    };
    return {
      goToDetail,
    };
  }

}
</script>

<style>

</style>