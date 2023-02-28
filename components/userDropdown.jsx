import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

function UserDropdown({ user, direction, ...args }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleLogout = () => {
    Cookies.remove("user");
    dispatch(setUser(""));
    router.push("/login");
  };

  return (
    <div className="d-flex">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle caret>{user}</DropdownToggle>
        <DropdownMenu {...args}>
          <Link href="/user/1">
            <DropdownItem style={{ marginTop: "-25px" }}>Profile</DropdownItem>
          </Link>
          <Link href="/" onClick={handleLogout}>
            <DropdownItem style={{ marginTop: "-25px", marginBottom: "-25px" }}>Logout</DropdownItem>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

UserDropdown.propTypes = {
  direction: PropTypes.string,
};

export default UserDropdown;
