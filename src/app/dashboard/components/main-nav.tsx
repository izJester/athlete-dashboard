import Link from "next/link"

import { cn } from "@/lib/utils"
import { usePathname  } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname ();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className={`text-sm font-medium transition-colors hover:text-primary ${ pathname === '/dashboard' ? '' : 'text-gray-400'}`}
      >
        Overview
      </Link>
      <Link
        href="/players"
        className={`text-sm font-medium transition-colors hover:text-primary ${ pathname === '/players' ? '' : 'text-gray-400'}`}
      >
        Players
      </Link>
      <Link
        href="/scan"
        className={`text-sm font-medium transition-colors hover:text-primary ${ pathname === '/scan' ? '' : 'text-gray-400'}`}
      >
        Scan
      </Link>
      <Link
        href="/examples/dashboard"
        className={`text-sm font-medium transition-colors hover:text-primary ${ pathname === '/aja' ? '' : 'text-gray-400'}`}
      >
        Settings
      </Link>
    </nav>
  )
}