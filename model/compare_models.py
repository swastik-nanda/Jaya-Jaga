"""
compare_models.py — Jay Jaga ML Comparison
Trains XGBoost, LightGBM, and CatBoost on the same data.
Winner is chosen by F1 on (Critical + Very High) first, then overall accuracy.
The winning model is saved as jay-jaga-xgb-model.joblib (drop-in for app.py).
"""

import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report, f1_score
from sklearn.utils.class_weight import compute_sample_weight

import xgboost as xgb
import lightgbm as lgb
from catboost import CatBoostClassifier

# ─── 1. Load Data ───────────────────────────────────────────────────────────
print("Loading data...")
df_raw = pd.read_csv("raw_footfall_data.csv")  # use raw — CatBoost handles cats natively

TARGET = "crowd_level"
CATEGORICAL_COLS = ["location", "weather", "event"]
NUMERIC_COLS     = ["month", "day_of_week", "hour"]

le = LabelEncoder()
y  = le.fit_transform(df_raw[TARGET])

print("Class Mapping:")
for idx, label in enumerate(le.classes_):
    print(f"  {idx}: {label}")

# ─── 2. Train/Test Split ─────────────────────────────────────────────────────
X_raw = df_raw.drop(columns=[TARGET])
X_train_raw, X_test_raw, y_train, y_test = train_test_split(
    X_raw, y, test_size=0.2, random_state=42, stratify=y
)
sample_weights = compute_sample_weight(class_weight="balanced", y=y_train)

# One-hot encoded version (for XGBoost + LightGBM)
X_enc = pd.get_dummies(X_raw, columns=CATEGORICAL_COLS)
X_train_enc = X_enc.loc[X_train_raw.index]
X_test_enc  = X_enc.loc[X_test_raw.index]
model_columns = list(X_enc.columns)


# ─── 3. Train All Three Models ───────────────────────────────────────────────

results = {}

# ── XGBoost ──────────────────────────────────────────────────────────────────
print("\n[1/3] Training XGBoost...")
xgb_clf = xgb.XGBClassifier(
    n_estimators=150,
    learning_rate=0.1,
    max_depth=6,
    random_state=42,
    tree_method="hist",
    verbosity=0,
)
xgb_clf.fit(X_train_enc, y_train, sample_weight=sample_weights)
xgb_preds = xgb_clf.predict(X_test_enc)
xgb_report = classification_report(y_test, xgb_preds, target_names=le.classes_, output_dict=True)
results["XGBoost"] = {
    "model":    xgb_clf,
    "preds":    xgb_preds,
    "report":   xgb_report,
    "uses_enc": True,
}
print(classification_report(y_test, xgb_preds, target_names=le.classes_))

# ── LightGBM ──────────────────────────────────────────────────────────────────
print("[2/3] Training LightGBM...")
lgb_clf = lgb.LGBMClassifier(
    n_estimators=150,
    learning_rate=0.1,
    max_depth=6,
    random_state=42,
    class_weight="balanced",
    verbose=-1,
)
lgb_clf.fit(X_train_enc, y_train)
lgb_preds = lgb_clf.predict(X_test_enc)
lgb_report = classification_report(y_test, lgb_preds, target_names=le.classes_, output_dict=True)
results["LightGBM"] = {
    "model":    lgb_clf,
    "preds":    lgb_preds,
    "report":   lgb_report,
    "uses_enc": True,
}
print(classification_report(y_test, lgb_preds, target_names=le.classes_))

# ── CatBoost ──────────────────────────────────────────────────────────────────
print("[3/3] Training CatBoost...")
cat_indices = [X_raw.columns.get_loc(c) for c in CATEGORICAL_COLS]
cat_clf = CatBoostClassifier(
    iterations=150,
    learning_rate=0.1,
    depth=6,
    random_seed=42,
    auto_class_weights="Balanced",
    verbose=0,
)
cat_clf.fit(X_train_raw, y_train, cat_features=cat_indices)
cat_preds = cat_clf.predict(X_test_raw).flatten()
cat_report = classification_report(y_test, cat_preds, target_names=le.classes_, output_dict=True)
results["CatBoost"] = {
    "model":    cat_clf,
    "preds":    cat_preds,
    "report":   cat_report,
    "uses_enc": False,   # CatBoost uses raw data
}
print(classification_report(y_test, cat_preds, target_names=le.classes_))


# ─── 4. Compare & Pick Winner ────────────────────────────────────────────────
# Scoring: average F1 of (Critical + Very High) first, then overall accuracy
def priority_score(report):
    critical  = report.get("Critical", {}).get("f1-score", 0)
    very_high = report.get("Very High", {}).get("f1-score", 0)
    accuracy  = report.get("accuracy", 0)
    # Weighted: critical crowd levels matter most
    return (critical * 0.5) + (very_high * 0.3) + (accuracy * 0.2)

print("\n" + "="*60)
print("COMPARISON SUMMARY")
print("="*60)
scores = {}
for name, info in results.items():
    score = priority_score(info["report"])
    scores[name] = score
    cr = info["report"]
    crit_f1 = cr.get("Critical", {}).get("f1-score", 0)
    vh_f1   = cr.get("Very High", {}).get("f1-score", 0)
    acc     = cr.get("accuracy", 0)
    print(f"{name:12s} | Critical F1: {crit_f1:.3f} | VeryHigh F1: {vh_f1:.3f} | Accuracy: {acc:.3f} | Score: {score:.4f}")

winner_name = max(scores, key=scores.get)
print(f"\n>> WINNER: {winner_name} (Score: {scores[winner_name]:.4f})")


# ─── 5. Save Winner as Drop-in ───────────────────────────────────────────────
winner = results[winner_name]
joblib.dump(winner["model"], "jay-jaga-xgb-model.joblib")   # Keep same filename — app.py uses it
joblib.dump(le,              "label_encoder.joblib")
joblib.dump(model_columns,   "model_columns.joblib")         # Needed by app.py for column alignment

# Save a flag so app.py knows whether to use raw or encoded input
meta = {
    "winner":    winner_name,
    "uses_enc":  winner["uses_enc"],
    "cat_features": CATEGORICAL_COLS if not winner["uses_enc"] else [],
}
joblib.dump(meta, "model_meta.joblib")

print(f"Saved {winner_name} as jay-jaga-xgb-model.joblib")
print("Saved label_encoder.joblib, model_columns.joblib, model_meta.joblib")
