# AI Fitness Assistant

Generate a **5-day personalized workout and meal plan** using AI, with form validation, print-friendly tables, and a polished UI.

---

## Live Demo

Try it live: [https://react-ai-fitness-app-anusha.vercel.app/](https://react-ai-fitness-app-anusha.vercel.app/)

---

## Features

- User-friendly **form with inline validation**  
- **AI-generated workouts** tailored to goal, level, duration, and equipment  
- **Realistic meal suggestions** (recipes instead of just ingredients)  
- **Print-friendly workout plan table**  
- **Form disabled while generating plan** for better UX  
- **Groceries input sanitized** to prevent invalid data  
- **LocalStorage persistence** for plan and form across page refreshes  
- Responsive layout for desktop and mobile  

---

## Tech Stack

- **Frontend:** React 18, Next.js 16.1, JSX  
- **Backend:** Next.js API routes  
- **AI:** OpenAI GPT-4 (via `@ai-sdk/openai`)  
- **State & UX:** useState, useEffect, localStorage, inline errors  
- **Styling:** CSS (custom or Tailwind CSS optional)

##ScreenShots



<img width="679" height="665" alt="image" src="https://github.com/user-attachments/assets/aa800d77-bb84-4bdc-aa66-c2df2a3faf50" />

<img width="1136" height="538" alt="image" src="https://github.com/user-attachments/assets/8b67043b-a87b-45cd-b505-ce2b6866b3e0" />

<img width="1046" height="589" alt="image" src="https://github.com/user-attachments/assets/800cc091-191a-4c66-bf90-7cf838867e25" />



   
---

## Getting Started (Local Setup)

1. Clone the repo:  

git clone https://github.com/anushav-anusha/React-AI-Fitness-App.git

2.Install dependencies:
cd React-AI-Fitness-App
npm install

3.Add environment variable for OpenAI API key:

Create .env.local:

OPENAI_API_KEY=<your-openai-api-key>

4.Run the app locally:

npm run dev

Open in browser: http://localhost:3000


5. Folder structure

   React-AI-Fitness-App/
├── app/
│   ├── page.jsx           # Home page with form
│   ├── plan/page.jsx      # Plan table page
├── api/
│   └── workout/route.js   # API route for AI plan generation
├── src/
│   ├── components/        # Optional reusable components
│   ├── services/          # API / fetch utilities
│   └── utils/             # Helper functions
├── public/                # Images, favicon
├── .env.local             # Your OpenAI key (gitignored)
├── package.json
├── next.config.js
└── README.md


Deployment

Deployed on Vercel: https://react-ai-fitness-app-anusha.vercel.app/

Automatic deployment via GitHub integration




