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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  `correo` varchar(30) DEFAULT NULL,
  `contrasena` varchar(400) DEFAULT NULL,
  `rol` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO`
--

LOCK TABLES `USUARIO` WRITE;
/*!40000 ALTER TABLE `USUARIO` DISABLE KEYS */;
INSERT INTO `USUARIO` VALUES (1,'admin','admin','admin','admin1@appix.mx','$2a$12$QbECw.nN0G9n60gyJFbhpuzPXqpdORASDqzeoi0rUeb73/XNH/RQW',1),(2,'admin','admin','admin','admin2@appix.mx','$2a$12$QqdTbu.bZQcZZTsNl56tkepmL6MCvbZxl4gKe5RwUDLNNF6gDDb9O',1);
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

-- Dump completed on 2024-06-14 15:41:14
