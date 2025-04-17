console.log("✅ Script loaded");

const orderTicker = document.getElementById("order-ticker");
const countdown = document.getElementById("countdown");

// 👀 Fake Order Ticker Logic
const names = ["Ngozi", "Emeka", "Grace", "Amina", "Chuka", "Tunde", "Ada", "Yusuf", "Blessing", "Samuel"];
const bottles = [1, 2, 3];

function showFakeOrder() {
  const name = names[Math.floor(Math.random() * names.length)];
  const bottle = bottles[Math.floor(Math.random() * bottles.length)];
  orderTicker.textContent = `${name} just ordered ${bottle} bottle${bottle > 1 ? 's' : ''}`;
  orderTicker.style.display = "block";

  setTimeout(() => {
    console.log("❌ Hiding fake order");
    orderTicker.style.display = "none";
  }, Math.random() * 5000 + 5000); // 5–10s
}

function startFakeOrderLoop() {
  showFakeOrder();
  setInterval(showFakeOrder, Math.random() * 20000 + 40000); // 40–60s
}

if (orderTicker) {
  console.log("✅ Found order ticker element");
  startFakeOrderLoop();
}

// ⏳ Countdown Timer (15 mins)
if (countdown) {
  let timeLeft = 15 * 60;

  function updateCountdown() {
    if (timeLeft <= 0) {
      countdown.innerHTML = "⚠️ Offer expired. Try again later!";
      return;
    }
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    countdown.innerHTML = `⏳ Hurry! This offer expires in ${mins}m ${secs < 10 ? '0' + secs : secs}s`;
    timeLeft--;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ✅ Smooth Scroll for sticky CTA
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ✅ WhatsApp Chat Button
const whatsappBtn = document.createElement("a");
whatsappBtn.href = "https://wa.me/2349037925799";
whatsappBtn.target = "_blank";
whatsappBtn.innerHTML = "💬 Chat with Us";
whatsappBtn.style = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25D366;
  color: white;
  padding: 12px 16px;
  border-radius: 50px;
  font-weight: bold;
  text-decoration: none;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
`;
document.body.appendChild(whatsappBtn);

// ✅ Formspree Submit Handler
const form = document.getElementById("order-form");
if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (res.ok) {
        form.reset();
        form.innerHTML = `<div style="padding: 20px; text-align: center; background-color: #e0ffe0; color: #066a00; border-radius: 10px;">🎉 Thank you! Your order has been received. We'll contact you shortly.</div>`;
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("🚨 Network error. Please check your connection.");
    }
  });
}
// 🔄 FAQ Toggle
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(btn => {
  btn.addEventListener("click", () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.style.display === "block";

    // Close all others
    document.querySelectorAll(".faq-answer").forEach(a => a.style.display = "none");

    // Toggle current
    answer.style.display = isOpen ? "none" : "block";
  });
});
