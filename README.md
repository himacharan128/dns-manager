# DNS Manager
## Overview
DNS Manager is a web application for managing DNS records on AWS Route 53 using the MERN stack designed to manage DNS records conveniently. It provides users with a user-friendly interface to add, delete, and view DNS records for different domains. The application is split into frontend and backend components, allowing for seamless interaction and management of DNS records.
## Key Features
- Add DNS records for various domains.
- Delete existing DNS records.
- View a dashboard with visual representations of domain and record type distributions.
- Bulk upload DNS records from JSON or CSV files. sample files
```
  https://github.com/himacharan128/dns-manager/blob/main/doc.json
  https://github.com/himacharan128/dns-manager/blob/main/Untitled.csv
```
## File Structure
   ```
dns-manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── dnsController.js
│   │   └── authController.js
│   ├── models/
│   │   ├── DnsRecord.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── dnsRoutes.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── awsRoute53.js
│   ├── server.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── Homepage.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── NavBar.js
│   │   │   ├── DnsRecordTable.js
│   │   │   ├── DnsRecordForm.js
│   │   │   └── Notification.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   │       └── styles.css
├──-├--- package.json
└──----- README.md
   ```
## Data and APIs

The application interacts with a backend API hosted at https://dns-manager-nnrh.onrender.com/. It utilizes various endpoints to perform CRUD operations on DNS records. The API documentation can be found here.

## Components
- Dashboard: Main page displaying DNS records and dashboard statistics.
- DnsRecordForm: Form component for adding DNS records.
- DnsRecordTable: Table component for displaying DNS records.
- Modal: Reusable modal component for displaying graphs.
- Notification: Component for displaying notifications.
- Loading: Component for displaying loading indicator.
- NavBar: Navigation bar component.

## Pages
- Homepage: Landing page with options to login or register.
- Login: Page for user authentication.
- Register: Page for user registration.
- Dashboard: Main dashboard page displaying DNS records and statistics.

## Installation and Local Development
Clone the repository: 
   ```
    git clone https://github.com/himacharan128/dns-manager.git
   ```
Navigate to the project directory:
   ```
    cd dns-manager
   ```
Install dependencies: 
   ```
    npm install
   ```
Create a .env file in the backend directory with the following content:
   ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    AWS_REGION=your_aws_region
    AWS_HOSTED_ZONE_ID=your_aws_hosted_zone_id
   ```
Start the development server: 
   ```
   npm start
   ```
Open your browser and navigate to http://localhost:3000
## Deployment
- Frontend Hosting:
   ```
  https://dns-manager-bay.vercel.app/
  ```
- Backend Hosting:
   ```
  https://dns-manager-nnrh.onrender.com/
  ```

## Features
- Conveniently add, delete, and manage DNS records.
- Visual representation of domain and record type distributions.
- Secure user authentication and registration.

## Technologies Used
- AWS Route 53
- React
- MongoBD
- Express
- Chart.js
- Axios
- React Router
- Vercel (Frontend Hosting)
- Render (Backend Hosting)
## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.
## License

This project is licensed under the MIT License.
