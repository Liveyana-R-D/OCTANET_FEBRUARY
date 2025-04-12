import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";


function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

	const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api/contact' // for local development : 'https://starbucks-backend-4fnv.onrender.com/api/contact'; //for production render
    try {
      const res = await axios.post(apiUrl, form);

	
      alert(res.data.message);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Error submitting message");
    }
  };

//const res = await axios.post("http://localhost:5000/api/contact", form);


  const menuItems = [
    {
      title: "Hot Coffee",
      description: "Freshly brewed, smooth and aromatic.",
      image: "/images/hot-coffee.jpg",
    },
    {
      title: "Cold Brew",
      description: "Chilled to perfection with bold flavors.",
      image: "/images/cold-brew.jpg",
    },
    {
      title: "Matcha Tea",
      description: "A refreshing green tea drink.",
      image: "/images/matcha.jpg",
    },
    {
      title: "Croissant",
      description: "Flaky buttery pastry, fresh from the oven.",
      image: "/images/croissant.jpg",
    },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
        <img
          src="https://www.starbucks.in/assets/icon/logo.png"
          alt="Starbucks"
          style={{ width: "40px" }}
        />
          <a className="navbar-brand" href="/">Starbucks</a>
          <div className="ml-auto d-flex gap-3">
            <a className="nav-link text-white" href="#menu">Menu</a>
            <a className="nav-link text-white" href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="jumbotron text-center bg-light py-5">
        <h1 className="display-4">Welcome to Starbucks</h1>
        <p className="lead">Brewed for those who love coffee and connection.</p>
        <img
          src="https://www.starbucks.in/assets/icon/logo.png"
          alt="Starbucks"
          style={{ width: "120px" }}
        />
      </header>

      {/* Menu Section */}
      <section id="menu">
        <h2 className="text-center mb-4">Our Menu</h2>
        <div className="row">
          {menuItems.map((item, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img src={item.image} className="card-img-top" alt={item.title} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
          

      {/* Contact Form */}
      <section id="contact" className="container py-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
          <input
            type="text"
            name="name"
            className="form-control mb-2"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="form-control mb-2"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            className="form-control mb-2"
            placeholder="Your message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn btn-success w-100">Send</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-success text-white text-center py-3 mt-5">
        <p className="mb-0">&copy; {new Date().getFullYear()} Starbucks. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
