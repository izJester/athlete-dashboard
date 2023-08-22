'use client'

import { MainNav } from "@/app/dashboard/components/main-nav";
import { Search } from "@/app/dashboard/components/search";
import { UserNav } from "@/app/dashboard/components/user-nav";

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Fragment } from "react";

export default function MainLayout({children , header}: any) {

    return (
        <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
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