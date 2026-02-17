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
        },
        {
            id: "bio",
            name: "Biological Science",
            description: "Biology, Physics, Chemistry",
            icon: Dna,
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
        {
            id: "commerce",
            name: "Commerce",
            description: "Accounting, Business Studies, Economics",
            icon: BarChart3,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            id: "arts",
            name: "Arts",
            description: "Sinhala, Political Science, Geography, etc.",
            icon: Palette,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            id: "tech",
            name: "Technology",
            description: "Engineering Tech, Science for Tech",
            icon: Cpu,
            color: "text-slate-500",
            bg: "bg-slate-500/10",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Advanced Level (A/L)</h1>
                <p className="text-slate-500 dark:text-slate-400">
                    Select your stream to access study materials and resources.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {streams.map((stream) => (
                    <Link key={stream.id} href={`/al/${stream.id}`} className="group">
                        <Card className="h-full hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 cursor-pointer group-hover:border-primary/50">
                            <CardHeader>
                                <div className={`w-fit p-3 rounded-lg mb-4 ${stream.bg}`}>
                                    <stream.icon className={`h-6 w-6 ${stream.color}`} />
                                </div>
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                    {stream.name}
                                </CardTitle>
                                <CardDescription>{stream.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
