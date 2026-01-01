import {
  startTestingRequest,
  saveProductDetails,
  saveTechnicalDocuments,
  saveTestingRequirements,
  saveTestingStandards,
  submitTestingRequest
} from "../../services/testingApi"
import api from "../../services/api"
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react'
import ProductDetails from './ProductDetails'
import TechnicalDocuments from './TechnicalDocuments'
import TestingRequirementsForm from './TestingRequirementsForm'
import TestingStandardsForm from './TestingStandardsForm'
import LabSelection from './LabSelection'


function TestingFlow() {
  const navigate = useNavigate()
  const [testingRequestId, setTestingRequestId] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Product Details
    eutName: '',
    eutQuantity: '',
    manufacturer: '',
    modelNo: '',
    serialNo: '',
    supplyVoltage: '',
    operatingFrequency: '',
    current: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    powerPorts: '',
    signalLines: '',
    softwareName: '',
    softwareVersion: '',

    // Industry/Application
    industry: [],
    industryOther: '',

    // Testing dates
    preferredDate: '',
    additionalNotes: '',

    // Testing Requirements
    testType: 'final',
    selectedTests: [],

    // Testing Standards
    selectedRegions: [],
    selectedStandards: [],

    // Lab Selection
    selectedLabs: [],

    // Documents
    uploadedDocs: {}
  })

  const steps = [
    { id: 'product', title: 'Product Details', component: ProductDetails },
    { id: 'documents', title: 'Technical Specification Documents', component: TechnicalDocuments },
    { id: 'requirements', title: 'Testing Requirements', component: TestingRequirementsForm },
    { id: 'standards', title: 'Testing Standards', component: TestingStandardsForm },
    { id: 'lab', title: 'Lab selection and Review', component: LabSelection },
  ]
  const stepPaths = [
    'product-details',
    'technical-documents',
    'testing-requirements',
    'testing-standards',
    'lab-selection',
  ]
  const { step } = useParams()

  // Create / restore testing request - ONLY ONCE
  useEffect(() => {
    const init = async () => {
      const storedId = localStorage.getItem("testingRequestId")

      if (storedId) {
        try {
          // Verify the ID still exists in backend
          await api.get(`/testing-request/${storedId}`)
          setTestingRequestId(Number(storedId))
          console.log("✅ Restored testing_request_id:", storedId)
          return
        } catch {
          // ID is stale → discard it
          console.warn("⚠️ Stale testing_request_id found, creating new one")
          localStorage.removeItem("testingRequestId")
        }
      }

      // Create new testing request
      const res = await startTestingRequest()
      setTestingRequestId(res.id)
      localStorage.setItem("testingRequestId", res.id)
      console.log("✅ Created new testing_request_id:", res.id)
    }

    init()
  }, []) // Empty dependency array = runs ONCE on mount

  // Sync URL step ↔ currentStep
  useEffect(() => {
    if (!step) return

    const index = stepPaths.indexOf(step)
    if (index !== -1) {
      setCurrentStep(index)
    }
  }, [step])

  const CurrentStepComponent = steps[currentStep]?.component

  const handleNext = async () => {
    if (!testingRequestId) {
      alert("Testing request not initialized. Please refresh the page.")
      return
    }

    try {
      // STEP 1 – Product
      if (currentStep === 0) {
        await saveProductDetails(testingRequestId, {
          eut_name: formData.eutName,
          eut_quantity: formData.eutQuantity,
          manufacturer: formData.manufacturer,
          model_no: formData.modelNo,
          serial_no: formData.serialNo,
          supply_voltage: formData.supplyVoltage,
          operating_frequency: formData.operatingFrequency,
          current: formData.current,
          weight: formData.weight,
          dimensions: formData.dimensions,
          power_ports: formData.powerPorts,
          signal_lines: formData.signalLines,
          software_name: formData.softwareName,
          software_version: formData.softwareVersion,
          industry: formData.industry,
          industry_other: formData.industryOther,
          preferred_date: formData.preferredDate,
          notes: formData.additionalNotes
        })
        console.log("✅ Saved product details for testing_request_id:", testingRequestId)
      }

      // STEP 2 – Technical Documents
      if (currentStep === 1) {
        try {
          const documentsPayload = Object.entries(formData.uploadedDocs).map(
            ([docType, file]) => ({
              doc_type: docType,
              file_name: file.name || file,
              file_path: "",   // placeholder for now
              file_size: file.size || 0
            })
          )

          await saveTechnicalDocuments(testingRequestId, {
            documents: documentsPayload
          })
          console.log("✅ Saved technical documents for testing_request_id:", testingRequestId)
        } catch (err) {
          console.error("Failed to save technical documents", err)
          alert("Failed to save documents")
          return
        }
      }

      // STEP 3 – Requirements
      if (currentStep === 2) {
        try {
          await saveTestingRequirements(testingRequestId, {
            test_type: formData.testType,
            selected_tests: formData.selectedTests
          })
          console.log("✅ Saved testing requirements for testing_request_id:", testingRequestId)
        } catch (err) {
          console.error("Failed to save testing requirements", err)
          alert("Failed to save testing requirements")
          return
        }
      }

      // STEP 4 – Testing Standards
      if (currentStep === 3) {
        try {
          await saveTestingStandards(testingRequestId, {
            regions: formData.selectedRegions,
            standards: formData.selectedStandards
          })
          console.log("✅ Saved testing standards for testing_request_id:", testingRequestId)
        } catch (err) {
          console.error("Failed to save testing standards", err)
          alert("Failed to save testing standards")
          return
        }
      }

      // STEP 5 – Lab Selection
      if (currentStep === 4) {
        try {
          console.log("DEBUG selectedLabs:", formData.selectedLabs)

          if (!formData.selectedLabs || formData.selectedLabs.length === 0) {
            alert("Please select at least one lab")
            return
          }

          await submitTestingRequest(testingRequestId, {
            selected_labs: formData.selectedLabs,
            remarks: formData.additionalNotes
          })
          console.log("✅ Submitted testing request:", testingRequestId)

          // Clear the stored ID after successful submission
          localStorage.removeItem("testingRequestId")
          
          navigate("/services/testing/submission-success")
          return

        } catch (err) {
          console.error("Failed to submit testing request", err)
          alert("Failed to submit testing request")
          return
        }
      }

      // Navigate to next step
      const next = currentStep + 1
      setCurrentStep(next)
      navigate(`/services/testing/${stepPaths[next]}`)

    } catch (err) {
      console.error(err)
      alert("Failed to save step")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      navigate(`/services/testing/${stepPaths[prevStep]}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSaveDraft = () => {
    localStorage.setItem('testing_draft', JSON.stringify(formData))
    alert('Draft saved successfully!')
  }

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  // Sidebar navigation
  const sidebarSteps = [
    { title: 'Product Details', completed: currentStep > 0 },
    { title: 'Technical Specification Documents', completed: currentStep > 1 },
    { title: 'Testing Requirements', completed: currentStep > 2 },
    { title: 'Testing Standards', completed: currentStep > 3 },
    { title: 'Lab selection and Review', completed: currentStep > 4 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-gray-100 rounded-xl p-6 sticky top-8">
              <div className="space-y-4">
                {sidebarSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${index === currentStep
                      ? 'bg-blue-600 text-white'
                      : step.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                      }`}>
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${index === currentStep ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {CurrentStepComponent && (
                  <CurrentStepComponent
                    formData={formData}
                    updateFormData={updateFormData}
                    testingRequestId={testingRequestId} // ✅ PASS ID TO ALL COMPONENTS
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={handleSaveDraft}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save as Draft
              </button>

              <button
                onClick={handleNext}
                disabled={!testingRequestId}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-end gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">Help</a>
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestingFlow