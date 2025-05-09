/**
 * Modules imports
 */
import express from 'express';
import CONFIG from 'config';
import BODY_PARSER from 'body-parser';
import cors from 'cors';
import PATH from 'path';
import pkg from 'pg';
import {Server} from 'socket.io';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {Telegraf} from 'telegraf';
import multer from 'multer';

/**
 * Constants defination
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const TELEGRAM_MY_USER_ID = 738829247;

/**
 * Telegraf settings
 */
const BOT = new Telegraf(CONFIG.get('qjaltiAPIToken'));
BOT.launch().then(r => console.log(r));

/**
 * Multer
 */
const storage = multer.memoryStorage();
const upload = multer({storage});

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
if (process.env.NODE_ENV === 'production') {
  APP.use('/', express.static(PATH.join(__dirname, 'react-ng', 'build')));
  APP.get('*', (req, res) => {
    res.sendFile(PATH.resolve(__dirname, 'react-ng', 'build', 'index.html'));
  });
}

const PORT = CONFIG.get('port');

/**
 * PostgreSQL settings
 */
const {Client} = pkg;
const CONNECTION_DATA = {
  user: 'postgres',
  host: 'localhost',
  database: 'pet',
  password: 'FJHbJObir2#',
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
    origin: ['https://qjalti.ru'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

/**
 * POST and GET handlers
 */
APP.post('/api/wishlist/select', async (req, res) => {
  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  const RESPONSE = await CLIENT.query(
      `SELECT *
       FROM wishlist
       ORDER BY checked ASC, last_update DESC`
  );
  await CLIENT.end();

  res.json(
      {
        ok: true,
        data: RESPONSE.rows,
      },
  );
});
APP.post('/api/arduino/select', async (req, res) => {
  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  const RESPONSE = await CLIENT.query(
      `SELECT *
       FROM temperatures
       ORDER BY id DESC LIMIT 512`
  );
  await CLIENT.end();

  res.json(
      {
        ok: true,
        data: RESPONSE.rows,
      },
  );
});

APP.post('/api/wishlist/update', async (req, res) => {

  const ELEMENT_ID = req.body.elementId.split('_')[1];
  const {elementStatus} = req.body;

  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  const RESPONSE = await CLIENT.query(
      `UPDATE wishlist
       SET checked     = ${elementStatus},
           last_update = 'now'
       WHERE id = ${ELEMENT_ID}`
  );
  await CLIENT.end();

  IO.emit(
      'elementChanged',
  );

  res.json(
      {
        ok: true,
        message: 'Сообщение отправлено на модерацию',
        alertColor: 'success',
        data: RESPONSE.rows,
      },
  );
});

APP.post('/api/arduino/get', async (req, res) => {

  const {temperature} = req.body;

  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  const RESPONSE = await CLIENT.query(
      `INSERT INTO temperatures (temperature)
       VALUES (${temperature})`
  );
  await CLIENT.end();

  IO.emit(
      'arduinoEvent',
  );

  res.json(
      {
        ok: true,
        message: 'Сообщение отправлено на модерацию',
        alertColor: 'success',
        data: 'TODO',
      },
  );
});

APP.post('/api/webcam7/detections', upload.single('image'), async (req, res) => {

  const REQUEST_BODY = req.body;

  if (!req.file) {
    return res.status(400).send('Файл не найден');
  }

  try {
    await BOT.telegram.sendPhoto(
        TELEGRAM_MY_USER_ID,
        {
          source: Buffer.from(req.file.buffer),
          filename: req.file.originalname || 'image.jpg'
        });

    res.send('Изображение отправлено в Telegram');
  } catch (err) {
    console.error('Ошибка отправки:', err);
    res.status(500).send('Ошибка отправки');
  }

  await BOT.telegram.sendMessage(
      TELEGRAM_MY_USER_ID,
      `GET`
  );

//   await BOT.telegram.sendMessage(
//       TELEGRAM_MY_USER_ID,
//       `Status indicator: ${REQUEST_BODY.page.status_indicator}
// Status description: ${REQUEST_BODY.page.status_description}
// Incident name: ${REQUEST_BODY.incident.name}
// Incident status: ${REQUEST_BODY.incident.status}
// Incident impact: ${REQUEST_BODY.incident.impact}
// More information: ${REQUEST_BODY.incident.shortlink}`);

  res.status(200);

});

/**
 * WebSocket
 */
// IO.on('connection', (socket) => {
//   console.log('New client connected');
//
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });
