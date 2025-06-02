import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
  CardMedia,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: 'url("/imgs/background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        className="container"
        sx={{
          height: "100vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around", // aligns the card to the right
          alignItems: "center", // vertically centers the card
          //   px: 2,
        }} // horizontal padding for small screens}}
      >
        <Box className="d-flex flex-column align-items-center">
          <CardMedia
            sx={{ width: "300px" }}
            component="img"
            image="/imgs/logo_big.png"
          />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper
            elevation={6}
            sx={{
              width: "100%",
              maxWidth: 350,
              p: 3,
              borderRadius: 3,
              mr: { xs: 0, sm: 4 }, // margin right on medium+ screens
            }}
          >
            <Typography variant="h5" mb={2}>
              Login
            </Typography>
            <Box sx={{ gap: "15px" }} className="d-flex flex-column">
              {/* Email */}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email Is Required!",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address!",
                  },
                }}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    error={!!errors?.email}
                    size="small"
                    fullWidth
                    placeholder="Email"
                    sx={{ height: "37px", borderRadius: "4px" }}
                  />
                )}
              />{" "}
              {errors?.email && (
                <Typography
                  sx={{ marginTop: "-12px" }}
                  variant="body2"
                  color="error"
                  component="span"
                >
                  {errors?.email?.message}
                </Typography>
              )}
              {/* OTP */}
              <Controller
                name="otp"
                control={control}
                rules={{
                  required: "OTP is required!",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be exactly 6 digits.",
                  },
                }}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    error={errors?.otp}
                    size="small"
                    fullWidth
                    placeholder="OTP"
                    sx={{ height: "37px", borderRadius: "4px" }}
                  />
                )}
              />{" "}
              {errors?.otp && (
                <Typography
                  sx={{ marginTop: "-12px" }}
                  variant="body2"
                  color="error"
                  component="span"
                >
                  {errors?.otp?.message}
                </Typography>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              className="bg-primary text-white text-capitalize"
              sx={{ mt: 2 }}
            >
             Change Password
            </Button>

            <Typography
              className="d-flex align-items-center gap-1 fs-14"
              variant="body2"
              sx={{ mt: 2 }}
            >
              Login Your Account
              <Link
                className="text-primary text-decoration-none fw-light fs-14"
                to="/login"
              >
                <Typography>Click Here</Typography>
              </Link>
            </Typography>
          </Paper>
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPass;
