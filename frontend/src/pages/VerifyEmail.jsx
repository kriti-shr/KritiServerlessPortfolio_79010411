import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    CognitoUserPool,
    CognitoUser
} from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

function VerifyEmail() {

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState(
        location.state?.email || ""
    );

    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = (e) => {
        e.preventDefault();

        setError("");
        setMessage("");

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (!code.trim()) {
            setError("Please enter the verification code.");
            return;
        }

        setLoading(true);

        const user = new CognitoUser({
            Username: email.trim(),
            Pool: userPool
        });

        user.confirmRegistration(
            code.trim(),
            true,
            (err, result) => {
                setLoading(false);

                if (err) {
                    console.error(
                        "Verification error:",
                        err
                    );

                    setError(
                        err.message ||
                        "Verification failed. Please check the code."
                    );

                    return;
                }

                console.log(
                    "Email verification successful:",
                    result
                );

                setMessage(
                    "Email verified successfully! You can now login."
                );

                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        );
    };

    const handleResendCode = () => {

        setError("");
        setMessage("");

        if (!email.trim()) {
            setError("Please enter your email first.");
            return;
        }

        const user = new CognitoUser({
            Username: email.trim(),
            Pool: userPool
        });

        user.resendConfirmationCode((err, result) => {

            if (err) {
                console.error(
                    "Resend code error:",
                    err
                );

                setError(
                    err.message ||
                    "Unable to resend verification code."
                );

                return;
            }

            console.log(
                "Verification code resent:",
                result
            );

            setMessage(
                "A new verification code has been sent to your email."
            );
        });
    };

    return (
        <section className="page-section">
            <div className="section-container">

                <div className="section-heading">

                    <p className="small-title">
                        EMAIL VERIFICATION
                    </p>

                    <h2>Verify Your Email</h2>

                    <p>
                        Enter the verification code sent
                        to your email address.
                    </p>

                </div>

                <form
                    className="auth-form"
                    onSubmit={handleVerify}
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

                        <label htmlFor="code">
                            Verification Code
                        </label>

                        <input
                            id="code"
                            type="text"
                            value={code}
                            onChange={(e) =>
                                setCode(e.target.value)
                            }
                            placeholder="Enter verification code"
                            maxLength="6"
                            required
                        />

                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="success-message">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Verifying..."
                            : "Verify Email"}
                    </button>

                    <button
                        type="button"
                        className="secondary-btn"
                        onClick={handleResendCode}
                    >
                        Resend Verification Code
                    </button>

                </form>

            </div>
        </section>
    );
}

export default VerifyEmail;
