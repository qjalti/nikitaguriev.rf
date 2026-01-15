import { Box, Breadcrumbs, Divider } from "@mui/material";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import { Link as RouterLink } from "react-router-dom";

const BREADCRUMBS = [
  <RouterLink to="/">Lorem</RouterLink>,
  <RouterLink to="/calc">Lorem</RouterLink>,
];

export default function BreadcrumbsBlock() {
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Breadcrumbs
          separator={<NavigateNextOutlinedIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {BREADCRUMBS}
        </Breadcrumbs>
      </Box>
      <Divider variant="middle" />
    </div>
  );
}
