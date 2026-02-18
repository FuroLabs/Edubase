import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, GraduationCap, Library, Atom, Dna, BarChart3, Palette, Cpu } from "lucide-react";

export default function Home() {
  // Grades rearranged below

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
          <h2 className="text-2xl font-bold">Select Your Path</h2>
        </div>

        {/* Ordinary Level (Grades 10-11) */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b pb-2 border-slate-200 dark:border-slate-800">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold dark:bg-emerald-900/30 dark:text-emerald-400">O/L</span>
            Ordinary Level
          </h3>
          <div className="grid grid-cols-2 gap-4 max-w-2xl">
            {[10, 11].map((grade) => (
              <Link key={grade} href={`/library/grade-${grade}`} className="group">
                <Card className="h-full hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800 cursor-pointer group-hover:border-emerald-500/50">
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl">Grade {grade}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-slate-500">
                    G.C.E. O/L Preparation
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Advanced Level (Streams) */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b pb-2 border-slate-200 dark:border-slate-800">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold dark:bg-blue-900/30 dark:text-blue-400">A/L</span>
            Advanced Level
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { id: "physical", name: "Physical", full: "Physical Science", icon: Atom, color: "text-blue-500", bg: "bg-blue-500/10" },
              { id: "bio", name: "Biological", full: "Biological Science", icon: Dna, color: "text-green-500", bg: "bg-green-500/10" },
              { id: "commerce", name: "Commerce", full: "Commerce", icon: BarChart3, color: "text-amber-500", bg: "bg-amber-500/10" },
              { id: "arts", name: "Arts", full: "Arts", icon: Palette, color: "text-purple-500", bg: "bg-purple-500/10" },
              { id: "tech", name: "Technology", full: "Technology", icon: Cpu, color: "text-slate-500", bg: "bg-slate-500/10" },
            ].map((stream) => (
              <Link key={stream.id} href={`/al/${stream.id}`} className="group">
                <Card className="h-full hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 cursor-pointer group-hover:border-primary/50">
                  <CardHeader className="p-4">
                    <div className={`w-fit p-2 rounded-lg mb-3 ${stream.bg}`}>
                      <stream.icon className={`h-5 w-5 ${stream.color}`} />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {stream.name}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-1">{stream.full}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Junior Secondary (Grades 6-9) */}
        <div>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b pb-2 border-slate-200 dark:border-slate-800">
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-bold dark:bg-slate-800 dark:text-slate-400">6-9</span>
            Junior Secondary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[6, 7, 8, 9].map((grade) => (
              <Link key={grade} href={`/library/grade-${grade}`} className="group">
                <Card className="h-full hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800 cursor-pointer group-hover:border-primary/50">
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-primary/10 p-2 rounded-full w-fit mb-2 group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Grade {grade}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
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
