import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Header from '../components/Header.jsx';
import { getCountryCallingCode } from 'react-phone-number-input';



const formFields = [
  { label: 'First Name*', type: 'text', name: 'firstName' },
  { label: 'Last Name*', type: 'text', name: 'lastName' },
  { label: 'Primary Phone Number*', type: 'tel', name: 'phoneNumber' },
  { label: 'Verify Phone', type: 'text', name: 'verifyCode' },
  { label: 'New Password*', type: 'password', name: 'password' },
  { label: 'Retype Password*', type: 'password', name: 'confirmPassword' },

];


const SignUpForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    verifyCode: ['', '', '', ''],
    password: '',
    confirmPassword: '',
  });

  // State for phone number validation
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  // State for verification code validation
  const [isCodeCorrect, setIsCodeCorrect] = useState(true);
  const [isCodeIncorrect, setIsCodeIncorrect] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);


  useEffect(() => {
    // Update the form validation status whenever there is an error
    setIsFormValid(isPhoneValid && !isCodeIncorrect);
  }, [isPhoneValid, isCodeIncorrect]);

  // Handler for input changes
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handler for phone number changes
  const handlePhoneChange = (value, metadata) => {
    setIsPhoneValid(value ? value.length > 0 : false);
    setFormData({
      ...formData,
      phoneNumber: value,
    });
    // Update phone number format based on selected country
    if (metadata && metadata.country) {
      const selectedCountry = getCountryCallingCode(metadata.country);
      if (selectedCountry) {
        setDefaultCountry(selectedCountry);
        setFormData({
          ...formData,
          phoneNumber: `+${metadata.countryCallingCode} ${formData.phoneNumber.slice(metadata.dialCode.length)}`,
        });
      }
    }
  };

// Handler for verification code changes
const handleVerifyCodeChange = (index, value) => {
  const newVerifyCode = [...formData.verifyCode];
  newVerifyCode[index] = value;
  setFormData({
    ...formData,
    verifyCode: newVerifyCode,
  });

  // Automatically move to the next input when a digit is entered
  if (value && value.length === 1 && index < 3) {
    const nextInputName = `verifyCode[${index + 1}]`;
    const nextInput = document.getElementsByName(nextInputName)[0];
    if (nextInput) {
      nextInput.focus();
    }
  }

  // Check if the entered code is correct
  const enteredCode = newVerifyCode.join('');
  const correctCode = '0000'; // Replace with the actual correct verification code
  const isCodeCorrect = enteredCode === correctCode;
  setIsCodeCorrect(isCodeCorrect);

  // Set the incorrect code state
  setIsCodeIncorrect(!isCodeCorrect);

  // Reset the border color to default when a new digit is entered
  const verificationCodeInput = document.getElementsByName(`verifyCode[${index}]`)[0];
  if (verificationCodeInput) {
    verificationCodeInput.style.borderColor = 'default';
  }
};

  // Handler for sending verification code
  const handleSendCode = () => {
    // Add code here to send verification code
    // For demonstration purposes, you can show an alert
  };

  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const combinedVerifyCode = formData.verifyCode.join('');
      const dataToSend = { ...formData, verifyCode: combinedVerifyCode };
      const response = await axios.post('/api/signup', dataToSend);
      // Clear form or redirect user as needed
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('There was an error during sign up.');
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex justify-center min-h-screen ">
        <div className="max-w-lg w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
          <form onSubmit={handleSubmit} className="flex flex-col m-4 md:m-8 lg:m-12">
            <h1 className="text-2xl text-center pb-8">Create a New Account</h1>
            {formFields.map((field) => (
              <div key={field.label} className="my-3">
                <label className="label text-gray-500 text-sm">{field.label}</label>
                {field.name === 'phoneNumber' ? (
                  <div className={`relative ${!isPhoneValid ? 'border-red-500 bg-red-100' : ''}`}>
                    <PhoneInput
                      international
                      defaultCountry="HK"
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      className={`border p-3 rounded-lg ${!isPhoneValid ? 'border-red-500' : ''}`}
                      required
                      inputStyle={{
                        borderRadius: '0.25rem',
                        padding: '0.3rem',
                        borderColor: isPhoneValid ? 'default' : 'red',
                      }}
                    />
                    {formData.phoneNumber && (
                      <button
                        type="button"
                        className="absolute right-0 top-0 bottom-0  text-blue-400 py-1 px-4 rounded-r-md"
                        onClick={handleSendCode}
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        Send Code
                      </button>
                    )}
                    {!isPhoneValid && (
                      <div style={{ color: 'red', paddingTop: '0.5rem', background: 'white' }}>
                        Please enter a valid phone number
                      </div>
                    )}
                  </div>
                ) : field.name === 'verifyCode' ? (
<div className="flex flex-col items-center">
  <div className="flex ">
    {formData.verifyCode.map((digit, index) => (
      <div key={index} className="flex flex-col ">
        <input
          type="text"
          className={`flex border p-2 rounded-lg mx-2 md:mx-4 w-10 md:w-[2.5rem] text-center items-center ${
            isCodeIncorrect ? 'border-red-500' : ''
          }`}
          name={`${field.name}[${index}]`}
          value={digit}
          onChange={(e) => handleVerifyCodeChange(index, e.target.value)}
          maxLength="1"
          pattern="\d"
          required
        />
      </div>
    ))}
  </div>
  {isCodeIncorrect && (
    <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.5rem' }}>
      Incorrect Code
    </div>
  )}
</div>

                ) : (
                  <input
                    type={field.type}
                    className="border p-3 rounded-lg"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    pattern={field.pattern}
                    required={field.required}
                  />
                )}
              </div>
            ))}
 <button type="submit" className={`bg-blue-400 text-white px-4 py-2 rounded-md mt-4 ${isFormValid ? '' : 'cursor-not-allowed opacity-50'}`} disabled={!isFormValid}>              Next
            </button>
            <div className="flex justify-center gap-1 pt-4">
              <p> Already have an account yet?</p>
              <Link to="/#">
                <span className="text-blue-700">Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
