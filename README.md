# Task Manager

## Autor
Piotr Mazepka, nr albumu: 95269

## Opis projektu
Aplikacja służąca do zarządzania codziennymi zadaniami w grupie lub indywidualnie. Aplikacja zbudowana w architekturze 3 warstwowej. Użytkownik będzie mógł się zarejestrować do aplikacji, będzie mógł się do niej logować aby nie tracić postępu. Aplikacja umożliwia działania typu CRUD do tworzenia treści, modyfikacje lub usuwanie. 

## Stos technologiczny
- Frontend: Next.js
- Backend: Node.js (Express)
- Database: PostgreSQL
- Konteneryzacja: Docker + Docker Compose

## Architektura
Aplikacja oparta jest na architekturze 3-warstwowej:
- Warstwa prezentacji (Next.js)
- Warstwa aplikacyjna (Express API)
- Warstwa danych (PostgreSQL)
Diagram: `docs/architecture.png`
Kod diagramu: `docs/architecture.mmd`