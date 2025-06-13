import { createHash } from 'node:crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const {
    event = 'CustomEvent',
    email = '',
    phone = '',
    value = 0,
    currency = 'COP',
    content_ids = [],
    content_type = 'product',
    action_source = 'website',
    external_id = ''
  } = req.body;

  const client_ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
  const user_agent = req.headers['user-agent'] || '';

  const pixelId = process.env.PIXEL_ID;
  const accessToken = process.env.ACCESS_TOKEN;

  const payload = {
    data: [
      {
        event_name: event,
        event_time: Math.floor(Date.now() / 1000),
        action_source,
        user_data: {
          em: email ? [hash(email)] : undefined,
          ph: phone ? [hash(phone)] : undefined,
          client_ip_address: client_ip,
          client_user_agent: user_agent,
          external_id: external_id ? hash(external_id) : undefined
        },
        custom_data: {
          value,
          currency,
          content_ids,
          content_type
        }
      }
    ],
    access_token: accessToken
  };

  payload.data[0].user_data = cleanObject(payload.data[0].user_data);

  try {
    const fbResponse = await fetch(`https://graph.facebook.com/v18.0/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await fbResponse.json();
    return res.status(200).json(result);
  } catch (err) {
    console.error('❌ Error al enviar evento a Meta:', err);
    return res.status(500).json({ error: 'Error al enviar conversión' });
  }
}

function hash(data) {
  return createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
}

function cleanObject(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined));
}
