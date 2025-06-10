import Link from "next/link";

const MobileMenu = ({
    open,
    children,
}: {
    open: boolean;
    children: React.ReactNode;
}) => (
    <div
        className={`absolute top-16 left-0 right-0 bg-white shadow-lg z-40 transition-all overflow-hidden ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
            }`}
    >
        <div className="p-4">
            {children}
        </div>
    </div>
);

const MobileNavLink = ({
    href,
    children,
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    onClick: () => void;
}) => (
    <Link
        href={href}
        onClick={onClick}
        className="block py-2 px-4 text-gray-800 hover:text-blue-600 font-medium transition-all hover:translate-x-2 hover:bg-gray-50 rounded"
    >
        {children}
    </Link>
);

export {
    MobileMenu, MobileNavLink
}