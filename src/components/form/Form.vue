<template>
  <form class="cool-form" @submit.prevent="formValidate" :class="[{ inline }]">
    <slot></slot>
    <slot name="submit"></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, provide, PropType } from 'vue'
import { IFormRule } from '@/typings/IForm'
import useFormValid from '@/hooks/useFormValid'

export default defineComponent({
  name: 'cool-form',
  setup(props) {
    /** 表单校验 */
    const formValidate = () => {
      if (!props.rules || !props.model) return true
      const allPassed = Object.keys(props.rules).every(key => {
        if (props.rules && props.model) {
          const passed = useFormValid(
            props.rules[key],
            props.model[key] as string
          )
          return passed
        }
      })
      return allPassed
    }

    provide<string>('labelWidth', props.labelWidth)
    return { formValidate }
  },
  props: {
    // 是否为行内表单
    inline: { type: Boolean, default: false },
    // label 占用宽度
    labelWidth: { type: String, default: '80px' },
    // 校验规则
    rules: Object as PropType<Record<string, IFormRule>>,
    // 表单所需数据
    model: Object as PropType<Record<string, unknown>>
  }
})
</script>
