import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../../../Common/Title'
import Button from '../../../Common/Button'
import Error from '../../Components/Error'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../../features/auth/authActions'


const Registration = () => {
    const [customError, setCustomError] = useState(null)

    const { error, success } = useSelector(
        (state) => state.auth
    )
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()


    useEffect(() => {
        // redirect user to login page if registration was successful
        if (success) navigate('/login')
    }, [navigate, success])

    const submitForm = (data) => {
        // check if passwords match
        if (data.password !== data.confirmPassword) {
            setCustomError('Password mismatch')
            return
        }
        data.email = data.email.toLowerCase()

        dispatch(registerUser(data))
    }

    
  const loginHandler = () => {

  }

    return (
        <div className='mt-5 pt-5 pb-3' style={{ background: "#E6E6E6", borderBottom: "1px solid #ccc" }}>
            <div className='row py-5 '>
                <div className='col-lg-6 offset-lg-3 bg-light shadow-lg'>
                    <div className='row'>
                        <div className='col-lg-6 bg-secondary d-flex justify-content-center align-items-center'>
                            <form onSubmit={handleSubmit(submitForm)}>
                                <Title title="Create account" cssClass="text-start text-dark mb-4 fs-4" />
                                <div className='mb-3'>
                                    {error && <Error>{error}</Error>}
                                    {customError && <Error>{customError}</Error>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label text-white fw-normal"  >User name</label>
                                    <input type="text" name="userName"  {...register('userName')} required className="form-control bg-secondary" id="userName" aria-describedby="emailHelp" />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-white fw-normal">Email</label>
                                    <input type="email"  {...register('email')} required name="email" className="form-control bg-secondary" id="email" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="signPassord" className="form-label text-white fw-normal">Password</label>
                                    <input type="password" {...register('password')} required name="password" className="form-control bg-secondary" id="signPassord" />
                                    <small className="text-white">Passwords must be at least 6 characters.</small>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="signPassordRe" className="form-label text-white fw-normal">Re-enter password</label>
                                    <input type="password" {...register('confirmPassword')} required name="confirmPassword" className="form-control bg-secondary" id="signPassordRe" />
                                </div>
                                {/* <div className="mb-3 form-check">
                      <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                  </div> */}
                                <div className="d-grid gap-2">
                                    <Button type="submit" cssClass="btn btn-lg btn-dark" handlerChange={loginHandler} label="Create" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration