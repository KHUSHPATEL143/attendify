# Attendify Management System (MERN)

A full-featured **School Management System** designed to manage students, classes, attendance, tests, and academic records through **Admin, Teacher, and Student portals**.

This project is built using the **MERN Stack** and focuses on real-world school workflows such as attendance tracking, class management, and performance monitoring.

---

# Project Overview

Parishram Vidhyalay is a web-based platform that allows school administrators, teachers, and students to manage daily academic activities efficiently.

The system is divided into **three role-based portals**:

* **Admin Portal** – Full system control
* **Teacher Portal** – Attendance, tests, and class management
* **Student Portal** – View attendance, results, and timetable

Each role has **secure authentication and permission-based access**.

---

# Key Features

## 1. Role-Based Authentication

Three login types are supported:

**Admin**

* Login using Email and Password
* Full system access

**Teacher**

* Login using Email and Password
* Access to assigned classes only

**Student**

* Login using GR Number and Date of Birth
* Access to personal academic data only

---

# Admin Portal Features

The Admin portal manages the entire school system.

### Dashboard

Displays important statistics such as:

* Total Students
* Total Teachers
* Total Classes
* Absent Students Today
* Upcoming Holidays
* Recent Tests

### Teacher Management

Admin can:

* Add teachers
* Edit teacher details
* Assign teachers to classes
* Suspend or remove teachers
* Reset teacher passwords

### Student Management

Admin can:

* Add new students
* Upload student photos
* Edit student details
* Move students to another class
* Suspend or remove students
* Search students by name or GR number

### Class Management

Admin can:

* Create classes
* Assign teachers to classes
* View students in each class

### Timetable Management

Admin can:

* Create weekly timetable
* Assign subjects per period
* Copy timetable between classes

### Holiday Management

Admin can:

* Add school holidays
* Edit or delete holidays
* View holidays on calendar

### Reports

Admin can generate:

**Attendance Reports**

* Monthly attendance report per class

**Student Reports**

* Individual student attendance history

**Test Reports**

* Class-wise test performance

---

# Teacher Portal Features

Teachers manage their assigned classes.

### Teacher Dashboard

Displays:

* Number of students in class
* Present students today
* Absent students today
* Tests created
* Attendance calendar
* Today's timetable

### Attendance System

Teachers can:

* Mark students **Present**
* Mark students **Absent**
* Mark students **Late**

Rules:

* Attendance can be marked only once per day
* Attendance is limited to a defined time window
* Substitute teachers can mark attendance if assigned

### Student Management

Teachers can:

* View all students in their class
* Add new students
* View student profile
* View attendance calendar
* View test results

### Test Management

Teachers can:

Create Tests

* Test name
* Subject
* Test date
* Maximum marks

Enter Marks

* Enter marks for each student
* Update marks
* Automatically calculate grades

Grade System

```
A+ ≥ 90%
A  ≥ 75%
B  ≥ 60%
C  ≥ 50%
D  ≥ 35%
F  < 35%
```

---

# Student Portal Features

Students can access their academic information.

### Student Dashboard

Displays:

* Student profile
* Attendance percentage
* Monthly attendance calendar
* Recent test results
* Today's timetable

### Attendance View

Students can:

* View monthly attendance calendar
* See present / absent / late days
* View monthly summary

### Test Results

Students can:

* View marks for all tests
* See percentage and grade
* Track academic performance

### Profile

Students can view:

* Name
* GR Number
* Class
* Roll Number
* Date of Birth
* Address
* Parent Mobile
* Photo

Students cannot edit profile details.

---

# Attendance Calendar

The system provides a visual attendance calendar.

Color codes:

Green – Present
Red – Absent
Amber – Late
Yellow – Holiday

Monthly summary includes:

* Total Present Days
* Total Absent Days
* Late Days
* Holidays

---

# Parent Notification System

When a student is marked **Absent**, the system can notify parents.

Example message:

```
Dear Parent,

Your ward Rahul (Class 8A) was marked ABSENT today at Parishram Vidhyalay.

Please contact the school if necessary.
```

---

# Database Structure

The system uses MongoDB with the following collections:

* users
* classes
* students
* attendance
* attendanceWindows
* substitutes
* tests
* testMarks
* timetables
* holidays
* notifications

---

# Project Architecture

## Backend (Node.js + Express)

```
backend
 ├ controllers
 ├ models
 ├ routes
 ├ middleware
 ├ utils
 └ server.js
```

## Frontend (React)

```
frontend
 ├ pages
 │   ├ admin
 │   ├ teacher
 │   └ student
 ├ components
 ├ hooks
 ├ services
 └ App.jsx
```

---

# Example API Endpoints

## Authentication

```
POST /api/auth/admin-login
POST /api/auth/teacher-login
POST /api/auth/student-login
```

## Students

```
GET /api/students
POST /api/students
PUT /api/students/:id
DELETE /api/students/:id
```

## Attendance

```
POST /api/attendance/mark
GET /api/attendance/class/:classId
GET /api/attendance/student/:studentId
```

## Tests

```
POST /api/tests
POST /api/tests/marks
GET /api/tests/class/:classId
```

---
# Future Improvements

Possible enhancements include:

* QR code attendance
* Face recognition attendance
* Parent mobile app
* Push notifications
* AI-based attendance prediction
* Automated report cards
* Multi-school support

---

# Author

**Khush Patel**

Developer of Attendify Management System.

---
