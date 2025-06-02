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
import "./HomeRight.css"
const HomeRight = (props) => {
const {selectedChat} = props
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
          image={selectedChat?.img}
        />
        <Typography className="text-capitalize">
          {selectedChat?.name}
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
      <Box sx={{ display:"flex", flexDirection:"column", gap:"10px", flexGrow: 1 }}>
        <Typography className="">Media</Typography>
        {/* Media Images */}
        <Box className="d-flex flex-wrap gap-1">
          <CardMedia
            sx={{ width: "80px" }}
            className="img-fluid"
            component="img"
            image={selectedChat?.img}
          />
        </Box>
      </Box>
      <Box className="text-center w-100">
        <button className="btn btn-primary text-white px-5 border-0 rounded-pill">
          Logout
        </button>
      </Box>
    </Card>
  );
};

export default HomeRight;
