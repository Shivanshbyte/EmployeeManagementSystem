import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function LoginComponent() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const login = async (e) => {

        e.preventDefault();

        try{

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    username,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );
        localStorage.setItem(
            "role",
            response.data.role
        );

            navigate("/");
        }
        catch(error){

            console.error(error);

            alert("Invalid Credentials");
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-header text-center">
                            <h3>Login</h3>
                        </div>

                        <div className="card-body">

                            <form onSubmit={login}>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>

                                <div className="text-center mt-3">
                                    <span>
                                        Don't have an account?
                                    </span>

                                    <Link
                                        to="/register"
                                        className="ms-2"
                                    >
                                        Register
                                    </Link>
                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default LoginComponent;