import { unstable_cache } from "next/cache";

// --- Types ---

export type ResourceType =
    | "textbook"
    | "paper"
    | "syllabus"
    | "teacher-guide"
    | "video"
    | "model-paper"
    | "other";

export interface Resource {
    id: string;
    title: string;
    type: ResourceType;
    url: string; // Direct link to PDF or raw content
    version?: string;
    size?: string;
    thumbnailUrl?: string;
    author?: string;
    duration?: string; // For videos, e.g., "10:30"
}

export interface Subject {
    id: string;
    name: string; // e.g., "Mathematics"
    medium: "sinhala" | "english" | "tamil";
    category?: "core" | "languages" | "religion" | "aesthetics" | "other"; // New organization
    streams?: string[]; // For A/L
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

// const REGISTRY_URL =
//     process.env.NEXT_PUBLIC_REGISTRY_URL ||
//     "https://raw.githubusercontent.com/janit/edubase-registry/main/registry.json";

// --- Mock Data ---
const MOCK_REGISTRY: Registry = {
    meta: { lastUpdated: "2024-02-18", version: "1.1.0" },
    grades: [
        // --- Primary (Grades 1-5) ---
        {
            id: "grade-1",
            name: "Grade 1",
            subjects: [
                {
                    id: "mathematics",
                    name: "Mathematics",
                    medium: "sinhala",
                    category: "core",
                    resources: [
                        {
                            id: "math-textbook-g1",
                            title: "Mathematics Textbook",
                            type: "textbook",
                            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                            size: "8MB",
                            thumbnailUrl: "/images/placeholders/math-g1.jpg",
                        },
                        {
                            id: "math-video-g1-shapes",
                            title: "Learning Shapes - Fun Video",
                            type: "video",
                            url: "https://www.youtube.com/watch?v=dummy",
                            duration: "15:00",
                            thumbnailUrl: "/images/placeholders/video-shapes.jpg",
                        },
                    ],
                },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", category: "languages", resources: [] },
                { id: "env-studies", name: "Environmental Studies", medium: "sinhala", category: "core", resources: [] },
            ],
        },
        {
            id: "grade-2",
            name: "Grade 2",
            subjects: [
                { id: "mathematics", name: "Mathematics", medium: "sinhala", category: "core", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", category: "languages", resources: [] },
                { id: "env-studies", name: "Environmental Studies", medium: "sinhala", category: "core", resources: [] },
            ],
        },
        {
            id: "grade-3",
            name: "Grade 3",
            subjects: [
                { id: "mathematics", name: "Mathematics", medium: "sinhala", category: "core", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", category: "languages", resources: [] },
                { id: "env-studies", name: "Environmental Studies", medium: "sinhala", category: "core", resources: [] },
            ],
        },
        {
            id: "grade-4",
            name: "Grade 4",
            subjects: [
                { id: "mathematics", name: "Mathematics", medium: "sinhala", category: "core", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", category: "languages", resources: [] },
                { id: "env-studies", name: "Environmental Studies", medium: "sinhala", category: "core", resources: [] },
            ],
        },
        {
            id: "grade-5",
            name: "Grade 5 (Scholarship)",
            subjects: [
                {
                    id: "scholarship-prep",
                    name: "Scholarship Preparation",
                    medium: "sinhala",
                    category: "core",
                    resources: [
                        {
                            id: "schol-paper-2023",
                            title: "2023 Scholarship Exam Paper 1",
                            type: "paper",
                            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                            size: "3MB",
                        },
                        {
                            id: "schol-model-paper",
                            title: "Model Paper Collection",
                            type: "model-paper",
                            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                            size: "12MB",
                            author: "Ministry of Education",
                        },
                    ],
                },
            ],
        },

        // --- Junior Secondary (Grades 6-9) ---
        {
            id: "grade-6",
            name: "Grade 6",
            subjects: [
                {
                    id: "mathematics",
                    name: "Mathematics",
                    medium: "sinhala",
                    category: "core",
                    resources: [
                        {
                            id: "math-textbook-g6",
                            title: "Mathematics Textbook Part 1",
                            type: "textbook",
                            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                            version: "1.0",
                            size: "15MB",
                        },
                        {
                            id: "math-syllabus-g6",
                            title: "Grade 6 Mathematics Syllabus",
                            type: "syllabus",
                            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                        },
                    ],
                },
                { id: "science", name: "Science", medium: "sinhala", category: "core", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", category: "languages", resources: [] },
                { id: "english", name: "English", medium: "english", category: "languages", resources: [] },
                { id: "history", name: "History", medium: "sinhala", category: "core", resources: [] },
                { id: "buddhism", name: "Buddhism", medium: "sinhala", category: "religion", resources: [] },
            ],
        },
        {
            id: "grade-7",
            name: "Grade 7",
            subjects: [
                { id: "mathematics", name: "Mathematics", medium: "sinhala", category: "core", resources: [] },
                { id: "science", name: "Science", medium: "sinhala", category: "core", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", category: "languages", resources: [] },
                { id: "english", name: "English", medium: "english", category: "languages", resources: [] },
                { id: "history", name: "History", medium: "sinhala", category: "core", resources: [] },
                { id: "buddhism", name: "Buddhism", medium: "sinhala", category: "religion", resources: [] },
            ],
        },
        {
            id: "grade-8",
            name: "Grade 8",
            subjects: [
                { id: "mathematics", name: "Mathematics", medium: "sinhala", category: "core", resources: [] },
                { id: "science", name: "Science", medium: "sinhala", category: "core", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", category: "languages", resources: [] },
                { id: "english", name: "English", medium: "english", category: "languages", resources: [] },
                { id: "history", name: "History", medium: "sinhala", category: "core", resources: [] },
                { id: "buddhism", name: "Buddhism", medium: "sinhala", category: "religion", resources: [] },
            ],
        },
        {
            id: "grade-9",
            name: "Grade 9",
            subjects: [
                { id: "mathematics", name: "Mathematics", medium: "sinhala", category: "core", resources: [] },
                { id: "science", name: "Science", medium: "sinhala", category: "core", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", category: "languages", resources: [] },
                { id: "english", name: "English", medium: "english", category: "languages", resources: [] },
                { id: "history", name: "History", medium: "sinhala", category: "core", resources: [] },
                { id: "buddhism", name: "Buddhism", medium: "sinhala", category: "religion", resources: [] },
            ],
        },

        // --- Senior Secondary (Grades 10-11) ---
        {
            id: "grade-10",
            name: "Grade 10",
            subjects: [
                { id: "mathematics", name: "Mathematics", medium: "sinhala", category: "core", resources: [] },
                { id: "science", name: "Science", medium: "sinhala", category: "core", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", category: "languages", resources: [] },
                { id: "english", name: "English", medium: "english", category: "languages", resources: [] },
                { id: "history", name: "History", medium: "sinhala", category: "core", resources: [] },
                { id: "buddhism", name: "Buddhism", medium: "sinhala", category: "religion", resources: [] },
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
                    category: "core",
                    resources: [
                        {
                            id: "math-paper-2023",
                            title: "2023 1st Term Paper",
                            type: "paper",
                            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                            version: "1.0",
                            size: "2MB"
                        },
                        {
                            id: "math-teacher-guide-11",
                            title: "Teacher's Guide - Mathematics",
                            type: "teacher-guide",
                            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                        }
                    ]
                },
                { id: "science", name: "Science", medium: "sinhala", category: "core", resources: [] },
                { id: "sinhala", name: "Sinhala", medium: "sinhala", category: "languages", resources: [] },
                { id: "english", name: "English", medium: "english", category: "languages", resources: [] },
                { id: "history", name: "History", medium: "sinhala", category: "core", resources: [] },
                { id: "buddhism", name: "Buddhism", medium: "sinhala", category: "religion", resources: [] },
            ],
        },

        // --- Collegiate (Grades 12-13) ---
        {
            id: "grade-12",
            name: "Grade 12",
            subjects: [
                // Physical Science & Bio Science
                { id: "combined-maths", name: "Combined Mathematics", medium: "sinhala", category: "core", streams: ["physical"], resources: [] },
                { id: "biology", name: "Biology", medium: "sinhala", category: "core", streams: ["bio"], resources: [] },
                { id: "physics", name: "Physics", medium: "sinhala", category: "core", streams: ["physical", "bio"], resources: [] },
                { id: "chemistry", name: "Chemistry", medium: "sinhala", category: "core", streams: ["physical", "bio"], resources: [] },

                // Commerce
                { id: "accounting", name: "Accounting", medium: "sinhala", category: "core", streams: ["commerce"], resources: [] },
                { id: "business-studies", name: "Business Studies", medium: "sinhala", category: "core", streams: ["commerce"], resources: [] },
                { id: "economics", name: "Economics", medium: "sinhala", category: "core", streams: ["commerce"], resources: [] },

                // Arts
                { id: "sinhala", name: "Sinhala", medium: "sinhala", category: "languages", streams: ["arts"], resources: [] },
                { id: "political-science", name: "Political Science", medium: "sinhala", category: "other", streams: ["arts"], resources: [] },
                { id: "geography", name: "Geography", medium: "sinhala", category: "other", streams: ["arts"], resources: [] },

                // Technology
                { id: "engineering-tech", name: "Engineering Technology", medium: "sinhala", category: "core", streams: ["tech"], resources: [] },
                { id: "science-tech", name: "Science for Technology", medium: "sinhala", category: "core", streams: ["tech"], resources: [] },
            ]
        },
        {
            id: "grade-13",
            name: "Grade 13",
            subjects: [
                // Physical Science & Bio Science
                { id: "combined-maths", name: "Combined Mathematics", medium: "sinhala", category: "core", streams: ["physical"], resources: [] },
                { id: "biology", name: "Biology", medium: "sinhala", category: "core", streams: ["bio"], resources: [] },
                { id: "physics", name: "Physics", medium: "sinhala", category: "core", streams: ["physical", "bio"], resources: [] },
                { id: "chemistry", name: "Chemistry", medium: "sinhala", category: "core", streams: ["physical", "bio"], resources: [] },

                // Commerce
                { id: "accounting", name: "Accounting", medium: "sinhala", category: "core", streams: ["commerce"], resources: [] },
                { id: "business-studies", name: "Business Studies", medium: "sinhala", category: "core", streams: ["commerce"], resources: [] },
                { id: "economics", name: "Economics", medium: "sinhala", category: "core", streams: ["commerce"], resources: [] },

                // Arts
                { id: "sinhala", name: "Sinhala", medium: "sinhala", category: "languages", streams: ["arts"], resources: [] },
                { id: "political-science", name: "Political Science", medium: "sinhala", category: "other", streams: ["arts"], resources: [] },
                { id: "geography", name: "Geography", medium: "sinhala", category: "other", streams: ["arts"], resources: [] },

                // Technology
                { id: "engineering-tech", name: "Engineering Technology", medium: "sinhala", category: "core", streams: ["tech"], resources: [] },
                { id: "science-tech", name: "Science for Technology", medium: "sinhala", category: "core", streams: ["tech"], resources: [] },
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
