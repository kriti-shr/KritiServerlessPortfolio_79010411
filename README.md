# Serverless Portfolio & Blog Platform on AWS

A serverless web application that combines a personal portfolio and blog platform using AWS cloud services. The application allows visitors to view portfolio information and public blog posts, while authenticated users can create new blog posts securely.

The project was developed as an individual cloud deployment project using AWS serverless technologies and infrastructure as code with AWS SAM/CloudFormation.

## 🌐 Live Demo

**Live Website:**
http://serverless-portfolio-kriti-79010411.s3-website-us-east-1.amazonaws.com

## 👩‍💻 Student Information

* **Name:** Kriti Shrestha
* **Student ID:** 79010411
* **Project:** Serverless Portfolio & Blog Platform
* **Cloud Platform:** Amazon Web Services (AWS)
* **Region:** US East (N. Virginia)

## 📌 Project Overview

The **Serverless Portfolio & Blog Platform** is a cloud-based web application designed to demonstrate how multiple AWS services can work together to build and deploy a modern serverless application without managing traditional servers.

The frontend is developed using **React** and hosted on **Amazon S3**. Backend operations are handled using **Amazon API Gateway** and **AWS Lambda**, while blog posts are stored in **Amazon DynamoDB**.

User authentication and authorization are managed using **Amazon Cognito**. **Amazon CloudWatch** is used for monitoring and viewing Lambda execution logs, while **AWS SAM/CloudFormation** is used to define and deploy the serverless infrastructure.

## ✨ Features

### Portfolio

* Personal introduction
* About/profile information
* Skills and technologies
* Project information
* Responsive user interface

### Blog

* Public blog listing
* View blog post details
* Display author and publication date
* Create new blog posts
* Automatic post timestamping
* Posts stored in DynamoDB

### Authentication

* User registration
* Email verification
* User login
* Cognito-based authentication
* JWT-based authorization for protected API requests

### Cloud Deployment

* React frontend hosted on Amazon S3
* REST-style API endpoints through API Gateway
* Serverless backend using AWS Lambda
* No traditional server management
* Infrastructure deployment using AWS SAM/CloudFormation
* Lambda monitoring through CloudWatch

## ☁️ AWS Services Used

| AWS Service                  | Purpose                                        |
| ---------------------------- | ---------------------------------------------- |
| **Amazon S3**                | Hosts the React frontend and static website    |
| **AWS Lambda**               | Processes backend requests and blog operations |
| **Amazon API Gateway**       | Provides HTTP API endpoints                    |
| **Amazon DynamoDB**          | Stores blog posts                              |
| **Amazon Cognito**           | Handles user registration and authentication   |
| **Amazon CloudWatch**        | Provides Lambda logs and monitoring            |
| **AWS SAM / CloudFormation** | Defines and deploys serverless infrastructure  |

## 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │        User          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Amazon S3       │
                         │   React Frontend     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    API Gateway       │
                         │      HTTP API        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     AWS Lambda       │
                         │    PostsFunction     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    DynamoDB Table    │
                         │      Blog Posts      │
                         └──────────────────────┘

             ┌──────────────────────┐
             │   Amazon Cognito     │
             │ Authentication/JWT  │
             └──────────┬───────────┘
                        │
                        ▼
                  API Gateway

             ┌──────────────────────┐
             │    CloudWatch        │
             │  Lambda Monitoring   │
             └──────────────────────┘

             ┌──────────────────────┐
             │ AWS SAM / CloudFormation │
             │ Infrastructure as Code │
             └──────────────────────┘
```

## 🔄 Application Workflow

### Public User

```text
User
  ↓
S3-hosted React Website
  ↓
Blog Page
  ↓
API Gateway
  ↓
Lambda
  ↓
DynamoDB
  ↓
Blog Posts
```

### Authenticated User

```text
User
  ↓
Login/Register
  ↓
Amazon Cognito
  ↓
JWT ID Token
  ↓
Create Blog Post
  ↓
API Gateway
  ↓
Lambda
  ↓
