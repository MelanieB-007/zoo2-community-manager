"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import * as Styles from "./Footer.styles";

export default function Footer() {
  const t = useTranslations();

  return (
    <Styles.StyledFooter>
      <Styles.FooterContent>
        <p>
          © 2026 - Klub der tollen Tiere | <Link href="/imprint">{t("Footer.imprint")}</Link>
        </p>
      </Styles.FooterContent>
    </Styles.StyledFooter>
  );
}
