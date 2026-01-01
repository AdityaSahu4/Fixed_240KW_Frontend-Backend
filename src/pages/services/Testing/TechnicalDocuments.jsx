import { useState, useEffect } from 'react'
import { FileText, Upload, CheckCircle, X, Layers, Cpu, List, Zap, Code, AlertCircle } from 'lucide-react'

function TechnicalDocuments({ formData, updateFormData }) {
  const [uploadStatus, setUploadStatus] = useState({}) // Track upload status per document
  const [uploadedDocs, setUploadedDocs] = useState({})
  const [testingRequestId, setTestingRequestId] = useState(null)

  const API_BASE_URL = 'http://localhost:8000' // Change to your backend URL

  const documents = [
    { id: 'circuit', name: 'Circuit Diagram', icon: Layers, color: 'blue', required: false },
    { id: 'pcb', name: 'PCB Gerber Files', icon: Cpu, color: 'purple', required: false },
    { id: 'block', name: 'Block Diagram', icon: FileText, color: 'green', required: false },
    { id: 'bom', name: 'Component List / BOM', icon: List, color: 'orange', required: false },
    { id: 'power', name: 'Ratings & Power Specs', icon: Zap, color: 'yellow', required: false },
    { id: 'firmware', name: 'Firmware Details', icon: Code, color: 'indigo', required: false },
  ]

  // Get testing request ID from multiple sources
  useEffect(() => {
    // Try multiple sources for the testing request ID
    const requestId = 
      formData?.testingRequestId || 
      sessionStorage.getItem('testingRequestId') ||
      localStorage.getItem('testingRequestId') ||
      new URLSearchParams(window.location.search).get('requestId')
    
    if (requestId) {
      setTestingRequestId(requestId)
      fetchExistingDocuments(requestId)
    } else {
      // If no ID found, try to get from parent component
      console.warn('No testing request ID found. Make sure to pass testingRequestId via props or store it in sessionStorage')
    }
  }, [formData])

  const fetchExistingDocuments = async (requestId) => {
    if (!requestId) return

    try {
      const response = await fetch(`${API_BASE_URL}/testing-request/${requestId}/documents`)
      if (response.ok) {
        const docs = await response.json()
        const docsMap = {}
        docs.forEach(doc => {
          docsMap[doc.doc_type] = {
            id: doc.id,
            name: doc.file_name,
            size: doc.file_size,
            path: doc.file_path,
            uploadedAt: doc.uploaded_at
          }
        })
        setUploadedDocs(docsMap)
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
    }
  }

  const handleFileUpload = async (docId, file) => {
    if (!file) return

    if (!testingRequestId) {
      setUploadStatus({
        ...uploadStatus,
        [docId]: { type: 'error', message: 'Please save product details first' }
      })
      setTimeout(() => {
        setUploadStatus(prev => {
          const newStatus = { ...prev }
          delete newStatus[docId]
          return newStatus
        })
      }, 3000)
      return
    }

    // Validate file size (50MB max)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      setUploadStatus({
        ...uploadStatus,
        [docId]: { type: 'error', message: 'File too large. Maximum size is 50MB' }
      })
      setTimeout(() => {
        setUploadStatus(prev => {
          const newStatus = { ...prev }
          delete newStatus[docId]
          return newStatus
        })
      }, 3000)
      return
    }

    // Validate file type
    const allowedTypes = ['.pdf', '.png', '.jpg', '.jpeg', '.zip', '.rar', '.doc', '.docx']
    const fileExt = '.' + file.name.split('.').pop().toLowerCase()
    if (!allowedTypes.includes(fileExt)) {
      setUploadStatus({
        ...uploadStatus,
        [docId]: { 
          type: 'error', 
          message: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` 
        }
      })
      setTimeout(() => {
        setUploadStatus(prev => {
          const newStatus = { ...prev }
          delete newStatus[docId]
          return newStatus
        })
      }, 3000)
      return
    }

    // Set uploading status
    setUploadStatus({
      ...uploadStatus,
      [docId]: { type: 'uploading', message: 'Uploading...' }
    })

    // Create form data
    const formDataToSend = new FormData()
    formDataToSend.append('file', file)
    formDataToSend.append('doc_type', docId)

    try {
      const response = await fetch(
        `${API_BASE_URL}/testing-request/${testingRequestId}/upload-document`,
        {
          method: 'POST',
          body: formDataToSend,
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || 'Upload failed')
      }

      const result = await response.json()

      // Update uploaded docs state
      setUploadedDocs({
        ...uploadedDocs,
        [docId]: {
          id: result.doc_id,
          name: result.file_name,
          size: result.file_size,
          path: result.file_path
        }
      })

      // Update formData if needed
      if (updateFormData) {
        updateFormData({
          uploadedDocs: {
            ...formData.uploadedDocs,
            [docId]: {
              name: result.file_name,
              size: result.file_size,
              uploadedAt: new Date().toISOString()
            }
          }
        })
      }

      // Show success message
      setUploadStatus({
        ...uploadStatus,
        [docId]: { type: 'success', message: 'File uploaded successfully!' }
      })

      // Clear success message after 3 seconds
      setTimeout(() => {
        setUploadStatus(prev => {
          const newStatus = { ...prev }
          delete newStatus[docId]
          return newStatus
        })
      }, 3000)

    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus({
        ...uploadStatus,
        [docId]: { type: 'error', message: error.message || 'Upload failed' }
      })

      // Clear error message after 5 seconds
      setTimeout(() => {
        setUploadStatus(prev => {
          const newStatus = { ...prev }
          delete newStatus[docId]
          return newStatus
        })
      }, 5000)
    }
  }

  const handleRemoveFile = async (docId) => {
    const doc = uploadedDocs[docId]
    if (!doc) return

    if (!window.confirm('Are you sure you want to delete this file?')) {
      return
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/testing-request/${testingRequestId}/documents/${doc.id}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete file')
      }

      // Remove from state
      const newDocs = { ...uploadedDocs }
      delete newDocs[docId]
      setUploadedDocs(newDocs)

      // Update formData if needed
      if (updateFormData) {
        const newFormDocs = { ...formData.uploadedDocs }
        delete newFormDocs[docId]
        updateFormData({ uploadedDocs: newFormDocs })
      }

      // Show success message
      setUploadStatus({
        ...uploadStatus,
        [docId]: { type: 'success', message: 'File deleted successfully' }
      })

      setTimeout(() => {
        setUploadStatus(prev => {
          const newStatus = { ...prev }
          delete newStatus[docId]
          return newStatus
        })
      }, 3000)

    } catch (error) {
      console.error('Delete error:', error)
      setUploadStatus({
        ...uploadStatus,
        [docId]: { type: 'error', message: 'Failed to delete file' }
      })

      setTimeout(() => {
        setUploadStatus(prev => {
          const newStatus = { ...prev }
          delete newStatus[docId]
          return newStatus
        })
      }, 3000)
    }
  }

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      indigo: 'bg-indigo-100 text-indigo-600',
    }
    return colorMap[color] || 'bg-gray-100 text-gray-600'
  }

  // Don't show warning - just show the upload section without ability to upload
  // The upload buttons will show the error when clicked if no ID exists

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Technical Specification Documents</h1>
        {testingRequestId && (
          <p className="text-gray-600 mt-2">Upload your technical documents for Testing Request #{testingRequestId}</p>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="space-y-6">
          {documents.map((doc) => {
            const Icon = doc.icon
            const uploaded = uploadedDocs[doc.id]
            const status = uploadStatus[doc.id]
            
            return (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(doc.color)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{doc.name}</span>
                      {doc.required && (
                        <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    
                    {uploaded && (
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">{uploaded.name}</span>
                        <span className="text-xs text-gray-400">
                          ({(uploaded.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                    )}
                    
                    {/* Status Messages */}
                    {status && (
                      <div className={`mt-2 text-sm flex items-center gap-2 ${
                        status.type === 'success' ? 'text-green-600' :
                        status.type === 'error' ? 'text-red-600' :
                        'text-blue-600'
                      }`}>
                        {status.type === 'success' && <CheckCircle className="w-4 h-4" />}
                        {status.type === 'error' && <AlertCircle className="w-4 h-4" />}
                        {status.type === 'uploading' && (
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        )}
                        <span>{status.message}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {uploaded ? (
                    <button
                      onClick={() => handleRemoveFile(doc.id)}
                      disabled={status?.type === 'uploading'}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  ) : (
                    <label className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer flex items-center gap-2 ${
                      status?.type === 'uploading' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}>
                      <Upload className="w-4 h-4" />
                      {status?.type === 'uploading' ? 'Uploading...' : 'Upload'}
                      <input
                        type="file"
                        className="hidden"
                        disabled={status?.type === 'uploading'}
                        accept=".pdf,.png,.jpg,.jpeg,.zip,.rar,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(doc.id, file)
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Document Guidelines:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Accepted formats: PDF, PNG, JPG, ZIP, RAR, DOC, DOCX</li>
                <li>Maximum file size: 50MB per document</li>
                <li>Ensure all documents are clearly labeled and legible</li>
                <li>Files are saved as: {testingRequestId ? `${testingRequestId}_documentType_filename` : 'requestId_documentType_filename'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechnicalDocuments