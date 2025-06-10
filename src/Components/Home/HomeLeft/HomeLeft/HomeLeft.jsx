import React, { useEffect, useSyncExternalStore } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import "./HomeLeft.css";
import { useDispatch, useSelector } from "react-redux";
import GetOtherUsersThunk from "../../../Store/Redux-Thunks/GetOtherUsersThunk";

const HomeLeft = (props) => {
  const dispatch = useDispatch();
  const { chatData, selectedChat, receiverId, onSelectChat } = props;

  const { getOtherUsers, getOtherUsersLoading } = useSelector(
    (state) => state.GetOtherUsersSlice
  );
  const { signupUser } = useSelector((state) => state.SignupSlice);
  useEffect(() => {
    dispatch(GetOtherUsersThunk());
  }, [signupUser]);
console.log(signupUser,"leftSignupUser");

  return (
    <Card
      sx={{
        // backgroundColor: "white",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* Left Logo */}
      <Box
        sx={{ height: "40px" }}
        className="d-flex align-items-center justify-content-between"
      >
        <CardMedia
          className="img-fluid"
          sx={{ width: "130px" }}
          component="img"
          image="/imgs/chat app logo.png"
        />
        <Button className="text-black">
          <ListIcon />
        </Button>
      </Box>
      {/* SEARCH BAR */}
      <Box>
        <TextField
          variant="outlined"
          placeholder="Search anyone.."
          size="small"
          fullWidth
          sx={{
            backgroundColor: "#002670",
            color: "white",
            fontWeight: "light",
            input: {
              color: "white",
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
                <SearchIcon sx={{ color: "white" }} />
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
          : getOtherUsers?.otherUsers?.map((chat) => (
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
