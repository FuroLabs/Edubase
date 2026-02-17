import { getGradeData } from "@/lib/content-service";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Download, FileText, ArrowLeft } from "lucide-react";
import { PDFViewer } from "@/components/ui/pdf-viewer";
import Link from "next/link";

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

    // Group resources by type
    const textbooks = subject.resources.filter((r) => r.type === "textbook");
    const papers = subject.resources.filter((r) => r.type === "paper");
    const other = subject.resources.filter((r) => r.type === "other");

    return (
        <div className="container mx-auto px-4 py-8">
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

            <div className="space-y-8">
                {/* Textbooks Section */}
                {textbooks.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5" /> Textbooks
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {textbooks.map((res) => (
                                <Card key={res.id}>
                                    <CardHeader>
                                        <CardTitle className="text-base">{res.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-slate-400">
                                                v{res.version} {res.size ? `• ${res.size}` : ""}
                                            </span>
                                            <Button size="sm" asChild>
                                                <a href={res.url} target="_blank" rel="noopener noreferrer">
                                                    <Download className="h-4 w-4 mr-2" /> Download
                                                </a>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}

                {/* Papers Section */}
                {papers.length > 0 && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5" /> Past Papers
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {papers.map((res) => (
                                <Card key={res.id}>
                                    <CardHeader>
                                        <CardTitle className="text-base">{res.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-slate-400">
                                                {res.size || "PDF"}
                                            </span>
                                            <PDFViewer url={res.url} title={res.title} />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
