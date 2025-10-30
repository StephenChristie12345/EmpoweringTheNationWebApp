TSHIAMO NKGE - ST10473572  
STEPHEN CHRISTIE - ST10467438  
TAMIKA SINGH - ST1047XXXX  

# Empowering the Nation - Website

A responsive educational website for skills training and professional development courses in South Africa.

## Project Overview

The **Empowering the Nation Website** is a modern, responsive platform created to inform and engage learners interested in short courses and 6-month learnership programs offered to domestic workers and gardeners across South Africa.  

It mirrors the structure and design of the Empowering the Nation Android Application but focuses on **web accessibility**, providing intuitive navigation, interactive course listings, and a real-time fee calculator built using **HTML**, **CSS**, and **JavaScript**.

---

## Website Features

### Core Functionality
- **Course Catalog** – View full lists of 6-month and 6-week courses with pricing and details.  
- **Fee Calculator** – Interactive JavaScript-based calculator applying discounts and VAT dynamically.  
- **Contact Page** – View Empowering the Nation branch details with embedded Google Maps.  
- **Course Detail Pages** – Individual course information pages with structured learning outcomes.  
- **Navigation System** – Consistent top navigation bar across all pages for ease of access.  

### Website Pages
1. **Home Page (`home.html`)** – Welcomes users with the mission statement and quick navigation.  
2. **6-Month Courses (`6-month-courses.html`)** – Displays long-term professional courses.  
3. **Short Courses (`short-courses.html`)** – Highlights shorter, skill-based training programs.  
4. **Course Details Pages** – Dedicated pages for each course (e.g., `First-aid.html`, `lifeskills.html`, `landscapping.html`, `sewing.html`).  
5. **Fee Calculator (`calculate-fees.html`)** – A dynamic calculator powered by JavaScript (`calculate-fees.js`).  
6. **Contact Page (`contact-page.html`)** – Contact information and location maps for each branch.  

---

## SCREENSHOTS

**HOME PAGE**  
<img width="925" height="834" alt="Screenshot 2025-10-31 014524" src="https://github.com/user-attachments/assets/08eabc84-c723-4233-b9c7-3c1d20840656" />

**6-MONTH COURSES PAGE**  
<img width="1903" height="906" alt="Screenshot 2025-10-31 014556" src="https://github.com/user-attachments/assets/f2d5e348-6bc9-47ce-922c-843d905553a3" />

**COURSE DETAIL PAGE (EXAMPLE)**  
<img width="802" height="908" alt="Screenshot 2025-10-31 014641" src="https://github.com/user-attachments/assets/d1f1580b-3798-4d8e-8b05-bf154dea43d2" />

**SHORT COURSES PAGE**  
<img width="939" height="908" alt="Screenshot 2025-10-31 014710" src="https://github.com/user-attachments/assets/a740ff05-4c42-4f33-8f27-23b07818020e" />
<img width="945" height="908" alt="Screenshot 2025-10-31 014723" src="https://github.com/user-attachments/assets/5cc88444-d7df-4bdf-a5bf-3d32546f4b4c" />

**FEE CALCULATOR PAGE**  
<img width="1910" height="908" alt="Screenshot 2025-10-31 014739" src="https://github.com/user-attachments/assets/234a3a3d-e6fa-4406-880f-dd5397c3f200" />
<img width="1907" height="911" alt="Screenshot 2025-10-31 014757" src="https://github.com/user-attachments/assets/297920bd-33fe-4b61-816e-1c536f841400" />

**CONTACT PAGE**  
<img width="1913" height="917" alt="Screenshot 2025-10-31 014814" src="https://github.com/user-attachments/assets/0b6e3e1a-6189-4cc8-b381-ff9e8413aa33" />

---

## Technical Specifications

### Development Requirements
- **Languages:** HTML5, CSS3, JavaScript  
- **Frameworks:** None (pure HTML, CSS, and JS)  
- **Tools Used:** Visual Studio Code, GitHub  
- **Supported Browsers:** Chrome, Edge, Firefox, Safari  

### Dependencies
No third-party libraries are required.  
All features are built using native web technologies.

---

## Project Architecture

