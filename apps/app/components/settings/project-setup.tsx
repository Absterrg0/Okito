import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Badge } from "../ui/badge"
import { useMemo, useState, useRef } from "react"
import { toast } from "sonner"
import UploadButtonComponent from "./upload"

export default function ProjectSetup(){
    const [projectName, setProjectName] = useState("")
    const [logoPreview, setLogoPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [lastNameChangeAt, setLastNameChangeAt] = useState<Date | null>(null) 

    const canChangeName = useMemo(() => {
        if (!lastNameChangeAt) return true
        const diff = Date.now() - lastNameChangeAt.getTime()
        const days15 = 15 * 24 * 60 * 60 * 1000
        return diff >= days15
    }, [lastNameChangeAt])

    const handleNameSave = () => {
        if (!canChangeName) {
            toast.info("Project name can only be changed once every 15 days")
            return
        }
        if (!projectName.trim()) {
            toast.error("Please enter a project name")
            return
        }
        setLastNameChangeAt(new Date())
        toast.success("Project name updated (mock)")
    }



    return (
      <Card className="crypto-glass-static">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Project Identity</CardTitle>
                {!canChangeName && (
                  <Badge variant="secondary" className="text-xs">
                    🔒 15-day cooldown
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Name */}
              <div >
                <Label htmlFor="project-name" className="text-sm font-medium pb-4">Project Name</Label>
                <div className="flex items-center gap-3 mt-3">
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter your project name"
                    className="crypto-base flex-1"
                    disabled={!canChangeName}
                  />
                  <Button 
                    onClick={handleNameSave} 
                    className="crypto-button shrink-0"
                    disabled={!canChangeName || !projectName.trim()}
                  >
                    Save
                  </Button>
                </div>
              </div>

              {/* Logo Section */}
              <div className="space-y-3">
                <div className="flex items-start gap-6">
                    <div className="h-fit">
                      <UploadButtonComponent onComplete={(url) => setLogoPreview(url)} />
                    </div>
                  <div className="flex-1 space-y-3">
                   
                    <div className="flex gap-2">
                 
                      {logoPreview && (
                        <Button 
                          variant="outline" 
                          className="crypto-button bg-transparent hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30" 
                          size="sm" 
                          onClick={() => setLogoPreview(null)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      PNG or SVG format. Maximum 1MB. Recommended size: 256×256 pixels.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
      </Card>
    )
}