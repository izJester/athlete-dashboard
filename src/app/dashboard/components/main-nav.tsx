import Link from "next/link"

import { cn } from "@/lib/utils"
import { usePathname  } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname ();
  const routes: { title: string; href: string }[] = [
    {
      title: "Overview",
      href: "/dashboard",
    },
    {
      title: "Players",
      href: "/players",
    },
    {
      title: "Scan",
      href: "/scan",
    },
  ];
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {
        routes.map(route => <>
          <Link
            href={route.href}
            className={`text-sm font-medium transition-colors hover:text-primary ${ pathname === route.href ? 'text-primary' : 'text-gray-400'}`}
          >
            {route.title}
          </Link>
        </>)
      }
    </nav>
  )
}