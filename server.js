/**
 * COFFEE WAGERA - SECURE BACKEND PROXY SERVER
 * Protects Gemini API Key via Environment Variables (.env)
 * Serves Static Website Assets & Provides /api/chat Endpoint
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// 1. Load .env Configuration
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...values] = trimmed.split('=');
        if (key && values.length > 0) {
          process.env[key.trim()] = values.join('=').trim();
        }
      }
    }
  }
}
loadEnv();

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';

if (!GEMINI_API_KEY) {
  console.warn("⚠️ WARNING: GEMINI_API_KEY is not defined in .env!");
}

// 2. Coffee Wagera System Prompt for Gemini
const CW_SYSTEM_INSTRUCTION = `
You are the official Coffee Wagera (CW) AI Assistant, representing "Pakistan's Largest Coffee Brand!"
You are warm, welcoming, polite, cheerful, and deeply hospitable (inspired by founder Mush Panjwani's "Dhinchak" positive spirit).
You can communicate naturally in English, Urdu, and Roman Urdu.

Here is your complete, authoritative Knowledge Base:

1. BRAND OVERVIEW & VALUES:
- Founded: April 1, 2018 by Mush Panjwani.
- Tagline: "Pakistan's Largest Coffee Brand!"
- Official Website: https://coffeewagera.com/
- Online Order Portal: https://order.coffeewagera.com/
- Philosophy: Delivering specialty coffee while championing community wellness, accessible pricing, remote work hospitality, and social responsibility.
- Free Co-Working Space: Customers can sit, study, conduct meetings, and work for hours with any single food or beverage purchase. No awkwardness!
- Free High-Speed Wi-Fi: High bandwidth at all dine-in branches, with accessible electrical charging sockets for laptops and phones.
- Free Filtered Drinking Water: 100% complimentary clean drinking water at all dine-in locations.
- Specialty Arabica Beans: 100% specialty-grade Arabica beans freshly roasted in small batches by Pakistani artisanal roasters.
- Social Responsibility: Baked goods are sourced from local female home-chefs and women-led culinary startups. Strict low-waste practices and disability inclusion.
- Meaning of "Wagera": In Urdu, "Wagera" means "etcetera" or "and more". Coffee Wagera is about coffee plus free workspace, good vibes, snacks, happiness, and community!

2. FOUNDER & LEADERSHIP:
- Founder & Chief Happiness Officer (CHO): Mush Panjwani.
- Over 35 years in sales, marketing, and leadership across 20 countries.
- Certified Happiness Trainer and author of the bestselling book "Dhinchak Life".
- Official personal website: https://mushpanjwani.com/

3. COMPLETE MENU & PRICING (in PKR):
Hot Beverages:
- Spanish Latte: PKR 680 (Signature espresso with textured condensed milk and microfoam)
- Hazelnut Cocochino: PKR 720 (Double espresso, coconut cream, hazelnut drizzle, hot foam)
- Classic Cappuccino: PKR 590 (Dark-roasted Arabica, dense microfoam)
- Caramel Macchiato: PKR 650 (Vanilla steamed milk, espresso, caramel lattice)
- Americano / Long Black: PKR 490 (Double shot espresso with hot water)
- Café Latte: PKR 590 (Smooth, milky espresso)
- Flat White: PKR 620 (Ristretto shots with velvety milk)
- Mocha Deluxe: PKR 680 (Belgian chocolate, espresso, steamed milk)
- Hot Chocolate: PKR 550 (Dutch chocolate, marshmallows)
- Cardamom Karak Chai / Green Tea: PKR 320

Cold Beverages & Frappes:
- Iced Caramel Frappe: PKR 740 (Blended espresso, caramel, whipped cream)
- Cold Brew On Tap: PKR 620 (18-hour slow steep, ultra-smooth, low acid)
- Iced Spanish Latte: PKR 690 (Chilled condensed milk, espresso, ice)
- Vanilla Frappe Cooler: PKR 710 (Vanilla bean cooler with white chocolate)
- Iced Americano: PKR 510 (Crisp double espresso over iced water)
- Iced Mocha Freeze: PKR 720 (Chocolate sauce, espresso, cold milk)
- MushTonic (Signature): PKR 650 (Chilled tonic water with espresso float and citrus twist)

Savories & Snacks (made by local female home chefs):
- Smoked Chicken Croissant: PKR 550 (Flaky all-butter croissant, smoked chicken, cheddar)
- Spinach & Feta Quiche: PKR 480 (Artisanal tart, greens, mozzarella)
- Roast Beef Panini: PKR 650 (Spiced beef, caramelized onions, sourdough)
- Chicken Tikka Sandwich: PKR 520 (Desi-fusion shredded tikka on multigrain)
- Mediterranean Veggie Wrap: PKR 460 (Grilled veggies, olives, hummus)

Desserts:
- Fudge Brownie with Walnuts: PKR 420 (Belgian dark chocolate, walnut chunks)
- Lotus Biscoff Cheesecake: PKR 580 (New York cheesecake with spiced Lotus spread)
- Red Velvet Cupcake: PKR 360 (Cream cheese frosting)
- Cinnamon Swirl Roll: PKR 390 (Cinnamon glaze pastry)
- Almond Biscotti (2 pcs): PKR 220 (Italian crunchy dipping biscuits)

Beans & Merchandise:
- CW Signature Espresso Beans (250g): PKR 1,850 (100% Arabica, whole bean or ground)
- CW Single Origin Ethiopia (250g): PKR 2,200
- Original CW Pour-Over Dripper: PKR 2,400 (Ceramic spiral dripper)
- CW Eco Reusable Stainless Mug (350ml): PKR 1,950 (Keeps hot 6h / cold 12h)
- CW Signature Tote Bag: PKR 850

4. 14 STORE LOCATIONS ACROSS 5 CITIES:
- Karachi (10 branches): Clifton (Shahbaz Comm), Dolmen Mall Clifton, LuckyOne Mall, 5 Star Chowrangi (North Nazimabad), Maskan Chowrangi (Gulshan), Midway Commercial (Bahria Town), Badar Commercial (DHA Phase 5), Kala Pul (Korangi Road), Bahadurabad, Gulistan-e-Johar.
- Islamabad: Executive Complex, Main i-8 Markaz (8:30 AM - 12:30 AM). Popular with tech remote workers.
- Lahore: Sector C Commercial, Bahria Town (9:00 AM - 1:00 AM).
- Hyderabad: Main Auto Bhan Road, Near Boulevard Mall (10:00 AM - 12:00 AM).
- Rawalpindi: Commercial Plaza, Bahria Springs, Phase 7 (9:00 AM - 12:30 AM).

5. INITIATIVES & PROGRAMS:
- CW Barista Academy: 3-day practical foundation certification in Karachi covering origin science, espresso extraction, milk steaming, latte art, pour-over methods, machine maintenance. Official diploma and priority hiring.
- Loyalty App: Downloadable on Google Play & Apple App Store. Earn "Beans" points to redeem free coffees and snacks.
- Discounts: Special discounts for students (with valid ID) and senior citizens (60+).
- Franchising: Formats available: Full Dine-In Cafe, Mall Food Court Stall, Express Kiosk, Fuel Station Drive-Thru. Complete design, training, and supply chain provided. Contact: franchise@coffeewagera.com.
- Online Ordering & Delivery: Available at order.coffeewagera.com and on Foodpanda.
- Dietary: 100% Halal certified. Plant-based milk (Almond, Oat, Soy) available upon request.

RESPONSE & TONE GUIDELINES:
- EXTREME COURTESY & POLITENESS: Always treat guests with the utmost warmth, respect, and hospitality. Use courteous phrases like "It is my absolute pleasure to assist you!", "Thank you for reaching out to Coffee Wagera!", "We would be truly delighted to welcome you!", and "Please let us know if there is anything else we can do for you!". Embody the joyful "Dhinchak" spirit of our Chief Happiness Officer, Mush Panjwani.
- COMPLETE & CONCISE FINISH: Provide complete, warm, and well-structured answers. Always ensure every sentence and bullet point is fully finished and never cut off mid-sentence. Keep replies engaging, polite, and focused (around 150-250 words) so all details are delivered cleanly.
- ACCURATE PRICING: Always quote prices clearly in PKR.
- CRITICAL FORMATTING RULE: NEVER output markdown hashtags (#, ##, ###) for headings and NEVER output horizontal rules (---). Instead, use simple bold text (**Heading Name**) for titles and clean bullet points (•) for lists so it renders beautifully.
- HIGHLIGHT SIGNATURE PERKS: Proudly remind guests of our free co-working space, fast complimentary Wi-Fi, accessible charging sockets, and 100% free filtered drinking water at all dine-in branches.
- MULTILINGUAL: Respond gracefully and courteously in English, Urdu, or Roman Urdu depending on the user's language.
`;

// MIME Types Map
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.ico': 'image/x-icon'
};

// 3. HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- API ROUTE: /api/chat ---
  if (req.method === 'POST' && pathname === '/api/chat') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const { message, history } = JSON.parse(body || '{}');
        if (!message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Message is required' }));
          return;
        }

        // Build safe conversation history
        const contents = Array.isArray(history) ? [...history] : [];
        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const payload = {
          system_instruction: {
            parts: [{ text: CW_SYSTEM_INSTRUCTION }]
          },
          contents: contents.slice(-10), // keep last 10 turns
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192
          }
        };

        const candidateModels = [
          'gemini-3.5-flash-lite',
          GEMINI_MODEL,
          'gemini-3.5-flash'
        ].filter((v, i, a) => a.indexOf(v) === i); // unique

        let rawText = null;
        let lastError = null;

        for (const model of candidateModels) {
          const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
          try {
            let geminiRes = await fetch(googleUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });

            // Retry once on 503
            if (geminiRes.status === 503) {
              await new Promise(r => setTimeout(r, 600));
              geminiRes = await fetch(googleUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
            }

            if (geminiRes.ok) {
              const data = await geminiRes.json();
              if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
                rawText = data.candidates[0].content.parts[0].text;
                break; // success!
              }
            } else {
              const errBody = await geminiRes.text();
              console.warn(`Model ${model} returned status ${geminiRes.status}:`, errBody.slice(0, 150));
              lastError = `Google API returned status ${geminiRes.status}`;
            }
          } catch (e) {
            lastError = e.message;
            console.warn(`Fetch error for model ${model}:`, e.message);
          }
        }

        if (rawText) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, text: rawText }));
        } else {
          throw new Error(lastError || 'All candidate Gemini models failed');
        }
      } catch (err) {
        console.error('Gemini Backend Error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // --- STATIC FILE SERVING ---
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // Security check: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`☕ Coffee Wagera Server running securely at http://localhost:${PORT}/`);
  console.log(`🔒 Gemini API Key safely protected on backend (Model: ${GEMINI_MODEL})`);
});
