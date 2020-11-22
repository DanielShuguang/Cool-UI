import { IFormRule, RuleType } from '@/typings/IForm'
import { isNull } from '@/utils/tool'

const emailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/

export const validator: Record<RuleType, (str: string) => boolean> = {
  required: (data: string) => data.trim() !== '',
  email: (data: string) => emailReg.test(data),
  number: (data: string) => !isNaN(+data) && !isNull(data),
  integer: (data: string) => +data === parseInt(data)
}

const useFormValid = (rule: IFormRule, data: string) => {
  return validator[rule.type](data)
}

export default useFormValid
