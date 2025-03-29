Drone Survey Management System

Overview

The Drone Survey Management System is designed to enable large corporations to plan, manage, and monitor autonomous drone surveys across global facilities. This system streamlines facility inspections, security monitoring, and site mapping operations.

Features

Mission Planning System

Define survey areas and flight paths.

Configure flight paths, altitudes, and waypoints.

Set data collection parameters (frequency, sensors to use).

Schedule one-time or recurring missions.

Fleet Management Dashboard

Display organization-wide drone inventory.

Show real-time status of drones (available, in-mission).

Display battery levels and other vital statistics.

Mission Monitoring Interface

Visualize real-time drone flight paths on a map.

Display mission progress (% complete, estimated time remaining).

Show survey status updates (starting, in progress, completed, aborted).

Enable mission control actions (pause, resume, abort).

Survey Reporting Portal

Present comprehensive survey summaries.

Display individual flight statistics (duration, distance, coverage).

Display overall organization-wide survey statistics (total surveys completed, etc.).

Technical Stack

Frontend: Angular with Material UI for UI components.

Backend: Node.js with Express.js.

Database: MongoDB with Mongoose.

Mapping & Visualization: Leaflet.js for real-time mapping.

AI-assisted tools: Used tools like Claude Code, Cursor AI, and Replit to accelerate development.

Setup and Installation

Prerequisites

Node.js & npm installed

MongoDB instance running

Angular CLI installed globally (npm install -g @angular/cli)

Installation Steps

Clone the repository:

https://github.com/Parthjain1382/Drone-Survey-Management-System-.git
cd drone-survey-management

Install dependencies:

npm install

Configure environment variables in a .env file.

Start the backend server:

npm run start

Navigate to the frontend directory and start the Angular application:

cd frontend
ng serve

Open http://localhost:4200 in your browser.

Design Decisions & Architecture

Scalability: The system supports multiple concurrent missions.

Flexible Data Model: Uses MongoDB for dynamic storage of waypoints, mission parameters.

Map Integration: Uses Leaflet.js for rendering mission waypoints and routes.

Security: Implements authentication and role-based access control (RBAC).

AI-Assisted Development

Used Claude Code for generating optimized algorithms for mission planning.

Cursor AI helped in debugging and code completion.

Replit was used for rapid prototyping and testing API endpoints.

Testing & Validation

Unit tests for API endpoints.

Manual UI testing using Angular Material components.

Edge case validation for mission scheduling and monitoring.

Challenges & Trade-offs

Real-time Updates: Chose WebSockets over polling for better efficiency.

Data Storage: MongoDB was preferred over SQL due to flexible schema requirements.

Performance Optimization: Indexed frequent queries in MongoDB to speed up data retrieval.

Critical Explanations

Approach to the Problem

Focused on modular design, ensuring each service (missions, dashboard, drones) is independent.

Implemented robust logging and error handling for system reliability.

Safety & Adaptability Strategies

Implemented retry mechanisms for failed drone commands.

Incorporated role-based authentication to prevent unauthorized actions.

