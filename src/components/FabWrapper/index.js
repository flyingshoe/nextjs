'use client'
import { Fab } from "@mui/material";
import { useRef, useState } from "react";
import { Box, Grow } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FabContainer from "./FabContainer";
import rotate from "@/styles/animation/rotate.module.css";
import { kebabToCamel, modObjKeys } from "@/utils";

export default function FabWrapper({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const isGrp = Array.isArray(children);
  const nodeRef = useRef(null);
  const theme = useTheme();
  const bigScreen = useMediaQuery(theme.breakpoints.up("md"));

  const toggleFab = () => {
    setIsOpen(!isOpen);
  };

  //Only ONE child
  if (!isGrp) {
    return (
      <FabContainer>
        <Fab
          color="secondary"
          // We use a combination of onClickCapture and stopPropagation so that children events are not called (prevent duplicates)
          onClickCapture={(e) => {
            e.stopPropagation();
            children.props.onClick();
          }}
        >
          {children}
        </Fab>
      </FabContainer>
    );
  }

  // Large screen (>=md)
  if (bigScreen) {
    return (
      <FabContainer>
        {children.map((child, index) => (
          <Fab
            key={index}
            color="primary"
            // We use a combination of onClickCapture and stopPropagation so that children events are not called (prevent duplicates)
            onClickCapture={(e) => {
              e.stopPropagation();
              child.props.onClick();
            }}
          >
            {child}
          </Fab>
        ))}
      </FabContainer>
    );
  }

  // Mobile devices (xs,sm) with more than ONE child
  return (
    <FabContainer>
      {/* FAB Group */}
      <Grow in={isOpen} timeout={400} style={{ transformOrigin: "bottom" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {children.map((child, index) => (
            <Fab
              key={index}
              color="primary"
              // We use a combination of onClickCapture and stopPropagation so that children events are not called (prevent duplicates)
              onClickCapture={(e) => {
                e.stopPropagation();
                child.props.onClick();
              }}
            >
              {child}
            </Fab>
          ))}
        </Box>
      </Grow>

      {/* Hide/Show Toggle Button */}
      <CSSTransition
        nodeRef={nodeRef}
        in={isOpen}
        classNames={modObjKeys(rotate, kebabToCamel)}
        timeout={3000}
      >
        <Fab color="secondary" ref={nodeRef} onClick={toggleFab}>
          <AddIcon />
        </Fab>
      </CSSTransition>
    </FabContainer>
  );
}
