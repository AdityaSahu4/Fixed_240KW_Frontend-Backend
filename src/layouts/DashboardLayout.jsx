import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useData } from '../contexts/DataContext'
import {
  LayoutDashboard,
  User,
  Package,
  FileText,
  History,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Search,
  CheckCircle,
  AlertCircle,
  Info,
  X,
} from 'lucide-react'
import logo from '../assets/techlink-logo.svg'

const navItems = [
  { to: '/customer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/customer/profile', label: 'Profile', icon: User },
  { to: '/customer/products', label: 'Products', icon: Package },
  { to: '/customer/documents', label: 'Documents', icon: FileText },
  { to: '/customer/order-history', label: 'Order History', icon: History },
  { to: '/customer/messages', label: 'Message', icon: MessageSquare },
  { to: '/customer/settings', label: 'Settings', icon: Settings },
  { to: '/login', label: 'Signout', icon: LogOut },
]

function DashboardLayout() {
  const navigate = useNavigate()
  const { messages, products, orders } = useData()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const desktopNotificationRef = useRef(null)
  const mobileNotificationRef = useRef(null)

  // Generate notifications from messages, products, and orders
  const notifications = [
    ...messages
      .filter(m => !m.read)
      .slice(0, 3)
      .map((msg, idx) => ({
        id: `msg-${msg.id}`,
        type: 'info',
        title: 'New Message',
        message: msg.subject || 'You have a new message',
        time: 'Recently',
        read: false,
        link: '/customer/messages',
      })),
    ...products
      .filter(p => p.status === 'Complete')
      .slice(0, 2)
      .map((prod, idx) => ({
        id: `prod-${prod.id}`,
        type: 'success',
        title: 'Product Completed',
        message: `${prod.name} has been completed`,
        time: 'Recently',
        read: false,
        link: `/customer/products/${prod.id}`,
      })),
  ].slice(0, 5)

  const unreadCount = notifications.filter(n => !n.read).length

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const desktopContains = desktopNotificationRef.current?.contains(event.target)
      const mobileContains = mobileNotificationRef.current?.contains(event.target)
      if (!desktopContains && !mobileContains) {
        setNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      navigate('/login')
    }
  }

  const handleNotificationClick = (notification) => {
    setNotificationsOpen(false)
    if (notification.link) {
      navigate(notification.link)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Techlink Logo"
              className="h-16 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center gap-3 w-1/2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="relative" ref={desktopNotificationRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs text-primary font-medium">{unreadCount} new</span>
                      )}
                      <button
                        onClick={() => setNotificationsOpen(false)}
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                          <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>No notifications</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                              !notification.read ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`mt-1 p-1.5 rounded-lg ${
                                notification.type === 'success' ? 'bg-green-100 text-green-600' :
                                notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-blue-100 text-blue-600'
                              }`}>
                                {notification.type === 'success' && <CheckCircle className="w-4 h-4" />}
                                {notification.type === 'warning' && <AlertCircle className="w-4 h-4" />}
                                {notification.type === 'info' && <Info className="w-4 h-4" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-gray-200">
                        <button
                          onClick={() => {
                            setNotificationsOpen(false)
                            navigate('/customer/messages')
                          }}
                          className="w-full text-sm text-primary hover:text-primary-dark font-medium"
                        >
                          View All Notifications →
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300" />
              <span className="text-sm font-medium text-gray-700">Aditya Kumar Sahu</span>
            </div>
          </div>
          {/* Mobile Notification Button */}
          <div className="md:hidden relative" ref={mobileNotificationRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Mobile Notifications Dropdown */}
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs text-primary font-medium">{unreadCount} new</span>
                    )}
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                            !notification.read ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-1 p-1.5 rounded-lg ${
                              notification.type === 'success' ? 'bg-green-100 text-green-600' :
                              notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {notification.type === 'success' && <CheckCircle className="w-4 h-4" />}
                              {notification.type === 'warning' && <AlertCircle className="w-4 h-4" />}
                              {notification.type === 'info' && <Info className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-200">
                      <button
                        onClick={() => {
                          setNotificationsOpen(false)
                          navigate('/customer/messages')
                        }}
                        className="w-full text-sm text-primary hover:text-primary-dark font-medium"
                      >
                        View All Notifications →
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <nav className="bg-white border border-gray-200 rounded-xl p-3 sticky top-6">
            <ul className="space-y-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  {to === '/login' ? (
                    <button
                      onClick={handleSignout}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 w-full text-left"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{label}</span>
                    </button>
                  ) : (
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{label}</span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 md:col-span-9 lg:col-span-10"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}

export default DashboardLayout


