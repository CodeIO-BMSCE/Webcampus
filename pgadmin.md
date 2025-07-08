# pgAdmin Setup Guide

This guide will walk you through the steps to set up pgAdmin and connect to a PostgreSQL server.

---

## Step 1: Login to pgAdmin

1. Open pgAdmin in your web browser by navigating to:
   **http://localhost:5050**
2. On the login screen, enter the following credentials:

   - **Email Address**: `codeio@bmsce.ac.in`
   - **Password**: `p4#,Q27o$4d/`

---

## Step 2: Add a New Server

1. After logging in, you will see the pgAdmin Dashboard.
2. Click on **"Add New Server"** under the **"Quick Links"** section.

---

## Step 3: Configure General Server Details

1. In the **"Register - Server"** dialog box, go to the **"General"** tab.
2. In the **"Name"** field, enter:
   `postgresql`

---

## Step 4: Configure Connection Details

1. Switch to the **"Connection"** tab.
2. Enter the following details:

   - **Host name/address**: `db`
   - **Username**: `postgres`
   - **Password**: `example`

3. Click **"Save"** to complete the server registration.

---

You should now be connected to your PostgreSQL server!
