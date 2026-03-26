# Команды для установки зависимостей HR CRM

## ✅ Рекомендуемый способ (все зависимости автоматически)

```bash
npm install
```

Эта команда установит все зависимости из `package.json` автоматически.

---

## Альтернативные варианты установки

### Вариант 1: Установка основных зависимостей вручную

```bash
npm install react@^18.2.0 react-dom@^18.2.0 react-router-dom@^6.21.1 @tanstack/react-table@^8.11.2 react-beautiful-dnd@^13.1.1 clsx@^2.1.0
```

### Вариант 2: Dev-зависимости вручную

```bash
npm install -D @types/react@^18.2.43 @types/react-dom@^18.2.17 @types/react-beautiful-dnd@^13.1.8 @typescript-eslint/eslint-plugin@^6.14.0 @typescript-eslint/parser@^6.14.0 @vitejs/plugin-react@^4.2.1 autoprefixer@^10.4.16 eslint@^8.55.0 eslint-plugin-react-hooks@^4.6.0 eslint-plugin-react-refresh@^0.4.5 postcss@^8.4.32 tailwindcss@^3.4.0 typescript@^5.2.2 vite@^5.0.8
```

### Вариант 3: По категориям

#### Основные зависимости React
```bash
npm install react@^18.2.0 react-dom@^18.2.0
```

#### Маршрутизация
```bash
npm install react-router-dom@^6.21.1
```

#### Таблицы и Drag & Drop
```bash
npm install @tanstack/react-table@^8.11.2 react-beautiful-dnd@^13.1.1
```

#### Утилиты
```bash
npm install clsx@^2.1.0
```

## После установки зависимостей

Запустите приложение:
```bash
npm run dev
```

Приложение откроется на http://localhost:3000
