import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails
} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setLoading(true);

        const authenticationData = {
            Username: email.trim(),
            Password: password
        };

        const authenticationDetails =
            new AuthenticationDetails(authenticationData);

        const cognitoUser = new CognitoUser({
            Username: email.trim(),
            Pool: userPool
        });

        cognitoUser.authenticateUser(
            authenticationDetails,
            {
                onSuccess: (session) => {

                    console.log(
                        "Login successful:",
                        session
                    );

                    localStorage.setItem(
                        "isLoggedIn",
                        "true"
                    );

                    localStorage.setItem(
                        "currentUser",
                        email.trim()
                    );

                    navigate("/");
                },

                onFailure: (err) => {

                    console.error(
                        "Cognito login error:",
                        err
                    );

                    setError(
                        err.message ||
                        "Login failed. Please check your email and password."
                    );

                    setLoading(false);
                }
            }
        );
    };

    return (
        <section className="page-section">

            <div className="section-container">

                <div className="section-heading">

                    <p className="small-title">
                        WELCOME BACK
                    </p>

                    <h2>Login</h2>

                    <p>
                        Login to create and publish blog posts.
                    </p>

                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

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

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

            </div>

        </section>
    );
}

export default Login;