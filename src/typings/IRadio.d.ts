export interface RadioProps {
  label: SelectedLabel
}

/** 选项类型 */
export type SelectedLabel =  string | number | boolean

/** 单选组选择函数 */
export type SelectCallbackFn = (target: SelectedLabel) => void
