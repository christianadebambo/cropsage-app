import json
import pickle
import boto3
import numpy as np
from sklearn.ensemble import RandomForestClassifier

# Initialize S3 client
s3 = boto3.client('s3')

# Global variable to store the loaded model
model = None

def load_model():
    global model
    if model is None:
        # S3 bucket and key for the model file
        bucket = 'cropsagemodelbucket'
        key = 'crop-sage-model.pkl'
        try:
            # Fetch the model file from S3
            response = s3.get_object(Bucket=bucket, Key=key)
            model_str = response['Body'].read()
            # Deserialize the model
            model = pickle.loads(model_str)
            print("Model loaded successfully")
        except Exception as e:
            print("Error loading model:", str(e))
            raise
    return model

def lambda_handler(event, context):
    try:
        # Load the model (if not already loaded)
        model = load_model()

        # Extract input data from the event
        data = event
        
        # Prepare input data for prediction
        input_data = np.array([[
            float(data['N']), float(data['P']), float(data['K']),
            float(data['temperature']), float(data['humidity']), 
            float(data['ph']), float(data['rainfall'])
        ]])
        
        # Make prediction using the loaded model
        prediction = model.predict(input_data)
        
        # Return the prediction as a JSON response
        return {
            'statusCode': 200,
            'body': json.dumps({'prediction': prediction[0]})
        }
    except Exception as e:
        # Handle any errors and return an error response
        print("Error:", str(e))
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
