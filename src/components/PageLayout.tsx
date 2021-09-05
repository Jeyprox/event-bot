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
      <footer className="max-w-6xl mx-auto flex justify-between my-10 mt-32">
        <FooterNav />
      </footer>
    </>
  );
};

export default PageLayout;
