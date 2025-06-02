import React from "react";
import {
  Box,
  Button,
  CardMedia,
  TextField,
  InputAdornment,
  Typography,
  Avatar,
  Card,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import "./HomeLeft.css";

const HomeLeft = (props) => {
  const { chatData,selectedChatId, onSelectChat } = props;
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
        {chatData?.map((chat) => (
          <Box
            // assigning unique id to each chathead
          key={chat.id}
            // by clicking selects clicked chat
            onClick={() => onSelectChat(chat.id)}
            className={`chat_head ${
              selectedChatId === chat.id ? `activeChat` : ``
            } d-flex align-items-center px-1 py-1 gap-2`}
          >
            <Avatar src={chat?.img} sx={{ width: 40, height: 40 }} />
            <Box>
              <Typography className="text-capitalize" variant="body1">
                {chat.name}
              </Typography>
              {/* recent message */}
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
