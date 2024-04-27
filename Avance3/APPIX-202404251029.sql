-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: APPIX
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `DEPARTAMENTO`
--

DROP TABLE IF EXISTS `DEPARTAMENTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DEPARTAMENTO` (
  `nombre` varchar(15) NOT NULL,
  PRIMARY KEY (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DEPARTAMENTO`
--

LOCK TABLES `DEPARTAMENTO` WRITE;
/*!40000 ALTER TABLE `DEPARTAMENTO` DISABLE KEYS */;
/*!40000 ALTER TABLE `DEPARTAMENTO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROYECTO`
--

DROP TABLE IF EXISTS `PROYECTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PROYECTO` (
  `id_proyecto` int(11) NOT NULL AUTO_INCREMENT,
  `id_manager` int(11) NOT NULL,
  `departamento` varchar(15) NOT NULL,
  `empresa` varchar(15) NOT NULL,
  `nombre_proyecto` varchar(30) NOT NULL,
  `presupuesto` bigint(20) NOT NULL,
  `f_creacion` date NOT NULL,
  `f_fin` date NOT NULL,
  `encargado` varchar(30) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  PRIMARY KEY (`id_proyecto`),
  KEY `id_manager` (`id_manager`),
  KEY `departamento` (`departamento`),
  CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`id_manager`) REFERENCES `USUARIO` (`id_usuario`),
  CONSTRAINT `proyecto_ibfk_2` FOREIGN KEY (`departamento`) REFERENCES `DEPARTAMENTO` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROYECTO`
--

LOCK TABLES `PROYECTO` WRITE;
/*!40000 ALTER TABLE `PROYECTO` DISABLE KEYS */;
/*!40000 ALTER TABLE `PROYECTO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RIESGO`
--

DROP TABLE IF EXISTS `RIESGO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RIESGO` (
  `id_riesgo` int(11) NOT NULL AUTO_INCREMENT,
  `id_proyecto` int(11) NOT NULL,
  `categoria` int(11) NOT NULL,
  `impacto` int(11) NOT NULL,
  `probabilidad` int(11) NOT NULL,
  `estrategia_m` varchar(65) NOT NULL,
  `description` varchar(65) NOT NULL,
  PRIMARY KEY (`id_riesgo`,`id_proyecto`),
  KEY `id_proyecto` (`id_proyecto`),
  CONSTRAINT `riesgo_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `PROYECTO` (`id_proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RIESGO`
--

LOCK TABLES `RIESGO` WRITE;
/*!40000 ALTER TABLE `RIESGO` DISABLE KEYS */;
/*!40000 ALTER TABLE `RIESGO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TRABAJAN`
--

DROP TABLE IF EXISTS `TRABAJAN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TRABAJAN` (
  `id_empleados` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  PRIMARY KEY (`id_empleados`,`id_proyecto`),
  KEY `id_proyecto` (`id_proyecto`),
  CONSTRAINT `trabajan_ibfk_1` FOREIGN KEY (`id_empleados`) REFERENCES `USUARIO` (`id_usuario`),
  CONSTRAINT `trabajan_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `PROYECTO` (`id_proyecto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TRABAJAN`
--

LOCK TABLES `TRABAJAN` WRITE;
/*!40000 ALTER TABLE `TRABAJAN` DISABLE KEYS */;
/*!40000 ALTER TABLE `TRABAJAN` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USUARIO`
--

DROP TABLE IF EXISTS `USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USUARIO` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(30) NOT NULL,
  `apellido_m` varchar(15) DEFAULT NULL,
  `apellido_p` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO`
--

LOCK TABLES `USUARIO` WRITE;
/*!40000 ALTER TABLE `USUARIO` DISABLE KEYS */;
/*!40000 ALTER TABLE `USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'APPIX'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-26  3:22:18

INSERT INTO `USUARIO` (`nombres`, `apellido_m`, `apellido_p`) VALUES
('Miguel Angel', 'Esquivel', 'Uribe'),
('Jaime', 'Ruiz', 'Trujillo'),
('Sofia', 'Suarez', 'Osorio'),
('Mariana', 'Ramirez', 'Juarez'),
('Roberto', 'Castro', 'Serna'),
('Emiliano', 'Lara', 'Valdivia'),
('Erick', 'Ortiz', 'Pérez'),
('Santiago', 'Jiménez', 'Rosales'),
('Javier', 'Rojo', 'Ortiz'),
('Martín', 'Samperio', 'Aldama'),
('Diana', 'Hierro', 'Gonzalez'),
('Luis', 'Rios', 'Calderón'),
('Ángel', 'Nieto', 'Macías'),
('Carlos', 'Salas', 'Martínez'),
('Álvaro', 'Casas', 'Alarcón'),
('Silvia', 'Castillo', 'Esquivel'),
('Jesús', 'Pineda', 'Coronado'),
('Gretta', 'Valenzuela', 'Preciado'),
('Ulises', 'Pérez', 'Gama'),
('Juana', 'Vizuet', 'López');

INSERT INTO `DEPARTAMENTO` (`nombre`) VALUES
('Diseño'),
('Desarrollo');

INSERT INTO `PROYECTO` (`id_manager`,`descripcion`, `empresa`, `nombre_proyecto`,`presupuesto`,`f_creacion`,`f_fin`,`encargado`,`departamento`) VALUES
(5,'Se renovará el portal de ventas de la página web existente ', 'Dormimundo', 'Portal Ventas','150000','2024-04-05','2024-06-13','José Pérez Martínez','Desarrollo'),
(5,'Se creará una página web para la empresa ', 'Bachoco', 'Bachoco página','200000','2024-01-05','2024-02-7','Alfonso López Ruiz','Diseño'),
(5,'Se implementarán medidas de seguridad para la página de la empresa ', 'Coppel', 'Seguridad Coppel','3000000','2024-04-20','2024-08-30','Miguel Salinas Muñoz','Desarrollo'),
(5,'Se crearán bases de datos para maejar información de la empresa ', 'ITESM', 'BD - ITESM','1500000','2024-03-15','2024-07-28','Eugenio Garza Salazar','Desarrollo'),
(5,'Plataforma de administración logística y de comunicación interna ', 'Pollo Brujo', 'Logística - Pollo','200000','2024-04-05','2024-06-13','Luis Férnandez Nieto','Desarrollo'),
(5,'Plataforma para entrega de tareas en preparatorias públicas', 'SEP', 'Plataforma Educativa','50000000','2024-02-12','2024-10-17','Alberto Soto Sandoval','Desarrollo'),
(5,'Plataforma para crear y administrar tiendas en linea ', 'Google', 'Plataforma de e-commerce','30000000','2024-01-05','2025-11-23','Michael Johnson','Desarrollo'),
(12,'Aplicación para enviar mensajes de voz, texto, imágen, entre otros ', 'InstaMsg', 'Aplicación Mensajeria','500000','2024-01-05','2024-03-25','Oscar Alvarado Pérez','Desarrollo'),
(12,'Diseño centrandose en la accesibilidad y satisfacción del usuario ', 'Facebook', 'Diseño de UX','1000000','2024-04-01','2024-06-09','Mark Zuckerberg','Diseño'),
(12,'Diseño que permita a los usuarios interactuar con sistemas informáticos ', 'Optiplat', 'Diseño de UI','100000','2024-04-22','2024-05-15','Emmanuel Soliz Vargas','Diseño'),
(12,'Creación de identidad que refleje personalidad y propósito ', 'TreeDesign', 'Diseño de Identidad','220000','2023-11-05','2023-12-06','Sofía Alvarado Juárez','Diseño'),
(12,'Plataforma que permite al usuario crear, administrar y publicar contenido. ', 'Stardeos', 'Sistema de Contenidos','400000','2022-03-05','2022-11-14','Daniel Santomé Lemus','Desarrollo'),
(18,'Plataforma que permite a usuarios reservar servicios en un restaurante ', 'Lechuguini', 'Sistema de Citas','120000','2023-06-28','2023-08-06','Leobardo Alcocer Téllez','Desarrollo'),
(18,'Herramientas de planificación y organización de proyectos ', 'Sq2Cons', 'Aplicación de gestión','80000','2023-09-25','2023-12-21','David Pineda Ramírez','Desarrollo'),
(18,'Aplicación para conectar a egresados con posibles empleadores ', 'WorConnect', 'Aplicación laboral','75000','2023-06-01','2024-08-17','Humberto Mujica Rojas','Desarrollo'),
(18,'Página para agendar citas en oficinas ', 'AdminServ', 'Portal de Citas','80000','2022-05-17','2022-06-18','Eduardo Alatorre Hernández','Desarrollo'),
(18,'Portal para administrar bases de datos de manera simplificada ', 'ITeach', 'Manipulador DB','60000','2022-08-30','2022-10-17','Fernando Flores Alamilla','Desarrollo'),
(5,'Página para agendar mantenimientos para máquinas registradoras ', 'RegisterSell', 'Página mantenimientos','45000','2022-03-22','2022-04-10','Manuel Hernández Sabina','Desarrollo'),
(5,'Plataforma de inscipcion de alumnos a una escuela ', 'Col Makarenko', 'Plataforma inscripciones','90000','2023-02-27','2023-04-03','Mauricio Patiño Puga','Desarrollo'),
(5,'Aplicación para rastrear rutas de proveedores ', 'Const Ortiz', 'Aplicación rutas','73000','2023-06-12','2024-08-23','Romualdo Ortiz Ortiz','Desarrollo');

INSERT INTO `TRABAJAN`(`id_empleados`,`id_proyecto`) VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(5,2),
(6,2),
(7,2),
(8,3),
(9,3),
(10,4),
(11,4),
(12,4),
(13,5),
(14,5),
(16,5),
(17,5),
(18,6),
(19,6),
(1,7),
(2,7),
(3,8),
(4,8),
(5,8),
(6,9),
(7,9),
(8,9),
(9,10),
(10,10),
(11,11),
(12,11),
(13,11),
(14,11),
(16,12),
(17,12),
(18,12),
(19,13),
(1,14),
(2,14),
(3,14),
(4,15),
(5,15),
(6,16),
(7,16),
(8,16),
(9,17),
(10,17),
(11,17),
(12,18),
(13,18),
(14,18),
(15,18),
(16,19),
(17,19),
(18,19),
(19,20);

INSERT INTO `RIESGO` (`id_proyecto`,`description`, `categoria`, `probabilidad`,`impacto`,`estrategia_m`) VALUES
(1,'Incomprensión de los requisitos del cliente ', '1', '2','3','Realizar reuniones detalladas con el cliente'),
(2,'Retrasos en la entrega del contenido ', '2', '2','2','Establecer plazos claros y roles para entrega de contenido.'),
(3,'Cambios frecuentes en el diseño  ', '1', '2','2','Definir un alcance claro y limitar las revisiones del diseño.'),
(4,'Problemas de compatibilidad de plugins ', '3', '1','3','Realizar pruebas de compatibilidad al inicio.'),
(5,'Problemas de seguridad en el sitio web  ', '3', '1','3','Aplicar estándares de seguridad y realizar actualizaciones.'),
(6,'Fallos en la integración de pasarelas de pago ', '3', '2','3','Validar integraciones y tener proveedores de respaldo.'),
(7,'Aumento inesperado en los costos del proyecto ', '4', '1','2','Monitorear y ajustar el presupuesto continuamente.'),
(8,'Pérdida de datos o fallo de hosting  ', '3', '1','3','Estrategias de respaldo y recuperación ante desastres.'),
(9,'Retrasos en la aprobación del cliente ', '2', '2','2','Establecer expectativas y procesos claros de aprobación.'),
(10,'Dificultades técnicas con WordPress o WooCommerce ', '3', '2','2','Mantenerse actualizado con las últimas versiones y soporte.'),
(11,'Sobrecarga de trabajo del equipo de diseño ', '5', '2','3','Gestionar la carga de trabajo y los recursos adecuadamente'),
(12,'Falta de experiencia en tecnologías específicas ', '3', '2','3','Capacitar al equipo o contratar talento especializado'),
(13,'Inadecuada gestión del cambio ', '1', '3','3','Implementar un sistema estructurado de gestión de cambios.'),
(14,'Interrupciones en la cadena de suministro digital ', '4', '1','2','Tener alternativas y planes de contingencia.'),
(15,'Problemas de SEO y visibilidad en buscadores ', '3', '2','2','Aplicar técnicas SEO desde el inicio del proyecto'),
(16,'Cambio de persona responsable durante y despues del proyecto  ', '5', '2','3','Crear planes de transición por si pasa esto'),
(17,'Cambios en los requisitos del software', '1', '3','3','Mantener un proceso de gestión de cambios robusto'),
(18,'Falta de recursos técnicos', '4', '2','3','Asegurar disponibilidad de recursos y personal cualificado.'),
(19,'Problemas técnicos y bugs en el desarrollo', '3', '3','2','Implementar pruebas exhaustivas y QA constante.'),
(20,'Tecnología obsoleta o inadecuada ', '3', '1','3','Realizar auditorías tecnológicas y actualizaciones regulares.');