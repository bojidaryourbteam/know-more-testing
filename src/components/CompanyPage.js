import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { HospitalsContext } from '../contexts/HospitalsContext'

const CompanyPage = () => {
  const { hospitals, deleteHospital } = useContext(HospitalsContext)
  console.log(hospitals)

  const removeHospital = OrganizationId => {
    deleteHospital(OrganizationId)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Organization</th>
            <th>Address</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map(user => (
            <tr key={user.OrganizationId}>
              <td>{user.Name}</td>
              <td>{user.Address}</td>
              <td>{user.Phone}</td>
              <td className='organization-add-button-possition-edit'>
                <Link to={`/edit-company/${user.OrganizationId}`}>
                  <button className='button-classic '>Edit Organization</button>
                </Link>
              </td>
              <td className='user-add-button-possition-remove'>
                <button className='button-classic' onClick={() => removeHospital(user.OrganizationId)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Link to={`/add-company`}>
          <button className='button-general user-add-button-possition'>Add Organization</button>
        </Link>
      </div>
    </div>
  )
}

export default CompanyPage
