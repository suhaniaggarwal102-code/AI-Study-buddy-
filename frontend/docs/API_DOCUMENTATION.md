# 🔌 AI Study Buddy – API Documentation

## 1. API Overview

AI Study Buddy uses a Node.js + Express backend to handle communication between the Angular frontend and AI services.

### Base URL

For local development:

http://localhost:5000

---

# 2. API Architecture

Angular Frontend
       ↓
HTTP Request
       ↓
Express Backend
       ↓
Route
       ↓
Controller / Service
       ↓
AI API / Firebase
       ↓
JSON Response
       ↓
Angular Frontend

---

# 3. Authentication API

Authentication is handled using Firebase Authentication.

## Register

### Purpose

Creates a new student account.

### Input

{
  "name": "Student Name",
  "email": "student@example.com",
  "password": "********"
}

### Response


{
  "success": true,
  "message": "Registration successful"
}


# 4. AI Study Planner API

### Purpose

Generates a personalized study plan.

### Example Endpoint

```text
/api/study-plan
```

### Request

```json
{
  "subject": "DBMS",
  "goal": "Prepare for semester examination",
  "examDate": "2026-12-20"
}
```

### Response


{
  "success": true,
  "studyPlan": [
    {
      "day": 1,
      "topic": "ER Model"
    },
    {
      "day": 2,
      "topic": "Relational Model"
    },
    {
      "day": 3,
      "topic": "Normalization"
    }
  ]
}


---

# 5. AI Quiz API

### Purpose

Generates customized MCQ questions.

### Example Endpoint

/api/quiz

### Request

{
  "subject": "Python",
  "difficulty": "Medium",
  "numberOfQuestions": 5
}

### Response

{
  "success": true,
  "questions": [
    {
      "question": "Which keyword is used to define a function in Python?",
      "options": [
        "function",
        "def",
        "func",
        "define"
      ],
      "answer": "def"
    }
  ]
}
---

# 6. Quiz Result API

### Purpose

Stores or processes quiz performance.

### Example Endpoint

/api/quiz/result


### Request


{
  "subject": "Python",
  "score": 8,
  "totalQuestions": 10
}

### Response


{
  "success": true,
  "message": "Quiz result saved"
}


---

# 7. Analytics

Analytics can use quiz results stored in Firebase Firestore.

Example data:

{
  "subject": "DBMS",
  "score": 85,
  "totalQuestions": 10,
  "date": "2026-09-08"
}


---

# 8. Career Guidance

Career guidance can receive student interests and generate recommendations.

### Example Endpoint

```text
/api/career
```

### Request

{
  "interests": [
    "Programming",
    "Artificial Intelligence",
    "Web Development"
  ]
}


### Response

{
  "success": true,
  "recommendations": [
    "Software Developer",
    "AI Engineer",
    "Full Stack Developer"
  ]
}


---

# 9. Error Response

A standard error response should look like:


{
  "success": false,
  "message": "Something went wrong"
}


---

# 10. Security

The following should never be exposed in frontend code:

OPENAI_API_KEY
Firebase private credentials
Server secrets


Store sensitive values in:


backend/.env


Example:

OPENAI_API_KEY=YOUR_API_KEY
PORT=5000


Never commit the `.env` file to GitHub.

---

# 11. API Testing
APIs can be tested using:

* Browser
* Postman
* Thunder Client
* Angular frontend

---

# 12. API Summary

| Feature       | Method | Endpoint           |
| ------------- | ------ | ------------------ |
| Chatbot       | POST   | `/api/chat`        |
| Study Planner | POST   | `/api/study-plan`  |
| Quiz          | POST   | `/api/quiz`        |
| Quiz Result   | POST   | `/api/quiz/result` |
| Career        | POST   | `/api/career`      |

> **Note:** Update the endpoint names in this document if your actual Express routes use different paths.
