import { useState, useEffect } from "react"

const ENV_KEY = "user-environment"
const DEFAULT_ENV = "live"

export function useEnvironment() {
  const [env, setEnv] = useState<"test" | "live">(DEFAULT_ENV)
  const [mounted, setMounted] = useState(false)

  // Only read from localStorage after component mounts on client
  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(ENV_KEY)
    if (stored === "test" || stored === "live") {
      setEnv(stored)
    }
  }, [])

  const toggleEnvironment = () => {
    const newEnv = env === "live" ? "test" : "live"
    setEnv(newEnv)
    localStorage.setItem(ENV_KEY, newEnv)
  }

  const setEnvironment = (newEnv: "test" | "live") => {
    setEnv(newEnv)
    localStorage.setItem(ENV_KEY, newEnv)
  }

  return {
    environment: env,
    toggleEnvironment,
    setEnvironment,
    isLive: env === "live",
    isTest: env === "test",
    mounted
  }
}
