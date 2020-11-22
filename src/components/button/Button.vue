<template>
  <button
    :class="['cool-btn', type, { round }]"
    @click="handleClick"
    :disabled="btnDisabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { BtnType } from '@/typings/IButton'

export default defineComponent({
  name: 'CoolButton',
  props: {
    // 按钮类型
    type: {
      type: String as PropType<BtnType>,
      default: 'default'
    },
    // 是否是圆角按钮
    round: {
      type: Boolean,
      default: false
    },
    // 禁用时间
    restTime: {
      type: [Number, String],
      default: 1500
    }
  },
  setup(props) {
    const btnDisabled = ref(false)

    /** 点击之后按钮禁用设定时间 */
    const handleClick = () => {
      btnDisabled.value = true
      const time =
        typeof props.restTime === 'number'
          ? props.restTime
          : parseInt(props.restTime)
      setTimeout(() => {
        btnDisabled.value = false
      }, time)
    }

    return { btnDisabled, handleClick }
  }
})
</script>
