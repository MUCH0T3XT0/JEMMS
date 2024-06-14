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
INSERT INTO `DEPARTAMENTO` VALUES ('Desarrollo'),('Diseño');
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
  `id_lider` int(11) DEFAULT NULL,
  `departamento` varchar(15) NOT NULL,
  `empresa` varchar(15) NOT NULL,
  `nombre_proyecto` varchar(30) NOT NULL,
  `presupuesto` bigint(20) NOT NULL,
  `f_creacion` date NOT NULL,
  `f_fin` date NOT NULL,
  `encargado` varchar(30) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `estatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_proyecto`),
  KEY `id_manager` (`id_lider`),
  KEY `departamento` (`departamento`),
  CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`id_lider`) REFERENCES `USUARIO` (`id_usuario`),
  CONSTRAINT `proyecto_ibfk_2` FOREIGN KEY (`departamento`) REFERENCES `DEPARTAMENTO` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROYECTO`
--

LOCK TABLES `PROYECTO` WRITE;
/*!40000 ALTER TABLE `PROYECTO` DISABLE KEYS */;
INSERT INTO `PROYECTO` VALUES (1,1,'Desarrollo','Tim hortons',' Portal Ventas',82,'2024-03-10','2024-08-14','Don Juanito','Se renovará el portal de ventas de la página web existente',1),(2,2,'Diseño','Bachoco','Bachoco página',200000,'2024-01-05','2024-02-07','Alfonso López Ruiz','Se creará una página web para la empresa ',0),(3,2,'Desarrollo','TEC','Portal Ventas',150000,'2024-04-05','2024-06-21','José Pérez Martínez','Se renovará el portal de ventas de la página web existente ',1),(4,1,'Desarrollo','ITESM','BD - ITESMM',1500000,'2024-03-15','2024-07-28','Eugenio Garza Salazar','Se crearán bases de datos para maejar información de la empresa ',1),(5,1,'Desarrollo','Pollo Brujo','Logística - Pollo',200000,'2024-04-05','2024-07-04','Luis Férnandez Nieto','Plataforma de administración logística y de comunicación interna ',1),(6,1,'Desarrollo','SEP','Plataforma Educativa',50000000,'2024-02-12','2024-10-17','Alberto Soto Sandoval','Plataforma para entrega de tareas en preparatorias públicas',1),(7,1,'Desarrollo','Google','Plataforma de e-commerce',30000000,'2024-09-04','2025-11-23','Michael Johnson','Plataforma para crear y administrar tiendas en linea ',0),(8,1,'Desarrollo','InstaMsg','Aplicación Mensajeria',500000,'2024-01-05','2024-03-25','Oscar Alvarado Pérez','Aplicación para enviar mensajes de voz, texto, imágen, entre otros ',0),(9,1,'Diseño','Facebook','Diseño de UX',1000000,'2024-04-01','2024-06-09','Mark Zuckerberg','Diseño centrandose en la accesibilidad y satisfacción del usuario ',0),(10,1,'Diseño','Optiplat','Diseño de UI',100000,'2024-04-22','2024-05-15','Emmanuel Soliz Vargas','Diseño que permita a los usuarios interactuar con sistemas informáticos ',0),(11,1,'Diseño','TreeDesign','Diseño de Identidad',220000,'2023-11-05','2023-12-06','Sofía Alvarado Juárez','Creación de identidad que refleje personalidad y propósito ',0),(12,1,'Desarrollo','Stardeos','Sistema de Contenidos',400000,'2022-03-05','2022-11-14','Daniel Santomé Lemus','Plataforma que permite al usuario crear, administrar y publicar contenido. ',0),(13,1,'Desarrollo','Lechuguini','Sistema de Citas',120000,'2023-06-28','2023-08-06','Leobardo Alcocer Téllez','Plataforma que permite a usuarios reservar servicios en un restaurante ',0),(14,1,'Desarrollo','Sq2Cons','Aplicación de gestión',80000,'2023-09-25','2023-12-21','David Pineda Ramírez','Herramientas de planificación y organización de proyectos ',0),(15,1,'Desarrollo','WorConnect','Aplicación laboral',75000,'2023-06-01','2024-08-17','Humberto Mujica Rojas','Aplicación para conectar a egresados con posibles empleadores ',0),(17,1,'Desarrollo','ITeach','Manipulador DB',60000,'2022-08-30','2022-10-17','Fernando Flores Alamilla','Portal para administrar bases de datos de manera simplificada ',0),(18,1,'Desarrollo','RegisterSell','Página mantenimientos',45000,'2022-03-22','2022-04-10','Manuel Hernández Sabina','Página para agendar mantenimientos para máquinas registradoras ',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RIESGO`
--

