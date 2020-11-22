import { shallowMount } from '@vue/test-utils'
import MyInput from '../Input.vue'

describe('Input.vue', () => {
  it('测试输入框基本输入功能', async () => {
    const wrapper = shallowMount(MyInput, { props: { modelValue: 'hello' } })
    const value = 'world'
    wrapper.vm.$emit('update:modelValue', value)
    await wrapper.vm.$nextTick()
    const input = wrapper.find('input')
    console.log(input.text())
    expect(input.text()).toBe(value)
  })
})
