import { useEffect, useState } from "react";
import { fetchFullTestingRequest } from "../../services/testingApi";
import { ChevronDown, Clock, DollarSign } from "lucide-react";

function LabSelection({ formData, updateFormData, testingRequestId }) {
  // ======================
  // Review Data (BACKEND)
  // ======================
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!testingRequestId) {
      console.warn("⚠️ No testingRequestId provided to LabSelection");
      return;
    }

    setLoading(true);
    setError(null);

    fetchFullTestingRequest(testingRequestId)
      .then(data => {
        console.log("✅ Fetched review data:", data);
        setReviewData(data);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch review data:", err);
        setError("Failed to load review data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [testingRequestId]);

  // ======================
  // Local State
  // ======================
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // ======================
  // Region & Lab Data
  // ======================
  const countries = ['India']

  const cityMap = {
    Maharashtra: ['Pune', 'Mumbai'],
    Karnataka: ['Bengaluru'],
    'Tamil Nadu': ['Chennai'],
    Gujarat: ['Ahmedabad']
  }

  const labsData = [
    { name: 'TUV INDIA PVT. LTD., BANER, PUNE, MAHARASHTRA, INDIA', state: 'Maharashtra', city: 'Pune' },
    { name: 'INTERTEK INDIA, MUMBAI', state: 'Maharashtra', city: 'Mumbai' },
    { name: 'SGS INDIA PRIVATE LIMITED, BENGALURU, KARNATAKA, INDIA', state: 'Karnataka', city: 'Bengaluru' },
    { name: 'ABB INDIA LIMITED- ELSP-TESTING LABORATORY', state: 'Karnataka', city: 'Bengaluru' },
    { name: 'UL INDIA, BENGALURU', state: 'Karnataka', city: 'Bengaluru' },
    { name: 'CPRI, BENGALURU', state: 'Karnataka', city: 'Bengaluru' },
    { name: 'ERTL (STQC), CHENNAI', state: 'Tamil Nadu', city: 'Chennai' }
  ]

  const states = Object.keys(cityMap)
  const cities = selectedState ? cityMap[selectedState] || [] : []

  const filteredLabs =
    selectedCountry === 'India' && selectedState && selectedCity
      ? labsData.filter(
        lab => lab.state === selectedState && lab.city === selectedCity
      )
      : []

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Labs</h1>
        {testingRequestId && (
          <p className="text-sm text-gray-500 mt-2">
            Request ID: {testingRequestId}
          </p>
        )}
      </div>

      {/* ================= Region Selection ================= */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-medium text-gray-700 mb-4">Region :</h3>

        <h4 className="text-center font-medium text-gray-700 mb-4">
          ---------- Select Region ----------
        </h4>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value)
                  setSelectedState('')
                  setSelectedCity('')
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none"
              >
                <option value="">Select</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value)
                  setSelectedCity('')
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none"
                disabled={!selectedCountry}
              >
                <option value="">Select</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <div className="relative">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none"
                disabled={!selectedState}
              >
                <option value="">Select</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* ================= Labs ================= */}
        <h4 className="text-center font-medium text-gray-700 mb-4">
          ---------- Select Lab ----------
        </h4>

        <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {filteredLabs.length > 0 ? (
            filteredLabs.map((lab) => (
              <label
                key={lab.name}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={
                    Array.isArray(formData.selectedLabs) &&
                    formData.selectedLabs.includes(lab.name)
                  }
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
                <span className="text-sm flex-1 font-medium text-gray-900">
                  {lab.name}
                </span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-400 text-center">
              Select country, state and city to view labs
            </p>
          )}
        </div>
      </div>

      {/* ================= REVIEW SECTION (FROM BACKEND) ================= */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Review</h3>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-4">Loading review data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4 mb-6">
            {/* Name of EUT */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Name of EUT</label>
              <input
                type="text"
                value={reviewData?.product_details?.eut_name || formData.eutName || 'Not provided'}
                disabled
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600"
              />
            </div>

            {/* Testing Requirements */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Testing Requirements</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[60px]">
                {reviewData?.testing_requirements?.selected_tests?.length > 0 ? (
                  <div className="space-y-1">
                    {reviewData.testing_requirements.selected_tests.map((test, idx) => (
                      <div key={idx} className="text-sm text-gray-700">
                        • {test}
                      </div>
                    ))}
                  </div>
                ) : formData.selectedTests?.length > 0 ? (
                  <div className="space-y-1">
                    {formData.selectedTests.map((test, idx) => (
                      <div key={idx} className="text-sm text-gray-700">
                        • {test}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No tests selected</p>
                )}
              </div>
            </div>

            {/* Testing Standards */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Testing Standards</label>
              <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[60px]">
                {reviewData?.testing_standards?.standards?.length > 0 ? (
                  <div className="space-y-1">
                    {reviewData.testing_standards.standards.map((standard, idx) => (
                      <div key={idx} className="text-sm text-gray-700">
                        • {standard}
                      </div>
                    ))}
                  </div>
                ) : formData.selectedStandards?.length > 0 ? (
                  <div className="space-y-1">
                    {formData.selectedStandards.map((standard, idx) => (
                      <div key={idx} className="text-sm text-gray-700">
                        • {standard}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No standards selected</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= COST & TIME ESTIMATES ================= */}
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
  )
}

export default LabSelection