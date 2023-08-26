'use client'

import { MainNav } from "@/app/dashboard/components/main-nav";
import Login from "@/app/login/page";
import useAuth from "@/hooks/auth";

export default function MainLayout({children , header}: any) {

    const { user } = useAuth();

    if (!user) {
      return <Login></Login>
    }

    return (
        <>
      <div className="min-h-full">
        <MainNav></MainNav>

        <header className="">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{header}</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
    )
}