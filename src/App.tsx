// import stuff routes & componentss here
import { createContext, useState } from "react"
import React from "react"
import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import Home from "./pages/Home"
import Store from "./pages/Store"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import "./App.css"
import ReactSwitch from "react-switch"

export const ThemeContext = React.createContext(null)

function App() {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={theme}>
        <ShoppingCartProvider>
          <Navbar />
          <ReactSwitch
            className="d-flex align-items-center"
            style={{
              visibility: "hidden",
            }}
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <Container className="mb-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Container>
        </ShoppingCartProvider>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
