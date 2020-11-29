<template>
  <div class="app">
    <my-rate showText v-model:value="rate" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import MyRate from '@/components/rate/Rate.vue'

export default defineComponent({
  name: 'App',
  components: {
    MyRate
  },
  setup() {
    const rate = ref(1)
    watch(
      () => rate.value,
      nVal => {
        console.log('rate', nVal)
      }
    )

    return { rate }
  }
})
</script>

<style lang="less">
.app {
  > * {
    margin-right: 20px;
  }
}
</style>
