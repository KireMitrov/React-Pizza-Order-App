import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Pizza from "./components/Pizza/Pizza";
import Cart from "./components/Cart/Cart";
import AdminPage from "./pages/Admin";
import OrdersPage from "./pages/Orders"
import TagManagerPage from "./pages/TagManager";



function App() {
  return (
    <div className="App">
       <Cart />
      <Navbar />
      <Routes>
        <Route path="pizza" element={<Home />}></Route>
        <Route path="pizza/:pizzaName" element={<Pizza />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path='admin' element={<AdminPage></AdminPage>}/>
        <Route path='orders' element={<OrdersPage></OrdersPage>}/>
        <Route path='tag-manager' element={<TagManagerPage></TagManagerPage>}/>
        <Route path="*" element={<Navigate to="/pizza" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
