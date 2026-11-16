import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">

                    <p className="small-title">
                        CLOUD COMPUTING PROJECT
                    </p>

                    <h1>
                        Hello, I'm <span>Kriti Shrestha</span>
                    </h1>

                    <p className="hero-description">
                        A Computer Science student interested in
                        web development, cloud computing, and
                        modern technologies.
                    </p>

                    <div className="hero-buttons">
                        <Link
                            to="/portfolio"
                            className="primary-btn"
                        >
                            View My Portfolio
                        </Link>

                        <Link
                            to="/blog"
                            className="secondary-btn"
                        >
                            Read My Blog
                        </Link>
                    </div>

                </div>
            </section>


            {/* About Me */}
            <section className="page-section">
                <div className="section-container">

                    <div className="section-heading">
                        <p className="small-title">
                            ABOUT ME
                        </p>

                        <h2>About Me</h2>
                    </div>

                    <div className="about-content">

                        <p>
                            Hello! I'm <strong>Kriti Shrestha</strong>,
                            a Computer Science student interested in
                            web development and cloud computing.
                        </p>

                        <p>
                            I enjoy learning new technologies and
                            building practical applications. I am
                            particularly interested in AWS and
                            serverless application development.
                        </p>

                    </div>

                </div>
            </section>


            {/* My Skills */}
           <section className="page-section">
                <div className="section-container">
                    <div className="section-heading">
                        <p className="small-title">MY SKILLS</p>
                        <h2>My Skills</h2>
                    </div>

                    <div className="skills-grid">

                        <div className="skill-card">
                            <h3>React</h3>
                            <p>
                                Building interactive and reusable user interfaces.
                            </p>
                        </div>

                        <div className="skill-card">
                            <h3>JavaScript</h3>
                            <p>
                                Developing interactive web applications and
                                handling application logic.
                            </p>
                        </div>

                        <div className="skill-card">
                            <h3>HTML & CSS</h3>
                            <p>
                                Creating structured, responsive, and user-friendly
                                web pages.
                            </p>
                        </div>

                        <div className="skill-card">
                            <h3>Node.js</h3>
                            <p>
                                Developing backend applications using
                                server-side JavaScript.
                            </p>
                        </div>

                        <div className="skill-card">
                            <h3>AWS</h3>
                            <p>
                                Learning serverless application deployment using
                                AWS cloud services.
                            </p>
                        </div>

                        <div className="skill-card">
                            <h3>MongoDB</h3>
                            <p>
                                Working with databases to store, manage, and
                                retrieve application data.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;