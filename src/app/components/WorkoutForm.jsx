"use client";
import { useState } from "react";

export default function WorkoutForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    goal: "",
    level: "",
    duration: "",
    equipment: "",
    groceries: "",
  });

  const [errors, setErrors] = useState({}); // Inline validation errors

  // Common groceries to guide the user
  const commonGroceries = [
    "eggs",
    "oats",
    "chicken",
    "milk",
    "rice",
    "fish",
    "vegetables",
    "fruits",
    "nuts",
    "yogurt",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error while typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.goal) newErrors.goal = "Fitness goal is required";
    if (!formData.level) newErrors.level = "Experience level is required";
    if (!formData.duration) newErrors.duration = "Workout duration is required";

    // Groceries validation: required but soft warning for unknown items
    if (!formData.groceries.trim()) {
      newErrors.groceries = "Please list your groceries";
    } else {
      const items = formData.groceries
        .toLowerCase()
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean);

      const unknownItems = items.filter((i) => !commonGroceries.includes(i));

      if (unknownItems.length > 0) {
        // Soft warning for unknown items
        newErrors.groceries = `Note: Some items might be ignored: ${unknownItems.join(
          ", "
        )}`;
      }
    }

    setErrors(newErrors);

    // Stop submission only if required fields are missing
    if (!formData.goal || !formData.level || !formData.duration) return;

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="fitness-form">
      <label>
        Fitness Goal*
        <select name="goal" value={formData.goal} onChange={handleChange}>
          <option value="">Select</option>
          <option value="lose weight">Lose Weight</option>
          <option value="build muscle">Build Muscle</option>
          <option value="stay fit">Stay Fit</option>
        </select>
        {errors.goal && <p className="error">{errors.goal}</p>}
      </label>

      <label>
        Experience Level*
        <select name="level" value={formData.level} onChange={handleChange}>
          <option value="">Select</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        {errors.level && <p className="error">{errors.level}</p>}
      </label>

      <label>
        Workout Duration*
        <select name="duration" value={formData.duration} onChange={handleChange}>
          <option value="">Select</option>
          <option value="20 minutes">20 minutes</option>
          <option value="30 minutes">30 minutes</option>
          <option value="45 minutes">45 minutes</option>
        </select>
        {errors.duration && <p className="error">{errors.duration}</p>}
      </label>

      <label>
        Equipment
        <select name="equipment" value={formData.equipment} onChange={handleChange}>
          <option value="">Select</option>
          <option value="none">None</option>
          <option value="dumbbells">Dumbbells</option>
          <option value="gym">Gym</option>
        </select>
      </label>

      <label>
        Groceries*
        <textarea
          name="groceries"
          value={formData.groceries}
          onChange={handleChange}
          placeholder="e.g., eggs, oats, chicken"
        />
        <p className="helper-text">
          You can list any groceries, separated by commas. Common examples: eggs, oats, chicken, milk, rice, vegetables.
        </p>
        {errors.groceries && <p className="error">{errors.groceries}</p>}
      </label>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Plan"}
      </button>
    </form>
  );
}
