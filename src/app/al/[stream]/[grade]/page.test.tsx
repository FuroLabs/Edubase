
export default async function Page({ params }: { params: Promise<{ stream: string; grade: string }> }) {
    const { stream, grade } = await params;
    return <div>Hello {stream} {grade}</div>;
}
