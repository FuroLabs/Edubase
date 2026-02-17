import { getExamData } from "@/lib/content-service";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Download, ArrowLeft } from "lucide-react";
import { PDFViewer } from "@/components/ui/pdf-viewer";
import Link from "next/link";

export default async function ExamYearPage({
    params,
}: {
    params: Promise<{ type: string; year: string }>;
}) {
    const { type, year } = await params;
    const yearNum = parseInt(year);

    if (isNaN(yearNum)) notFound();

    const examData = await getExamData(type, yearNum);

    if (!examData) notFound();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Button variant="ghost" asChild className="mb-4 pl-0">
                    <Link href={`/exams/${type}`}>
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to {type.toUpperCase()}
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold mb-2">
                    {type.toUpperCase()} - {year}
                </h1>
                <p className="text-slate-500">
                    Available resources for this exam series.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {examData.resources.map((res) => (
                    <Card key={res.id}>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-start gap-2">
                                <FileText className="h-5 w-5 mt-1 text-primary" />
                                <span>{res.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                    {res.type.toUpperCase()}
                                </span>
                                <div className="flex gap-2">
                                    <PDFViewer url={res.url} title={res.title} />
                                    <Button size="sm" asChild>
                                        <a href={res.url} target="_blank" rel="noopener noreferrer">
                                            <Download className="h-4 w-4 mr-2" /> Download
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
