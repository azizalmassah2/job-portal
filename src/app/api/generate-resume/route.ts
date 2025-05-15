import type { NextApiRequest, NextApiResponse } from 'next';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: 'Prompt required' });

  try {
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'أنت مساعد لإنشاء سيرة ذاتية محترفة.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 600,
      }),
    });
    const data = await openAIResponse.json();
    if (data.error) {
      return res.status(500).json({ message: data.error.message });
    }
    const resumeText = data.choices[0].message.content;
    res.status(200).json({ resume: resumeText });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في الخادم' });
  }
}
