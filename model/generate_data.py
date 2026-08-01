import pandas as pd
import numpy as np
import random

# Seed for reproducibility
np.random.seed(42)
random.seed(42)

# Configuration
NUM_SAMPLES = 20000

# 1. Base Multipliers
month_multipliers = {
    1: 0.70, 2: 0.75, 3: 0.90, 4: 1.05, 5: 1.10, 6: 1.35, 
    7: 1.40, 8: 0.95, 9: 0.90, 10: 1.20, 11: 1.25, 12: 0.85
}
dow_multipliers = {
    0: 1.00, 1: 1.00, 2: 1.00, 3: 1.05, 4: 1.20, 5: 1.55, 6: 1.50
}
hour_base_weights = {
    0: 0.05, 1: 0.02, 2: 0.02, 3: 0.03, 4: 0.15, 5: 0.35,
    6: 0.45, 7: 0.50, 8: 0.60, 9: 0.55, 10: 0.50, 11: 0.45,
    12: 0.40, 13: 0.35, 14: 0.25, 15: 0.30, 16: 0.45, 17: 0.65,
    18: 0.80, 19: 0.65, 20: 0.45, 21: 0.30, 22: 0.15, 23: 0.08
}

locations = [
    "Baisi Pahacha (22 Steps)", "Grand Road (Bada Danda)", 
    "Main Temple Gate (Singhadwara)", "Northern Gate (Hasti Dwara)", 
    "Southern Gate (Aswadwara)", "Swargadwar Cremation Ground", 
    "Western Gate (Vyaghra Dwara)"
]
location_multipliers = {
    "Main Temple Gate (Singhadwara)": 1.35,
    "Baisi Pahacha (22 Steps)": 1.10,
    "Grand Road (Bada Danda)": 0.30,
    "Northern Gate (Hasti Dwara)": 0.55,
    "Southern Gate (Aswadwara)": 0.65,
    "Swargadwar Cremation Ground": 0.20,
    "Western Gate (Vyaghra Dwara)": 0.60,
}

weather_multipliers = {
    "Sunny": 1.00, "Cloudy": 0.95, "Humid": 1.05,
    "Rainy": 0.60, "Heavy Rain": 0.30
}

event_calendar = [
    {"name": "Rath Yatra Day", "prob": 0.12},
    {"name": "Snana Yatra", "prob": 0.04},
    {"name": "Chandan Yatra", "prob": 0.30},
    {"name": "Kartik Purnima", "prob": 0.05},
    {"name": "Dola Yatra", "prob": 0.03},
    {"name": "No Event", "prob": 0.46}
]
events = [e["name"] for e in event_calendar]
event_probs = [e["prob"] for e in event_calendar]

# Generate rows
data = []
for _ in range(NUM_SAMPLES):
    month = random.randint(1, 12)
    
    # Re-roll event if month mismatch for realism
    event = np.random.choice(events, p=event_probs)
    if event == "Rath Yatra Day" and month not in [6, 7]: event = "No Event"
    elif event == "Snana Yatra" and month != 6: event = "No Event"
    elif event == "Chandan Yatra" and month not in [4, 5]: event = "No Event"
    elif event == "Kartik Purnima" and month not in [10, 11]: event = "No Event"
    elif event == "Dola Yatra" and month != 3: event = "No Event"
    
    day_of_week = random.randint(0, 6)
    hour = random.randint(0, 23)
    location = random.choice(locations)
    weather = random.choice(list(weather_multipliers.keys()))
    
    # Base weight calculation
    base_weight = hour_base_weights[hour]
    
    # 1. Early Morning Mangala Aarti Queue logic
    if 1 <= hour <= 4:
        if event in ["Rath Yatra Day", "Snana Yatra"]:
            base_weight *= 8.0
        elif event in ["Chandan Yatra", "Kartik Purnima"]:
            base_weight *= 5.0
        elif event == "Dola Yatra":
            base_weight *= 3.5
        elif day_of_week in [4, 5, 6]:
            base_weight *= 3.0
            
    # 2. Event Base multiplier
    if event == "Rath Yatra Day": base_weight *= 3.5
    elif event == "Snana Yatra": base_weight *= 2.5
    elif event == "Kartik Purnima": base_weight *= 2.2
    elif event == "Chandan Yatra": base_weight *= 1.8
    elif event == "Dola Yatra": base_weight *= 1.6
    
    # 3. Apply Multipliers
    weight = base_weight * dow_multipliers[day_of_week] * month_multipliers[month]
    
    # 4. Location specific rules
    loc_mult = location_multipliers[location]
    if location == "Grand Road (Bada Danda)":
        if event == "Rath Yatra Day" and 8 <= hour <= 20:
            loc_mult = 1.80
        else:
            loc_mult = 0.25
    elif location == "Swargadwar Cremation Ground":
        if 4 <= hour <= 7: loc_mult = 0.45
        elif 17 <= hour <= 19: loc_mult = 0.38
        else: loc_mult = 0.10
        if event == "Kartik Purnima": loc_mult *= 4.0
        
    weight *= loc_mult
    
    # 5. Weather rules
    w_mult = weather_multipliers[weather]
    if event == "Rath Yatra Day" and weather in ["Rainy", "Heavy Rain"]:
        w_mult *= 1.6
    weight *= w_mult
    
    # Add some random noise
    noise = random.uniform(0.85, 1.15)
    final_score = weight * noise
    
    # Thresholds for class mapping (Tuned for better distribution)
    if final_score > 3.0: crowd_level = "Critical"
    elif final_score > 1.8: crowd_level = "Very High"
    elif final_score > 1.0: crowd_level = "High"
    elif final_score > 0.4: crowd_level = "Moderate"
    else: crowd_level = "Low"
    
    data.append({
        "month": month,
        "day_of_week": day_of_week,
        "hour": hour,
        "location": location,
        "weather": weather,
        "event": event,
        "crowd_level": crowd_level
    })

df = pd.DataFrame(data)

print("Generated Class Distribution:")
print(df['crowd_level'].value_counts(normalize=True) * 100)

df.to_csv("raw_footfall_data.csv", index=False)
print("Saved raw_footfall_data.csv")

# We will use raw_footfall_data.csv and do the one-hot encoding dynamically in train.py 
# if needed by the models, but pandas get_dummies is fine.
df_processed = pd.get_dummies(df, columns=["location", "weather", "event"])
df_processed.to_csv("processed_footfall_data.csv", index=False)
print("Saved processed_footfall_data.csv")
