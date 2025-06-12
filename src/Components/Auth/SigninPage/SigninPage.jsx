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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import LoginThunk from "../../Store/Redux-Thunks/LoginThunk";
import LoadingComponent from "../../LoadingComponent/LoadingComponent";
import GetProfileThunk from "../../Store/Redux-Thunks/GetProfileThunk";

const SigninPage = () => {
  // handling responsiveness
const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginUser, loginLoading } = useSelector((state) => state.LoginSlice);

  const onSubmit = async (data) => {
    try {
      // Dispatch login thunk, unwrap throws on reject
      const login = await dispatch(LoginThunk(data)).unwrap();
      console.log(login,"login");
      
      if (login?.success===true) {
        // Save token
        localStorage.setItem("token", login?.token);
        // Get profile if needed
        const profile = await dispatch(GetProfileThunk()).unwrap();
        toast.success(login.message || "Login Success!");
        reset();
        navigate("/home");

}
    } catch (error) {
      console.error(error || "Login Error");
    }
  };
  
  
  

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
              sx={{ width: isMobile ?"200px" :"300px" }}
              className="img-fluid"
              component="img"
              image={"/imgs/logo_big.png"}
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
                    <TextField
                      {...field}
                      error={!!errors?.email}
                      size="small"
                      fullWidth
                      placeholder="Email"
                      sx={{
                        height: "37px",
                        borderRadius: "4px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "4px",
                          "& fieldset": {
                            borderColor: "#ccc",
                          },
                          "&:hover fieldset": {
                            borderColor: "#ccc", // neutral hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1976D2", // neutral focus
                            boxShadow: "none",
                          },
                        },
                      }}
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
                {/* PASSWORD */}
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required!",
                    pattern: {
                      value:
                        /^[A-Z][A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,16}$/,
                      message:
                        "Password must be 6 characters long, start with a capital letter, and may include special characters",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      error={errors?.password}
                      size="small"
                      fullWidth
                      placeholder="Password"
                      sx={{
                        height: "37px",
                        borderRadius: "4px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "4px",
                          "& fieldset": {
                            borderColor: "#ccc",
                          },
                          "&:hover fieldset": {
                            borderColor: "#ccc", // neutral hover
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1976D2", // neutral focus
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  )}
                />{" "}
                {errors?.password && (
                  <Typography
                    sx={{ marginTop: "-12px" }}
                    variant="body2"
                    color="error"
                    component="span"
                  >
                    {errors?.password?.message}
                  </Typography>
                )}
              </Box>

              {/* Login Button */}

              <Button
                className="bg-primary text-white text-capitalize"
                disabled={loginLoading}
                type="submit"
                fullWidth
                sx={{ mt: 2 }}
              >
                {loginLoading ? (
                  <>
                    Logging In...
                    <LoadingComponent />
                  </>
                ) : (
                  "Login Now"
                )}
              </Button>

              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 14, // smaller checkbox icon
                      },
                      padding: "4px ", // reduce checkbox padding
                    }}
                  />
                }
                label="Agree to the terms of use & privacy policy."
                sx={{
                  mt: 2,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "14px",
                    fontWeight: "normal",
                  },
                }}
              />
              <Typography
                className="d-flex align-items-center gap-1 fs-14"
                variant="body2"
                sx={{ mt: 2 }}
              >
                Create an account
                <Link
                  className="text-primary text-decoration-none fw-light fs-14"
                  to="/signup"
                >
                  <Typography>Click Here</Typography>
                </Link>
              </Typography>
              <Typography
                className="d-flex align-items-center gap-1 fs-14"
                variant="body2"
              >
                Forgot password?
                <Link
                  className="text-primary text-decoration-none fw-light fs-14"
                  to="/forgot-pass"
                >
                  <Typography>Click Here</Typography>
                </Link>
              </Typography>
            </Paper>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default SigninPage;
