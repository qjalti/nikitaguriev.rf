/*
import React, {useState, useEffect} from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  AlertTitle,
  Paper, Grow, Typography, IconButton, Collapse,
} from '@mui/material';

import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import CloseIcon from '@mui/icons-material/Close';

// import {useCookies} from 'react-cookie';

export const Calc = () => {
  /!**
   * Блок определения хуков
   *!/
  const [a, setA] = useState('A');
  const [b, setB] = useState('B');
  const [c, setC] = useState('C');
  const [x, setX] = useState('X');
  const [y, setY] = useState('Y');
  const [z, setZ] = useState('Z');
  /!* const [cookies, setCookie, removeCookie] = useCookies(
      ['cookie-name'],
  );*!/
  const [counter, setCounter] = useState(
      // cookies.calculates ? cookies.calculates.length : 0,
  );
  // const [history, setHistory] = useState(cookies.calculates ?? []);
  const [openExample, setOpenExample] = useState(true);
  const [openFormula, setOpenFormula] = useState(true);

  /!**
   * Блок пользовательских функций
   * @param {string} variable String
   * @return {string} Formatted string
   *!/
  const checkComma = (variable) => {
    return variable.replace(',', '.');
  };

  const parseNumber = (number) => {
    return number.toFixed(2);
  };

  const saveHistory = () => {
    /!* setHistory((prevHistory) => {
      const CURRENT_DATE = new Date();
      const NEW_DATE = new Date(
          CURRENT_DATE.setMonth(CURRENT_DATE.getMonth() + 3),
      );
      setCookie('calculates', [
        ...prevHistory,
        {
          a, b, c, x, y, z, counter,
        },
      ],
      {
        expires: NEW_DATE,
      },
      );
      return [
        ...prevHistory,
        {
          a, b, c, x, y, z, counter,
        },
      ];
    });*!/
  };

  const calculateX = () => {
    setX(parseNumber(a * c / b));
  };

  const checkFields = () => {
    if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
      calculateX();
    }
  };

  const clearFields = () => {
    setA('A');
    setB('B');
    setC('C');
    setX('X');
    setY('Y');
    setZ('Z');
  };

  const clearTable = () => {
    setHistory([]);
    removeCookie('calculates');
  };

  useEffect(() => {
    if (!isNaN(x)) {
      setZ(!isNaN(y) ? x - y : 0);
      saveHistory();
      setCounter((prevValue) => prevValue + 1);
    }
  }, [x]);

  return (
    <Grow
      in
    >
      <Box sx={{flexGrow: 1, pb: 2}}>
        <Paper
          sx={{py: 2}}
        >
          <Grid
            container
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Grid item xs={6} md={6} sx={{p: 2, pt: 0}}>
              <TextField
                fullWidth
                label="A"
                variant="filled"
                value={a}
                onChange={(evt) => {
                  setA(checkComma(evt.target.value));
                }}
              />
            </Grid>
            <Grid item xs={6} md={6} sx={{p: 2, pt: 0}}>
              <TextField
                fullWidth
                label="B"
                variant="filled"
                value={b}
                onChange={(evt) => {
                  setB(checkComma(evt.target.value));
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6} md={6} sx={{p: 2}}>
              <TextField
                fullWidth
                label="X"
                variant="filled"
                value={x}
                disabled
              />
            </Grid>
            <Grid item xs={6} md={6} sx={{p: 2}}>
              <TextField
                fullWidth
                label="C"
                variant="filled"
                value={c}
                onChange={(evt) => {
                  setC(checkComma(evt.target.value));
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6} md={6} sx={{p: 2}}>
              <TextField
                fullWidth
                label="Разница"
                variant="filled"
                value={z}
                disabled
              />
            </Grid>
            <Grid item xs={6} md={6} sx={{p: 2}}>
              <TextField
                fullWidth
                label="Сравниваемая цена"
                variant="filled"
                value={y}
                onChange={(evt) => {
                  setY(parseNumber(evt.target.value));
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Button
                startIcon={<CalculateOutlinedIcon/>}
                onClick={checkFields}
              >
                Рассчитать
              </Button>
            </Grid>
            <Grid item>
              <Button
                startIcon={<ClearAllOutlinedIcon/>}
                color="error"
                aria-label="Очистить поля"
                onClick={clearFields}
              >
                Очистить
              </Button>
            </Grid>
          </Grid>
          <Divider variant="middle" sx={{my: 2}}/>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <TableContainer>
                <Table aria-label="История значений" size="small">
                  <caption>История значений</caption>
                  <TableHead>
                    <TableRow>
                      <TableCell>A</TableCell>
                      <TableCell>B</TableCell>
                      <TableCell>C</TableCell>
                      <TableCell>X</TableCell>
                      <TableCell>Y</TableCell>
                      <TableCell>Z</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((value) => (
                      <TableRow
                        key={value.counter}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                        >
                          {value.a}
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {value.b}
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {value.c}
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {value.x}
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {value.y}
                        </TableCell>
                        <TableCell
                          align="right"
                        >
                          {value.z}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <Button
                startIcon={<ClearAllOutlinedIcon/>}
                color="error"
                aria-label="Очистить поля"
                onClick={clearTable}
              >
                Очистить
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={12} sx={{p: 2}}>
              <Alert
                severity="warning"
              >
                Калькулятор находится в разработке, возможны ошибки
              </Alert>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{p: 2, pt: 0}}
          >
            <Grid item xs={12} md={12}>
              <Collapse in={openFormula}>
                <Alert
                  severity="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenFormula(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit"/>
                    </IconButton>
                  }
                >
                  <AlertTitle>Формулы</AlertTitle>
                  <Typography>X = A × C ÷ B</Typography>
                  <Typography>Z = X - Y</Typography>
                </Alert>
              </Collapse>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={12} sx={{px: 2}}>
              <Collapse in={openExample}>
                <Alert
                  severity="info"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenExample(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit"/>
                    </IconButton>
                  }
                >
                  <AlertTitle>Для чего нужен этот калькулятор?</AlertTitle>
                  <Typography>
                    Допустим мы хотим купить 🥑 авокадо и видим, что есть
                    весовой за <strong>369.99₽/кг</strong> и в
                    упаковке <strong>269.99₽/700 г</strong>, но какой выгоднее
                    купить?
                  </Typography>
                  <Typography>
                    Тогда <strong>A</strong> = 369.99, <strong>B</strong> = 1000
                    (грамм в кг), <strong>C</strong> = 700
                  </Typography>
                  <Typography>
                    После решеня уравнения <strong>X = 258.993</strong>, то есть
                    700 г весового авокадо будет стоить
                    258.993₽, что дешевле авокадо в упаковке за 269.99₽
                  </Typography>
                  <Typography>
                    А значит выгоднее брать весовой авокадо
                  </Typography>
                </Alert>
              </Collapse>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Grow>
  );
};
*/
