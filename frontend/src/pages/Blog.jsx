import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function Blog() {

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Get blog posts from AWS API Gateway
    useEffect(() => {

        const fetchPosts = async () => {

            try {

                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error("Failed to fetch blog posts.");
                }

                const data = await response.json();

                setPosts(data);

            } catch (error) {

                console.error("Error fetching posts:", error);

                setError(
                    "Unable to load blog posts. Please try again."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchPosts();

    }, []);


    // Check login before creating a post
    const handleCreatePost = () => {

        const isLoggedIn =
            localStorage.getItem("isLoggedIn") === "true";

        if (!isLoggedIn) {

            alert(
                "Please login first to create a blog post."
            );

            navigate("/login");

            return;
        }

        navigate("/create-post");
    };


    return (
        <section className="page-section">

            <div className="section-container">

                <div className="section-heading">

                    <p className="small-title">
                        MY ARTICLES
                    </p>

                    <h2>
                        Blog Posts
                    </h2>

                    <p>
                        Read my latest articles about
                        cloud computing and technology.
                    </p>


                    {/* CREATE POST BUTTON */}

                    <button
                        className="primary-btn create-blog-btn"
                        onClick={handleCreatePost}
                    >
                        + Create New Post
                    </button>

                </div>


                {/* LOADING MESSAGE */}

                {loading && (
                    <p>
                        Loading blog posts...
                    </p>
                )}


                {/* ERROR MESSAGE */}

                {error && (
                    <p>
                        {error}
                    </p>
                )}


                {/* BLOG POSTS */}

                {!loading && !error && (

                    <div className="blog-grid">

                        {posts.length === 0 ? (

                            <p>
                                No blog posts available yet.
                            </p>

                        ) : (

                            posts.map((post) => (

                                <article
                                    className="blog-card"
                                    key={post.id}
                                >

                                    <h3>
                                        {post.title}
                                    </h3>


                                    <p className="post-date">

                                        {post.createdAt
                                            ? new Date(
                                                post.createdAt
                                            ).toLocaleDateString(
                                                "en-US",
                                                {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                }
                                            )
                                            : ""
                                        }

                                    </p>


                                    <p>
                                        {post.content}
                                    </p>


                                    <div className="author">

                                        Written by{" "}
                                        {post.author}

                                    </div>

                                </article>

                            ))

                        )}

                    </div>

                )}

            </div>

        </section>
    );
}

export default Blog;
