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

const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");
const authDialog = document.getElementById("authDialog");
const authForm = document.getElementById("authForm");
const paymentHint = document.getElementById("paymentHint");
const selectedBooking = document.getElementById("selectedBooking");
const paymentForm = document.getElementById("paymentForm");
const paymentSuccess = document.getElementById("paymentSuccess");
const startBookingBtn = document.getElementById("startBookingBtn");

const appState = {
  isSignedIn: false,
  userEmail: "",
  selectedFacility: null,
};

const renderAuthState = () => {
  signInBtn.classList.toggle("hidden", appState.isSignedIn);
  signOutBtn.classList.toggle("hidden", !appState.isSignedIn);

  if (!appState.isSignedIn) {
    paymentHint.textContent = "Sign in and select a facility to proceed to payment.";
    selectedBooking.classList.add("hidden");
    paymentForm.classList.add("hidden");
    paymentSuccess.classList.add("hidden");
  }
};

const goToPayment = (facility) => {
  appState.selectedFacility = facility;

  paymentHint.textContent = "Review your booking and complete payment.";
  selectedBooking.innerHTML = `<strong>${facility.name}</strong><br>${facility.sport} • ${facility.location}<br>Amount: ₹${facility.price}/hour`;
  selectedBooking.classList.remove("hidden");
  paymentForm.classList.remove("hidden");
  paymentSuccess.classList.add("hidden");

  document.getElementById("payment").scrollIntoView({ behavior: "smooth" });
};

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

  node.querySelector(".book-btn").addEventListener("click", () => {
    if (!appState.isSignedIn) {
      authDialog.showModal();
      return;
    }

    goToPayment(facility);
  });

  cards.appendChild(node);
});

signInBtn.addEventListener("click", () => {
  authDialog.showModal();
});

authForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    return;
  }

  appState.isSignedIn = true;
  appState.userEmail = email;
  authDialog.close();
  authForm.reset();
  renderAuthState();
});

signOutBtn.addEventListener("click", () => {
  appState.isSignedIn = false;
  appState.userEmail = "";
  appState.selectedFacility = null;
  paymentForm.reset();
  renderAuthState();
});

paymentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!appState.selectedFacility) {
    return;
  }

  paymentSuccess.textContent = `Payment successful! Your booking for ${appState.selectedFacility.name} is confirmed.`;
  paymentSuccess.classList.remove("hidden");
  paymentForm.reset();
});

startBookingBtn.addEventListener("click", () => {
  document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
});

renderAuthState();
