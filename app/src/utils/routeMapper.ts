interface PageComponent {
  default: React.ComponentType
}

const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })

export const routes = Object.entries(pages)
  .map(([path, component]) => {
    const routeName = path
      .replace('../pages/', '')
      .replace('.tsx', '')
      .toLowerCase()

    const Component = (component as PageComponent).default

    if (routeName === 'dashboard') {
      return { path: '/', element: Component }
    }

    let routePath = routeName
      .replace('/index', '')
      .replace('[id]', ':id')

    if (!routePath.startsWith('/')) {
      routePath = `/${routePath}`
    }

    return { path: routePath, element: Component }
  })

export const allRoutes = [
  ...routes,
  { path: '/dashboard', element: (pages['../pages/dashboard.tsx'] as PageComponent).default }
]