DynamoDB
```

## 📂 Project Structure

```text
ServerlessPortfolio_KritiBhasima_79010411/
│
├── backend/
│   └── functions/
│       └── posts/
│           ├── app.js
│           └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   └── VerifyEmail.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── template.yaml
├── .gitignore
└── README.md
```

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* JavaScript
* CSS
* React Router
* Amazon Cognito Identity SDK

### Backend

* Node.js
* AWS Lambda
* AWS SDK for JavaScript
* DynamoDB

### Cloud

* Amazon S3
* Amazon API Gateway
* Amazon Cognito
* Amazon DynamoDB
* AWS Lambda
* Amazon CloudWatch
* AWS SAM
* AWS CloudFormation

## 🚀 Deployment

### 1. Deploy the AWS infrastructure

From the project root:

```bash
sam build
sam deploy --guided
```

The SAM template creates the S3 bucket, DynamoDB table, Cognito User Pool, API Gateway, Lambda function, and required permissions.

### 2. Configure the frontend

Copy the `ApiUrl`, `CognitoUserPoolId`, and `CognitoClientId` values printed by the SAM deployment into `frontend/.env`:

```env
VITE_API_URL=https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com/posts
VITE_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_COGNITO_CLIENT_ID=YOUR_CLIENT_ID
```

Then build the React application:

```bash
cd frontend
npm install
npm run build
```

### 3. Upload the frontend to S3

From the `frontend` directory:

```bash
aws s3 sync dist/ s3://serverless-portfolio-kriti-79010411/
```

The deployed website URL is available in the SAM `WebsiteURL` output.

## 🔐 Authentication

Amazon Cognito is used to provide secure user authentication.

The authentication flow is:

```text
Register
   ↓
Email Verification
   ↓
Login
   ↓
Cognito Authentication
   ↓
JWT Token
   ↓
Protected API Request
   ↓
API Gateway JWT Authorizer
   ↓
AWS Lambda
```

Only authenticated users can create blog posts, while blog posts can be viewed publicly.

## 🗄️ Database

Blog posts are stored in an Amazon DynamoDB table.

Each post contains information such as:

```text
id
title
content
author
authorEmail
createdAt
```

The application retrieves posts from DynamoDB and displays them through the React frontend.

## 📊 Monitoring

Amazon CloudWatch is used to monitor the Lambda backend.

CloudWatch provides:

* Lambda execution logs
* Error information
* Request information
* Runtime monitoring

This helps identify and troubleshoot backend problems during development and deployment.

## 🧪 Testing

The application was tested for the following workflows:

* ✅ Portfolio page loading
* ✅ Blog page loading
* ✅ User registration
* ✅ Email verification
* ✅ User login
* ✅ Authenticated blog post creation
* ✅ Public blog post viewing
* ✅ DynamoDB data storage
* ✅ API Gateway requests
* ✅ Lambda execution
* ✅ S3 website hosting
* ✅ CORS configuration
* ✅ Production deployment

## 🧩 Challenges and Solutions

### API Authentication Error

During development, the protected `POST /posts` API initially returned a `401 Unauthorized` response.

The issue was related to the API Gateway JWT authorizer's `IdentitySource` configuration.

After correcting the configuration and redeploying the SAM stack, authenticated requests were successfully processed.

This helped demonstrate the relationship between:

```text
Cognito
   ↓
JWT Token
   ↓
API Gateway Authorizer
   ↓
Lambda
```

## 🎯 Learning Outcomes

Through this project, I gained practical experience in:

* Deploying React applications on AWS
* Building serverless applications
* Using AWS Lambda
* Creating APIs with API Gateway
* Working with DynamoDB
* Implementing authentication using Cognito
* Monitoring applications with CloudWatch
* Using AWS SAM and CloudFormation
* Configuring CORS
* Deploying cloud applications using AWS services
* Understanding serverless architecture

## 🔮 Future Improvements

Possible future enhancements include:

* Edit and delete blog posts
* Blog categories and tags
* Search and filtering
* Image upload using Amazon S3
* Rich text editor
* Pagination for blog posts
* User profile management
* Custom domain with HTTPS
* Improved responsive design
* Additional CloudWatch monitoring and alarms

## 📜 License

This project was developed for academic and educational purposes.

## 👩‍💻 Author

**Kriti Bhasima**
Student ID: **79010411**

**Serverless Portfolio & Blog Platform — AWS Cloud Deployment Project**
