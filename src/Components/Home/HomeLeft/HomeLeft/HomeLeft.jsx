import React, { useEffect, useState, useSyncExternalStore } from "react";
import {
  Box,
  Button,
  CardMedia,
  TextField,
  InputAdornment,
  Typography,
  Avatar,
  Card,
  Skeleton,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import "./HomeLeft.css";
import { useDispatch, useSelector } from "react-redux";
import GetOtherUsersThunk from "../../../Store/Redux-Thunks/GetOtherUsersThunk";
import { useNavigate } from "react-router-dom";

const HomeLeft = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {
    chatData,
    selectedChat,
    receiverId,
    handleClick,
    handleClose,
    open,
    anchorEl,
    onSelectChat,
  } = props;

  const { getOtherUsers, getOtherUsersLoading } = useSelector(
    (state) => state.GetOtherUsersSlice
  );
  // search states
  const [searchTerm, setSearchTerm] = useState("");
  // handle search
  const searchFilteredUsers = getOtherUsers?.otherUsers?.filter((query) =>
    query.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { signupUser } = useSelector((state) => state.SignupSlice);
  useEffect(() => {
    dispatch(GetOtherUsersThunk());
  }, [signupUser]);
  console.log(signupUser, "leftSignupUser");

  return (
    <Card
      sx={{
        // backgroundColor: "white",
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "100vh",
        gap: "20px",
      }}
    >
      {/* Left Logo */}
      <Box className="d-flex align-items-center justify-content-between">
        <Box className="d-flex align-items-center">
          <CardMedia
            className="img-fluid"
            sx={{ width: "45px" }}
            component="img"
            image="/imgs/ChatApp Logo.png"
          />
          <Typography variant="h6" fontWeight="bold" color="text.secondary">
            ChirpChat
          </Typography>
        </Box>
        <Button
          onClick={handleClick}
          sx={{
            minWidth: "0",
            "&:hover": {
              backgroundColor: "transparent", // Removes hover background
            },
          }}
          disableRipple
          size="small"
          className="text-black"
        >
          <ListIcon />
        </Button>
        {/* ACCOUNT DASHBOARD MENU */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom", // Aligns menu below the anchor
            horizontal: "right", // Options: "left", "center", "right"
          }}
          transformOrigin={{
            vertical: "top", // Menu grows downward
            horizontal: "right", // Aligns menu edge with anchor's right
          }}
          slotProps={{
            paper: {
              sx: {
                boxShadow: "none",
                border: "1px solid #e0e0e0",
                marginLeft: "13px",
                marginTop: "5px",
              },
            },
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              localStorage.removeItem("token"); // removes the token, and again asks the user to login
              localStorage.removeItem("isLoggedIn"); // removes the isLoggedIn Condition
              navigate("/login");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
      {/* SEARCH BAR */}
      <Box>
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          variant="outlined"
          placeholder="Search anyone.."
          size="small"
          fullWidth
          sx={{
            backgroundColor: "#f0f0f0",
            color: "grey",
            fontWeight: "light",
            input: {
              color: "black",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "grey" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {/* Chat Heads */}
      <Box
        sx={{ overflow: "auto", height: "73vh" }}
        className="d-flex flex-column gap-2 text-black"
      >
        {/* Condition 1 : If No Search Results */}
        {searchFilteredUsers?.length === 0 && (
          <Card
            sx={{
              p: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <CardMedia
                image="/imgs/No results found art.jpg"
                component="img"
              />
              <Typography variant="h6" fontWeight="bold" color="text.secondary">
                No Results Found
              </Typography>
              <Typography variant="span" color="text.secondary">
                No matches for your search. Check spelling or try another name.
              </Typography>
            </Box>
          </Card>
        )}

        {/* Condition 2 : If Loading */}
        {getOtherUsersLoading
          ? [...Array(getOtherUsers?.otherUsers?.length || 5)].map(
              (_, index) => (
                <Box
                  key={index}
                  className="d-flex align-items-center px-1 py-1 gap-2"
                >
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box sx={{ width: "100%" }}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </Box>
                </Box>
              )
            )
          : // Condition 3 : If All Users Present
            searchFilteredUsers?.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => onSelectChat(chat._id)}
                className={`chat_head ${
                  selectedChat?._id === chat?._id ? `activeChat` : ``
                } d-flex align-items-center px-1 py-1 gap-2`}
              >
                <Avatar
                  src={chat?.profilePhoto}
                  sx={{ width: 40, height: 40 }}
                />
                <Box>
                  <Typography className="text-capitalize" variant="body1">
                    {chat.username}
                  </Typography>
                  <Typography
                    sx={{ marginTop: "-20px", color: "#555" }}
                    variant="body2"
                    component="span"
                  >
                    {chat.lastMessage}
                  </Typography>
                </Box>
              </Box>
            ))}
      </Box>
    </Card>
  );
};

export default HomeLeft;
