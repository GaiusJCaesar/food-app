"use client";
import Navigation from "@/components/ui/navigation";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "@/components/ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "@/components/logos/food-logo";

import { ReactNode } from "react";
import { appConfigs, authHrefs, pageHrefs } from "@/constants/pageConfigs";
import { Link, Title } from "./ui/text";
import { useAuth } from "@/hooks/auth-hooks";
import { usePathname } from "next/navigation";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
}

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const props: NavbarProps = {
    logo: <Logo size="md" />,
    name: appConfigs.title,
    homeUrl: pageHrefs.home.href,
    mobileLinks: isAuthenticated
      ? [
          authHrefs["home"],
          authHrefs["menu"],
          authHrefs["plan"],
          authHrefs["lists"],
          authHrefs["settings"],
        ]
      : [pageHrefs["signup"], pageHrefs["learnMore"]],
    actions: isAuthenticated
      ? [
          {
            ...authHrefs["home"],
            isButton: true,
            variant: "default",
          },
        ]
      : [
          {
            ...pageHrefs["login"],
            isButton: false,
          },
          {
            ...pageHrefs["signup"],
            isButton: true,
            variant: "default",
          },
        ],
    showNavigation: true,
  };

  return (
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      <div className="fade-bottom bg-background/15 absolute left-0 h-20 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          <NavbarLeft>
            <a
              href={props.homeUrl}
              className="flex items-center gap-2 text-xl font-bold"
            >
              {props.logo}
              <Title color="highlight" variant="h4" className="happy-monkey">
                {props.name}
              </Title>
            </a>
            {props.showNavigation &&
              (props.customNavigation || (
                <Navigation
                  menuItems={
                    isAuthenticated
                      ? [
                          {
                            ...authHrefs["menu"],
                            title: authHrefs["menu"].text,
                            isLink: true,
                          },
                          {
                            ...authHrefs["plan"],
                            title: authHrefs["plan"].text,
                            isLink: true,
                          },
                          {
                            ...authHrefs["lists"],
                            title: authHrefs["lists"].text,
                            isLink: true,
                          },
                        ]
                      : undefined
                  }
                />
              ))}
          </NavbarLeft>
          <NavbarRight>
            {props.actions &&
              props.actions.map((action, index) =>
                action.isButton ? (
                  <Button
                    key={index}
                    variant={action.variant || "default"}
                    asChild
                  >
                    <a href={action.href}>
                      {action.icon}
                      {action.text}
                      {action.iconRight}
                    </a>
                  </Button>
                ) : (
                  <a
                    key={index}
                    href={action.href}
                    className="hidden text-sm md:block"
                  >
                    {action.text}
                  </a>
                )
              )}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href={props.homeUrl}
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    {props.logo}
                    <Title
                      color="highlight"
                      variant="h4"
                      className="happy-monkey"
                    >
                      {props.name}
                    </Title>
                  </a>
                  {props.mobileLinks &&
                    props.mobileLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        isSelected={link.href === pathname}
                        variant="menuItem"
                      >
                        {link.text}
                      </Link>
                    ))}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
