"use client";

import { sidebarLinks } from "@/constants";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/clerk-react";

const LeftSideBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { userId } = useAuth();

    return (
        <section className="custom-scrollbar leftsidebar">
            {/* links */}
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map((link) => {
                    // active link check
                    const isActive =
                        (pathname.includes(link.route) &&
                            link.route.length > 1) ||
                        pathname === link.route;

                    // adds user id to path after profile
                    if (link.route === "/profile")
                        link.route = `${link.route}/${userId}`;

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={`leftsidebar_link ${
                                isActive && "bg-primary-500"
                            }`}
                        >
                            <Image
                                src={link.imgURL}
                                alt={link.label}
                                width={24}
                                height={24}
                            />
                            <p className="text-light-1 max-lg:hidden">
                                {link.label}
                            </p>
                        </Link>
                    );
                })}
            </div>

            {/* signout button */}
            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton
                        signOutCallback={() => router.push("/sign-in")}
                    >
                        <div className="flex cursor-pointer gap-4 p-4">
                            <Image
                                src="/assets/logout.svg"
                                alt="Logout"
                                width={24}
                                height={24}
                            />

                            <p className="text-light-2 max-lg:hidden">Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    );
};

export default LeftSideBar;
