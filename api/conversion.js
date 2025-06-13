// api/conversion.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed');
  }

  const { event, email, phone, value } = req.body;

  const response = await fetch('https://graph.facebook.com/v18.0/YOUR_PIXEL_ID/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
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
        }
      }],
      access_token: 'YOUR_ACCESS_TOKEN'
    })
  });

  const result = await response.json();
  return res.status(200).json(result);
}

// Hashing required by Meta (SHA256)
import crypto from 'crypto';
function hash(data) {
  return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
}
