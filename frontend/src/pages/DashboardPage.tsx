import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import {
  collectionsApi,
  getApiErrorMessage,
  testExecutionsApi,
  type CollectionSummary,
} from '../services/api'

export default function DashboardPage() {
  const [collections, setCollections] = useState<CollectionSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()

  useEffect(() => {
    loadCollections()
  }, [])

  const loadCollections = async () => {
    try {
      const response = await collectionsApi.getAll()
      setCollections(response.data)
    } catch (error) {
      setError(getApiErrorMessage(error, 'Erro ao carregar collections'))
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleExecuteTests = async (collectionId: string) => {
    try {
      await testExecutionsApi.execute(collectionId)
      navigate(`/collections/${collectionId}/results`)
    } catch (error) {
      setError(getApiErrorMessage(error, 'Erro ao executar testes'))
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">SpecPilot</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Collections de Testes</h2>
          <button
            onClick={() => navigate('/collections')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + Nova Collection
          </button>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        {collections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhuma collection criada ainda.</p>
            <button
              onClick={() => navigate('/collections')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Criar primeira Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">{collection.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{collection.description}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-500">
                    Criada em: {new Date(collection.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleExecuteTests(collection.id)}
                    className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                  >
                    Executar Testes
                  </button>
                  <button
                    onClick={() => navigate(`/collections/${collection.id}/results`)}
                    className="flex-1 px-3 py-2 bg-gray-300 text-gray-900 text-sm rounded-md hover:bg-gray-400"
                  >
                    Historico
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
