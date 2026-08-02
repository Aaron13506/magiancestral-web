import { onBeforeUnmount, type Ref } from 'vue'

/**
 * Avisa antes de abandonar un formulario con cambios sin guardar, tanto al
 * navegar dentro del panel como al cerrar la pestaña.
 *
 * Devuelve `release()`, que desactiva el aviso de forma definitiva para esta
 * página: se llama justo después de guardar, antes de `navigateTo`, para que
 * la navegación propia del guardado no dispare la confirmación.
 */
export function useUnsavedGuard(isDirty: Ref<boolean>) {
  // El diálogo se resuelve fuera del setup, así que capturamos el composable
  // aquí: dentro del callback del guard ya no hay contexto de Nuxt.
  const { confirm } = useAdminConfirm()

  let armed = true

  const onBeforeUnload = (event: BeforeUnloadEvent) => {
    if (!armed || !isDirty.value) return
    event.preventDefault()
    // Chrome exige asignar returnValue para mostrar el diálogo nativo.
    event.returnValue = ''
  }

  if (import.meta.client) {
    window.addEventListener('beforeunload', onBeforeUnload)
  }

  onBeforeRouteLeave(async () => {
    if (!armed || !isDirty.value) return true
    return await confirm({
      title: 'Cambios sin guardar',
      message: 'Tienes cambios que no se han guardado.',
      detail: 'Si sales ahora se perderán.',
      confirmLabel: 'Salir sin guardar',
      cancelLabel: 'Seguir editando',
      danger: true
    })
  })

  onBeforeUnmount(() => {
    if (import.meta.client) window.removeEventListener('beforeunload', onBeforeUnload)
  })

  return {
    release: () => { armed = false }
  }
}
