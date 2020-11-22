<template>
  <div class="cool-radio-group">
    <slot v-if="hasCurrentData"></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  provide,
  VNodeArrayChildren,
  Ref
} from 'vue'
import { RadioProps, SelectCallbackFn, SelectedLabel } from '@/typings/IRadio'
import { VnodePro } from '@/typings/ISelect'

export default defineComponent({
  name: 'cool-radio-group',
  setup(props, ctx) {
    const data = reactive<SelectedLabel[]>([])
    const selected = ref<SelectedLabel>('')
    const hasCurrentData = ref(false)

    /** 初始化插槽内容 */
    const initSlot = () => {
      if (!ctx.slots.default || ctx.slots.default().length > 1) return false
      const slot = ctx.slots.default()[0].children as VNodeArrayChildren
      data.length = 0
      return slot.every(item => {
        const vnode = item as VnodePro
        // 插槽内只允许 radio 组件存在
        if (vnode.type.name !== 'cool-radio') return false
        const childProps = vnode.props as RadioProps
        data.push(childProps.label)
      })
    }

    /**
     * 选择回调
     * @param target 选择的目标——子组件的返回
     */
    const selectCallback = (target: SelectedLabel) => {
      ctx.emit('update:modelValue', target)
      selected.value = target
    }

    provide<Ref<SelectedLabel>>('selected', selected)
    provide<SelectCallbackFn>('selectCallback', selectCallback)
    onMounted(() => {
      hasCurrentData.value = initSlot()
    })

    return { hasCurrentData }
  },
  props: {
    modelValue: { type: String, required: true }
  }
})
</script>
