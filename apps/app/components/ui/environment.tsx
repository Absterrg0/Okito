'use client'
import { Switch } from "./switch"
import { useEnvironmentStore } from "@/store/environmentStore"

export default function Environment() {
  const { currentEnvironment, toggleEnvironment } = useEnvironmentStore()

  const isTest = currentEnvironment === "test"
  const isLive = currentEnvironment === "live"

  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-cardshadow-sm">
      <span className={`text-sm font-medium transition-colors ${
        isTest ? "text-orange-600 font-semibold" : "text-muted-foreground"
      }`}>
        Test
      </span>
      
      <Switch 
        checked={isLive} 
        onCheckedChange={toggleEnvironment}
        className="data-[state=checked]:bg-green-500  data-[state=unchecked]:bg-red-400"
      />
      
      <span className={`text-sm font-medium transition-colors ${
        isLive ? "text-green-600 font-semibold" : "text-muted-foreground"
      }`}>
        Live
      </span>
    </div>
  )
}