# User-Authentication
This is a User Authentication Project that implements secure registration, login, and role-based dashboard access. The application provides separate dashboards for normal users and administrators, ensuring proper authorization and access control.

||Features|| >>>>>>
-----User Registration----

----User Login with JWT authentication----

----Role-based access control (USER / ADMIN)----

---Separate dashboards for Admin and Normal Users----

----Secure password hashing----

----HTTP-only cookies for token storage----

----Logout functionality----

----Protected routes using middleware----

||Libraries & Packages|| >>>>>>

----bcrypt – Password hashing----

---jsonwebtoken (JWT) – Authentication and authorization---

---mysql2 – MySQL database connection---

---dotenv – Environment variable management---

---cookie-parser – Handling cookies---

---cors – Cross-origin request handling---

||Role-Based Dashboards|| >>>>>

//Admin Dashboard

---View all registered users---

---Access protected admin-only routes---

//User Dashboard

--Access user-specific data--

--Restricted from admin routes--

||Security Highlights|| >>>>>

---Passwords are encrypted using bcrypt---

---Access and refresh tokens stored in HTTP-only cookies---

---Middleware-based route protection---

---Role validation for admin-only access---
