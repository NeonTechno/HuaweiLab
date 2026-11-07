// UI preview only. Replace demo values with authenticated backend API data.
const demo = { isOpen: false, events: 8 };
function renderStatus() {
  const open = demo.isOpen;
  document.getElementById("doorPill").textContent = open ? "● OPEN" : "● CLOSED";
  document.getElementById("doorPill").classList.toggle("open", open);
  document.getElementById("doorTitle").textContent = open ? "Door is open" : "Door is closed";
  document.getElementById("doorDescription").textContent = open ? "The laboratory door is currently open." : "The laboratory is currently secured.";
  document.getElementById("doorIcon").textContent = open ? "↗" : "⌑";
  document.getElementById("doorIcon").classList.toggle("open", open);
  document.getElementById("doorTime").textContent = "Preview state · just now";
  document.getElementById("eventCount").textContent = String(demo.events).padStart(2, "0");
}
renderStatus();
// Integration contract suggestion:
// GET /api/labs/1/status -> { door: "open"|"closed", updatedAt: ISO8601 }
// GET /api/labs/1/events -> [{ eventId, studentRef, result, timestamp }]
// Never expose biometric templates or fingerprint images through these endpoints.