"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    goal: "",
    level: "",
    duration: "",
    equipment: "",
    groceries: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <main className="container">
      <h1>AI Fitness Assistant</h1>

      <form onSubmit={handleSubmit} className="fitness-form">
        <label>
          Fitness Goal
          <select name="goal" onChange={handleChange}>
            <option value="">Select</option>
            <option value="lose weight">Lose Weight</option>
            <option value="build muscle">Build Muscle</option>
            <option value="stay fit">Stay Fit</option>
          </select>
        </label>

        <label>
          Experience Level
          <select name="level" onChange={handleChange}>
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label>
          Workout Duration
          <select name="duration" onChange={handleChange}>
            <option value="">Select</option>
            <option value="20 minutes">20 minutes</option>
            <option value="30 minutes">30 minutes</option>
            <option value="45 minutes">45 minutes</option>
          </select>
        </label>

        <label>
          Equipment Available
          <select name="equipment" onChange={handleChange}>
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="dumbbells">Dumbbells</option>
            <option value="gym">Gym</option>
          </select>
        </label>

        <label>
          Available Groceries
          <textarea
            name="groceries"
            placeholder="e.g. eggs, oats, chicken, rice"
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="primary-btn">
          Generate Plan
        </button>
      </form>
    </main>
  );
}
