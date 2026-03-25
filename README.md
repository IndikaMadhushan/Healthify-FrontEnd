# Healthify Frontend

A modern, responsive web frontend for **Healthify** — a health & wellness platform that helps users track key health info, view summaries/insights, and stay consistent with personalized reminders.



---

## What this project does

**Healthify Frontend** provides the user interface for a health-focused application where users can:
- View a **health summary dashboard** (quick insights, key metrics, and status at a glance)
- Manage **reminders** (stay on track with routines, medication, checkups, etc.)
- Interact with real application data via **backend API integration**
- Use a clean, mobile-friendly UI that supports a smooth user experience

This project is built to work with a separate backend service (API).

---

## Tech Stack

- **JavaScript** 
- **Frontend Framework/Library:** React 
- **Routing:** React Router 
- **Styling/UI:** CSS / Bootstrap / Tailwind / Material UI 
- **API Communication:** Axios / Fetch API 
- **Package Manager:** npm / yarn 


---

## Features

- **Authentication-ready UI** 
- **Reminders Management**
  - Create / view / update reminders 
  - Reminder listing with user-friendly layout
- **Summary Page**
  - Visual overview of health data
  - Clean sections/cards for readability
- **Backend API Integration**
  - Data fetched from backend and rendered dynamically
  - Centralized API handling 
- **Responsive UI**
  - Works across desktop/tablet/mobile
  - UI spacing and layout improvements for consistency

---



## How to Run Locally

### Prerequisites
- **Node.js** (LTS recommended)
- **npm** (comes with Node) or **yarn**

### 1) Clone the repository
```bash
git clone https://github.com/IndikaMadhushan/Healthify-FrontEnd.git
cd Healthify-FrontEnd
```

### 2) Install dependencies
```bash
npm install
```
or
```bash
yarn
```

### 3) Configure environment variables (if needed)
If your app uses an API base URL, create a `.env` file in the root directory.

Example:
```env
REACT_APP_API_BASE_URL=http://localhost:8080
```



### 4) Start the development server
```bash
npm start
```
or
```bash
yarn start
```

The app should be running on something like:
- `http://localhost:3000`

---

## Project Structure (optional but useful)



- `src/pages/` — application pages (Summary, Reminders, etc.)
- `src/components/` — reusable UI components
- `src/services/` or `src/api/` — API calls & integrations
- `src/assets/` — images, icons, styles

---

## Notes 

This project demonstrates:
- Frontend feature development (pages + UI components)
- Real-world API integration with a backend service
- Leadership and team collaboration experience
- UI refinement for better user experience

