import { shallowMount } from '@vue/test-utils'
import MyButton from '@/components/button/Button.vue'

describe('Button.vue', () => {
  it('测试按钮样式设置', () => {
    const props = {
      type: 'primary',
      round: true
    }
    const wrapper = shallowMount(MyButton, { props })
    expect(wrapper.classes()).toStrictEqual(['cool-btn', 'primary', 'round'])
  })
})
