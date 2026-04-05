# CyberGuide.AI

Welcome to the CyberGuide.AI repository. This application is designed to map the cybersecurity landscape by analyzing domains, roles, skills, and tools using **IBM Orchestrate**, **IBM Cloudant Vector Databases**, and **Granite LLMs**.

## 🚀 The Tech Stack
* **Frontend:** Next.js 15 (App Router), React, TailwindCSS v4
* **Animations:** Framer Motion (`motion.dev`)
* **Database:** IBM Cloudant (NoSQL)

---

## 🛠 Team Setup & Installation

To run this application locally and connect to the shared IBM Cloudant backend, please follow these steps:

### 1. Install Dependencies
Make sure you have Node installed, and run:
```bash
npm install
```

### 2. Set up the Database Keys (Important!)
For security reasons, our database API keys are strictly hidden from GitHub. 
1. Look for the `.env.example` file in the root directory.
2. Create a new file right next to it named `.env.local`
3. Copy the contents of `.env.example` into your new `.env.local` file.
4. Replace `<REQUEST_KEY_FROM_TEAM_LEAD>` with the actual API key. You must ask the project owner/lead for this secret string.

*(Note: Because of our `.gitignore`, your `.env.local` file will never be accidentally published to GitHub!)*

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the main dashboard UI.

---

## 🧪 Testing the IBM Database Connection

Once you have your `.env.local` file configured, you can test if you successfully connected to the shared IBM Database:

1. **Test Connection Setup:** Visit `http://localhost:3000/api/db-test`. It should return a JSON success message identifying the database version.
2. **Test Read/Write Pipeline:** Visit `http://localhost:3000/api/db-test/crud`. This route will instantly spawn a test document and fetch it back, displaying the JSON output and proving you have writing capabilities mapping correctly.

You can view the raw test data by logging into the IBM Cloud dashboard and opening the `cyberguide_test_db` instance inside Cloudant.
