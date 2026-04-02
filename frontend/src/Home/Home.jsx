import React from 'react'
import './home.css'
import Header from '../../components/Header/Header'
import SignIn from '../../components/customerLogin/customerLogin'
import CategorySec from '../../components/CategorySec/CategorySec'
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm'

const Home = ({ registrationFormRef }) => {
  return (
    <>
      <Header />
      <CategorySec />
      {/* <RegistrationForm formRef={registrationFormRef} /> */}

    </>
  )

}
export default Home