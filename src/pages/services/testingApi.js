import api from "./api"

// Start new testing request
export const startTestingRequest = async () => {
  const res = await api.post("/testing-request/")
  return res.data   // { id, status }
}

// Save product details
export const saveProductDetails = (id, data) =>
  api.post(`/testing-request/${id}/product`, data)

// Save technical documents
export const saveTechnicalDocuments = (id, data) =>
  api.post(`/testing-request/${id}/documents`, data)

// Save testing requirements
export const saveTestingRequirements = (id, data) =>
  api.post(`/testing-request/${id}/requirements`, data)

// Save testing standards
export const saveTestingStandards = (id, data) =>
  api.post(`/testing-request/${id}/standards`, data)

// Submit request (labs)
export const submitTestingRequest = (id, data) =>
  api.post(`/testing-request/${id}/submit`, data)

// Fetch full testing request for review
export const fetchFullTestingRequest = (id) =>
  api.get(`/testing-request/${id}/full`).then(res => res.data)