/**
 * Блок подключения модулей/импортов
 */
import React, {useState} from 'react';
import {
  createTheme,
  Box,
  ThemeProvider,
  Container,
  Grid,
  Typography,
  Alert,
  Paper, Link, Button, Grow,
} from '@mui/material';

/**
 * Импорт изображений
 */
import cf001 from '../img/cf_001.jpg';
import cf002 from '../img/cf_002.jpg';
import cf003 from '../img/cf_003.jpg';
import cf004 from '../img/cf_004.jpg';
import cf005 from '../img/cf_005.jpg';
import cf006 from '../img/cf_006.jpg';
import cf007 from '../img/cf_007.jpg';
import cf008 from '../img/cf_008.jpg';
import cf009 from '../img/cf_009.jpg';
import cf010 from '../img/cf_010.jpg';
import cf011 from '../img/cf_011.jpg';
import cf012 from '../img/cf_012.jpg';
import cf013 from '../img/cf_013.jpg';
import cf014 from '../img/cf_014.jpg';
import cf015 from '../img/cf_015.jpg';
import cf016 from '../img/cf_016.jpg';
import cf017 from '../img/cf_017.jpg';
import cf018 from '../img/cf_018.jpg';
import cf019 from '../img/cf_019.jpg';
import cf020 from '../img/cf_020.jpg';
import cf021 from '../img/cf_021.jpg';
import cf022 from '../img/cf_022.jpg';
import cf023 from '../img/cf_023.jpg';
import cf024 from '../img/cf_024.jpg';
import cf025 from '../img/cf_025.jpg';
import cf026 from '../img/cf_026.jpg';
import cf027 from '../img/cf_027.jpg';
import cf028 from '../img/cf_028.jpg';
import cf029 from '../img/cf_029.jpg';
import cf030 from '../img/cf_030.jpg';
import cf031 from '../img/cf_031.jpg';
import cf032 from '../img/cf_032.jpg';
import cf033 from '../img/cf_033.jpg';
import cf034 from '../img/cf_034.jpg';
import cf035 from '../img/cf_035.jpg';
import cf036 from '../img/cf_036.jpg';
import cf037 from '../img/cf_037.jpg';
import cf038 from '../img/cf_038.jpg';
import cf039 from '../img/cf_039.jpg';
import cf040 from '../img/cf_040.jpg';
import cf041 from '../img/cf_041.jpg';
import cf042 from '../img/cf_042.jpg';
import cf043 from '../img/cf_043.jpg';
import cf044 from '../img/cf_044.jpg';
import cf045 from '../img/cf_045.jpg';
import cf046 from '../img/cf_046.jpg';
import cf047 from '../img/cf_047.jpg';
import cf048 from '../img/cf_048.jpg';
import cf049 from '../img/cf_049.jpg';
import cf050 from '../img/cf_050.jpg';
import cf051 from '../img/cf_051.jpg';
import cf052 from '../img/cf_052.jpg';
import cf053 from '../img/cf_053.jpg';
import cf054 from '../img/cf_054.jpg';
import cf055 from '../img/cf_055.jpg';
import cf056 from '../img/cf_056.jpg';

/**
 * Блок кастомизации MUI
 */
const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565C0',
    },
  },
});

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

  /**
   * Блок пользовательских функций
   */
  const chooseFilm = () => {
    setGrowState((prev) => !prev);
    setTimeout(() => {
      setFilmImg(randomInteger());
    }, 300);
    setTimeout(() => {
      setGrowState((prev) => !prev);
    }, 300);
  };

  return (
    <Grow
      in
    >
      <Box sx={{flexGrow: 1}}>
        <ThemeProvider theme={darkTheme}>
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
                    variant="h6"
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
                justifyContent="center"
                alignItems="center"
                sx={{mb: 2}}
              >
                <Grid item>
                  <Alert severity="info">Всего 56 фильмов</Alert>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{mb: 2}}
              >
                <Grid item>
                  <Grow
                    in={growState}
                    timeout={300}
                  >
                    <Box
                      component="img"
                      sx={{borderRadius: 2}}
                      src={filmImg}
                      alt="Постер фильма"
                    />
                  </Grow>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
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
        </ThemeProvider>
      </Box>
    </Grow>
  );
};
