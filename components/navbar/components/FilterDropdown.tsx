import Link from "next/link";

const FilterDropdown = ({
    open,
    options,
}: {
    open: boolean;
    options: string[];
}) => (
    <div
        className={`absolute top-full left-0 mt-1 w-40 bg-white border border-gray-300 rounded shadow-lg z-10 transition-all origin-top ${open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
    >
        {options.map((option) => (
            <div
                key={option}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-all hover:translate-x-1"
            >
                {option}
            </div>
        ))}
    </div>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
        href={href}
        className="relative text-gray-800 hover:text-blue-600 font-medium transition-colors group"
    >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
    </Link>
);

export {
    NavLink, FilterDropdown
}