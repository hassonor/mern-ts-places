import { FC, ReactElement, ReactNode } from "react";

interface PageContentProps {
    title: string;
    children: ReactNode;
}

const PageContent: FC<PageContentProps> = ({title, children}): ReactElement => {
    return (
        <div className="text-center">
            <h1>{title}</h1>
            {children}
        </div>
    );
}

export default PageContent;
