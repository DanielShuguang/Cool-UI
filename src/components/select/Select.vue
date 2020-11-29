<template>
  <div class="cool-select" ref="selectRef">
    <div
      :class="['cool-select-input', { active }, { disabled }]"
      @click="showDropdownList"
    >
      <input
        class="cool-select-input_inner"
        :readonly="!editable"
        @focus="inputFocus(true)"
        @blur="inputFocus(false)"
        :placeholder="placeholder"
        v-model.lazy="selected.label"
        @input="input"
        @change="inputChange"
        v-if="!disabled"
      />
      <input
        v-else
        disabled
        class="cool-select-input_inner"
        v-model.lazy="selected.label"
      />
      <i
        :class="['fa fa-caret-down icon', { active: showList }]"
        aria-hidden="true"
      ></i>
    </div>
    <transition name="select">
      <ul
        class="cool-select-dropdown"
        v-if="hasCurrentData && data.length"
        v-show="showList"
      >
        <slot></slot>
      </ul>
      <ul
        v-else-if="!hasCurrentData && !data.length"
        v-show="showList"
        class="cool-select-dropdown"
      >
        <my-option label="无数据" value="无数据" />
      </ul>
      <ul v-else v-show="showList" class="cool-select-dropdown">
        <my-option
          v-for="(item, i) in data"
          :key="i"
          :label="item.label"
          :value="item.value"
          @click="clearDataList"
        />
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  provide,
  nextTick,
  VNodeArrayChildren,
  watch
} from 'vue'
import MyOption from './Option.vue'
import { OptionProps, SelectOptionFn, Data, VnodePro } from '@/typings/ISelect'
import { isObject } from '@/utils/tool'
import useClickOutside from '@/hooks/useClickOutside'

export default defineComponent({
  name: 'cool-select',
  components: { MyOption },
  setup(props, ctx) {
    // 是否展示下拉数据
    const showList = ref(false)
    // 是否有可用的数据
    const hasCurrentData = ref(false)
    const active = ref(false)
    const selectRef = ref<HTMLElement | null>(null)
    const data = reactive<Data[]>([])
    const selected = reactive<OptionProps>({ label: '', value: '' })
    // 输入框计时器
    const inputTimer = ref<number>(0)
    const isClickOutside = useClickOutside(selectRef)
    watch(
      () => isClickOutside.value,
      nVal => {
        if (showList.value && nVal) {
          showList.value = false
        }
      }
    )

    /** 清空 data */
    const clearDataList = () => {
      data.length = 0
    }
    /** 检查插槽内容是否正确 */
    const slotCheck = () => {
      if (!ctx.slots.default || ctx.slots.default().length > 1) return false
      const slot = ctx.slots.default()[0].children as VNodeArrayChildren
      clearDataList()
      return slot.every(item => {
        const vnode = item as VnodePro
        if (vnode.type.name !== 'cool-option') return false
        const childProps = vnode.props as OptionProps
        data.push(childProps)
        return !isObject(childProps.value) && !isObject(childProps.label)
      })
    }
    /** 检查下拉数据是否可用 */
    const dataCheck = () => {
      hasCurrentData.value = false
      if (!ctx.slots.default || ctx.slots.default().length > 1) return
      const slot = ctx.slots.default()[0].children as VNodeArrayChildren
      if (!slot.length) return
      hasCurrentData.value = slotCheck()
    }
    /**
     * 返回选择的下拉选项
     * @param target 目标项
     */
    const selectOption = (target: OptionProps) => {
      selected.value = target.value
      selected.label = target.label
      ctx.emit('update:value', target.value)
      ctx.emit('change', target.value)
      showList.value = false
    }
    /** 显示下拉树 */
    const showDropdownList = () => {
      showList.value = !showList.value
    }
    /**
     * 激活输入框
     * @param status
     */
    const inputFocus = (status: boolean) => {
      active.value = status
      !data.length && slotCheck()
      !status && (showList.value = false)
    }
    /**
     * 手动输入 label 后的情况
     * @param label 输入文本
     */
    const inputChange = (ev: InputEvent | string | number) => {
      if (!slotCheck()) return
      let label: string | number
      if (ev instanceof Event) {
        const target = ev.target as HTMLInputElement
        label = target.value
      } else {
        label = ev
      }
      // 查找匹配的数据
      const result = data.find(
        item => item.label.toString() === label.toString()
      )
      if (result) {
        ctx.emit('update:value', result.value)
        Object.assign(selected, result)
      } else {
        selected.value = ''
        selected.label = ''
        ctx.emit('update:value', '')
      }
    }
    /**
     * 查找输入的内容是否匹配到数据
     * @param text 输入的文本内容
     */
    const checkInputValue = (text: string) => {
      if (!slotCheck()) return
      let result: Data = { label: '', value: '' }
      const arr: Data[] = []
      data.forEach(item => {
        if (item.label.toString().includes(text)) {
          result = item
          arr.push(item)
        }
      })
      if (result.label && arr.length === 1) {
        // 有且只有一条数据匹配
        inputChange(result.label)
        showList.value = false
      } else if (result.label) {
        // 存在多条数据匹配
        showList.value = true
        data.splice(0, data.length, ...arr)
      } else {
        // 无匹配数据
        clearDataList()
        hasCurrentData.value = false
        showList.value = true
      }
    }
    /**
     * 手动输入时进行数据模糊匹配
     * @param ev
     */
    const input = (ev: InputEvent) => {
      // 设置搜索间隔时间，减少查询次数
      inputTimer.value && clearTimeout(inputTimer.value)
      inputTimer.value = setTimeout(() => {
        const target = ev.target as HTMLInputElement
        const text = target.value
        checkInputValue(text)
      }, 500)
    }

    // 向插槽注入选择函数
    provide<SelectOptionFn>('selectOption', selectOption)
    provide<OptionProps>('selected', selected)
    onMounted(() => {
      nextTick(() => {
        dataCheck()
        props.value && inputChange(props.value)
      })
    })

    return {
      showList,
      active,
      data,
      selected,
      hasCurrentData,
      selectOption,
      inputFocus,
      showDropdownList,
      inputChange,
      clearDataList,
      input
    }
  },
  props: {
    placeholder: String,
    value: String,
    // 输入框是否可写
    editable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  }
})
</script>
