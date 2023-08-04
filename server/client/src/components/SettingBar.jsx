import {
  AttachMoney,
  ChevronRightOutlined,
  ManageAccounts,
  Rowing,
  VerifiedUser,
  WorkspacePremium,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const navItems = [
  {
    text: "Status",
    icon: <VerifiedUser />,
  },
  {
    text: "Account Settings",
    icon: <ManageAccounts />,
  },
  {
    text: "Activity",
    icon: <Rowing />,
  },
  {
    text: "Upgrade to Premium",
    icon: <WorkspacePremium />,
  },
  {
    text: "Billing",
    icon: <AttachMoney />,
  },
];

function SettingBar({ setting, setSetting }) {
  const theme = useTheme();
  const [active, setActive] = useState("");

  return (
    <Box component="nav">
      {setting && (
        <Drawer
          open={setting}
          onClose={() => setSetting(false)}
          anchor="right"
          variant="temporary"
          sx={{
            width: "300px",
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSiziing: "border-box",
              borderWidth: "2px",
              width: "300px",
            },
          }}
        >
          <Box width="100%">
            <List>
              {navItems.map(({ text, icon }) => {
                // if (!icon) {
                //   return (
                //     <Typography sx={{ m: "2.25rem 0 1rem 3rem" }}>
                //       {text}
                //     </Typography>
                //   );
                // }
                const lcText = text.toLowerCase();

                return (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        // navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "0.5rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box m="auto 0 10px 0">
            <Divider />
            <Box>
              <Button
                onClick={() => {
                  // navigate(`/${lcText}`);
                  setActive("help");
                }}
                sx={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: 0,
                  backgroundColor:
                    active === "help"
                      ? theme.palette.secondary[300]
                      : "transparent",
                  color:
                    active === "help"
                      ? theme.palette.primary[600]
                      : theme.palette.secondary[100],
                }}
              >
                Help & Support
                {active === "help" && (
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                )}
              </Button>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

export default SettingBar;
