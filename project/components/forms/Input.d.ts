import * as React from "react";

/**
 * Text input with uppercase label and red focus underline.
 * @startingPoint section="Forms" subtitle="Text input" viewport="700x160"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  id?: string;
  hint?: React.ReactNode;
}

export function Input(props: InputProps): JSX.Element;
