import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const HospitalsContext = createContext()

export const HospitalsProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState([])
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])

  const fetchHospitals = async () => {
    const response = await axios.post('https://knowmoreapp.azurewebsites.net/api-noauth/execute-sp/2efb3572-f15e-45be-8ef0-dbe9c9273529', {})
    setHospitals(response.data)
  }

  const fetchDoctors = async () => {
    const response = await axios.post('https://knowmoreapp.azurewebsites.net/api-noauth/execute-sp/3b84f65e-1484-49d8-a86d-495652c29ebe', {})
    setDoctors(response.data)
  }

  const fetchPatients = async () => {
    const response = await axios.post('https://knowmoreapp.azurewebsites.net/api-noauth/execute-sp/05375051-0405-4de4-8ad7-f0d0436b958c', {})
    setPatients(response.data)
  }

  const deleteHospital = async id => {
    await axios.post('https://knowmoreapp.azurewebsites.net/api-noauth/execute-sp/d9c0ef89-7997-4617-9961-cd1ca7aa9aaf', { OrganizationId: id })
    setHospitals(hospitals.filter(hospital => hospital.OrganizationId !== id))
  }
  const manageOrganization = async organizationData => {
    await axios.post('https://knowmoreapp.azurewebsites.net/api-noauth/execute-sp/7fe67bd7-9f90-44c2-91b8-22415b253ce6', organizationData)
    fetchHospitals() // Fetch hospitals to update the local state after change
  }

  useEffect(() => {
    fetchHospitals()
    fetchDoctors()
    fetchPatients()
  }, [])

  return <HospitalsContext.Provider value={{ hospitals, deleteHospital, manageOrganization, doctors, patients }}>{children}</HospitalsContext.Provider>
}
