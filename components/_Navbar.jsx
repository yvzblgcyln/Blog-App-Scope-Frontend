import Link from "next/link";
import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/categorySlice";

function _Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const filter = useSelector((state) => state.category.filter);
  const dispatch = useDispatch();

  return (
    <Navbar className="navbar" color="light" light expand="md">
      <NavbarBrand href="/" onClick={() => dispatch(setFilter(""))}>
        Blog
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <Link href="/" onClick={() => dispatch(setFilter("Technology"))}>
            Technology
          </Link>
          <Link href="/" onClick={() => dispatch(setFilter("Finance"))}>
            Finance
          </Link>
          <Link href="/" onClick={() => dispatch(setFilter("Photo"))}>
            Photo
          </Link>
          <Link href="/" onClick={() => dispatch(setFilter("Art"))}>
            Art
          </Link>
          <Link href="/" onClick={() => dispatch(setFilter("Sport"))}>
            Sport
          </Link>
        </Nav>
      </Collapse>
      <Link href="login">Login</Link>
    </Navbar>
  );
}

export default _Navbar;
