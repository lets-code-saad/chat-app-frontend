import React from "react";
import {
  Box,
  Button,
  CardMedia,
  TextField,
  InputAdornment,
  Typography,
  Avatar,
  Divider,
  Card,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import "./HomeRight.css";
import { useNavigate } from "react-router-dom";

const HomeRight = (props) => {
  const { selectedChat } = props;

  const navigate = useNavigate()
  

  return (
    <Card
      sx={{
        backgroundColor: "white",
        height: "100%",
        maxHeight: "100vh",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* Left Details */}
      <Box className="d-flex flex-column align-items-center gap-2 justify-content-between">
        <CardMedia
          sx={{ width: "200px" }}
          className="img-fluid border-0 rounded-pill"
          component="img"
          image={selectedChat?.profilePhoto}
        />
        <Typography className="text-capitalize">
          {selectedChat?.username}
        </Typography>
        <Typography
          sx={{ color: "#555" }}
          variant="caption"
          className="text-capitalize"
        >
          {selectedChat?.msg}
        </Typography>
      </Box>
      <Divider component="div" color="black" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flexGrow: 1,
        }}
      >
        <Typography className="">Media</Typography>
        {/* Media Images */}
        <Box className="d-flex flex-wrap gap-1">
          <CardMedia
            sx={{ width: "80px" }}
            className="img-fluid"
            component="img"
            image={selectedChat?.profilePhoto}
          />
        </Box>
      </Box>

      {/* LOGOUT BUTTON */}
      <Box className="text-center w-100">
        <button
          onClick={() => {
            localStorage.removeItem("token"); // removes the token, and again asks the user to login
            localStorage.removeItem("isLoggedIn"); // removes the isLoggedIn Condition
            navigate("/login");
          }}
          className="btn btn-primary text-white px-5 border-0 rounded-pill"
        >
          Logout
        </button>
      </Box>
    </Card>
  );
};

export default HomeRight;
