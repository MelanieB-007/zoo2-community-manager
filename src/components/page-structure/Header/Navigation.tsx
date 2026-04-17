"use client";

import { IoChevronDown } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { usePathname } from "@/i18n/routing";

import * as Styles from "./Navigation.styles";
import { navConfig } from "@/config/navigationData";

export default function Navigation() {
  const t = useTranslations("Header.Navigation");
  const { data: session } = useSession();
  const pathname = usePathname();

  // Prüft, ob ein Hauptmenüpunkt (oder eines seiner Untermenüs) aktiv ist
  const checkActive = (item: any) => {
    if (item.href) return pathname === item.href;
    if (item.basePath) return pathname.startsWith(item.basePath);
    return false;
  };

  return (
    <Styles.NavContainer>
      <Styles.NavList>
        {navConfig.map((item) => {
          // Auth-Check für Hauptpunkt
          if (item.requiresAuth && !session) return null;

          return (
            <Styles.NavItem key={item.id}>
              {item.href && !item.subMenu ? (
                // Fall A: Einfacher Link
                <Styles.NavLink href={item.href} $active={pathname === item.href}>
                  {t(item.labelKey)}
                </Styles.NavLink>
              ) : (
                // Fall B: Dropdown
                <>
                  <Styles.NavButton $active={checkActive(item)}>
                    {t(item.labelKey)} <IoChevronDown className="arrow" />
                  </Styles.NavButton>
                  <Styles.Dropdown>
                    {item.subMenu?.map((sub) => {
                      // Auth-Check für Untermenü-Punkte
                      if (sub.requiresAuth && !session) return null;

                      return (
                        <li key={sub.href}>
                          <Styles.DropdownLink href={sub.href} $active={pathname === sub.href}>
                            {t(sub.labelKey)}
                          </Styles.DropdownLink>
                        </li>
                      );
                    })}
                  </Styles.Dropdown>
                </>
              )}
            </Styles.NavItem>
          );
        })}
      </Styles.NavList>
    </Styles.NavContainer>
  );
}
