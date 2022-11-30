import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";
import classNames from "classnames";
import { useSort, useFavourites } from "../../src/jotai";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    color="red"
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    backgroundColor: "#ffffff",
    color: "#4c5159",
    marginTop: theme.spacing(1),
    minWidth: 120,
    boxShadow:
      "rgb(121 255 224 / 72%) 0px 0px 0px 0px, #00f6a9 0px 0px 0px 1px, #00f6a9 0px 10px 15px -3px, #00f6a9 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const StyledButton = styled(Button)(() => ({
  margin: "0 10px",
  fontFamily: "monospace",
  boxShadow: "1px 2px 5px #00f6a9",
  backgroundColor: "#394955",
  color: "#fafcff",
  transition: "all 0.5s",
  "&:hover": {
    boxShadow: "1px 2px 5px #ffffff",
    backgroundColor: "#4c5159",
    color: "#ffffff",
  },
  "&.active": {
    color: "#ffffff",
    backgroundColor: "#2f4f4f",
  },
}));

const CustomizedMenus: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { sort, toggleSort } = useSort();
  const { showFavourites, toggleFavourites } = useFavourites();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledButton
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDownIcon />}
        className={classNames({
          active: open,
        })}
      >
        Options
      </StyledButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          className={classNames({
            active: sort,
          })}
          onClick={toggleSort}
          disableRipple
        >
          {sort ? <SortIcon /> : <FilterListIcon />}
          Sort
        </MenuItem>
        <MenuItem onClick={toggleFavourites} disableRipple>
          {showFavourites ? <StarIcon /> : <StarOutlineIcon />}
          Favourites
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default CustomizedMenus;
