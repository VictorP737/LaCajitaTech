// api/conversion.js

import { createHash } from 'node:crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { event, email, phone, value } = req.body;

  const pixelId = process.env.PIXEL_ID;
  const accessToken = process.env.ACCESS_TOKEN;

  const response = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: [{
        event_name: event,
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          em: [hash(email)],            // Nombre exacto requerido por Meta
          ph: [hash(phone)]             // Nombre exacto requerido por Meta
        },
        custom_data: {
          value: value,
          currency: 'COP'
        },
        action_source: 'website'
      }],
      access_token: accessToken
    })
  });

  const result = await response.json();
  return res.status(200).json(result);
}

function hash(data) {
  return createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
}

console.log(process.env.PIXEL_ID)