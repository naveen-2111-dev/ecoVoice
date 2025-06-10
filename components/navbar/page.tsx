"use client";

import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronRight, Funnel, UserPlus, Menu, X } from "lucide-react";
import AuthButton from "./components/Authbutton";
import { MobileMenu, MobileNavLink } from "./components/Mobilemenu";
import { FilterDropdown, NavLink } from "./components/FilterDropdown";
import { useAuth } from "@/context/useAuth";

const Navbar: NextPage = () => {
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const { Auth, setAuth } = useAuth();

    const toggleFilter = () => setFilterOpen(!filterOpen);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    const handleLoginClick = (type?: string) => {
        if (type === "reg") {
            setAuth({ AuthState: true, AuthType: "reg" });
        } else
            setAuth({ AuthState: true, AuthType: "log" });
    };

    const navLinks = [
        { href: "/", label: "Explore" },
        { href: "/home", label: "Home" },
    ];

    const filterOptions = ["Option 1", "Option 2", "Option 3"];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md h-16 flex items-center justify-between px-4 md:px-6 z-50">
            <div className="flex items-center gap-4 md:gap-6">
                <Link href="/" className="shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 hover:scale-110 transition-transform duration-200">
                        <Image
                            src="/logo.png"
                            alt="ecoVoice"
                            width={70}
                            height={70}
                            className="w-full h-full object-cover rounded-full hover:shadow-lg transition-all"
                        />
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <NavLink key={link.href} href={link.href}>
                            {link.label}
                        </NavLink>
                    ))}

                    <div className="relative">
                        <button
                            onClick={toggleFilter}
                            className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all hover:shadow-md"
                        >
                            Filter
                            <Funnel
                                size={15}
                                className={`transition-transform`}
                            />
                        </button>

                        <FilterDropdown open={filterOpen} options={filterOptions} />
                    </div>
                </div>
            </div>

            <div className="hidden md:flex gap-4">
                <AuthButton
                    variant="outline"
                    icon={<UserPlus size={15} />}
                    onClick={() => handleLoginClick("reg")}
                >
                    Register
                </AuthButton>
                <AuthButton
                    variant="solid"
                    icon={<ChevronRight size={15} />}
                    onClick={() => handleLoginClick("log")}
                >
                    Login
                </AuthButton>
            </div>

            <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-all"
                aria-label="Toggle menu"
            >
                <div className="relative w-6 h-6">
                    <Menu
                        size={24}
                        className={`absolute transition-all ${mobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}
                    />
                    <X
                        size={24}
                        className={`absolute transition-all ${mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}
                    />
                </div>
            </button>

            <MobileMenu open={mobileMenuOpen} onClose={closeMobileMenu}>
                <div className="space-y-4 py-4">
                    {navLinks.map((link) => (
                        <MobileNavLink key={link.href} href={link.href} onClick={closeMobileMenu}>
                            {link.label}
                        </MobileNavLink>
                    ))}

                    <div className="py-2">
                        <button
                            onClick={toggleFilter}
                            className="flex justify-between items-center w-full px-3 py-2 border border-gray-300 rounded text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all"
                        >
                            <span className="flex items-center gap-2">
                                Filter
                                <Funnel
                                    size={15}
                                    className={`transition-transform`}
                                />
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${filterOpen ? "max-h-40 mt-2" : "max-h-0"
                                }`}
                        >
                            <div className="bg-gray-50 border border-gray-300 rounded shadow-inner">
                                {filterOptions.map((option) => (
                                    <div
                                        key={option}
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition-all hover:translate-x-2"
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-2 space-y-3">
                        <AuthButton
                            variant="outline"
                            icon={<UserPlus size={15} />}
                            onClick={() => {
                                handleLoginClick("reg");
                                closeMobileMenu();
                            }}
                            fullWidth
                        >
                            Register
                        </AuthButton>
                        <AuthButton
                            variant="solid"
                            icon={<ChevronRight size={15} />}
                            onClick={() => {
                                handleLoginClick("log");
                                closeMobileMenu();
                            }}
                            fullWidth
                        >
                            Login
                        </AuthButton>
                    </div>
                </div>
            </MobileMenu>
        </nav>
    );
};

export default Navbar;