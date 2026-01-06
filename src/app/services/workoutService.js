export async function fetchWorkoutPlan(payload) {
  const res = await fetch("/api/workout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Unable to fetch workout plan");
  }

  return res.json();
}
