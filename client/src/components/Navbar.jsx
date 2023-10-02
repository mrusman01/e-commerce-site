import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../services/authProvider";

const settings = [
  { link: "#", name: "Profile" },
  { link: "#", name: "Account" },
  { link: "#", name: "Dashboard" },
];

const Navbar = () => {
  const { role } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

 

  const pages = [
    { link: "/products", btn: "Products" },
    { link: "/cart-products", btn: "Cart" },
    { link: "/user-products", btn: "My Products" },
    role === "admin" && {
      link: "/add-products",
      btn: "Add Products",
    },
  ];
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((item, i) => (
              <NavLink
                to={item.link}
                key={i}
                style={{ textDecoration: "none" }}
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {item.btn}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, gap: 3, display: "flex" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="U" src="/static/images/avatar/3.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              //   id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((item, i) => (
                <MenuItem key={i} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <Button
              variant="outlined"
              sx={{ color: "#fff", border: "2px solid #BDBDBD" }}
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
