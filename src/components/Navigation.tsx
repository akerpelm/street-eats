"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const cuisines = [
  {
    title: "Mexican",
    href: "/cuisines/mexican",
    description: "Tacos, burritos, and other Mexican street food favorites",
  },
  {
    title: "Asian",
    href: "/cuisines/asian",
    description: "From dumplings to noodles - explore Asian street food",
  },
  {
    title: "Middle Eastern",
    href: "/cuisines/middle-eastern",
    description: "Falafel, shawarma, and other Middle Eastern delights",
  },
  {
    title: "American",
    href: "/cuisines/american",
    description: "Classic American street food and food trucks",
  },
]

const locations = [
  {
    title: "Manhattan",
    href: "/locations/manhattan",
    description: "Street food vendors in Manhattan",
  },
  {
    title: "Brooklyn",
    href: "/locations/brooklyn",
    description: "Explore Brooklyn's street food scene",
  },
  {
    title: "Queens",
    href: "/locations/queens",
    description: "Diverse street food offerings in Queens",
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="font-bold text-xl">StreetEats</Link>
              <Link href="/cuisines" className="text-foreground/60">Cuisines</Link>
              <Link href="/locations" className="text-foreground/60">Locations</Link>
              <Link href="/blog" className="text-foreground/60">Blog</Link>
              <Link href="/map" className="text-foreground/60">Food Map</Link>
              <Link href="/search" className="text-foreground/60">Search</Link>
              <Link href="/vendors/login" className="text-foreground/60">Vendor Login</Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1">
          <NavigationMenu>
            <NavigationMenuList className="text-foreground">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <span className="font-bold text-xl text-foreground">StreetEats</span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Cuisines</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {cuisines.map((cuisine) => (
                      <ListItem
                        key={cuisine.title}
                        title={cuisine.title}
                        href={cuisine.href}
                      >
                        {cuisine.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Locations</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {locations.map((location) => (
                      <ListItem
                        key={location.title}
                        title={location.title}
                        href={location.href}
                      >
                        {location.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/map" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Food Map
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu className="ml-auto">
            <NavigationMenuList className="text-foreground">
              <NavigationMenuItem>
                <Link href="/search" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Search
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/vendors/login" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Vendor Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Logo (centered) */}
        <div className="flex-1 lg:hidden text-center">
          <Link href="/" className="font-bold text-xl text-foreground">
            StreetEats
          </Link>
        </div>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link> & {
    title: string;
    children: React.ReactNode;
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="list-none">
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:text-accent-foreground text-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-foreground">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"