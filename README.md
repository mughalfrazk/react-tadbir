# Tadbir – Project Management with Kanban Board

Tadbir is a simple yet powerful project management web app that lets users manage projects, collaborate with team members, and visually track progress using a Kanban board.

## 🌟 Features

- 🔐 User Authentication (Supabase)
- 📁 Project and Task Management
- 👥 Collaborator Support (Add/Assign)
- 🏷️ Task Descriptions, Tags, and Deadlines
- 📊 Kanban Board with Custom Drag-and-Drop
- ⚡ Realtime UI updates with caching and state management

## 🧰 Tech Stack

| Layer         | Tools Used                        |
|--------------|------------------------------------|
| Frontend     | React, Vite                        |
| Drag & Drop  | [dnd-kit](https://dndkit.com/)     |
| State        | [Zustand](https://zustand-demo.pmnd.rs/) |
| Caching/Data | [React Query](https://tanstack.com/query/latest) |
| Backend      | [Supabase](https://supabase.com/) (PostgreSQL + Auth) |
| Styling      | Tailwind CSS                       |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Supabase project (set up at [supabase.com](https://supabase.com))

### 1. Clone the repository

```bash
git clone https://github.com/mughalfrazk/react-tadbir.git
cd react-tadbir
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up environment variables
Create a .env.local file in the root directory:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the development server
```
yarn run dev
```

### 🧪  Demo: [Go to App](https://tadbir-web.netlify.app/)

## 🤝 Contributing
If you’d like to contribute, feel free to fork the repo and submit a pull request.

## 📬 Feedback
Got suggestions or feature requests? Feel free to open an issue or message me on [LinkedIn](https://www.linkedin.com/in/mughalfrazk/).

## 📄 License
This project is open source and available under the MIT License.
```
Let me know if you'd like to:
- Add deployment instructions (e.g. Vercel/Netlify)
- Include preview screenshots or GIFs inline
- Add badges (tech stack, license, etc.)

Happy to help refine this further!

```