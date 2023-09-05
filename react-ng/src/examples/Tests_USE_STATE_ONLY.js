import {
  Box,
  Divider,
  Button, Typography,
} from '@mui/material';
import React, {useState} from 'react';

function computeInitialCounter() {
  console.log('Some calculations...');
  return Math.trunc(Math.random() * 20);
}

export default function T_US() {
  /**
   * Блок хуков
   */
  // const [counter, setCounter] = useState(0);
  // const [counter, setCounter] = useState(computeInitialCounter());
  const [counter, setCounter] = useState(() => {
    return computeInitialCounter();
  },
  );

  const [state, setState] = useState({
    title: 'Счётчик',
    date: Date.now(),
  });

  /**
   * Блок пользовательских функций
   */
  function increment() {
    // setCounter(counter + 1);
    // setCounter(counter + 1);
    setCounter((prevCounter) => {
      return prevCounter + 1;
    });
    // setCounter(prev => prev + 1);
  }

  function decrement() {
    setCounter(counter - 1);
  }

  function updateTitle() {
    setState((prevState) => {
      return {
        ...prevState,
        title: 'Новое название',
      };
    });
  }

  return (
    <div>
      <Box sx={{p: 2}}>
        <Typography variant="h4">
          Счётчик: {counter}
        </Typography>
        <Button
          color="success"
          onClick={increment}
        >
          Добавить
        </Button>
        <Button
          color="error"
          onClick={decrement}
        >
          Убрать
        </Button>
        <Button
          onClick={updateTitle}
        >
          Изменить название
        </Button>
      </Box>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
      <Divider
        variant="middle"
      />
    </div>
  );
}
