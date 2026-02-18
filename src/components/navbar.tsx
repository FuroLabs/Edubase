import Link from "next/link";
import { SearchPalette } from "@/components/search-palette";
import { GraduationCap } from "lucide-react";
import { getRegistry } from "@/lib/content-service";

export async function Navbar() {
    const registry = await getRegistry();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/75 dark:bg-slate-950/75 backdrop-blur">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <span>EduBase</span>
                </Link>

                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link
                            href="/#grades"
                            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                        >
                            Grades
                        </Link>
                        <Link
                            href="/exams/ol"
                            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                        >
                            O/L
                        </Link>
                        <Link
                            href="/#al"
                            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                        >
                            A/L
                        </Link>
                    </nav>
                    <div className="w-full max-w-sm">
                        <SearchPalette registry={registry} />
                    </div>
                </div>
            </div>
        </header>
    );
}
