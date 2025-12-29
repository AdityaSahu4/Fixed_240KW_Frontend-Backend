import { useState } from 'react'
import { ChevronDown, Clock, DollarSign } from 'lucide-react'

function LabSelection({ formData, updateFormData }) {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const countries = ['India', 'USA', 'UK', 'Germany']
  const states = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat']
  const cities = ['Pune', 'Mumbai', 'Bengaluru', 'Chennai']

  const recommendedLabs = [
    {
      id: 'tuv-india',
      name: 'TUV INDIA PVT. LTD., BANER, PUNE, MAHARASHTRA, INDIA',
      rating: 4.8,
      selected: true
    },
    {
      id: 'sgs-india',
      name: 'SGS INDIA PRIVATE LIMITED, BENGALURU, KARNATAKA, INDIA',
      rating: 4.6,
      selected: false
    },
    {
      id: 'abb-india',
      name: 'ABB INDIA LIMITED- ELSP-TESTING LABORATORY',
      rating: 4.5,
      selected: false
    },
    {
      id: 'herrmann',
      name: 'HERRMANN RESEARCH PRODUCTS AND LABORATORIES PVT',
      rating: 4.7,
      selected: false
    },
    {
      id: 'marquis',
      name: 'MARQUIS TECHNOLOGIES PRIVATE LIMITED',
      rating: 4.4,
      selected: false
    },
    {
      id: 'meter-testing',
      name: 'METER TESTING LABORATORY, RRVPNL',
      rating: 4.3,
      selected: false
    },
  ]


  // const [selectedLabs, setSelectedLabs] = useState([recommendedLabs[0].id])

  // const toggleLabSelection = (labId) => {
  //   if (selectedLabs.includes(labId)) {
  //     setSelectedLabs(selectedLabs.filter(id => id !== labId))
  //   } else {
  //     setSelectedLabs([...selectedLabs, labId])
  //   }
  // }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Labs</h1>
      </div>

      {/* Region Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-medium text-gray-700 mb-4">Region :</h3>

        <h4 className="text-center font-medium text-gray-700 mb-4">---------- Select Region ----------</h4>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Recommended Labs */}
        <h4 className="text-center font-medium text-gray-700 mb-4">---------- Select Lab ----------</h4>

        <div>
          <h5 className="font-semibold text-gray-900 mb-4">Recommended Labs</h5>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {recommendedLabs.map((lab) => (
              <label
                key={lab.id}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={Array.isArray(formData.selectedLabs) && formData.selectedLabs.includes(lab.name)}
                  onChange={() => {
                    const current = Array.isArray(formData.selectedLabs)
                      ? formData.selectedLabs
                      : []

                    if (current.includes(lab.name)) {
                      updateFormData({
                        selectedLabs: current.filter(l => l !== lab.name)
                      })
                    } else {
                      updateFormData({
                        selectedLabs: [...current, lab.name]
                      })
                    }
                  }}
                  className="w-4 h-4"
                />
                {/* checked={selectedLabs.includes(lab.id)}
                onChange={() => toggleLabSelection(lab.id)} */}
                <span className="text-sm flex-1 font-medium text-gray-900">{lab.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Review</h3>

        <div className="space-y-4 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Name of EUT</label>
            <input
              type="text"
              value={formData.eutName || ''}
              disabled
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
            />
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Testing Requirements</label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[60px]">
              {formData.selectedTests && formData.selectedTests.length > 0 ? (
                <p className="text-sm text-gray-600">
                  {formData.selectedTests.length} test(s) selected
                </p>
              ) : (
                <p className="text-sm text-gray-400">No tests selected</p>
              )}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Testing Standards</label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[60px]">
              {formData.selectedStandards && formData.selectedStandards.length > 0 ? (
                <p className="text-sm text-gray-600">
                  {formData.selectedStandards.length} standard(s) selected
                </p>
              ) : (
                <p className="text-sm text-gray-400">No standards selected</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <p className="text-center text-sm text-gray-600 mb-6">
            Our AI will instantly generate an approximate cost based on your inputs.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Estimated Time</div>
              <div className="text-2xl font-bold text-gray-900">24-48 hrs</div>
              <div className="text-xs text-gray-500 mt-1">Typical processing time</div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-600 mb-1">Estimated Price</div>
              <div className="text-2xl font-bold text-gray-900">$ 4000</div>
              <div className="text-xs text-gray-500 mt-1">
                This is an automatically generated estimate to help you plan your design verification journey. Final pricing may vary based on simulation complexity and additional testing requirements.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LabSelection

