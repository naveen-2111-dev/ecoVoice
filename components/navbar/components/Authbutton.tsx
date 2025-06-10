import Link from "next/link";

const AuthButton = ({
    variant = "solid",
    href,
    icon,
    children,
    onClick,
    fullWidth = false,
}: {
    variant?: "solid" | "outline";
    href?: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
    fullWidth?: boolean;
}) => {
    const baseClasses = `flex items-center justify-center gap-2 px-4 py-2 rounded font-medium transition-all hover:scale-105 ${variant === "solid"
        ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
        : "border border-blue-600 text-blue-600 hover:bg-blue-50 hover:shadow-md"
        } ${fullWidth ? "w-full" : ""}`;

    const content = (
        <>
            {children}
            <span className="transition-transform duration-200 group-hover:translate-x-1">
                {icon}
            </span>
        </>
    );

    if (href) {
        return (
            <Link href={href} onClick={onClick} className={baseClasses}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={baseClasses}>
            {content}
        </button>
    );
};

export default AuthButton;