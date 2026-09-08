# 🏗️ AI Study Buddy – System Architecture

## 1. Overview

AI Study Buddy is a full-stack AI-powered learning platform built using Angular, Node.js, Express, Firebase, and an AI language model API.

The application follows a client-server architecture.

---

## 2. High-Level Architecture

                    STUDENT
                       │
                       ▼
             ┌──────────────────┐
             │ Angular Frontend │
             │                  │
             │ Landing          │
             │ Login/Register   │
             │ Dashboard        │
             │ AI Chatbot       │
             │ Study Planner    │
             │ Quiz             │
             │ Analytics        │
             │ Career           │
             │ Profile          │
             └────────┬─────────┘
                      │ HTTP Requests
                      ▼
             ┌──────────────────┐
             │ Node.js +        │
             │ Express Backend  │
             └───────┬─────┬────┘
                     │     │
            ┌────────┘     └──────────┐
            ▼                         ▼
   ┌─────────────────┐       ┌─────────────────┐
   │ Firebase        │       │ AI API          │
   │                 │       │                 │
   │ Authentication  │       │ AI Responses    │
   │ Firestore       │       │ Quiz Generation │
   │ User Data       │       │ Study Planning  │
   └─────────────────┘       └─────────────────┘

## 3. Frontend Architecture

The frontend is developed using Angular.

### Main Pages

src/app/pages/

├── landing/
├── login/
├── register/
├── dashboard/
├── chatbot/
├── quiz/
├── study-plan/
├── analytics/
├── career/
└── profile/

### Frontend Responsibilities

* Display the user interface
* Handle navigation
* Collect student input
* Validate forms
* Display AI responses
* Display quiz questions and scores
* Display analytics
* Communicate with backend APIs

---

## 4. Backend Architecture

The backend uses Node.js and Express.

backend/
│
├── server.js
├── routes/
├── controllers/
├── models/
└── .env

### Backend Responsibilities

* Handle API requests
* Communicate with AI services
* Process student requests
* Manage server-side logic
* Protect API keys
* Communicate with Firebase when required

---

## 5. Firebase Architecture

Firebase is used for authentication and cloud data storage.

### Firebase Authentication

Used for:

* Student registration
* Student login
* Logout
* User authentication

### Firestore

Used for storing:

users
quizResults
studyPlans
progress

---

## 6. AI Architecture

AI functionality is accessed through the backend.

Student
   ↓
Angular Frontend
   ↓
Express Backend
   ↓
AI API
   ↓
AI Language Model
   ↓
AI Response
   ↓
Angular Frontend
   ↓
Student

The API key is stored in the backend `.env` file and should never be exposed in the Angular frontend.

---

## 7. Feature Architecture

### AI Chatbot

Question
   ↓
Angular Chatbot
   ↓
Backend API
   ↓
AI Model
   ↓
Educational Answer

### AI Study Planner

Subject
+
Study Goal
+
Exam Date
       ↓
Backend
       ↓
AI Model
       ↓
Personalized Study Plan

### AI Quiz

Subject
+
Difficulty
+
Question Count
       ↓
Backend
       ↓
AI Model
       ↓
MCQ Questions
       ↓
Student Answers
       ↓
Score

---

## 8. Security Architecture

Security practices include:

* Firebase Authentication
* Environment variables
* Backend API protection
* Input validation
* Secure Firebase rules
* `.env` excluded from Git
* API keys never committed to GitHub

---

## 9. Data Flow

User Input
    ↓
Angular Component
    ↓
Angular Service
    ↓
Express API
    ↓
Firebase / AI API
    ↓
Response
    ↓
Angular UI

---

## 10. Scalability

The architecture can be extended with:

* Cloud deployment
* AI caching
* More Firebase collections
* Additional AI models
* Mobile applications
* Teacher dashboards
* Advanced analytics
* Real-time notifications

---

## 11. Technology Summary

| Layer           | Technology              |
| --------------- | ----------------------- |
| Frontend        | Angular                 |
| Language        | TypeScript              |
| UI              | HTML, CSS/SCSS          |
| Backend         | Node.js                 |
| API Framework   | Express.js              |
| Authentication  | Firebase Authentication |
| Database        | Firebase Firestore      |
| AI              | AI Language Model API   |
| Version Control | Git + GitHub            |
