import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true";

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");

        alert("You have been logged out.");

        navigate("/");
    };

    return (
        <header className="navbar">

            <div className="nav-container">

                <Link to="/" className="logo">
                    My Portfolio<span>.</span>
                </Link>

                <nav>

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/portfolio">
                        Portfolio
                    </Link>

                    <Link to="/blog">
                        Blog
                    </Link>

                    {isLoggedIn && (
                        <Link to="/create-post">
                            Create Post
                        </Link>
                    )}

                    {!isLoggedIn && (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/register">
                                Register
                            </Link>
                        </>
                    )}

                    {isLoggedIn && (
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}

                </nav>

            </div>

        </header>
    );
}

export default Navbar;