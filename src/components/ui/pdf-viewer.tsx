"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface PDFViewerProps {
    url: string;
    title?: string;
}

export function PDFViewer({ url, title }: PDFViewerProps) {
    // Use Google Docs Viewer for reliable PDF embedding
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
        url
    )}&embedded=true`;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0">
                <div className="p-4 border-b">
                    <h2 className="font-semibold text-lg">{title || "Document Preview"}</h2>
                </div>
                <div className="flex-1 bg-slate-100 dark:bg-slate-900 relative">
                    <iframe
                        src={viewerUrl}
                        className="w-full h-full border-none"
                        title={title || "PDF Preview"}
                        loading="lazy"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
