"use client";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";

type UploadButtonComponentProps = {
  onComplete: (url: string) => void;
  className?: string;
  label?: string;
  isUpdating?: boolean;
};

export default function UploadButtonComponent({ onComplete, className, label, isUpdating = false }: UploadButtonComponentProps) {
  return (
    <div className={className}>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          const url = res?.[0]?.url;
          if (url) {
            onComplete(url);
            toast.success("Logo uploaded");
          } else {
            toast.error("Upload completed but no file URL returned");
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message || "Upload failed");
        }}
        content={{
          button({ isUploading }) {
            const isLoading = isUploading || isUpdating;
            return (
              <div className="flex items-center gap-2">
                {isLoading && <Loader size={0.2} className="w-4 h-4" />}
                {isLoading ? "": (label || "Upload Logo")}
              </div>
            );
          },
        }}
        appearance={{
          button: "crypto-button  h-9 px-3",
          container: "",
          allowedContent: "text-xs text-muted-foreground",
        }}
      />
    </div>
  );
}
