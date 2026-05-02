/**
 * Блок подключения модулей/импортов
 */
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grow,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  RefreshOutlined,
  FiberManualRecord,
  CloseOutlined,
  ZoomInOutlined,
} from "@mui/icons-material";
import { Helmet } from "react-helmet-async";

const CAM_URL = "https://qjalti.ru/webcam/latest.jpg";
const REFRESH_INTERVAL = 1000;

export const WCam = () => {
  const [lastUpdated, setLastUpdated] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const intervalRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const refresh = async () => {
    try {
      const res = await fetch(CAM_URL, { method: "HEAD", cache: "no-store" });
      const lastModified = res.headers.get("Last-Modified");
      setLastUpdated(lastModified ? new Date(lastModified) : null);
    } catch (e) {
      console.error("HEAD request failed:", e);
    }
    setImgSrc(`${CAM_URL}?t=${Date.now()}`);
  };

  useEffect(() => {
    refresh();
    intervalRef.current = setInterval(refresh, REFRESH_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatDate = (date) => {
    if (!date) return "—";
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <>
      <Helmet>
        <title>Веб-камера — qjalti.ru</title>
        <meta name="description" content="Трансляция с веб-камеры" />
      </Helmet>

      {/* Полноэкранный просмотр */}
      <Dialog
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        fullScreen={isMobile}
        maxWidth="xl"
        fullWidth={!isMobile}
        PaperProps={{
          sx: {
            bgcolor: "black",
            m: isMobile ? 0 : 2,
          },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "black",
          }}
        >
          <IconButton
            onClick={() => setFullscreen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
            }}
          >
            <CloseOutlined />
          </IconButton>
          <img
            src={imgSrc}
            alt="Webcam snapshot fullscreen"
            style={{
              width: "100%",
              height: isMobile ? "100dvh" : "auto",
              maxHeight: isMobile ? "100dvh" : "90vh",
              objectFit: "contain",
              display: "block",
            }}
          />
        </DialogContent>
      </Dialog>

      <Grow in>
        <Box>
          <Paper>
            <Container sx={{ py: 3, px: { xs: 1, sm: 3 } }}>
              {/* Заголовок */}
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <FiberManualRecord
                  sx={{
                    color: isLive ? "success.main" : "grey.400",
                    fontSize: 14,
                    animation: isLive
                      ? "pulse 1.5s ease-in-out infinite"
                      : "none",
                    "@keyframes pulse": {
                      "0%, 100%": { opacity: 1 },
                      "50%": { opacity: 0.3 },
                    },
                  }}
                />
                <Typography variant="h5" component="h1" fontWeight={600}>
                  WCam
                </Typography>
                <Box flexGrow={1} />
                <Tooltip title="На весь экран">
                  <IconButton onClick={() => setFullscreen(true)} size="small">
                    <ZoomInOutlined />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Обновить вручную">
                  <IconButton onClick={refresh} size="small">
                    <RefreshOutlined />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Изображение */}
              <Box
                onClick={() => setFullscreen(true)}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: "black",
                  lineHeight: 0,
                  cursor: "zoom-in",
                  position: "relative",
                  "&:hover .zoom-hint": { opacity: 1 },
                }}
              >
                <img
                  src={imgSrc}
                  alt="Webcam snapshot"
                  onLoad={() => setIsLive(true)}
                  onError={() => setIsLive(false)}
                  style={{ width: "100%", display: "block" }}
                />
                {/* Подсказка при наведении — только на desktop */}
                <Box
                  className="zoom-hint"
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    bgcolor: "rgba(0,0,0,0.55)",
                    color: "white",
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                    alignItems: "center",
                    gap: 0.5,
                    opacity: 0,
                    transition: "opacity 0.2s",
                    pointerEvents: "none",
                  }}
                >
                  <ZoomInOutlined sx={{ fontSize: 16 }} />
                  <Typography variant="caption">На весь экран</Typography>
                </Box>
              </Box>

              {/* Время обновления */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, display: "block", textAlign: "right" }}
              >
                Обновлено: {formatDate(lastUpdated)}
              </Typography>
            </Container>
          </Paper>
        </Box>
      </Grow>
    </>
  );
};
