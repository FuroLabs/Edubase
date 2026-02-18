"use client";

import * as React from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Search, Book, FileText, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { Registry } from "@/lib/content-service";

interface SearchPaletteProps {
    registry: Registry | null;
}

export function SearchPalette({ registry }: SearchPaletteProps) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    if (!registry) return null;

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground border rounded-md px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-white/50 backdrop-blur-sm dark:bg-slate-950/50 w-full md:w-auto justify-between"
            >
                <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Search resources...</span>
                    <span className="sm:hidden">Search...</span>
                </div>
                <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type to search grades, subjects, or resources..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Grades">
                        {registry.grades.map((grade) => (
                            <CommandItem
                                key={grade.id}
                                value={grade.name}
                                onSelect={() => runCommand(() => router.push(`/library/${grade.id}`))}
                            >
                                <GraduationCap className="mr-2 h-4 w-4" />
                                {grade.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading="Subjects">
                        {registry.grades.flatMap(grade =>
                            grade.subjects.map(subject => ({
                                ...subject,
                                gradeId: grade.id,
                                gradeName: grade.name
                            }))
                        ).map((subject, idx) => (
                            <CommandItem
                                key={`${subject.gradeId}-${subject.id}-${idx}`}
                                value={`${subject.name} ${subject.gradeName} ${subject.medium}`}
                                onSelect={() => runCommand(() => router.push(`/library/${subject.gradeId}/${subject.id}`))}
                            >
                                <Book className="mr-2 h-4 w-4" />
                                {subject.name} ({subject.gradeName}) - {subject.medium}
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading="Resources">
                        {registry.grades.flatMap(grade =>
                            grade.subjects.flatMap(subject =>
                                subject.resources.map(resource => ({
                                    ...resource,
                                    gradeId: grade.id,
                                    subjectId: subject.id,
                                    subjectName: subject.name,
                                    gradeName: grade.name
                                }))
                            )
                        ).map((resource, idx) => (
                            <CommandItem
                                key={`${resource.id}-${idx}`}
                                value={`${resource.title} ${resource.subjectName} ${resource.gradeName}`}
                                onSelect={() => runCommand(() => window.open(resource.url, '_blank'))}
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                {resource.title}
                                <span className="ml-2 text-xs text-muted-foreground">
                                    {resource.subjectName} • {resource.gradeName}
                                </span>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading="Exams">
                        {registry.exams.map((exam) => (
                            <CommandItem
                                key={exam.id}
                                value={`${exam.type.toUpperCase()} ${exam.year}`}
                                onSelect={() => runCommand(() => router.push(`/exams/${exam.type}/${exam.year}`))}
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                {exam.type.toUpperCase()} - {exam.year}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
