function Portfolio() {
    return (
        <section className="page-section">

            <div className="section-container">

                <div className="section-heading">

                    <p className="small-title">
                        ABOUT ME
                    </p>

                    <h2>
                        My Portfolio
                    </h2>

                    <p>
                        A simple portfolio showcasing my
                        background, skills and cloud project.
                    </p>

                </div>


                <div className="portfolio-grid">

                    <div className="info-card">

                        <div className="card-icon">
                            👤
                        </div>

                        <h3>
                            Personal Information
                        </h3>

                        <p>
                            <strong>Name:</strong>{" "}
                            Kriti Shrestha
                        </p>

                        <p>
                            <strong>Student ID:</strong>{" "}
                            79010411
                        </p>

                        <p>
                            <strong>Field:</strong>{" "}
                            Computer Science
                        </p>

                    </div>


                    <div className="info-card">

                        <div className="card-icon">
                            💻
                        </div>

                        <h3>
                            Skills
                        </h3>

                        <div className="skills">

                            <span>HTML</span>
                            <span>CSS</span>
                            <span>JavaScript</span>
                            <span>React</span>
                            <span>Node.js</span>
                            <span>AWS</span>

                        </div>

                    </div>


                    <div className="info-card">

                        <div className="card-icon">
                            ☁️
                        </div>

                        <h3>
                            AWS Technologies
                        </h3>

                        <p>Amazon S3</p>
                        <p>AWS Lambda</p>
                        <p>Amazon DynamoDB</p>
                        <p>Amazon Cognito</p>
                        <p>API Gateway</p>
                        <p>CloudWatch</p>

                    </div>


                    <div className="info-card">

                        <div className="card-icon">
                            🚀
                        </div>

                        <h3>
                            Current Project
                        </h3>

                        <p>
                            Serverless Portfolio & Blog Platform
                        </p>

                        <p className="muted">
                            A cloud-based web application
                            developed using AWS serverless
                            services.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Portfolio;