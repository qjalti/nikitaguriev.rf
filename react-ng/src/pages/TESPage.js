/**
 * Блок подключения модулей/импортов
 */
import React from 'react';
import {
  Box,
  Container,
  Grid, Typography, Paper, Grow,
} from '@mui/material';
import moment from 'moment';
import 'moment/locale/ru';
import {Helmet} from 'react-helmet-async';

/**
 * Блок настройки MOMENT
 */
moment.locale('ru');
const CURRENT_DATE = moment();

export const TES = () => {
  /**
   * Воскресенье — начало недели
   */
  const TES_DAYS = [
    'сандас',
    'морндас',
    'тирдас',
    'миддас',
    'турдас',
    'фредас',
    'лордас',
  ];

  const TES_MONTS = [
    'утренней звезды',
    'восхода солнца',
    'первого зерна',
    'руки дождя',
    'второго зерна',
    'середины года',
    'высокого солнца',
    'последнего зерна',
    'огня очага',
    'начала морозов',
    'заката солнца',
    'вечерней звезды',
  ];

  const CURRENT_DAY_NATURE = CURRENT_DATE.day();
  const CURRENT_DATE_NATURE = CURRENT_DATE.date();
  const CURRENT_MONTH_NATURE = CURRENT_DATE.month();
  const CURRENT_MONTH_TES = TES_MONTS[CURRENT_MONTH_NATURE];
  const CURRENT_DAY_TES = TES_DAYS[CURRENT_DAY_NATURE];
  const CURRENT_DATE_TES = `
${CURRENT_DAY_TES}, ${CURRENT_DATE_NATURE} ${CURRENT_MONTH_TES}`;
  const CURRENT_DATE_FORMATTED = CURRENT_DATE.format('dddd, D MMMM');

  return (
    <>
      <Helmet>
        {/* Основная информация */}
        <title>Дата в стиле The Elder Scrolls — сегодня в Тамриэле</title>
        <meta name="title" content="Дата в стиле The Elder Scrolls — сегодня в Тамриэле"/>
        <meta name="description"
          content="Узнай, какой сегодня день по календарю Тамриэля. Лордас, Второе Зерно, Вечный Средний Мороз — окунись в атмосферу The Elder Scrolls."/>

        {/* Open Graph */}
        <meta property="og:type" content="website"/>
        <meta property="og:title"
          content="Дата в стиле The Elder Scrolls — сегодня в Тамриэле"/>
        <meta property="og:description"
          content="Узнай, какой сегодня день по календарю Тамриэля. Лордас, Второе Зерно, Вечный Средний Мороз — окунись в атмосферу The Elder Scrolls."/>
        <meta property="og:url" content="https://qjalti.ru/tes"/>
        <meta property="og:image"
          content="https://qjalti.ru/programmer.webp"/>
        <meta property="og:locale" content="ru_RU"/>
        <meta property="og:site_name" content="qjalti.ru"/>

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title"
          content="Дата в стиле The Elder Scrolls — сегодня в Тамриэле"/>
        <meta name="twitter:description"
          content="Узнай, какой сегодня день по календарю Тамриэля. Лордас, Второе Зерно, Вечный Средний Мороз — окунись в атмосферу The Elder Scrolls."/>
        <meta name="twitter:image"
          content="https://qjalti.ru/programmer.webp"/>
      </Helmet>

      <Grow
        in
      >
        <Box sx={{flexGrow: 1}}>
          <Paper>
            <Container>
              <Grid
                container
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{p: 2}}
              >
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{textAlign: 'center'}}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                    >
                      {CURRENT_DATE_FORMATTED}
                    </Typography>
                    <Typography
                      variant="h5"
                      gutterBottom
                    >
                      {CURRENT_DATE_TES}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Box>
      </Grow>
    </>
  );
};
