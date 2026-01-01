import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from './services/authApi'
import { Eye, EyeOff, User, Building, Mail, Lock, UserPlus, CheckCircle2 } from 'lucide-react'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // ✅ ADD – form data states
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // ✅ ADD – navigation
  const navigate = useNavigate()

  const [agreeToTerms, setAgreeToTerms] = useState(true)
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  }

  // ✅ ADD – signup submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      await signup({
        first_name: firstName,
        last_name: lastName,
        company_name: companyName,
        email,
        password,
      })

      alert("Signup successful! Please login.")
      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.detail || "Signup failed")
    }
  }


  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Sign up</h1>
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Log in
              </Link>
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}   // ✅ ADD THIS LINE
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl p-8 space-y-4 border border-gray-100"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  First Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Last Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" />
                Company Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email address
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 flex items-center"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use 8 or more characters with a mix of letters, numbers & symbols
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Confirm Password
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-12"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 flex items-center"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use 8 or more characters with a mix of letters, numbers & symbols
              </p>
            </div>

            <div className="space-y-3">
              <motion.label
                whileHover={{ scale: 1.02 }}
                className="flex items-start cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="mt-1 mr-2 w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">
                  Agree to our{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of use
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </motion.label>
              <motion.label
                whileHover={{ scale: 1.02 }}
                className="flex items-start cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={subscribeNewsletter}
                  onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                  className="mt-1 mr-2 w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">
                  Subscribe to our monthly newsletter
                </span>
              </motion.label>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center p-4 border-2 border-gray-300 rounded-lg bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.5 }}
                  className="w-5 h-5 border-2 border-green-500 bg-green-500 rounded flex items-center justify-center"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-sm text-gray-700 font-medium">I'm not a robot</span>
                <span className="text-xs text-gray-500">reCAPTCHA</span>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Sign up
            </motion.button>
          </motion.form>

          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <Link to="/login" className="text-sm text-primary hover:underline font-semibold">
              log in instead
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default SignUp
