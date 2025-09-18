"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {  useState } from "react"
import { toast } from "sonner"
import ApiTokenCreation from "./api-token-component"
import WebhookCreation from "./webhook-component"
import { useSelectedProjectStore } from "@/store/projectStore"
import { useProjectFetchDetails } from "@/hooks/projects/useProjectDetailsFetch"
import Loader from "@/components/ui/loader"
import Environment from "@/components/ui/environment"
import { ModeToggle } from "@/components/ui/theme-toggle"
import { ApiTokenDialog } from "./api-token-dialog"
import ProjectSetup from "./project-setup"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MultiSelect } from "@/components/ui/multi-select"


type AllowedCurrency = "USDC" | "USDT"

export default function UserSettings() {
  const selectedProject = useSelectedProjectStore((s) => s.selectedProject)
  const { data: project, isLoading } = useProjectFetchDetails(selectedProject?.id)

  const [newlyCreatedToken, setNewlyCreatedToken] = useState<string | null>(null)
  const [showTokenDialog, setShowTokenDialog] = useState(false)

  // Preferences/Notifications state (RHS)
  const [selectedCurrencies, setSelectedCurrencies] = useState<AllowedCurrency[]>(["USDC", "USDT"])
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(["payment"]) 
  const [notificationEmails, setNotificationEmails] = useState<string[]>([])
  const [newEmail, setNewEmail] = useState("")

  const currencyOptions = [
    { label: "USDC", value: "USDC" },
    { label: "USDT", value: "USDT" },
  ]

  const notificationOptions = [
    { label: "Payment events", value: "payment" },
    { label: "Webhook failures — Coming soon", value: "webhooks", disabled: true },
    { label: "Security updates — Coming soon", value: "security", disabled: true },
    { label: "Weekly summary — Coming soon", value: "weekly", disabled: true },
  ]

  const handleCurrencyChange = (values: string[]) => {
    if (values.length > 2) {
      toast.info("Select at most 2 currencies")
      values = values.slice(0, 2)
    }
    setSelectedCurrencies(values as AllowedCurrency[])
  }

  const handleNotificationChange = (values: string[]) => {
    const filtered = values.filter((v) => v === "payment")
    if (filtered.length === 0) filtered.push("payment")
    setSelectedNotifications(filtered)
  }

  const addEmail = () => {
    const email = newEmail.trim().toLowerCase()
    if (!email) return
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValid) {
      toast.error("Enter a valid email")
      return
    }
    if (notificationEmails.includes(email)) {
      toast.info("Email already added")
      return
    }
    setNotificationEmails((prev) => [...prev, email])
    setNewEmail("")
    toast.success("Email added")
  }

  const removeEmail = (email: string) => {
    setNotificationEmails((prev) => prev.filter((e) => e !== email))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="space-y-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
            <p className="text-muted-foreground">Select or create a project to manage its settings.</p>
          </div>
          <div className="gap-3 flex items-center">
            <Environment />
            <ModeToggle />
          </div>
        </div>
        <Card className="crypto-glass-static border-0">
          <CardContent className="py-12 text-center text-muted-foreground">No project selected.</CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-start justify-between  mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your project's branding, preferences, notifications, developer settings, and more.
          </p>
        </div>
        <div className="gap-3 flex items-center">
          <Environment />
          <ModeToggle />
        </div>
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Project Setup, API Token, Webhook */}
        <div className="lg:col-span-8 space-y-8">
          <ProjectSetup />

          <div className="grid grid-cols-1 xl:grid-cols-1 gap-8">
            {project && (
              <ApiTokenCreation
                project={project}
                setShowTokenDialog={setShowTokenDialog}
                setNewlyCreatedToken={setNewlyCreatedToken}
              />
            )}
            {project && <WebhookCreation project={project} />}
          </div>
        </div>

        {/* Right column: Preferences & Notifications and Danger Zone */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="crypto-glass-static">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Notifications & Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Currencies */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Accepted Currencies</Label>
                  <Badge variant="outline" className="text-xs">{selectedCurrencies.length}/2</Badge>
                </div>
                <MultiSelect
                  options={currencyOptions}
                  onValueChange={handleCurrencyChange}
                  defaultValue={selectedCurrencies}
                  placeholder="Select currencies"
                  maxCount={2}
                  searchable={false}
                  hideSelectAll
                  className="crypto-base"
                />
                <p className="text-xs text-muted-foreground">
                  Choose up to 2 currencies for payments
                </p>
              </div>

              {/* Notification types */}
              <div className="space-y-3">
                <div>
                <Label className="text-sm font-medium">Event Types</Label>
                </div>
                <MultiSelect
                  options={notificationOptions}
                  onValueChange={handleNotificationChange}
                  defaultValue={selectedNotifications}
                  placeholder="Select notifications"
                  maxCount={3}
                  searchable={false}
                  hideSelectAll
                  className="crypto-base"
                />
              </div>

              {/* Delivery emails */}
              <div className="space-y-3">
                <div>
                <Label htmlFor="new-email" className="text-sm font-medium">Delivery Emails</Label>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="new-email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="crypto-base flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addEmail()}
                  />
                  <Button onClick={addEmail} className="crypto-button">Add</Button>
                </div>
                {notificationEmails.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {notificationEmails.map((email) => (
                      <div key={email} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
                        <span className="text-xs font-medium">{email}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-destructive/20 hover:text-destructive"
                          onClick={() => removeEmail(email)}
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

          <Card className="crypto-glass-static border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg ">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Delete project</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete this project and all associated data.</p>
                  </div>
                  <Button variant="destructive" className="w-full text-white  " onClick={() => toast.info("Project deletion coming soon")}>
                    Delete Project
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ApiTokenDialog open={showTokenDialog} onOpenChange={setShowTokenDialog} token={newlyCreatedToken} />
    </div>
  )
}
