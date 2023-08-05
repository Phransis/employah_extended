import { ChevronRightOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import profile from "../assets/user.jpeg";

// Icons
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import { useSelector } from "react-redux";
import axios from "axios";

function Sidebar() {
  const [active, setActive] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const theme = useTheme();
  const userInfo = useSelector((state) => state.auth.profile);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${theme.palette.background.alt} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <MenuOutlinedIcon sx={{ color: theme.palette.primary[100] }} />
              ) : undefined
            }
            style={{
              margin: "10px 0 20px 0",
              color: theme.palette.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="0px"
              >
                <Typography variant="h3" color={theme.palette.primary[100]}>
                  DASHBOARD
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={profile}
                  style={{ cursoer: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={theme.palette.primary[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Any name
                </Typography>
                <Typography variant="h5" color={theme.palette.secondary[500]}>
                  City Name
                </Typography>
              </Box>
            </Box>
          )}

          {/* ITEMS */}
          <List>
            {navItems.map(({ text, icon }) => {
              return (
                <Item
                  text={text}
                  icon={icon}
                  active={active}
                  setActive={setActive}
                  isCollapsed={isCollapsed}
                />
              );
            })}
          </List>
        </Menu>
      </ProSidebar>
    </Box>
  );
}

const navItems = [
  {
    text: "Profile",
    icon: <AccountBoxIcon />,
  },
  {
    text: "My Documents",
    icon: <PostAddIcon />,
  },
  {
    text: "My Rides",
    icon: <PlaylistAddCheckIcon />,
  },
  {
    text: "Vehicles",
    icon: <LocalTaxiIcon />,
  },
  {
    text: "Rider Invoices",
    icon: <ReceiptOutlinedIcon />,
  },
  {
    text: "Invoices",
    icon: <DescriptionOutlinedIcon />,
  },
  {
    text: "Compensations",
    icon: <AccountBalanceWalletOutlinedIcon />,
  },
  {
    text: "Balance Reports",
    icon: <AssessmentOutlinedIcon />,
  },
  {
    text: "Tax Reports",
    icon: <SummarizeOutlinedIcon />,
  },
  {
    text: "Payouts",
    icon: <PaidOutlinedIcon />,
  },
  {
    text: "Guides & FAQ",
    icon: <QuizOutlinedIcon />,
  },
  {
    text: "Contacts",
    icon: <PermContactCalendarOutlinedIcon />,
  },
];

const Item = ({ text, icon, active, setActive, isCollapsed }) => {
  const lcText = text.toLowerCase();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <ListItem
      disablePadding
      // sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <ListItemButton
        onClick={() => {
          navigate(`/${lcText}`);
          setActive(lcText);
        }}
        sx={{
          backgroundColor:
            active === lcText ? theme.palette.secondary[300] : "transparent",
          color:
            active === lcText
              ? theme.palette.primary[600]
              : theme.palette.secondary[100],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ListItemIcon
          sx={{
            color:
              active === lcText
                ? theme.palette.primary[600]
                : theme.palette.secondary[200],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        {!isCollapsed && <ListItemText primary={text} />}
        {active === lcText && !isCollapsed && (
          <ChevronRightOutlined sx={{ ml: "auto" }} />
        )}
      </ListItemButton>
    </ListItem>
  );
};

export default Sidebar;
