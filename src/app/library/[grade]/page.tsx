import { getGradeData } from "@/lib/content-service";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Book, ChevronRight, Atom, Dna, BarChart3, Palette, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function GradePage({
    params,
}: {
    params: Promise<{ grade: string }>;
}) {
    const { grade } = await params;

    // Handle A/L Grades (12 & 13)
    if (grade === "grade-12" || grade === "grade-13") {
        const streams = [
            {
                id: "physical",
                name: "Physical Science",
                description: "Combined Maths, Physics, Chemistry",
                icon: Atom,
                color: "text-blue-500",
                bg: "bg-blue-500/10",
                border: "border-blue-200 dark:border-blue-800",
            },
            {
                id: "bio",
                name: "Biological Science",
                description: "Biology, Physics, Chemistry",
                icon: Dna,
                color: "text-green-500",
                bg: "bg-green-500/10",
                border: "border-green-200 dark:border-green-800",
            },
            {
                id: "commerce",
                name: "Commerce",
                description: "Accounting, Business Studies, Economics",
                icon: BarChart3,
                color: "text-amber-500",
                bg: "bg-amber-500/10",
                border: "border-amber-200 dark:border-amber-800",
            },
            {
                id: "arts",
                name: "Arts",
                description: "Sinhala, Political Science, Geography",
                icon: Palette,
                color: "text-purple-500",
                bg: "bg-purple-500/10",
                border: "border-purple-200 dark:border-purple-800",
            },
            {
                id: "tech",
                name: "Technology",
                description: "Engineering Tech, Science for Tech",
                icon: Cpu,
                color: "text-slate-500",
                bg: "bg-slate-500/10",
                border: "border-slate-200 dark:border-slate-800",
            },
        ];

        return (
            <div className="container mx-auto px-4 py-12">
                <div className="mb-12 text-center">
                    <div className="mx-auto bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{grade.replace("grade-", "")}</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Select Your Stream</h1>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Choose your A/L stream to access specific subjects and resources for Grade {grade.replace("grade-", "")}.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {streams.map((stream) => (
                        <Link key={stream.id} href={`/library/${grade}/al/${stream.id}`} className="group">
                            <Card className={`h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-slate-200 dark:border-slate-800 cursor-pointer hover:${stream.border}`}>
                                <CardHeader className="text-center py-8">
                                    <div className={`mx-auto w-16 h-16 rounded-2xl mb-6 ${stream.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <stream.icon className={`h-8 w-8 ${stream.color}`} />
                                    </div>
                                    <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                                        {stream.name}
                                    </CardTitle>
                                    <CardDescription className="text-base">{stream.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    const data = await getGradeData(grade);

    if (!data) {
        notFound();
    }

    // Group subjects by category
    const subjectsByCategory = data.subjects.reduce((acc, subject) => {
        const category = subject.category || "other";
        if (!acc[category]) acc[category] = [];
        acc[category].push(subject);
        return acc;
    }, {} as Record<string, typeof data.subjects>);

    const CATEGORY_ORDER = ["core", "languages", "religion", "aesthetics", "other"];
    const CATEGORY_LABELS: Record<string, string> = {
        core: "Core Subjects",
        languages: "Languages",
        religion: "Religion",
        aesthetics: "Aesthetic Subjects",
        other: "Other Subjects",
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                        {data.name.replace("Grade ", "")}
                    </div>
                    <h1 className="text-3xl font-bold">{data.name}</h1>
                </div>
                <p className="text-slate-500 text-lg">Select a subject to view resources, syllabus, and past papers.</p>
            </div>

            <div className="space-y-12">
                {CATEGORY_ORDER.map((category) => {
                    const subjects = subjectsByCategory[category];
                    if (!subjects || subjects.length === 0) return null;

                    return (
                        <section key={category}>
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b pb-2 border-slate-100 dark:border-slate-800">
                                {CATEGORY_LABELS[category] || "Other Subjects"}
                            </h2>
                            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {subjects.map((subject) => (
                                    <Link
                                        key={subject.id}
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
                        </section>
                    );
                })}
            </div>
        </div>
    );
}


