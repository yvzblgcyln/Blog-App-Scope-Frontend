import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

function UserDropdown({ user, direction, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setUser(""));
  };

  return (
    <div className="d-flex">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle caret>{user}</DropdownToggle>
        <DropdownMenu {...args}>
          <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

UserDropdown.propTypes = {
  direction: PropTypes.string,
};

export default UserDropdown;
