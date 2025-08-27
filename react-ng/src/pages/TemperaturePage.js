/**
 * Блок подключения модулей/импортов
 */
import React, {useState, useEffect} from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Grow,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
} from '@mui/material';
import {common} from '@mui/material/colors';
import axios from 'axios';
import {io} from 'socket.io-client';
import moment from 'moment';
import 'moment/locale/ru';
import thermistorImage from '../img/image_for_temperature_page.jpg';
import {Helmet} from 'react-helmet-async';
// import {LineChart} from '@mui/x-charts/LineChart';
moment.locale('ru');

const SOCKET = io('https://qjalti.ru');

export const Temperature = () => {
  const [loading, setLoading] = useState(false);
  const [elements, setElements] = useState([]);
  const [open, setOpen] = useState(false);

  const selectArduinoData = async () => {
    try {
      setLoading(true);
      const RESPONSE = await axios.post('https://qjalti.ru/api/arduino/select');
      const TEMPERATURE_DATE = moment(RESPONSE.data.data[0].timestamp);
      setElements(
          {
            temperature: RESPONSE.data.data[0].temperature,
            date: TEMPERATURE_DATE.fromNow(),
          },
      );
      const TEMPERATURES = [];
      const TIMESTAMPS = [];
      RESPONSE.data.data.map((el) => {
        TEMPERATURES.push(el.temperature);
        TIMESTAMPS.push(el.id);
      });
      // setXElements(TEMPERATURES);
      // setYElements(TIMESTAMPS);
      setLoading(false);
    } catch (err) {
      console.log('Error! ', err.message);
      console.log('Error! ', err);
    }
  };

  useEffect(() => {
    selectArduinoData().then(() => false);
  }, []);

  SOCKET.on('arduinoEvent', () => {
    selectArduinoData().then(() => false);
  });

  return (
    <>
      <Helmet>
        {/* Основная информация */}
        <title>Температура в квартире — Arduino датчик</title>
        <meta name="title"
          content="Температура в квартире — Arduino датчик"/>
        <meta name="description"
          content="Моя персональная страница: проекты, резюме, ссылки на HeadHunter, LinkedIn, сайт памяти отца, PDF-резюме и способы связи."/>

        {/* Open Graph */}
        <meta property="og:type" content="website"/>
        <meta property="og:title"
          content="Температура в квартире — Arduino датчик"/>
        <meta property="og:description"
          content="Онлайн-страница с текущей температурой в моей квартире. Датчик построен на термисторе, подключенном через резистор к Arduino Uno. Фото датчика и детали реализации."/>
        <meta property="og:url" content="https://qjalti.ru/temperature"/>
        <meta property="og:image"
          content="https://qjalti.ru/programmer.webp"/>
        <meta property="og:locale" content="ru_RU"/>
        <meta property="og:site_name" content="qjalti.ru"/>

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title"
          content="Температура в квартире — Arduino датчик"/>
        <meta name="twitter:description"
          content="Онлайн-страница с текущей температурой в моей квартире. Датчик построен на термисторе, подключенном через резистор к Arduino Uno. Фото датчика и детали реализации."/>
        <meta name="twitter:image"
          content="https://qjalti.ru/programmer.webp"/>

        {/* <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "qjalti — Личный сайт разработчика",
            "url": "https://qjalti.ru/",
            "description": "Онлайн-страница с текущей температурой в моей квартире. Датчик построен на термисторе, подключенном через резистор к Arduino Uno. Фото датчика и детали реализации.",
            "publisher": {
                "@type": "Person",
                "name": "Никита Гуриев"
            }
        }`}
        </script>*/}
      </Helmet>
      <Backdrop
        sx={{
          color: common.white,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color={'inherit'}/>
      </Backdrop>
      <Grow
        in
      >
        <Box sx={{flexGrow: 1}}>
          <Paper>
            <Container>
              <Grid
                container
                direction={'row'}
                sx={{py: 2}}
              >
                <Grid item>
                  <Grid
                    container
                    direction={'column'}
                    justifyContent={'flex-start'}
                    alignItems={'start'}
                  >
                    <Grid item>
                      <Typography gutterBottom>
                        Термистор + Arduino
                      </Typography>
                    </Grid>
                    <Grid item>
                      <img
                        src={thermistorImage}
                        alt="Thermistor image"
                        style={{
                          borderRadius: 16,
                          width: 256,
                          height: 256,
                          objectFit: 'cover',
                          objectPosition: 'center 45%',
                          cursor: 'zoom-in',
                        }}
                        onClick={() => setOpen(true)}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant={'h4'}>
                        {elements.temperature}&deg;C
                      </Typography>
                      <Typography variant={'caption'}>
                          ({elements.date})
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                direction={'row'}
                sx={{py: 2}}
              >
                <Grid item>
                  {/* <LineChart
                    xAxis={[{data: yElements}]}
                    series={[
                      {
                        data: xElements
                      },
                    ]}
                    width={500}
                    height={300}
                  />*/}
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Box>
      </Grow>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg">
        <DialogContent sx={{p: 0}}>
          <img
            src={thermistorImage}
            alt="large"
            style={{width: '100%', height: 'auto'}}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
