/**
 * 是否是对象
 * @param target
 */
export const isObject = <T>(target: T) => {
  return typeof target === 'object' && !Array.isArray(target)
}

/**
 * 类型判空
 * @param target
 */
export const isNull = <T>(target: T) => {
  return target === undefined || target === null
}

/**
 * 对象遍历
 * @param obj 需要遍历的对象
 * @param callBack 遍历回调
 * @returns value 数组
 */
export const objectIterator = <T>(
  obj: Record<string, T>,
  callBack: (val: T) => void
) => {
  const valArr = Object.keys(obj).map(key => {
    callBack(obj[key])
    return obj[key]
  })
  return valArr
}
