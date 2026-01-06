import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}

export async function POST(req) {
  let payload;

  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { goal, level, duration, equipment, groceries } = payload;

  if (!goal || !level || !duration) {
    return Response.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const prompt = `
You are a backend service.

Return STRICT JSON only.
No markdown.
No explanation.
No comments.

Schema:
{
  "days": [
    {
      "day": "Day 1",
      "workouts": ["string"],
      "meals": ["string"],
      "tips": ["string"]
    }
  ]
}

Rules:
- Exactly 5 days
- Short strings (5-8 words)
- Meals should be realistic meal ideas or simple recipes, not just ingredients
- Use only groceries listed
- Provide variety in meals across days
- Example meals: "Oatmeal with banana", "Grilled chicken salad", "Vegetable stir-fry"

Input:
Goal: ${goal}
Level: ${level}
Duration: ${duration}
Equipment: ${equipment || "none"}
Groceries: ${groceries || "none"}
`;

  try {
    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      temperature: 0
    });

    const jsonText = extractJSON(result.text);

    if (!jsonText) {
      throw new Error("No JSON found in response");
    }

    const data = JSON.parse(jsonText);

    return Response.json(data);
  } catch (err) {
    console.error("AI response error:", err);

    return Response.json(
      { error: "Workout generation failed" },
      { status: 502 }
    );
  }
}
