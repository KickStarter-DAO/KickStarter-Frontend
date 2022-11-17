import { useState, useEffect } from "react"

export function useCountdown(start: number) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    const handle = setInterval(() => {
      setCount(n => n + 1)
    }, 1000)

    return () => { clearInterval(handle) }
  }, [])

  return count
}
