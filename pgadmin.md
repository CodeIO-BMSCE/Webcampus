# pgAdmin Setup Guide

This guide will walk you through the steps to set up pgAdmin and connect to a PostgreSQL server.

---

## Step 1: Login to pgAdmin

1. Open pgAdmin in your web browser by navigating to:
   **http://localhost:5050**
2. On the login screen, enter the following credentials:

   - **Email Address**: `codeio@bmsce.ac.in`
   - **Password**: `p4#,Q27o$4d/`
  
  ![Screenshot 2025-07-08 182746](https://github.com/user-attachments/assets/54c156cb-e995-4508-9b3a-6968c451d224)


---

## Step 2: Add a New Server

1. After logging in, you will see the pgAdmin Dashboard.
2. Click on **"Add New Server"** under the **"Quick Links"** section.
   
![Screenshot 2025-07-08 182811](https://github.com/user-attachments/assets/3ed98ec7-b88b-4de3-a9c4-ff350e33e947)


---

## Step 3: Configure General Server Details

1. In the **"Register - Server"** dialog box, go to the **"General"** tab.
2. In the **"Name"** field, enter:
   `postgresql`

![Screenshot 2025-07-08 182834](https://github.com/user-attachments/assets/0c514696-ee80-402e-ad6c-e588f65c611d)


---

## Step 4: Configure Connection Details

1. Switch to the **"Connection"** tab.
2. Enter the following details:

   - **Host name/address**: `db`
   - **Username**: `postgres`
   - **Password**: `example`

![Screenshot 2025-07-08 182856](https://github.com/user-attachments/assets/19508099-2401-4437-bda0-e76cc8722480)

3. Click **"Save"** to complete the server registration.

---

You should now be connected to your PostgreSQL server!
