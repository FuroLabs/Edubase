import { getRegistry } from "@/lib/content-service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default async function ExamTypePage({
    params,
}: {
    params: Promise<{ type: string }>;
}) {
    const { type } = await params;
    const registry = await getRegistry();

    if (!registry) return <div>Failed to load data</div>;

    // Filter exams by type
    const exams = registry.exams.filter((e) => e.type === type);

    if (exams.length === 0) {
        // If no exams found, check if type is valid at all.
        // For now, minimal error handling.
        return <div className="container py-8">No exams found for this category.</div>
    }

    // Deduplicate years if multiple entries exist (though usually one entry per year per type)
    // Sort years descending
    const years = Array.from(new Set(exams.map((e) => e.year))).sort((a, b) => b - a);

    const typeName = type.toUpperCase().replace("-", " "); // e.g. "OL" -> "OL" or "TERM-1" -> "TERM 1"

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{typeName} Exams</h1>
            <p className="text-slate-500 mb-8">Select a year to view papers.</p>

            <div className="grid md:grid-cols-4 gap-4">
                {years.map((year) => (
                    <Link key={year} href={`/exams/${type}/${year}`}>
                        <Card className="hover:shadow-md transition-all text-center">
                            <CardHeader>
                                <CardTitle className="flex justify-center items-center gap-2">
                                    <Calendar className="h-5 w-5 text-slate-400" />
                                    {year}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
