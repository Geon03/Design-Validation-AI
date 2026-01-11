import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class DesignValidationService {
  private groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!,
  });

  async validateDesign(body: { freeTextInput: string }) {
    const input = body.freeTextInput;

    try {
      const completion = await this.groq.chat.completions.create({
        model: "llama-3.1-8b-instant", // ✅ FIXED MODEL
        messages: [
          {
            role: "system",
            content: "You are a cable design validation assistant. Return STRICT JSON only."
          },
          {
            role: "user",
            content: `
Analyze the following cable description and return validation results.

Return JSON ONLY in this format:
{
  "validation": [
    {
      "field": "Cable Standard",
      "status": "PASS | WARN | FAIL",
      "expected": "...",
      "comment": "..."
    }
  ]
}

Cable description:
${input}
`
          }
        ],
        temperature: 0.2
      });

      const aiText = completion.choices[0]?.message?.content;

      if (!aiText) {
        throw new Error("Empty AI response");
      }

      console.log("AI RAW RESPONSE:\n", aiText);

      return JSON.parse(aiText);

    } catch (error) {
      console.error("AI FAILED – Using fallback", error);

      return {
        validation: [
          {
            field: "Cable Standard",
            status: "WARN",
            expected: "IEC 60502-1",
            comment: "AI unavailable – fallback used"
          }
        ]
      };
    }
  }
}
