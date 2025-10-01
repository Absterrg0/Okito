'use client'
import { useState} from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { HugeiconsIcon } from "@hugeicons/react"
import { CityIcon, ArrowRight01Icon, RefreshIcon } from "@hugeicons/core-free-icons"
import { toast } from "sonner"
import {useCreateProjectMutation} from "@/hooks/projects/useProjectMutation"
import { generateRandomName } from "@/lib/helpers"
import Loader from "@/components/ui/loader"

export default function OnboardingPage() {
  const router = useRouter()
  const [projectName, setProjectName] = useState("Untitled 1") 
  const {mutate: createProject, isPending: isCreating} = useCreateProjectMutation()

  const handleGenerateNewName = () => {
    setProjectName(generateRandomName())
  }

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      toast.error("Please enter a project name")
      return
    }
    
    createProject({name:projectName}, {
      onSuccess: () => {
         router.push('/dashboard/overview')
      },
      onError: () => {
        toast.error("Failed to create project. Please try again.")
      }
    })
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" aria-hidden="true" />
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary/3 to-secondary/3 rounded-full blur-3xl animate-float z-1" aria-hidden="true" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-secondary/3 to-accent/3 rounded-full blur-3xl animate-float z-1" style={{ animationDelay: '3s' }} aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="p-2 mb-4 text-xs">
              Welcome to Okito
            </div>            
            
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              Create Your Project
            </h1>
            
            <p className="text-muted-foreground">
              Give your project a name and select your environment.
            </p>
          </div>

          {/* Main Card */}
          <Card className="crypto-glass-static border-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 opacity-50" aria-hidden="true" />
            
            <CardHeader className="text-center pb-6 relative z-10">
              <CardTitle className="text-xl font-bold mb-2 text-foreground">
                Project Details
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Give your project a name to get started
              </p>
            </CardHeader>

            <CardContent className="pb-8 relative z-10">
              <div className="space-y-6">
                {/* Project Name Input */}
                <div className="space-y-3">
                  <Label htmlFor="projectName" className="text-sm font-medium text-foreground mb-3 block ">
                    Project Name
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="projectName"
                      placeholder="Please enter a project name..."
                      type="text"
                      value={projectName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
                      className="crypto-glass-static border-0"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleGenerateNewName}
                      className="crypto-glass border-0"
                    >
                      <HugeiconsIcon icon={RefreshIcon}  className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Click the refresh button to generate a new name
                  </p>
                </div>

                {/* Create Button */}
                <Button 
                  onClick={handleCreateProject}
                  disabled={isCreating || !projectName.trim()}
                  className="w-full crypto-glass cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  {isCreating ? (
                    <div className="flex gap-2 text-foreground items-center justify-center">
                      <Loader size={0.2} color="#FFFFFF" />
                      Creating Project
                    </div>
                  ) : (
                    <div className="flex items-center text-foreground">
                      <HugeiconsIcon icon={CityIcon} className="w-4 h-4 mr-2" aria-hidden="true" />
                      Create Project
                      <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 ml-2" aria-hidden="true" />
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}