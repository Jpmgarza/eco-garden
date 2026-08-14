const TO_EMAIL = 'Jimisbuilds@gmail.com';
const FROM_EMAIL = 'Jimi Builds Website <contact@jimibuilds.com>';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (!body || typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch (e) { body = {}; }
  }

  // Honeypot — bots fill every field, real users never see this one.
  if (body.hp_field) {
    return res.status(200).json({ success: true });
  }

  const firstName = (body.first_name || '').trim();
  const lastName = (body.last_name || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();
  const city = (body.city || '').trim();
  const lawnSize = (body.lawn_size || '').trim();
  const message = (body.message || '').trim();

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const lines = [
    `First name: ${firstName}`,
    `Last name: ${lastName}`,
    `Email: ${email}`,
    `Phone: ${phone || '—'}`,
    `City / neighborhood: ${city || '—'}`,
    `Approximate lawn size: ${lawnSize || '—'}`,
    '',
    'Message:',
    message || '—'
  ];

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New consultation request from ${firstName} ${lastName}`,
        text: lines.join('\n')
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend error:', resendRes.status, errText);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
