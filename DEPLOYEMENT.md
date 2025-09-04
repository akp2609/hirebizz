# 🚀 Deployment Guide

This document outlines the high-level deployment architecture and requirements for the AI-Powered Job Portal. Due to the enterprise-grade complexity of this project, automated setup is not supported. Manual configuration and cloud provisioning are required.

---

## 📦 Repositories Overview

| Repo | Purpose |
|------|---------|
| `hirebizz` | Core frontend and backend |
| `resume-analyzer-microservice` | Microservice for resume parsing and embedding |
| `hirebizz-mobile` | React Native Android app |
| `hirebizz-infra-terraform` | Infrastructure as Code (includes Grafana setup) |
| `hirebizz-analytics-dashboard` | Analytics dashboard with BigQuery pipelines |

---

## 🌐 Infrastructure Requirements

### Cloud Providers
- **Google Cloud Platform (GCP)**  
  - Cloud Run  
  - Cloud Storage  
  - Pub/Sub  
  - Secret Manager  
  - Firebase Realtime DB  
  - Cron Scheduler  
  - BigQuery  
  - Dataflow  
  - Dialogflow CX

- **Azure AD**  
  - OAuth integration  
  - Protected API route with Redis and GitHub Actions

---

## 🔐 Secrets & Configuration

This project requires **40–50 environment variables and secrets**, including:

- OAuth credentials (Google, GitHub)
- MongoDB connection strings
- Firebase config
- OpenAI API keys
- Doc AI service accounts
- Redis credentials
- Brevo SMTP keys
- GCP service account tokens
- Azure AD app secrets

> ⚠️ These secrets must be manually provisioned and stored securely using GCP Secret Manager or your preferred vault solution. `.env.example` files are provided in each repo for reference only.

---

## 🧱 Deployment Steps (High-Level)

1. **Provision GCP services** using `terraform-iac`  
   - Cloud Run services  
   - Buckets, Pub/Sub, Secrets  
   - Grafana dashboards

2. **Configure secrets** in GCP Secret Manager  
   - Match keys from `.env.example` files

3. **Deploy backend** to Cloud Run  
   - Ensure domain mapping and HTTPS setup

4. **Deploy frontend** to Vercel  
   - Connect custom domain

5. **Deploy resume analyzer microservice**  
   - Set up GCS triggers and Doc AI integration

6. **Configure Firebase Realtime DB**  
   - Enable chat functionality

7. **Set up Cron Scheduler**  
   - Trigger unseen message checks and email notifications

8. **Connect Power BI to BigQuery**  
   - Use scheduled queries and Dataflow pipelines

9. **Integrate Dialogflow CX chatbot**  
   - Embed into frontend and configure intents

---

## 📱 Mobile App Deployment

- Built with React Native  
- Android APK available via website banner  
- Requires Firebase and backend API access

---

## 📊 Analytics & Monitoring

- **Power BI Dashboard**: Uses BigQuery + Dataflow  
- **Grafana Dashboard**: Configured via Terraform  
- **GitHub Actions**: Fetch hourly stats and push to MongoDB

---

## 🧰 Notes

- This project is not intended for one-click deployment.
- Setup requires cloud expertise and manual configuration.
- For demo access or enterprise onboarding, contact the maintainer.

---

