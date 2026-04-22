import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collectionsApi } from '../services/api'

export default function CollectionsPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    baseUrl: '',
    postmanData: null as any,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string)
          setFormData({ ...formData, postmanData: data })
          setError('')
        } catch (err) {
          setError('Arquivo JSON inválido')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.postmanData) {
      setError('Nome e arquivo são obrigatórios')
      return
    }

    setLoading(true)
    setError('')

    try {
      const payload = {
        ...formData,
        baseUrl: formData.baseUrl.trim() || undefined,
        description: formData.description.trim() || undefined,
      }

      await collectionsApi.create(payload)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao criar collection')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Nova Collection</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome da Collection
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Ex: API de Usuarios"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Descrição da collection"
            />
          </div>

          <div>
            <label htmlFor="baseUrl" className="block text-sm font-medium text-gray-700">
              Base URL (opcional)
            </label>
            <input
              id="baseUrl"
              name="baseUrl"
              type="url"
              value={formData.baseUrl}
              onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://api.example.com"
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Arquivo Postman Collection (JSON)
            </label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              required
            />
            {formData.postmanData && (
              <p className="mt-2 text-sm text-green-600">✓ Arquivo carregado</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar Collection'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
