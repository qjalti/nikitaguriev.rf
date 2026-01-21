/**
 * Modules imports
 */
import express from "express";
import CONFIG from "config";
import BODY_PARSER from "body-parser";
import cors from "cors";
import PATH from "path";
import pkg from "pg";
import { Server } from "socket.io";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Telegraf } from "telegraf";
import CRON from "node-cron";

/**
 * Constants defination
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const TELEGRAM_MY_USER_ID = 738829247;
const BUILD_PATH = PATH.join(__dirname, "react-ng", "build");

/**
 * Telegraf settings
 */
let qjaltiAPIBot;
if (process.env.NODE_ENV !== "development") {
   qjaltiAPIBot = new Telegraf(CONFIG.get('qjaltiAPIToken'));
   qjaltiAPIBot.launch().then(r => console.log(r));
}

/**
 * Express settings
 */
const APP = express();

/**
 * Middlewares
 */
APP.use(cors());
APP.use(BODY_PARSER.json());

/**
 * Production mode
 */
if (process.env.NODE_ENV === "production") {
  APP.use(express.static(PATH.join(BUILD_PATH)));
  APP.use("/who-am-i-game", express.static(PATH.join(BUILD_PATH, "who-am-i-game")));
  APP.get("/rod_game", (req, res) => {
    res.sendFile(
      PATH.resolve(
        __dirname,
        "react-ng",
        "build",
        "who-am-i-game",
        "index.html",
      ),
    );
  });
  APP.get("/fst", (req, res) => {
    res.sendFile(
      PATH.resolve(__dirname, "react-ng", "build", "fst", "index.html"),
    );
  });
  APP.get("/serviceWorker.js", (req, res) => {
    res.sendFile(PATH.resolve(__dirname, "serviceWorker.js"));
  });
  APP.get("*", (req, res) => {
    res.sendFile(PATH.resolve(__dirname, "react-ng", "build", "index.html"));
  });
}

const PORT = CONFIG.get("port");

const clearSeatBooksTable = async () => {
  const BASE_OBJECT = {
    front: { status: false, name: null },
    driver: { status: true, name: "Гуриев Никита" },
    left_back: { status: false, name: null },
    center_back: { status: false, name: null },
    right_back: { status: false, name: null },
  };

  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  await CLIENT.query(
    `UPDATE book_seats
       SET data = $1
       WHERE id = $2
       RETURNING *`,
    [BASE_OBJECT, 3],
  );
  await CLIENT.end();

  IO.emit("seatBooked");
};

/**
 * PostgreSQL settings
 */
const { Client } = pkg;
const CONNECTION_DATA = {
  user: "postgres",
  host: "localhost",
  database: "pet",
  password: "FJHbJObir2#",
  port: 5432,
};

/**
 * Server run
 */
const SERVER = APP.listen(PORT, () => {
  console.log(`App backend successful started on port ${PORT}...`);
});

/**
 * Sokect.IO settings
 */
const IO = new Server(SERVER, {
  cors: {
    origin: ["https://qjalti.ru"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

/**
 * POST and GET handlers
 */
APP.post("/api/wishlist/select", async (req, res) => {
  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  const RESPONSE = await CLIENT.query(
    `SELECT *
       FROM wishlist
       ORDER BY checked ASC, last_update DESC
       LIMIT 96`,
  );
  await CLIENT.end();

  res.json({
    ok: true,
    data: RESPONSE.rows,
  });
});

APP.post("/api/arduino/select", async (req, res) => {
  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  const RESPONSE = await CLIENT.query(
    `SELECT *
       FROM temperatures
       ORDER BY id DESC LIMIT 32`,
  );
  await CLIENT.end();

  res.json({
    ok: true,
    data: RESPONSE.rows,
  });
});

APP.post("/api/wishlist/update", async (req, res) => {
  const ELEMENT_ID = req.body.elementId.split("_")[1];
  const { elementStatus } = req.body;

  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  const RESPONSE = await CLIENT.query(
    `UPDATE wishlist
       SET checked     = ${elementStatus},
           last_update = 'now'
       WHERE id = ${ELEMENT_ID}`,
  );
  await CLIENT.end();

  IO.emit("elementChanged");

  res.json({
    ok: true,
    message: "Сообщение отправлено на модерацию",
    alertColor: "success",
    data: RESPONSE.rows,
  });
});

APP.post("/api/seat_book/select", async (req, res) => {
  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  const RESPONSE = await CLIENT.query(
    `SELECT *
       FROM book_seats`,
  );
  await CLIENT.end();

  res.json({
    ok: true,
    data: RESPONSE.rows,
  });
});

APP.post("/api/seat_book/update", async (req, res) => {
  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  await CLIENT.query(
    `UPDATE book_seats
       SET data = $1
       WHERE id = $2
       RETURNING *`,
    [req.body.data, 3],
  );
  await CLIENT.end();

  IO.emit("seatBooked");

  let seatName;
  switch (req.body.credentials.selectedSeat) {
    case "front":
      seatName = "Спереди";
      break;
    case "left_back":
      seatName = "Сзади, слева";
      break;
    case "center_back":
      seatName = "Сзади, центр";
      break;
    case "right_back":
      seatName = "Сзади, справа";
      break;
  }

  try {
    if (req.body.credentials.passengerName) {
      await qjaltiAPIBot.telegram.sendMessage(TELEGRAM_MY_USER_ID, `Seat Book: ${seatName}, ${req.body.credentials.passengerName}`);
    } else {
      await qjaltiAPIBot.telegram.sendMessage(TELEGRAM_MY_USER_ID, `Seat Book cancel: ${seatName}`);
    }
  } catch (err) {
    console.error("Ошибка отправки:", err);
  }

  res.json({
    ok: true,
    message: "Место успешно забронировано",
    alertColor: "success",
    data: "data",
  });
});

APP.post("/api/arduino/get", async (req, res) => {
  const { temperature } = req.body;

  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  await CLIENT.query(
    `INSERT INTO temperatures (temperature)
       VALUES (${temperature})`,
  );
  await CLIENT.end();

  IO.emit("arduinoEvent");

  res.json({
    ok: true,
    message: "Сообщение отправлено на модерацию",
    alertColor: "success",
    data: "TODO",
  });
});

APP.post("/api/seat_book/reset", (req, res) => {
  clearSeatBooksTable().then(() => false);
  res.status(200).send({ success: true });
});

CRON.schedule("0 22 * * *", clearSeatBooksTable, {
  scheduled: false,
});