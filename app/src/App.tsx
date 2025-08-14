import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { allRoutes } from './utils/routeMapper'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { FC } from 'react'

const queryClient = new QueryClient()

const App: FC = (): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {allRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
