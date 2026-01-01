import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
// ✅ ADD
import { useNavigate } from 'react-router-dom'
import { login } from './services/authApi'
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react'

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  // ✅ ADD
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const [rememberMe, setRememberMe] = useState(true)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // ✅ ADD – login submit handler
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await login({ email, password })

      localStorage.setItem("token", res.data.access_token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      navigate("/customer/dashboard")
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed")
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen py-12 flex items-center">
      <div className="container mx-auto px-6 max-w-md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome</h1>
            <p className="text-gray-600">Log in to your account</p>
          </motion.div>

          <motion.form
            onSubmit={handleLogin}   // ✅ ADD
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-4 border border-gray-100"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-12"
                  placeholder="Enter your password"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">
                  Remember me
                </span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Login
            </motion.button>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline font-semibold">
                Create one
              </Link>
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-br from-blue-50 to-purple-50 text-gray-500">OR</span>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-3"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all font-medium"
            >
              <span className="mr-2 font-bold text-blue-600 text-xl">G</span>
              Continue with Google
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-all font-medium"
            >
              <span className="mr-2 text-xl">📱</span>
              Continue with contact no.
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
