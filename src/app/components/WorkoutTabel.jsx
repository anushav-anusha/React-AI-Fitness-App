// Displays generated workout plan in a table
export default function WorkoutTable({ plan }) {
  return (
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
        {plan.map((day, idx) => (
          <tr key={idx}>
            <td>{day.day}</td>
            <td>{day.workouts.join(", ")}</td>
            <td>{day.meals.join(", ")}</td>
            <td>{day.tips.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