### File Structure
```
EMPOWERINGTHENATIONWEBAPP/
│
├── assets/
│   ├── Child Mending.jpg
│   ├── Cooking.jpg
│   ├── emp.png
│   ├── FirstAid.jpg
│   ├── Garden.jpg
│   ├── homeback.png
│   ├── landscape.jpg
│   ├── Lifeskills.jpg
│   └── sewing.jpg
│
├── 6-month-courses.html
├── calculate-fees.html
├── calculate-fees.js
├── contact-page.html
├── content-loader.js
├── First-aid.html
├── home.html
├── landscapping.html
├── lifeskills.html
├── logo.png
├── nav-bar.html
├── sewing.html
├── short-courses.html
└── styles.css
```
--- 

## **Layout Design Architecture**

### **Home Page (`home.html`)**
- **Hero Banner:** Large background image featuring the Empowering the Nation logo and slogan.  
- **Mission Statement:** A concise paragraph explaining the organization’s purpose.  
- **Navigation Bar:** Persistent menu loaded via `nav-bar.html` and `content-loader.js`.  
- **Call-to-Action Buttons:** Direct links to “View Courses” and “Calculate Fees”.  
- **Responsive Design:** Adapts layout to desktop, tablet, and mobile screen sizes.

---

### **6-Month Courses Page (`6-month-courses.html`)**
- **Course Grid Layout:** Displays four professional programs — First Aid, Landscaping, Life Skills, and Sewing.  
- **Image Cards:** Each course represented by a card with image, title, and description.  
- **Hover Effects:** Subtle scaling animation for interactivity.  
- **Navigation Links:** Each card connects to a dedicated course detail page.  
- **Consistent Styling:** Inherits fonts, colors, and spacing from `styles.css`.

---

### **Short Courses Page (`short-courses.html`)**
- **Course Cards:** Highlights Child Minding, Cooking, and Garden Maintenance programs.  
- **Structured Sections:** Organized with uniform image sizes and spacing.  
- **Clean Visual Hierarchy:** Course titles appear above short summaries.  
- **Mobile-Friendly Design:** Grid collapses to a single column on smaller screens.

---

### **Course Detail Pages (`First-aid.html`, `lifeskills.html`, `landscapping.html`, `sewing.html`)**
- **Header Section:** Banner with course title and hero image.  
- **Information Sections:** Clearly divided into "Overview", "Course Duration", and "Skills Covered".  
- **Typography System:** Headings styled with bold Poppins font; paragraphs use Inter for readability.  
- **Navigation Consistency:** Same header and footer structure across all pages.

---

### **Fee Calculator Page (`calculate-fees.html`)**
- **Interactive Form:** Checkbox-based selection for all available courses.  
- **Dynamic JavaScript Functionality (`calculate-fees.js`):**
  - Calculates total price in real time.  
  - Applies a 10% discount for multiple selections.  
  - Adds 15% VAT to the final total.  
- **Result Display Box:** Shows subtotal, discount, VAT, and final total clearly.  
- **User Feedback:** Instant updates without page reload.  

---

### **Contact Page (`contact-page.html`)**
- **Branch Sections:** Separate cards for Johannesburg, Cape Town, and Durban.  
- **Embedded Google Maps:** Displays real-time map location for each branch.  
- **Contact Details:** Includes phone number, email address, and working hours.  
- **Simple Layout:** Flexbox-based structure ensuring readability and balance.  
- **Accessibility:** Proper `alt` text on images and color contrast for visibility.

---

### **Navigation Bar (`nav-bar.html`)**
- **Global Component:** Shared navigation imported dynamically using `content-loader.js`.  
- **Links:** Home | 6-Month Courses | Short Courses | Calculate Fees | Contact.  
- **Active Page Highlighting:** Indicates the user’s current page.  
- **Responsiveness:** Collapsible menu structure for smaller viewports.

---

### **Styling (`styles.css`)**
- **Color Variables:** Defined at the root for brand consistency.  
- **Typography Hierarchy:** Poppins (headings), Inter (body).  
- **Layout System:** Combination of Flexbox and CSS Grid for modern responsiveness.  
- **Spacing Rules:** Uniform margins and padding across all elements.  
- **Visual Enhancements:** Rounded corners, subtle shadows, and hover transitions.

---

