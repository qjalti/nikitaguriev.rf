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
import CRON from 'node-cron';
// import {createCanvas, loadImage, registerFont} from 'canvas';
// import path from "path";
// import fs from "fs";

/**
 * Constants defination
 */
const __dirname = dirname(fileURLToPath(import.meta.url));
const TELEGRAM_MY_USER_ID = 738829247;

/**
 * Telegraf settings
 */
let qjaltiAPIBot;
if (process.env.NODE_ENV !== 'development') {
//  qjaltiAPIBot = new Telegraf(CONFIG.get('qjaltiAPIToken'));
//  qjaltiAPIBot.launch().then(r => console.log(r));
}

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
  APP.get('/rod_game', (req, res) => {
    res.sendFile(PATH.resolve(__dirname, 'react-ng', 'build', 'who-am-i-game', 'index.html'));
  });
  APP.get('/fst', (req, res) => {
    res.sendFile(PATH.resolve(__dirname, 'react-ng', 'build', 'fst', 'index.html'));
  });
  APP.get('/serviceWorker.js', (req, res) => {
    res.sendFile(PATH.resolve(__dirname, 'serviceWorker.js'));
  });
  // APP.get('/seat_book', (req, res) => {
  //   res.sendFile(PATH.resolve(__dirname, 'react-ng', 'build', 'seat-book', 'index.html'));
  // });
  APP.get('*', (req, res) => {
    res.sendFile(PATH.resolve(__dirname, 'react-ng', 'build', 'index.html'));
  });
}

const PORT = CONFIG.get('port');

const clearSeatBooksTable = async () => {

  const BASE_OBJECT = {
    front: {status: false, name: null},
    driver: {status: true, name: 'Гуриев Никита'},
    left_back: {status: false, name: null},
    center_back: {status: false, name: null},
    right_back: {status: false, name: null},
  };

  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  await CLIENT.query(
    `UPDATE book_seats
       SET data = $1
       WHERE id = $2
       RETURNING *`,
    [BASE_OBJECT, 3]
  );
  await CLIENT.end();

  IO.emit(
    'seatBooked',
  );
};

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
       ORDER BY checked ASC, last_update DESC
       LIMIT 96`
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
       ORDER BY id DESC LIMIT 32`
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

APP.post('/api/seat_book/select', async (req, res) => {
  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  const RESPONSE = await CLIENT.query(
    `SELECT *
       FROM book_seats`
  );
  await CLIENT.end();

  res.json(
    {
      ok: true,
      data: RESPONSE.rows,
    },
  );
});

