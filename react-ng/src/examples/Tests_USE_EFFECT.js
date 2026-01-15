import { Box, Divider, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function T_UE() {
  /**
   * Блок хуков
   */
  const [type, setType] = useState("users");
  const [data, setData] = useState([]);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  /**
   * Блок пользовательских функций
   */
  // useEffect(() => {
  //   console.log('Render');
  // });

  const mouseMoveHandler = (evt) => {
    setPos({
      x: evt.clientX,
      y: evt.clientY,
    });
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((response) => response.json())
      .then((json) => setData(json));

    return () => {
      console.log("Clean type");
    };
  }, [type]);

  useEffect(() => {
    console.log("Component did mount");
    window.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <div>
      <Typography variant="h4">Ресурс: {type}</Typography>
      <Button
        onClick={() => {
          setType("users");
        }}
      >
        Пользователи
      </Button>
      <Button
        onClick={() => {
          setType("todos");
        }}
      >
        TODO
      </Button>
      <Button
        onClick={() => {
          setType("posts");
        }}
      >
        Посты
      </Button>
      {/* <pre>
        {JSON.stringify(data, null, 2)}
      </pre>*/}
      <pre>{JSON.stringify(pos, null, 2)}</pre>
      <Divider variant="middle" />
    </div>
  );
}
