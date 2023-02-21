import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Badge } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../redux/categorySlice";
import { setUser } from "@/redux/userSlice";
import UserDropdown from "@/components/userDropdown";
import Cookies from "js-cookie";

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCategories`);
  const data = await res.json();
  console.log(data);
  return {
    props: { category: data },
  };
};

function _Navbar({ category }) {
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
          <Link href="/?cat=technology" onClick={() => dispatch(setFilter("Technology"))}>
            Technology
          </Link>
          <Link href="/?cat=finance" onClick={() => dispatch(setFilter("Finance"))}>
            Finance
          </Link>
          <Link href="/?cat=photo" onClick={() => dispatch(setFilter("Photo"))}>
            Photo
          </Link>
          <Link href="/?cat=art" onClick={() => dispatch(setFilter("Art"))}>
            Art
          </Link>
          <Link href="/?cat=sport" onClick={() => dispatch(setFilter("Sport"))}>
            Sport
          </Link>
        </Nav>
        {user && (
          <Link href="/post/add" className="p-1" style={{ borderRadius: "5px", background: "bisque" }}>
            Add Post
          </Link>
        )}
      </Collapse>

      {user ? <UserDropdown user={user} /> : <Link href="/login">Login</Link>}
    </Navbar>
  );
}

export default _Navbar;
