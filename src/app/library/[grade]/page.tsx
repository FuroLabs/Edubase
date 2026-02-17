import { getGradeData } from "@/lib/content-service";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Book, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function GradePage({
    params,
}: {
    params: Promise<{ grade: string }>;
}) {
    const { grade } = await params;

    if (grade === "grade-12" || grade === "grade-13") {
        redirect("/al");
    }

    const data = await getGradeData(grade);

    if (!data) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
                <p className="text-slate-500">Select a subject to view resources.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                {data.subjects.map((subject) => (
                    <Link
                        key={subject.id}
                        href={`/library/${grade}/${subject.id}`}
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
        </div>
    );
}
