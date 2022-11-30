import logo from "../../images/logo.png";
import Link from "next/link";
import { styled } from "@mui/material";

const StyledImg = styled("img")(() => ({
  marginRight: "10px",
  maxWidth: "300px",
  width: "100%",
  filter: "hue-rotate(297deg) brightness(7.5)",
}));

const Logo = () => (
  <Link href="/">
    <picture>
      <source srcSet={logo.src} type="image/png" />
      <StyledImg src={logo.src} alt="logo" />
    </picture>
  </Link>
);

export default Logo;
