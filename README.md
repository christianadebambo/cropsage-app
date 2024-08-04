# CropSage

CropSage is a comprehensive web application designed to enhance food security in Nigeria by providing data-driven crop recommendations to farmers. Leveraging machine learning algorithms and real-time soil data analysis, CropSage aims to optimize crop selection and promote sustainable agricultural practices.

## Features

- **Personalized Crop Recommendations**: Based on soil data input by farmers
- **Historical Recommendations**: Access to past crop recommendations for trend analysis
- **Analytics Dashboard**: Visual representation of soil data and crop distribution
- **Sustainable Practices**: Tailored advice on sustainable farming techniques
- **Report Generation**: Downloadable PDF reports of crop recommendations
- **Educational Resources**: Access to farming best practices and agricultural knowledge

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **Cloud Services**: AWS (EC2, S3, Lambda)
- **Machine Learning**: Python with scikit-learn
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Nginx as reverse proxy, PM2 for process management

## Functions

1. **CropPredictionLambda**: Predicts the most suitable crop based on soil data.
2. **GenerateReportLambda**: Generates PDF reports of crop recommendations.

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/christianadebambo/cropsage-app.git
   cd cropsage-app
   
2. **Install dependencies:**
   ```bash
   npm install
   cd client && npm install
   
## Prerequisites and Service Setup

Before running the CropSage application, you need to set up several AWS services and a MongoDB cluster. Here are the steps to prepare your environment:

### Prerequisites

- AWS Account
- MongoDB Atlas Account
- Node.js (v14 or later)
- npm (v6 or later)
- AWS CLI (configured with your credentials)
- Docker

### MongoDB Cluster Setup

1. Create a MongoDB Atlas account if you don't have one.
2. Create a new cluster (M0 Sandbox cluster is sufficient for development).
3. In the Network Access tab, add your IP address or allow access from anywhere (for development only).
4. In the Database Access tab, create a new database user with read and write privileges.
5. Once your cluster is created, click on "Connect" and choose "Connect your application". Copy the connection string.

### AWS S3 Setup

1. Log in to your AWS Management Console.
2. Navigate to S3 and create two buckets:
   - One for storing the machine learning model (e.g, `cropsagemodelbucket`)
   - Another for storing generated reports (e.g, `cropsagereportsbucket`)
3. Note down the bucket names for later use in your `.env` file.

### AWS Lambda Setup

1. Navigate to AWS Lambda in your AWS Management Console.
2. Create two Lambda functions:
   - CropPredictionLambda
   - GenerateReportLambda
3. Note down the function names and ARNs for later use.

### Amazon ECR Setup

1. Navigate to Amazon ECR in your AWS Management Console.
2. Create two repositories:
   - One for the crop prediction Lambda (e.g, `cropsage-lambda`)
   - Another for the report generation Lambda (e.g, `cropsage-report-lambda`)
3. Note down the repository URIs for later use.

### Environment Variables

Create a `.env` file in the root directory of the project with the following variables:
```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_REPORT_BUCKET_NAME=your_report_bucket_name
S3_MODEL_BUCKET_NAME=your_model_bucket_name
CROP_PREDICTION_LAMBDA_ARN=your_crop_prediction_lambda_arn
GENERATE_REPORT_LAMBDA_ARN=your_generate_report_lambda_arn
```
Replace the placeholder values with your actual configuration details.

### Docker Image Build and Push

For each Lambda function, navigate to its directory (e.g, `cropsage-lambda` or `cropsage-report-lambda`), build and push the Docker image to ECR:

1. Build the image:
```bash
docker build -t your-ecr-repo-name .
```

2. Tag the image:
```bash
docker tag your-ecr-repo-name:latest your-account-id.dkr.ecr.your-region.amazonaws.com/your-ecr-repo-name:latest
```

3. Push to ECR:
```bash
docker push your-account-id.dkr.ecr.your-region.amazonaws.com/your-ecr-repo-name:latest
```

Repeat these steps for both Lambda functions, replacing `your-ecr-repo-name` with the appropriate repository names.

### Final Steps

After setting up all services and pushing your Docker images:
1. Update your Lambda functions to use the new container images from ECR.
2. Ensure all necessary IAM roles and policies are in place for your Lambda functions.
3. Update your application code with the correct ARNs and bucket names.

With these steps completed, your environment should be ready to run the CropSage application.

## Deployment

The application is deployed on an AWS EC2 instance. Key deployment steps include:

1. Launching an EC2 instance with Ubuntu Server
2. Setting up Node.js, npm, and other required software
3. Cloning the repository and installing dependencies
4. Configuring Nginx as a reverse proxy
5. Using PM2 for process management
6. Setting up HTTPS with a self-signed certificate

## Usage

1. Register an account or log in
2. Input soil data on the Soil Data page
3. Receive personalized crop recommendations and sustainable farming practices
4. View historical recommendations and analytics
5. Access educational resources
