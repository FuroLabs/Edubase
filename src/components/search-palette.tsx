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
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchPalette() {
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
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Grades">
                        {Array.from({ length: 8 }, (_, i) => i + 6).map((grade) => (
                            <CommandItem
                                key={grade}
                                onSelect={() => runCommand(() => router.push(`/library/grade-${grade}`))}
                            >
                                Grade {grade}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandGroup heading="Exams">
                        <CommandItem onSelect={() => runCommand(() => router.push("/exams/ol"))}>
                            Ordinary Level (O/L)
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/exams/al"))}>
                            Advanced Level (A/L)
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/exams/schol"))}>
                            Grade 5 Scholarship
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
