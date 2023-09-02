import { Box } from "@mui/material";

export default function FabContainer({ children }) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 30,
        right: 15,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {children}
    </Box>
  );
}
