"use client";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { navItems } from "../constants/navbar";

const drawerWidth = 240;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    typeof window !== "undefined" ? window.document.body : undefined;

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* For Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer}
              color="#555"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={toggleDrawer}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              <Box onClick={toggleDrawer} sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    py: 2,
                    color: "#555",
                  }}
                  component={Link}
                  href="/"
                  className={router.pathname === "/" ? "m-nav-item-active" : ""}
                >
                  <HomeIcon />
                </Typography>
                <Divider />
                <List>
                  {navItems.map((item) => (
                    <ListItem
                      key={item.title}
                      component={Link}
                      href={item.path}
                      disablePadding
                      className={
                        router.pathname === item.path
                          ? "m-nav-item-active"
                          : "m-nav-item"
                      }
                    >
                      <ListItemButton
                        sx={{ textAlign: "center", color: "#555" }}
                      >
                        <ListItemText primary={item.title} href={item.path} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", sm: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#555",
              textDecoration: "none",
            }}
          >
            FLYINGSHOE
          </Typography>

          {/* For Desktop */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#555",
              textDecoration: "none",
            }}
          >
            FLYINGSHOE
          </Typography>

          {/* Middle Items */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {navItems.map((item) => (
              <Button
                key={item.title}
                component={Link}
                href={item.path}
                sx={{ my: 2, color: "#555", display: "block" }}
                className={
                  router.pathname === item.path ? "nav-item-active" : "nav-item"
                }
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
