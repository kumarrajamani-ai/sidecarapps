const casaSenseTabs = document.getElementById("casasense-tabs");
const overviewTab = document.getElementById("overview-tab");
const flowTab = document.getElementById("how-it-works-tab");
const tabs = [overviewTab, flowTab];
const tabVideo = document.getElementById("casasense-demo");
let resumeVideo = false;

for (const tab of tabs) {
  const panel = document.getElementById(tab.getAttribute("aria-controls"));
  panel.setAttribute("role", "tabpanel");
  panel.setAttribute("aria-labelledby", tab.id);
  panel.tabIndex = 0;
}

function showCasaSenseTab(selected) {
  for (const tab of tabs) {
    const isSelected = tab === selected;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    document.getElementById(tab.getAttribute("aria-controls")).hidden = !isSelected;
  }

  if (selected === flowTab && !tabVideo.paused) {
    resumeVideo = true;
    tabVideo.pause();
  } else if (selected === overviewTab && resumeVideo) {
    resumeVideo = false;
    tabVideo.play().catch(() => {
      // The play control remains available if the browser blocks autoplay.
    });
  }
}

function selectCasaSenseTab(tab) {
  showCasaSenseTab(tab);
  window.history.replaceState(null, "", tab === flowTab ? "#how-it-works" : "#casasense");
}

function followCasaSenseLink() {
  switch (window.location.hash) {
    case "#how-it-works":
      showCasaSenseTab(flowTab);
      break;
    case "#about":
      window.location.replace("about.html");
      break;
    default:
      showCasaSenseTab(overviewTab);
      break;
  }
}

for (const tab of tabs) {
  tab.addEventListener("click", () => selectCasaSenseTab(tab));
}

casaSenseTabs.addEventListener("keydown", (event) => {
  let next;
  switch (event.key) {
    case "Home":
      next = overviewTab;
      break;
    case "End":
      next = flowTab;
      break;
    case "ArrowLeft":
    case "ArrowRight":
      next = event.target === overviewTab ? flowTab : overviewTab;
      break;
    default:
      return;
  }
  event.preventDefault();
  selectCasaSenseTab(next);
  next.focus();
});

followCasaSenseLink();
casaSenseTabs.hidden = false;
window.addEventListener("hashchange", followCasaSenseLink);

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
