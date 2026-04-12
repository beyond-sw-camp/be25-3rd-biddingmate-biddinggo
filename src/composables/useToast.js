import { reactive } from 'vue'

const toast = reactive({
  color: 'success',
  message: '',
  timeout: 2500,
  visible: false,
})

export function useToast() {
  function showToast(message, options = {}) {
    toast.message = message
    toast.color = options.color || 'success'
    toast.timeout = options.timeout ?? 2500
    toast.visible = true
  }

  function hideToast() {
    toast.visible = false
  }

  return {
    hideToast,
    showToast,
    toast,
  }
}
