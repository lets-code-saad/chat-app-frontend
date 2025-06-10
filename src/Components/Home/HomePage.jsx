import React, { useState } from "react";
import HomeLeft from "./HomeLeft/HomeLeft/HomeLeft";
import { Box, Grid } from "@mui/material";
import HomeRight from "./HomeRight/HomeRight";
import HomeCenter from "./HomeCenter/HomeCenter";
import { chatData } from "./ChatList";
import { useSelector } from "react-redux";

const HomePage = () => {
  // creating states to manage selected chat
  const { getOtherUsers, getOtherUsersLoading } = useSelector(
    (state) => state.GetOtherUsersSlice
  );
  console.log(getOtherUsers);
  const [receiverId, setReceiverId] = useState(null);
  const selectedChat = getOtherUsers?.otherUsers?.find(
    (chat) => String(chat._id) === String(receiverId)
  );
  console.log(selectedChat, "selectedChat");

  return (
    <>
      <Box className="bg-white">
        <Grid container spacing={2} className="container-fluid">
          <Grid item size={{ sm: 12, lg: 3, xl: 3, xs: 12 }}>
            <HomeLeft
              chatData={chatData}
              receiverId={receiverId}
              selectedChat={selectedChat}
              onSelectChat={setReceiverId}
            />
          </Grid>
          <Grid item size={{ sm: 12, lg: 6, xl: 6, xs: 12 }}>
            <HomeCenter
              selectedChat={
                selectedChat || { id: "", name: "", img: "", messages: [] }
              }
              receiverId={receiverId}
            />
          </Grid>
          <Grid item size={{ sm: 12, lg: 3, xl: 3, xs: 12 }}>
            <HomeRight
              selectedChat={
                selectedChat || { id: "", name: "", img: "", messages: [] }
              }
              receiverId={receiverId}
              onSelectChat={setReceiverId}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomePage;
