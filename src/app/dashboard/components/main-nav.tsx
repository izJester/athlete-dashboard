'use client'
import Link from "next/link"

import { cn } from "@/lib/utils"
import { usePathname  } from "next/navigation";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import useAuth from "@/hooks/auth";
import { Menu as IconMenu, Layers } from "react-feather";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname ();
  const routes: { title: string; href: string }[] = [
    {
      title: "Escritorio",
      href: "/dashboard",
    },
    {
      title: "Atletas",
      href: "/players",
    },
    {
      title: "Escanear",
      href: "/scan",
    },
    {
      title: "Marcador",
      href: "/realtime-game",
    },
  ];


  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }

  const { user: userAuth , signOut } = useAuth();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Disclosure as="nav" className="bg-transparent shadow">
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image src="/logo.svg" height={90} width={90} alt="Logo" />
               
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {routes.map((item , i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? 'border-primary border-b-2'
                          : 'text-gray-300 border-gray-500',
                        'py-[22px] text-sm text-gray-700 hover:border-b-2'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))} */}
                      <Menu.Item>
                        {({active}) => (
                          <div
                            // href={item.href}
                            onClick={signOut}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                          Sign Out
                        </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="relative inline-flex items-center justify-center  text-gray-700">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <Layers className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <IconMenu className="block h-6 w-6" />
                )}
              </Disclosure.Button>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {routes.map((item , i) => (
              <Link
              key={i}
              href={item.href}
              className={classNames(
                pathname === item.href
                  ? 'border-primary border-r-2'
                  : 'text-gray-300 border-gray-500',
                'block px-3 py-2 text-base font-medium'
              )}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.title}
            </Link>
            ))}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">{user.name}</div>
                <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
              </div>
              <button
                type="button"
                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {/* {userNavigation.map((item) => 
                    
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                </Disclosure.Button>
                
              )} */}

                  <Disclosure.Button
                    as="div"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Sign Out
                </Disclosure.Button>
              
            </div>
          </div>
        </Disclosure.Panel>
      </>
    )}
    </Disclosure>
  )
}