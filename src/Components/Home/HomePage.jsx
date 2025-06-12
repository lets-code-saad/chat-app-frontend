import React, { useEffect, useState } from "react";
import HomeLeft from "./HomeLeft/HomeLeft/HomeLeft";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeRight from "./HomeRight/HomeRight";
import HomeCenter from "./HomeCenter/HomeCenter";
import { chatData } from "./ChatList";
import { useSelector } from "react-redux";

const HomePage = () => {
  // handling responsiveness
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showChatList, setShowChatList] = useState(true); // for mobile toggle

  // creating states to manage selected chat
  const { getOtherUsers, getOtherUsersLoading } = useSelector(
    (state) => state.GetOtherUsersSlice
  );
  console.log(getOtherUsers);
  const [receiverId, setReceiverId] = useState(null);
  const selectedChat = getOtherUsers?.otherUsers?.find(
    (chat) => String(chat._id) === String(receiverId)
  );
  console.log(selectedChat, "selectedChatAfterNull");

  // Reset chat list visibility when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setShowChatList(true);
    }
  }, [isMobile]);

  const handleSelectChat = (chatId) => {
    setReceiverId(chatId);
    // if mobile, hide chats and show conversation
    if (isMobile) {
      setShowChatList(false);
    }
  };
  const handleBackToList = () => {
    // making selectedChat id to null, so that it displays all chats unselected
    setReceiverId(null);
    // if press back btn show chat list
    if (isMobile) {
      setShowChatList(true);
    }
  };

  // ACCOUNT DASBHOARD MENU
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box className="bg-white">
        <Grid container spacing={2} className="container-fluid">
          {/*Left Panel, Chat List Show On Mobile */}
          <Grid
            item
            size={{ sm: 12, lg: 3, xl: 3, xs: 12 }}
            sx={{ display: isMobile && !showChatList ? "none" : "block" }}
          >
            <HomeLeft
              chatData={chatData}
              receiverId={receiverId}
              selectedChat={selectedChat}
              onSelectChat={handleSelectChat}
              handleClose={handleClose}
              handleClick={handleClick}
              open={open}
              anchorEl={anchorEl}
            />
          </Grid>
          {/* Center Panel, Conversation  */}

          <Grid
            item
            size={{ sm: 12, lg: 6, xl: 6, xs: 12 }}
            sx={{ display: isMobile && showChatList ? "none" : "block" }}
          >
            <HomeCenter
              isMobile={isMobile}
              selectedChat={
                selectedChat || { id: "", name: "", img: "", messages: [] }
              }
              onSelectChat={handleSelectChat}
              onSelectBackChat={handleBackToList}
              receiverId={receiverId}
            />
          </Grid>

          {/* Right Panel, Media Info Hide On Mobile */}
          <Grid
            item
            size={{ sm: 12, lg: 3, xl: 3, xs: 12 }}
            sx={{ display: isMobile ? "none" : "block" }}
          >
            {receiverId ? (
              <HomeRight selectedChat={selectedChat} />
            ) : (
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
                    className="img-fluid"
                    image="/imgs/select media.jpg"
                    component="img"
                  />
                  <Typography
                    sx={{ fontSize: "17px" }}
                    variant="h6"
                    color="text.secondary"
                  >
                    Select any chat to show its media
                  </Typography>
                </Box>
              </Card>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;
