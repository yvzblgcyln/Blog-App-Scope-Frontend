import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Badge } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/categorySlice";
import { setUser } from "@/redux/userSlice";
import UserDropdown from "@/components/userDropdown";
import Cookies from "js-cookie";

function _Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const filter = useSelector((state) => state.category.filter);
  const user = useSelector((state) => state.user.active);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser(Cookies.get("user") || ""));
  }, []);

  useEffect(() => {}, [filter]);

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
        {user && (
          <Link href="/post/add" className="p-1" style={{ borderRadius: "5px", background: "bisque" }}>
            Add Post
          </Link>
        )}
      </Collapse>

      {user ? <UserDropdown user={user} /> : <Link href="login">Login</Link>}
    </Navbar>
  );
}

export default _Navbar;
