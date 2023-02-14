import Link from "next/link";
import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from "reactstrap";

function _Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="navbar" color="light" light expand="md">
      <NavbarBrand href="/">Blog</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <Link href="/">Technology</Link>
          <Link href="/">Finance</Link>
          <Link href="/">Photo</Link>
          <Link href="/">Art</Link>
          <Link href="/">Sport</Link>
        </Nav>
      </Collapse>
      <Link href="login">Login</Link>
    </Navbar>
  );
}

export default _Navbar;
