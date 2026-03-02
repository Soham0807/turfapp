const facilities = [
  {
    name: "Arena 5s - Downtown",
    rating: 4.8,
    sport: "Football",
    location: "MG Road",
    price: 1500,
    slots: ["06:00 PM", "07:00 PM", "08:00 PM"],
  },
  {
    name: "Smash Point Courts",
    rating: 4.7,
    sport: "Badminton",
    location: "Indiranagar",
    price: 900,
    slots: ["05:30 PM", "06:30 PM", "08:30 PM"],
  },
  {
    name: "Pitch Pro Turf",
    rating: 4.9,
    sport: "Cricket",
    location: "Koramangala",
    price: 1800,
    slots: ["04:00 PM", "06:00 PM", "09:00 PM"],
  },
];

const template = document.getElementById("facilityTemplate");
const cards = document.getElementById("facilityCards");

facilities.forEach((facility) => {
  const node = template.content.cloneNode(true);

  node.querySelector(".facility-name").textContent = facility.name;
  node.querySelector(".rating").textContent = `★ ${facility.rating}`;
  node.querySelector(
    ".facility-meta"
  ).textContent = `${facility.sport} · ${facility.location}`;
  node.querySelector(
    ".facility-price"
  ).textContent = `From ₹${facility.price}/hour`;

  const slotsContainer = node.querySelector(".slots");
  facility.slots.forEach((slot) => {
    const slotPill = document.createElement("span");
    slotPill.className = "slot-pill";
    slotPill.textContent = slot;
    slotsContainer.appendChild(slotPill);
  });

  cards.appendChild(node);
});
