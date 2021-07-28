import layoutStyles from "../styles/PageLayout.module.scss";
import MainNav from "./MainNav";

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
    </>
  );
};

export default PageLayout;
