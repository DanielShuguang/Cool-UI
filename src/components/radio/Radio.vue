<template>
  <label
    :class="[
      'cool-radio',
      { 'is-checked': isChecked },
      { 'is-disabled': disabled }
    ]"
    role="radio"
    tabindex="0"
    @click="handleCheck"
  >
    <span :class="['cool-radio_input', { 'is-checked': isChecked }]">
      <span class="cool-radio__inner"></span>
      <input
        type="radio"
        tabindex="-1"
        :value="label"
        class="cool-radio__original"
      />
    </span>
    <span class="cool-radio__label">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed, inject, Ref, PropType } from 'vue'
import { SelectCallbackFn, SelectedLabel } from '@/typings/IRadio'

export default defineComponent({
  name: 'cool-radio',
  setup(props, ctx) {
    const selected = inject<Ref<SelectedLabel>>('selected')
    const selectCallback = inject<SelectCallbackFn>('selectCallback')
    const isChecked = computed(() => {
      return selected && selected.value
        ? selected.value === props.label
        : props.value === props.label
    })

    /** 点击勾选当前框 */
    const handleCheck = () => {
      if (props.disabled) return
      selectCallback
        ? selectCallback(props.label)
        : ctx.emit('update:value', props.label)
    }

    return { isChecked, handleCheck }
  },
  props: {
    value: String,
    label: { type: String as PropType<SelectedLabel>, required: true },
    disabled: { type: Boolean, default: false }
  }
})
</script>
