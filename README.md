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
  2. [Application of Python Concepts](#application-of-python-concepts)  
  3. [Integration with SDG](#integration-with-sdg)  
  4. [Running the Program](#running-the-program)

</details>

---

### Project Overview 🔍
**Jorge’s Café** is a growing food business offering pastries, meals, and beverages across multiple branches in Batangas. Despite its expansion, the café continues to rely on manual methods for recording sales, tracking inventory, and processing orders. These traditional practices—such as using Excel sheets, handwritten notes, and Viber messages—often lead to inaccurate records, delays, and communication gaps between staff and management. The lack of a centralized digital system also limits the café’s ability to monitor stock levels, validate payments, and generate summarized operational reports.

To address these operational challenges, the project introduces SanServe-All, a centralized web-based system designed to automate inventory tracking, streamline order processing, and organize sales documentation. The platform features real-time stock monitoring, automated ingredient deduction, product availability updates, and receipt-based payment verification to minimize errors and improve workflow efficiency. By integrating these essential functions into a single accessible system, SanServe-All enhances staff coordination and supports a more reliable, modernized, and scalable operational structure for Jorge’s Café.

### Application of System Design 🏗️
In developing SanServe-All, various system design principles and methodologies were applied to ensure that the platform is efficient, reliable, and aligned with the operational needs of Jorge’s Café. These design concepts guided how the system’s components were structured, how data flows between processes, and how users interact with the platform.

- **Modular Design Architecture** 🧩
  SanServe-All is divided into functional modules such as `Inventory Management`, `Order Processing`, `Receipt Verification`, and `Reporting`. Each module performs specific tasks while remaining connected to a centralized database. This modular approach ensures easier maintenance, scalability, and clear separation of responsibilities.

- **Modular Design Architecture** 🧩
  SanServe-All is divided into functional modules such as `Inventory Management`, `Order Processing`, `Receipt Verification`, and `Reporting`. Each module performs specific tasks while remaining connected to a centralized database. This modular approach ensures easier maintenance, scalability, and clear separation of responsibilities.

- **Abstraction** 🗄️  
  I hid complex implementation details in the Manager classes. For instance, users don’t see how data is saved to or loaded from JSON files; they only interact with a menu system to perform actions like assigning tasks or updating resources.

- **Polymorphism** 📑  
  I used polymorphism with the `__str__()` method in the `Volunteer` and `Resource` classes. Each class has its own implementation for converting an object to a string. Methods like `save_volunteers()` and `save_resources()` also behave similarly for different data types.

- **Data Saving and Loading** 🗂️  
  When new data is added or updated, it is saved in JSON files (`volunteers.json` and `resources.json`). On startup, the system automatically loads this data so users don’t need to re-enter it.

- **Main Menu and Submenus** 🔁  
  The `DisasterResponseSystem` uses a loop to display the main menu, where users can manage volunteers, resources, and tasks. Submenus provide detailed options, like viewing or updating specific records, and loops make navigation easy until users choose to exit.

- **Task Assignment and Tracking** ⏱️  
  Users can assign tasks like “medical aid” or “food distribution” to available volunteers. The system tracks assigned tasks and their statuses, so users can monitor ongoing responses in real-time.

- **Lists and Dictionaries** 📋  
  Volunteers are stored in a list, making it easy to add, update, or iterate through them.  
  Resources are stored in a dictionary, where each resource type is a key, and its quantity is the value for quick lookups.

- **Printing and Formatting Strings** 🗳️  
  I customized the `__str__()` method for cleaner display of volunteer and resource details. F-strings make dynamic outputs, like `f"Task '{task_type}' assigned to {volunteer.name}."`, simple and clear.

<hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">
</div>

### Integration with SDG 🌍
<div align="center">
  <img src="https://github.com/yshlae/ResQnect/blob/main/images/SDG%20Goal%2011.png" alt="SDG Goal 11" width="1000">
</div>

**ResQnect** aligns with **Sustainable Development Goal (SDG) 11: Sustainable Cities and Communities** by enhancing disaster preparedness, response, and resilience. The system supports communities by tracking and organizing essential resources like food, water, and medical supplies, enabling quick mobilization during emergencies. It efficiently manages task assignments and volunteer deployment, ensuring timely and effective responses in critical areas. Additionally, ResQnect helps build resilience by analyzing response times, resource usage, and volunteer activity, providing valuable insights to improve disaster response strategies over time. Through these functions, ResQnect empowers communities to be more inclusive, safe, and sustainable.

 <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">
</div>

### Running the Program 👩‍💻

To run the ResQnect system, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/yshlae/ResQnect.git
2. Navigate to the project repository:
   ```bash
   cd ResQnect
3. Install required dependencies:
   ```bash
   pip install -r requirements.txt
4. Run the program:
   ```bash
   python main.py
   
  <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">
</div>

### Instructions for Running the Program 💻

To run the **ResQnect** Disaster Response and Relief Management System, follow these steps:

1. **Start the Program**  
   When you run the program, you will be presented with the **main menu**. The menu will look something like this:
   - **1. Volunteer Management**
   - **2. Resource Management**
   - **3. Task Assignment**
   - **4. Disaster Response Tracker**
   - **5. Response Time Reports**
   - **6. Exit**

   Use the number associated with each option to select what you want to do.

2. **Volunteer Management: Adding a New Volunteer**
   - Choose **1. Volunteer Management** from the main menu.
   - The program will prompt you to enter the following details for a new volunteer:
     - **Name**: Enter the volunteer’s name.
     - **Type**: Specify the type of volunteer (ex., **medical**, **rescue**, or **general**).
     - **Availability**: Specify if the volunteer is available or unavailable.
   - After entering the details, the program will save this data in **volunteers.json** for future use.

3. **Resource Management: Adding Resources**
   - Go back to the main menu and choose **2. Resource Management**.
   - You will be asked to enter the resources available for use in the disaster response, such as:
     - **Food**: Enter the quantity of food available.
     - **Water**: Enter the quantity of water available.
   - This data is saved in **resources.json**, ensuring that the system can access these resources whenever needed.

4. **Task Assignment: Assigning Tasks to Volunteers**
   - From the main menu, choose **3. Task Assignment**.
   - You will be prompted to assign a task (such as **medical aid**) to an available volunteer.
   - The task is added to a task list and marked as **Assigned**, keeping track of which volunteers are assigned to which tasks.

5. **Disaster Response Tracker: Tracking and Updating Tasks**
   - Choose **4. Disaster Response Tracker** from the main menu to view and manage ongoing tasks.
   - The program will display the list of tasks with their current statuses (ex., **Assigned**, **Completed**).
   - You can update the status of tasks (ex., mark a task as **Completed** once it’s finished), ensuring real-time tracking of disaster response efforts.
  
6. **Response Time Reports: Viewing Task Response Times**
   - Choose **5. Response Time Reports** from the main menu.
   - The program will generate and display **response time reports**, showing the time taken from the assignment of a task to its completion.
   - You can view a list of tasks along with their assigned times, completion times, and how long each task took to complete. 

7. **Exit**
   - If you wish to exit the program, select **6. Exit** from the main menu.

---
<p align="center">🌀 <b>Prepare, Stock, Serve, Repeat.</b> 🌀</p> 
