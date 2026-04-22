import React from "react";
import { useTranslations } from "next-intl";

import * as Styles from "@/components/elements/Pagination/Pagination.styles";
import Tooltip from "@/components/ui/tooltip/Tooltip";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onNext,
  onPrev,
}: PaginationProps) {
  const t = useTranslations("Pagination");

  return (
    <Styles.SignpostAssembly>
      <Tooltip text={t("common:pagination.prev")}>
        <Styles.SignpostButton $direction="prev" onClick={onPrev} disabled={currentPage === 1} />
      </Tooltip>

      <Styles.PageIndicator>
        <div>
          {currentPage} <small>/</small> {totalPages}
        </div>
      </Styles.PageIndicator>

      <Tooltip text={t("common:pagination.next")}>
        <Styles.SignpostButton
          $direction="next"
          onClick={onNext}
          disabled={currentPage === totalPages}
        />
      </Tooltip>
    </Styles.SignpostAssembly>
  );
}
