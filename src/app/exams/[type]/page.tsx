import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Medal, ArrowRight, Sparkles } from "lucide-react";

export default async function ExamPage({
    params,
}: {
    params: Promise<{ type: string }>;
}) {
    const { type } = await params;

    // Define data directly in component for simplicity if external file isn't needed yet
    const EXAM_DATA = {
        schol: {
            title: "Grade 5 Scholarship",
            description: "Past papers and model papers for the Grade 5 Scholarship Examination.",
            icon: Medal,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            grades: [5],
        },
        ol: {
            title: "G.C.E. Ordinary Level (O/L)",
            description: "Comprehensive resources for O/L subjects including Mathematics, Science, and English.",
            icon: Sparkles,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            grades: [10, 11],
        },
        al: {
            title: "G.C.E. Advanced Level (A/L)",
            description: "Stream-based resources for Physical, Biological, Commerce, Arts, and Technology.",
            icon: GraduationCap,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            grades: [12, 13],
        },
    };

    const data = EXAM_DATA[type as keyof typeof EXAM_DATA];

    if (!data) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                <div className={`p-6 rounded-2xl ${data.bg}`}>
                    <data.icon className={`h-16 w-16 ${data.color}`} />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl">
                        {data.description}
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                            Study Materials by Grade
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {data.grades.map(grade => (
                            <Link key={grade} href={type === 'al' ? '/al' : `/library/grade-${grade}`} className="block">
                                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                                    <span className="font-semibold">Grade {grade} Syllabus & Guides</span>
                                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle>Recent Past Papers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-8 text-slate-500">
                            <p>Past papers section is being updated.</p>
                            <Button variant="link" className="mt-2 text-primary">Browse All Papers</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
