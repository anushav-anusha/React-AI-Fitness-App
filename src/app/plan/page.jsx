"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PlanPage() {
  const router = useRouter();
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("workoutPlan");
    if (savedPlan) setPlan(JSON.parse(savedPlan));
  }, []);

  return (
    <main className="container">
      <h1>Generated Workout Plan</h1>

      {plan.length === 0 ? (
        <p>No plan found. Please generate a workout plan first.</p>
      ) : (
        <>
          <table className="plan-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Workouts</th>
                <th>Meals</th>
                <th>Tips</th>
              </tr>
            </thead>
            <tbody>
              {plan.map((day, i) => (
                <tr key={i}>
                  <td>{day.day}</td>
                  <td>{day.workouts.join(", ")}</td>
                  <td>{day.meals.join(", ")}</td>
                  <td>{day.tips.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => window.print()}>Print Plan</button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => router.push("/")}
          >
            Edit Plan
          </button>
        </>
      )}
    </main>
  );
}
