import _Navbar from "@/components/_Navbar";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <_Navbar />
      {children}
    </div>
  );
};
export default Layout;
