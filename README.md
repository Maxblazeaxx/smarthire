# SmartHire – AI-Powered Resume Filter

> A full-stack MERN application that ranks candidates by matching their resumes against job requirements using keyword scoring.

---

## ✨ Features

- 🔐 **Demo Login** — Any email/password works
- 📤 **Drag & Drop Upload** — Upload 3–4 PDF or DOCX resumes
- 🤖 **Keyword Matching** — Scores resumes against job skills
- 🏆 **Resume Ranking** — Sorted by match percentage
- 🎨 **Modern UI** — Glassmorphism, dark/light mode, animations
- 📱 **Responsive** — Works on all screen sizes

---

## 🗂 Project Structure

```
smarthire/
├── frontend/          # React + Vite + Tailwind CSS
│   └── src/
│       ├── components/   Sidebar, Navbar, CandidateCard, UploadZone, ProgressBar
│       ├── context/      AuthContext (fake auth)
│       └── pages/        Login, Dashboard, Upload, Results
│
├── backend/           # Node.js + Express
│   ├── routes/        auth.js, resume.js
│   ├── utils/         parser.js (PDF + DOCX parsing & scoring)
│   └── uploads/       Temporary resume storage
│
├── sample-resumes/    4 sample resumes for testing
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or later — [Download](https://nodejs.org/)
- **npm** v8+ (bundled with Node.js)

---

### 1. Clone / Download the project

```bash
# If using git:
git clone <your-repo-url>
cd smarthire

# Or just open the smarthire folder you already have
```

---

### 2. Start the Backend

```bash
cd backend
npm install
npm start
```

Backend will run at: **http://localhost:5000**

Test it: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

### 3. Start the Frontend

Open a **new terminal window**:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: **http://localhost:5173**

---

### 4. Open the App

Visit **http://localhost:5173** in your browser.

**Login with any credentials**, for example:
- Email: `recruiter@company.com`
- Password: `any password`

---

## 🧪 Testing with Sample Resumes

### Generate sample `.txt` resumes (optional):

```bash
cd sample-resumes
node generate-samples.js
```

This creates 4 plain-text files you can upload directly.

### For real PDF testing:

You can use any PDF or DOCX files. The included sample resumes cover:

| File | Skills Focus |
|------|-------------|
| `alice_johnson` | React.js, Node.js, MongoDB, TypeScript, Docker |
| `bob_smith` | Python, Machine Learning, TensorFlow, SQL |
| `carol_white` | React Native, Firebase, Redux, TypeScript |
| `david_brown` | AWS, Kubernetes, Docker, Terraform, CI/CD |

### Suggested test flow:

1. Login with any credentials
2. Go to **Upload Resumes**
3. Upload 3–4 of the sample resumes
4. Enter job skills like: `React.js, Node.js, MongoDB, TypeScript, REST API`
5. Click **Analyze & Rank Resumes**
6. View ranked results — Alice should score highest!

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/login` | Demo login (any credentials) |
| `POST` | `/api/upload` | Upload resume files |
| `POST` | `/api/analyze` | Upload + analyze against job description |
| `GET`  | `/api/results` | Get last analysis results |
| `GET`  | `/api/health` | API health check |

---

## 🎯 How the Scoring Works

```
matchScore = (matchedKeywords / totalJobKeywords) × 100

Highly Recommended  → score ≥ 70%
Moderate Match      → score ≥ 40%
Low Match           → score < 40%
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| State | React Context API |
| HTTP Client | Axios |
| Routing | React Router DOM v6 |
| Animations | Framer Motion + CSS |
| Icons | Lucide React |
| Backend | Node.js + Express.js |
| File Upload | Multer |
| PDF Parsing | pdf-parse |
| DOCX Parsing | mammoth |

---

## 🔧 Environment Variables

**backend/.env** (already included):
```
PORT=5000
NODE_ENV=development
```

---

## 📝 Notes

- **No real authentication** — this is a demo app
- **No database required** — results stored in memory (cleared on server restart)
- **MongoDB optional** — can be added for persistent storage
- Files are stored in `backend/uploads/` temporarily

---

## 📄 License

MIT — Free to use and modify.

---

Built with ❤️ for learning full-stack MERN development.
