import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Atom, Dna, BarChart3, Palette, Cpu } from "lucide-react";

export default function ALPage() {
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
                <h1 className="text-4xl font-bold mb-4">Advanced Level (A/L)</h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    Choose your stream to access a comprehensive collection of past papers, marking schemes, and study guides.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {streams.map((stream) => (
                    <Link key={stream.id} href={`/al/${stream.id}`} className="group">
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
