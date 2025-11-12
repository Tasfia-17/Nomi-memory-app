// SambaNova API utility with fallback routing
const SAMBANOVA_API_KEYS = [
  '572291bc-21f4-47ba-9099-6fee7a694e83',
  'f2bc7082-0b5f-4c97-88d2-5228040edd9f',
];

const SAMBANOVA_ENDPOINTS = [
  'https://api.sambanova.ai/v1/chat/completions',
  'https://cloud.sambanova.ai/api/v1/chat/completions',
];

interface SambaNovaResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function generateWithSambaNova(prompt: string): Promise<string> {
  let lastError: Error | null = null;

  // Try each combination of API key and endpoint
  for (const apiKey of SAMBANOVA_API_KEYS) {
    for (const endpoint of SAMBANOVA_ENDPOINTS) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'Meta-Llama-3.1-8B-Instruct',
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.7,
            top_p: 0.95,
            max_tokens: 2048,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const data: SambaNovaResponse = await response.json();
        
        if (data.choices && data.choices.length > 0) {
          const text = data.choices[0].message.content;
          return text;
        }

        throw new Error('No response from API');
      } catch (error) {
        lastError = error as Error;
        console.log(`Failed with endpoint ${endpoint} and key ${apiKey.slice(0, 10)}...`, error);
        // Continue to next combination
      }
    }
  }

  // If all attempts failed, throw the last error
  throw new Error(`All SambaNova API attempts failed: ${lastError?.message}`);
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export async function generateQuizFromText(text: string, numQuestions: number = 5): Promise<Quiz> {
  const prompt = `You are a memory companion AI helping users learn through spaced repetition. Generate ${numQuestions} multiple-choice quiz questions from the following text. Each question should test understanding and memory retention.

Text to analyze:
"""
${text}
"""

Generate exactly ${numQuestions} questions in the following JSON format:
{
  "questions": [
    {
      "question": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Brief explanation of why this is correct"
    }
  ]
}

Important:
- Make questions clear and concise (suitable for quick review)
- correctAnswer should be the index (0-3) of the correct option
- Include 4 options per question
- Questions should focus on key concepts that are worth remembering long-term
- Return ONLY valid JSON, no additional text or markdown`;

  const response = await generateWithSambaNova(prompt);
  
  // Extract JSON from response (in case it's wrapped in markdown)
  let jsonText = response.trim();
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/```\n?/g, '');
  }
  
  const quiz = JSON.parse(jsonText);
  
  // Add unique IDs to questions
  quiz.questions = quiz.questions.map((q: any, index: number) => ({
    ...q,
    id: `q_${Date.now()}_${index}`,
  }));
  
  return quiz;
}
