import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    CognitoUserPool
} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [terms, setTerms] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {

        e.preventDefault();

        setError("");

        // Check password
        if (password.length < 8) {

            setError(
                "Password must be at least 8 characters."
            );

            return;
        }

        // Check password match
        if (password !== confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;
        }

        // Check terms
        if (!terms) {

            setError(
                "Please accept the terms and conditions."
            );

            return;
        }

        setLoading(true);

        userPool.signUp(
            email,
            password,
            [
                {
                    Name: "email",
                    Value: email
                },
                {
                    Name: "name",
                    Value: name
                }
            ],
            null,
            (err, result) => {

                setLoading(false);

                if (err) {

                    console.error(
                        "Cognito registration error:",
                        err
                    );

                    setError(
                        err.message ||
                        "Registration failed."
                    );

                    return;
                }

                console.log(
                    "Registration successful:",
                    result
                );

                alert(
                    "Registration successful! Please check your email for the verification code."
                );

                navigate("/verify-email", {
                    state: {
                        email: email
                    }
                });
                }
        );
    };


    return (
        <section className="page-section">

            <div className="section-container">

                <div className="section-heading">

                    <p className="small-title">
                        CREATE ACCOUNT
                    </p>

                    <h2>
                        Register
                    </h2>

                    <p>
                        Create an account to publish
                        blog posts.
                    </p>

                </div>


                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* NAME */}

                    <div className="form-group">

                        <label htmlFor="name">
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your name"
                            required
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            required
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                            required
                        />

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <div className="form-group">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm your password"
                            required
                        />

                    </div>


                    {/* TERMS */}

                    <div className="form-group">

                        <label>

                            <input
                                type="checkbox"
                                checked={terms}
                                onChange={(e) =>
                                    setTerms(
                                        e.target.checked
                                    )
                                }
                            />

                            {" "}
                            I agree to the terms and
                            conditions.

                        </label>

                    </div>


                    {/* ERROR */}

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Register"
                        }

                    </button>

                </form>

            </div>

        </section>
    );
}

export default Register;
