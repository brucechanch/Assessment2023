import { useState } from 'react'
import axios from 'axios'

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    verifyCode: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { password, verifyCode, ...rest } = formData
      const response = await axios.post('/api/signup', {
        ...rest,
        password,
        verifyCode,
      })
      console.log(response.data)
      // Handle successful sign-up
    } catch (error) {
      console.error(error)
      // Handle sign-up error
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {' '}
      {/* Input fields and submit button */}{' '}
    </form>
  )
}

export default SignUpForm
