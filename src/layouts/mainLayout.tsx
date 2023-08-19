'use client'

import { MainNav } from "@/app/dashboard/components/main-nav";
import { Search } from "@/app/dashboard/components/search";
import { UserNav } from "@/app/dashboard/components/user-nav";

export default function MainLayout({children}: any) {
    return (<>
        <div className="hidden flex-col md:flex">
            <div className="border-b">
            <div className="flex h-16 items-center px-4">
                {/* <TeamSwitcher /> */}
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                <Search />
                <UserNav />
                </div>
            </div>
            </div>
            {children}
        </div>
    </>)
}