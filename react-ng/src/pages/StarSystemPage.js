/**
 * Блок подключения модулей/импортов
 */
import React, {useState} from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Alert,
  Paper, Grow, Button,
} from '@mui/material';
import {Helmet} from 'react-helmet-async';

const STAR_SYSTEMS = [
  'Alpha Centauri',
  'Barnard\'s Star',
  'Luhman 16',
  'Wolf 359',
  'Lalande 21185',
  'Alpha Canis Majoris',
  'Luyten 726-8',
  'Ross 154',
  'Epsilon Eridani',
  'Lacaille 9352',
  'Ross 128',
  'EZ Aquarii',
  'Alpha Canis Minoris',
  '61 Cygni',
  'Struve 2398',
  'Groombridge 34',
  'DX Cancri',
  'Epsilon Indi',
  'Tau Ceti',
  'Gliese 1061',
  'YZ Ceti',
  'Luyten\'s Star',
  'Teegarden\'s Star',
  'Kapteyn\'s Star',
  'Lacaille 8760',
  'Kruger 60',
  'Ross 614',
  'Wolf 1061',
  'Van Maanen\'s star',
  'Gliese 1',
  'Wolf 424',
  'Gliese 687',
  'Gliese 674',
  'Gliese 1245',
  'Gliese 876',
  'Groombridge 1618',
  'Gliese 412',
  'AD Leonis',
  'Gliese 832',
  'V645 Centauri',
  'Proxima Centauri',
  'Rigil Kentaurus',
  'Toliman',
  'Procyon A',
  'GX Andromedae',
  'DO Cephei',
  'WX Ursae Majoris',
];

const getRandomSystem = () => {
  const RAND = Math.random() * ((STAR_SYSTEMS.length - 1) + 1);
  return STAR_SYSTEMS[Math.floor(RAND)];
};

export const StarSystems = () => {
  const [starSystem, setStarSystem] = useState(getRandomSystem);
  const [grow, setGrow] = useState(true);

  const changeStarSystem = () => {
    setGrow((prev) => !prev);
    setTimeout(() => {
      setStarSystem(getRandomSystem);
    }, 300);
    setTimeout(() => {
      setGrow((prev) => !prev);
    }, 300);
  };

  return (
    <>
      <Helmet>
        {/* Основная информация */}
        <title>Названия ближайших звёзд — генератор и список</title>
        <meta name="title" content="Названия ближайших звёзд — генератор и список"/>
        <meta name="description"
          content="Ищешь красивое название? Посмотри на звёзды! Этот сервис показывает названия ближайших звёзд и помогает выбрать вдохновляющее имя."/>

        {/* Open Graph */}
        <meta property="og:type" content="website"/>
        <meta property="og:title"
          content="Названия ближайших звёзд — генератор и список"/>
        <meta property="og:description"
          content="Ищешь красивое название? Посмотри на звёзды! Этот сервис показывает названия ближайших звёзд и помогает выбрать вдохновляющее имя."/>
        <meta property="og:url"
          content="https://qjalti.ru/star-system"/>
        <meta property="og:image"
          content="https://qjalti.ru/programmer.webp"/>
        <meta property="og:locale" content="ru_RU"/>
        <meta property="og:site_name" content="qjalti.ru"/>

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title"
          content="Названия ближайших звёзд — генератор и список"/>
        <meta name="twitter:description"
          content="Ищешь красивое название? Посмотри на звёзды! Этот сервис показывает названия ближайших звёзд и помогает выбрать вдохновляющее имя."/>
        <meta name="twitter:image"
          content="https://qjalti.ru/programmer.webp"/>
      </Helmet>
      <Grow
        in
      >
        <Box>
          <Paper>
            <Container>
              <Grid
                container
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{p: 2}}
              >
                <Grid item>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{pb: 2}}
                  >
                    <Grid item>
                      <Alert
                        severity="info"
                      >
                          Всего {STAR_SYSTEMS.length} звездных систем
                      </Alert>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Grow
                        in={grow}
                      >
                        <Typography
                          variant="h4"
                          gutterBottom
                        >
                          {starSystem}
                        </Typography>
                      </Grow>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Button
                        size="large"
                        onClick={changeStarSystem}
                      >
                          Сменить
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Box>
      </Grow>
    </>
  );
};
