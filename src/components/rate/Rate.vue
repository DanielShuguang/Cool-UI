<template>
  <div
    class="cool-rate"
    role="slider"
    aria-valuemin="0"
    :aria-valuemax="+max"
    tabindex="0"
    :aria-valuenow="activeVal"
    :aria-valuetext="texts[activeVal]"
  >
    <span
      v-for="num in +max"
      @mouseenter="mouseMove(num)"
      @mouseleave="mouseMove(num, 'leave')"
      @click="selectRate(num)"
      :key="num"
      class="cool-rate__item"
    >
      <i
        class="fa cool-rate__icon"
        :class="[
          activeVal >= num || selectedVal >= num ? 'fa-star' : 'fa-star-o',
          { active: activeVal >= num || selectedVal >= num },
          { hover: activeVal === num }
        ]"
        aria-hidden="true"
      ></i>
    </span>
    <span v-if="showText" class="cool-rate__text">
      {{ texts[(activeVal || selectedVal) - 1] }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'cool-rate',
  props: {
    value: Number,
    showText: Boolean,
    max: { type: [String, Number], default: 5 },
    disabled: { type: Boolean, default: false },
    allowHalf: { type: Boolean, default: false },
    texts: {
      type: Array as PropType<string[]>,
      default: () => ['极差', '失望', '一般', '满意', '惊喜']
    }
  },
  setup(props, { emit }) {
    const activeVal = ref(0)
    const selectedVal = ref(0)

    /**
     * 鼠标移动到目标上
     * @param target hover 的目标
     */
    const mouseMove = (target: number, action = 'on') => {
      activeVal.value = action === 'on' ? target : 0
    }
    /**
     * 选择评分
     * @param target
     */
    const selectRate = (target: number) => {
      selectedVal.value = target
      emit('update:value', target)
    }

    return { activeVal, selectedVal, mouseMove, selectRate }
  }
})
</script>
