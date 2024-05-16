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
DROP DATABASE IF EXISTS APPIX;
CREATE DATABASE APPIX;
USE APPIX;

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
  `id_manager` int(11) NOT NULL,
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
  KEY `id_manager` (`id_manager`),
  KEY `departamento` (`departamento`),
  CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`id_manager`) REFERENCES `USUARIO` (`id_usuario`),
  CONSTRAINT `proyecto_ibfk_2` FOREIGN KEY (`departamento`) REFERENCES `DEPARTAMENTO` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROYECTO`
--

LOCK TABLES `PROYECTO` WRITE;
/*!40000 ALTER TABLE `PROYECTO` DISABLE KEYS */;
INSERT INTO `PROYECTO` VALUES (1,1,'Desarrollo','Dormimundo','Portal Ventas',150000,'2024-04-05','2024-06-13','José Pérez Martínez','Se renovará el portal de ventas de la página web existente ',1),(2,1,'Diseño','Bachoco','Bachoco página',200000,'2024-01-05','2024-02-07','Alfonso López Ruiz','Se creará una página web para la empresa ',1),(3,1,'Desarrollo','Coppel','Seguridad Coppel',3000000,'2024-04-20','2024-08-30','Miguel Salinas Muñoz','Se implementarán medidas de seguridad para la página de la empresa ',1),(4,1,'Desarrollo','ITESM','BD - ITESM',1500000,'2024-03-15','2024-07-28','Eugenio Garza Salazar','Se crearán bases de datos para maejar información de la empresa ',1),(5,1,'Desarrollo','Pollo Brujo','Logística - Pollo',200000,'2024-04-05','2024-06-13','Luis Férnandez Nieto','Plataforma de administración logística y de comunicación interna ',1),(6,1,'Desarrollo','SEP','Plataforma Educativa',50000000,'2024-02-12','2024-10-17','Alberto Soto Sandoval','Plataforma para entrega de tareas en preparatorias públicas',1),(7,1,'Desarrollo','Google','Plataforma de e-commerce',30000000,'2024-01-05','2025-11-23','Michael Johnson','Plataforma para crear y administrar tiendas en linea ',1),(8,1,'Desarrollo','InstaMsg','Aplicación Mensajeria',500000,'2024-01-05','2024-03-25','Oscar Alvarado Pérez','Aplicación para enviar mensajes de voz, texto, imágen, entre otros ',1),(9,1,'Diseño','Facebook','Diseño de UX',1000000,'2024-04-01','2024-06-09','Mark Zuckerberg','Diseño centrandose en la accesibilidad y satisfacción del usuario ',1),(10,1,'Diseño','Optiplat','Diseño de UI',100000,'2024-04-22','2024-05-15','Emmanuel Soliz Vargas','Diseño que permita a los usuarios interactuar con sistemas informáticos ',1),(11,1,'Diseño','TreeDesign','Diseño de Identidad',220000,'2023-11-05','2023-12-06','Sofía Alvarado Juárez','Creación de identidad que refleje personalidad y propósito ',0),(12,1,'Desarrollo','Stardeos','Sistema de Contenidos',400000,'2022-03-05','2022-11-14','Daniel Santomé Lemus','Plataforma que permite al usuario crear, administrar y publicar contenido. ',0),(13,1,'Desarrollo','Lechuguini','Sistema de Citas',120000,'2023-06-28','2023-08-06','Leobardo Alcocer Téllez','Plataforma que permite a usuarios reservar servicios en un restaurante ',0),(14,1,'Desarrollo','Sq2Cons','Aplicación de gestión',80000,'2023-09-25','2023-12-21','David Pineda Ramírez','Herramientas de planificación y organización de proyectos ',0),(15,1,'Desarrollo','WorConnect','Aplicación laboral',75000,'2023-06-01','2024-08-17','Humberto Mujica Rojas','Aplicación para conectar a egresados con posibles empleadores ',0),(16,1,'Desarrollo','AdminServ','Portal de Citas',80000,'2022-05-17','2022-06-18','Eduardo Alatorre Hernández','Página para agendar citas en oficinas ',0),(17,1,'Desarrollo','ITeach','Manipulador DB',60000,'2022-08-30','2022-10-17','Fernando Flores Alamilla','Portal para administrar bases de datos de manera simplificada ',0),(18,1,'Desarrollo','RegisterSell','Página mantenimientos',45000,'2022-03-22','2022-04-10','Manuel Hernández Sabina','Página para agendar mantenimientos para máquinas registradoras ',0),(19,1,'Desarrollo','Col Makarenko','Plataforma inscripciones',90000,'2023-02-27','2023-04-03','Mauricio Patiño Puga','Plataforma de inscipcion de alumnos a una escuela ',0),(20,1,'Desarrollo','Const Ortiz','Aplicación rutas',73000,'2023-06-12','2024-08-23','Romualdo Ortiz Ortiz','Aplicación para rastrear rutas de proveedores ',0);
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
  `categoria` varchar(11) NOT NULL,
  `impacto` int(11) NOT NULL,
  `probabilidad` int(11) NOT NULL,
  `estrategia_m` varchar(65) NOT NULL,
  `descripcion` varchar(65) NOT NULL,
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
  `contrasena` varchar(30) DEFAULT NULL,
  `rol` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO`
--

LOCK TABLES `USUARIO` WRITE;
/*!40000 ALTER TABLE `USUARIO` DISABLE KEYS */;
INSERT INTO `USUARIO` VALUES (1,'Miguel Angel','Uribe','Esquivel','mikesquivel2004@gmail.com','mike',1);
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

-- Dump completed on 2024-05-15 12:53:15