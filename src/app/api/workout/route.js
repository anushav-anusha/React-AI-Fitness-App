import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      goal,
      level,
      duration,
      equipment,
      groceries
    } = body;

    const prompt = `
You are a professional fitness coach and nutrition expert.

Create a personalized fitness plan based on the following details:

Fitness Goal: ${goal}
Experience Level: ${level}
Workout Duration: ${duration}
Equipment Available: ${equipment}

Available Groceries: ${groceries}

Requirements:
1. Provide a 5-day workout plan with exercise names and brief instructions.
2. Adjust intensity based on experience level.
3. Suggest simple meals using only the provided groceries.
4. Add 2–3 general fitness tips.
5. Keep the response concise and beginner-friendly.
`;

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt
    });

    console.log(JSON.stringify({ result: result.text }),
      { status: 200 })

    return new Response(
      JSON.stringify({ result: result.text }),
      { status: 200 }
    );
  } catch (error) {
    console.error("WORKOUT ERROR:", error);

    return new Response(
      JSON.stringify({ error: "Failed to generate plan" }),
      { status: 500 }
    );
  }
}
