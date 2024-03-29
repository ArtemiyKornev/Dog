import * as React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function iconBasket({ count, clickFunction }) {
  return (
    <div onClick={() => clickFunction()}>
      <IconButton aria-label="cart">
        <Badge badgeContent={count} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </div>
  );
}
