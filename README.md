# Project Overview:
##  Hypothetical Web Application for a Home Appliance (HA) Lab or Company 🏠🔬

> [!NOTE]  
> This website serves as an example web application for a company or organization involved in home appliance products, including testing and research.

> [!WARNING]  
> The test data are arbitrary values for demonstration purposes.


<img width="900" alt="image" src="https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/b98146c8-a8c7-481b-b6c0-5216251f9a74">



## Table of Contents

- [Tech Stack](#tech-stack)

- [Visual Overview: Example Pages of the Web Application](#hypothetical-web-application-for-a-home-appliance-ha-lab-or-company)
  - [Interactive Lab Test Data Input/Display Page🔬](#-interactive-lab-test-data-inputdisplay-page--)
  - [Data Visualization Page 📊](#-data-visualization-page--)
  - [Demo Videos 📹](#-demo-videos--)
    
- [Database](#database)
  - [Data Structure for Certain Models](#--data-structure-for-certain-models)
  - [Example of test data stored in db](#--example-of-test-data-stored-in-db)

- [Frontend](#frontend)
  - [Initial Flowchart Drawing for `Test` - `Test Details` Components](#initial-flowchart-drawing-for-test---test-details-components)
  - [Example of Test Details Page](#example-of-test-details-page)

- [Backend](#backend)
   - [Django REST Framework API Documentation](#django-rest-framework-api-documentation)
   - [Admin Page for Authorized Users to Edit](#admin-page-for-authorized-users-to-edit)


## Tech Stack

![Halab-Webapp drawio](https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/fdfb308e-bb40-4751-a8ea-fe78ca71e5a6)
 
## Visual Overview: Example Pages of the Web Application

<img width="900" alt="image" src="https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/b98146c8-a8c7-481b-b6c0-5216251f9a74">

-------------------------------------------
<div align="center">
  <h3>&lt; Interactive Lab Test Data Input/Display Page 🔬 &gt;</h3>
</div>


<img width="750" alt="image" src="https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/de072f85-c134-4832-828f-dec488fbf512">

<img width="750" alt="image" src="https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/ef67671e-b09d-4b2a-8e95-5cfeb96c737e">

<sup>_[SearchBar for Brand / Model Name](#)_</sup>

-------------------------------------------

<img width="1000" alt="image" src="https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/44f40035-b817-4c29-9537-f5c2d8f7a4df">

<sup>_[Example of Test Details Page for Test Category: "CR" & Product Category: "STICK VACUUM (CORDLESS)" ](#)_</sup>

-----------------------------------------
<div align="center">
  <h3>&lt; Data Visualization Page 📊 &gt;</h3>
</div>

<img width="500" alt="image" src="https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/bdc28481-3cc3-4cb2-84e8-2de3bfc470e1">

<img width="500" alt="image" src="https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/79377e56-7823-4428-ace8-657e220ee9c9">

----------------------------------

<div align="center">
  <h3>&lt; Demo Videos 📹 &gt;</h3> 
</div> 


#### Ex.1) - Adding a New Product
https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/ca4834ff-9173-41a5-bd5e-dfbc5f2130c3

#### Ex.2) - Adding a New Sample
https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/bc6f160a-fe99-41f5-a5ed-754a8e837c8a

#### Ex.3) - Creating a New Test Request
https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/10304667-3ca2-4a81-9806-d50560859288

#### Ex.4) - Test Details Page - Adding a Test Sample with Search Bar Integration
https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/3b8c6c0f-cc66-4300-bcce-543b30d248aa

#### - Ex.5) - Test Details Page - Test Data CRUD Example
https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/fa2a3221-795f-49d4-8f9e-b9800ef69b1c

#### - Ex.6) - Test Details Page - Test Data CRUD Example 2
https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/2633a3d0-7b1c-43a8-933c-19bee15285b0

#### - Ex.7) - Test Details Page - Closing Test
https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/da9a7538-ab66-4106-83e4-ca58614a93c7

#### - Ex. 8) - Dash App Page for Real-Time Data Visualization
https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/f613b6ef-5881-47b8-a8ca-30b812a101ba


-----------------------------------------------

## Database

#### PostgreSQL

`django.db.backends.postgresql_psycopg2`

<details>
 <summary>Database Schema Overview</summary>
  
![lg-webapp-db](https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/d8bb1fae-7e33-4283-b488-f1ec9fa28ab6)
</details>


##### - Data Structure for Certain Models
![image](https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/1f222ded-272b-489c-9a0a-ca23c35c67ef)


##### - Example of test data stored in db
![image](https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/e2189f13-ff01-40ae-bb1a-ec3eb54f090d)


-------------------------------------------------------------------

##  Frontend 

### <React.js>

- Used `MUI Library` for styling, supplemented by occasional use of `.module.css` files.
- `axios.js` - to build connection with backend server

### Initial Flowchart Drawing for `Test` - `Test Details` Components

![image](https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/dc9ade8a-c56f-4280-baf4-149962134b90)

turned into ⬇

### Example of Test Details Page
![image](https://github.com/kwoolaid725/halab-webapp-drf-react/assets/107806433/4be7a8e3-c9aa-4de7-8ef6-bf29550a250b)


> [!NOTE]
> FOR  TEST COMPONENTS

- `Test` & `Test Details` Components are located in `"./frontend/lg-webapp-react/src/components/Test/CR"`
 
- `Test Details` page load tables according to the selected `Test Category` and `Product Category` in the parent `Test` window.

- The data array for the dynamic table load is stored as JSON format like `./frontend/lg-webapp-react/public/test-measures-cordless.json`


------------------------------------------


## Backend

- `Django` and `Django REST Framework` for building RESTful APIs.
- `Simple JWT token` is used for user authorization
- `Poetry` and `Makefile` were used for learning purposes.

### Django REST Framework API Documentation:

<img width="1084" alt="image" src="https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/c48da324-18fa-466e-9539-5486c46964f8">

<img width="1087" alt="image" src="https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/7ef08793-260c-4dff-ac3a-2b953a589cbe">

#### Admin Page for Authorized Users to Edit

<img width="1086" alt="image" src="https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/5a5ab9f0-5ab7-4d31-b257-664e3fa1e85c">

##### - Products 
<img width="1076" alt="image" src="https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/467faa3b-8a7b-457e-885e-fa0f76fbf459">

##### - Samples
<img width="1074" alt="image" src="https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/757d7f11-8b6d-49fb-9039-470daf1c8164">

##### - Tests (Parent)
<img width="1078" alt="image" src="https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/1342fe34-5bb3-4dde-a408-8e1af01d97f2">

##### - Test Details for Vacuums (Child)
<img width="1076" alt="image" src="https://github.com/kwoolaid725/LG-WebApp-ver2-drf-react/assets/107806433/57c7ee03-9e4f-43eb-809b-35da7468e67e">

------------------------------------------------------



