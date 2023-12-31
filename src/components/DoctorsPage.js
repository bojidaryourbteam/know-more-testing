import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UsersContext } from '../contexts/UserContext'
import dummyHospitals from '../data/hospitals'

const initialFormState = {
  Id: Date.now(),
  Title: '',
  FirstName: '',
  LastName: '',
  Role: 'Doctor',
  Address1: '',
  City: '',
  State: '',
  Zip: '',
  Email: '',
  Mobile: '',
  ConfirmEmail: 'No',
  ConfirmPhone: 'No',
  ConfirmPolicy: 'No',
  Language: 'English'
}

const roles = ['Doctor']
const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louis']
const titles = ['Mr', 'Ms', 'Dr']
const confirmationOptions = ['Yes', 'No']
const languages = ['English', 'Non-English']
const library = ['New Library 1	', 'New Library 2', 'New Library 3']

const DoctorPage = () => {
  const { users, setUsers } = useContext(UsersContext)
  const [formState, setFormState] = useState(initialFormState)
  const [selectedHospitals, setSelectedHospitals] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const user = users.find(user => user.Id === Number(id))
  // Fetch the user's data when the page loads

  useEffect(() => {
    if (user) {
      setFormState({
        id: user.Id,
        title: user.Title,
        firstName: user.FirstName,
        lastName: user.LastName,
        role: user.Role,
        address1: user.Address,
        city: user.City,
        state: user.State,
        zip: user.Zip,
        email: user.Email,
        mobile: user.MobileNumber,
        confirmEmail: false, // these fields are not in the user data, you may need to handle them differently
        confirmPhone: false, // same as above
        confirmPolicy: user.HasAcceptedTerms === 1,
        language: user.Language
      })
      setIsEditing(true)
    }
  }, [user])

  const handleCheckChangeHospital = hospitalsId => {
    setSelectedHospitals(prevState => {
      if (prevState.includes(hospitalsId)) {
        return prevState.filter(id => id !== hospitalsId)
      } else {
        return [...prevState, hospitalsId]
      }
    })
  }

  const hospitals = dummyHospitals

  const handleChange = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (user) {
      // update existing user
      setUsers(users.map(u => (u.Id === user.Id ? { ...u, ...formState } : u)))
    } else {
      // add new user
      setUsers([...users, { ...formState, Id: Date.now() }])
    }
    setIsEditing(false) // Resetting isEditing state
    navigate('/users')
  }

  return (
    <div>
      <form className='doctorForm' onSubmit={handleSubmit}>
        <div>
          <div>Title:</div>
          <select className='doctor_title_dropdown_title' name='title' value={formState.title} onChange={handleChange}>
            {titles.map((title, index) => (
              <option value={title} key={index}>
                {title}
              </option>
            ))}
          </select>
          <div className=''>First Name</div>
          <input className='doctor_title_dropdown_big' name='firstName' value={formState.firstName} onChange={handleChange} placeholder='First Name' />
          <div>Last Name</div>
          <input className='doctor_title_dropdown_big' name='lastName' value={formState.lastName} onChange={handleChange} placeholder='Last Name' />
          <div>Role: {roles[0]}</div>
          {/* <select className='doctor_title_dropdown_title' name='title' value={formState.roles} onChange={handleChange}>
            {roles.map((roles, index) => (
              <option value={roles} key={index}>
                {roles}
              </option>
            ))}
          </select> */}
          <div>Address</div>
          <input className='doctor_title_dropdown_big' name='address1' value={formState.address1} onChange={handleChange} placeholder='Address' />
          <div>City</div>
          <input className='doctor_title_dropdown_big' name='city' value={formState.city} onChange={handleChange} placeholder='City' />
          <div className='users_address2'>
            <div>
              <div>States</div>
              <select className='doctor_title_dropdown_state' name='title' value={formState.states} onChange={handleChange}>
                {states.map((states, index) => (
                  <option value={states} key={index}>
                    {states}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div>Zip</div>
              <input className='doctor_title_dropdown_zip' name='zip' value={formState.zip} onChange={handleChange} placeholder='Zip' />
            </div>
          </div>

          <div>Email</div>
          <input className='doctor_title_dropdown_big' name='email' value={formState.email} onChange={handleChange} placeholder='Email' />
          <div>Mobile</div>
          <input className='doctor_title_dropdown_big' name='mobile' value={formState.mobile} onChange={handleChange} placeholder='Mobile' />
        </div>
        <section>
          <div className='users_verificaiton'>
            {/* <div>
              <div>Verified Mobile</div>
              <select className='doctor_dropdown_terms' name='confirmPhone' value={formState.confirmPhone} onChange={handleChange}>
                {confirmationOptions.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div> */}
            <div>
              <div>Accepted Terms</div>
              <select className='doctor_dropdown_terms' name='confirmPolicy' value={formState.confirmPolicy} onChange={handleChange}>
                {confirmationOptions.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div>Language</div>
              <select className='patient_dropdown_terms-language' name='language' value={formState.language} onChange={handleChange}>
                {languages.map((language, index) => (
                  <option value={language} key={index}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
            {/* <div>
              <div>Verified Email</div>
              <select className='doctor_dropdown_terms' name='confirmEmail' value={formState.confirmEmail} onChange={handleChange}>
                {confirmationOptions.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
          <div className='doctor_locations_list'>
            <div>Company</div>
            <button className='button-classic button-classic-doctors-add' type='button'>
              Add
            </button>
          </div>
          <div className='users_list_box'>
            {hospitals.map((hospital, index) => (
              <div key={index}>
                <label>
                  <input type='checkbox' checked={selectedHospitals.includes(hospital.id)} onChange={() => handleCheckChangeHospital(hospital.id)} />
                  {hospital.name} {hospital.address1}
                </label>
              </div>
            ))}
          </div>
          <div className='doctor_library'>Library</div>
          <select className='doctor_title_dropdown_library' name='title' value={formState.library} onChange={handleChange}>
            {library.map((library, index) => (
              <option value={library} key={index}>
                {library}
              </option>
            ))}
          </select>
        </section>

        <button className='button-general ' type='submit'>
          Send Invite
        </button>
        <div className='button-general-doctor-container'>
          <Link to='/users'>
            <button className='button-general position-doctor-cancel' type='button'>
              Cancel
            </button>
          </Link>
          <button className='button-general position-doctor-save' type='submit'>
            {isEditing ? 'Save' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default DoctorPage
