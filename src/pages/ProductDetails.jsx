import { motion } from 'framer-motion'
import { Package, Send, FileText, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

function ProductDetails() {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    designation: '',
    email: '',
    mobileNo: '',
    address: '',
    preferableDates: '',
    industry: '',
    services: '',
    productName: '',
    productQuantity: '',
    productSpecification: '',
    productPartNo: '',
    standardsRequired: '',
    productDescription: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'

  const API_BASE_URL = 'http://localhost:8000' // ✅ Change to your backend URL

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const payload = {
        organization_name: formData.organizationName,
        contact_person: formData.contactPerson,
        designation: formData.designation,
        email: formData.email,
        mobile_no: formData.mobileNo,
        address: formData.address,
        preferable_dates: formData.preferableDates || null,
        industry: formData.industry,
        services: formData.services,
        product_name: formData.productName,
        product_quantity: parseInt(formData.productQuantity) || 1,
        product_specification: formData.productSpecification || null,
        product_part_no: formData.productPartNo || null,
        standards_required: formData.standardsRequired || null,
        product_description: formData.productDescription || null,
        submission_type: 'submit'
      }

      const response = await fetch(`${API_BASE_URL}/product-details/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      const data = await response.json()
      console.log('✅ Form submitted successfully:', data)
      
      setSubmitStatus('success')
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        window.location.href = 'http://localhost:5173/services/testing/submission-success'
      }, 2000)

    } catch (error) {
      console.error('❌ Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGetQuote = async () => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const payload = {
        organization_name: formData.organizationName,
        contact_person: formData.contactPerson,
        designation: formData.designation,
        email: formData.email,
        mobile_no: formData.mobileNo,
        address: formData.address,
        preferable_dates: formData.preferableDates || null,
        industry: formData.industry,
        services: formData.services,
        product_name: formData.productName,
        product_quantity: parseInt(formData.productQuantity) || 1,
        product_specification: formData.productSpecification || null,
        product_part_no: formData.productPartNo || null,
        standards_required: formData.standardsRequired || null,
        product_description: formData.productDescription || null,
        submission_type: 'quote'
      }

      const response = await fetch(`${API_BASE_URL}/product-details/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Failed to request quote')
      }

      const data = await response.json()
      console.log('✅ Quote requested successfully:', data)
      
      setSubmitStatus('success')
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        window.location.href = 'http://localhost:5173/pricing'
      }, 2000)

    } catch (error) {
      console.error('❌ Error requesting quote:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-10 h-10 text-primary" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Product Details
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Submit your product information to get started
          </p>
        </motion.div>
        
        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center"
          >
            ✅ Successfully submitted! Redirecting to home page...
          </motion.div>
        )}
        
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center"
          >
            ❌ Failed to submit. Please try again.
          </motion.div>
        )}
        
        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Organization Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name of Organization
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile No
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferable Dates (for Testing)
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="preferableDates"
                  value={formData.preferableDates}
                  onChange={handleChange}
                  placeholder="e.g., March 20-25, 2024"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry/Application
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select Industry</option>
                  <option value="electronics">Electronics</option>
                  <option value="automotive">Automotive</option>
                  <option value="telecommunications">Telecommunications</option>
                  <option value="medical">Medical Devices</option>
                  <option value="aerospace">Aerospace</option>
                </motion.select>
              </div>
            </motion.div>
            
            {/* Right Column */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Product Information
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services
                </label>
                <motion.select
                  whileFocus={{ scale: 1.02 }}
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select Service</option>
                  <option value="design">Design</option>
                  <option value="testing">Testing</option>
                  <option value="calibration">Calibration</option>
                  <option value="simulation">Simulation</option>
                  <option value="debugging">Product Debugging</option>
                  <option value="certification">Certification</option>
                </motion.select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Quantity
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="number"
                  name="productQuantity"
                  value={formData.productQuantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Specification (Weight, height, width)
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="productSpecification"
                  value={formData.productSpecification}
                  onChange={handleChange}
                  placeholder="e.g., 2kg, 10cm, 5cm"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Part No.
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="productPartNo"
                  value={formData.productPartNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standards Required
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  name="standardsRequired"
                  value={formData.standardsRequired}
                  onChange={handleChange}
                  placeholder="e.g., ISO 9001, CE Mark"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  rows="4"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                ></motion.textarea>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleGetQuote}
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-5 h-5" />
              {isSubmitting ? 'Processing...' : 'Get Quote'}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  )
}

export default ProductDetails