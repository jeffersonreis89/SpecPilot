import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getApiErrorMessage,
  testExecutionsApi,
  type TestExecutionResult,
  type TestExecutionStats,
} from '../services/api'

export default function TestResultsPage() {
  const { id: collectionId } = useParams<{ id: string }>()
  const [results, setResults] = useState<TestExecutionResult[]>([])
  const [stats, setStats] = useState<TestExecutionStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!collectionId) {
      setLoading(false)
      return
    }

    const loadResults = async () => {
      try {
        const resultsResponse = await testExecutionsApi.getHistory(collectionId)
        const statsResponse = await testExecutionsApi.getStats(collectionId)

        setResults(resultsResponse.data)
        setStats(statsResponse.data)
      } catch (error) {
        setError(getApiErrorMessage(error, 'Erro ao carregar resultados'))
      } finally {
        setLoading(false)
      }
    }

    void loadResults()
  }, [collectionId])

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
              <button
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-900 mr-4"
              >
                â† Voltar
              </button>
              <h1 className="text-xl font-bold text-gray-900">Resultados dos Testes</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {stats && (
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Total</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-green-50 rounded-lg shadow p-6">
              <p className="text-green-700 text-sm">Passou</p>
              <p className="text-3xl font-bold text-green-600">{stats.passed}</p>
            </div>
            <div className="bg-red-50 rounded-lg shadow p-6">
              <p className="text-red-700 text-sm">Falhou</p>
              <p className="text-3xl font-bold text-red-600">{stats.failed}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg shadow p-6">
              <p className="text-yellow-700 text-sm">Erro</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.error}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Request
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  MÃ©todo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  DuraÃ§Ã£o
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Resultado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {result.requestName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{result.method}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 truncate">{result.url}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        result.statusCode >= 200 && result.statusCode < 300
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {result.statusCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {result.duration ?? 0}ms
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        result.status === 'passed'
                          ? 'bg-green-100 text-green-800'
                          : result.status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {result.status === 'passed'
                        ? 'âœ“ Passou'
                        : result.status === 'failed'
                          ? 'âœ— Falhou'
                          : 'âš  Erro'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
