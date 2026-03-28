# Task Manager

## Autor

**Piotr Mazepka**
Nr albumu: **95269**

---

## Opis projektu

Task Manager to aplikacja webowa służąca do zarządzania zadaniami. System umożliwia użytkownikowi tworzenie, przeglądanie, edytowanie oraz usuwanie zadań (CRUD).

Aplikacja została zaprojektowana w architekturze trójwarstwowej:

* warstwa prezentacji (frontend)
* warstwa logiki aplikacji (backend API)
* warstwa danych (baza danych)

---

## Funkcjonalności

System umożliwia wykonywanie operacji CRUD:

* **CREATE** – tworzenie nowych zadań
* **READ** – przeglądanie listy zadań
* **UPDATE** – edycja oraz zmiana statusu zadania
* **DELETE** – usuwanie zadań

Dodatkowo:

* zmiana statusu zadania (zakończone / aktywne)
* dynamiczne odświeżanie danych z API
* nowoczesny interfejs użytkownika (Next.js)

---

## Stos technologiczny

| Warstwa        | Technologia             |
| -------------- | ----------------------- |
| Frontend       | Next.js (React)         |
| Backend        | .NET 8 Web API          |
| Baza danych    | SQL Server              |
| ORM            | Entity Framework Core   |
| Konteneryzacja | Docker + Docker Compose |
| API            | REST                    |

---

## Architektura systemu

Aplikacja została zaprojektowana w architekturze 3-warstwowej:

### 1. Warstwa prezentacji

Frontend aplikacji napisany w Next.js, odpowiedzialny za interfejs użytkownika oraz komunikację z API.

### 2. Warstwa aplikacyjna

Backend w postaci REST API (.NET), obsługujący logikę aplikacji oraz komunikację z bazą danych.

### 3. Warstwa danych

Baza danych SQL Server przechowująca zadania.

Diagram architektury:

```
docs/architecture.png
docs/architecture.mmd
```

---

## Środowisko wielokontenerowe

Projekt działa w środowisku Docker Compose.

Uruchamiane są trzy kontenery:

| Kontener             | Opis                  |
| -------------------- | --------------------- |
| taskmanager-frontend | aplikacja frontendowa |
| taskmanager-backend  | REST API (.NET)       |
| taskmanager-database | SQL Server            |

Kontenery komunikują się w jednej sieci Docker.

---

## Uruchomienie projektu

W katalogu głównym projektu:

```bash
docker compose up --build
```

---

## Dostęp do aplikacji

Frontend:

```
http://localhost:8080
```

Backend API:

```
http://localhost:8081
```

Swagger:

```
http://localhost:8081/swagger
```

---

## Zarządzanie kontenerami

Zatrzymanie:

```bash
docker compose down
```

Restart:

```bash
docker compose up
```

Status:

```bash
docker compose ps
```

Logi:

```bash
docker compose logs
```

---

## Endpointy API

### Pobranie wszystkich zadań

```
GET /api/tasks
```

### Pobranie zadania po ID

```
GET /api/tasks/{id}
```

### Dodanie zadania

```
POST /api/tasks
```

Przykład:

```bash
curl -X POST http://localhost:8081/api/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Test\",\"description\":\"Opis\"}"
```

### Aktualizacja zadania

```
PUT /api/tasks/{id}
```

### Usunięcie zadania

```
DELETE /api/tasks/{id}
```

---

## DTO i stabilność API

W celu zapewnienia stabilności API zastosowano warstwę DTO (`TaskReadDto`).

Backend nie zwraca bezpośrednio encji bazy danych, co:

* zwiększa bezpieczeństwo
* umożliwia łatwe zmiany struktury danych
* oddziela model bazy od modelu API

---

## Migracje bazy danych

Do zarządzania schematem bazy wykorzystano Entity Framework Core.

Tworzenie migracji:

```bash
dotnet ef migrations add InitialCreate
```

Zastosowanie migracji:

```bash
dotnet ef database update
```

Folder migracji:

```
backend/Migrations
```

---

## Trwałość danych (Docker Volume)

Zastosowano named volume:

```yaml
volumes:
  dbdata:
```

Dzięki temu:

* dane nie są tracone po restarcie kontenerów
* baza danych zachowuje stan aplikacji

---

## Struktura projektu

```
taskmanager
│
├── backend
│   ├── Controllers
│   ├── Models
│   ├── DTOs
│   ├── Services
│   ├── Repositories
│   └── Data
│
├── frontend
│   ├── app
│   ├── components
│   └── services
│
├── docker-compose.yml
└── README.md
```

---

## Testowanie API

API można testować przy użyciu:

* Swagger UI
* Postman
* curl

Swagger:

```
http://localhost:8081/swagger
```

---

## Podsumowanie

Projekt przedstawia kompletną aplikację CRUD działającą w środowisku kontenerowym.

Zaimplementowano:

* backend REST API
* frontend React (Next.js)
* bazę danych SQL Server
* migracje EF Core
* trwałość danych (Docker Volume)

Aplikacja spełnia wymagania artefaktu nr 5.
