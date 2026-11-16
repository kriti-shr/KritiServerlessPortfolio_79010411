import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import VerifyEmail from "./pages/VerifyEmail";

import "./App.css";


function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/portfolio"
                        element={<Portfolio />}
                    />

                    <Route
                        path="/blog"
                        element={<Blog />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route path="/verify-email" element={<VerifyEmail />} />

                    <Route
                        path="/create-post"
                        element={<CreatePost />}
                    />

                </Routes>

            </main>

            <Footer />

        </BrowserRouter>
    );
}

export default App;