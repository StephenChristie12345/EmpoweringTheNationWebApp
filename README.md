# Empowering the Nation – Website

**Developed by:**  
- **Stephen Christie – ST10467438**  
- **Tamika Singh – ST1047XXXX**  
- **Tshiamo Nkge – ST10473572**

---

## Project Summary

The **Empowering the Nation** website is a responsive and informative platform created to promote skill-building and professional development courses offered to domestic workers and gardeners in South Africa.  

It serves as the public face of the *Empowering the Nation* initiative — a place where visitors can explore available courses, calculate training fees, and contact their nearest branch for enrollment details.  

Built with **HTML**, **CSS**, and **JavaScript**, the website provides a simple, structured, and user-friendly experience that mirrors the design and purpose of the Empowering the Nation mobile application.

---

## Main Features

### Page Overview
- **Home Page (`home.html`)** – Introduces the project, featuring a banner image, mission statement, and navigation links.  
- **6-Month Courses (`6-month-courses.html`)** – Lists longer professional courses such as First Aid, Landscaping, Life Skills, and Sewing, each with brief descriptions and images.  
- **Short Courses (`short-courses.html`)** – Displays the shorter, more affordable training programs, including Cooking and Child Minding.  
- **Course Detail Pages** – Dedicated pages like `First-aid.html`, `lifeskills.html`, `landscapping.html`, and `sewing.html` explain what each program covers.  
- **Fee Calculator (`calculate-fees.html`)** – Interactive calculator powered by JavaScript (`calculate-fees.js`) that totals course fees, applies discounts, and includes VAT in real time.  
- **Contact Page (`contact-page.html`)** – Lists phone numbers, email addresses, and physical branches in **Johannesburg**, **Cape Town**, and **Durban**, with embedded Google Maps.  

### Shared Components
- **Navigation Bar (`nav-bar.html`)** – Consistent top navigation imported across all pages using `content-loader.js`.  
- **Responsive Layout (`styles.css`)** – Designed for smooth display across desktop, tablet, and mobile.  
- **Image Assets (`/assets`)** – Organized folder containing all course images and background visuals.  

---

## Visual Design and Structure

### Color Palette

| **Color** | **Hex Code** | **Description** |
|------------|--------------|-----------------|
| Dark Green | `#1e3a2a` | Represents growth and stability |
| Forest Green | `#2d8a43` | Accent and section backgrounds |
| Light Beige | `#f6eecf` | Neutral background tone |
| Gold | `#f3c623` | Highlight for key details |
| White | `#ffffff` | Text and content contrast |

## Color Scheme Implementation

### Primary Colors
```css
:root {
  --brand-dark: #1e3a2a;
  --brand-green: #2d8a43;
  --accent-gold: #f3c623;
  --cream: #f6eecf;
  --white: #ffffff;
}


### Typography
- **Headings:** Poppins – bold and clean for hierarchy  
- **Body Text:** Inter – simple and legible for easy reading  
- **Font Sizing:** Responsive scaling based on device width  

### Layout System
The entire site uses **CSS Flexbox and Grid** for spacing and structure, with consistent use of margins, padding, and rounded image cards.  

All design elements follow a **mobile-first approach** — ensuring accessibility and easy navigation from smaller screens upward.

---

## Interactive Components

### Fee Calculator (`calculate-fees.html` & `calculate-fees.js`)
- Real-time cost calculation for selected courses  
- Displays total fees and applies discounts dynamically  
- Responsive interface compatible with all modern browsers  

---

### Navigation Loader (`content-loader.js`)
- Ensures consistent navigation bar across all website pages  
- Uses JavaScript DOM manipulation and the Fetch API to insert the navigation HTML dynamically  
- Automatically loads required stylesheets if they are not already linked  

---

## **File and Folder Layout**
EMPOWERINGTHENATIONWEBAPP/
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

---

## Layout Design Architecture

### Home Page (`home.html`)
- **Hero Banner** – Large top section with background image and introductory text  
- **Mission Section** – Highlights Empowering the Nation’s purpose and values  
- **Navigation Links** – Quick access buttons to Courses and Fee Calculator  

### Courses Pages (`6-month-courses.html`, `short-courses.html`)
- **Course Cards** – Image, title, and brief description of each program  
- **Link Integration** – Each card leads to a detailed course page  
- **Responsive Grid** – CSS Flexbox layout adapts for mobile and desktop  

### Fee Calculator (`calculate-fees.html`)
- **Checkbox Interface** – Allows users to select courses  
- **Discount Logic** – Applies 10% discount for multiple selections  
- **VAT Calculation** – Adds 15% automatically  
- **Real-Time Update** – Total adjusts dynamically as checkboxes are selected  

### Contact Page (`contact-page.html`)
- **Branch Cards** – Each includes address, phone, email, and city image  
- **Google Maps Integration** – Embedded iframes for Johannesburg, Cape Town, and Durban  

---

## **Course Catalog**

### **6-Month Courses (R1500 each)**

1. **First Aid**
   - Emergency response and CPR certification.  
   - Health and safety best practices.  

2. **Landscaping**
   - Garden design, plant care, and maintenance.  

3. **Life Skills**
   - Financial literacy, communication, and problem-solving.  

4. **Sewing**
   - Garment creation, alteration, and basic pattern reading.  

---

### **6-Week Courses (R750 each)**

1. **Child Minding**
   - Basic child and baby care training.  
   - Focus on hygiene, feeding, safety, and early development.  

2. **Cooking**
   - Learn to prepare and cook nutritious family meals.  
   - Covers nutrition, meal planning, and kitchen safety.  

3. **Garden Maintenance**
   - Practical gardening knowledge for domestic settings.  
   - Watering, pruning, and planting techniques.  

