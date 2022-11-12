import React from "react"

type FieldErrorProps = {
  msg?: any
}

export function FieldError({ msg }: FieldErrorProps) {
  if (msg == null) return null

  return <p className="text-red-500">{msg}</p>
}
