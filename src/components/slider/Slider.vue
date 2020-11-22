<template>
  <div
    class="cool-slider"
    role="slider"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    :aria-disabled="disabled"
    aria-label="slider between 0 and 100"
  >
    <div ref="barRef" class="cool-slider__runway">
      <div
        class="cool-slider__bar"
        :style="{ width: count + '%', left: '0%' }"
      ></div>
      <div
        class="cool-slider__button-wrapper"
        :class="[{ hover }, { dragging }]"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        @mousedown="changeDragStatus(true)"
        @mousemove="changeCount"
        tabindex="0"
        :style="{ left: count + '%' }"
      >
        <div
          class="cool-tooltip cool-slider__button"
          :class="[{ hover }, { dragging }]"
          aria-describedby="cool-tooltip-400"
          tabindex="0"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'cool-slider',
  setup(props) {
    const hover = ref(false)
    const dragging = ref(false)
    const count = ref(0)
    const barRef = ref<HTMLDivElement>()

    const changeCount = (ev: MouseEvent) => {
      if (!dragging.value) return
      const currentX = ev.clientX
      const diff = (currentX - props.min) / (ev.movementX * 100)
      count.value += diff
    }

    const changeDragStatus = (status: boolean) => {
      dragging.value = status
    }

    onMounted(() => {
      document.addEventListener('mouseup', () => changeDragStatus(false))
    })
    onUnmounted(() => {
      document.removeEventListener('mouseup', () => changeDragStatus(false))
    })

    return { hover, barRef, dragging, count, changeCount, changeDragStatus }
  },
  props: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, defualt: 1 },
    vertical: Boolean,
    disabled: Boolean
  }
})
</script>
