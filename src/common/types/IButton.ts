import { ButtonHTMLAttributes } from "react"

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "dark" | "dark-bold" | "light" | "light-bold" | "underline-white"
  active?: boolean
  classNames?: string[]
}