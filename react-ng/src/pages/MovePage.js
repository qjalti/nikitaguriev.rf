import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Grow,
  Typography,
  Button,
} from "@mui/material";
import travelers from "../img/undraw_travelers_re_y25a.svg";
import LinkIcon from "@mui/icons-material/Link";

export const Move = () => {
  return (
    <Grow in>
      <Box sx={{ flexGrow: 1 }}>
        <Paper sx={{ pb: 2 }}>
          <Container>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{ py: 4 }}
            >
              <Grid item>
                <Box component="img" src={travelers} sx={{ width: 256 }} />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h5" gutterBottom>
                  Список мест переехал!
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography gutterBottom>
                  Там можно оставлять комментарии и там есть более удобный и
                  расширенный функционал!
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Button
                  size={"large"}
                  endIcon={<LinkIcon />}
                  href={
                    "https://gliese1005.notion.site/876e29a52db34cfcb925a6df8b84cb5a"
                  }
                  target={"_blank"}
                >
                  Открыть
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Box>
    </Grow>
  );
};
