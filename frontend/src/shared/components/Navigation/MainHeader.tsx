const MainHeader = props => {
    return (
        <header
            className="w-full h-16 flex items-center fixed top-0 left-0 bg-[#ff0055] shadow-md px-4 z-10 lg:justify-between">
            {props.children}
        </header>
    );
};

export default MainHeader;