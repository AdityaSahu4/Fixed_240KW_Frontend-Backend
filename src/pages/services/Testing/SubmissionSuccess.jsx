// import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, DollarSign, AlertCircle, HelpCircle, FileText, MessageCircle } from 'lucide-react'

function SubmissionSuccess() {
  const navigate = useNavigate()

  // useEffect(() => {
  //   // 🔒 Testing flow is complete — clear session
  //   localStorage.removeItem("testingRequestId");
  // }, []);

  const nextSteps = [
    {
      title: 'Testings Received',
      description: 'Your testing specifications have been successfully received and validated.',
      status: 'completed',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Getting Quotation for the lab',
      description: 'We are coordinating with accredited labs to provide pricing and available test dates.',
      status: 'in-progress',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Testing in Progress',
      description: 'Your product is undergoing EMC, safety, RF, or environmental testing as per selected standards.',
      status: 'pending',
      icon: Clock,
      color: 'gray'
    },
    {
      title: 'Test Analysis & Report Preparation',
      description: 'Engineers are analyzing test data and preparing detailed compliance reports and insights.',
      status: 'pending',
      icon: FileText,
      color: 'gray'
    },
    {
      title: 'Results Delivery',
      description: 'You\'ll receive a notification once your Test report is ready.',
      status: 'pending',
      icon: CheckCircle,
      color: 'gray'
    },
  ]

  const getStatusColor = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-700 border-green-200',
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      gray: 'bg-gray-100 text-gray-600 border-gray-200'
    }
    return colors[color] || colors.gray
  }

  const getStatusText = (status) => {
    const statuses = {
      completed: { text: 'Completed', color: 'text-green-700' },
      'in-progress': { text: 'In Progress', color: 'text-blue-700' },
      pending: { text: 'Pending', color: 'text-gray-500' }
    }
    return statuses[status] || statuses.pending
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 text-center mb-8 border border-green-200"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submission Successful</h1>
          <p className="text-lg text-gray-600">Your testings is now in expert hands</p>
        </motion.div>

        {/* Rest Assured Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6 mb-8 text-center"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-2">Rest Assured</h2>
          <p className="text-gray-600">
            Your design details have been forwarded to our <span className="font-semibold text-blue-600">Testing Team</span>. They will now run the required tests and prepare insights for your <span className="font-semibold">Product</span>.
          </p>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">What Happens Next</h2>

          <div className="space-y-4">
            {nextSteps.map((step, index) => {
              const Icon = step.icon
              const statusInfo = getStatusText(step.status)

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`flex items-start gap-4 p-4 border rounded-lg ${getStatusColor(step.color)}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${step.status === 'completed' ? 'bg-green-500' :
                      step.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-gray-300'
                    }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <span className={`text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Estimates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 text-center">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Estimated Time</div>
            <div className="text-3xl font-bold text-gray-900">24-48 hrs</div>
            <div className="text-xs text-gray-500 mt-1">Typical processing time</div>
          </div>

          <div className="bg-green-50 rounded-xl border border-green-200 p-6 text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm text-gray-600 mb-1">Estimated Price</div>
            <div className="text-3xl font-bold text-gray-900">$ 4000</div>
            <div className="text-xs text-gray-500 mt-1">
              This is an automatically generated estimate to help you plan your design verification journey. Final pricing may vary based on simulation complexity and additional testing requirements.
            </div>
          </div>
        </motion.div>

        {/* Stay Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-yellow-50 rounded-xl border border-yellow-200 p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Stay Updated</h3>
              <p className="text-sm text-gray-600">
                We'll send you email notifications at each stage of the process. You can also track progress in your dashboard.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Go to Dashboard Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="text-center"
        >
          <button
            onClick={() => navigate('/customer/dashboard')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Go to Dashboard
          </button>
        </motion.div>

        {/* Support Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-600 mb-3">Need assistance or have questions?</p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <HelpCircle className="w-4 h-4" />
              Contact Support
            </a>
            <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <FileText className="w-4 h-4" />
              Documentation
            </a>
            <a href="#" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <MessageCircle className="w-4 h-4" />
              Live Chat
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SubmissionSuccess

