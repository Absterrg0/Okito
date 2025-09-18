"use client";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";

type UploadButtonComponentProps = {
  onComplete: (url: string) => void;
  className?: string;
  label?: string;
};

export default function UploadButtonComponent({ onComplete, className, label }: UploadButtonComponentProps) {
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
            return isUploading ? (label ? `${label}…` : "Uploading…") : (label || "Upload Logo");
          },
        }}
        appearance={{
          button: "crypto-button h-9 px-3",
          container: "",
          allowedContent: "text-xs text-muted-foreground",
        }}
      />
    </div>
  );
}
