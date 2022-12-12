-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Sep 22, 2021 at 10:58 AM
-- Server version: 8.0.22
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `checklist`
--

-- --------------------------------------------------------

--
-- Table structure for table `centres`
--

CREATE TABLE `centres` (
  `codi` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `centre` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `localitat` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sstt` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pwd` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `centres`
--

INSERT INTO `centres` (`codi`, `centre`, `localitat`, `sstt`, `pwd`) VALUES
('12345678', 'Escola Primer d\'Octubre', 'Abella de Xerta', 'ABC', '2a97516c354b68848cdbd8f54a226a0a55b21ed138e207ad6c5cbb9c00aa5aea');

-- --------------------------------------------------------

--
-- Table structure for table `comandes`
--

CREATE TABLE `comandes` (
  `id` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `campanya` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `centre` char(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `estat` int NOT NULL DEFAULT '0',
  `inici` date DEFAULT NULL,
  `final` date DEFAULT NULL,
  `observacions` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comandes`
--

INSERT INTO `comandes` (`id`, `campanya`, `centre`, `estat`, `inici`, `final`, `observacions`) VALUES
('12345678#01', 'TRGNOV18', '12345678', 0, '2018-11-02', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productes`
--

CREATE TABLE `productes` (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcio` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checks` varchar(6000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `since` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productes`
--

INSERT INTO `productes` (`id`, `descripcio`, `checks`, `since`) VALUES
('ST.LT2A.20.01.08.02D', 'Estació multimèdia - Dual', '[\"L\'equip compta amb teclat i ratolí\",\"Reproducció d\'un vídeo musical d\'Internet amb Linkat\",\"Accés a les unitats P, S i T del servidor de centre, amb Linkat\",\"Impressió d\'un document amb Linkat\",\"Reproducció d\'un vídeo musical d\'Internet amb Windows\",\"Accés a les unitats P, S i T del servidor de centre, amb Windows\",\"Impressió d\'un document amb Windows\"]', '2018-10-01'),
('ST.LT2A.20.01.08.02L', 'Estació multimèdia - Linkat', '[\"L\'equip compta amb teclat i ratolí\",\"Reproducció d\'un vídeo musical d\'Internet\",\"Accés a les unitats P, S i T del servidor de centre\",\"Impressió d\'un document\"]', '2018-10-01'),
('ST.LT2A.20.01.08.02W', 'Estació multimèdia - Windows', '[\"L\'equip compta amb teclat i ratolí\",\"Reproducció d\'un vídeo musical d\'Internet\",\"Accés a les unitats P, S i T del servidor de centre\",\"Impressió d\'un document\"]', '2018-10-01'),
('ST.LT2A.20.01.08.05', 'Targeta sense fils AC', '[\"En l\'equip on s\'ha instal·lat, reproducció d\'un vídeo musical per Wi-Fi\",\"Accés a les unitats P, S i T del servidor de centre per Wi-Fi\",\"Impressió d\'un document per Wi-Fi\"]', '2018-10-01'),
('ST.LT2A.20.01.08.06D', 'Equip Basic Tiny - Dual', '[\"L\'equip compta amb teclat, ratolí i altaveus integrats\",\"Reproducció d\'un vídeo musical d\'Internet amb Linkat\",\"Accés a les unitats P, S i T del servidor de centre, amb Linkat\",\"Impressió d\'un document amb Linkat\",\"Reproducció d\'un vídeo musical d\'Internet amb Windows\",\"Accés a les unitats P, S i T del servidor de centre, amb Windows\",\"Impressió d\'un document amb Windows\"]', '2018-10-01'),
('ST.LT2A.20.01.08.06L', 'Equip Basic Tiny - Linkat', '[\"L\'equip compta amb teclat, ratolí i altaveus integrats\",\"Reproducció d\'un vídeo musical d\'Internet\",\"Accés a les unitats P, S i T del servidor de centre\",\"Impressió d\'un document\"]', '2018-10-01'),
('ST.LT2A.20.01.08.06W', 'Equip Basic Tiny - Windows', '[\"L\'equip compta amb teclat, ratolí i altaveus integrats\",\"Reproducció d\'un vídeo musical d\'Internet\",\"Accés a les unitats P, S i T del servidor de centre\",\"Impressió d\'un document\"]', '2018-10-01'),
('ST.LT2A.20.01.08.07D', 'Equip Avançat Tiny - Dual', '[\"L\'equip compta amb teclat, ratolí i altaveus integrats\",\"Reproducció d\'un vídeo musical d\'Internet amb Linkat\",\"Accés a les unitats P, S i T del servidor de centre, amb Linkat\",\"Impressió d\'un document amb Linkat\",\"Reproducció d\'un vídeo musical d\'Internet amb Windows\",\"Accés a les unitats P, S i T del servidor de centre, amb Windows\",\"Impressió d\'un document amb Windows\"]', '2018-10-01'),
('ST.LT2A.20.01.08.07L', 'Equip Avançat Tiny - Linkat', '[\"L\'equip compta amb teclat, ratolí i altaveus integrats\",\"Reproducció d\'un vídeo musical d\'Internet\",\"Accés a les unitats P, S i T del servidor de centre\",\"Impressió d\'un document\"]', '2018-10-01'),
('ST.LT2A.20.01.08.07W', 'Equip Avançat Tiny - Windows', '[\"L\'equip compta amb teclat, ratolí i altaveus integrats\",\"Reproducció d\'un vídeo musical d\'Internet\",\"Accés a les unitats P, S i T del servidor de centre\",\"Impressió d\'un document\"]', '2018-10-01'),
('ST.LT2A.20.01.08.13', 'Replicador de ports per a portàtil amb càrrega USB-C', '[\"El material s\'ha lliurat en bon estat\"]', '2018-10-01'),
('ST.LT2A.20.01.08.21', 'Monitor 21,5 polzades, amb altaveus', '[\"S\'ha deixat correctament instal·lat en un ordinador en servei\",\"S\'escolta l\'àudio en reproduir un vídeo musical\"]', '2018-10-01'),
('ST.LT2A.20.01.08.22', 'Monitor 21,5 polzades, sense altaveus', '[\"S\'ha deixat correctament instal·lat en un ordinador en servei\"]', '2018-10-01'),
('ST.LT2A.20.02.03.05', 'Carro portàtils', '[\"El material s\'ha lliurat en bon estat\",\"Configuració del temporitzador d\'acord amb el temps de càrrega recomanat pels dispositius\",\"S\'ha carregat la bateria d\'un dispositiu\"]', '2018-10-01'),
('ST.LT2A.20.02.03.14D', 'Ordinador portàtil 15,6\" - Intel i5 - Dual', '[\"Reproducció d\'un vídeo musical d\'Internet amb Linkat per Wi-Fi\",\"Reproducció d\'un vídeo musical d\'Internet amb Linkat per cable\",\"Accés a les unitats P, S i T del servidor de centre, amb Linkat\",\"Impressió d\'un document amb Linkat\",\"Reproducció d\'un vídeo musical d\'Internet amb Windows per Wi-Fi\",\"Reproducció d\'un vídeo musical d\'Internet amb Windows per cable\",\"Accés a les unitats P, S i T del servidor de centre, amb Windows\",\"Impressió d\'un document amb Windows\"]', '2018-10-01'),
('ST.LT2A.20.02.03.14L', 'Ordinador portàtil 15,6\" - Intel i5 - Linkat', '[\"La unitat de DVD reconeix correctament un CD/DVD\",\"Reproducció d\'un vídeo musical d\'Internet per Wi-Fi\",\"Reproducció d\'un vídeo musical d\'Internet per cable\",\"Accés a les unitats P, S i T del servidor de centre\",\"Impressió d\'un document\"]', '2018-10-01'),
('ST.LT2A.20.02.03.14W', 'Ordinador portàtil 15,6\" - Intel i5 - Windows', '[\"Reproducció d\'un vídeo musical d\'Internet per Wi-Fi\",\"Reproducció d\'un vídeo musical d\'Internet per cable\",\"Accés a les unitats P, S i T del servidor de centre\",\"Impressió d\'un document\"]', '2018-10-01'),
('ST.LT2A.20.02.03.17L', 'Ordinador portàtil - lleuger 11,6\" - Linkat', '[\"Reproducció d\'un vídeo musical d\'Internet per Wi-Fi\",\"Reproducció d\'un vídeo musical d\'Internet per cable\",\"Accés a les unitats P, S i T del servidor de centre\",\"Impressió d\'un document\"]', '2018-10-01'),
('ST.LT2A.20.02.03.17W', 'Ordinador portàtil - lleuger 11,6\" - Windows', '[\"Reproducció d\'un vídeo musical d\'Internet per Wi-Fi\",\"Reproducció d\'un vídeo musical d\'Internet per cable\",\"Accés a les unitats P, S i T del servidor de centre\",\"Impressió d\'un document\"]', '2018-10-01'),
('ST.LT2A.20.02.03.18L', 'Ordinador portàtil 15,6\" - Intel Pentium - Linkat', '[\"La unitat de DVD reconeix correctament un CD/DVD\",\"Reproducció d\'un vídeo musical d\'Internet per Wi-Fi\",\"Reproducció d\'un vídeo musical d\'Internet per cable\",\"Accés a les unitats P, S i T del servidor de centre\",\"Impressió d\'un document\"]', '2018-10-01'),
('ST.LT2A.20.02.03.18W', 'Ordinador portàtil 15,6\" - Intel Pentium - Windows', '[\"La unitat de DVD reconeix correctament un CD/DVD\",\"Reproducció d\'un vídeo musical d\'Internet per Wi-Fi\",\"Reproducció d\'un vídeo musical d\'Internet per cable\",\"Accés a les unitats P, S i T del servidor de centre\",\"Impressió d\'un document\"]', '2018-10-01'),
('ST.LT2A.20.02.03.22', 'Tauleta IPAD', '[\"Reproducció d\'un vídeo musical d\'Internet\"]', '2018-10-01'),
('ST.LT2A.20.02.03.23', 'Tauleta Android Quad-Core 10,1\"', '[\"Reproducció d\'un vídeo musical d\'Internet\"]', '2018-10-01'),
('ST.LT2A.20.02.03.24', 'Tauleta Android Octa-Core 10,1\"', '[\"Reproducció d\'un vídeo musical d\'Internet\"]', '2018-10-01'),
('ST.LT2A.20.02.03.25', 'Estació de càrrega per a 15 Tauletes o 16 Ipads', '[\"El material s\'ha lliurat en bon estat\",\"Els dispositius carreguen la bateria en connectar-los a l\'estació\"]', '2018-10-01'),
('ST.LT2A.20.02.03.41', 'Ordinador portàtil Chromebook 11,6\" + CMC', '[\"El dispositiu s\'ha registrat en el domini G-Suite del centre\",\"Reproducció d\'un vídeo musical d\'Internet\",\"Zoom d\'una pàgina web fent lliscar dos dits per la pantalla\"]', '2018-10-01'),
('ST.LT2A.20.02.03.45', 'Ordinador portàtil Chromebook 14\" no tàctil + CMC', '[\"El dispositiu s\'ha registrat en el domini G-Suite del centre\",\"Reproducció d\'un vídeo musical d\'Internet\"]', '2018-10-01'),
('ST.LT2A.20.02.04.01', 'Kit de projecció d\'ultra curta distància', '[\"La imatge s\'ajusta a les dimensions de la pantalla per VGA\",\"La imatge s\'ajusta a les dimensions de la pantalla per HDMI\",\"Se sent l\'àudio en reproduir un vídeo musical d\'Internet\"]', '2018-10-01'),
('ST.LT2A.20.02.04.02', 'Videoprojector d\'ultra curta distància', '[\"La imatge s\'ajusta a les dimensions de la pantalla per VGA\",\"La imatge s\'ajusta a les dimensions de la pantalla per HDMI\"]', '2018-10-01'),
('ST.LT2A.20.02.04.03', 'Eco-videoprojector de llarga distància', '[\"La imatge s\'ajusta a les dimensions de la pantalla per VGA\",\"La imatge s\'ajusta a les dimensions de la pantalla per HDMI\"]', '2018-10-01'),
('ST.LT2A.20.02.04.04', 'Eco-videoprojector portàtil', '[\"La imatge d\'un dispositiu connectat per VGA es projecta correctament\",\"La imatge d\'un dispositiu connectat per HDMI es projecta correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.04.05', 'Eco-videoprojector d\'ultra curta distància', '[\"La imatge s\'ajusta a les dimensions de la pantalla per VGA\",\"La imatge s\'ajusta a les dimensions de la pantalla per HDMI\"]', '2018-10-01'),
('ST.LT2A.20.02.04.06', 'Videoprojector d\'ultra curta distància interactiu tàctil', '[\"L\'equip s\'ha subministrat amb un retolador interactiu\",\"La imatge s\'ajusta a les dimensions de la pantalla per VGA\",\"La imatge s\'ajusta a les dimensions de la pantalla per HDMI\",\"Es pot interactuar amb la pantalla mitjançant retolador, amb Linkat\",\"Es pot interactuar amb la pantalla mitjançant retolador, amb Windows\",\"Es pot interactuar amb la pantalla mitjançant retolador, amb Chromebook\"]', '2018-10-01'),
('ST.LT2A.20.02.04.10', 'Kit de projecció interactiu tàctil', '[\"L\'equip s\'ha subministrat amb un retolador interactiu\",\"La imatge s\'ajusta a les dimensions de la pantalla per VGA\",\"La imatge s\'ajusta a les dimensions de la pantalla per HDMI\",\"Es pot interactuar amb la pantalla mitjançant retolador, amb Linkat\",\"Es pot interactuar amb la pantalla mitjançant retolador, amb Windows\",\"Es pot interactuar amb la pantalla mitjançant retolador, amb Chromebook\",\"Se sent l\'àudio en reproduir un contingut multimèdia\"]', '2018-10-01'),
('ST.LT2A.20.02.04.11', 'Videoprojector d\'ultra curta distància interactiu', '[\"L\'equip s\'ha subministrat amb un retolador interactiu\",\"La imatge s\'ajusta a les dimensions de la pantalla per VGA\",\"La imatge s\'ajusta a les dimensions de la pantalla per HDMI\",\"Es pot interactuar amb la pantalla mitjançant retolador, amb Linkat\",\"Es pot interactuar amb la pantalla mitjançant retolador, amb Windows\",\"Es pot interactuar amb la pantalla mitjançant retolador, amb Chromebook\"]', '2018-10-01'),
('ST.LT2A.20.02.04.12', 'Videoprojector llarga distància', '[\"La imatge s\'ajusta a les dimensions de la pantalla per VGA\",\"La imatge s\'ajusta a les dimensions de la pantalla per HDMI\"]', '2018-10-01'),
('ST.LT2A.20.02.04.21', 'Pissarra tàctil', '[\"La imatge s\'ajusta a les dimensions de la pantalla\",\"La interactivitat de la pantalla funciona correctament amb Linkat\",\"La interactivitat de la pantalla funciona correctament amb Windows\"]', '2018-10-01'),
('ST.LT2A.20.02.04.22', 'Visualitzador de documents', '[\"Projecció correcta d\'un objecte o document, amb Windows\"]', '2018-10-01'),
('ST.LT2A.20.02.04.23', 'Suport regulable en alçada motoritzat', '[\"El panell es regula en alçada correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.04.30', 'Kit videoprojector d\'ultra curta distància interactiu tàctil', '[\"L\'equip s\'ha subministrat amb un retolador interactiu\",\"La imatge s\'ajusta a les dimensions de la pantalla per VGA\",\"La imatge s\'ajusta a les dimensions de la pantalla per HDMI\",\"Es pot interactuar amb la pantalla mitjançant retolador, amb Linkat\",\"Es pot interactuar amb la pantalla mitjançant retolador, amb Windows\",\"Es pot interactuar amb la pantalla mitjançant retolador, amb Chromebook\",\"Se sent l\'àudio en reproduir un vídeo musical d\'Internet\"]', '2018-10-01'),
('ST.LT2A.20.02.04.40', 'Panell Interactiu 65\" penjat a paret amb mòdul Android', '[\"El mòdul Android s\'ha actualitzat a la darrera versió\",\"S\'ha instal·lat Google Play amb el compte d\'un usuari del centre\",\"S\'ha instal·lat una aplicació des de Google Play\",\"La interactivitat de la pantalla funciona correctament amb 10 tocs simultanis amb el mòdul Android\",\"Zoom d\'una pàgina web fent lliscar dos dits, amb Linkat\",\"Zoom d\'una pàgina web fent lliscar dos dits, amb Windows\",\"Zoom d\'una pàgina web fent lliscar dos dits, amb Chromebook\",\"Se sent l\'àudio en reproduir un vídeo musical d\'Internet\"]', '2018-10-01'),
('ST.LT2A.20.02.04.41', 'Panell Interactiu 65\" amb peu mòbil i mòdul Android', '[\"Les rodes del suport es poden ancorar i desancorar\",\"El mòdul Android s\'ha actualitzat a la darrera versió\",\"S\'ha instal·lat Google Play amb el compte d\'un usuari del centre\",\"S\'ha instal·lat una aplicació des de Google Play\",\"La interactivitat de la pantalla funciona correctament amb 10 tocs simultanis amb el mòdul Android\",\"Zoom d\'una pàgina web fent lliscar dos dits, amb Linkat\",\"Zoom d\'una pàgina web fent lliscar dos dits, amb Windows\",\"Zoom d\'una pàgina web fent lliscar dos dits, amb Chromebook\",\"Se sent l\'àudio en reproduir un vídeo musical d\'Internet\"]', '2018-10-01'),
('ST.LT2A.20.02.04.43', 'Panell Interactiu 4K 75\" penjat a paret amb mòdul Android', '[\"El mòdul Android s\'ha actualitzat a la darrera versió\",\"S\'ha instal·lat Google Play amb el compte d\'un usuari del centre\",\"S\'ha instal·lat una aplicació des de Google Play\",\"La interactivitat de la pantalla funciona correctament amb 10 tocs simultanis amb el mòdul Android\",\"Zoom d\'una pàgina web fent lliscar dos dits, amb Linkat\",\"Zoom d\'una pàgina web fent lliscar dos dits, amb Windows\",\"Zoom d\'una pàgina web fent lliscar dos dits, amb Chromebook\",\"Se sent l\'àudio en reproduir un vídeo musical d\'Internet\"]', '2018-10-01'),
('ST.LT2A.20.02.04.44', 'Panell Interactiu 4K 75\" amb peu i mòdul Android', '[\"Les rodes del suport es poden ancorar i desancorar\",\"El mòdul Android s\'ha actualitzat a la darrera versió\",\"S\'ha instal·lat Google Play amb el compte d\'un usuari del centre\",\"S\'ha instal·lat una aplicació des de Google Play\",\"La interactivitat de la pantalla funciona correctament amb 10 tocs simultanis amb el mòdul Android\",\"Zoom d\'una pàgina web fent lliscar dos dits, amb Linkat\",\"Zoom d\'una pàgina web fent lliscar dos dits, amb Windows\",\"Zoom d\'una pàgina web fent lliscar dos dits, amb Chromebook\",\"Se sent l\'àudio en reproduir un vídeo musical d\'Internet\"]', '2018-10-01'),
('ST.LT2A.20.02.04.45', 'Suport regulable i inclinable motoritzat per a panell interactiu', '[\"El panell es regula en alçada correctament\",\"El panell es pot inclinar fins posar-lo en posició horitzontal\"]', '2018-10-01'),
('ST.LT2A.20.02.05.01', 'Impressora 3D Witbox Go', '[\"S\'ha imprès un petit objecte 3D des d\'un ordinador amb Wi-Fi des de Linkat\",\"S\'ha imprès un petit objecte 3D des d\'un ordinador amb Wi-Fi des de Windows\"]', '2018-10-01'),
('ST.LT2A.20.02.05.02', 'Impressora 3D avançada', '[\"S\'ha imprès un petit objecte 3D amb el programa \'Cura\' des de Linkat\",\"S\'ha imprès un petit objecte 3D amb el programa \'Cura\' des de Windows\"]', '2018-10-01'),
('ST.LT2A.20.02.06.01', 'Kit robòtica BQ primària', '[\"El material s\'ha lliurat en bon estat\"]', '2018-10-01'),
('ST.LT2A.20.02.06.02', 'Kit robòtica BQ secundària', '[\"El material s\'ha lliurat en bon estat\"]', '2018-10-01'),
('ST.LT2A.20.02.06.03', 'Bee-bot - 1 element', '[\"El material s\'ha lliurat en bon estat\"]', '2018-10-01'),
('ST.LT2A.20.02.06.04', 'Base de càrrega per a Bee-bots', '[\"La bateria del Bee-Bot es carrega quan es connecta a la base\"]', '2018-10-01'),
('ST.LT2A.20.02.06.06', 'Pack Lego Education Wedo 2.0 Bluetooth amb bateria', '[\"El material s\'ha lliurat en bon estat\"]', '2018-10-01'),
('ST.LT2A.20.02.06.08', 'Set Lego Mindstorm Education EV3', '[\"El material s\'ha lliurat en bon estat\"]', '2018-10-01'),
('ST.LT2A.20.02.06.10', 'Arduino Starter Kit', '[\"El material s\'ha lliurat en bon estat\"]', '2018-10-01'),
('ST.LT2A.20.02.07.01', 'Teclat tecles grans Titán', '[\"El teclat funciona correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.07.02', 'Teclat amb cobertor', '[\"El teclat funciona correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.07.03', 'Ratolí bola gran', '[\"El ratolí funciona correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.07.04', 'Ratolí bola petita', '[\"El ratolí funciona correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.07.05', 'Ratolí tipus Joystick', '[\"El ratolí funciona correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.07.06', 'Ratolí adaptat', '[\"El ratolí funciona correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.07.07', 'Commutador petit', '[\"El commutador funciona correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.07.08', 'Commutador gran (Jelly Bean)', '[\"El commutador funciona correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.07.09', 'Commutador step by step', '[\"El commutador funciona correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.07.10', 'Bucle magnètic', '[\"El bucle s\'ha lliurat en bon estat\"]', '2018-10-01'),
('ST.LT2A.20.02.07.11', 'Ratolí infraroig', '[\"El ratolí funciona correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.07.12', 'Monitor multitàctil 23\"', '[\"S\'ha deixat correctament instal·lat en un ordinador en servei\",\"La interactivitat de la pantalla funciona correctament\",\"Se sent l\'àudio en reproduir un contingut multimèdia\"]', '2018-10-01'),
('ST.LT2A.20.02.07.13', 'Teclat tecles grans Clevy inalàmbric', '[\"El teclat funciona correctament\"]', '2018-10-01'),
('ST.LT2A.20.02.08.01', 'Servei de Manteniment - Ordinadors Portàtils', '[\"Reproducció d\'un vídeo musical d\'Internet amb Linkat per Wi-Fi\",\"Reproducció d\'un vídeo musical d\'Internet amb Linkat per cable\",\"Accés a les unitats P, S i T del servidor de centre, amb Linkat\",\"Reproducció d\'un vídeo musical d\'Internet amb Windows per Wi-Fi\",\"Reproducció d\'un vídeo musical d\'Internet amb Windows per cable\",\"Accés a les unitats P, S i T del servidor de centre, amb Windows\"]', '2018-10-01'),
('ST.LT2A.20.02.08.02', 'Servei de Manteniment - Ordinadors de Sobretaula', '[\"Reproducció d\'un vídeo musical d\'Internet amb Linkat\",\"Accés a les unitats P, S i T del servidor de centre, amb Linkat\",\"Reproducció d\'un vídeo musical d\'Internet amb Windows\",\"Accés a les unitats P, S i T del servidor de centre, amb Windows\"]', '2018-10-01'),
('ST.LT2A.20.02.08.03', 'Servei de Manteniment - Projectors', '[\"El projector funciona correctament\"]', '2018-10-01');

-- --------------------------------------------------------

--
-- Table structure for table `unitats`
--

CREATE TABLE `unitats` (
  `comanda` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `producte` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `num` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcio` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `problemes` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `checks` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `unitats`
--

INSERT INTO `unitats` (`comanda`, `producte`, `num`, `id`, `descripcio`, `problemes`, `checks`) VALUES
('12345678#01', 'ST.LT2A.20.01.08.02D', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.02D', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.02D', '003', 'Unitat 3', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '003', 'Unitat 3', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '004', 'Unitat 4', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '005', 'Unitat 5', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '006', 'Unitat 6', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '007', 'Unitat 7', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '008', 'Unitat 8', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '009', 'Unitat 9', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '010', 'Unitat 10', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '011', 'Unitat 11', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '012', 'Unitat 12', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '013', 'Unitat 13', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '014', 'Unitat 14', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '015', 'Unitat 15', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '016', 'Unitat 16', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '017', 'Unitat 17', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '018', 'Unitat 18', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '019', 'Unitat 19', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '020', 'Unitat 20', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '021', 'Unitat 21', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '022', 'Unitat 22', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '023', 'Unitat 23', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '024', 'Unitat 24', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '025', 'Unitat 25', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '026', 'Unitat 26', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '027', 'Unitat 27', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '028', 'Unitat 28', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '029', 'Unitat 29', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '030', 'Unitat 30', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.01.08.07D', '031', 'Unitat 31', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.17W', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.17W', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.17W', '003', 'Unitat 3', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.17W', '004', 'Unitat 4', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.17W', '005', 'Unitat 5', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.17W', '006', 'Unitat 6', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.17W', '007', 'Unitat 7', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.17W', '008', 'Unitat 8', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.17W', '009', 'Unitat 9', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.17W', '010', 'Unitat 10', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '003', 'Unitat 3', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '004', 'Unitat 4', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '005', 'Unitat 5', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '006', 'Unitat 6', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '007', 'Unitat 7', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '008', 'Unitat 8', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '009', 'Unitat 9', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '010', 'Unitat 10', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '011', 'Unitat 11', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '012', 'Unitat 12', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '013', 'Unitat 13', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '014', 'Unitat 14', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.24', '015', 'Unitat 15', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.25', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '003', 'Unitat 3', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '004', 'Unitat 4', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '005', 'Unitat 5', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '006', 'Unitat 6', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '007', 'Unitat 7', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '008', 'Unitat 8', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '009', 'Unitat 9', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '010', 'Unitat 10', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '011', 'Unitat 11', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '012', 'Unitat 12', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '013', 'Unitat 13', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '014', 'Unitat 14', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '015', 'Unitat 15', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '016', 'Unitat 16', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '017', 'Unitat 17', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '018', 'Unitat 18', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '019', 'Unitat 19', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '020', 'Unitat 20', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '021', 'Unitat 21', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '022', 'Unitat 22', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '023', 'Unitat 23', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '024', 'Unitat 24', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '025', 'Unitat 25', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '026', 'Unitat 26', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '027', 'Unitat 27', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '028', 'Unitat 28', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '029', 'Unitat 29', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '030', 'Unitat 30', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '031', 'Unitat 31', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '032', 'Unitat 32', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '033', 'Unitat 33', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.03.41', '034', 'Unitat 34', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.05', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.05', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.05', '003', 'Unitat 3', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.05', '004', 'Unitat 4', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.05', '005', 'Unitat 5', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.05', '006', 'Unitat 6', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.05', '007', 'Unitat 7', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.22', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.30', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.41', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.43', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.43', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.43', '003', 'Unitat 3', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.04.45', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.05.01', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.05.02', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.05.02', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '003', 'Unitat 3', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '004', 'Unitat 4', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '005', 'Unitat 5', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '006', 'Unitat 6', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '007', 'Unitat 7', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '008', 'Unitat 8', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '009', 'Unitat 9', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '010', 'Unitat 10', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '011', 'Unitat 11', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '012', 'Unitat 12', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '013', 'Unitat 13', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '014', 'Unitat 14', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '015', 'Unitat 15', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.02', '016', 'Unitat 16', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '003', 'Unitat 3', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '004', 'Unitat 4', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '005', 'Unitat 5', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '006', 'Unitat 6', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '007', 'Unitat 7', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '008', 'Unitat 8', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '009', 'Unitat 9', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '010', 'Unitat 10', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '011', 'Unitat 11', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '012', 'Unitat 12', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '013', 'Unitat 13', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '014', 'Unitat 14', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.06.10', '015', 'Unitat 15', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.07.01', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.07.02', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.07.06', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.07.06', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.07.07', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.07.07', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.07.10', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.07.13', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.01', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.01', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.01', '003', 'Unitat 3', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.02', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.02', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.02', '003', 'Unitat 3', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.02', '004', 'Unitat 4', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.02', '005', 'Unitat 5', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.02', '006', 'Unitat 6', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.02', '007', 'Unitat 7', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.02', '008', 'Unitat 8', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.02', '009', 'Unitat 9', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.02', '010', 'Unitat 10', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.03', '001', 'Unitat 1', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.03', '002', 'Unitat 2', '', NULL, '00000000000000000000'),
('12345678#01', 'ST.LT2A.20.02.08.03', '003', 'Unitat 3', '', NULL, '00000000000000000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `centres`
--
ALTER TABLE `centres`
  ADD PRIMARY KEY (`codi`);

--
-- Indexes for table `comandes`
--
ALTER TABLE `comandes`
  ADD PRIMARY KEY (`id`,`campanya`,`centre`);

--
-- Indexes for table `productes`
--
ALTER TABLE `productes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `unitats`
--
ALTER TABLE `unitats`
  ADD PRIMARY KEY (`comanda`,`producte`,`num`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
