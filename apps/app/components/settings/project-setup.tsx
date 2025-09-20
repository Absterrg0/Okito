import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useEffect, useState} from "react"
import { toast } from "sonner"
import UploadButtonComponent from "./upload"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link01Icon, CreditCardIcon } from "@hugeicons/core-free-icons"
import { useSelectedProjectStore } from "@/store/projectStore"
import { useProjectDetailsUpdate } from "@/hooks/projects/useProjectDetailsUpdate"
import { useProjectLogoUpdate } from "@/hooks/projects/useProjectLogoUpdate"
import { useRouter } from "next/navigation"

interface ProjectSetupProps{
  projectName:string;
  logoUrl:string | null
  description:string | null
}

export default function ProjectSetup(props:ProjectSetupProps){
    const [name, setName] = useState(props.projectName)
    const [description, setDescription] = useState(props.description ?? "")
    const selectedProject = useSelectedProjectStore((s) => s.selectedProject)
    const updateMutation = useProjectDetailsUpdate(selectedProject?.id)
    const logoUpdateMutation = useProjectLogoUpdate(selectedProject?.id)
    const router = useRouter();


    const hasChanges = () => {
        return (name ?? "").trim() !== (props.projectName ?? "").trim() ||
               (description ?? "").trim() !== (props.description ?? "").trim()
    }

    const handleSave = () => {
        if (!selectedProject?.id || !hasChanges()) return
        if (!name.trim()) {
            toast.error("Please enter a project name")
            return
        }
        updateMutation.mutate({
            id: selectedProject.id,
            name: name.trim(),
            description: description.trim() || null
        })
    }

    const handleLogoUpload = (url: string) => {
        if (!selectedProject?.id) {
            toast.error("Please select a project to update logo")
            return
        }
        logoUpdateMutation.mutate({
            id: selectedProject.id,
            logoUrl: url
        })
    }



    return (
      <Card className="crypto-glass-static">
            <CardHeader className="">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Project Identity</CardTitle>
                <div className="flex items-start gap-2">
                  <UploadButtonComponent 
                    label={props.logoUrl ? "Update Logo" : "Upload Logo"} 
                    onComplete={(url)=>{handleLogoUpload(url)}}
                    
                    isUpdating={logoUpdateMutation.isPending}
                  />
                  <Button
                    variant="outline"
                    size="lg"
                    className="crypto-button"
                    onClick={() => router.push('/checkout')}
                    title="View billing information"
                  >
                    <HugeiconsIcon icon={CreditCardIcon} className="w-4 h-4 mr-2" />
                    View Billing Page
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="">
              {/* Project Name */}
              <div>
                <Label htmlFor="project-name" className="text-sm font-medium">Project Name</Label>
                <Input
                  id="project-name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  placeholder="Enter your project name"
                  className="crypto-base mt-3"
                />
              </div>

              {/* Description */}
              <div className="mt-6">
                <Label htmlFor="project-description" className="text-sm font-medium">Description</Label>
                <Textarea
                  id="project-description"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}
                  placeholder="Describe your project (optional)"
                  className="crypto-base min-h-[88px] mt-3"
                />
              </div>

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={handleSave}
                  className="crypto-button"
                  disabled={!hasChanges() || updateMutation.isPending}
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>

            </CardContent>
      </Card>
    )
}