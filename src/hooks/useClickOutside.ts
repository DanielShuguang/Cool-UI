import { onMounted, onUnmounted, ref, Ref } from 'vue'

/**
 * 检测是否点击到指定 dom 元素外的内容
 * @param elementRef
 */
const useClickOutside = (elementRef: Ref<HTMLElement | null>) => {
  const isClickOutside = ref(false)
  const handler = (ev: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(ev.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }

  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  return isClickOutside
}

export default useClickOutside
