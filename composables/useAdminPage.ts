export interface AdminCrumb {
  label: string
  to?: string
}

export interface AdminPageState {
  path: string
  crumbs: AdminCrumb[]
}

/**
 * Estado compartido entre <AdminPageHeader> (que lo publica) y el layout admin
 * (que dibuja el breadcrumb del topbar). Guarda la ruta junto a las migas para
 * que el layout descarte las de una página que ya se abandonó.
 */
export function useAdminPage() {
  return useState<AdminPageState>('admin-page', () => ({ path: '', crumbs: [] }))
}
