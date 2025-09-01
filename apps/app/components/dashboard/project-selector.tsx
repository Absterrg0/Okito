'use client'
import { useState, useEffect } from "react"
import { ChevronDown, Building2, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"
import { useCreateProjectMutation } from "@/hooks/projects/useProjectMutation"
import { useProjectsQuery } from "@/hooks/projects/useProjectQuery"
import { useSelectedProjectStore } from "@/store/projectStore"

interface Project {
  id: string
  name: string
}

export default function ProjectSelector() {
  const [newProjectName, setNewProjectName] = useState('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const {mutate:createProject,isPending:isCreating}= useCreateProjectMutation();
  const {data:projects,isLoading} = useProjectsQuery();
  const selectedProject = useSelectedProjectStore(s=>s.selectedProject);
  const setSelectedProject = useSelectedProjectStore(s=>s.setSelectedProject);

  useEffect(() => {
    if (projects && projects.length > 0) {
      if (!selectedProject) {
        setSelectedProject(projects[0])
      } else {
        const projectExists = projects.find(p => p.id === selectedProject.id)
        if (!projectExists) {
          setSelectedProject(projects[0])
        }
      }
    }
  }, [projects, setSelectedProject]) // Removed selectedProject from dependencies

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
    // Here you can integrate with your Zustand store
    // Example: useProjectStore.getState().setSelectedProject(project)
  }

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      toast.error("Please enter a project name")
      return
    }
    
    createProject(newProjectName, {
      onSuccess: (data) => {
        toast.success(`Project ${newProjectName} created successfully!`)
        setSelectedProject(data.project)
        closeCreatePopover() // Close popover after successful creation
      },
    })
  }


  const closeCreatePopover = () => {
    setIsCreateOpen(false)
    setNewProjectName('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isCreating) {
      handleCreateProject()
    }
    if (e.key === 'Escape') {
      closeCreatePopover()
    }
  }

  if (isLoading) {
    return (
      <div className="w-full p-3">
        <div className="h-10 crypto-glass animate-pulse rounded-lg"></div>
      </div>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full p-3">
        <div className="h-10 crypto-glass rounded-lg flex items-center justify-center text-sm text-muted-foreground">
          No projects found
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-3">
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="flex-1 justify-between h-10 crypto-glass-static border-0 hover:bg-white/5"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate">
                  {selectedProject?.name || 'Select Project'}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="w-56 max-h-60 overflow-y-auto crypto-base border-0" 
            align="start"
            side="bottom"
          >
            {projects?.map((project) => (
              <DropdownMenuItem
                key={project.id}
                onClick={() => handleProjectSelect(project)}
                className={`cursor-pointer ${
                  selectedProject?.id === project.id 
                    ? 'bg-primary/20 text-primary' 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className="flex flex-col items-start w-full">
                  <span className="font-medium text-sm">{project.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 crypto-glass border-0 hover:bg-white/5"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-80 p-0 crypto-base bg-neutral-100 border-0" 
            align="end"
            side="bottom"
          >
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Create New Project</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeCreatePopover}
                  className="h-6 w-6 hover:bg-white/5"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Input
                  placeholder="Enter project name..."
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="crypto-input border-0 bg-white/5 focus:bg-white/10"
                  autoFocus
                />
                
                <div className="flex gap-2 justify-end pt-2">
           
                  <Button
                    size="sm"
                    onClick={handleCreateProject}
                    disabled={!newProjectName.trim() || isCreating}
                    className="crypto-input border-0 hover:bg-white/5"
                  >
                    {isCreating ? 'Creating...' : 'Create'}
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}