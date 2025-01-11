// /pages/index/index.page.tsx

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import your App component
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// The Page Component for SSR
const Page = () => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
};

// Export Page component for SSR
export { Page };