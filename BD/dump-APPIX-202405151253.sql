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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROYECTO`
--

LOCK TABLES `PROYECTO` WRITE;
/*!40000 ALTER TABLE `PROYECTO` DISABLE KEYS */;
INSERT INTO `PROYECTO` VALUES (1,1,'Desarrollo','Tim hortons','Portal Rate ',80,'2024-03-10','2024-08-14','Don Juan','Se renovará el portal de ventas de la página web existente ',1),(2,2,'Diseño','Bachoco','Bachoco página',200000,'2024-01-05','2024-02-07','Alfonso López Ruiz','Se creará una página web para la empresa ',1),(3,1,'Desarrollo','TEC','Portal Ventas',150000,'2024-04-05','2024-06-13','José Pérez Martínez','Se renovará el portal de ventas de la página web existente ',1),(4,1,'Desarrollo','ITESM','BD - ITESMM',1500000,'2024-03-15','2024-07-28','Eugenio Garza Salazar','Se crearán bases de datos para maejar información de la empresa ',1),(5,2,'Desarrollo','Pollo Brujo','Logística - Pollo',200000,'2024-04-05','2024-06-13','Luis Férnandez Nieto','Plataforma de administración logística y de comunicación interna ',1),(6,1,'Desarrollo','SEP','Plataforma Educativa',50000000,'2024-02-12','2024-10-17','Alberto Soto Sandoval','Plataforma para entrega de tareas en preparatorias públicas',1),(7,1,'Desarrollo','Google','Plataforma de e-commerce',30000000,'2024-01-05','2025-11-23','Michael Johnson','Plataforma para crear y administrar tiendas en linea ',1),(8,1,'Desarrollo','InstaMsg','Aplicación Mensajeria',500000,'2024-01-05','2024-03-25','Oscar Alvarado Pérez','Aplicación para enviar mensajes de voz, texto, imágen, entre otros ',0),(9,1,'Diseño','Facebook','Diseño de UX',1000000,'2024-04-01','2024-06-09','Mark Zuckerberg','Diseño centrandose en la accesibilidad y satisfacción del usuario ',1),(10,1,'Diseño','Optiplat','Diseño de UI',100000,'2024-04-22','2024-05-15','Emmanuel Soliz Vargas','Diseño que permita a los usuarios interactuar con sistemas informáticos ',0),(11,1,'Diseño','TreeDesign','Diseño de Identidad',220000,'2023-11-05','2023-12-06','Sofía Alvarado Juárez','Creación de identidad que refleje personalidad y propósito ',0),(12,1,'Desarrollo','Stardeos','Sistema de Contenidos',400000,'2022-03-05','2022-11-14','Daniel Santomé Lemus','Plataforma que permite al usuario crear, administrar y publicar contenido. ',0),(13,1,'Desarrollo','Lechuguini','Sistema de Citas',120000,'2023-06-28','2023-08-06','Leobardo Alcocer Téllez','Plataforma que permite a usuarios reservar servicios en un restaurante ',0),(14,1,'Desarrollo','Sq2Cons','Aplicación de gestión',80000,'2023-09-25','2023-12-21','David Pineda Ramírez','Herramientas de planificación y organización de proyectos ',0),(15,1,'Desarrollo','WorConnect','Aplicación laboral',75000,'2023-06-01','2024-08-17','Humberto Mujica Rojas','Aplicación para conectar a egresados con posibles empleadores ',0),(16,1,'Desarrollo','AdminServ','Portal de Citas',80000,'2022-05-17','2022-06-18','Eduardo Alatorre Hernández','Página para agendar citas en oficinas ',0),(17,1,'Desarrollo','ITeach','Manipulador DB',60000,'2022-08-30','2022-10-17','Fernando Flores Alamilla','Portal para administrar bases de datos de manera simplificada ',0),(18,1,'Desarrollo','RegisterSell','Página mantenimientos',45000,'2022-03-22','2022-04-10','Manuel Hernández Sabina','Página para agendar mantenimientos para máquinas registradoras ',0),(19,1,'Desarrollo','Col Makarenko','Plataforma inscripciones',90000,'2023-02-27','2023-04-03','Mauricio Patiño Puga','Plataforma de inscipcion de alumnos a una escuela ',0),(20,1,'Desarrollo','Const Ortiz','Aplicación rutas',73000,'2023-06-12','2024-08-23','Romualdo Ortiz Ortiz','Aplicación para rastrear rutas de proveedores ',0),(22,1,'Diseño','dadwa','wdadaw',80000,'2024-07-02','2024-07-09','addae','dwadwa',1),(23,1,'Desarrollo','dawdwa','dwadwa',800000,'2024-07-02','2024-07-09','aewewa','ewaewea',1),(24,1,'Desarrollo','JEMMS','JEMMS interfaz',80000000,'2024-07-02','2024-07-09','Miguel ','jdauwiwuabhduyawgydu',1),(25,1,'Diseño','waeewae','ewaeawe',9000,'2024-07-02','2024-07-09','eqweqwe','weEWEAEWEWA',1),(26,1,'Diseño','mike INC','mi proyecto',900000,'2024-07-02','2024-07-09','mike','aerhuaer ruaejruiae awiejiw',1),(27,1,'Diseño','awddwa','awddwa',9,'2024-07-02','2024-07-09','waddwa','awdwdadwa',1),(28,1,'Diseño','awijejiawejewia','auenwnuae',90000,'2024-07-02','2024-07-09','eawbewaaew','aeweaweaweaw eew',1),(29,1,'Desarrollo','sofi inc','sofia',0,'2024-05-20','2007-06-20','sofia','sofi',0),(30,1,'Desarrollo','mk inc','mk',0,'2023-05-20','2005-06-20','mike','ed',0),(31,1,'Desarrollo','awkjdoa','dwadjwia',9,'2024-05-24','2024-06-07','wda','wad',1),(32,1,'Desarrollo','eq3q','q3e3q',800,'2024-05-20','2024-05-30','eq3q','aewaewa aewewaaew',1),(33,1,'Desarrollo','ghghffhgghf','gfhghffghgf',13,'2024-04-08','2024-08-15','hgfhgf','gfhgfghfhgf',1),(34,1,'Diseño','aeewa','',90,'2024-05-14','2024-05-30','aeeaw','aewaew',1),(35,1,'Desarrollo','aw','',0,'2024-05-13','2024-05-29','eew','eww',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RIESGO`
--

