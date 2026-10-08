"use client";

import {
  Document as PDFDocument,
  Page as PDFPage,
  Text as PDFText,
  View as PDFView,
} from "@react-pdf/renderer";
import { type ComponentProps, type CSSProperties, createContext, useContext } from "react";

export const PDFMode = createContext(true);
const css = (style: unknown): CSSProperties =>
  (Array.isArray(style) ? Object.assign({}, ...style) : style || {}) as CSSProperties;
export function Document(props: ComponentProps<typeof PDFDocument>) {
  return useContext(PDFMode) ? <PDFDocument {...props} /> : <div>{props.children}</div>;
}
export function Page(props: ComponentProps<typeof PDFPage>) {
  return useContext(PDFMode) ? (
    <PDFPage {...props} />
  ) : (
    <div style={css(props.style)}>{props.children}</div>
  );
}
export function View(props: ComponentProps<typeof PDFView>) {
  return useContext(PDFMode) ? (
    <PDFView {...props} />
  ) : (
    <div style={css(props.style)}>{props.children as React.ReactNode}</div>
  );
}
export function Text(props: ComponentProps<typeof PDFText> & { children?: React.ReactNode }) {
  return useContext(PDFMode) ? (
    <PDFText {...props} />
  ) : (
    <span style={{ display: "block", ...css(props.style) }}>
      {props.children as React.ReactNode}
    </span>
  );
}
