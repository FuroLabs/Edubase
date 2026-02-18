"use client";

import { Resource } from "@/lib/content-service";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import {
    Book,
    FileText,
    Video,
    Download,
    ExternalLink,
    FileQuestion,
    GraduationCap,
    MoreHorizontal,
    PlayCircle
} from "lucide-react";
import Image from "next/image";

interface ResourceCardProps {
    resource: Resource;
}

const TYPE_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    textbook: { label: "Textbook", icon: <Book className="h-4 w-4" />, color: "bg-blue-100 text-blue-700" },
    paper: { label: "Past Paper", icon: <FileQuestion className="h-4 w-4" />, color: "bg-orange-100 text-orange-700" },
    syllabus: { label: "Syllabus", icon: <FileText className="h-4 w-4" />, color: "bg-green-100 text-green-700" },
    "teacher-guide": { label: "Teacher's Guide", icon: <GraduationCap className="h-4 w-4" />, color: "bg-purple-100 text-purple-700" },
    video: { label: "Video", icon: <Video className="h-4 w-4" />, color: "bg-red-100 text-red-700" },
    "model-paper": { label: "Model Paper", icon: <FileQuestion className="h-4 w-4" />, color: "bg-yellow-100 text-yellow-700" },
    other: { label: "Resource", icon: <MoreHorizontal className="h-4 w-4" />, color: "bg-slate-100 text-slate-700" },
};

export function ResourceCard({ resource }: ResourceCardProps) {
    const config = TYPE_CONFIG[resource.type] || TYPE_CONFIG["other"];
    const isVideo = resource.type === "video";

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-800">
            {resource.thumbnailUrl && (
                <div className="relative h-40 w-full bg-slate-100 overflow-hidden">
                    <Image
                        src={resource.thumbnailUrl}
                        alt={resource.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                            <PlayCircle className="h-12 w-12 text-white opacity-90 drop-shadow-lg" />
                        </div>
                    )}
                    {resource.duration && (
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md font-medium">
                            {resource.duration}
                        </div>
                    )}
                </div>
            )}

            <CardHeader className="p-4 pb-2 space-y-2">
                <div className="flex justify-between items-start gap-2">
                    <Badge variant="secondary" className={`font-normal ${config.color} hover:${config.color}`}>
                        <span className="mr-1">{config.icon}</span>
                        {config.label}
                    </Badge>
                    {resource.size && (
                        <span className="text-xs text-slate-400 font-mono mt-1">{resource.size}</span>
                    )}
                </div>
                <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {resource.title}
                </h3>
            </CardHeader>

            <CardContent className="p-4 pt-0 text-sm text-slate-500">
                {resource.author && (
                    <div className="mb-2">By {resource.author}</div>
                )}
                {resource.version && (
                    <div className="text-xs text-slate-400">Version {resource.version}</div>
                )}
            </CardContent>

            <CardFooter className="p-4 pt-0 mt-auto">
                <Button className="w-full" variant={isVideo ? "default" : "outline"} asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        {isVideo ? (
                            <>
                                <PlayCircle className="h-4 w-4 mr-2" /> Watch Now
                            </>
                        ) : (
                            <>
                                <Download className="h-4 w-4 mr-2" /> Download
                            </>
                        )}
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
