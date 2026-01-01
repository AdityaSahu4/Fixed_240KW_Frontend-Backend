import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

export const DataProvider = ({ children }) => {
  // Load data from localStorage or use defaults
  const loadFromStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  }

  const saveToStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  // Products state
  const [products, setProducts] = useState(() => loadFromStorage('techlink_products', [
    {
      id: 'BP-2024-001',
      name: 'EV Charger V2',
      service: 'EMC Testing',
      progress: 70,
      status: 'Testing',
      description: 'Advanced EV charging system with smart connectivity',
      createdAt: '2024-01-15',
      category: 'Electronics',
    },
    {
      id: 'BP-2024-002',
      name: 'Controller X',
      service: 'Simulation',
      progress: 100,
      status: 'Complete',
      description: 'High-performance microcontroller for industrial applications',
      createdAt: '2024-01-10',
      category: 'Electronics',
    },
    {
      id: 'BP-2026-003',
      name: 'Transformer',
      service: 'Environmental Testing',
      progress: 50,
      status: 'Testing',
      description: '240kW Charging Station Transformer',
      createdAt: '2026-01-01',
      category: 'Power Equipment',
    },
    {
      id: 'BP-2026-004',
      name: 'HMI & Communication Interfaces',
      service: 'Design V&V',
      progress: 80,
      status: 'Under Review',
      description: '240kW Charging Station - HMI & Communication Interfaces Design Verification and Validation',
      createdAt: '2026-01-01',
      category: 'Control & Communication',
    },
    {
      id: 'BP-2024-005',
      name: 'IGBT',
      service: 'Calibration',
      progress: 10,
      status: 'Planned',
      description: '240kW - Temperature Sensors (IGBT, coolant, cabinet)',
      createdAt: '2026-01-01',
      category: 'Power Electronics',
    },
    {
      id: 'BP-2024-006',
      name: 'Circuit Breaker',
      service: 'Product Debugging',
      progress: 30,
      status: 'Quoted',
      description: '240kW - Power & Electrical Parts',
      createdAt: '2026-01-01',
      category: 'Electrical Protection',
    },
  ]))

  // Orders state
  const [orders, setOrders] = useState(() => loadFromStorage('techlink_orders', [
    {
      id: 'ORD-2024-001',
      productId: 'BP-2024-001',
      productName: 'EV Charger V2',
      service: 'EMC Testing',
      status: 'Completed',
      completedAt: '2024-01-18',
      total: 149.00,
    },
    {
      id: 'ORD-2024-002',
      productId: 'BP-2024-002',
      productName: 'Controller X',
      service: 'Simulation',
      status: 'Cancelled',
      cancelledAt: '2024-01-12',
      total: 199.00,
    },
    // {
    //   id: 'ORD-2024-003',
    //   productId: 'BP-2024-003',
    //   productName: 'Battery Pack B1',
    //   service: 'Calibration',
    //   status: 'Cancelled',
    //   cancelledAt: '2024-01-22',
    //   total: 79.00,
    // },
  ]))

  // Messages state
  const [messages, setMessages] = useState(() => loadFromStorage('techlink_messages', [
    {
      id: 'MSG-001',
      from: 'Lab Team',
      subject: 'Test Report Ready for EV Charger V2',
      body: 'Your test report for EV Charger V2 (BP-2024-001) is now ready for review. Please check the Documents section.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: false,
      type: 'notification',
    },
    {
      id: 'MSG-002',
      from: 'Support Team',
      subject: 'Welcome to Millennium Techlink',
      body: 'Thank you for choosing Millennium Techlink. We are here to help you with all your testing and certification needs.',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      type: 'info',
    },
  ]))

  // Profile state
  const [profile, setProfile] = useState(() => loadFromStorage('techlink_profile', {
    fullName: 'Aditya Kumar Sahu',
    username: 'aditya.sahu',
    gender: 'Female',
    language: 'English',
    companyName: 'TechCorp Industries',
    userId: 'USR-2024-001',
    country: 'United States',
    address: 'Millennium Techlink Private Limited, 17/18/19, 2nd Floor, Mahalaxmi Heights, Mumbai-Pune Road, Pimpri, Pune 411 018, Maharashtra, INDIA',
    phone: '+1 (555) 123-4567',
    email: 'aditya.sahu@techcorp.com',
    designation: 'Senior Engineer',
    membershipLevel: 'Premium',
    industry: 'Technology',
    accountType: 'Business',
    emailAddresses: [
      { email: 'aditya.sahu@techcorp.com', verified: true, addedAt: '1 month ago' }
    ]
  }))

  // Documents state
  const [documents, setDocuments] = useState(() => loadFromStorage('techlink_documents', [
    {
      id: 'DOC-001',
      productId: 'BP-2024-001',
      productName: 'EV Charger V2',
      title: 'Test Report #001',
      type: 'Test Report',
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      size: '2.4 MB',
      url: '#',
    },
    {
      id: 'DOC-002',
      productId: 'BP-2024-001',
      productName: 'EV Charger V2',
      title: 'Certificate SS-001',
      type: 'Certificate',
      uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      size: '1.8 MB',
      url: '#',
    },
  ]))

  // Settings state
  const [settings, setSettings] = useState(() => loadFromStorage('techlink_settings', {
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    smsNotifications: false,
  }))

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage('techlink_products', products)
  }, [products])

  useEffect(() => {
    saveToStorage('techlink_orders', orders)
  }, [orders])

  useEffect(() => {
    saveToStorage('techlink_messages', messages)
  }, [messages])

  useEffect(() => {
    saveToStorage('techlink_profile', profile)
  }, [profile])

  useEffect(() => {
    saveToStorage('techlink_documents', documents)
  }, [documents])

  useEffect(() => {
    saveToStorage('techlink_settings', settings)
  }, [settings])

  // Product functions
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: `BP-2024-${String(products.length + 1).padStart(3, '0')}`,
      progress: 0,
      status: 'Awaiting',
      createdAt: new Date().toISOString().split('T')[0],
    }
    setProducts([...products, newProduct])
    return newProduct
  }

  const updateProduct = (id, updates) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  // Order functions
  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: `ORD-2024-${String(orders.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    }
    setOrders([...orders, newOrder])
    return newOrder
  }

  // Message functions
  const addMessage = (message) => {
    const newMessage = {
      ...message,
      id: `MSG-${String(messages.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
      read: false,
    }
    setMessages([newMessage, ...messages])
    return newMessage
  }

  const markMessageAsRead = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m))
  }

  const deleteMessage = (id) => {
    setMessages(messages.filter(m => m.id !== id))
  }

  // Document functions
  const addDocument = (document) => {
    const newDoc = {
      ...document,
      id: `DOC-${String(documents.length + 1).padStart(3, '0')}`,
      uploadedAt: new Date().toISOString(),
    }
    setDocuments([...documents, newDoc])
    return newDoc
  }

  const deleteDocument = (id) => {
    setDocuments(documents.filter(d => d.id !== id))
  }

  const value = {
    products,
    orders,
    messages,
    profile,
    documents,
    settings,
    setProducts,
    setOrders,
    setMessages,
    setProfile,
    setDocuments,
    setSettings,
    addProduct,
    updateProduct,
    deleteProduct,
    addOrder,
    addMessage,
    markMessageAsRead,
    deleteMessage,
    addDocument,
    deleteDocument,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}

