const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const sendButton = contactForm.querySelector("button");

function showContactStatus(message, isError = false) {
  contactStatus.toggleAttribute("data-error", isError);
  contactStatus.textContent = message;
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fields = new FormData(contactForm);
  const message = fields.get("message").trim();
  if (!message) {
    showContactStatus("Enter a message before sending.", true);
    contactForm.elements.namedItem("message").focus();
    return;
  }

  sendButton.disabled = true;
  showContactStatus("Sending…");

  try {
    const response = await fetch("https://casasense.sidecar360.com/api/v1/feedback", {
      method: "POST",
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fields.get("email").trim(),
        message,
        website: fields.get("website"),
        category: "Contact Sidecar Apps",
        product: "Sidecar Apps",
        source: "website",
      }),
    });

    if (response.status === 429) {
      showContactStatus("Too many messages. Wait a minute and try again.", true);
    } else if (response.ok) {
      contactForm.reset();
      showContactStatus("Message received. We can reply to the email you provided.");
    } else {
      showContactStatus("Your message could not be sent. Try again in a few minutes.", true);
    }
  } catch {
    showContactStatus("Your message could not be sent. Check your connection and try again.", true);
  } finally {
    sendButton.disabled = false;
  }
});

sendButton.disabled = false;
