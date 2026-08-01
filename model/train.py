import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb
from sklearn.metrics import classification_report
from sklearn.utils.class_weight import compute_sample_weight
import joblib

print("Loading data...")
df = pd.read_csv("processed_footfall_data.csv")

X = df.drop("crowd_level", axis=1)
y = df["crowd_level"]

# Save the expected column names
model_columns = list(X.columns)
joblib.dump(model_columns, "model_columns.joblib")

# Encode target variable
le = LabelEncoder()
y_encoded = le.fit_transform(y)

print("Class Mapping:")
for idx, label in enumerate(le.classes_):
    print(f"{idx}: {label}")

X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded)

print("Computing sample weights to handle class imbalance...")
sample_weights = compute_sample_weight(class_weight='balanced', y=y_train)

print("Training XGBoost...")
clf = xgb.XGBClassifier(
    n_estimators=150,
    learning_rate=0.1,
    max_depth=6,
    random_state=42,
    tree_method='hist'
)

clf.fit(X_train, y_train, sample_weight=sample_weights)

print("Evaluating...")
y_pred = clf.predict(X_test)
print(classification_report(y_test, y_pred, target_names=le.classes_))

joblib.dump(clf, "jay-jaga-xgb-model.joblib")
joblib.dump(le, "label_encoder.joblib")

print("Saved model and encoder to disk.")
