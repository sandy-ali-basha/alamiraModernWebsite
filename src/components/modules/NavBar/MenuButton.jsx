import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Badge, IconButton, Tooltip } from "@mui/material";
import styled from "@emotion/styled";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function MenuButton({
  badgeNumber,
  icon,
  menuItems,
  tooltip,
  defaultValue,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title={tooltip}>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <StyledBadge badgeContent={badgeNumber} color="secondary">
            {icon}
          </StyledBadge>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItems.map((item, index) => (
          <MenuItem
            sx={{
              // eslint-disable-next-line eqeqeq
              border: item.id == defaultValue ? "1px solid #218ea7" : "none",
              borderRadius:1,
              mx:1
            }}
            key={index} // Alternatively, you can use a unique property like item.label or item.id if available
            onClick={() => {
              if (item.onClick) item.onClick();
              handleClose();
            }}
          >
            {item.label} 
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
