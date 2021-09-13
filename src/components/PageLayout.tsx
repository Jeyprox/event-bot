import layoutStyles from "../styles/PageLayout.module.scss";
import MainNav from "./MainNav";
import FooterNav from "./FooterNav";

interface LayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className="max-w-6xl mx-auto">
        <MainNav />
      </header>
      <main className="max-w-6xl min-h-[48em] mx-auto">{children}</main>
      <footer className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between px-4 sm:px-8 my-10 mt-32">
        <FooterNav />
      </footer>
    </>
  );
};

export default PageLayout;
