import React, { useState } from 'react'
import { savedEmployee, updateDataEmployee, editEmployee } from '../service/EmployeeService'
import '../style/employeeform.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

function EmployeeComponent() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const navigate = useNavigate()
    const { id } = useParams()
    function validateForm() {

        let valid = true;

        const errorsCopy = {
            firstName: '',
            lastName: '',
            email: ''
        }

        if (!firstName.trim()) {
            errorsCopy.firstName = "First Name is required";
            valid = false;
        }

        if (!lastName.trim()) {
            errorsCopy.lastName = "Last Name is required";
            valid = false;
        }

        if (!email.trim()) {
            errorsCopy.email = "Email is required";
            valid = false;
        } else {

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                errorsCopy.email = "Invalid Email Format";
                valid = false;
            }
        }

        setErrors(errorsCopy);

        return valid;
    }


    function pageTitle() {
        if (id) {
            return <h4 className='title'>Update Employees</h4>
        } else {
            return <h4 className='title'>Add Employees</h4>
        }
    }

    useEffect(() => {
        if (id) {
            editEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            })
        }
    }, [id])

    function saveEmployee(e) {
        e.preventDefault()

        const employee = { firstName, lastName, email }
        if (!validateForm()) {
            return;
        }



        if (id) {
            updateDataEmployee(id, employee).then((response) => {
                navigate('/')
            }).catch(error => {
                console.error(error);
            })

        } else {
            savedEmployee(employee).then((response) => {
                navigate('/')
            }).catch(error => {
                console.error(error);
            })

        }
    }

    return (
        <>
            <div className='st-ba'>
                <div className='container d-flex justify-content-center align-items-center '>
                    <div className="text-center card card-top" >
                        <div className='card-head'>
                            {
                                pageTitle()
                            }
                        </div>
                        <div className="card-body">
                            <form action="">
                                <div className='form-group mb-3'>
                                    <input
                                        type="text"
                                        placeholder='Enter FirstName'
                                        value={firstName}
                                        className={`form-control ${
                                            errors.firstName ? 'is-invalid' : ''
                                        }`}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />

                                    <div className="invalid-feedback">
                                        {errors.firstName}
                                    </div>
                                </div>
                                <div className='form-group mb-3'>
                                    <input
                                        type="text"
                                        placeholder='Enter LastName'
                                        value={lastName}
                                        className={`form-control ${
                                            errors.lastName ? 'is-invalid' : ''
                                        }`}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />

                                    <div className="invalid-feedback">
                                        {errors.lastName}
                                    </div>
                                </div>
                                <div className='form-group mb-3'>
                                    <input
                                        type="text"
                                        placeholder='Enter Email'
                                        value={email}
                                        className={`form-control ${
                                            errors.email ? 'is-invalid' : ''
                                        }`}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <div className="invalid-feedback">
                                        {errors.email}
                                    </div>
                                </div>
                                <button className='btn btn-success' onClick={saveEmployee}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeComponent