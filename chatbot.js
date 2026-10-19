/**
 * COFFEE WAGERA - AI CHATBOT ENGINE
 * Model: Gemini 3.5 Flash
 * Powered by: Google Generative AI API & Coffee Wagera Knowledge Base
 * Multilingual: English, Urdu, Roman Urdu
 */

(function () {
  // ==========================================
  // ==========================================
  // 1. CHATBOT CONFIGURATION
  // ==========================================
  // The Gemini 3.5 Flash API key is securely maintained on the backend in .env.
  // The client communicates with the server via the secure /api/chat proxy.

  // Multi-turn conversation history for Gemini
  let conversationHistory = [];

  // Play audio chime on message
  function playPopChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  // ==========================================
  // 2. GEMINI 3.5 FLASH CALL (VIA BACKEND PROXY)
  // ==========================================
  async function callGeminiFlash(userMessage) {
    // Append user message to history
    conversationHistory.push({
      role: "user",
      parts: [{ text: userMessage }]
    });

    // Keep history manageable (last 10 turns)
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: conversationHistory.slice(0, -1) // send previous turns to backend
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.text) {
        const botReply = data.text;

        // Save bot turn in conversation history
        conversationHistory.push({
          role: "model",
          parts: [{ text: botReply }]
        });

        // Convert markdown to clean HTML
        const htmlReply = formatMarkdownToHTML(botReply);

        // Detect if specific menu items are mentioned to offer quick add-to-cart card
        const card = detectMenuCard(userMessage + " " + botReply);

        return { text: htmlReply, card };
      } else {
        throw new Error(data.error || "No valid response text returned");
      }
    } catch (error) {
      console.warn("Backend chat call failed, falling back to local KB:", error);
      // Clean up the unpaired user message so subsequent turns don't fail alternating roles
      if (conversationHistory.length > 0 && conversationHistory[conversationHistory.length - 1].role === "user") {
        conversationHistory.pop();
      }
      return fallbackLocalKB(userMessage);
    }
  }

  // Format markdown (headings, bold, bullets, hr) to clean HTML
  function formatMarkdownToHTML(md) {
    let html = md
      // Strip / convert horizontal rules (---, ***, ___)
      .replace(/^(\s*[-*_]){3,}\s*$/gm, "<hr style='border:0;border-top:1px solid rgba(93,48,14,0.15);margin:10px 0;'>")
      // Convert Markdown Headings (###, ##, #) to styled bold titles
      .replace(/^###\s+(.*)$/gm, "<div style='font-weight:700;color:#5d300e;margin:10px 0 4px 0;font-size:1rem;'>$1</div>")
      .replace(/^##\s+(.*)$/gm, "<div style='font-weight:700;color:#5d300e;margin:12px 0 4px 0;font-size:1.05rem;'>$1</div>")
      .replace(/^#\s+(.*)$/gm, "<div style='font-weight:700;color:#5d300e;margin:14px 0 6px 0;font-size:1.1rem;'>$1</div>")
      // Bold **text**
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Italic *text*
      .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, "<em>$1</em>")
      // Bullet lists (* item, - item)
      .replace(/^[\*\-]\s+(.*)$/gim, "• $1")
      // Clean isolated stray asterisks
      .replace(/^\s*\*\s*$/gm, "")
      // Paragraphs & Line breaks
      .replace(/\r\n/g, "\n")
      .replace(/\n\n+/g, "<br><br>")
      .replace(/\n/g, "<br>");
    return html;
  }

  // Detect relevant product cards
  function detectMenuCard(text) {
    const lower = text.toLowerCase();
    if (lower.includes("spanish latte")) {
      return { id: 1, name: "Spanish Latte (Hot/Iced)", price: "PKR 680", desc: "Signature espresso with textured condensed milk and microfoam." };
    }
    if (lower.includes("cocochino") || lower.includes("hazelnut cocochino")) {
      return { id: 2, name: "Hazelnut Cocochino", price: "PKR 720", desc: "Double espresso, coconut cream, hazelnut drizzle, and hot microfoam." };
    }
    if (lower.includes("caramel frappe") || lower.includes("frappe")) {
      return { id: 6, name: "Iced Caramel Frappe", price: "PKR 740", desc: "Blended espresso, caramel sauce, whipped cream & ice." };
    }
    if (lower.includes("brownie") || lower.includes("fudge brownie")) {
      return { id: 13, name: "Fudge Brownie with Walnuts", price: "PKR 420", desc: "Soft Belgian dark chocolate brownie with crunchy walnuts." };
    }
    if (lower.includes("croissant") || lower.includes("smoked chicken croissant")) {
      return { id: 10, name: "Smoked Chicken Croissant", price: "PKR 550", desc: "Flaky French croissant, smoked chicken & cheddar." };
    }
    if (lower.includes("beans") || lower.includes("espresso beans")) {
      return { id: 16, name: "CW Signature Espresso Beans (250g)", price: "PKR 1,850", desc: "100% Specialty Arabica roasted medium-dark." };
    }
    return null;
  }

  // Offline / Fallback local KB handler
  function fallbackLocalKB(rawInput) {
    const input = rawInput.toLowerCase().trim();

    // 1. GREETINGS
    if (/^(hi|hello|hey|salam|assalam|aoa|kese ho|kaise ho)/i.test(input)) {
      return {
        text: `Salam & a very warm welcome to <strong>Coffee Wagera</strong>! ☕✨<br><br>It is my absolute pleasure to assist you today. How may I be of service? Feel free to ask about our <strong>handcrafted coffees & prices</strong>, <strong>free workspace & Wi-Fi</strong>, <strong>store locations</strong>, <strong>Barista Academy</strong>, or <strong>franchising opportunities</strong>!`
      };
    }

    // 2. POPULAR COFFEES, MENU & PRICES
    if (
      input.includes("popular") ||
      input.includes("coffee") ||
      input.includes("coffees") ||
      input.includes("menu") ||
      input.includes("price") ||
      input.includes("prices") ||
      input.includes("rate") ||
      input.includes("rates") ||
      input.includes("cost") ||
      input.includes("drink") ||
      input.includes("latte") ||
      input.includes("cappuccino")
    ) {
      return {
        text: `It is my absolute pleasure to share our customer favorites with you! All our coffees are freshly brewed using 100% specialty-grade Arabica beans roasted right here in Pakistan. ☕✨<br><br>
        <strong>Top Hot Coffees:</strong><br>
        • <strong>Spanish Latte</strong> (Our #1 Bestseller!) — PKR 680<br>
        • <strong>Hazelnut Cocochino</strong> (Signature double espresso & coconut cream) — PKR 720<br>
        • <strong>Classic Cappuccino</strong> (Dark-roasted Arabica & velvety microfoam) — PKR 590<br>
        • <strong>Caramel Macchiato</strong> (Vanilla steamed milk & caramel lattice) — PKR 650<br>
        • <strong>Americano / Long Black</strong> — PKR 490<br>
        • <strong>Flat White</strong> — PKR 620<br>
        • <strong>Mocha Deluxe</strong> — PKR 680<br><br>
        <strong>Top Cold Coffees & Frappes:</strong><br>
        • <strong>Iced Caramel Frappe</strong> — PKR 740<br>
        • <strong>Iced Spanish Latte</strong> — PKR 690<br>
        • <strong>Cold Brew On Tap</strong> (18-hr slow steep, silky & low-acid) — PKR 620<br>
        • <strong>Vanilla Frappe Cooler</strong> — PKR 710<br><br>
        <em>Please let me know if you would like me to add your favorite cup to your basket, or if you have any dietary preferences!</em>`,
        card: {
          id: 1,
          name: "Spanish Latte (Hot/Iced)",
          price: "PKR 680",
          desc: "Signature espresso with textured condensed milk and microfoam."
        }
      };
    }

    // 3. WORKSPACE & WIFI
    if (input.includes("wifi") || input.includes("work") || input.includes("laptop") || input.includes("water") || input.includes("socket") || input.includes("study")) {
      return {
        text: `We would be truly delighted to host you! Co-working is a core pillar of our culture at Coffee Wagera. 💻☕<br><br>
        You are warmly welcome to bring your laptop, study, read, or conduct meetings at any of our dine-in branches:<br><br>
        ✅ <strong>Complimentary High-Speed Wi-Fi</strong> with plenty of bandwidth for Zoom calls & coding.<br>
        ✅ <strong>Accessible Charging Outlets</strong> at tables for your laptops and smartphones.<br>
        ✅ <strong>100% Free Filtered Drinking Water</strong> for every single guest.<br>
        ✅ <strong>Zero Awkwardness</strong> — simply order any beverage or snack, and sit comfortably for hours.<br><br>
        <em>We look forward to welcoming you soon!</em>`
      };
    }

    // 4. LOCATIONS & BRANCHES
    if (input.includes("location") || input.includes("branch") || input.includes("karachi") || input.includes("islamabad") || input.includes("lahore") || input.includes("hyderabad")) {
      return {
        text: `We would be thrilled to welcome you at any of our <strong>14 locations across 5 major cities</strong>! 📍✨<br><br>
        <strong>Karachi Branches (10 Locations):</strong><br>
        • <strong>Clifton</strong>: Lane 4, Shahbaz Commercial, Phase 6 DHA (8:00 AM – 1:00 AM)<br>
        • <strong>Dolmen Mall Clifton</strong>: 2nd Floor Food Court (11:00 AM – 12:00 AM)<br>
        • <strong>LuckyOne Mall</strong>: Ground Floor (11:00 AM – 12:00 AM)<br>
        • <strong>5 Star Chowrangi</strong>: Block G, North Nazimabad (9:00 AM – 1:00 AM)<br>
        • <strong>Maskan Chowrangi</strong>: Block 7, Gulshan-e-Iqbal (8:30 AM – 1:30 AM)<br>
        • <strong>Midway Commercial</strong>: Bahria Town Karachi (9:00 AM – 12:00 AM)<br>
        • <strong>Badar Commercial</strong>: Phase 5 DHA (8:00 AM – 12:00 AM)<br>
        • <strong>Kala Pul</strong>: Main Korangi Road (8:00 AM – 11:00 PM)<br>
        • <strong>Bahadurabad</strong>: Main Alamgir Road (9:00 AM – 1:00 AM)<br>
        • <strong>Johar</strong>: Main Johar Chowrangi (9:00 AM – 1:00 AM)<br><br>
        <strong>Federal Capital & Other Major Cities:</strong><br>
        • <strong>Islamabad</strong>: Executive Complex, Main i-8 Markaz (8:30 AM – 12:30 AM)<br>
        • <strong>Lahore</strong>: Sector C Commercial, Bahria Town (9:00 AM – 1:00 AM)<br>
        • <strong>Hyderabad</strong>: Main Auto Bhan Road (10:00 AM – 12:00 AM)<br>
        • <strong>Rawalpindi</strong>: Bahria Springs Phase 7 (9:00 AM – 12:30 AM)<br><br>
        <em>All our dine-in locations offer complimentary Wi-Fi, power sockets, and free drinking water. Please drop by anytime!</em>`
      };
    }

    // 5. SNACKS & FOOD
    if (input.includes("food") || input.includes("snack") || input.includes("croissant") || input.includes("quiche") || input.includes("brownie")) {
      return {
        text: `It is our pleasure to serve delicious, homemade treats that empower our local community! All our bakery items are crafted with love by local female home-chefs. 🥐🍰<br><br>
        • <strong>Smoked Chicken Croissant</strong> — PKR 550 (Flaky all-butter croissant with smoked chicken & cheddar)<br>
        • <strong>Spinach & Feta Quiche</strong> — PKR 480 (Golden crust tart with seasoned greens & mozzarella)<br>
        • <strong>Roast Beef Panini</strong> — PKR 650 (Tender spiced beef & caramelized onions on sourdough)<br>
        • <strong>Fudge Brownie with Walnuts</strong> — PKR 420 (Decadent Belgian dark chocolate)<br>
        • <strong>Lotus Biscoff Cheesecake</strong> — PKR 580 (Silky cheesecake crowned with spiced Lotus spread)<br><br>
        <em>All our savories are 100% Halal certified. Please let me know what sounds good to you!</em>`
      };
    }

    // 6. DEFAULT FALLBACK
    return {
      text: `Thank you so much for reaching out to Coffee Wagera! ☕✨<br><br>
      As Pakistan's largest coffee brand with 14 locations, we are delighted to offer specialty coffee, free co-working spaces with high-speed Wi-Fi, and complimentary drinking water.<br><br>
      Please let me know how I may best assist you today — whether you would like to explore our <strong>Menu & Pricing</strong>, find your nearest <strong>Branch Location & Hours</strong>, learn about our <strong>Barista Academy</strong>, or inquire about <strong>Franchising</strong>. We are always happy to help!`
    };
  }

  // ==========================================
  // 3. UI RENDERING & DOM INJECTION
  // ==========================================
  function injectChatbotDOM() {
    // 1. Tooltip Hint
    const tooltip = document.createElement("div");
    tooltip.className = "cw-chat-tooltip";
    tooltip.id = "cwChatTooltip";
    tooltip.innerHTML = `<span>Chat with Coffee Wagera ☕</span>`;
    document.body.appendChild(tooltip);

    // 2. Floating Trigger Button
    const trigger = document.createElement("div");
    trigger.className = "cw-chat-trigger";
    trigger.id = "cwChatTrigger";
    trigger.setAttribute("aria-label", "Open Coffee Wagera Chatbot");
    trigger.innerHTML = `
      <i class="fa-solid fa-mug-hot"></i>
      <span class="chat-badge-dot"></span>
    `;
    document.body.appendChild(trigger);

    // 3. Chat Window
    const chatWindow = document.createElement("div");
    chatWindow.className = "cw-chat-window";
    chatWindow.id = "cwChatWindow";
    chatWindow.innerHTML = `
      <!-- Header -->
      <div class="cw-chat-header">
        <div class="cw-chat-header-info">
          <div class="cw-bot-avatar">
            <img src="cw-avatar.svg" alt="Coffee Wagera" />
            <span class="online-dot"></span>
          </div>
          <div class="cw-chat-header-text">
            <h4>Coffee Wagera</h4>
          </div>
        </div>
        <div class="cw-header-actions">
          <button class="cw-header-btn" id="cwChatReset" title="Clear Conversation">
            <i class="fa-solid fa-rotate-right"></i>
          </button>
          <button class="cw-header-btn" id="cwChatClose" title="Close Chat">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Quick Prompt Pills (Top Navigation) -->
      <div class="cw-chat-quick-prompts">
        <button class="cw-prompt-pill" data-prompt="What is your free workspace and wifi policy?">💻 Free Workspace</button>
        <button class="cw-prompt-pill" data-prompt="What are your most popular coffees and prices?">☕ Top Coffees</button>
        <button class="cw-prompt-pill" data-prompt="Where are your branches in Karachi and Islamabad?">📍 Store Locations</button>
        <button class="cw-prompt-pill" data-prompt="Do you offer student discounts?">🎓 Student Discount</button>
        <button class="cw-prompt-pill" data-prompt="Tell me about CW Barista Academy">🎓 Barista Course</button>
        <button class="cw-prompt-pill" data-prompt="How can I apply for a franchise?">🤝 Franchising</button>
      </div>

      <!-- Messages Body -->
      <div class="cw-chat-messages" id="cwChatMessages">
        <!-- Initial Welcome Message (Exact Clean Version Requested) -->
        <div class="cw-message-row bot">
          <div class="cw-msg-avatar">
            <img src="cw-avatar.svg" alt="CW" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />
          </div>
          <div class="cw-message-bubble">
            Salam & Welcome to <strong>Coffee Wagera</strong>! ☕✨<br><br>
            How can I help you today?
            <span class="cw-msg-time">${formatTime()}</span>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div class="cw-typing-indicator" id="cwTypingIndicator">
          <span></span><span></span><span></span>
        </div>
      </div>

      <!-- Input Bar -->
      <div class="cw-chat-input-bar">
        <input type="text" class="cw-chat-input" id="cwChatInput" placeholder="Ask anything about Coffee Wagera..." autocomplete="off" />
        <button class="cw-chat-send-btn" id="cwChatSendBtn" aria-label="Send Message">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    `;
    document.body.appendChild(chatWindow);

    bindChatEvents();
  }

  function formatTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  // ==========================================
  // 4. EVENT BINDING & CHAT ACTIONS
  // ==========================================
  function bindChatEvents() {
    const trigger = document.getElementById("cwChatTrigger");
    const tooltip = document.getElementById("cwChatTooltip");
    const chatWindow = document.getElementById("cwChatWindow");
    const closeBtn = document.getElementById("cwChatClose");
    const resetBtn = document.getElementById("cwChatReset");
    const input = document.getElementById("cwChatInput");
    const sendBtn = document.getElementById("cwChatSendBtn");
    const messages = document.getElementById("cwChatMessages");

    function toggleChat() {
      const isOpen = chatWindow.classList.contains("open");
      if (isOpen) {
        chatWindow.classList.remove("open");
      } else {
        chatWindow.classList.add("open");
        if (tooltip) tooltip.style.display = "none";
        setTimeout(() => input.focus(), 300);
      }
    }

    trigger.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", () => chatWindow.classList.remove("open"));

    // Reset Chat & History
    resetBtn.addEventListener("click", () => {
      conversationHistory = [];
      messages.innerHTML = `
        <div class="cw-message-row bot">
          <div class="cw-msg-avatar">
            <img src="cw-avatar.svg" alt="CW" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />
          </div>
          <div class="cw-message-bubble">
            Salam & Welcome to <strong>Coffee Wagera</strong>! ☕✨<br><br>
            How can I help you today?
            <span class="cw-msg-time">${formatTime()}</span>
          </div>
        </div>
        <div class="cw-typing-indicator" id="cwTypingIndicator">
          <span></span><span></span><span></span>
        </div>
      `;
    });

    // Send Message
    async function handleSend() {
      const userText = input.value.trim();
      if (!userText) return;

      appendUserMessage(userText);
      input.value = "";
      playPopChime();

      // Show Typing Indicator
      const typingElem = document.getElementById("cwTypingIndicator");
      if (typingElem) {
        typingElem.classList.add("active");
        messages.appendChild(typingElem);
        messages.scrollTop = messages.scrollHeight;
      }

      sendBtn.disabled = true;

      // Call Gemini 3.5 Flash
      const reply = await callGeminiFlash(userText);

      // Hide Typing Indicator and Display Bot Message
      if (typingElem) typingElem.classList.remove("active");
      appendBotMessage(reply);
      playPopChime();
      sendBtn.disabled = false;
      input.focus();
    }

    sendBtn.addEventListener("click", handleSend);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    });

    // Quick Prompt Pills
    document.querySelectorAll(".cw-prompt-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        const prompt = pill.getAttribute("data-prompt");
        input.value = prompt;
        handleSend();
      });
    });
  }

  function appendUserMessage(text) {
    const messages = document.getElementById("cwChatMessages");
    const row = document.createElement("div");
    row.className = "cw-message-row user";
    row.innerHTML = `
      <div class="cw-message-bubble">
        ${escapeHTML(text)}
        <span class="cw-msg-time">${formatTime()}</span>
      </div>
    `;
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function appendBotMessage(replyObj) {
    const messages = document.getElementById("cwChatMessages");
    const row = document.createElement("div");
    row.className = "cw-message-row bot";

    let cardHTML = "";
    if (replyObj.card) {
      cardHTML = `
        <div class="cw-rich-card">
          <div class="cw-rich-card-title">
            <span>${replyObj.card.name}</span>
            <span class="cw-rich-card-price">${replyObj.card.price}</span>
          </div>
          <p style="margin: 0; color: #5e544c;">${replyObj.card.desc}</p>
          <button class="cw-rich-card-action" onclick="if (typeof addToCart === 'function') { addToCart(${replyObj.card.id}); }">
            <i class="fa-solid fa-bag-shopping"></i> Add to Basket
          </button>
        </div>
      `;
    }

    row.innerHTML = `
      <div class="cw-msg-avatar">
        <img src="cw-avatar.svg" alt="CW" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />
      </div>
      <div class="cw-message-bubble">
        ${replyObj.text}
        ${cardHTML}
        <span class="cw-msg-time">${formatTime()}</span>
      </div>
    `;
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectChatbotDOM);
  } else {
    injectChatbotDOM();
  }
})();