LOCK TABLES `RIESGO` WRITE;
/*!40000 ALTER TABLE `RIESGO` DISABLE KEYS */;
INSERT INTO `RIESGO` VALUES (1,1,5,1,1,'Establecer expectativas y procesos claros de aprobación.','Eutanasia'),(2,2,2,2,2,'Establecer plazos claros y roles para entrega de contenido.','Retrasos en la entrega del contenido '),(3,3,1,2,2,'Definir un alcance claro y limitar las revisiones del diseño.','Cambios frecuentes en el diseño  '),(4,4,3,3,1,'Realizar pruebas de compatibilidad al inicio.','Problemas de compatibilidad de plugins '),(5,1,2,1,2,'Aplicar estándares de seguridad y realizar actualizaciones.','Problemas de seguridad  '),(6,1,1,3,2,'Validar integraciones y tener proveedores de respaldo.','Fallos en la integración de pasarelas de pago '),(7,1,4,2,1,'Monitorear y ajustar el presupuesto continuamente.','Aumento inesperado en los costos del proyecto '),(8,1,3,1,1,'Estrategias de respaldo y recuperación ante desastres.','Pérdida de datos o fallo de hosting  '),(9,1,2,2,2,'Establecer expectativas y procesos claros de aprobación.','Retrasos en la aprobación del cliente '),(10,1,3,2,2,'Mantenerse actualizado con las últimas versiones y soporte.','Dificultades técnicas con WordPress o WooCommerce '),(11,1,5,3,2,'Gestionar la carga de trabajo y los recursos adecuadamente','Sobrecarga de trabajo del equipo de diseño '),(12,12,3,3,2,'Capacitar al equipo o contratar talento especializado','Falta de experiencia en tecnologías específicas '),(13,13,1,3,3,'Implementar un sistema estructurado de gestión de cambios.','Inadecuada gestión del cambio '),(14,14,4,2,1,'Tener alternativas y planes de contingencia.','Interrupciones en la cadena de suministro digital '),(15,15,3,2,2,'Aplicar técnicas SEO desde el inicio del proyecto','Problemas de SEO y visibilidad en buscadores '),(16,16,5,3,2,'Crear planes de transición por si pasa esto','Cambio de persona responsable durante y despues del proyecto  '),(17,17,1,3,3,'Mantener un proceso de gestión de cambios robusto','Cambios en los requisitos del software'),(18,18,4,3,2,'Asegurar disponibilidad de recursos y personal cualificado.','Falta de recursos técnicos'),(19,19,3,2,3,'Implementar pruebas exhaustivas y QA constante.','Problemas técnicos y bugs en el desarrollo'),(20,20,3,3,1,'Realizar auditorías tecnológicas y actualizaciones regulares.','Tecnología obsoleta o inadecuada '),(21,1,5,3,3,'tratarlo con amor','jaime no se sabe la de chambear'),(22,2,4,2,3,'menos tiempo','mike come de mas'),(23,1,4,3,3,'placeholder','placeholder');
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
  `correo` varchar(30) DEFAULT NULL,
  `contrasena` varchar(400) DEFAULT NULL,
  `rol` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO`
--

LOCK TABLES `USUARIO` WRITE;
/*!40000 ALTER TABLE `USUARIO` DISABLE KEYS */;
INSERT INTO `USUARIO` VALUES (1,'Miguel Angel','Esquivel','Uribe','mike@appix.mx','$2a$12$bnWkbeFNPBuvJujsFMirROWt2KNomjbO/O388A8qcMA9yZ0X.7On.',0),(2,'Sofia','Tellez','Osorio','sofi@appix.mx','$2a$12$oPaLwbYutQHk38PQqLgsP.MTOXE.6Q0wB1a8I9I0TqaKvGreSiDU2',1),(3,'Emiliano','Lara','Valdivia','emi@appix.mx','$2a$12$irXOREq39OT0urquZGdiVOJeT8w4lybHCB5VhOlkBASJhGGNC7k2C',0);
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-28 13:50:20
