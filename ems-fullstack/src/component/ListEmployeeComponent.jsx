import React, { useState, useEffect } from 'react'
import { listEmployees, deleteEmployee,searchEmployees } from '../service/EmployeeService.js'
import { useNavigate } from 'react-router-dom'


function ListEmployeeComponent() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const [employee, setEmployee] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState('')
    const [page,setPage] = useState(0);
    const [size] = useState(8);
    const [totalPages,setTotalPages] = useState(0);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });



   useEffect(()=>{

       const timeout = setTimeout(()=>{

           getAllEmployee()

       },500)
console.log("employee state:", employee);
console.log("totalPages:", totalPages);
       return ()=>clearTimeout(timeout)

   },[page,searchKeyword])



    function getAllEmployee() {

        setLoading(true);

        if (searchKeyword.trim() !== '') {

            searchEmployees(
                searchKeyword,
                page,
                size
            )
                .then((response) => {

                    setEmployee(response.data.content);

                    setTotalPages(
                        response.data.totalPages
                    );

                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);
                });

            return;
        }

        listEmployees(page, size)
            .then((response) => {

                setEmployee(response.data.content);

                setTotalPages(
                    response.data.totalPages
                );

            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }




    function addNewEmployee() {
        navigate('/add-employee')
    }
    function updatehandler(id) {
        navigate(`/update-employee/${id}`)
    }
    function deletehandler(id) {
        deleteEmployee(id).then((response) => {
            getAllEmployee()
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <>
            <div className='container'>
                <h3 className='text-center mt-3'>List Of Employees</h3>
               <div className='d-flex justify-content-between mb-3'>

                   <button
                       className="btn btn-danger"
                       onClick={() => {
                           if (role === "USER") return;
                           addNewEmployee();
                       }}
                       title={
                           role === "USER"
                               ? "Admin access required"
                               : ""
                       }
                       style={{
                           opacity: role === "USER" ? 0.65 : 1,
                           cursor: role === "USER"
                               ? "not-allowed"
                               : "pointer"
                       }}
                   >
                       Add Employee
                   </button>

                   <input
                       type='text'
                       className='form-control w-25'
                       placeholder='Search Employee...'
                       value={searchKeyword}
                       onChange={(e) => {
                           setSearchKeyword(e.target.value)
                           setPage(0)
                       }}
                   />

               </div>
                <table className='table table-success table-striped table-bordered table-hover'>
                    <thead>
                        <tr className='text-center'>
                            <th scope="col">Id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope='col'>Update</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                        loading ? (

                            [...Array(8)].map((_, index) => (
                                <tr key={index}>

                                    <td>
                                        <div className="placeholder-glow">
                                            <span className="placeholder col-12"></span>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="placeholder-glow">
                                            <span className="placeholder col-12"></span>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="placeholder-glow">
                                            <span className="placeholder col-12"></span>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="placeholder-glow">
                                            <span className="placeholder col-12"></span>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="placeholder-glow">
                                            <span className="placeholder col-12"></span>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="placeholder-glow">
                                            <span className="placeholder col-12"></span>
                                        </div>
                                    </td>

                                </tr>
                            ))

                        ) : (

                            employee?.map(item =>
                                <tr key={item.id} className='text-center'>
                                    <td>{item.id}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>

                                    <td>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => {
                                                if (role === "USER") return;
                                                updatehandler(item.id);
                                            }}
                                            title={
                                                role === "USER"
                                                    ? "Admin access required"
                                                    : ""
                                            }
                                            style={{
                                                opacity: role === "USER" ? 0.65 : 1,
                                                cursor: role === "USER"
                                                    ? "not-allowed"
                                                    : "pointer"
                                            }}
                                        >
                                            Update
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                if (role === "USER") return;
                                                deletehandler(item.id);
                                            }}
                                            title={
                                                role === "USER"
                                                    ? "Admin access required"
                                                    : ""
                                            }
                                            style={{
                                                opacity: role === "USER" ? 0.65 : 1,
                                                cursor: role === "USER"
                                                    ? "not-allowed"
                                                    : "pointer"
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )

                        )
                    }

                    </tbody>
                </table>
                {totalPages > 0 && (
                    <div className='d-flex justify-content-end gap-3 mt-3'>

                        <button
                            className='btn btn-secondary'
                            disabled={page === 0}
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>

                        <span className='mt-2'>
                            Page {page + 1} of {totalPages}
                        </span>

                        <button
                            className='btn btn-secondary'
                            disabled={page >= totalPages - 1}
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>

                    </div>
                )}
            </div>
        </>
    )
}

export default ListEmployeeComponent