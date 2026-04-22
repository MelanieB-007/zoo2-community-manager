"use client";

import React from "react";

import * as Styles from "./Table.styles";

interface TableProps {
  children: React.ReactNode;
}
export default function Table({ children }: TableProps) {
  return (
    <Styles.TableContainer>
      <Styles.DesktopView>
        <Styles.TableFrame>
          <Styles.Table>{children}</Styles.Table>
        </Styles.TableFrame>
      </Styles.DesktopView>
    </Styles.TableContainer>
  );
}
