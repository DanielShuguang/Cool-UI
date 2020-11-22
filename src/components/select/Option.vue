<template>
  <li
    :class="[
      'cool-select-dropdown__item',
      { disabled },
      { active: hitState },
      { hover }
    ]"
    @mouseenter="hoverItem(true)"
    @mouseleave="hoverItem(false)"
    @click="selectOptionClick"
  >
    <slot>
      <span>{{ label }}</span>
    </slot>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref, inject, computed } from 'vue'
import { SelectOptionFn, OptionProps } from '@/typings/ISelect'

export default defineComponent({
  name: 'cool-option',
  setup(props) {
    const groupDisabled = ref(false)
    const visible = ref(true)
    const hover = ref(false)
    const selectOption = inject<SelectOptionFn>('selectOption')
    const selected = inject<OptionProps>('selected', { label: '', value: '' })
    // 当前项跟选中项相等时禁用
    const hitState = computed(() => selected.value === props.value)

    /** 返回当前点击的目标信息 */
    const selectOptionClick = () => {
      if (hitState.value || props.disabled) return
      const selected = {
        label: props.label ?? props.value,
        value: props.value
      }
      selectOption && selectOption(selected)
    }
    const hoverItem = (type: boolean) => {
      hover.value = type
    }

    return {
      groupDisabled,
      visible,
      selected,
      hitState,
      hover,
      selectOptionClick,
      hoverItem
    }
  },
  props: {
    value: { type: [String, Number], required: true },
    label: [String, Number],
    created: Boolean,
    disabled: { type: Boolean, default: false }
  }
})
</script>
