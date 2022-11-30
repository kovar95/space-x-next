import Search from "./Search";
import Logo from "./Logo";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Menu from "./Menu";

const StyledHeader = styled(AppBar)(() => ({
  background: "linear-gradient(45deg, #2f4f4f,#09172c)",
  boxShadow:
    "0px 2px 12px -1px rgb(121 255 224 / 72%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
  padding: "10px 20px",
  width: "100%",
  zIndex: 1,
  opacity: 0.95,
  borderRadius: "0 0 20px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const Header = () => {
  return (
    <StyledHeader position="fixed" sx={{ flexDirection: "row" }}>
      <Logo />
      <Search />
      <Menu />
    </StyledHeader>
  );
};

export default Header;
