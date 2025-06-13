export const config = {
  runtime: 'nodejs22.x' // Indica explícitamente que usas Node 22
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed');
  }

  const { event, email, phone, value } = req.body;

  try {
    const pixelId = process.env.PIXEL_ID;
    const accessToken = process.env.ACCESS_TOKEN;

    const eventData = {
      data: [{
        event_name: event,
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          em: [hash(email)],
          ph: [hash(phone)]
        },
        custom_data: {
          value: value,
          currency: 'COP'
        },
        action_source: 'website'
      }],
      access_token: accessToken
    };

    const fbResponse = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });

    const result = await fbResponse.json();
    return res.status(200).json(result);

  } catch (err) {
    console.error('Meta API error:', err);
    return res.status(500).json({ error: 'Error sending conversion event' });
  }
}

// SHA256 hashing (moderno y compatible con Node 22)
import { createHash } from 'node:crypto';
function hash(data) {
  return createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
}