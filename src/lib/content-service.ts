import { unstable_cache } from "next/cache";

// --- Types ---

export interface Resource {
    id: string;
    title: string;
    type: "textbook" | "paper" | "other";
    url: string; // Direct link to PDF or raw content
    version: string;
    size?: string;
}

export interface Subject {
    id: string;
    name: string; // e.g., "Mathematics"
    medium: "sinhala" | "english" | "tamil";
    // stream?: "physical" | "bio" | "commerce" | "arts" | "tech";
    streams?: string[];
    resources: Resource[];
}

export interface Grade {
    id: string; // e.g., "grade-6"
    name: string; // "Grade 6"
    subjects: Subject[];
}

export interface Exam {
    id: string;
    type: "term-1" | "term-2" | "term-3" | "ol" | "al" | "scholarship";
    year: number;
    resources: Resource[];
}

export interface Registry {
    grades: Grade[];
    exams: Exam[];
    meta: {
        lastUpdated: string;
        version: string;
    };
}

// --- Configuration ---

const REGISTRY_URL =
    process.env.NEXT_PUBLIC_REGISTRY_URL ||
    "https://raw.githubusercontent.com/janit/edubase-registry/main/registry.json";

// --- Mock Data ---
const MOCK_REGISTRY: Registry = {
    meta: { lastUpdated: "2023-10-27", version: "1.0.0" },
    grades: [
        {
            id: "grade-6",
            name: "Grade 6",
            subjects: [
                {
                    id: "mathematics",
                    name: "Mathematics",
                    medium: "sinhala",
                    resources: [
                        {
                            id: "math-textbook-g6",
                            title: "Mathematics Textbook Part 1",
                            type: "textbook",
                            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                            version: "1.0",
                            size: "15MB",
                        },
                    ],
                },
                { id: "science", name: "Science", medium: "sinhala", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", resources: [] },
                { id: "english", name: "English", medium: "english", resources: [] },
                { id: "history", name: "History", medium: "sinhala", resources: [] },
                { id: "buddhism", name: "Buddhism", medium: "sinhala", resources: [] },
            ],
        },
        {
            id: "grade-7",
            name: "Grade 7",
            subjects: [
                { id: "mathematics", name: "Mathematics", medium: "sinhala", resources: [] },
                { id: "science", name: "Science", medium: "sinhala", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", resources: [] },
                { id: "english", name: "English", medium: "english", resources: [] },
                { id: "history", name: "History", medium: "sinhala", resources: [] },
                { id: "buddhism", name: "Buddhism", medium: "sinhala", resources: [] },
            ],
        },
        {
            id: "grade-8",
            name: "Grade 8",
            subjects: [
                { id: "mathematics", name: "Mathematics", medium: "sinhala", resources: [] },
                { id: "science", name: "Science", medium: "sinhala", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", resources: [] },
                { id: "english", name: "English", medium: "english", resources: [] },
                { id: "history", name: "History", medium: "sinhala", resources: [] },
                { id: "buddhism", name: "Buddhism", medium: "sinhala", resources: [] },
            ],
        },
        {
            id: "grade-9",
            name: "Grade 9",
            subjects: [
                { id: "mathematics", name: "Mathematics", medium: "sinhala", resources: [] },
                { id: "science", name: "Science", medium: "sinhala", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", resources: [] },
                { id: "english", name: "English", medium: "english", resources: [] },
                { id: "history", name: "History", medium: "sinhala", resources: [] },
                { id: "buddhism", name: "Buddhism", medium: "sinhala", resources: [] },
            ],
        },
        {
            id: "grade-10",
            name: "Grade 10",
            subjects: [
                { id: "mathematics", name: "Mathematics", medium: "sinhala", resources: [] },
                { id: "science", name: "Science", medium: "sinhala", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", resources: [] },
                { id: "english", name: "English", medium: "english", resources: [] },
                { id: "history", name: "History", medium: "sinhala", resources: [] },
                { id: "buddhism", name: "Buddhism", medium: "sinhala", resources: [] },
            ],
        },
        {
            id: "grade-11",
            name: "Grade 11",
            subjects: [
                {
                    id: "mathematics",
                    name: "Mathematics",
                    medium: "english",
                    resources: [
                        {
                            id: "math-paper-2023",
                            title: "2023 1st Term Paper",
                            type: "paper",
                            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                            version: "1.0",
                            size: "2MB"
                        }
                    ]
                },
                { id: "science", name: "Science", medium: "sinhala", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", resources: [] },
                { id: "english", name: "English", medium: "english", resources: [] },
                { id: "history", name: "History", medium: "sinhala", resources: [] },
                { id: "buddhism", name: "Buddhism", medium: "sinhala", resources: [] },
            ],
        },
        {
            id: "grade-12",
            name: "Grade 12",
            subjects: [
                // Physical Science & Bio Science
                { id: "combined-maths", name: "Combined Mathematics", medium: "sinhala", streams: ["physical"], resources: [] },
                { id: "biology", name: "Biology", medium: "sinhala", streams: ["bio"], resources: [] },
                { id: "physics", name: "Physics", medium: "sinhala", streams: ["physical", "bio"], resources: [] },
                { id: "chemistry", name: "Chemistry", medium: "sinhala", streams: ["physical", "bio"], resources: [] },

                // Commerce
                { id: "accounting", name: "Accounting", medium: "sinhala", streams: ["commerce"], resources: [] },
                { id: "business-studies", name: "Business Studies", medium: "sinhala", streams: ["commerce"], resources: [] },
                { id: "economics", name: "Economics", medium: "sinhala", streams: ["commerce"], resources: [] },

                // Arts
                { id: "sinhala", name: "Sinhala", medium: "sinhala", streams: ["arts"], resources: [] },
                { id: "political-science", name: "Political Science", medium: "sinhala", streams: ["arts"], resources: [] },
                { id: "geography", name: "Geography", medium: "sinhala", streams: ["arts"], resources: [] },

                // Technology
                { id: "engineering-tech", name: "Engineering Technology", medium: "sinhala", streams: ["tech"], resources: [] },
                { id: "science-tech", name: "Science for Technology", medium: "sinhala", streams: ["tech"], resources: [] },
            ]
        },
        {
            id: "grade-13",
            name: "Grade 13",
            subjects: [
                // Physical Science & Bio Science
                { id: "combined-maths", name: "Combined Mathematics", medium: "sinhala", streams: ["physical"], resources: [] },
                { id: "biology", name: "Biology", medium: "sinhala", streams: ["bio"], resources: [] },
                { id: "physics", name: "Physics", medium: "sinhala", streams: ["physical", "bio"], resources: [] },
                { id: "chemistry", name: "Chemistry", medium: "sinhala", streams: ["physical", "bio"], resources: [] },

                // Commerce
                { id: "accounting", name: "Accounting", medium: "sinhala", streams: ["commerce"], resources: [] },
                { id: "business-studies", name: "Business Studies", medium: "sinhala", streams: ["commerce"], resources: [] },
                { id: "economics", name: "Economics", medium: "sinhala", streams: ["commerce"], resources: [] },

                // Arts
                { id: "sinhala", name: "Sinhala", medium: "sinhala", streams: ["arts"], resources: [] },
                { id: "political-science", name: "Political Science", medium: "sinhala", streams: ["arts"], resources: [] },
                { id: "geography", name: "Geography", medium: "sinhala", streams: ["arts"], resources: [] },

                // Technology
                { id: "engineering-tech", name: "Engineering Technology", medium: "sinhala", streams: ["tech"], resources: [] },
                { id: "science-tech", name: "Science for Technology", medium: "sinhala", streams: ["tech"], resources: [] },
            ]
        }
    ],
    exams: [
        {
            id: "ol-2023-math",
            type: "ol",
            year: 2023,
            resources: [
                {
                    id: "ol-2023-math-1",
                    title: "O/L Mathematics 2023 - Paper I",
                    type: "paper",
                    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                    version: "final",
                    size: "5MB",
                },
            ],
        },
        {
            id: "al-2023-phys",
            type: "al",
            year: 2023,
            resources: []
        }
    ],
};

// --- Service ---

/**
 * Fetches the registry from the remote GitHub URL.
 * Cached for 1 hour by default.
 */
// export const getRegistry = unstable_cache(
//     async (): Promise<Registry | null> => {
//         try {
//             return MOCK_REGISTRY;
//         } catch (error) {
//             console.error("Error fetching registry:", error);
//             return MOCK_REGISTRY;
//         }
//     },
//     ["registry-data"],
//     { revalidate: 3600, tags: ["registry"] }
// );

export const getRegistry = async (): Promise<Registry | null> => {
    return MOCK_REGISTRY;
};

/**
 * Helper to get data for a specific grade
 */
export async function getGradeData(gradeId: string) {
    const registry = await getRegistry();
    return registry?.grades.find((g) => g.id === gradeId) || null;
}

/**
 * Helper to get data for a specific exam
 */
export async function getExamData(examType: string, year: number) {
    const registry = await getRegistry();
    return (
        registry?.exams.find(
            (e) => e.type === examType && e.year === year
        ) || null
    );
}
