export type AdminToastKind = 'success' | 'error' | 'warn'

export interface AdminToast {
  id: number
  kind: AdminToastKind
  message: string
}

let nextId = 1

export function useAdminToast() {
  const toasts = useState<AdminToast[]>('admin-toasts', () => [])

  function dismiss(id: number) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function push(kind: AdminToastKind, message: string, timeout = 4000) {
    const id = nextId++
    toasts.value = [...toasts.value, { id, kind, message }]
    if (import.meta.client && timeout > 0) {
      setTimeout(() => dismiss(id), timeout)
    }
    return id
  }

  return {
    toasts,
    dismiss,
    push,
    success: (message: string) => push('success', message),
    error: (message: string) => push('error', message, 6000),
    warn: (message: string) => push('warn', message, 5000)
  }
}
