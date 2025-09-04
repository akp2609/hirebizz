# 💼 AI-Powered Job Portal

An enterprise-grade, full-stack job portal built with modern web technologies, cloud-native infrastructure, and AI-powered microservices. Designed for scalability, personalization, and real-time interaction between candidates and employers.

---

## 🌐 Live Deployment

- **Frontend**: [hirebizz.xyz](https://hirebizz.xyz) (Vercel)
- **Backend**: Hosted on [Google Cloud Run](https://cloud.google.com/run) with custom domain  
- **Mobile App**: Downloadable via banner on the website (React Native Android)

---

## 🛠️ Tech Stack

| Layer        | Technologies Used |
|--------------|-------------------|
| Frontend     | React.js, Tailwind CSS |
| Backend      | Express.js, MongoDB, Firebase Realtime DB |
| Cloud Infra  | GCP (Cloud Run, GCS, Pub/Sub, Secret Manager, Cron Scheduler), Azure AD, Terraform |
| AI Services  | Google Doc AI, OpenAI Embeddings, Dialogflow CX |
| Auth         | JWT, OAuth (Google & GitHub), Custom Sign-In |
| Analytics    | BigQuery, Dataflow, Power BI, Grafana |
| Mailing      | Brevo (domain-based email service) |

---

## ✨ Features

### 💻 Frontend Stack
- Built with React.js for dynamic UI rendering
- Styled using Tailwind CSS for utility-first design
- Redux Toolkit handles global state management
- React Context API used for local/shared state across components

### 🧠 Backend Architecture
- Structured using MVC principles: Controllers, Routes, and Middleware
- Express.js powers the RESTful API
- Middleware handles authentication, validation, and error management
- Modular design ensures scalability and clean separation of concerns

### 📄 Resume Analyzer Microservice
- Upload resumes to GCS bucket
- Parse with Google Doc AI → store chunks in MongoDB
- Generate embeddings via OpenAI
- Vector search for premium users using cosine similarity with job skill embeddings

### 🔐 Authentication & Authorization
- JWT-based session auth
- OAuth via Google & GitHub
- Custom sign-in with MongoDB
- Role-Based Access Control (RBAC) with dedicated views for:
  - Candidates  
  - Employers  
  - Admins & Super Admins

### 💬 Real-Time Chat
- Firebase Realtime DB enables live messaging between candidates and employers
- Uses google OIDC tokens for protection of route

### 🛠️ Admin Dashboard
- Built with ShadCN UI and Apex UI for sleek, accessible, and customizable components
- Provides role-based access, user management, and system analytics in a responsive layout

### 📊 Analytics & Dashboards
- Power BI dashboard for hourly/daily/monthly/yearly stats
- BigQuery + Dataflow ELT pipelines from MongoDB
- Scheduled queries for data cleaning
- Grafana dashboard (configured via Terraform repo)

### 📈 Hourly Stats Route
- Protected via Azure AD
- Uses Redis and GitHub Actions to fetch hourly data and store in MongoDB

### 📬 Email Notifications
- GCP Cron Scheduler checks for unseen messages authorization via google OIDC tokens
- Brevo used for:
  - User verification  
  - Password resets  
  - Notifications for unseen messages  
  - All emails sent via site domain

### 📱 Mobile App
- React Native Android app downloadable via website banner

### 🤖 AI Chatbot
- Dialogflow CX chatbot integrated for user support and help

---

## 📦 Multi-Repo Architecture

This project spans across multiple repositories:

| Repository | Description | Link |
|------------|-------------|------|
| `hirebizz` | Core frontend & backend | [GitHub Repo](https://github.com/akp2609/hirebizz) |
| `resume-analyzer-microservice` | Microservice for resume parsing & embedding | [GitHub Repo](https://github.com/akp2609/resume-analyzer-microservice) |
| `hirebizz-mobile` | React Native Android app | [GitHub Repo](https://github.com/akp2609/hirebizz-mobile) |
| `hirebizz-infra-terraform` | Infrastructure as Code + Grafana dashboard setup | [GitHub Repo](https://github.com/akp2609/hirebizz-infra-terraform) |
| `hirebizz-analytics-dashboard` | Analytics dashboard with BigQuery pipelines | [GitHub Repo](https://github.com/akp2609/hirebizz-analytics-dashboard) |

> 🧭 **Note**: The Grafana dashboard is configured and deployed via the `hirebizz-infra-terraform` repo. It does not have a separate repository.

---

### 🔒 Security & Maintenance
- Automated dependency updates via **Dependabot**
- Static code analysis and vulnerability scanning with **CodeQL**

---

## 🧰 Setup & Installation

> ⚠️ **Note**: This is a production-grade, multi-repo project with cloud-native infrastructure and advanced integrations. Due to its complexity, setup instructions are not included here.

For enterprise deployment or demo access, feel free to reach out via issues or discussions.

---

## 🤝 Contributing

Contributions are welcome! If you're interested in improving features, fixing bugs, or extending functionality, please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under [MIT License](LICENSE).

---

## 📣 Acknowledgements

- [Google Cloud](https://cloud.google.com/)
- [OpenAI](https://openai.com/)
- [Firebase](https://firebase.google.com/)
- [Brevo](https://www.brevo.com/)
- [Power BI](https://powerbi.microsoft.com/)
- [Grafana](https://grafana.com/)
- [Vercel](https://vercel.com/)
- [Azure AD](https://learn.microsoft.com/en-us/azure/active-directory/)

---