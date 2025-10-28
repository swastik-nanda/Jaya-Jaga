# 🌺 **Jay Jagannath: Rath Yatra Guide & AI Crowd Safety App**

### 🛠️ *MERN Stack • Python • Flask API • Machine Learning*

---

## 🎯 **Overview**

**Jay Jagannath** is a comprehensive full-stack application designed as the ultimate companion for the **Rath Yatra festival in Puri**.  
It combines a rich, interactive **MERN stack** frontend with a powerful **Python AI backend**, offering both cultural insights and a **real-time crowd safety prediction service**.

The app allows users to:
- Explore the complete **festival schedule**
- Learn about rituals and traditions
- **Book hotels** with a seamless UI and secure payment gateways with RazorPay!
- Access an **AI-powered live map** of crowd density across key temple zones

---

## ✨ **Core Features**

### 🏠 Dashboard
<p align="center">
  <img src="https://github.com/swastik-nanda/Jaya-Jaga/blob/main/assets/home-screen-ss.png?raw=true" width="700">
</p>

---

### 📅 Festival Guide & Information
- Browse the full **11-day schedule** of events — from *Pahandi Bije* to *Nilachal Abhada*  
- Read detailed articles on the **history, rituals, and significance** of the festival  

#### 🖼️ *Sections:*  
<p align="center">
  <img src="https://github.com/swastik-nanda/Jaya-Jaga/blob/main/assets/festival-sched-1.png?raw=true" width="400">
  <img src="https://github.com/swastik-nanda/Jaya-Jaga/blob/main/assets/festival-sched-2.png?raw=true" width="400">
</p>

#### 💥 About the Festival  
<p align="center">
  <img src="https://github.com/swastik-nanda/Jaya-Jaga/blob/main/assets/about-screen-ss.png?raw=true" width="450">
  <img src="https://github.com/swastik-nanda/Jaya-Jaga/blob/main/assets/about-screen-table-ss.png?raw=true" width="450">
</p>

---

### 🏨 Full-Stack Hotel Booking
A complete **e-commerce flow** built using MERN that lets users:
- Search and filter hotels (by price, rating, distance, etc.)
- View hotel locations on an interactive **Leaflet map**
- Book securely with confirmation and tracking

#### 🖼️ *Screens:*  
<p align="center">
  <img src="https://github.com/swastik-nanda/Jaya-Jaga/blob/main/assets/hotel-booking-list-ss.png?raw=true" width="450">
  <img src="https://github.com/swastik-nanda/Jaya-Jaga/blob/main/assets/hotel-checkout-ss.png?raw=true" width="450">
</p>

---

### 🧠 AI-Powered Crowd Density Prediction
The **flagship feature**: a **real-time interactive map** showing predicted crowd levels at **8 major locations**.

- Displays **live alerts** for high-density areas  
- Considers **time, weather, and event schedule** as predictive factors  
- Offers **recommendations** for devotees and emergency responders  

#### 🖼️ *Screens:*  
<p align="center">
  <img src="https://github.com/swastik-nanda/Jaya-Jaga/blob/main/assets/temple-map-ss.png?raw=true" width="450">
  <img src="https://github.com/swastik-nanda/Jaya-Jaga/blob/main/assets/temple-map-ss-1.png?raw=true" width="450">
</p>

<p align="center">
  <img src="https://github.com/swastik-nanda/Jaya-Jaga/blob/main/assets/temple-map-ss-2.png?raw=true" width="700">
</p>

---

## 🚀 **Tech Stack**

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React, React Router, Leaflet, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **ML Model** | Python, XGBoost, Scikit-learn, Pandas, Joblib |
| **ML API** | Flask |

---

## ⚙️ **Setup & Installation Guide**

This project has **two components** that must run simultaneously:

### **Part 1 — MERN Application (Frontend + Node.js Backend)**

#### 🧩 Clone the Repository
```bash
git clone https://github.com/your-username/jay-jagannath.git
cd jay-jagannath
📦 Install Backend Dependencies
cd server
npm install

🔐 Setup Environment Variables (.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

▶️ Run the Backend Server
npm start


Server runs at http://localhost:5001

📦 Install Frontend Dependencies
cd client
npm install

▶️ Run the Frontend App
npm start


React app runs at http://localhost:3000

Part 2 — AI Model API (Python + Flask)
📂 Navigate to the Model Directory
cd model

🧠 Create & Activate Virtual Environment

Windows (PowerShell):

python -m venv .venv
.venv\Scripts\activate


macOS/Linux:

python3 -m venv .venv
source .venv/bin/activate

📦 Install Python Dependencies
pip install -r requirements.txt

▶️ Run Flask API
python app.py


Flask server runs at http://localhost:5000
```

🧩 How It Works

The React frontend interacts with the Node.js backend for bookings and UI data,
while the Node server communicates with the Flask API for AI-based predictions.

## Part 2 - 🧠 **AI Model — A Deeper Dive**

Since no real dataset exists for Rath Yatra crowd patterns, a **synthetic dataset** was carefully engineered for realism.

---

### 🔹 **Data Generation (“Secret Sauce”)**

**Base Footfall:**  
Each of the 8 locations starts with a fixed base density.

**Dynamic Multipliers:**
- **Event:** Rath Yatra Day → ×4.0  
- **Hour of Day:** Peak around 6 PM, low at 3 AM  
- **Weather:** Rainy (×0.7), Sunny (×1.0), Humid (×1.1)

**Gaussian Noise:**  
Added via `np.random.normal()` to simulate realistic, unpredictable variation.  

**Binning:**  
Final values categorized into → *Low, Moderate, High, Very High, Critical.*

---

### 🔹 **Data Preprocessing**

- **One-Hot Encoding:**  
  For categorical features like `location`, `event`, and `weather`.  
  Prevents the model from learning false numeric relationships.

- **Standardization:**  
  Used `StandardScaler` for consistent feature scaling across all 13 input variables.  
  Chosen over normalization for robustness against outliers.

---

### 🔹 **Model Benchmarking**

| Model | Accuracy | Key Findings |
|--------|-----------|--------------|
| **KNN** | 84.0% | Simple and interpretable baseline model |
| **Random Forest** | 85.9% | Good accuracy but struggled with rare “Critical” cases |
| **XGBoost 🏆** | **87.4%** | Best accuracy and superior F1-score (92%) on the “Critical” class |

✅ **Final Choice:** *XGBoost* — due to its balanced performance, speed, and reliability for safety-critical predictions.

---

## 🔌 **API Endpoint**

### **POST** `/predict`

**Request Example:**
```json
{
  "hour": 18,
  "location": "Main Temple Gate (Singhadwara)",
  "event": "No Event",
  "weather_condition": "Cloudy"
}
Response Example (200 OK):

{
  "predicted_crowd_level": "High"
}
```
---
## 🌈 **Summary**

Jay Jagannath blends cultural reverence with cutting-edge AI safety,
making it more than just an app — it’s a festival companion and safety tool
for one of the world’s most iconic religious events.

“Where tradition meets technology — for a safer, smarter Rath Yatra.”
