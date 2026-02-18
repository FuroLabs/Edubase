import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, GraduationCap, Library, Atom, Dna, BarChart3, Palette, Cpu, Sparkles, Shapes } from "lucide-react";
import { SearchPalette } from "@/components/search-palette";
import { getRegistry } from "@/lib/content-service";

export default async function Home() {
  const registry = await getRegistry();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-6">
            EduBase <br />
            <span className="text-primary text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              Sri Lanka&apos;s Open Education Platform
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Access free textbooks, past papers, and study materials for Grades 1-13.
            All in one place.
          </p>

          <div className="max-w-xl mx-auto mb-12">
            <div className="p-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-lg backdrop-blur-sm">
              <SearchPalette registry={registry} />
            </div>
            <p className="text-sm text-slate-500 mt-2">Try searching for &quot;Grade 5 Scholarship&quot; or &quot;Combined Maths&quot;</p>
          </div>

          <div className="flex justify-center gap-4">
            <Button size="lg" asChild className="rounded-full px-8">
              <Link href="#primary">Start Learning</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8">
              <Link href="/contribute">Contribute Resource</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Grade Hub */}
      <section id="grades" className="container mx-auto px-4 py-16 space-y-20">

        {/* Primary Education (Grades 1-5) */}
        <div id="primary">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
              <Shapes className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Primary Education</h2>
              <p className="text-slate-500">Foundation years for young learners</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((grade) => (
              <Link key={grade} href={`/library/grade-${grade}`} className="group">
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all border-slate-200 dark:border-slate-800 cursor-pointer overflow-hidden relative">
                  <div className={`absolute top-0 left-0 w-full h-1 ${grade === 5 ? 'bg-amber-500' : 'bg-orange-400'}`}></div>
                  <CardHeader className="text-center py-6">
                    <div className="mx-auto bg-orange-50 dark:bg-orange-900/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
                      <span className="text-xl font-bold text-orange-600 dark:text-orange-400">{grade}</span>
                    </div>
                    <CardTitle className="text-lg">Grade {grade}</CardTitle>
                    {grade === 5 && (
                      <div className="mt-2">
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">Scholarship</span>
                      </div>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>


        {/* Junior Secondary (Grades 6-9) */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Junior Secondary</h2>
              <p className="text-slate-500">Essential subjects and skills</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[6, 7, 8, 9].map((grade) => (
              <Link key={grade} href={`/library/grade-${grade}`} className="group">
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all border-slate-200 dark:border-slate-800 cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                  <CardHeader className="text-center py-6">
                    <div className="mx-auto bg-blue-50 dark:bg-blue-900/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{grade}</span>
                    </div>
                    <CardTitle className="text-lg">Grade {grade}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Ordinary Level (Grades 10-11) */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Ordinary Level (O/L)</h2>
              <p className="text-slate-500">Preparation for G.C.E. O/L Examination</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-2xl">
            {[10, 11].map((grade) => (
              <Link key={grade} href={`/library/grade-${grade}`} className="group">
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all border-slate-200 dark:border-slate-800 cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                  <CardHeader className="text-center py-8">
                    <div className="mx-auto bg-emerald-50 dark:bg-emerald-900/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                      <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{grade}</span>
                    </div>
                    <CardTitle className="text-2xl mb-2">Grade {grade}</CardTitle>
                    <CardDescription>G.C.E. O/L Syllabus</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Advanced Level (Grades 12-13) */}
        <div id="al">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Advanced Level (A/L)</h2>
              <p className="text-slate-500">Specialized streams for higher education</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-2xl">
            {[12, 13].map((grade) => (
              <Link key={grade} href={`/library/grade-${grade}`} className="group">
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all border-slate-200 dark:border-slate-800 cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
                  <CardHeader className="text-center py-8">
                    <div className="mx-auto bg-purple-50 dark:bg-purple-900/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                      <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{grade}</span>
                    </div>
                    <CardTitle className="text-2xl mb-2">Grade {grade}</CardTitle>
                    <CardDescription>Select Stream</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

      </section>

      {/* Exams Callout */}
      <section className="bg-slate-900 text-white py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Preparing for Exams?</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Find structured past papers, marking schemes, and model papers for all major national examinations.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button variant="secondary" asChild>
              <Link href="/exams/schol">Grade 5 Schol</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/exams/ol">G.C.E. O/L</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/exams/al">G.C.E. A/L</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
