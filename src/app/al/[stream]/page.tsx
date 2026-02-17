
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRegistry } from "@/lib/content-service";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ALGradePage({
    params,
}: {
    params: Promise<{ stream: string }>;
}) {
    const { stream } = await params;
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

    const grades = [12, 13];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link href="/al" className="text-sm text-slate-500 hover:text-primary mb-4 block flex items-center gap-1">
                    <ChevronLeft className="h-4 w-4" /> Back to Streams
                </Link>
                <h1 className="text-3xl font-bold mb-2">{streamName}</h1>
                <p className="text-slate-500">Select your grade to view subjects.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                {grades.map((grade) => (
                    <Link key={grade} href={`/al/${stream}/${grade}`} className="group">
                        <Card className="h-full hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 cursor-pointer group-hover:border-primary/50">
                            <CardHeader className="text-center pb-6 pt-8">
                                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                                    <GraduationCap className="h-8 w-8 text-primary" />
                                </div>
                                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                                    Grade {grade}
                                </CardTitle>
                                <p className="text-slate-500 mt-2">View Subjects & Resources</p>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
