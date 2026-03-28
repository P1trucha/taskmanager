import Link from "next/link";

export default function HomePage() {
  return (
    <main className="landing-shell">
      <section className="landing-card">
        <p className="eyebrow">Task Manager</p>
        <h1>Frontend CRUD do demonstracji artefaktu nr 5</h1>
        <p>
        
        </p>

        <div className="landing-actions">
          <Link href="/tasks" className="primary-btn link-btn">
            Otwórz dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}