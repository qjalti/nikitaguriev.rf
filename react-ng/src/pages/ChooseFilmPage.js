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
  Paper, Link, Button, Grow,
} from '@mui/material';
import {Helmet} from 'react-helmet-async';

/**
 * Импорт изображений
 */
import cf001 from '../img/cf_001.webp';
import cf002 from '../img/cf_002.webp';
import cf003 from '../img/cf_003.webp';
import cf004 from '../img/cf_004.webp';
import cf005 from '../img/cf_005.webp';
import cf006 from '../img/cf_006.webp';
import cf007 from '../img/cf_007.webp';
import cf008 from '../img/cf_008.webp';
import cf009 from '../img/cf_009.webp';
import cf010 from '../img/cf_010.webp';
import cf011 from '../img/cf_011.webp';
import cf012 from '../img/cf_012.webp';
import cf013 from '../img/cf_013.webp';
import cf014 from '../img/cf_014.webp';
import cf015 from '../img/cf_015.webp';
import cf016 from '../img/cf_016.webp';
import cf017 from '../img/cf_017.webp';
import cf018 from '../img/cf_018.webp';
import cf019 from '../img/cf_019.webp';
import cf020 from '../img/cf_020.webp';
import cf021 from '../img/cf_021.webp';
import cf022 from '../img/cf_022.webp';
import cf023 from '../img/cf_023.webp';
import cf024 from '../img/cf_024.webp';
import cf025 from '../img/cf_025.webp';
import cf026 from '../img/cf_026.webp';
import cf027 from '../img/cf_027.webp';
import cf028 from '../img/cf_028.webp';
import cf029 from '../img/cf_029.webp';
import cf030 from '../img/cf_030.webp';
import cf031 from '../img/cf_031.webp';
import cf032 from '../img/cf_032.webp';
import cf033 from '../img/cf_033.webp';
import cf034 from '../img/cf_034.webp';
import cf035 from '../img/cf_035.webp';
import cf036 from '../img/cf_036.webp';
import cf037 from '../img/cf_037.webp';
import cf038 from '../img/cf_038.webp';
import cf039 from '../img/cf_039.webp';
import cf040 from '../img/cf_040.webp';
import cf041 from '../img/cf_041.webp';
import cf042 from '../img/cf_042.webp';
import cf043 from '../img/cf_043.webp';
import cf044 from '../img/cf_044.webp';
import cf045 from '../img/cf_045.webp';
import cf046 from '../img/cf_046.webp';
import cf047 from '../img/cf_047.webp';
import cf048 from '../img/cf_048.webp';
import cf049 from '../img/cf_049.webp';
import cf050 from '../img/cf_050.webp';
import cf051 from '../img/cf_051.webp';
import cf052 from '../img/cf_052.webp';
import cf053 from '../img/cf_053.webp';
import cf054 from '../img/cf_054.webp';
import cf055 from '../img/cf_055.webp';
import cf056 from '../img/cf_056.webp';

const FILMS = [
  cf001,
  cf002,
  cf003,
  cf004,
  cf005,
  cf006,
  cf007,
  cf008,
  cf009,
  cf010,
  cf011,
  cf012,
  cf013,
  cf014,
  cf015,
  cf016,
  cf017,
  cf018,
  cf019,
  cf020,
  cf021,
  cf022,
  cf023,
  cf024,
  cf025,
  cf026,
  cf027,
  cf028,
  cf029,
  cf030,
  cf031,
  cf032,
  cf033,
  cf034,
  cf035,
  cf036,
  cf037,
  cf038,
  cf039,
  cf040,
  cf041,
  cf042,
  cf043,
  cf044,
  cf045,
  cf046,
  cf047,
  cf048,
  cf049,
  cf050,
  cf051,
  cf052,
  cf053,
  cf054,
  cf055,
  cf056,
];

const randomInteger = () => {
  const RAND = Math.random() * ((FILMS.length - 1) + 1);
  return FILMS[Math.floor(RAND)];
};

export const ChooseFilm = () => {
  /**
   * Блок определения хуков
   */
  const [filmImg, setFilmImg] = useState(randomInteger());
  const [growState, setGrowState] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  /**
   * Блок пользовательских функций
   */
  const chooseFilm = () => {
    setGrowState(false);
    setIsImageLoaded(false);

    setTimeout(() => {
      const newFilmImg = randomInteger();
      const img = new Image();
      img.src = newFilmImg;

      img.onload = () => {
        setFilmImg(newFilmImg);
        setIsImageLoaded(true);
        setGrowState(true);
      };

      img.onerror = () => {
        console.error('Ошибка загрузки изображения');
        setIsImageLoaded(true);
      };
    }, 300);
  };

  return (
    <>
      <Helmet>
        {/* Основная информация */}
        <title>Что посмотреть? — Получи случайный фильм по нажатию</title>
        <meta name="title"
          content="Что посмотреть? — Получи случайный фильм по нажатию"/>
        <meta name="description"
          content="Не знаешь, что посмотреть? Нажми на кнопку и получи случайную рекомендацию фильма. Просто, быстро и интересно!"/>

        {/* Open Graph */}
        <meta property="og:type" content="website"/>
        <meta property="og:title"
          content="Что посмотреть? — Получи случайный фильм по нажатию"/>
        <meta property="og:description"
          content="Не знаешь, что посмотреть? Нажми на кнопку и получи случайную рекомендацию фильма. Просто, быстро и интересно!"/>
        <meta property="og:url" content="https://qjalti.ru/choose-film"/>
        <meta property="og:image"
          content="https://qjalti.ru/programmer.webp"/>
        <meta property="og:locale" content="ru_RU"/>
        <meta property="og:site_name" content="qjalti.ru"/>

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title"
          content="Что посмотреть? — Получи случайный фильм по нажатию"/>
        <meta name="twitter:description"
          content="Не знаешь, что посмотреть? Нажми на кнопку и получи случайную рекомендацию фильма. Просто, быстро и интересно!"/>
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
                <Grid item>
                  <Typography
                    variant={'h6'}
                    gutterBottom
                  >
                      Советник фильмов
                  </Typography>
                  <Link
                    href="https://www.ivi.ru/collections/badcomedian-ivi10"
                    target={'_blank'}
                  >
                      BadComedian рекомендует: Лучшие фильмы десятилетия
                  </Link>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{mb: 2}}
              >
                <Grid item>
                  <Alert severity={'info'}>Всего 56 фильмов</Alert>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{mb: 2}}
              >
                <Grid item>
                  <Grow
                    in={growState}
                    timeout={300}
                  >
                    <Box
                      component={'img'}
                      sx={{
                        borderRadius: 2,
                        opacity: isImageLoaded ?
                                1 :
                                0,
                      }}
                      src={filmImg}
                      alt={'Постер фильма'}
                    />
                  </Grow>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{mb: 2}}
              >
                <Grid item>
                  <Button
                    onClick={chooseFilm}
                    sx={{mb: 2}}
                  >
                      Посоветовать фильм
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Box>
      </Grow>
    </>
  );
};