LOCK TABLES `RIESGO` WRITE;
/*!40000 ALTER TABLE `RIESGO` DISABLE KEYS */;
INSERT INTO `RIESGO` VALUES (1,1,3,3,2,'Establecer expectativas y procesos claros de aprobación.','Resolver conflictos'),(2,2,2,2,2,'Establecer plazos claros y roles para entrega de contenido.','Retrasos en la entrega del contenido '),(3,3,1,2,2,'Definir un alcance claro y limitar las revisiones del diseño.','Cambios frecuentes en el diseño  '),(5,1,2,1,2,'Aplicar estándares de seguridad y realizar actualizaciones.','Problemas de seguridad  '),(6,1,1,3,2,'Validar integraciones y tener proveedores de respaldo.','Fallos en la integración de pasarelas de pago '),(7,1,4,2,1,'Monitorear y ajustar el presupuesto continuamente.','Aumento inesperado en los costos del proyecto '),(9,1,2,2,2,'Establecer expectativas y procesos claros de aprobación.','Retrasos en la aprobación del cliente '),(10,1,3,2,2,'Mantenerse actualizado con las últimas versiones y soporte.','Dificultades técnicas con WordPress o WooCommerce '),(12,12,3,3,2,'Capacitar al equipo o contratar talento especializado','Falta de experiencia en tecnologías específicas '),(13,13,1,3,3,'Implementar un sistema estructurado de gestión de cambios.','Inadecuada gestión del cambio '),(14,14,4,2,1,'Tener alternativas y planes de contingencia.','Interrupciones en la cadena de suministro digital '),(15,15,3,2,2,'Aplicar técnicas SEO desde el inicio del proyecto','Problemas de SEO y visibilidad en buscadores '),(17,17,1,3,3,'Mantener un proceso de gestión de cambios robusto','Cambios en los requisitos del software'),(18,18,4,3,2,'Asegurar disponibilidad de recursos y personal cualificado.','Falta de recursos técnicos'),(26,7,2,3,2,'Aplicar estándares de seguridad y realizar actualizaciones.','Problemas de seguridad  '),(50,7,2,3,2,'Establecer expectativas y procesos claros de aprobación.','Retrasos en la aprobación del cliente '),(51,7,3,3,2,'Establecer expectativas y procesos claros de aprobación.','Resolver conflictos'),(52,7,4,3,1,'Monitorear y ajustar el presupuesto continuamente.','Aumento inesperado en los costos del proyecto '),(53,7,2,3,2,'Establecer expectativas y procesos claros de aprobación.','Retrasos en la aprobación del cliente '),(54,7,3,3,2,'Mantenerse actualizado con las últimas versiones y soporte.','Dificultades técnicas con WordPress o WooCommerce '),(55,7,1,3,3,'Implementar un sistema estructurado de gestión de cambios.','Inadecuada gestión del cambio '),(56,3,3,3,3,'Animar','Falta de potencial'),(59,1,4,2,1,'Monitorear y ajustar el presupuesto continuamente.','Aumento inesperado en los costos del proyecto '),(60,5,3,3,2,'Establecer expectativas y procesos claros de aprobación.','Resolver conflictos'),(65,5,1,3,3,'Implementar un sistema estructurado de gestión de cambios.','Inadecuada gestión del cambio '),(75,3,3,3,2,'Establecer expectativas y procesos claros de aprobación.','Resolver conflictos'),(80,3,2,1,2,'Aplicar estándares de seguridad y realizar actualizaciones.','Problemas de seguridad  '),(88,3,1,3,3,'Implementar un sistema estructurado de gestión de cambios.','Inadecuada gestión del cambio '),(89,7,4,2,1,'Monitorear y ajustar el presupuesto continuamente.','Aumento inesperado en los costos del proyecto '),(90,7,3,2,2,'Mantenerse actualizado con las últimas versiones y soporte.','Dificultades técnicas con WordPress o WooCommerce '),(91,7,1,3,3,'Implementar un sistema estructurado de gestión de cambios.','Inadecuada gestión del cambio '),(92,7,3,3,2,'Establecer expectativas y procesos claros de aprobación.','Resolver conflictos'),(93,7,2,2,2,'Establecer plazos claros y roles para entrega de contenido.','Retrasos en la entrega del contenido '),(103,5,0,0,0,'',''),(108,3,5,3,3,'form','Error en el formulario'),(110,3,5,3,3,'form','Error en el form'),(112,3,0,0,0,'',''),(113,3,0,0,0,'',''),(114,3,0,0,0,'',''),(115,3,0,0,0,'',''),(116,3,0,0,0,'',''),(117,3,0,0,0,'','');
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
INSERT INTO `TRABAJAN` VALUES (1,3),(2,5),(3,5);
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
  `correo` varchar(30) DEFAULT NULL,
  `contrasena` varchar(400) DEFAULT NULL,
  `rol` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO`
--

LOCK TABLES `USUARIO` WRITE;
/*!40000 ALTER TABLE `USUARIO` DISABLE KEYS */;
INSERT INTO `USUARIO` VALUES (1,'Miguel Angel','Esquivel','Uribe','mike@appix.mx','$2a$12$XHQw2tk3FcqBwAN/gLLWB.3aT1Lr9wFSdGOqHkzCmwvB8itXcML0S',0),(2,'Sofia','Tellez','Osorio','sofi@appix.mx','$2a$12$oPaLwbYutQHk38PQqLgsP.MTOXE.6Q0wB1a8I9I0TqaKvGreSiDU2',1),(3,'Emiliano','Lara','Valdi','emi@appix.mx','$2a$12$7hxLOSs4n0.IXil74N8r1u5w3Ho8GzJrNMjegSG1wThFdMQrHDab6',0),(12,'test','test','test','test@appix.mx','$2a$12$6aXC3uk56qtprjfIBFzIa.bubSJhDiyyH/eaEfRw/uQHAMls0VK0a',0);
/*!40000 ALTER TABLE `USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'APPIX'
--
/*!50003 DROP PROCEDURE IF EXISTS `cambiarEstatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`mikey`@`localhost` PROCEDURE `cambiarEstatus`()
BEGIN
	UPDATE APPIX.PROYECTO
	SET estatus = 0
	WHERE estatus = 1 AND f_fin < CURRENT_DATE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `recuperarEstatus` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`mikey`@`localhost` PROCEDURE `recuperarEstatus`()
BEGIN
	UPDATE APPIX.PROYECTO
	SET estatus = 1
	WHERE estatus = 0 AND f_creacion >= CURRENT_DATE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-13 22:01:45
