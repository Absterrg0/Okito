import { CardContent, CardHeader } from "../ui/card"
import { CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Badge } from "../ui/badge"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { useState, useEffect } from "react"
import { useSelectedProjectStore } from "@/store/projectStore"
import { useProjectCurrencyUpdate } from "@/hooks/projects/useProjectCurrencyUpdate"
import { useNotificationMutation } from "@/hooks/projects/useNotificationMutation"
import {z} from 'zod'
import { toast } from "sonner"



type AllowedCurrency = "USDC" | "USDT"


interface NotificationAndPreferencesProps{
    currencies:AllowedCurrency[],
    notificationEmails:string[]
}

export default function NotificationAndPreferences(props:NotificationAndPreferencesProps){

    const [selectedCurrencies, setSelectedCurrencies] = useState<AllowedCurrency[]>(props.currencies)
    const [newEmail, setNewEmail] = useState("") 
    const selectedProject = useSelectedProjectStore((s) => s.selectedProject)
    const updateCurrencyMutation = useProjectCurrencyUpdate(selectedProject?.id)
    const updateNotificationMutation = useNotificationMutation(selectedProject?.id)

    // Derived email error (no local state)
    const emailSchema = z.string().email("Please enter a valid email address")
    const normalizedEmail = newEmail.trim().toLowerCase()
    const emailResult = normalizedEmail
      ? emailSchema.safeParse(normalizedEmail)
      : null
    const emailError = normalizedEmail
      ? (!emailResult!.success
          ? emailResult!.error.issues[0].message
          : props.notificationEmails.includes(normalizedEmail)
            ? "This email is already added"
            : "")
      : ""

    const handleCurrencyToggle = (currency: AllowedCurrency) => {
      setSelectedCurrencies(prev => {
        const isSelected = prev.includes(currency)

        if (isSelected) {
          if (prev.length === 1) {
            return prev
          }
          return prev.filter(c => c !== currency)
        } else {
          if (prev.length >= 2) {
            return prev
          }
          return [...prev, currency]
        }
      })
    }

    const addEmail = () => {
      if (!normalizedEmail || emailError) return

      if (!selectedProject?.id) return

      const updatedEmails = [...props.notificationEmails, normalizedEmail]
      updateNotificationMutation.mutate({
        id: selectedProject.id,
        notificationEmails: updatedEmails
      })
      setNewEmail("")
    }

    const removeEmail = (email: string) => {
      if (!selectedProject?.id) return
      
      const updatedEmails = props.notificationEmails.filter(e => e !== email)
      updateNotificationMutation.mutate({
        id: selectedProject.id,
        notificationEmails: updatedEmails
      })
    }

    const hasCurrencyChanges = () => {
      return JSON.stringify(selectedCurrencies.sort()) !== JSON.stringify(props.currencies.sort())
    }

    const handleSaveCurrencies = () => {
      if (!selectedProject?.id || !hasCurrencyChanges()) return
      
      updateCurrencyMutation.mutate({
        id: selectedProject.id,
        acceptedCurrencies: selectedCurrencies
      })
    }


    return (
      <TooltipProvider>
        <Card className="crypto-base">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Notifications & Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Currencies */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium">Accepted Currencies</Label>
                  {selectedCurrencies.length === 1 && (
                    <span className="text-xs text-muted-foreground">(minimum 1 required)</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {hasCurrencyChanges() && (
                    <Button 
                      onClick={handleSaveCurrencies}
                      disabled={updateCurrencyMutation.isPending}
                      className="crypto-button text-xs px-3 py-1 h-auto"
                    >
                      {updateCurrencyMutation.isPending ? "Saving..." : "Save"}
                    </Button>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="text-xs cursor-help hover:bg-muted/50 transition-colors">
                        {selectedCurrencies.length}/2
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-background">Select 1-2 currencies for payments.<br/>At least one currency is required.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              
         

              <div className="grid grid-cols-2 gap-4">
                {(['USDC','USDT'] as AllowedCurrency[]).map((currency) => {
                  const isSelected = selectedCurrencies.includes(currency)
                  const isDisabled = !isSelected && selectedCurrencies.length >= 2
                  const isLastSelected = isSelected && selectedCurrencies.length === 1
                  
                  return (
                    <div 
                      key={currency} 
                      className={`flex items-center space-x-3 p-3 rounded-lg crypto-glass-static transition-all ${
                        isSelected 
                          ? 'bg-primary/5 border-primary/20' 
                          : isDisabled 
                            ? 'bg-muted/30 border-muted/50' 
                            : 'bg-background border-border hover:border-primary/30'
                      }`}
                    >
                      <Checkbox
                        id={currency}
                        checked={isSelected}
                        onCheckedChange={() => handleCurrencyToggle(currency)}
                        disabled={isDisabled}
                        className="crypto-checkbox"
                      />
                      <div className="flex-1">
                        <Label 
                          htmlFor={currency} 
                          className={`text-sm font-medium cursor-pointer ${
                            isDisabled ? 'text-muted-foreground cursor-not-allowed' : 
                            isLastSelected ? 'text-muted-foreground' : 'text-foreground'
                          }`}
                        >
                          {currency}
                        </Label>
                   
                   
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Delivery emails */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="new-email" className="text-sm font-medium">Delivery Emails</Label>
                {emailError && (
                  <span className="text-xs text-destructive">({emailError})</span>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  id="new-email"
                  value={newEmail}
                  onChange={(e) => { setNewEmail(e.target.value) }}
                  placeholder="email@example.com"
                  className="crypto-base flex-1"
                  type="email"
                  onKeyPress={(e) => e.key === 'Enter' && addEmail()}
                />
                <Button 
                  onClick={addEmail} 
                  disabled={updateNotificationMutation.isPending}
                  className="crypto-button"
                >
                    Add
                     </Button>
              </div>
              
              {props.notificationEmails.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {props.notificationEmails.map((email) => (
                    <div key={email} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 crypto-glass-static">
                      <span className="text-xs font-medium">{email}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-destructive/20 hover:text-destructive"
                        onClick={() => removeEmail(email)}
                        disabled={updateNotificationMutation.isPending}
                        aria-label={`Remove ${email}`}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
    )
}