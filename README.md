# Task Manager

## Autor

**Piotr Mazepka**  
Nr albumu: **95269**

---

## Opis projektu

Task Manager to aplikacja webowa służąca do zarządzania zadaniami. System umożliwia użytkownikowi tworzenie, przeglądanie, edytowanie oraz usuwanie zadań (CRUD).

Aplikacja została zaprojektowana w architekturze trójwarstwowej:

- warstwa prezentacji (frontend)
- warstwa logiki aplikacji (backend API)
- warstwa danych (baza danych)

W ramach artefaktu 6 projekt został rozszerzony o wdrożenie w środowisku chmurowym, co umożliwia korzystanie z aplikacji bez konieczności uruchamiania jej lokalnie.

---

## Funkcjonalności

System umożliwia wykonywanie operacji CRUD:

- **CREATE** – tworzenie nowych zadań  
- **READ** – przeglądanie listy zadań  
- **UPDATE** – edycja oraz zmiana statusu zadania  
- **DELETE** – usuwanie zadań  

Dodatkowo:

- zmiana statusu zadania (zakończone / aktywne)  
- komunikacja frontend–backend przez REST API  
- dynamiczne pobieranie danych  
- nowoczesny interfejs użytkownika (Next.js)  

---

## Stos technologiczny

| Warstwa        | Technologia             |
|----------------|------------------------|
| Frontend       | Next.js (React)        |
| Backend        | .NET 8 Web API         |
| Baza danych    | Azure SQL / SQL Server |
| ORM            | Entity Framework Core  |
| Konteneryzacja | Docker + Docker Compose|
| Chmura         | Microsoft Azure        |
| API            | REST                   |

---

## Architektura systemu

Aplikacja została zaprojektowana w architekturze 3-warstwowej:

### 1. Warstwa prezentacji
Frontend aplikacji napisany w Next.js, odpowiedzialny za interfejs użytkownika oraz komunikację z API.

### 2. Warstwa aplikacyjna
Backend w postaci REST API (.NET), obsługujący logikę aplikacji oraz komunikację z bazą danych.

### 3. Warstwa danych
Baza danych SQL Server / Azure SQL przechowująca dane o zadaniach.

Diagram architektury:


docs/architecture.png
docs/architecture.mmd


---

## Wdrożenie w chmurze (Artefakt 6)

Aplikacja została wdrożona w środowisku Microsoft Azure.

### Wykorzystane usługi:

- App Service (Frontend – Next.js)  
- App Service (Backend – .NET API)  
- Azure SQL Database  

### Schemat działania:

Użytkownik (przeglądarka)  
→ Frontend (Azure App Service)  
→ Backend API (.NET)  
→ Azure SQL Database  

### Zalety wdrożenia:

- dostęp do aplikacji przez Internet  
- brak potrzeby lokalnej instalacji  
- skalowalność systemu  
- integracja z usługami chmurowymi  

---

## Środowisko wielokontenerowe (lokalne)

Projekt może być uruchamiany lokalnie przy użyciu Docker Compose.

### Kontenery:

| Kontener             | Opis                  |
|----------------------|----------------------|
| taskmanager-frontend | aplikacja frontendowa |
| taskmanager-backend  | REST API (.NET)       |
| taskmanager-database | SQL Server            |

---

## Uruchomienie projektu (lokalnie)

W katalogu głównym projektu:

```bash
docker compose up --build
Dostęp do aplikacji
Lokalnie:

Frontend:

http://localhost:8080

Backend API:

http://localhost:8081

Swagger:

http://localhost:8081/swagger
W chmurze:

Frontend:

https://<twoja-aplikacja>.azurewebsites.net

Backend:

https://<twoje-api>.azurewebsites.net
Zarządzanie kontenerami

Zatrzymanie:

docker compose down

Restart:

docker compose up

Status:

docker compose ps

Logi:

docker compose logs
Endpointy API
Pobranie wszystkich zadań
GET /api/tasks
Pobranie zadania po ID
GET /api/tasks/{id}
Dodanie zadania
POST /api/tasks

Przykład:

curl -X POST http://localhost:8081/api/tasks \
-H "Content-Type: application/json" \
-d "{\"title\":\"Test\",\"description\":\"Opis\"}"
Aktualizacja zadania
PUT /api/tasks/{id}
Usunięcie zadania
DELETE /api/tasks/{id}
DTO i stabilność API

Zastosowano warstwę DTO (TaskReadDto), dzięki czemu:

backend nie zwraca bezpośrednio encji bazy danych
zwiększone jest bezpieczeństwo
możliwe są zmiany w bazie bez wpływu na API
Migracje bazy danych

Tworzenie migracji:

dotnet ef migrations add InitialCreate

Zastosowanie migracji:

dotnet ef database update

Folder migracji:

backend/Migrations
Trwałość danych (Docker Volume)

Zastosowano named volume:

volumes:
  dbdata:

Dzięki temu dane nie są tracone po restarcie kontenerów.

Struktura projektu
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
Testowanie API

API można testować przy użyciu:

Swagger UI
Postman
curl

Swagger:

http://localhost:8081/swagger
Podsumowanie

Projekt przedstawia kompletną aplikację CRUD działającą w architekturze trójwarstwowej oraz wdrożoną w środowisku chmurowym.

Zaimplementowano:

frontend (Next.js)
backend REST API (.NET)
bazę danych SQL Server / Azure SQL
środowisko Docker
wdrożenie w chmurze (Azure)