import { FC, ReactElement, ReactNode } from "react";
import classes from "./PageContent.module.css";

interface PageContentProps {
    title: string;
    children: ReactNode;
}

const PageContent: FC<PageContentProps> = ({title, children}): ReactElement => {
    return (
        <div className={classes.content}>
            <h1>{title}</h1>
            {children}
        </div>
    );
}

export default PageContent;