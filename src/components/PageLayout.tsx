import layoutStyles from "../styles/PageLayout.module.scss";
import MainNav from "./MainNav";

interface LayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({children}: LayoutProps) => {
    return (
        <>
        <MainNav />
        <main className={layoutStyles.mainPage}>
            {children}
        </main>
        </>
    )
}

export default PageLayout
