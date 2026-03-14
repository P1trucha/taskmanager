import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px"
      }}
    >
      <h1>Taskmanager</h1>
      <p>Aplikacja demonstracyjna uruchomiona w Docker Compose.</p>
      <Link href="/tasks">Przejdź do listy zadań</Link>
    </main>
  );
}