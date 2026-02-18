import { getGradeData } from "@/lib/content-service";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ResourceCard } from "@/components/resource-card";

export default async function SubjectPage({
    params,
}: {
    params: Promise<{ grade: string; subject: string }>;
}) {
    const { grade, subject: subjectId } = await params;
    const gradeData = await getGradeData(grade);

    if (!gradeData) notFound();

    const subject = gradeData.subjects.find((s) => s.id === subjectId);

    if (!subject) notFound();

    // Group resources by type dynamically
    const resourcesByType = subject.resources.reduce((acc, resource) => {
        const type = resource.type;
        if (!acc[type]) acc[type] = [];
        acc[type].push(resource);
        return acc;
    }, {} as Record<string, typeof subject.resources>);

    // Order of sections
    const sectionOrder = ["textbook", "syllabus", "teacher-guide", "paper", "model-paper", "video", "other"];

    const SECTION_TITLES: Record<string, string> = {
        textbook: "Textbooks",
        paper: "Past Papers",
        syllabus: "Syllabuses",
        "teacher-guide": "Teacher Guides",
        video: "Video Lessons",
        "model-paper": "Model Papers",
        other: "Other Resources"
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
                    <Link href={`/library/${grade}`}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to {gradeData.name}
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold mb-2">{subject.name}</h1>
                <p className="text-slate-500">
                    {gradeData.name} • {subject.medium} medium
                </p>
            </div>

            <div className="space-y-12">
                {sectionOrder.map((type) => {
                    const resources = resourcesByType[type];
                    if (!resources || resources.length === 0) return null;

                    const title = SECTION_TITLES[type] || type.charAt(0).toUpperCase() + type.slice(1);

                    return (
                        <section key={type}>
                            <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-slate-100 dark:border-slate-800">
                                {title}
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {resources.map((res) => (
                                    <ResourceCard key={res.id} resource={res} />
                                ))}
                            </div>
                        </section>
                    );
                })}

                {/* Handle types not in order */}
                {Object.keys(resourcesByType).filter(t => !sectionOrder.includes(t)).map((type) => {
                    const resources = resourcesByType[type];
                    const title = SECTION_TITLES[type] || type.charAt(0).toUpperCase() + type.slice(1);
                    return (
                        <section key={type}>
                            <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-slate-100 dark:border-slate-800">
                                {title}
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {resources.map((res) => (
                                    <ResourceCard key={res.id} resource={res} />
                                ))}
                            </div>
                        </section>
                    )
                })}
            </div>
        </div>
    );
}
