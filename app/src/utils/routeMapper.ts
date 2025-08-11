interface PageComponent {
  default: React.ComponentType
}

const pages = import.meta.glob('../pages/*.tsx', { eager: true })

export const routes = Object.entries(pages)
  .map(([path, component]) => {
    const routeName = path
      .replace('../pages/', '')
      .replace('.tsx', '')
      .toLowerCase()

    const Component = (component as PageComponent).default

    return routeName === 'dashboard'
      ? { path: '/', element: Component }
      : { path: `/${routeName}`, element: Component }
  })

export const allRoutes = [
  ...routes,
  { path: '/dashboard', element: (pages['../pages/Dashboard.tsx'] as PageComponent).default }
]
