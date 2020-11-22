<template>
  <div class="cool-form-item">
    <label class="cool-form-item__label" :style="{ width }">
      {{ label }}
    </label>
    <div class="cool-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, onMounted } from 'vue'

export default defineComponent({
  name: 'cool-form-item',
  setup(props) {
    const pLabelWidth = inject<string>('labelWidth', '')
    const width = computed(() => {
      return props.labelWidth ?? pLabelWidth
    })

    onMounted(() => {
      if (props.prop) {

      }
    })

    return { width }
  },
  props: {
    label: String,
    labelWidth: String,
    prop: String
  }
})
</script>
