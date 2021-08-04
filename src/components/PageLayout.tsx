import layoutStyles from "../styles/PageLayout.module.scss";
import MainNav from "./MainNav";
import FooterNav from "./FooterNav";

interface LayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className={layoutStyles.layoutItem}>
        <MainNav />
      </header>
      <main className={layoutStyles.layoutItem}>{children}</main>
      <footer className={layoutStyles.layoutItem}>
        <FooterNav />
      </footer>
    </>
  );
};

export default PageLayout;
