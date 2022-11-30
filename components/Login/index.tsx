import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { useUser, useError } from "../../src/jotai";
import { Stack } from "@mui/material";
import logo from "../../images/logo.png";
import { Box } from "@mui/system";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import { authenticate, isAuth } from "../../src/helpers";
import signIn from "../../mutations/SignIn";

const StyledImg = styled("img")(() => ({
  filter: "hue-rotate(297deg) brightness(7.5)",
  width: "100%",
  maxWidth: "300px",
}));

const LoginBox = styled(Box)(() => ({
  background: "linear-gradient(45deg, #2f4f4f,#09172c)",
  color: "#ffffff",
  padding: "30px",
  margin: "40px auto",
  borderRadius: "3px",
  boxShadow: "6px 6px 15px rgb(121 255 224 / 72%)",
  position: "relative",
  width: "280px",
  textAlign: "center",
  height: "270px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
}));

const LoginCircle = styled("div")(() => ({
  backgroundColor: "#000000",
  boxShadow: '1px 1px 11px rgb(121 255 224 / 72%)',
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  position: "absolute",
  top: "-30px",
  left: "50%",
  transform: "translate(-50%, 0)",
}));

const CssTextField = styled(TextField)({
  "& label.MuiFormLabel-root": {
    color: "#ffffff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#ffffff",
  },
  "& .MuiInput-underline:before, & .MuiInput-underline:hover:before": {
    borderBottomColor: "#787878 !important",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff",
    },
    "&:hover fieldset": {
      borderColor: "#7d7d7d",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
    },
  },
  "& input": {
    color: "#ffffff",
  },
});

const StyledButton = styled(Button)(() => ({
  color: "#000000",
  backgroundColor: "#ffffff",
  "&:hover": {
    color: "#ffffff",
    backgroundColor: "#22837c",
  },
}));

const Cards: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [validationError, setValidationError] = useState<boolean>(false);

  const router = useRouter();

  const { setUser } = useUser();
  const { setError } = useError();

  useEffect(() => {
    if (isAuth()) {
      router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputValue(value);
    if (value.length < 5) {
      setValidationError(true);
    } else {
      setValidationError(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const user = await signIn(inputValue);
      setUser(user);
      authenticate(user);
      router.push("/");
    } catch (error) {
      setError({
        title: "Login error",
        description: error as string,
      });
    }
  };

  return (
    <Stack alignItems="center" paddingTop="50px">
      <picture>
        <source srcSet={logo.src} type="image/png" />
        <StyledImg src={logo.src} alt="logo" />
      </picture>
      <LoginBox>
        <LoginCircle>
          <AccountCircleIcon sx={{ color: "#ffffff", fontSize: "60px" }} />
        </LoginCircle>
        <div>Please enter your username</div>
        <Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PersonOutlineIcon
              sx={{ color: "#ffffff", mr: 1, fontSize: "25px" }}
            />
            <CssTextField
              label="Username"
              variant="standard"
              size="small"
              fullWidth
              value={inputValue}
              onChange={handleChange}
            />
          </Box>
          {validationError && (
            <FormHelperText sx={{ color: "#afabab" }}>
              Username must be 5 characters at least!
            </FormHelperText>
          )}
        </Box>
        <StyledButton
          disabled={validationError || inputValue.length === 0}
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          type="submit"
          color="success"
        >
          Go to launches
        </StyledButton>
      </LoginBox>
    </Stack>
  );
};

export default Cards;
