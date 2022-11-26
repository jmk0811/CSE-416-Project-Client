
export default function Header() {
    return (
        <div className={"w-full h-[60px] bg-blue-600 sticky top-0 flex flex-col px-[30px]"}>
            <div className={"flex flex-row my-auto mx-auto w-full max-w-[1400px]"}>
                <div className={"mr-auto"}>LOGO</div>
                <div className={"ml-auto"}>Login</div>
            </div>
        </div>
    );
}