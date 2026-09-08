# ⚙️ AI Study Buddy – Setup Guide

## 1. Requirements

Before running AI Study Buddy, install:

* Node.js
* npm
* Angular CLI
* Git
* Visual Studio Code

Recommended environment:

Node.js: 20+
npm: 10+
Angular: 21+


---


# 2. Project Structure


AI Study Buddy/
│
├── frontend/
├── backend/
├── docs/
├── README.md
└── .gitignore

---

# 3. Frontend Setup

Open the frontend folder:

cd frontend

Install dependencies:

npm install

Start Angular development server:


ng serve


The frontend normally runs at:

http://localhost:4200

---

# 4. Backend Setup

Open a new terminal.

Go to the backend:

cd "G:/AI Study buddy/backend"


Install dependencies:

npm install

Start the backend:

node server.js

If a development script is configured:

npm run dev


The backend normally runs on:

```text
http://localhost:5000
```

---

# 5. Firebase Setup

Open Firebase Console and create/select the project.

Enable:

### Authentication

Enable the required authentication provider, such as:

Email/Password


### Firestore Database

Create the Firestore database.

Use collections such as:

users
quizResults
studyPlans
progress
---

# 6. Firebase Configuration

Configure Firebase in the Angular application according to your project's Firebase configuration file.

Example:

frontend/src/app/firebase.config.ts

Do not expose private server credentials.

---

# 7. Environment Variables

AI API keys should be stored in the backend environment file.

Create:


backend/.env

Example:
OPENAI_API_KEY=YOUR_API_KEY

Replace the placeholder with your own API key.

### Security Warning

Never upload `.env` to GitHub.

Add it to `.gitignore`

.env

---

# 8. Run the Complete Application

### Terminal 1 – Frontend

cd frontend
npm install
ng serve

### Terminal 2 – Backend

cd backend
npm install
node server.js

Then open:

http://localhost:4200


---

# 9. Application Flow

Landing Page
      ↓
Register / Login
      ↓
Dashboard
      ↓
Choose Feature
      ↓
┌───────────────┐
│ AI Chatbot    │
│ AI Planner    │
│ AI Quiz       │
│ Analytics     │
│ Career        │
│ Profile       │
└───────────────┘

---

# 10. Troubleshooting

## Angular command not found

Install Angular CLI:

npm install -g @angular/cli

---

## Dependencies missing

Run:

npm install

---

## Backend not starting

Check:

backend/.env

and verify that required environment variables are configured.

---

## Port already in use

Stop the process using the port or change the backend port.

Example:

PORT=5001

---

## Firebase errors

Check:

* Firebase project configuration
* Authentication settings
* Firestore database
* Firebase configuration file
* Firestore security rules

---

# 11. GitHub Deployment

After making changes:

git add .

Commit:

git commit -m "Update AI Study Buddy"

Pull latest changes:


git pull origin main --rebase


Push:

git push origin main

---

# 12. Security Checklist

Before pushing the project to GitHub:

* [ ] `.env` is in `.gitignore`
* [ ] API keys are not in source code
* [ ] Firebase private credentials are not exposed
* [ ] No passwords are committed
* [ ] No personal credentials are committed
* [ ] README contains setup instructions

---

# 13. Final Verification

Before the hackathon demonstration, verify:

* [ ] Landing page works
* [ ] Registration works
* [ ] Login works
* [ ] Dashboard loads
* [ ] Chatbot works
* [ ] Study Planner works
* [ ] Quiz works
* [ ] Analytics works
* [ ] Profile works
* [ ] Backend is running
* [ ] Firebase is connected
* [ ] AI API is working

---

## 🎯 Demo URL

For local demonstration:

http://localhost:4200

Backend:

http://localhost:5000

---

# Conclusion

Following this guide allows a developer or hackathon judge to understand the project setup and run AI Study Buddy locally.
