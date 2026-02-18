import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Github, Mail } from "lucide-react";

export default function ContributePage() {
    return (
        <div className="container mx-auto px-4 py-24 text-center">
            <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-primary mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>

            <h1 className="text-4xl font-bold mb-6">Contribute to EduBase</h1>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                EduBase is a community-driven platform. We welcome contributions of study materials, past papers, and educational resources.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="p-8 border border-slate-200 rounded-xl bg-slate-50 dark:bg-slate-900 dark:border-slate-800">
                    <Github className="h-12 w-12 mx-auto mb-4 text-slate-900 dark:text-white" />
                    <h2 className="text-2xl font-bold mb-2">Developer?</h2>
                    <p className="text-slate-500 mb-6">Contribute to the codebase or report issues on GitHub.</p>
                    <Button asChild className="w-full">
                        <a href="https://github.com/FuroLabs/Edubase" target="_blank" rel="noopener noreferrer">
                            View on GitHub
                        </a>
                    </Button>
                </div>

                <div className="p-8 border border-slate-200 rounded-xl bg-slate-50 dark:bg-slate-900 dark:border-slate-800">
                    <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h2 className="text-2xl font-bold mb-2">Have Resources?</h2>
                    <p className="text-slate-500 mb-6">Email us your study materials to be added to the library.</p>
                    <Button variant="outline" asChild className="w-full">
                        <a href="mailto:contribute@edubase.lk">
                            Email Us
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
