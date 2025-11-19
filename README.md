<div align="center">
  <img src="https://github.com/yshlae/Jorge-s-Casa-de-Sans-Rival-Cafe/blob/main/images/Jorge's%20Cafe%20Logo.png" alt="Jorge's Cafe Logo" width="240" height="240">
  
  <h1>Sanserve-All: A Centralized Web-Based Inventory And Ordering Management System For Jorge’s Cafe</h1>
  
  <h3>🪢 Prepare, Respond, Recover, Repeat. 🪢 <br>
  A disaster response and relief management system for communities. Built for support, made to connect.</h3>
  
  <p><b>IT 2104</b><br>
  <a href="https://github.com/yshlae">Banaag, Ashley Mae R.</a></p>
  
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
**𝘙𝘦𝘴𝘘𝘯𝘦𝘤𝘵** is a comprehensive disaster response management system designed to help local governments and relief organizations effectively coordinate emergency response activities. By providing streamlined volunteer management and effective tracking of essential resources like food and medical supplies, the system enables communities to be better prepared for emergencies. The main objective of this system is to assist communities prepare for, respond to, and recover from calamities. 

### Application of Python Concepts 🐍
In developing ResQnect, several Python concepts and libraries were applied to achieve efficient and scalable performance, including:

- **Classes and Objects (OOP Basics)** 📚  
  I created `Volunteer` and `Resource` classes to represent individual volunteers and resources. To manage these, I implemented `VolunteerManager` and `ResourceManager` classes, handling actions like adding, viewing, and updating records. The `DisasterResponseSystem` acts as the main controller, integrating volunteer and resource management, task assignment, and response tracking under one system.

- **Encapsulation** 💊  
  Encapsulation bundles data and methods into one class while restricting direct access to object attributes. For example, the `Volunteer` and `Resource` classes have private attributes (like name and quantity) that can only be accessed or modified using specific methods.

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
<p align="center">🚨 <b>Prepare, Respond, Recover, Repeat!</b> 🚨</p> 
