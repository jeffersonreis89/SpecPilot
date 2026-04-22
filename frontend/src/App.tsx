import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CollectionsPage from './pages/CollectionsPage'
import TestResultsPage from './pages/TestResultsPage'

function App() {
  const { token } = useAuthStore()

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route path="/" element={token ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/collections" element={token ? <CollectionsPage /> : <Navigate to="/login" />} />
        <Route path="/collections/:id/results" element={token ? <TestResultsPage /> : <Navigate to="/login" />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
