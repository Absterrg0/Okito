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
import NotificationAndPreferences from "./notifications-and-preferences"


export default function UserSettings() {
  const selectedProject = useSelectedProjectStore((s) => s.selectedProject)
  const { data: project, isLoading } = useProjectFetchDetails(selectedProject?.id!)
  const [newlyCreatedToken, setNewlyCreatedToken] = useState<string | null>(null)
  const [showTokenDialog, setShowTokenDialog] = useState(false)
  
  if (isLoading || !project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
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
          <ProjectSetup
          projectName={project.name} 
          logoUrl={project.logoUrl}
          description={project.description}
          />

          <div className="grid grid-cols-1 xl:grid-cols-1 gap-8">
            <ApiTokenCreation
              project={project}
              setShowTokenDialog={setShowTokenDialog}
              setNewlyCreatedToken={setNewlyCreatedToken}
            />
            <WebhookCreation project={project} />
          </div>
        </div>

        {/* Right column: Preferences & Notifications and Danger Zone */}
        <div className="lg:col-span-4 space-y-8">
            <NotificationAndPreferences
            currencies = {project.acceptedCurrencies}
            notificationEmails={project.notificationEmails}

            ></NotificationAndPreferences>

          <Card className="crypto-base border-0">
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
