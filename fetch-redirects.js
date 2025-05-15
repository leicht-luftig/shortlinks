require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const API_URL =
  process.env.PAYLOAD_API_URL ?? 'https://preview.spross.app/api/shortlinks';
const API_SECRET = process.env.PAYLOAD_API_TOKEN ?? '';

async function fetchRedirects() {
  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `third-party-access API-Key ${API_SECRET}` },
    });
    return res.data.docs || [];
  } catch (err) {
    console.error('Failed to fetch redirects:', err.message);
    process.exit(1);
  }
}

function generateRedirectsFile(redirects) {
  const lines = redirects.map((link) => `/${link.code}  ${link.destination}  301`);
  fs.mkdirSync('dist', { recursive: true });
  fs.writeFileSync('dist/_redirects', lines.join('\n'));
  // Print all generated redirects
  lines.forEach((line) => console.log(line));
  // Print green checkmark before the success message
  console.log('\x1b[32m✓\x1b[0m Netlify _redirects file generated in dist/_redirects.');
}

(async () => {
  const redirects = await fetchRedirects();
  generateRedirectsFile(redirects);
})();
