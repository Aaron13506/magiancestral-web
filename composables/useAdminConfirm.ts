export interface AdminConfirmOptions {
  title?: string
  message: string
  detail?: string
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
}

interface AdminConfirmState extends AdminConfirmOptions {
  open: boolean
  busy: boolean
}

const EMPTY: AdminConfirmState = {
  open: false,
  busy: false,
  title: '',
  message: '',
  detail: '',
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
  danger: false
}

// El `resolve` vive fuera de useState: es una función y no debe serializarse.
let resolver: ((value: boolean) => void) | null = null

/**
 * Diálogo de confirmación del panel. Reemplaza a `window.confirm()`:
 *
 *   const ok = await confirm({ message: '¿Borrar el producto?', danger: true })
 *
 * El diálogo lo renderiza <AdminConfirmDialog /> desde el layout admin.
 */
export function useAdminConfirm() {
  const state = useState<AdminConfirmState>('admin-confirm', () => ({ ...EMPTY }))

  function confirm(options: AdminConfirmOptions): Promise<boolean> {
    // Si quedó un diálogo abierto por una llamada anterior, lo resolvemos como
    // cancelado para no dejar promesas colgadas.
    resolver?.(false)

    state.value = {
      ...EMPTY,
      ...options,
      open: true,
      busy: false
    }

    return new Promise<boolean>((resolve) => {
      resolver = resolve
    })
  }

  function settle(value: boolean) {
    const resolve = resolver
    resolver = null
    state.value = { ...state.value, open: false, busy: false }
    resolve?.(value)
  }

  return {
    state,
    confirm,
    accept: () => settle(true),
    cancel: () => settle(false)
  }
}
