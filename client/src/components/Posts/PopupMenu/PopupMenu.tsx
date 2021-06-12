import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import { withStyles } from "@material-ui/core/styles";

interface Props {
  post: any;
  setCurrentId: (prevState: any) => void;
  setCurrentFileId: (prevState: any) => void;
}

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const PopupMenu = ({ post, setCurrentId, setCurrentFileId }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        style={{ color: "#fff" }}
        size="small"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizRoundedIcon fontSize="default" />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <StyledMenuItem
          onClick={(e: any) => {
            handleClose(e);
            setCurrentId(post._id);
            setCurrentFileId(post.selectedFileId);
          }}
        >
          Edit
        </StyledMenuItem>
      </Menu>
    </div>
  );
};

export default PopupMenu;
