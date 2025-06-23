import React, { useState } from "react";

export default function Provedores() {
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    // Aquí podrías enviar el formulario a tu backend o servicio de email
  };

  return (
    <div className="provedores-container" style={{
      background: "var(--color-principal)",
      color: "var(--color-secundario)",
      minHeight: "100vh",
      padding: "2rem 0"
    }}>
      <div style={{
        maxWidth: 800,
        margin: "0 auto",
        background: "var(--color-principal)",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "2rem"
      }}>
        <h1 style={{ color: "var(--color-secundario)", marginBottom: "1rem" }}>
          Servicio de Proveedores
        </h1>
        <p style={{ fontSize: "1.15rem", marginBottom: "1.5rem" }}>
          En <strong>Pescadería Puerto Argentino</strong> somos proveedores confiables para escuelas, restaurantes, comedores, hoteles, clubes y todo tipo de instituciones. Nos especializamos en la entrega de productos frescos y congelados de la más alta calidad, adaptándonos a las necesidades de cada cliente institucional.
        </p>
        <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.2rem" }}>
          <li>✔️ Entregas puntuales y programadas</li>
          <li>✔️ Productos frescos, congelados y elaborados</li>
          <li>✔️ Asesoramiento personalizado</li>
          <li>✔️ Cumplimiento de normas de seguridad e higiene</li>
          <li>✔️ Facturación y documentación para instituciones</li>
        </ul>
        <p style={{ fontWeight: 500, marginBottom: "2rem" }}>
          Si representás una institución y buscás un proveedor serio, profesional y con trayectoria, contactanos. Nos comprometemos a brindar un servicio eficiente y a la altura de tus expectativas.
        </p>

        <h2 style={{ color: "var(--color-acento)", marginBottom: "1rem" }}>Contacto para Instituciones</h2>
        {enviado ? (
          <div style={{
            background: "var(--color-acento)",
            color: "var(--color-principal)",
            padding: "1rem",
            borderRadius: 8,
            textAlign: "center"
          }}>
            ¡Gracias por contactarnos! Nos comunicaremos a la brevedad.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre y Apellido"
              value={form.nombre}
              onChange={handleChange}
              required
              style={{
                padding: "0.7rem",
                borderRadius: 6,
                border: "1px solid var(--color-secundario)",
                fontSize: "1rem"
              }}
            />
            <input
              type="text"
              name="empresa"
              placeholder="Institución / Empresa"
              value={form.empresa}
              onChange={handleChange}
              required
              style={{
                padding: "0.7rem",
                borderRadius: 6,
                border: "1px solid var(--color-secundario)",
                fontSize: "1rem"
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                padding: "0.7rem",
                borderRadius: 6,
                border: "1px solid var(--color-secundario)",
                fontSize: "1rem"
              }}
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleChange}
              style={{
                padding: "0.7rem",
                borderRadius: 6,
                border: "1px solid var(--color-secundario)",
                fontSize: "1rem"
              }}
            />
            <textarea
              name="mensaje"
              placeholder="¿En qué podemos ayudarte?"
              value={form.mensaje}
              onChange={handleChange}
              rows={4}
              required
              style={{
                padding: "0.7rem",
                borderRadius: 6,
                border: "1px solid var(--color-secundario)",
                fontSize: "1rem"
              }}
            />
            <button
              type="submit"
              style={{
                background: "var(--color-acento)",
                color: "var(--color-principal)",
                border: "none",
                borderRadius: 8,
                padding: "0.8rem",
                fontWeight: 700,
                fontSize: "1.1rem",
                cursor: "pointer",
                marginTop: "0.5rem"
              }}
            >
              Enviar consulta
            </button>
          </form>
        )}
        <div style={{ marginTop: "2rem", color: "var(--color-secundario)", fontSize: "1rem" }}>
          <strong>Teléfono:</strong> 123-456-7890<br />
          <strong>Email:</strong> provedores@puertoargentino.com<br />
          <strong>Dirección:</strong> Salta 28, General Pacheco, Buenos Aires
        </div>
      </div>
    </div>
  );
}