import { useState } from "react";
import axios from "axios";
import { useNavigate ,Link} from "react-router-dom";

function RegisterComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");

    const navigate = useNavigate();

    const register = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/auth/register",
                {
                    username,
                    password,
                    role
                }
            );

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert("Registration Failed");
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-header text-center">
                            <h3>Register</h3>
                        </div>

                        <div className="card-body">

                            <form onSubmit={register}>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
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
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <select
                                        className="form-select"
                                        value={role}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    >
                                        <option value="USER">
                                            USER
                                        </option>

                                        <option value="ADMIN">
                                            ADMIN
                                        </option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >
                                    Register
                                </button>
                                <div className="text-center mt-3">

                                    <span>
                                        Already have an account?
                                    </span>

                                    <Link
                                        to="/login"
                                        className="ms-2"
                                    >
                                        Login
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

export default RegisterComponent;