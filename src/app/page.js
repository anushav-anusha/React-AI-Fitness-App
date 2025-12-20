"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    age: "", 
    goal: "", 
    level: "",
    time: "" 
  });
  const [result, setResult] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function generateWorkout() {
    e.preventDefault();
    const res = await fetch("/api/workout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResult(data.plan);
  }

  return (
    <main>
      <form
        className="fitness-form"
        onSubmit={(e) => {
          generateWorkout();
        }}
      >
        <h1>AI Fitness Planner</h1>
        <input name="age" placeholder="Age" onChange={handleChange} />
        <input name="goal" placeholder="Goal (lose weight / muscle)" onChange={handleChange} />
        <input name="level" placeholder="Level (beginner/intermediate)" onChange={handleChange} />
        <input name="time" placeholder="Minutes per day" onChange={handleChange} />
        <button type="submit">Generate Workout</button>
      </form>

      {result && <div className="fitness-output">{result}</div>}
    </main>
  );
}
