-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-07-2025 a las 00:02:57
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`id`, `username`, `password_hash`, `role`, `created_at`, `last_login`, `is_active`) VALUES
(1, 'admin', '$2b$12$PQ3mpkjnDeeyYrNn/M8pRe8iTcCy0sgcPkTKTMcu2sa0PxJYMiyvq', 'admin', '2025-07-11 10:57:55', '2025-07-16 07:17:39', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Comidas'),
(2, 'Congelados'),
(3, 'Enteros'),
(4, 'Filetes'),
(5, 'Frescos'),
(6, 'Mariscos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `stock` tinyint(1) DEFAULT 1,
  `cantidad_stock` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `imagen`, `descripcion`, `stock`, `cantidad_stock`) VALUES
(1, 'Filet de Gatuzo', 1800.00, 'https://don-antonio.com.ar/wp-content/uploads/2024/03/IMG_4430-scaled-1.jpg', 'Filetes de gatuzo, un pescado blanco suave perfecto para empanadas o guisos. ', 1, 150),
(2, 'Filet de Lenguado', 1600.00, 'https://acdn-us.mitiendanube.com/stores/001/055/802/products/lenguado-importado-congelado-copia-278fdc4a04019ce7f916588562748933-640-0.jpg', 'Filetes de lenguado de textura fina y sabor delicado, listos para cocinar.', 1, 100),
(3, 'Filet de Salmón Rosado', 1500.00, 'https://acdn-us.mitiendanube.com/stores/091/544/products/lomo-salmon-rosado-61-3f5b11938ac250508115674488668704-1024-1024.jpg', 'Salmón rosado de alta calidad, rico en Omega-3, ideal para la parrilla.', 1, 500),
(4, 'Filet de Abadejo', 250.00, '/../../Imagenes/cangrejo.jpg', 'Filetes de abadejo, un pescado blanco sabroso y versátil para distintas recetas.', 1, 100),
(5, 'Filet de Pez Angel (pollo de mar)', 1800.00, '/../../Imagenes/pulpo.jpg', 'Conocido como pollo de mar, este pez ofrece carne tierna y sabrosa.', 1, 498),
(6, 'Filet de Pez Gallo', 50.00, '../../Imagenes/almejas.jpg', 'Filetes de pez gallo con carne firme, ideales para freír o al horno.', 1, 0),
(7, 'Filet de Trucha', 75.00, '../../Imagenes/mejillones.jpg', 'Trucha fresca con excelente sabor, rica en nutrientes esenciales.', 1, 0),
(8, 'Filet de Merluza ( Rebozado )', 80.00, '../../Imagenes/ostras.jpg', 'Merluza rebozada, lista para freír y disfrutar como plato rápido.', 1, 0),
(9, 'Filet de Merluza ( Rebozado sin Sal )', 120.00, '../../Imagenes/salmon.jpg', 'Merluza rebozada sin sal, opción ideal para dietas bajas en sodio.', 1, 0),
(10, 'Filet de Brotola ( Rebozado )', 110.00, '../../Imagenes/trucha.jpg', 'Brotola rebozada, de textura firme y sabor suave, perfecta para niños.', 1, 0),
(11, 'Lomos de Brótola ( Rebozado )', 130.00, '../../Imagenes/atun.jpg', 'Lomos de brótola listos para cocinar, con rebozado crujiente.', 1, 0),
(12, 'Cornalitos', 90.00, '../../Imagenes/bacalao.jpg', 'Pescaditos pequeños ideales para freír como aperitivo crocante.', 1, 0),
(13, 'Rabas', 140.00, '../../Imagenes/dorada.jpg', 'Aros de calamar rebozados, perfectos para picadas o entradas.', 1, 0),
(14, 'Molido De Merluza', 160.00, '../../Imagenes/lubina.jpg', 'Merluza molida lista para preparar hamburguesas o albóndigas.', 1, 0),
(15, 'Corvina', 170.00, '/logo.png', 'Pescado blanco de carne firme y sabor suave, ideal para cocinar al horno o a la parrilla.', 1, 0),
(16, 'Mero', 170.00, '/logo.png', 'Pescado de carne compacta y sabor delicado, excelente para preparaciones gourmet.', 1, 0),
(17, 'Lisa', 170.00, '/logo.png', 'Pescado de río de sabor característico, muy utilizado en platos tradicionales.', 1, 0),
(18, 'Salmon Blanco', 170.00, '/logo.png', 'Variedad de salmón de carne clara y textura tierna, ideal para cocinar al horno o a la plancha.', 1, 0),
(19, 'Abadejo', 170.00, '/logo.png', 'Pescado de carne magra y sabor suave, perfecto para empanados o guisos marinos.', 1, 0),
(20, 'Chernia', 170.00, '/logo.png', 'Pescado firme de sabor intenso, muy apreciado en la cocina por su calidad.', 1, 0),
(21, 'Palometa', 170.00, '/logo.png', 'Pescado azul de carne sabrosa, excelente para la parrilla o el horno.', 1, 0),
(22, 'Anchoa', 170.00, '/logo.png', 'Pescado pequeño y sabroso, ideal para conservas, pizzas y ensaladas.', 1, 0),
(23, 'Pescadilla', 170.00, '/logo.png', 'Pescado blanco de textura suave, perfecto para frituras y milanesas.', 1, 0),
(24, 'Gatuzo ( Lomo De Atun )', 170.00, '/logo.png', 'Filete de gatuzo con sabor similar al atún, ideal para plancha o empanado.', 1, 0),
(25, 'Pez Pavo', 170.00, '/logo.png', 'Pescado de carne blanca y sabor neutro, fácil de cocinar y combinar con salsas.', 1, 0),
(26, 'Merluza', 170.00, '/logo.png', 'Uno de los pescados más consumidos, carne blanda y muy versátil en la cocina.', 1, 0),
(27, 'Trucha ( Despinada )', 170.00, '/logo.png', 'Trucha sin espinas, lista para cocinar a la plancha, al horno o en papillote.', 1, 0),
(28, 'Sabalo', 170.00, '/logo.png', 'Pescado de río tradicional, de carne sabrosa, ideal para la parrilla.', 1, 0),
(29, 'Filet de Brotola', 170.00, '/logo.png', 'Filete de brótola, carne blanca y textura blanda, ideal para empanados.', 1, 0),
(30, 'Boga', 170.00, '/logo.png', 'Pescado de río muy popular, ideal para asar o cocinar al horno.', 1, 0),
(31, 'Pati', 170.00, '/logo.png', 'Pescado de carne suave y sabor delicado, común en la cocina casera.', 1, 0),
(32, 'Dorado', 170.00, '/logo.png', 'Pescado muy apreciado por su carne firme y sabrosa, ideal para la parrilla.', 1, 0),
(33, 'Surubi', 170.00, '/logo.png', 'Pescado típico del litoral argentino, excelente para cocinar en rodajas.', 1, 0),
(34, 'Pacu', 170.00, '/logo.png', 'Pescado de carne rosada, sabrosa y con alto contenido graso, ideal para la parrilla.', 1, 0),
(35, 'Calamares', 170.00, '/logo.png', 'Molusco muy utilizado en cocina, ideal para preparar rabas, guisos y cazuelas.', 1, 0),
(36, 'Salmon Blanco ( Rodajas )', 170.00, '/logo.png', 'Rodajas de salmón blanco, listas para cocinar al horno, a la parrilla o en guisos.', 1, 0),
(37, 'Atun Nacional ( Rodajas )', 170.00, '/logo.png', 'Rodajas de atún fresco, carne firme y sabrosa, perfectas para grill o plancha.', 1, 0),
(38, 'Pati ( Rodajas )', 170.00, '/logo.png', 'Rodajas de pati, pescado de río con carne blanda, ideal para preparar al horno.', 1, 0),
(39, 'Surubi ( Rodajas )', 170.00, '/logo.png', 'Rodajas de surubí, listas para cocinar a la parrilla, en cazuela o al horno.', 1, 0),
(40, 'Abadejo ( Rodajas )', 170.00, '/logo.png', 'Rodajas de abadejo, carne blanca y delicada, excelentes para preparaciones suaves.', 1, 0),
(41, 'Camarones Pelados Cocidos', 170.00, '/logo.png', 'Camarones listos para consumir, perfectos para ensaladas, pastas o salteados.', 1, 0),
(42, 'Langostinos Pelados Cocidos', 170.00, '/logo.png', 'Langostinos cocidos y pelados, ideales para entradas, arroces y platos fríos.', 1, 0),
(43, 'Mejillones Pelados Cocidos', 170.00, '/logo.png', 'Mejillones cocidos sin cáscara, listos para cazuelas, arroces o salsas.', 1, 0),
(44, 'Berberechos Pelados Cocidos', 170.00, '/logo.png', 'Mariscos cocidos, listos para consumir en tapas, ensaladas o paellas.', 1, 0),
(45, 'Vieyras Peladas Cocidas', 170.00, '/logo.png', 'Vieiras listas para consumir, suaves y sabrosas, ideales para entradas gourmet.', 1, 0),
(46, 'Langostinos Enteros Cocidos', 170.00, '/logo.png', 'Langostinos cocidos con cáscara, perfectos para platos principales o picadas.', 1, 0),
(47, 'Mejillones Con Cascara Cocido', 170.00, '/logo.png', 'Mejillones cocidos en su cáscara, ideales para cazuelas y presentaciones elegantes.', 1, 0),
(48, 'Cazuelas Cocidas', 170.00, '/logo.png', 'Mezcla de mariscos cocidos, lista para calentar y servir como guiso o entrada.', 1, 0),
(49, 'Calamaretis', 170.00, '/logo.png', 'Pequeños calamares tiernos, ideales para salteados, guisos o fritos.', 1, 0),
(50, 'Kanikama', 170.00, '/logo.png', 'Bastones de surimi sabor cangrejo, perfectos para ensaladas o sushi.', 1, 0),
(51, 'Kanikama Ahumado', 170.00, '/logo.png', 'Kanikama con sabor ahumado, ideal para picadas o acompañamientos fríos.', 1, 0),
(52, 'Kanikama Familiar', 170.00, '/logo.png', 'Presentación familiar de kanikama, ideal para compartir o preparar múltiples platos.', 1, 0),
(53, 'Salmon Rosado Ahumado', 170.00, '/logo.png', 'Salmón rosado ahumado, ideal para canapés, ensaladas o platos gourmet.', 1, 0),
(54, 'Tinta Calamar', 170.00, '/logo.png', 'Tinta natural de calamar, utilizada para arroces, pastas o platos gourmet.', 1, 0),
(55, 'Pulpo Español', 170.00, '/logo.png', 'Pulpo cocido de excelente calidad, ideal para preparar a la gallega o en ensaladas.', 1, 0),
(56, 'Trillas Limpias', 170.00, '/logo.png', 'Trillas listas para cocinar, ideales para frituras o preparaciones al horno.', 1, 0),
(57, 'Hamburguesas Sin Sal Naturales', 170.00, '/logo.png', 'Hamburguesas de pescado sin sal añadida, saludables y listas para cocinar.', 1, 0),
(58, 'Hamburguesas Rebozadas De Merluza', 170.00, '/logo.png', 'Hamburguesas de merluza con cobertura crocante, ideales para horno o fritura.', 1, 0),
(59, 'Hamburguesas Rebozadas De Merluza Con Espinaca', 170.00, '/logo.png', 'Hamburguesas de merluza y espinaca, rebozadas y listas para cocinar.', 1, 0),
(60, 'Hamburguesas De Merluza Crocantes', 170.00, '/logo.png', 'Hamburguesas crocantes de merluza, ideales para preparar en minutos.', 1, 0),
(61, 'Langostinos Rebozados', 170.00, '/logo.png', 'Langostinos con cobertura crujiente, listos para freír o llevar al horno.', 1, 0),
(62, 'Rabas Rebozadas', 170.00, '/logo.png', 'Aros de calamar rebozados, clásicos para fritura, crocantes y sabrosos.', 1, 0),
(63, 'Merluza', 170.00, '/logo.png', 'Clásico filet de merluza, versátil y nutritivo, ideal para diversas preparaciones.', 1, 0),
(201128, 'Filet de Merluza', 150.00, 'https://www.lagus.com.ar/wp-content/uploads/2021/03/06f3b91b-8978-490c-a748-239e4f9c9f5d.jpg', 'Filetes de merluza frescos, ideales para preparar a la plancha o al horno.', 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_categoria`
--

CREATE TABLE `producto_categoria` (
  `producto_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `producto_categoria`
--

INSERT INTO `producto_categoria` (`producto_id`, `categoria_id`) VALUES
(1, 2),
(1, 4),
(1, 5),
(2, 2),
(2, 3),
(3, 4),
(3, 5),
(3, 6),
(4, 2),
(4, 3),
(4, 4),
(5, 3),
(5, 4),
(5, 5),
(6, 5),
(7, 4),
(7, 5),
(8, 1),
(8, 2),
(9, 1),
(10, 1),
(11, 1),
(12, 6),
(13, 1),
(13, 6),
(14, 2),
(15, 3),
(15, 5),
(16, 3),
(16, 5),
(17, 3),
(17, 5),
(18, 5),
(19, 2),
(19, 3),
(20, 3),
(20, 5),
(21, 3),
(21, 5),
(22, 3),
(22, 5),
(23, 3),
(23, 5),
(24, 3),
(24, 5),
(25, 3),
(25, 5),
(26, 3),
(26, 5),
(27, 3),
(27, 5),
(28, 3),
(28, 5),
(29, 3),
(29, 5),
(30, 3),
(30, 5),
(31, 3),
(31, 5),
(32, 3),
(32, 5),
(33, 3),
(33, 5),
(34, 3),
(34, 5),
(35, 3),
(35, 5),
(36, 3),
(36, 5),
(37, 3),
(37, 5),
(38, 3),
(38, 5),
(39, 3),
(39, 5),
(40, 3),
(40, 5),
(41, 3),
(41, 5),
(42, 3),
(42, 5),
(43, 3),
(43, 5),
(44, 3),
(44, 5),
(45, 3),
(45, 5),
(46, 3),
(46, 5),
(47, 3),
(47, 5),
(48, 3),
(48, 5),
(49, 3),
(49, 5),
(50, 3),
(50, 5),
(51, 3),
(51, 5),
(52, 3),
(52, 5),
(53, 3),
(53, 5),
(54, 3),
(54, 5),
(55, 3),
(55, 5),
(56, 3),
(56, 5),
(57, 3),
(57, 5),
(58, 3),
(58, 5),
(59, 3),
(59, 5),
(60, 3),
(60, 5),
(61, 3),
(61, 5),
(62, 3),
(62, 5),
(63, 3),
(63, 5),
(201128, 2),
(201128, 5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto_categoria`
--
ALTER TABLE `producto_categoria`
  ADD PRIMARY KEY (`producto_id`,`categoria_id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto_categoria`
--
ALTER TABLE `producto_categoria`
  ADD CONSTRAINT `producto_categoria_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `producto_categoria_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
