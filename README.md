<div align="center">
  <img src="https://github.com/yshlae/Jorge-s-Casa-de-Sans-Rival-Cafe/blob/main/images/Jorge's%20Cafe%20Logo.png" alt="Jorge's Cafe Logo" width="300" height="300">
  
  <h1>Sanserve-All: A Centralized Web-Based Inventory And Ordering Management System For Jorge’s Cafe</h1>
  
  <h3>🌀 Your Sans Stop Shop. 🌀 <br>
  A centralized management system for Jorge's Cafe. Built for support, made to connect.</h3>
  
<p><b>IT 3101</b><br>
  <a href="https://github.com/JoerenAguila">Aguila, Joeren G.</a><br>
  <a href="https://github.com/yshlae">Banaag, Ashley Mae R.</a><br>
  <a href="https://github.com/eniemennie">Catapang, Denielyn P.</a><br>
  <a href="https://github.com/Kofijsi">Galay, Jannah Mae G.</a><br>
  <a href="https://github.com/airajahnelle">Landicho, Aira Jahnelle V.</a><br>
  <a href="https://github.com/MedranoCy">Medrano, Cyrene Hannah H.</a>
</p>

  
  <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">
</div>

<details>
  <summary><strong>Table of Contents</strong></summary>
  
  1. [Project Overview](#project-overview)  
  2. [Application of System Design](#application-of-system-design)  
  3. [Integration with System Architecture](#integration-with-system-architecture)  
  4. [Running the Website](#running-the-website)

</details>

---

### Project Overview 🔍
**Jorge’s Café** is a growing food business offering pastries, meals, and beverages across multiple branches in Batangas. Despite its expansion, the café continues to rely on manual methods for recording sales, tracking inventory, and processing orders. These traditional practices—such as using Excel sheets, handwritten notes, and Viber messages—often lead to inaccurate records, delays, and communication gaps between staff and management. The lack of a centralized digital system also limits the café’s ability to monitor stock levels, validate payments, and generate summarized operational reports.

To address these operational challenges, the project introduces SanServe-All, a centralized web-based system designed to automate inventory tracking, streamline order processing, and organize sales documentation. The platform features real-time stock monitoring, automated ingredient deduction, product availability updates, and receipt-based payment verification to minimize errors and improve workflow efficiency. By integrating these essential functions into a single accessible system, SanServe-All enhances staff coordination and supports a more reliable, modernized, and scalable operational structure for Jorge’s Café.

### Application of System Design 🏗️
In developing SanServe-All, various system design principles and methodologies were applied to ensure that the platform is efficient, reliable, and aligned with the operational needs of Jorge’s Café. These design concepts guided how the system’s components were structured, how data flows between processes, and how users interact with the platform.

- **Modular Design Architecture** 🧩  
  SanServe-All is divided into functional modules such as `Inventory Management`, `Order Processing`, `Receipt Verification`, and `Reporting`.  
  Each module performs specific tasks while remaining connected to a centralized database.  
  This modular approach ensures `easier maintenance`, `scalability`, and `clear separation of responsibilities`.

- **Data Flow Diagrams (DFD)** 📊  
  DFDs were used to map how data moves across the system. For example, when a customer places an order, the system flows through processes like `order validation`, `inventory deduction`, and `receipt submission`.  
  `DFD Levels 0 and 1` help break down the workflow, ensuring that each process is logically arranged and avoids bottlenecks.

- **Entity–Relationship Diagram (ERD)** 🗂️  
  The ERD defines the database structure, showing how tables such as `Products`, `Ingredients`, `Orders`, `Receipts`, and `Users` relate to each other.  
  This ensures that `inventory quantities`, `ingredient usage`, and `order transactions` remain organized and accurately linked.

- **Use Case Modeling** 🎭  
  Use Case Diagrams illustrate how different users interact with the system. Customers can `place orders` and `upload receipts`, while staff can `verify payments` and `update inventory`.  
  These diagrams guided the development of each feature based on real café workflows.

- **User-Centered Interface Design** 🖥️  
  Considering that many café employees are non–tech-savvy, the interface was designed to be `simple` and `intuitive`.  
  `Clear navigation`, `real-time notifications`, and `automated prompts` help prevent errors and make the system easy to use.

- **Real-Time Processing and Notifications** 🔔  
  System design principles were applied to enable instant updates—such as `notifying staff of new orders` and `automatically adjusting stock levels`.  
  This real-time workflow helps ensure `timely preparation` and minimizes `stock discrepancies`.

- **Centralized Database Design** 🗄️  
  A structured database allows all users to access `consistent information`. `Inventory levels`, `order details`, `ingredient usage`, and `receipt submissions` are stored in one place, supporting `accurate reporting` and `efficient decision-making`.

<hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">
</div>

### Integration with System Architecture 🌐
<div align="center">
  <img src="https://github.com/yshlae/Jorge-s-Casa-de-Sans-Rival-Cafe/blob/main/images/SDG%208%20Header.png" alt="SDG Goal 8" width="1000">
</div>

**SanServe-All** integrates core modules—such as inventory management, order processing, receipt verification, and reporting—into a cohesive system architecture that ensures seamless communication through a centralized database and well-defined interfaces. Utilizing a client-server model and layered architecture, the system supports scalability, data consistency, and real-time synchronization, enabling efficient and reliable operations for Jorge’s Café. This integration directly aligns with **Sustainable Development Goal (SDG) 8: Decent Work and Economic Growth** by automating workflows, reducing operational errors, and enhancing employee productivity through real-time notifications and simplified processes. Additionally, SanServe-All facilitates informed decision-making with comprehensive sales and inventory reports, empowering the café to grow sustainably while maintaining quality service and efficient resource use in support of sustained and inclusive economic growth.

 <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">
</div>

### Running the System 👩‍💻

To use the **SanServe-All Web-Based Inventory and Ordering Management System**, make sure that XAMPP is installed on your device.

---

## 1. Start XAMPP
1. Open **XAMPP Control Panel**
2. Start the following services:
   - **Apache**
   - **MySQL**

The system will only work while these two modules are running.

---

## 2. Open the System in Your Browser

### **Customer Interface**
Paste the link in your browser:

http://localhost/sanserve-all/
### **Admin Dashboard**
For staff and administrators:

http://localhost/sanserve-all/admin

---

## 3. Log In
Once the pages load:

- **Customers** log in to order, browse the menu, add items to cart, choose pickup/dine-in, and upload receipts.
- **Admins/Staff** log in to view sales, manage menu items, check inventory, update stocks, manage recipes, and monitor orders.

All features appear automatically after logging in.

---

## 4. Using the System
The system is already connected to XAMPP, so:

- Orders update inventory
- Sales records update automatically
- Menu and recipe changes reflect instantly
- Admin dashboard content loads in real time

No additional installation or setup is needed — just log in and use the features.

---

## 5. Closing the System
When finished:

1. Log out of your account  
2. Close your browser  
3. Go back to **XAMPP**  
4. Click **Stop** on:
   - Apache  
   - MySQL  

This fully shuts down the system.

### Instructions for Running the System 💻

This section serves only as a **quick reminder** of how to operate the SanServe-All system.

1. **Make sure XAMPP is installed.**
2. Open **XAMPP Control Panel**.
3. Click **Start** on:
   - Apache
   - MySQL
4. Open your browser.
5. Go to:
   - Customer Page: `http://localhost/sanserve-all/`
   - Admin Page: `http://localhost/sanserve-all/admin`
6. Log in using your account.
7. Use the system normally:
   - Customers → Order, upload receipt, receive confirmation
   - Admin → Manage menu, inventory, orders, and sales
8. To close the system:
   - Log out
   - Close the browser
   - Stop Apache and MySQL in XAMPP

This is all that is needed to run the system.



---
<p align="center">🌀 <b>Prepare, Stock, Serve, Repeat.</b> 🌀</p> 
