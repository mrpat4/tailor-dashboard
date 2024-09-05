import { FC, ReactNode } from "react";
import Sidebar from "./Sidebar";
import useSidebarStore from "store/useSidebarStore";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { isOpen } = useSidebarStore();

  return (
    <>
      <Sidebar />
      <Navbar />
      <main
        className={`${
          isOpen ? "md:w-smallMain w-full" : "md:w-bigMain w-full"
        } ml-auto transition300 py-8 md:px-4 px-4 bg-mainSection rounded-2xl min-h-screen`}
      >
        {/* <div
        className={`${
          isOpen ? "md:w-smallMain w-full" : "md:w-bigMain w-full"
        } ml-auto transition300 py-8 md:px-2 px-3`}
      > */}
        {children}
        {/* </div> */}
      </main>
      <footer></footer>
    </>
  );
};

export default Layout;
