const sampleAppliances = {
  waterHeater: {
    name: "Water heater",
    location: "Garage",
    photo: "assets/sample-water-heater.webp",
    photoAlt: "CasaSense reading the label on a water heater",
    installed: "2015",
    warranty: "Ended",
    model: "XE50T10HD50U1",
    maintenance: "Schedule a service check",
    next: "Keep the model number handy when you compare replacement options.",
  },
  refrigerator: {
    name: "Refrigerator",
    location: "Kitchen",
    photo: "assets/sample-refrigerator.webp",
    photoAlt: "A homeowner using the phone beside a refrigerator",
    installed: "2021",
    warranty: "Check your receipt",
    model: "Saved in your record",
    maintenance: "Replace the water filter",
    next: "Look up the model number before you buy a replacement filter.",
  },
};

const sampleButtons = Array.from(document.querySelectorAll("[data-sample]"));

for (const button of sampleButtons) {
  button.addEventListener("click", () => {
    const record = sampleAppliances[button.dataset.sample];
    const photo = document.getElementById("sample-photo");

    for (const field of ["name", "location", "installed", "warranty", "model", "maintenance", "next"]) {
      document.getElementById("sample-" + field).textContent = record[field];
    }

    photo.src = record.photo;
    photo.alt = record.photoAlt;
    for (const item of sampleButtons) {
      item.setAttribute("aria-pressed", String(item === button));
    }
  });
}
