<template>
  <label
    :class="[
      'cool-checkbox',
      { 'is-checked': isChecked },
      { 'is-disabled': disabled }
    ]"
  >
    <span class="cool-checkbox__input">
      <span class="cool-checkbox__inner"></span>
      <input
        @click="!disabled ? checkClick() : null"
        type="checkbox"
        aria-hidden="false"
        :value="label"
        class="cool-checkbox__original"
      />
    </span>
    <span class="cool-checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed, inject, Ref, PropType } from 'vue'
import { SelectCallbackFn, SelectType } from '@/typings/ICheckbox'

export default defineComponent({
  name: 'cool-checkbox',
  setup(props, ctx) {
    const selectCallback = inject<SelectCallbackFn>('selectCallback')
    const selected = inject<Ref<SelectType[]>>('selected')
    const isChecked = computed(() => {
      return selected ? selected.value.includes(props.label) : props.value
    })

    /** 点击当前复选框 */
    const checkClick = () => {
      selectCallback
        ? selectCallback(props.label)
        : ctx.emit('update:value', !props.value)
    }

    return { isChecked, checkClick }
  },
  props: {
    value: Boolean,
    disabled: { type: Boolean, default: false },
    label: { type: String as PropType<SelectType>, required: true }
  }
})
</script>
