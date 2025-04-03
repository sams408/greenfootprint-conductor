
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Clean render without any badge-related code
createRoot(document.getElementById("root")!).render(<App />);
