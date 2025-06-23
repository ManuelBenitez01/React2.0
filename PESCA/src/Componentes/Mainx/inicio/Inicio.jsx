import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import './Inicio.css';

const categorias = ['Congelados', 'Comidas','Mariscos', 'Filetes', 'Enteros', 'Frescos'];

export default function Inicio({ onSeleccionCategoria }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <div className="inicio-container">
        <motion.div
          className="logo"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          layout
        >
          <h1>Bienvenido a Pescadería Puerto Argentino</h1>
          <h2>donde sos parte de nuestra familia</h2>
          <p className="descripcion">
            Somos una pescadería familiar con años de experiencia ofreciendo productos frescos, congelados
            y elaborados con el mayor cuidado. Nos especializamos en pescados, mariscos, comidas listas y mucho más.
            ¡Queremos que te sientas como en casa cada vez que venís!
          </p>
          <p className="horario">
            Horario de atención: Lunes a Sábado de 9:00 a 21:00
          </p>
        </motion.div>
        
        <motion.div className="fotos-animadas" layout>
          <motion.img
            src="pedro2.jpeg"
            alt="Dueño de la pescadería"
            className="foto"
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4 }}
          />
          <motion.img
            src="/pedro.jpeg"
            alt="Producto 1"
            className="foto"
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
          />
          <motion.img
            src="/pedro1.jpeg"
            alt="Producto 2"
            className="foto"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4 }}
          />
        </motion.div>
        <h3 className="descubri">Descubrí nuestras categorías:</h3>
        <motion.div className="categorias" layout>
          <motion.div className="categorias-grid" layout>
            <motion.button
              className="btn-categoria"
              onClick={() => onSeleccionCategoria?.(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 3, delay: 0 }}
            >
              Ver todos
            </motion.button>
            {categorias.map((cat, index) => (
              <motion.button
                key={cat}
                className="btn-categoria"
                onClick={() => onSeleccionCategoria?.(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 3, delay: (index + 1) * 0.1 }}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        <h2 className="consulta">¿Tenés alguna consulta?</h2>
        <div className="contacto-container">
          <div>
            <motion.div className="contacto" layout>
              <h3>Contactanos</h3>
              <p>Teléfono: 123-456-7890</p>
              <p>WhatsApp: 123-456-7890</p>
              <p>Dirección: Salta 28, General Pacheco, Buenos Aires</p>
              <p>Email: pescaderia@puertoargentino.com</p>
            </motion.div>
            <motion.div className="redes" layout>
              <h3>Seguinos en nuestras redes sociales</h3>
              <p>Facebook: Pescadería Puerto Argentino</p>
              <a
                href="https://www.instagram.com/pescaderia.puertoargentino/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Instagram: @pescaderiapuertoargentino</p>
              </a>
            </motion.div>
          </div>
          <div>
            <h3>Nuestra Ubicacion</h3>
            <iframe
              className="mapa"
              title="Ubicación de la pescadería"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.362857232434!2d-58.6309883!3d-34.4581092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca48e379736d7%3A0x637472d9bfebba1f!2sPescadería%20y%20Marisquería%20Puerto%20Argentino!5e0!3m2!1ses-419!2sar!4v1684796254443!5m2!1ses-419!2sar"
              width="350"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2023 Pescadería Puerto Argentino. Todos los derechos reservados.</p>
        <p>Diseñado y Desarrollado por </p>
        <h2 className="nombre">Jose Manuel Benitez</h2>
      </footer>
    </>
  );
}

Inicio.propTypes = {
  onSeleccionCategoria: PropTypes.func,
};
