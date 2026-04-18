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

Projekt został rozwinięty o wdrożenie w środowisku chmurowym oraz mechanizmy bezpieczeństwa i automatyzacji CI/CD.

---

## Funkcjonalności

System umożliwia wykonywanie operacji CRUD:

* **CREATE** – tworzenie nowych zadań
* **READ** – przeglądanie listy zadań
* **UPDATE** – edycja oraz zmiana statusu zadania
* **DELETE** – usuwanie zadań

Dodatkowo:

* zmiana statusu zadania (zakończone / aktywne)
* komunikacja frontend–backend przez REST API
* dynamiczne pobieranie danych
* nowoczesny interfejs użytkownika (Next.js)

---

## Stos technologiczny

| Warstwa        | Technologia             |
| -------------- | ----------------------- |
| Frontend       | Next.js (React)         |
| Backend        | .NET 8 Web API          |
| Baza danych    | Azure SQL / SQL Server  |
| ORM            | Entity Framework Core   |
| Konteneryzacja | Docker + Docker Compose |
| Chmura         | Microsoft Azure         |
| API            | REST                    |
| CI/CD          | GitHub Actions          |

---

## Architektura systemu

### Warstwa prezentacji

Frontend aplikacji napisany w Next.js, odpowiedzialny za interfejs użytkownika oraz komunikację z API.

### Warstwa aplikacyjna

Backend w postaci REST API (.NET), obsługujący logikę aplikacji oraz komunikację z bazą danych.

### Warstwa danych

Baza danych SQL Server / Azure SQL przechowująca dane o zadaniach.

Diagram architektury:

```
docs/architecture.png  
docs/architecture.mmd
```

---

## Wdrożenie w chmurze (Artefakt 6)

Aplikacja została wdrożona w środowisku Microsoft Azure.

### Wykorzystane usługi:

* App Service (Frontend – Next.js)
* App Service (Backend – .NET API)
* Azure SQL Database

### Schemat działania:

Użytkownik (przeglądarka)
→ Frontend (Azure App Service)
→ Backend API (.NET)
→ Azure SQL Database

---

## Zabezpieczenie aplikacji (Artefakt 7)

W ramach projektu wdrożono mechanizmy bezpieczeństwa:

* usunięcie connection stringa z kodu źródłowego
* wykorzystanie **Azure Key Vault** do przechowywania danych wrażliwych
* konfiguracja **Managed Identity** dla App Service
* integracja z Key Vault przy użyciu `DefaultAzureCredential`

Dzięki temu aplikacja nie przechowuje danych dostępowych w plikach konfiguracyjnych ani repozytorium.

---

## Testy i CI/CD (Artefakt 8)

### Test jednostkowy

Dodano projekt testowy `TaskManager.Tests` (xUnit), zawierający test:

* **NewTask_ShouldNotBeCompleted** – sprawdza, czy nowe zadanie ma domyślnie ustawione `IsCompleted = false`

Uruchomienie testów:

```bash
dotnet test
```

---

### Automatyzacja CI/CD

Zaimplementowano automatyczne wdrażanie aplikacji z wykorzystaniem:

* GitHub Actions
* Azure Deployment Center

Pipeline wykonuje:

* build aplikacji
* testy jednostkowe
* publikację aplikacji
* wdrożenie do Azure App Service

---

### Push test

Po wykonaniu zmiany w kodzie i wysłaniu jej do repozytorium:

```bash
git add .
git commit -m "test CI/CD"
git push
```

następuje automatyczne:

* uruchomienie pipeline
* wdrożenie aplikacji
* aktualizacja wersji na serwerze

---

## Środowisko wielokontenerowe (lokalne)

Projekt może być uruchamiany lokalnie przy użyciu Docker Compose.

### Kontenery:

| Kontener             | Opis                  |
| -------------------- | --------------------- |
| taskmanager-frontend | aplikacja frontendowa |
| taskmanager-backend  | REST API (.NET)       |
| taskmanager-database | SQL Server            |

---

## Uruchomienie projektu (lokalnie)

```bash
docker compose up --build
```

### Dostęp:

Frontend:
http://localhost:8080

Backend API:
http://localhost:8081

Swagger:
http://localhost:8081/swagger

---

## Endpointy API

* GET /api/tasks
* GET /api/tasks/{id}
* POST /api/tasks
* PUT /api/tasks/{id}
* DELETE /api/tasks/{id}

---

## Struktura projektu

```
taskmanager
│
├── backend
├── frontend
├── TaskManager.Tests
├── docker-compose.yml
└── README.md
```

---

## Podsumowanie

Projekt przedstawia kompletną aplikację CRUD działającą w architekturze trójwarstwowej, wdrożoną w środowisku chmurowym oraz rozszerzoną o:

* zabezpieczenie danych (Azure Key Vault)
* zarządzanie tożsamością (Managed Identity)
* testy jednostkowe
* automatyzację CI/CD

---
