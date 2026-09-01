"use client";
import { useLayoutEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import {
  Divider,
  Drawer,
  IconButton,
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
  const [colorMode, setColorMode] = useState("light");

  const router = useRouter();

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const applyTheme = (themeMode) => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    const isDark = themeMode === "dark";
    root.classList.toggle("dark", isDark);
    window.localStorage.setItem("theme", themeMode);
  };

  const toggleColorMode = () => {
    setColorMode((prev) => {
      const nextTheme = prev === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      return nextTheme;
    });
  };

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    // The head script already applied the theme, just sync the state
    const isDarkApplied = window.document.documentElement.classList.contains("dark");
    setColorMode(isDarkApplied ? "dark" : "light");
  }, []);

  const container =
    typeof window !== "undefined" ? window.document.body : undefined;

  const isDarkMode = colorMode === "dark";
  const appBarBackground = isDarkMode
    ? "rgba(15, 23, 42, 0.85)"
    : "rgba(255,255,255,0.85)";
  const textColor = isDarkMode ? "#f8fafc" : "#555";

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: appBarBackground,
        backdropFilter: "blur(5px) saturate(2)",
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
              sx={{ color: textColor }}
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
                    color: textColor,
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
                        sx={{ textAlign: "center", color: textColor }}
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
              color: textColor,
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
              color: textColor,
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
                sx={{ my: 2, color: textColor, display: "block" }}
                className={
                  router.pathname === item.path ? "nav-item-active" : "nav-item"
                }
              >
                {item.title}
              </Button>
            ))}
          </Box>
          <IconButton
            onClick={toggleColorMode}
            sx={{ color: textColor }}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
