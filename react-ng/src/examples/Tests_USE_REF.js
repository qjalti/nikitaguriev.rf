import { Box, Divider, Button, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

export default function T_UE() {
  /**
   * Блок хуков
   */
  // const [renderCount, setRenderCount] = useState(1);
  const [value, setValue] = useState("initial");
  const renderCount = useRef(1);
  const inputRef = useRef(null);
  const prevValue = useRef("");

  useEffect(() => {
    renderCount.current++;
  });

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  /**
   * Блок пользовательских функций
   */
  const focus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4">
          Количество рендеров: {renderCount.current}
        </Typography>
        <Typography variant="h4">
          Прошлое состояние: {prevValue.current}
        </Typography>
        <input
          ref={inputRef}
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <Button onClick={focus} color="success">
          Focus
        </Button>
        <Divider variant="middle" />
      </Box>
    </div>
  );
}
