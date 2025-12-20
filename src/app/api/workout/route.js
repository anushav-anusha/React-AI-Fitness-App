export const runtime = "nodejs";

import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `
        Create a 7-day workout plan.
        Age: ${body.age}
        Goal: ${body.goal}
        Fitness Level: ${body.level}
        Time per day: ${body.time} minutes.
        Use bullet points.
      `,
    });

    return Response.json({ plan: result.text });
  } catch (error) {
    return Response.json(
      { error: "Failed to generate workout plan" },
      { status: 500 }
    );
  }
}
