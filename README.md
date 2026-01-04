# Pulse - Video Upload, Processing, and Streaming Application

![Pulse Logo](frontend/src/assets/react.svg)  

Pulse is a comprehensive full-stack application that allows users to upload videos, processes them for content sensitivity analysis, and provides seamless streaming with real-time progress updates. It includes **role-based access control** and multi-tenant isolation.

---

## Table of Contents

- [Features](#features)  
- [Technologies](#technologies)  
- [Project Structure](#project-structure)  
- [Installation](#installation)  
- [Running the Project](#running-the-project)  
- [API Endpoints](#api-endpoints)  
- [Usage](#usage)  
- [Deployment](#deployment)  
- [License](#license)  

---

## Features

- **User Roles**: Viewer, Editor, Admin  
- **Video Upload**: Editors/Admins can upload videos  
- **Content Analysis**: Videos classified as `safe`, `flagged`, or `processing`  
- **Real-Time Updates**: Live progress tracking via Socket.io  
- **Video Streaming**: Play processed videos in-browser  
- **Dashboard**: View uploaded videos with status and progress  
- **Role-Based Access Control (RBAC)**: Permissions based on user role  

---

## Technologies

**Frontend:**  
- React + Vite  
- Context API for state management  
- Axios for HTTP requests  
- Bootstrap for UI styling  
- Socket.io client for real-time updates  

**Backend:**  
- Node.js + Express  
- MongoDB + Mongoose  
- JWT-based authentication  
- Multer for file uploads  
- Socket.io server for real-time communication  
- Cloudinary for video storage (optional)  

---

## Project Structure

