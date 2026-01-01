import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useData } from '../../contexts/DataContext'
import { Save, User, Mail, Phone, MapPin, Building, Camera, Upload, X, Edit2, CheckCircle, Briefcase, Award, TrendingUp, Users } from 'lucide-react'
import toast from 'react-hot-toast'

function Profile() {
  const { profile, setProfile } = useData()
  const [formData, setFormData] = useState({
    ...profile,
    profileImage: profile?.profileImage || null,
    designation: profile?.designation || '',
    membershipLevel: profile?.membershipLevel || '',
    industry: profile?.industry || '',
    accountType: profile?.accountType || '',
    emailAddresses: profile?.emailAddresses || [
      { email: profile?.email || '', verified: true, addedAt: '1 month ago' }
    ]
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState(profile?.profileImage || null)
  const fileInputRef = useRef(null)

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const imageDataUrl = reader.result
        setImagePreview(imageDataUrl)
        setFormData({ ...formData, profileImage: imageDataUrl })
        
        // Auto-save image
        setProfile({ ...formData, profileImage: imageDataUrl })
        toast.success('Profile image updated!')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview(null)
    setFormData({ ...formData, profileImage: null })
    setProfile({ ...formData, profileImage: null })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    toast.success('Profile image removed')
  }

  const handleAddEmail = () => {
    const newEmail = {
      email: '',
      verified: false,
      addedAt: 'Just now'
    }
    setFormData({
      ...formData,
      emailAddresses: [...formData.emailAddresses, newEmail]
    })
  }

  const handleRemoveEmail = (index) => {
    if (formData.emailAddresses.length > 1) {
      const newEmails = formData.emailAddresses.filter((_, i) => i !== index)
      setFormData({ ...formData, emailAddresses: newEmails })
    } else {
      toast.error('You must have at least one email address')
    }
  }

  const handleEmailChange = (index, value) => {
    const newEmails = [...formData.emailAddresses]
    newEmails[index].email = value
    setFormData({ ...formData, emailAddresses: newEmails })
  }

  const handleSave = () => {
    // Validation
    if (!formData.fullName?.trim()) {
      toast.error('Please enter your full name')
      return
    }

    const validEmails = formData.emailAddresses.filter(e => e.email.trim())
    if (validEmails.length === 0) {
      toast.error('Please add at least one email address')
      return
    }

    setIsSaving(true)
    setTimeout(() => {
      setProfile({ 
        ...formData, 
        profileImage: imagePreview,
        email: formData.emailAddresses[0].email
      })
      setIsSaving(false)
      setIsEditing(false)
      toast.success('Profile saved successfully!')
    }, 500)
  }

  const handleCancel = () => {
    // Reset to original profile data
    setFormData({
      ...profile,
      emailAddresses: profile?.emailAddresses || [
        { email: profile?.email || '', verified: true, addedAt: '1 month ago' }
      ]
    })
    setImagePreview(profile?.profileImage || null)
    setIsEditing(false)
  }

  const getCurrentDate = () => {
    const date = new Date()
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }
    return date.toLocaleDateString('en-GB', options)
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-xl p-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {formData.fullName?.split(' ')[0] || 'User'}
        </h1>
        <p className="text-sm text-gray-600 mt-1">{getCurrentDate()}</p>
      </motion.div>

      {/* Profile Header with Image and Edit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Profile Image */}
            <div className="relative">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 shadow-md">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                )}
              </div>
              
              {/* Image Edit Buttons - Only show when editing */}
              {isEditing && (
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
                  >
                    <Camera className="w-3 h-3" />
                  </motion.button>
                  {imagePreview && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleRemoveImage}
                      className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </motion.button>
                  )}
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Name and Email */}
            <div>
              <h2 className="text-xl font-bold text-gray-800">{formData.fullName || 'User Name'}</h2>
              <p className="text-sm text-gray-600">{formData.emailAddresses?.[0]?.email || formData.email}</p>
            </div>
          </div>

          {/* Edit/Save/Cancel Buttons */}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Full Name - EDITABLE */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Full Name / Username
              </label>
              <input
                value={formData.fullName || ''}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                placeholder="Your Full Name"
                disabled={!isEditing}
              />
            </div>

            {/* Gender - EDITABLE DROPDOWN */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Gender</label>
              <select
                value={formData.gender || ''}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                disabled={!isEditing}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Language - EDITABLE DROPDOWN */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Language</label>
              <select
                value={formData.language || ''}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                disabled={!isEditing}
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese (Mandarin)</option>
                <option value="Japanese">Japanese</option>
                <option value="Korean">Korean</option>
                <option value="Arabic">Arabic</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Russian">Russian</option>
                <option value="Italian">Italian</option>
              </select>
            </div>

            {/* Company Name - EDITABLE */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Company Name</label>
              <input
                value={formData.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                placeholder="Company Name"
                disabled={!isEditing}
              />
            </div>

            {/* Designation - EDITABLE */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Designation
              </label>
              <input
                value={formData.designation || ''}
                onChange={(e) => handleChange('designation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                placeholder="Designation"
                disabled={!isEditing}
              />
            </div>

            {/* Industry - PERMANENT (from signup) */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Industry
              </label>
              <input
                value={formData.industry || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                placeholder="Industry (Set during signup)"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* User ID - PERMANENT */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">User ID</label>
              <input
                value={formData.userId || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                placeholder="User ID"
              />
            </div>

            {/* Country - EDITABLE DROPDOWN */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Country</label>
              <select
                value={formData.country || ''}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                disabled={!isEditing}
              >
                <option value="">Select Country</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="China">China</option>
                <option value="Japan">Japan</option>
                <option value="South Korea">South Korea</option>
                <option value="Brazil">Brazil</option>
                <option value="Mexico">Mexico</option>
                <option value="Spain">Spain</option>
                <option value="Italy">Italy</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Singapore">Singapore</option>
                <option value="UAE">United Arab Emirates</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
              </select>
            </div>

            {/* Address - EDITABLE */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Address</label>
              <input
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                placeholder="Address"
                disabled={!isEditing}
              />
            </div>

            {/* Phone - EDITABLE */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Phone No</label>
              <input
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                placeholder="Phone No"
                disabled={!isEditing}
              />
            </div>

            {/* Membership Level - PERMANENT (from signup) */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                <Award className="w-4 h-4" />
                Membership Level
              </label>
              <input
                value={formData.membershipLevel || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                placeholder="Membership Level (Set during signup)"
              />
            </div>

            {/* Account Type - PERMANENT (from signup) */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                <Users className="w-4 h-4" />
                Account Type
              </label>
              <input
                value={formData.accountType || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                placeholder="Account Type (Set during signup)"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Email Addresses Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">My Email Addresses</h3>
        
        <div className="space-y-3">
          {formData.emailAddresses?.map((emailObj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                {emailObj.verified ? (
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                ) : (
                  <Mail className="w-5 h-5 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1">
                <input
                  type="email"
                  value={emailObj.email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  placeholder="email@example.com"
                  disabled={!isEditing}
                />
                <p className="text-xs text-gray-500 mt-1">{emailObj.addedAt}</p>
              </div>

              {isEditing && formData.emailAddresses.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveEmail(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        {isEditing && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddEmail}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2"
          >
            + Add Email Address
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}

export default Profile