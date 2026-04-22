# <img src="./assets/iconemarvel.png" width="30" /> My Marvel

A web application inspired by the Marvel universe, allowing users to explore characters and comics, with a personalized favorites system available for authenticated users.

## ✨ Overview

Marvel Explorer is a full-stack application that consumes an external API to dynamically display data. It includes secure authentication, advanced data navigation (search & pagination), and user-specific content management.

## 🚀 Key Features

- Navigation between:
  - Characters: browse Marvel characters
  - Comics: explore comic collections
  - Favorites: user-saved content
- 🔎 Search bar to quickly find characters or comics
- 📄 Pagination system for efficient browsing of large datasets
- User authentication (sign up / log in)
- Add and remove favorites (restricted to logged-in users)

## 🛠️ Tech Stack

### Frontend

- React
- Axios
- CSS

### Backend

- Node.js
- Express

### Database

- MongoDB

### External API

- Marvel API

## 🔐 Authentication & Security

- Token-based authentication (JWT)
- Favorites accessible only to authenticated users
- Backend validation of user permissions

## 🔎 Search Functionality

- Users can search for characters or comics via a search bar
- Queries are sent to the external API
- Dynamic results update as the user types

## 📄 Pagination

- Data is displayed in pages to improve performance and usability
- Users can navigate between pages (next / previous)
- Works in combination with search results

## 📈 Possible Improvements

- Performance optimization (caching)
- Enhanced UI/UX (animations, dark mode)

## Installation

1. Clone the repository

```bash
git clone https://github.com/Margaux-972/Marvel-Backend
cd Marvel-Backend
```

2. Install dependencies

```bash
npm install
```

3. Start the development server (Nodemon)

```bash
npx nodemon index.js
```

This starts the backend server in development mode and automatically restarts it when files change.

The project runs on:

```bash
http://localhost:3000
```

---

⚠️ Notes
Make sure MongoDB is running (local or Atlas)

---

## 🎯 Purpose

This project demonstrates:

- Full-stack application architecture
- Integration of an external API
- Implementation of search and pagination systems
- Secure authentication
- Frontend state management
