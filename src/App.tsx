import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MyProjects } from './pages/MyProjects';
import { AboutMe } from './pages/AboutMe';
import { Contact } from './pages/Contact';

export const App = (): JSX.Element => {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AboutMe />} />
                    <Route path="/projects" element={<MyProjects />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
