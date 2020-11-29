<template>
  <div class="cool-checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, provide, ref, Ref } from 'vue'
import { SelectCallbackFn, SelectType } from '@/typings/ICheckbox'

export default defineComponent({
  name: 'cool-checkbox-group',
  setup(props, ctx) {
    const selected = ref<SelectType[]>([])

    /**
     * 点击子元素中的复选框
     * @param target 点击的目标内容
     */
    const selectCallback = (target: SelectType) => {
      const tagIndex = selected.value.indexOf(target)
      // 根据复选框状态进行添加或删除
      tagIndex !== -1
        ? selected.value.push(target)
        : selected.value.splice(tagIndex, 1)
      ctx.emit('update:value', selected.value)
    }

    provide<SelectCallbackFn>('selectCallback', selectCallback)
    provide<Ref<SelectType[]>>('selected', selected)
    return {}
  },
  props: {
    value: Array as PropType<SelectType[]>
  }
})
</script>
