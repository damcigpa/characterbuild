import React from "react";
import Header from "@/Components/Headers";

const MainLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      { modal }
    </div>
  )
}
export default MainLayout;