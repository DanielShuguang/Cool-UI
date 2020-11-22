import { VNode } from 'vue'

/** 下拉框子组件传参 */
export interface ChildProp {
  'label-field': string
  'value-field': string
  key?: string | number
}

/** 下拉树数据结构 */
export interface OptionProps {
  value: string | number
  label: string | number
}

/** data 参数结构 */
export interface Data {
  label: string | number
  value: string | number
}

/** 封装的 vnode 接口，增加 name 字段 */
export interface VnodePro extends VNode {
  type: {
    name: string
  }
}

/** 选择函数 */
export type SelectOptionFn = (target: OptionProps) => void
