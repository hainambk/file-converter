import { ImageFile, ConversionFormat, downloadImage } from "@/services/imageService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

interface ImagePreviewProps {
  readonly file: ImageFile;
  readonly format: ConversionFormat;
  readonly onRemove: () => void;
  readonly isProcessing?: boolean;
  readonly extraData?: ReactNode;
}

export function ImagePreview({
  file,
  format,
  onRemove,
  isProcessing,
  extraData,
}: Readonly<ImagePreviewProps>) {
  const handleDownload = () => {
    if (file.processed) {
      downloadImage(file.processed, file.name, format);
    }
  };

  let badgeColor = "bg-gray-500";
  let badgeText = "Ready";
  if (isProcessing) {
    badgeColor = "bg-yellow-500";
    badgeText = "Processing";
  } else if (file.processed) {
    badgeColor = "bg-green-500";
    badgeText = "Processed";
  }

  return (
    <Card className="relative gap-4 overflow-hidden pt-0 pb-4">
      <div className="group relative aspect-square">
        <img src={file.preview} alt={file.name} className="h-full w-full object-contain" />
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
        {!isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownload}
              disabled={!file.processed}
            >
              Download
            </Button>
            <Button variant="destructive" size="sm" onClick={onRemove}>
              Remove
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-2 p-2">
        <p className="truncate text-sm font-medium">
          {file.processed ? `${file.name.split(".")[0]}.${format}` : file.name}
        </p>
        <Badge className={badgeColor}>{badgeText}</Badge>
        {extraData}
      </div>
    </Card>
  );
}
