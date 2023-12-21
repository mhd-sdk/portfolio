import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';

export const App = (): JSX.Element => {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
