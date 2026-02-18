import { getGradeData } from "@/lib/content-service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Book, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function StreamPage({
    params,
}: {
    params: Promise<{ grade: string; stream: string }>;
}) {
    const { grade, stream } = await params;

    const streamMap: { [key: string]: string } = {
        physical: "Physical Science",
        bio: "Biological Science",
        commerce: "Commerce",
        arts: "Arts",
        tech: "Technology",
    };

    const streamName = streamMap[stream];

    if (!streamName) {
        notFound();
    }

    // In a real app, we'd filter subjects by stream. 
    // For now, we'll fetch the grade data and filtering logic would go here.
    // Since our mock data doesn't explicitly link subjects to streams yet (except in name/context),
    // we will display all subjects for now, or filter if subject.streams includes this stream.

    // We need to update content-service to support filtering by stream properly, 
    // or just show relevant subjects. For this iteration, let's show all subjects 
    // but looking forward to `streams` field in Subject interface.

    const data = await getGradeData(grade);

    if (!data) {
        notFound();
    }

    // Mock filtering based on common subjects + stream specific
    // In production, `Subject` interface has `streams` array.
    const relevantSubjects = data.subjects.filter(subject => {
        if (!subject.streams) return true; // Show if no specific stream restriction (e.g. English)
        return subject.streams.includes(stream);
    });

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <Link href={`/library/${grade}`} className="text-sm text-slate-500 hover:text-primary mb-4 block flex items-center gap-1">
                    <ChevronLeft className="h-4 w-4" /> Back to Streams
                </Link>
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                        {grade.replace("grade-", "")}
                    </div>
                    <h1 className="text-3xl font-bold">{streamName} Stream</h1>
                </div>
                <p className="text-slate-500 text-lg">Subjects for Grade {grade.replace("grade-", "")} {streamName}</p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relevantSubjects.map((subject) => (
                    <Link
                        key={subject.id}
                        // Link to the standard subject page
                        href={`/library/${grade}/${subject.id}`}
                        className="group"
                    >
                        <Card className="hover:shadow-md transition-all border-slate-200 dark:border-slate-800 h-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-medium group-hover:text-primary transition-colors line-clamp-1">
                                    {subject.name}
                                </CardTitle>
                                <Book className="h-4 w-4 text-slate-400 group-hover:text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-slate-500 mb-4">
                                    {subject.medium.charAt(0).toUpperCase() +
                                        subject.medium.slice(1)}{" "}
                                    Medium
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
            {relevantSubjects.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                    No subjects found for this stream configuration in mock data.
                </div>
            )}
        </div>
    );
}
