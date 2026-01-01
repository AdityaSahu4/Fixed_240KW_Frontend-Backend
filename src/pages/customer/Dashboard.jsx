import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import {
  Package, Search, Plus, Edit, MessageCircle, Eye
} from 'lucide-react'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }, [navigate])

  const { products, messages } = useData()
  const [searchQuery, setSearchQuery] = useState('')

  // Filter products based on search query
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.service.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeProducts = filteredProducts.filter(p => p.status !== 'Complete' && p.status !== 'Cancelled')
  const completedCount = filteredProducts.filter(p => p.status === 'Complete').length
  const inProgressCount = filteredProducts.filter(p => p.status !== 'Complete' && p.status !== 'Cancelled' && p.status !== 'Awaiting').length
  const activeFlowsCount = activeProducts.length

  const certificationRate = filteredProducts.length > 0
    ? Math.round((completedCount / filteredProducts.length) * 100)
    : 0

  const workflowActivity = 84 // Mock data

  const getProgressStages = (product) => {
    const stages = [
      { label: 'Planned', completed: product.progress >= 10 },
      { label: 'Awaiting Samples', completed: product.progress >= 20 },
      { label: 'Quoted', completed: product.progress >= 30 },
      { label: 'Testing', completed: product.progress >= 50 },
      { label: 'In Progress', completed: product.progress >= 60 },
      { label: 'Under Review', completed: product.progress >= 80 },
      { label: 'Report Submitted', completed: product.progress >= 90 },
      { label: 'Completed', completed: product.status === 'Complete' },
    ]

    // Add dates only to completed stages
    if (product.progress >= 10) stages[0].date = '10 Oct 2025'
    if (product.progress >= 10) stages[0].time = '10:00 am'
    if (product.progress >= 20) stages[1].date = '16 Oct 2025'
    if (product.progress >= 20) stages[1].time = '04:00 pm'
    if (product.progress >= 30) stages[2].date = '15 Oct 2025'
    if (product.progress >= 30) stages[2].time = '06:00 pm'
    if (product.progress >= 50) stages[3].date = '16 Oct 2025'
    if (product.progress >= 50) stages[3].time = '10:25 am'
    if (product.progress >= 60) stages[4].date = '17 Oct 2025'
    if (product.progress >= 60) stages[4].time = '04:00 pm'
    if (product.progress >= 80) stages[5].date = '18 Oct 2025'
    if (product.progress >= 80) stages[5].time = '09:30 am'
    if (product.progress >= 90) stages[6].date = '19 Oct 2025'
    if (product.progress >= 90) stages[6].time = '02:00 pm'
    if (product.status === 'Complete') stages[7].date = '20 Oct 2025'
    if (product.status === 'Complete') stages[7].time = '09:00 am'

    return stages
  }

  const getProductIcon = (index) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-yellow-100 text-yellow-600',
      'bg-purple-100 text-purple-600',
      'bg-pink-100 text-pink-600',
    ]
    return colors[index % colors.length]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete': return 'bg-green-100 text-green-700'
      case 'Testing': return 'bg-blue-100 text-blue-700'
      case 'Awaiting': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Products</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <Link
            to="/services/select"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="text-3xl font-bold text-gray-800">{filteredProducts.length}</div>
          <div className="text-sm text-gray-600 mt-1">Total Products</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="text-3xl font-bold text-green-600">{completedCount}</div>
          <div className="text-sm text-gray-600 mt-1">Completed</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="text-3xl font-bold text-yellow-600">{inProgressCount}</div>
          <div className="text-sm text-gray-600 mt-1">In Progress</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="text-3xl font-bold text-blue-600">{activeFlowsCount}</div>
          <div className="text-sm text-gray-600 mt-1">Active Flows</div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Products Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">#</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Product Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Service Opted</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Progress</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.slice(0, 5).map((product, index) => (
                    <tr key={product.id} className="border-b border-gray-200 last:border-b-0">
                      <td className="px-6 py-6" colSpan="6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4 flex-1">
                            <span className="text-gray-600 font-medium">{index + 1}</span>

                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getProductIcon(index)}`}>
                                <span className="font-bold text-sm">
                                  {product.name.substring(0, 2).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="text-xs text-gray-500">ID: {product.id}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-8">
                            <div className="text-sm text-gray-700 min-w-[100px]">{product.service}</div>

                            <div className="flex items-center gap-2 min-w-[120px]">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                <div
                                  className="h-full bg-blue-600 rounded-full"
                                  style={{ width: `${product.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{product.progress}%</span>
                            </div>

                            <div className="min-w-[90px]">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                {product.status}
                              </span>
                            </div>

                            <div className="flex items-center gap-3">
                              <Link
                                to={`/customer/products/${product.id}`}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                View
                              </Link>
                              <button 
                                onClick={() => navigate(`/customer/products/${product.id}`)}
                                className="text-gray-600 hover:text-gray-700"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => navigate('/customer/messages')}
                                className="text-gray-600 hover:text-gray-700 relative"
                              >
                                <MessageCircle className="w-4 h-4" />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Timeline - PERFECT ALIGNMENT FIX */}
                        <div className="ml-8">
                          <div className="relative">
                            {/* Connecting Line - Behind everything */}
                            <div className="absolute left-0 right-0 h-[2px] bg-gray-300 top-[11px]" />
                            
                            {/* Timeline Items */}
                            <div className="flex items-start justify-between relative">
                              {getProgressStages(product).map((stage, idx) => (
                                <div key={idx} className="flex flex-col items-center flex-1 relative">
                                  {/* Circle - Perfectly centered on line */}
                                  <div className="mb-2 relative z-10">
                                    {stage.completed ? (
                                      <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                      </div>
                                    ) : (
                                      <div className="w-6 h-6 rounded-full bg-white border-[3px] border-gray-300" />
                                    )}
                                  </div>
                                  
                                  {/* Label */}
                                  <div className="text-xs font-medium text-center whitespace-nowrap px-1">
                                    {stage.label}
                                  </div>
                                  
                                  {/* Date and Time */}
                                  {stage.date && (
                                    <>
                                      <div className="text-xs text-gray-500 text-center mt-1 whitespace-nowrap">
                                        {stage.date}
                                      </div>
                                      <div className="text-xs text-gray-500 text-center whitespace-nowrap">
                                        {stage.time}
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Active Workflows Section */}
          {activeProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 mt-6"
            >
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold">Active Workflows</h3>
              </div>

              <div className="p-6 space-y-4">
                {activeProducts.slice(0, 3).map((product, index) => (
                  <div
                    key={product.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-medium">
                          {product.service} - {product.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Started {Math.floor(Math.random() * 5) + 1} days ago
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        In Progress
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{product.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${product.progress}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="h-full bg-blue-600 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/customer/products/${product.id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Continue
                      </Link>
                      <Link
                        to={`/customer/products/${product.id}`}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* Progress Analytics Sidebar */}
        <aside className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6"
          >
            <h3 className="text-lg font-bold mb-6">Progress Analytics</h3>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Certification Rate</span>
                  <span className="text-sm font-bold">{certificationRate}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${certificationRate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Workflow Activity</span>
                  <span className="text-sm font-bold">{workflowActivity}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${workflowActivity}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  )
}

export default Dashboard