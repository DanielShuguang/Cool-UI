<template>
  <div :class="['cool-input', { disabled }]">
    <input
      :class="['cool-input_inner', { disabled }]"
      :value="value"
      :readonly="readOnly"
      :placeholder="placeholder"
      :disabled="disabled"
      @change="changeInput"
    />
    <span v-show="showIcon" class="icon-box" v-html="iconHtml"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'cool-input',
  setup(props, ctx) {
    /**
     * 更改输入框内容
     * @param value 输入的数据
     */
    const changeInput = (ev: InputEvent) => {
      const target = ev.target as HTMLInputElement
      const value = target.value
      ctx.emit('update:value', value)
    }
    return { changeInput }
  },
  props: {
    // 输入框内容
    value: { type: String, required: true },
    // 是否展示图标
    showIcon: { type: Boolean, default: false },
    placeholder: { type: String, required: false },
    // 图标内容
    iconHtml: { type: String, required: false },
    // 是否只读
    readOnly: { type: Boolean, default: false },
    // 是否禁用
    disabled: { type: Boolean, default: false }
  }
})
</script>
