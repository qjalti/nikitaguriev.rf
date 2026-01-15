const cars = [
  {
    id: 1,
    driver: {
      name: "Никита Гуриев",
      number: "79883857654",
    },
    car: {
      model: "KIA RIO",
      number: "О 746 ХН 123",
      color: "Белая",
    },
    seats: {
      front: null,
      "back-left": null,
      "back-middle": null,
      "back-right": null,
    },
  },
  {
    id: 2,
    driver: {
      name: "Александра Воронина",
      number: "79091666647",
    },
    car: {
      model: "Nissan X-Trail",
      number: "О 000 ОО 000",
      color: "Чёрная",
    },
    seats: {
      front: null,
      "back-left": null,
      "back-middle": null,
      "back-right": null,
    },
  },
  {
    id: 3,
    driver: {
      name: "Виталий Светашов",
      number: "79265786314",
    },
    car: {
      model: "Mazda RX-8",
      number: "О 000 ОО 000",
      color: "Голубая",
    },
    seats: {
      front: null,
      "back-left": null,
      "back-middle": null,
      "back-right": null,
    },
  },
];

const seatLabels = {
  front: "Пассажир спереди",
  "back-left": "Сзади слева",
  "back-middle": "Сзади центр (менее комфортно)",
  "back-right": "Сзади справа",
};

const localKey = "carpoolData";

function loadData() {
  const saved = localStorage.getItem(localKey);
  if (saved) {
    const parsed = JSON.parse(saved);
    parsed.forEach((dataCar, i) => {
      cars[i].seats = dataCar.seats;
    });
  }
}

function saveData() {
  localStorage.setItem(localKey, JSON.stringify(cars));
}

function renderCars() {
  const container = document.getElementById("carContainer");
  container.innerHTML = "";
  cars.forEach((car) => {
    const div = document.createElement("div");
    div.className = "car";
    div.innerHTML = `<h3>Машина №${car.id}</h3>
<h4>Водитель: ${car.driver.name}<a href="tel:+${car.driver.number}" title="Позвонить"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="call"><path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg></a><a href="https://wa.me/${car.driver.number}" title="Написать в WhatsApp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="wa"><path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"></path></svg></a></h4>
<h5>${car.car.color}, ${car.car.model}, ${car.car.number}</h5>`;

    const seatsDiv = document.createElement("div");
    seatsDiv.className = "car-diagram";

    // Схема: задний ряд (3 места)
    ["back-left", "back-middle", "back-right"].forEach((seat) => {
      const seatDiv = document.createElement("div");
      seatDiv.className = "seat";
      seatDiv.innerHTML =
        `<div class="label">${seatLabels[seat]}</div>` +
        (car.seats[seat] || "Свободно");
      seatDiv.classList.add(car.seats[seat] ? "taken" : "free");
      seatsDiv.appendChild(seatDiv);
    });

    // Промежуток
    const gap = document.createElement("div");
    gap.style.gridColumn = "2 / span 1";
    seatsDiv.appendChild(gap);

    // Переднее пассажирское место
    const frontDiv = document.createElement("div");
    frontDiv.className = "seat";
    frontDiv.innerHTML =
      `<div class="label">${seatLabels["front"]}</div>` +
      (car.seats["front"] || "Свободно");
    frontDiv.classList.add(car.seats["front"] ? "taken" : "free");
    frontDiv.style.gridColumn = "2 / span 1";
    seatsDiv.appendChild(frontDiv);

    div.appendChild(seatsDiv);
    container.appendChild(div);
  });

  const carSelect = document.getElementById("carSelect");
  carSelect.innerHTML = cars
    .map(
      (car) =>
        `<option value="${car.id}">Машина ${car.id} (${car.driver})</option>`,
    )
    .join("");

  const seatSelect = document.getElementById("seatSelect");
  seatSelect.innerHTML = Object.keys(seatLabels)
    .map((seat) => `<option value="${seat}">${seatLabels[seat]}</option>`)
    .join("");
}

document.getElementById("joinForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("passengerName").value.trim();
  const carId = parseInt(document.getElementById("carSelect").value);
  const seat = document.getElementById("seatSelect").value;

  const car = cars.find((c) => c.id === carId);
  if (car.seats[seat]) {
    alert("Это место уже занято.");
    return;
  }

  for (const s in car.seats) {
    if (car.seats[s] === name) {
      alert("Вы уже записаны в эту машину.");
      return;
    }
  }

  car.seats[seat] = name;
  saveData();
  renderCars();
  this.reset();
});

loadData();
renderCars();
