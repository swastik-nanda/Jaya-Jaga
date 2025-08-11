import joblib
import pandas as pd
from flask import Flask, request, jsonify

# 1. Initialize the Flask App
app = Flask(__name__)

# 2. Load the Saved Artifacts (Model, Scaler, Encoder)
# These are loaded only once when the app starts.
model = joblib.load('jay-jaga-xgb-model.joblib')
scaler = joblib.load('jay-jaga-xgb-model-scaler.joblib')
encoder = joblib.load('jay-jaga-xgb-model-encoder.joblib')

# These are the columns our model was trained on, in the correct order.
# We'll need this to ensure the incoming data has the same structure.
model_columns = [
    'hour', 'location_Baisi Pahacha (22 Steps)', 
    'location_Grand Road (Bada Danda)', 'location_Main Temple Gate (Singhadwara)',
    'location_Northern Gate (Hasti Dwara)', 'location_Southern Gate (Aswadwara)',
    'location_Swargadwar Cremation Ground', 'location_Western Gate (Vyaghra Dwara)',
    'event_Rath Yatra Day', 'weather_condition_Heavy Rain', 
    'weather_condition_Humid', 'weather_condition_Rainy', 'weather_condition_Sunny'
]

# 3. Create the Prediction Endpoint
@app.route('/predict', methods=['POST'])
def predict():
    # Get the JSON data sent from the request
    json_data = request.get_json()
    
    # Create a pandas DataFrame from the received JSON data
    # The [0] is because we expect a single prediction at a time
    input_df = pd.DataFrame([json_data])
    
    # --- Preprocessing the Input Data ---
    # This is the most critical step. The new data must be processed
    # in the exact same way as the training data.

    # a. One-Hot Encode the categorical features
    # This creates columns for 'location', 'event', and 'weather_condition'
    input_df = pd.get_dummies(input_df)

    # b. Align columns with the model's training columns
    # This adds any missing one-hot encoded columns (and fills them with 0)
    # and ensures the column order is identical to what the model expects.
    input_df = input_df.reindex(columns=model_columns, fill_value=0)

    # --- Make the Prediction ---
    
    # c. Scale the data using the loaded scaler
    scaled_input = scaler.transform(input_df)
    
    # d. Get the model's prediction (it will be a number, e.g., 2)
    prediction_encoded = model.predict(scaled_input)
    
    # e. Convert the numerical prediction back to its original text label
    prediction_label = encoder.inverse_transform(prediction_encoded)[0]
    
    # Return the prediction as a JSON response
    return jsonify({'predicted_crowd_level': prediction_label})

# 4. Run the App
if __name__ == '__main__':
    # host='0.0.0.0' makes the app accessible from your network
    # port=5000 is the standard port for Flask apps
    app.run(host='0.0.0.0', port=5000, debug=True)