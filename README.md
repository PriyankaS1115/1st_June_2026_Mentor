# Query Management System - Complete Setup Guide

## 📋 Project Overview

This is a comprehensive **Query Management System** built with Node.js, Express, and Azure Cosmos DB. It supports three distinct roles:
- **Mentee**: Submit and track queries
- **Mentor**: Assign meeting slots, provide resolutions
- **Admin**: Manage queries, assign mentors, track analytics, and generate reports

---

## 🚀 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Azure Cosmos DB (NoSQL)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Professional responsive design
- **JavaScript**: Vanilla JS (no dependencies required)

---

## 📦 Prerequisites

Before starting, ensure you have:
1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **Azure Account** with Cosmos DB instance - [Create Account](https://azure.microsoft.com/)
3. **VS Code** - [Download](https://code.visualstudio.com/)
4. **Git** (optional) - [Download](https://git-scm.com/)

---

## 🔧 VS Code Extensions Required

Install these extensions in VS Code for better development experience:

1. **REST Client** (humao.rest-client)
   - For testing API endpoints
   - Install: `REST Client`

2. **Thunder Client** (rangav.vscode-thunder-client)
   - Alternative API testing tool
   - Install: `Thunder Client`

3. **Azure Cosmos DB** (ms-azuretools.vscode-cosmosdb)
   - Direct Cosmos DB management from VS Code
   - Install: `Azure Cosmos DB`

4. **Azure Tools** (ms-vscode.vscode-node-azure-pack)
   - Complete Azure integration
   - Install: `Azure Tools`

5. **Prettier** (esbenp.prettier-vscode)
   - Code formatter
   - Install: `Prettier - Code formatter`

6. **ESLint** (dbaeumer.vscode-eslint)
   - Code quality tool
   - Install: `ESLint`

7. **Thunder Client** (rangav.vscode-thunder-client)
   - API testing
   - Install from VS Code Extensions marketplace

### Installation Steps:
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X on Windows/Linux, Cmd+Shift+X on Mac)
3. Search for each extension name
4. Click Install

---

## 🎯 Azure Cosmos DB Setup

### Step 1: Create Cosmos DB Account

1. Go to [Azure Portal](https://portal.azure.com/)
2. Click **+ Create a resource**
3. Search for **Azure Cosmos DB**
4. Click **Create**
5. Fill in the following:
   - **Resource Group**: Create new or select existing
   - **Account Name**: `qms-cosmos-db` (or your preferred name)
   - **API**: **Core (SQL)**
   - **Capacity Mode**: **Provisioned throughput**
   - **Location**: Select closest region
6. Click **Review + create** > **Create**

### Step 2: Get Connection Details

1. Once created, go to **Keys** in left sidebar
2. Copy the following:
   - **URI** (Endpoint)
   - **Primary Key**
   - **Database Name** (we'll use: `query_management_db`)

### Step 3: Update .env File

In your project root, open `.env` and update:

```env
COSMOS_DB_ENDPOINT=https://YOUR-ACCOUNT-NAME.documents.azure.com:443/
COSMOS_DB_KEY=YOUR_PRIMARY_KEY_HERE
COSMOS_DB_NAME=query_management_db
PORT=3000
JWT_SECRET=your-super-secret-key-change-this
SESSION_SECRET=your-session-secret-change-this
```

**⚠️ IMPORTANT**: Never commit `.env` to version control. Add it to `.gitignore`.

---

## 📁 Project Structure

```
Query-Management-System/
├── public/
│   ├── index.html              # Main HTML file
│   ├── css/
│   │   └── styles.css          # Professional styling
│   └── js/
│       ├── utils.js            # Utility functions
│       ├── api.js              # API client
│       ├── auth.js             # Authentication pages
│       ├── mentee.js           # Mentee dashboard
│       ├── mentor.js           # Mentor dashboard
│       ├── admin.js            # Admin dashboard
│       └── app.js              # Main app logic
│
├── src/
│   ├── server.js               # Express server
│   ├── config/
│   │   └── cosmosdb.js         # Cosmos DB configuration
│   ├── models/
│   │   ├── User.js             # User model
│   │   ├── Query.js            # Query model
│   │   └── ActionLog.js        # Action log model
│   ├── controllers/
│   │   ├── AuthController.js   # Auth logic
│   │   └── QueryController.js  # Query logic
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── queryRoutes.js      # Query endpoints
│   └── middleware/
│       └── auth.js             # Authentication middleware
│
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # NPM dependencies
└── README.md                    # This file
```

---

## 🔨 Installation & Setup

### Step 1: Install Dependencies

```bash
# Navigate to project directory
cd "path/to/Query-Management-System"

# Install Node.js packages
npm install
```

### Step 2: Configure Environment

Edit `.env` file with your Azure Cosmos DB credentials (see Azure Cosmos DB Setup above)

### Step 3: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

Server will run on: `http://localhost:3000`

---

## ⚡ Quick Start — Exact commands

Run these commands after cloning the repository to get the app running locally:

```bash
git clone <your-repo-url>
cd "10th May 2026- Mentor" # or the repository folder name
npm install
# Create a local .env from the example
# macOS / Linux:
cp .env.example .env
# Windows (PowerShell):
copy .env.example .env
# Edit .env and add your Cosmos DB keys and Firebase service account path
# Place your firebase service account file at the path set in FIREBASE_SERVICE_ACCOUNT_PATH
npm run dev   # development with nodemon
# or for production
npm start
```

## 🚀 Short deploy note

You can deploy the backend to any Node.js host (Render, Railway, Heroku, Azure App Service). Key points:

- Add all required environment variables in the hosting dashboard or GitHub Secrets when using CI/CD.
- Do NOT commit `firebase-service-account.json` or `.env` — use provider secrets or secure storage.
- For automatic deployments from GitHub, use GitHub Actions and set required secrets (`COSMOS_DB_ENDPOINT`, `COSMOS_DB_KEY`, `COSMOS_DB_NAME`, `FIREBASE_SERVICE_ACCOUNT`, `JWT_SECRET`, `SESSION_SECRET`).


## 📝 API Endpoints

### Authentication
```
POST   /api/auth/register         - Register new user
POST   /api/auth/login            - Login user
GET    /api/auth/me               - Get current user
```

### Queries (Mentee)
```
POST   /api/queries/create        - Create new query
GET    /api/queries/my-queries    - Get mentee's queries
```

### Queries (Mentor)
```
GET    /api/queries/mentor-queries    - Get assigned queries
POST   /api/queries/add-slots        - Share preferred slots
POST   /api/queries/add-resolution   - Provide resolution
```

### Queries (Admin)
```
GET    /api/queries/all-queries           - Get all queries
POST   /api/queries/assign-mentor        - Assign mentor to query
POST   /api/queries/close                - Close query
GET    /api/queries/analytics            - Get analytics data
```

---

## 👥 User Roles & Permissions

### MENTEE
- ✅ Submit new queries
- ✅ View own queries
- ✅ Track query status
- ✅ View assigned mentor
- ❌ Modify queries after submission (only admin/mentor can)

### MENTOR
- ✅ View assigned queries
- ✅ Share preferred meeting slots
- ✅ Provide resolution
- ✅ Close queries
- ✅ View analytics dashboard
- ❌ Assign themselves

### ADMIN
- ✅ View all queries
- ✅ Assign mentors to queries
- ✅ Close/update queries
- ✅ Track mentor-mentee connections
- ✅ View comprehensive analytics
- ✅ Generate reports

---

## 🧪 Testing the Application

### 1. Test Registration & Login

1. Open browser: `http://localhost:3000`
2. Click **Register**
3. Fill in details:
   - Name: John Doe
   - Email: john@example.com
   - Employee ID: EMP001
   - Department: Engineering
   - Role: Mentee
   - Password: Password@123
4. Click **Register**

### 2. Test Mentee Dashboard

1. After login, you'll see Mentee Dashboard
2. Click **+ Submit New Query**
3. Fill in the form:
   - Employee Name: John Doe
   - Employee ID: EMP001
   - Question Title: How to optimize database queries?
   - Category: Technical
   - Complexity: High
   - Meeting Type: Video Call
   - Preferred Slot: Select a date/time
   - Detailed Query: Describe your question
4. Click **Submit Query**

### 3. Test Mentor Dashboard

1. Register as a Mentor
2. Login with mentor account
3. View assigned queries
4. Share preferred slots
5. Provide resolution
6. Close query

### 4. Test Admin Dashboard

1. Register as an Admin
2. Login with admin account
3. View all queries
4. Assign mentors
5. View analytics
6. Close queries

---

## 🗄️ Cosmos DB Collections

### queries
- **Partition Key**: `/menteeId`
- **Fields**: id, menteeId, questionTitle, category, complexity, status, createdAt, etc.

### users
- **Partition Key**: `/userId`
- **Fields**: id, userId, email, name, role, createdAt, etc.

### action_logs
- **Partition Key**: `/adminId`
- **Fields**: id, adminId, action, queryId, details, createdAt, etc.

### mentors
- **Partition Key**: `/mentorId`
- **Fields**: id, mentorId, availability, expertise, etc.

### mentees
- **Partition Key**: `/menteeId`
- **Fields**: id, menteeId, department, queries, etc.

---

## 🔐 Security Features

1. **Password Hashing**: bcryptjs (10 salt rounds)
2. **JWT Authentication**: Token-based auth with 24-hour expiration
3. **Role-Based Access**: Middleware for role authorization
4. **SQL Injection Prevention**: Parameterized Cosmos DB queries
5. **CORS**: Configured for origin validation
6. **Environment Variables**: Sensitive data in .env

---

## 📊 Dashboard Features

### Admin Dashboard
- Total queries count
- Queries by complexity
- Queries by status
- Average resolution time
- Most active mentors
- Query filter by status

### Mentor Dashboard
- Assigned queries count
- Slots shared count
- Resolutions provided
- Analytics by complexity
- Pending queries

### Mentee Dashboard
- My queries list
- Query status tracking
- Resolution view
- Query history
- Days in progress

---

## 🐛 Troubleshooting

### Issue: Cannot connect to Cosmos DB
**Solution**:
1. Verify `.env` credentials
2. Check if Cosmos DB is running in Azure
3. Ensure firewall allows your IP
4. Test with Azure Cosmos DB Explorer

### Issue: Port 3000 already in use
**Solution**:
```bash
# Change port in .env
PORT=3001

# Or kill process using port 3000
# Windows: netstat -ano | findstr :3000
# Mac/Linux: lsof -i :3000
```

### Issue: JWT errors on login
**Solution**:
1. Clear localStorage: `localStorage.clear()`
2. Refresh browser
3. Register again

### Issue: CORS errors
**Solution**:
1. Check server is running on correct port
2. Verify API_BASE_URL in `js/api.js`
3. Ensure backend CORS is enabled

---

## 📈 Performance Optimization

1. **Database Indexing**: Cosmos DB auto-indexes all properties
2. **Pagination**: Implement for large query lists
3. **Caching**: Use localStorage for user data
4. **Lazy Loading**: Load data on demand
5. **CDN**: Use Azure CDN for static files in production

---

## 🚀 Deployment

### Deploy to Azure App Service

1. Create App Service resource
2. Connect GitHub repository
3. Configure environment variables in App Service
4. Enable continuous deployment

```bash
# Create deployment package
npm run build

# Deploy
az webapp deployment source config-zip --resource-group <group> --name <app-name> --src app.zip
```

---

## 📚 Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Azure Cosmos DB Docs](https://docs.microsoft.com/azure/cosmos-db/)
- [Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
- [JWT.io](https://jwt.io/)

---

## 📞 Support

For issues or questions:
1. Check Troubleshooting section
2. Review Azure Cosmos DB documentation
3. Check browser console for errors
4. Review server logs: `npm run dev`

---

## 📄 License

This project is provided as-is for educational purposes.

---

## ✨ Key Features Summary

✅ **Three-tier Role System** (Mentee, Mentor, Admin)  
✅ **Query Management** with status tracking  
✅ **Real-time Dashboard** with analytics  
✅ **Professional UI** with responsive design  
✅ **Persistent Storage** in Azure Cosmos DB  
✅ **Secure Authentication** with JWT  
✅ **Action Logging** for audit trail  
✅ **Mentor Assignment** system  
✅ **Resolution Management**  
✅ **Query Analytics** by complexity and status  

---

**Happy coding! 🎉**
