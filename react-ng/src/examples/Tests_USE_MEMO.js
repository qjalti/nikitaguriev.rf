import {
  Box,
  Divider,
  Button,
  Typography,
} from '@mui/material';
import React, {useState, useEffect, useRef, useMemo} from 'react';

export default function T_UE() {
  /**
   * Блок хуков
   */
  const [number, setNumber] = useState(42);
  const [colored, setColored] = useState(false);

  const STYLES = useMemo(() => ({
    color: colored ? 'darkred' : 'grey',
  }), [colored]);

  const computed = useMemo(() => {
    return complexCompute(number);
  }, [number]);

  useEffect(() => {
    console.log('Styles changed!');
  }, [STYLES]);

  /**
   * Блок пользовательских функций
   */
  function complexCompute(num) {
    let i = 0;
    while (i < 1000000000) i++;
    return num * 2;
  }

  return (
    <div>
      <Box sx={{p: 2}}>
        <Typography
          variant="h4"
          style={STYLES}
        >
          Вычисляемое свойство: {computed}
        </Typography>
        <Button
          color="success"
          onClick={() => {
            setNumber((prev) => prev + 1);
          }}
        >
          Добавить
        </Button>
        <Button
          color="error"
          onClick={() => {
            setNumber((prev) => prev - 1);
          }}
        >
          Убрать
        </Button>
        <Button
          color="warning"
          onClick={() => {
            setColored((prev) => !prev);
          }}
        >
          Изменить
        </Button>
      </Box>
      <Divider variant="middle"/>
    </div>
  );
}
