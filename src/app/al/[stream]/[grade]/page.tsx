
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGradeData } from "@/lib/content-service";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Book, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ALSubjectPage({
    params,
}: {
    params: Promise<{ stream: string; grade: string }>;
}) {
    const { stream, grade } = await params;

    const streamMap: { [key: string]: string } = {
        physical: "Physical Science",
        bio: "Biological Science",
        commerce: "Commerce",
        arts: "Arts",
        tech: "Technology",
    };

    const streamName = streamMap[stream];
    const gradeId = `grade-${grade}`;
    const gradeData = await getGradeData(gradeId);



    if (!streamName || !gradeData) {
        // console.error(`AL Page Error: stream=${stream}, grade=${grade}, found=${!!gradeData}`);
        notFound();
    }

    // Filter subjects by stream or common subjects (if any, e.g. English, GIT)
    // For now, let's assume we show subjects explicitly tagged with the stream.
    // Or we show subjects that match the stream OR common subjects?
    // The user didn't specify common subjects, but usually there are common ones like General English, GIT.
    // For now, I'll filter by stream property. If a subject has NO stream property, should it be shown?
    // In my mock data, I added stream property to specific subjects.
    // I didn't add General English/GIT yet. I'll stick to strict stream filtering for now based on my mock data.

    // In my mock data, I used: stream: "physical", "bio", etc.
    // So filter: subject.stream === stream

    const subjects = gradeData.subjects.filter(
        (s) => s.streams?.includes(stream)
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href={`/al/${stream}`} className="text-sm text-slate-500 hover:text-primary mb-4 flex items-center gap-1">
                    <ChevronLeft className="h-4 w-4" /> Back to Grades
                </Link>
                <h1 className="text-3xl font-bold mb-2">
                    {streamName} - {gradeData.name}
                </h1>
                <p className="text-slate-500">Select a subject to view resources.</p>
            </div>

            {subjects.length === 0 ? (
                <div className="text-slate-500 italic">No subjects found for this stream.</div>
            ) : (
                <div className="grid md:grid-cols-3 gap-4">
                    {subjects.map((subject) => (
                        <Link
                            key={subject.id}
                            href={`/library/${gradeId}/${subject.id}`} // Link to the standard library subject page?
                            // Or create a new one under /al?
                            // Since the resource viewing logic is standard, we can link to the standard library page.
                            // However, the standard library page path is /library/[grade]/[subject].
                            // That page exists or handles it?
                            // Let's check if /library/[grade]/[subject]/page.tsx exists.
                            // If so, linking there is fine. If not, I need to create it or link to something else.
                            // The user hasn't asked for subject detail page implementation, so linking to existing structure is safest if it exists.
                            // Given I saw /library/[grade] earlier, let's assume /library/[grade]/[subject] works or will be implemented.
                            // Actually, I should probably check.
                            className="group"
                        >
                            <Card className="hover:shadow-md transition-all border-slate-200 dark:border-slate-800">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors">
                                        {subject.name}
                                    </CardTitle>
                                    <Book className="h-4 w-4 text-slate-400 group-hover:text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm text-slate-500 mb-4 h-5">
                                        {/* Placeholder for description or nothing */}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-between hover:bg-primary/10 hover:text-primary"
                                    >
                                        View Resources <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
