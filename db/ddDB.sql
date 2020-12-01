-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for dd4me
CREATE DATABASE IF NOT EXISTS `dd4me` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `dd4me`;

-- Dumping structure for table dd4me.team
CREATE TABLE IF NOT EXISTS `team` (
  `teamID` int(11) NOT NULL AUTO_INCREMENT,
  `primaryID` int(11) NOT NULL,
  `secondaryID` int(11) NOT NULL,
  `isActive` tinyint(4) NOT NULL DEFAULT 1,
  `pairedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `disbandedOn` datetime DEFAULT NULL,
  `currLocationLat` float DEFAULT NULL,
  `currLocationLng` float DEFAULT NULL,
  PRIMARY KEY (`teamID`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table dd4me.team: ~69 rows (approximately)
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` (`teamID`, `primaryID`, `secondaryID`, `isActive`, `pairedOn`, `disbandedOn`, `currLocationLat`, `currLocationLng`) VALUES
	(1, 24, 19, 0, '2020-06-22 22:14:19', '2020-06-22 23:27:38', NULL, NULL),
	(2, 24, 19, 0, '2020-06-22 22:14:20', '2020-06-22 23:27:38', NULL, NULL),
	(3, 24, 19, 0, '2020-06-22 22:14:43', '2020-06-22 23:27:38', NULL, NULL),
	(4, 24, 24, 0, '2020-06-22 22:16:13', '2020-06-22 23:27:38', NULL, NULL),
	(5, 24, 19, 0, '2020-06-22 22:17:20', '2020-06-22 23:27:38', NULL, NULL),
	(6, 24, 19, 0, '2020-06-22 22:18:30', '2020-06-22 23:27:38', NULL, NULL),
	(7, 24, 19, 0, '2020-06-22 22:21:18', '2020-06-22 23:27:38', NULL, NULL),
	(8, 24, 24, 0, '2020-06-22 22:21:27', '2020-06-22 23:27:38', NULL, NULL),
	(9, 24, 19, 0, '2020-06-22 22:21:39', '2020-06-22 23:27:38', NULL, NULL),
	(10, 24, 19, 0, '2020-06-22 22:22:35', '2020-06-22 23:27:38', NULL, NULL),
	(11, 24, 19, 0, '2020-06-22 22:23:45', '2020-06-22 23:27:38', NULL, NULL),
	(12, 24, 19, 0, '2020-06-22 22:24:59', '2020-06-22 23:27:38', NULL, NULL),
	(13, 24, 7, 0, '2020-06-22 22:57:30', '2020-06-22 23:27:38', NULL, NULL),
	(14, 24, 7, 0, '2020-06-22 23:06:33', '2020-06-22 23:27:38', NULL, NULL),
	(15, 19, 24, 0, '2020-06-22 23:06:39', '2020-06-22 23:27:38', NULL, NULL),
	(16, 19, 24, 0, '2020-06-22 23:06:44', '2020-06-22 23:27:38', NULL, NULL),
	(17, 19, 24, 0, '2020-06-22 23:06:47', '2020-06-22 23:27:38', NULL, NULL),
	(18, 19, 24, 0, '2020-06-22 23:07:03', '2020-06-22 23:27:38', NULL, NULL),
	(19, 19, 24, 0, '2020-06-22 23:08:32', '2020-06-22 23:27:38', NULL, NULL),
	(20, 19, 24, 0, '2020-06-22 23:08:35', '2020-06-22 23:27:38', NULL, NULL),
	(21, 19, 24, 0, '2020-06-22 23:08:35', '2020-06-22 23:27:38', NULL, NULL),
	(22, 19, 24, 0, '2020-06-22 23:09:34', '2020-06-22 23:27:38', NULL, NULL),
	(23, 5, 24, 0, '2020-06-22 23:10:03', '2020-06-22 23:27:38', NULL, NULL),
	(24, 24, 19, 0, '2020-06-22 23:27:53', '2020-06-22 23:28:56', NULL, NULL),
	(25, 24, 19, 0, '2020-06-22 23:28:26', '2020-06-22 23:28:56', NULL, NULL),
	(26, 24, 19, 0, '2020-06-22 23:28:53', '2020-06-22 23:28:56', NULL, NULL),
	(27, 24, 19, 0, '2020-06-22 23:28:59', '2020-06-22 23:29:05', NULL, NULL),
	(28, 5, 24, 0, '2020-06-23 04:08:24', '2020-06-23 09:15:15', NULL, NULL),
	(29, 5, 24, 0, '2020-06-23 09:22:14', '2020-06-23 09:39:00', 45.4511, -75.7611),
	(30, 5, 24, 0, '2020-06-23 09:39:01', '2020-06-23 09:39:27', 45.4511, -75.7611),
	(31, 5, 24, 0, '2020-06-23 09:39:28', '2020-06-23 09:40:21', 45.4511, -75.7611),
	(32, 5, 24, 0, '2020-06-23 09:40:21', '2020-06-23 09:41:26', 45.4511, -75.7611),
	(33, 5, 24, 0, '2020-06-23 09:41:30', '2020-06-23 09:41:51', 45.4511, -75.7611),
	(34, 5, 24, 0, '2020-06-23 09:41:52', '2020-06-23 09:42:24', 45.4511, -75.7611),
	(35, 5, 24, 0, '2020-06-23 09:42:25', '2020-06-23 09:42:49', 45.4511, -75.7611),
	(36, 5, 24, 0, '2020-06-23 09:42:50', '2020-06-23 09:43:38', 45.4511, -75.7611),
	(37, 5, 24, 0, '2020-06-23 09:43:40', '2020-06-23 09:43:46', 45.4511, -75.7611),
	(38, 5, 24, 0, '2020-06-23 09:43:46', '2020-06-23 09:44:11', 45.4511, -75.7611),
	(39, 5, 24, 0, '2020-06-23 09:44:12', '2020-06-23 10:06:12', 45.4511, -75.7611),
	(40, 24, 19, 0, '2020-06-23 12:12:14', '2020-06-23 12:12:42', 45.4152, -75.8663),
	(41, 24, 19, 0, '2020-06-23 12:12:43', '2020-06-23 12:13:00', 45.4152, -75.8663),
	(42, 24, 19, 0, '2020-06-23 12:13:00', '2020-06-23 12:13:19', 45.4152, -75.8663),
	(43, 24, 19, 0, '2020-06-23 12:13:19', '2020-06-23 12:15:19', 45.4152, -75.8663),
	(44, 24, 19, 0, '2020-06-23 12:15:20', '2020-06-23 12:15:27', 45.4152, -75.8663),
	(45, 24, 19, 0, '2020-06-23 12:15:29', '2020-06-23 12:17:40', 45.4152, -75.8663),
	(46, 24, 19, 0, '2020-06-23 12:17:40', '2020-06-23 12:21:11', 45.4152, -75.8663),
	(47, 24, 19, 0, '2020-06-23 12:21:11', '2020-06-23 12:22:51', 45.4152, -75.8663),
	(48, 24, 19, 0, '2020-06-23 12:22:52', '2020-06-23 12:23:16', 45.4152, -75.8663),
	(49, 24, 19, 0, '2020-06-23 12:23:17', '2020-06-23 12:25:10', 45.4152, -75.8663),
	(50, 24, 19, 0, '2020-06-23 12:25:10', '2020-06-23 12:25:39', 45.4152, -75.8663),
	(51, 24, 19, 0, '2020-06-23 12:26:08', '2020-06-23 12:26:19', 45.4152, -75.8663),
	(52, 24, 19, 0, '2020-06-23 12:26:19', '2020-06-23 12:26:27', 45.4152, -75.8663),
	(53, 24, 19, 0, '2020-06-23 12:26:28', '2020-06-23 12:27:04', 45.4152, -75.8663),
	(54, 24, 19, 0, '2020-06-23 12:27:06', '2020-06-23 12:27:50', 45.4152, -75.8663),
	(55, 24, 19, 0, '2020-06-23 12:27:50', '2020-06-23 12:29:10', 45.4152, -75.8663),
	(56, 24, 19, 0, '2020-06-23 12:29:11', '2020-06-23 12:33:37', 45.4152, -75.8663),
	(59, 24, 19, 0, '2020-06-23 12:35:47', '2020-06-23 12:37:41', 45.4152, -75.8663),
	(60, 24, 19, 0, '2020-06-23 12:37:03', '2020-06-23 12:37:41', 45.4152, -75.8663),
	(61, 24, 19, 0, '2020-06-23 12:39:52', '2020-06-23 12:41:15', 45.4152, -75.8663),
	(62, 24, 19, 0, '2020-06-23 12:41:15', '2020-06-23 12:48:12', 45.4152, -75.8663),
	(63, 24, 19, 0, '2020-06-23 12:48:13', '2020-06-23 12:48:27', 45.4152, -75.8663),
	(66, 26, 27, 0, '2020-06-23 13:46:17', '2020-06-23 13:53:48', 45.4152, -75.8663),
	(67, 26, 27, 0, '2020-06-23 13:53:50', '2020-06-23 13:54:05', 45.4152, -75.8663),
	(68, 26, 27, 0, '2020-06-23 14:13:38', '2020-06-23 14:32:18', 45.4152, -75.8663),
	(69, 26, 27, 0, '2020-06-23 14:14:31', '2020-06-23 14:32:18', 45.4152, -75.8663),
	(70, 26, 27, 0, '2020-06-23 14:20:56', '2020-06-23 14:32:18', 45.4152, -75.8663),
	(71, 26, 27, 0, '2020-06-23 14:22:41', '2020-06-23 14:32:18', 45.4152, -75.8663),
	(72, 26, 27, 0, '2020-06-23 14:23:32', '2020-06-23 14:32:18', 45.4152, -75.8663),
	(73, 26, 27, 1, '2020-06-23 14:32:18', NULL, 45.4152, -75.8663),
	(74, 26, 27, 1, '2020-06-23 14:33:19', NULL, 45.4152, -75.8663),
	(75, 26, 27, 1, '2020-06-23 14:35:26', NULL, 45.4152, -75.8663);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;

-- Dumping structure for table dd4me.team_trip
CREATE TABLE IF NOT EXISTS `team_trip` (
  `team_tripID` int(11) NOT NULL,
  `teamID` int(11) NOT NULL,
  `tripID` int(11) NOT NULL,
  PRIMARY KEY (`team_tripID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table dd4me.team_trip: ~0 rows (approximately)
/*!40000 ALTER TABLE `team_trip` DISABLE KEYS */;
/*!40000 ALTER TABLE `team_trip` ENABLE KEYS */;

-- Dumping structure for table dd4me.testzone
CREATE TABLE IF NOT EXISTS `testzone` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table dd4me.testzone: ~2 rows (approximately)
/*!40000 ALTER TABLE `testzone` DISABLE KEYS */;
INSERT INTO `testzone` (`userId`, `username`, `password`) VALUES
	(1, 'bob\r\n', '123'),
	(2, 'lisa', '123');
/*!40000 ALTER TABLE `testzone` ENABLE KEYS */;

-- Dumping structure for table dd4me.trip
CREATE TABLE IF NOT EXISTS `trip` (
  `tripID` int(11) NOT NULL AUTO_INCREMENT,
  `teamID` int(11) DEFAULT NULL,
  `requesterID` int(11) DEFAULT NULL,
  `tripStatus` enum('requested','ongoing','done') DEFAULT NULL,
  `originLat` varchar(50) DEFAULT NULL,
  `originLng` varchar(50) DEFAULT NULL,
  `destLat` varchar(50) DEFAULT NULL,
  `destLng` varchar(50) DEFAULT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`tripID`) USING BTREE,
  KEY `userID` (`requesterID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table dd4me.trip: ~9 rows (approximately)
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` (`tripID`, `teamID`, `requesterID`, `tripStatus`, `originLat`, `originLng`, `destLat`, `destLng`, `price`) VALUES
	(44, 65, 24, 'ongoing', '45.411091', '-75.859212', '45.412021', '-75.853838', 0),
	(45, 66, 26, 'ongoing', '45.455275', '-75.765427', '45.426412', '-75.691244', 0),
	(46, 69, 26, 'ongoing', '45.455275', '-75.765427', '45.426412', '-75.691244', 0),
	(47, 70, 26, 'ongoing', '45.434968', '-75.644618', '45.426412', '-75.691244', 0),
	(48, 71, 26, 'ongoing', '45.434968', '-75.644618', '45.426412', '-75.691244', 0),
	(49, 72, 26, 'ongoing', '45.434968', '-75.644618', '45.426412', '-75.691244', 0),
	(50, 73, 26, 'ongoing', '45.434968', '-75.644618', '45.426412', '-75.691244', 0),
	(51, 74, 26, 'ongoing', '45.434968', '-75.644618', '45.426412', '-75.691244', 0),
	(52, 75, 26, 'ongoing', '45.434968', '-75.644618', '45.426412', '-75.691244', 0);
/*!40000 ALTER TABLE `trip` ENABLE KEYS */;

-- Dumping structure for table dd4me.user
CREATE TABLE IF NOT EXISTS `user` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(128) NOT NULL,
  `passHash` varchar(256) NOT NULL,
  `cookieHash` varchar(256) NOT NULL DEFAULT 'logout',
  `fName` varchar(50) NOT NULL,
  `lName` varchar(50) NOT NULL,
  `type` enum('rider','driver','dispatch') NOT NULL DEFAULT 'rider',
  `phone` varchar(50) NOT NULL,
  `amtLastTrip` int(11) DEFAULT NULL,
  `amtSinceLastPay` int(11) DEFAULT NULL,
  `onShift` tinyint(4) DEFAULT NULL,
  `shiftType` enum('primary','secondary','both') DEFAULT NULL,
  `inTeam` tinyint(4) DEFAULT NULL,
  `currLocationLat` float DEFAULT NULL,
  `currLocationLng` float DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table dd4me.user: ~8 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`userID`, `email`, `passHash`, `cookieHash`, `fName`, `lName`, `type`, `phone`, `amtLastTrip`, `amtSinceLastPay`, `onShift`, `shiftType`, `inTeam`, `currLocationLat`, `currLocationLng`) VALUES
	(5, 'bob@gmail.com', 'CkK2udzVafmQ3N5A9P9zxaJOuQQ=', 'jjUKfRPE4ikwcQlUD2NwBPSSbF8=', 'bobby', 'bobberson', 'driver', '', NULL, NULL, 0, 'primary', 0, 45.4511, -75.7611),
	(7, 'test@teaas', 'cRDtpNCeBiql5KOQsKVyrA0sAiA=', 'vaI9IQKRsEj0var9ao9459dtl7o=', 'tza', 'hagt', 'driver', '', NULL, NULL, 1, 'secondary', 0, 45.4577, -75.7659),
	(19, 'jeff@gmail.com', 'QL0AFWMIX8NRZTKeof9cXsvbvu8=', 'tmMbXh6JVDGXEQbeeAt9v2KOYlA=', 'jeff', 'peperonni', 'driver', '', NULL, NULL, 1, 'secondary', 0, 45.4554, -75.7777),
	(24, 'test@test', 'qUqP5cyxm6YcTAhz05Hph5gvu9M=', 'NFR4ga/DbooRrIsWTkOn61yWfqE=', 'taedsa', 'sdfadf', 'driver', '', NULL, NULL, 0, 'primary', 0, 45.4152, -75.8663),
	(25, 'typetest@something', 'qUqP5cyxm6YcTAhz05Hph5gvu9M=', 'Zfz9e7WZATOqxD5+mW4eD+kWoc4=', 'aaaa', 'cccc', 'driver', '', NULL, NULL, 0, 'secondary', 0, 45.4599, -75.7611),
	(26, 'driverdemo1@something.com', 'qUqP5cyxm6YcTAhz05Hph5gvu9M=', 'pEZ+nxWkKyBNeK/Z6RYzqEhX+Fc=', 'Jeff', 'Gaffingham', 'rider', '12345', NULL, NULL, 1, 'both', 0, 45.4152, -75.8663),
	(27, 'driverdemo2@something.com', 'qUqP5cyxm6YcTAhz05Hph5gvu9M=', 'beRpI+uf9zcnoAx6p1sxP+jCnSU=', 'Dwayne', 'Johnson', 'rider', '123999', NULL, NULL, 1, 'secondary', 0, 45.4152, -75.8663),
	(28, 'customerdemo@something.com', 'qUqP5cyxm6YcTAhz05Hph5gvu9M=', 'yhRJ3hYgw77vMELflvtvqZCIaMQ=', 'Russel', 'Peters', 'rider', '98982', NULL, NULL, 1, 'primary', 0, 45.4152, -75.8663);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
