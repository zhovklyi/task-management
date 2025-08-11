import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { allRoutes } from './utils/routeMapper'

function App() {
  return (
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
  )
}

export default App
