import _Navbar from "@/components/navbar/_Navbar";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <_Navbar />
      {children}
    </div>
  );
};
export default Layout;
