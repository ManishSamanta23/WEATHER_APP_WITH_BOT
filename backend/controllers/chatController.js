import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const getFallbackReply = (message, context = {}) => {
  const text = (message || '').toLowerCase();
  const city = context.city || 'your location';
  const temp = typeof context.temperature === 'number' ? `${context.temperature}°C` : null;
  const condition = context.condition || null;
  const humidity = typeof context.humidity === 'number' ? `${context.humidity}%` : null;
  const wind = typeof context.windSpeed === 'number' ? `${context.windSpeed} m/s` : null;

  const weatherSummaryParts = [
    city !== 'your location' ? `in ${city}` : 'for your location',
    temp ? `temperature is ${temp}` : null,
    condition ? `condition is ${condition}` : null,
    humidity ? `humidity is ${humidity}` : null,
    wind ? `wind is ${wind}` : null
  ].filter(Boolean);

  if (text.includes('weather') || text.includes('temperature') || text.includes('climate')) {
    return `Current weather ${weatherSummaryParts.join(', ')}. Keep an umbrella or sunglasses based on changing local conditions.`;
  }

  if (text.includes('rain')) {
    return `If rain is expected ${city !== 'your location' ? `in ${city}` : 'near you'}, carry an umbrella and prefer waterproof footwear.`;
  }

  if (text.includes('wind')) {
    return `Winds ${wind ? `are around ${wind}` : 'can change quickly'}. Avoid loose outdoor items and ride carefully if you are on a bike.`;
  }

  if (text.includes('humidity')) {
    return `Humidity ${humidity ? `is currently ${humidity}` : 'may feel high'}. Stay hydrated and wear breathable clothing.`;
  }

  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    return 'Hello! I can help with weather updates, what-to-wear tips, and travel-friendly weather advice.';
  }

  return `I can help with weather details, clothing advice, and activity planning. ${weatherSummaryParts.length ? `Right now, weather ${weatherSummaryParts.join(', ')}.` : ''}`.trim();
};

export const sendChatMessage = async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!GEMINI_API_KEY) {
      return res.json({
        reply: getFallbackReply(message, context),
        timestamp: new Date().toISOString(),
        source: 'fallback'
      });
    }

    // Build context-aware prompt
    let systemPrompt = 'You are a helpful weather assistant. Provide accurate, friendly weather advice and information.';
    
    if (context) {
      systemPrompt += ` Current weather context: City: ${context.city || 'Unknown'}, Temperature: ${context.temperature}°C, Condition: ${context.condition}, Humidity: ${context.humidity}%, Wind Speed: ${context.windSpeed} m/s.`;
    }

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\nUser: ${message}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE'
        }
      ]
    };

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Extract reply from Gemini response
    let reply = 'I couldn\'t generate a response. Please try again.';
    
    if (response.data.candidates && response.data.candidates.length > 0) {
      const candidate = response.data.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        reply = candidate.content.parts[0].text;
      }
    }

    res.json({
      reply,
      timestamp: new Date().toISOString(),
      context: {
        city: context?.city,
        temperature: context?.temperature,
        condition: context?.condition
      }
    });

  } catch (error) {
    console.error('Chat error:', error.response?.data || error.message);
    res.json({
      reply: getFallbackReply(req.body?.message, req.body?.context),
      timestamp: new Date().toISOString(),
      source: 'fallback'
    });
  }
};

// Get chat history (optional - for future enhancement)
export const getChatHistory = async (req, res) => {
  try {
    // This can be implemented later to fetch chat history from database
    res.json({
      message: 'Chat history endpoint. Implement database storage for persistent chat history.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};
