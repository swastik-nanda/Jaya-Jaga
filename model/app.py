import joblib
import pandas as pd
from flask import Flask, request, jsonify

# 1. Initialize the Flask App
app = Flask(__name__)

# 2. Load the Saved Artifacts
# These are loaded only once when the app starts.
model = joblib.load('jay-jaga-xgb-model.joblib')
encoder = joblib.load('label_encoder.joblib')
model_columns = joblib.load('model_columns.joblib')

# 3. Create the Prediction Endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the JSON data sent from the request
        json_data = request.get_json()
        
        # Backend sends 'weather_condition', model expects 'weather'
        if 'weather_condition' in json_data:
            json_data['weather'] = json_data.pop('weather_condition')
            
        # Create a pandas DataFrame
        input_df = pd.DataFrame([json_data])
        
        # Convert categorical columns explicitly to pandas 'category' type
        # to match xgboost enable_categorical=True requirements
        categorical_cols = ["location", "weather", "event"]
        for col in categorical_cols:
            if col in input_df.columns:
                input_df[col] = input_df[col].astype('category')
        
        # --- Preprocessing the Input Data ---
        # Get dummies for the input
        input_df = pd.get_dummies(input_df, columns=categorical_cols)
        
        # Align columns with the model's expected columns
        input_df = input_df.reindex(columns=model_columns, fill_value=0)
        
        # --- Make the Prediction ---
        prediction_encoded = model.predict(input_df)
        
        # Convert the numerical prediction back to text label
        prediction_label = encoder.inverse_transform(prediction_encoded)[0]
        
        return jsonify({'predicted_crowd_level': prediction_label})
    except Exception as e:
        print(f"Error predicting: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/batch-predict', methods=['POST'])
def batch_predict():
    try:
        json_data = request.get_json()
        # json_data is a list of dictionaries
        
        for item in json_data:
            if 'weather_condition' in item:
                item['weather'] = item.pop('weather_condition')
                
        input_df = pd.DataFrame(json_data)
        
        categorical_cols = ["location", "weather", "event"]
        for col in categorical_cols:
            if col in input_df.columns:
                input_df[col] = input_df[col].astype('category')
                
        input_df = pd.get_dummies(input_df, columns=categorical_cols)
        input_df = input_df.reindex(columns=model_columns, fill_value=0)
        
        predictions_encoded = model.predict(input_df)
        prediction_labels = encoder.inverse_transform(predictions_encoded)
        
        return jsonify({'predictions': prediction_labels.tolist()})
    except Exception as e:
        print(f"Error in batch predict: {str(e)}")
        return jsonify({'error': str(e)}), 500

# 4. Run the App
if __name__ == '__main__':
    # port=5001 to avoid conflict with Node.js backend
    app.run(host='0.0.0.0', port=5001, debug=True)