
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const API_URL = import.meta.env.VITE_API_URL;

const poolData = {
    UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

function CreatePost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!title.trim() || !content.trim()) {
            setError("Please enter both a title and content.");
            return;
        }

        setLoading(true);

        try {
            const currentUser = userPool.getCurrentUser();

            if (!currentUser) {
                setError("You are not logged in. Please login first.");
                setLoading(false);
                navigate("/login");
                return;
            }

            currentUser.getSession(async (err, session) => {
                if (err) {
                    console.error("Cognito session error:", err);

                    setError(
                        "Your login session has expired. Please login again."
                    );

                    setLoading(false);
                    navigate("/login");
                    return;
                }

                if (!session || !session.isValid()) {
                    setError(
                        "Your login session is no longer valid. Please login again."
                    );

                    setLoading(false);
                    navigate("/login");
                    return;
                }

                // Use the Cognito ID token.
                // API Gateway is configured to validate the "aud" claim.
                const idToken =
                    session.getIdToken().getJwtToken();

                // --------------------------------------------------
                // SAFE JWT DEBUGGING
                // This does NOT print the actual JWT/token.
                // --------------------------------------------------
                console.log(
                    "JWT parts:",
                    idToken.split(".").length
                );

                try {
                    const header = JSON.parse(
                        atob(idToken.split(".")[0])
                    );

                    const payload = JSON.parse(
                        atob(idToken.split(".")[1])
                    );

                    console.log("JWT header:", {
                        alg: header.alg,
                        kid: header.kid
                    });

                    console.log("JWT claims:", {
                        iss: payload.iss,
                        aud: payload.aud,
                        token_use: payload.token_use,
                        exp: payload.exp,
                        iat: payload.iat
                    });
                } catch (decodeError) {
                    console.error(
                        "JWT decode failed:",
                        decodeError
                    );
                }

                try {
                    const response = await fetch(
                        API_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json",
                                "Authorization":
                                    `Bearer ${idToken}`
                            },

                            body: JSON.stringify({
                                title: title.trim(),
                                content: content.trim()
                            })
                        }
                    );

                    const responseText =
                        await response.text();

                    let data = {};

                    try {
                        data = responseText
                            ? JSON.parse(responseText)
                            : {};
                    } catch {
                        data = {
                            message: responseText
                        };
                    }

                    if (!response.ok) {
                        const wwwAuthenticate =
                            response.headers.get(
                                "www-authenticate"
                            );

                        console.error(
                            "API error:",
                            response.status,
                            data
                        );

                        console.error(
                            "WWW-Authenticate:",
                            wwwAuthenticate
                        );

                        console.error(
                            "API URL:",
                            API_URL
                        );

                        if (response.status === 401) {
                            setError(
                                "Unauthorized. API Gateway rejected the Cognito ID token."
                            );
                        } else {
                            setError(
                                data.message ||
                                `Request failed with status ${response.status}.`
                            );
                        }

                        setLoading(false);
                        return;
                    }

                    console.log(
                        "Post created successfully:",
                        data
                    );

                    alert(
                        "Blog post created successfully!"
                    );

                    setTitle("");
                    setContent("");

                    setLoading(false);
                    navigate("/blog");
                } catch (fetchError) {
                    console.error(
                        "Network/API error:",
                        fetchError
                    );

                    setError(
                        "Unable to connect to the blog API."
                    );

                    setLoading(false);
                }
            });
        } catch (unexpectedError) {
            console.error(
                "Unexpected error:",
                unexpectedError
            );

            setError(
                "Something went wrong. Please try again."
            );

            setLoading(false);
        }
    };

    return (
        <section className="page-section">
            <div className="section-container">

                <div className="section-heading">
                    <p className="small-title">
                        CREATE ARTICLE
                    </p>

                    <h2>
                        Create New Blog Post
                    </h2>

                    <p>
                        Share your thoughts about cloud
                        computing and technology.
                    </p>
                </div>

                <form
                    className="blog-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="title">
                            Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="Enter your blog title"
                            maxLength="120"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">
                            Content
                        </label>

                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            placeholder="Write your blog post..."
                            rows="8"
                            maxLength="10000"
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
                            ? "Publishing..."
                            : "Publish Post"}
                    </button>
                </form>

            </div>
        </section>
    );
}

export default CreatePost;

