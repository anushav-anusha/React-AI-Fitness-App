"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    goal: "",
    level: "",
    duration: "",
    equipment: "",
    groceries: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const commonGroceries = [
    "eggs", "oats", "chicken", "milk", "rice",
    "fish", "vegetables", "fruits", "nuts", "yogurt"
  ];

  useEffect(() => {
    const savedForm = localStorage.getItem("formData");
    const savedPlan = localStorage.getItem("workoutPlan");

    if (!savedPlan && savedForm) {
      setFormData(JSON.parse(savedForm));
    } else {
      localStorage.removeItem("workoutPlan");
      setFormData({
        goal: "",
        level: "",
        duration: "",
        equipment: "",
        groceries: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedGroceries = formData.groceries
      .split(",")
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .map(item => item.replace(/[^a-zA-Z0-9\s]/g, ""))
      .join(", ");
    const newErrors = {};
    if (!formData.goal) newErrors.goal = "Fitness goal is required";
    if (!formData.level) newErrors.level = "Experience level is required";
    if (!formData.duration) newErrors.duration = "Workout duration is required";
    if (!sanitizedGroceries) newErrors.groceries = "Please list your groceries";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const sanitizedForm = {
        goal: formData.goal,
        level: formData.level,
        duration: formData.duration,
        equipment: formData.equipment,
        groceries: sanitizedGroceries
      };

      const res = await fetch("/api/workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedForm),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate plan");
      }

      const data = await res.json();
      localStorage.setItem("workoutPlan", JSON.stringify(data.days));
      localStorage.setItem("formData", JSON.stringify(sanitizedForm));

      router.push("/plan");

    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1>AI Fitness Assistant</h1>

      <form onSubmit={handleSubmit} className="fitness-form">
        {errors.form && <p className="error">{errors.form}</p>}

        <label>
          <span className="required">Fitness Goal</span>
          <select name="goal" value={formData.goal} onChange={handleChange} disabled={loading}>
            <option value="">Select</option>
            <option value="lose weight">Lose Weight</option>
            <option value="build muscle">Build Muscle</option>
            <option value="stay fit">Stay Fit</option>
          </select>
          {errors.goal && <p className="error">{errors.goal}</p>}
        </label>

        <label>
          <span className="required">Experience Level</span>
          <select name="level" value={formData.level} onChange={handleChange} disabled={loading}>
            <option value="">Select</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          {errors.level && <p className="error">{errors.level}</p>}
        </label>

        <label>
          <span className="required">Workout Duration</span>
          <select name="duration" value={formData.duration} onChange={handleChange} disabled={loading}>
            <option value="">Select</option>
            <option value="20 minutes">20 minutes</option>
            <option value="30 minutes">30 minutes</option>
            <option value="45 minutes">45 minutes</option>
          </select>
          {errors.duration && <p className="error">{errors.duration}</p>}
        </label>

        <label>
          <span>Equipment</span>
          <select name="equipment" value={formData.equipment} onChange={handleChange} disabled={loading}>
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="dumbbells">Dumbbells</option>
            <option value="gym">Gym</option>
          </select>
        </label>

        <label>
          <span className="required">Groceries</span>
          <textarea
            name="groceries"
            value={formData.groceries}
            onChange={handleChange}
            placeholder="e.g., eggs, oats, chicken"
            maxLength={200}
            disabled={loading}
          />
          <p className="helper-text">
            ℹ️ Suggested groceries: {commonGroceries.join(", ")}
          </p>
          {errors.groceries && <p className="error">{errors.groceries}</p>}
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Plan"}
        </button>
      </form>
    </main>
  );
}
