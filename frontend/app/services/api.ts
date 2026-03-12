export type TaskItem = {
  id: number;
  title: string;
  description?: string;
  status?: string;
};

export async function getTasks(): Promise<TaskItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Przygotować Artefakt 3",
          description: "Stworzyć działającą warstwę prezentacji",
          status: "todo",
        },
        {
          id: 2,
          title: "Zaktualizować README",
          description: "Dodać opis frontendu i Dockerfile",
          status: "done",
        },
        {
          id: 3,
          title: "Uruchomić front w Dockerze",
          description: "Sprawdzić działanie pod localhost:8080",
          status: "todo",
        },
      ]);
    }, 500);
  });
}