APP.post('/api/seat_book/update', async (req, res) => {
  const CLIENT = new Client(CONNECTION_DATA);
  await CLIENT.connect();
  const RESPONSE = await CLIENT.query(
    `UPDATE book_seats
       SET data = $1
       WHERE id = $2
       RETURNING *`,
    [req.body.data, 3]
  );
  await CLIENT.end();

  IO.emit(
    'seatBooked',
  );

  let seatName;
  switch (req.body.credentials.selectedSeat) {
    case 'front':
      seatName = 'Спереди';
      break;
    case 'left_back':
      seatName = 'Сзади, слева'
      break;
    case 'center_back':
      seatName = 'Сзади, центр'
      break;
    case 'right_back':
      seatName = 'Сзади, справа'
      break;
  }

  try {
    if (req.body.credentials.passengerName) {
      //await qjaltiAPIBot.telegram.sendMessage(TELEGRAM_MY_USER_ID, `Seat Book: ${seatName}, ${req.body.credentials.passengerName}`);
    } else {
      //await qjaltiAPIBot.telegram.sendMessage(TELEGRAM_MY_USER_ID, `Seat Book cancel: ${seatName}`);
    }
  } catch (err) {
    console.error('Ошибка отправки:', err);
  }

  res.json(
    {
      ok: true,
      message: 'Место успешно забронировано',
      alertColor: 'success',
      data: 'data',
      // data: RESPONSE.rows,
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
  if (!req.file) {
    return res.status(400).send('Файл не найден');
  }

  try {
    /*await qjaltiAPIBot.telegram.sendPhoto(
      TELEGRAM_MY_USER_ID,
      {
        source: Buffer.from(req.file.buffer),
        filename: req.file.originalname || 'image.jpg'
      });*/

    res.send('Изображение отправлено в Telegram');
  } catch (err) {
    console.error('Ошибка отправки:', err);
    res.status(500).send('Ошибка отправки');
  }
});

APP.post('/api/seat_book/reset', (req, res) => {
  clearSeatBooksTable().then(() => false);
  res.status(200).send({success: true});
});

// APP.post('/api/rodiyar/bd_image', (req, res) => {
//   const fontPath = path.join(__dirname, 'GreatVibes-Regular.ttf');
//   registerFont(fontPath, {family: 'Great Vibes Regular'});
//
//   // Функция переноса текста по ширине
//   function wrapText(ctx, text, maxWidth) {
//     const words = text.split(' ');
//     const lines = [];
//     let line = '';
//
//     for (let n = 0; n < words.length; n++) {
//       const testLine = line + (line ? ' ' : '') + words[n];
//       const metrics = ctx.measureText(testLine);
//       const testWidth = metrics.width;
//
//       if (testWidth > maxWidth && line) {
//         lines.push(line);
//         line = words[n];
//       } else {
//         line = testLine;
//       }
//     }
//     lines.push(line);
//     return lines;
//   }
//
//   async function addTextToImage(imagePath, isMale, userText, outputImagePath) {
//     const image = await loadImage(imagePath);
//
//     const canvasWidth = Math.floor(image.width * 0.75);
//     const canvasHeight = Math.floor(image.height * 0.75);
//     const canvas = createCanvas(canvasWidth, canvasHeight);
//     const ctx = canvas.getContext('2d');
//
//     ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
//
//     ctx.font = `bold ${24}px "Times New Roman"`;
//     ctx.fillStyle = '#282828';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'top';
//
//     ctx.fillText(isMale ? 'Уважаемый' : 'Уважаемая', canvas.width / 2, 440);
//     ctx.fillText(`${userText.name}!`, canvas.width / 2, 440 + (4 * 8));
//     ctx.fillText(`(${userText.workPosition})`, canvas.width / 2, 440 + (8 * 8));
//
//     ctx.font = `48px "Great Vibes Regular"`;
//     ctx.fillStyle = '#f44336';
//     ctx.fillText('С Днем Рождения!', canvas.width / 2, 440 + (13 * 8));
//
//     // Стих
//     ctx.font = `32px "Great Vibes Regular"`;
//     ctx.fillStyle = '#282828';
//
//     const poem = `Сквозь облака плывёт весна,
// В лугах играет ветер нежный
// Земля проснулась ото сна
// И день становится безбрежный
//
// В лазури жаворонок пьёт
// Глотки свободы в пенье звонком
// И каждый лепесток живёт,
// Как свет в душе — таким знакомым
//
// Ты улыбнись — и мир в ответ
// Раскроет тайны без усилий
// Ведь жизнь — не серый силуэт,
// А праздник, полный доброй пыли`;
//
//     const poemLines = poem.split('\n');
//     const wrappedPoemLines = [];
//
//     for (const line of poemLines) {
//       const wrapped = wrapText(ctx, line, canvas.width * 0.5);
//       wrappedPoemLines.push(...wrapped);
//     }
//
//     wrappedPoemLines.forEach((line, i) => {
//       ctx.fillText(line, canvas.width / 2, 440 + (21 * 8) + i * 36);
//     });
//
//     // Текущая дата
//     const now = new Date();
//     const day = String(now.getDate()).padStart(2, '0');
//     const month = String(now.getMonth() + 1).padStart(2, '0');
//     const year = now.getFullYear();
//     const formattedDate = `${day}.${month}.${year} г.`;
//
//     ctx.font = `22px Georgia`;
//     ctx.fillText(formattedDate, canvas.width / 2, 440 + 192 + wrappedPoemLines.length * 36 + 30);
//
//     const buffer = canvas.toBuffer('image/jpeg');
//     await fs.promises.writeFile(outputImagePath, buffer);
//
//     console.log(`Изображение с текстом сохранено: ${outputImagePath}`);
//   }
//
//   // Пути
//   const inputImagePath = 'input.jpg';
//   const outputImagePath = 'output.jpg';
//
//   // Примерные данные
//   const userText = {
//     name: 'Гуриев Никита',
//     workPosition: 'программист-разработчик',
//   };
//
//   // Запуск
//   addTextToImage(inputImagePath, true, userText, outputImagePath)
//     .catch(err => console.error('Произошла ошибка:', err));
// });

CRON.schedule('0 22 * * *', clearSeatBooksTable, {
  scheduled: false,
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
