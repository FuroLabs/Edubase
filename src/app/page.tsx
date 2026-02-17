import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, GraduationCap, Library } from "lucide-react";

export default function Home() {
  const grades = Array.from({ length: 8 }, (_, i) => i + 6); // 6 to 13

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6">
            EduBase <br />
            <span className="text-primary text-2xl md:text-4xl">
              Sri Lanka's Open Education Platform
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Access free textbooks, past papers, and study materials for Grades
            6-13. Powered by the community.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="#grades">Start Learning</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contribute">Contribute</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Grade Hub */}
      <section id="grades" className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-2 mb-8">
          <Library className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Select Your Grade</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {grades.map((grade) => (
            <Link key={grade} href={`/library/grade-${grade}`} className="group">
              <Card className="h-full hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800 cursor-pointer group-hover:border-primary/50">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2 group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Grade {grade}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-sm text-slate-500">
                  Textbooks • Papers
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Exams Section */}
      <section className="bg-slate-100 dark:bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">National Exams</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: "ol", name: "G.C.E. O/L", label: "Ordinary Level" },
              { id: "al", name: "G.C.E. A/L", label: "Advanced Level" },
              { id: "schol", name: "Scholarship", label: "Grade 5" },
            ].map((exam) => (
              <Link key={exam.id} href={`/exams/${exam.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>{exam.name}</CardTitle>
                    <CardDescription>{exam.label}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
