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
  `pairedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `disbandedOn` datetime DEFAULT NULL,
  PRIMARY KEY (`teamID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table dd4me.team: ~0 rows (approximately)
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
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
  `requesterID` int(11) DEFAULT NULL,
  `tripStatus` enum('requested','ongoing','done') DEFAULT NULL,
  `originLat` varchar(50) DEFAULT NULL,
  `originLng` varchar(50) DEFAULT NULL,
  `destLat` varchar(50) DEFAULT NULL,
  `destLng` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tripID`) USING BTREE,
  KEY `userID` (`requesterID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table dd4me.trip: ~4 rows (approximately)
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` (`tripID`, `requesterID`, `tripStatus`, `originLat`, `originLng`, `destLat`, `destLng`) VALUES
	(1, 25, 'requested', '45.456743', '-75.760582', '45.460185', '-75.753401'),
	(2, 25, 'requested', '45.456743', '-75.760582', '45.460185', '-75.753401'),
	(3, 24, 'requested', '45.412383', '-75.865184', '45.414094', '-75.855176'),
	(4, 24, 'requested', '45.412919', '-75.862137', '45.411491', '-75.855717');
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table dd4me.user: ~5 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`userID`, `email`, `passHash`, `cookieHash`, `fName`, `lName`, `type`, `phone`, `amtLastTrip`, `amtSinceLastPay`, `onShift`, `shiftType`, `inTeam`, `currLocationLat`, `currLocationLng`) VALUES
	(5, 'bob@gmail.com', 'CkK2udzVafmQ3N5A9P9zxaJOuQQ=', 'jjUKfRPE4ikwcQlUD2NwBPSSbF8=', 'bobby', 'bobberson', 'driver', '', NULL, NULL, 1, 'primary', 0, 45.4511, -75.7611),
	(7, 'test@teaas', 'cRDtpNCeBiql5KOQsKVyrA0sAiA=', 'vaI9IQKRsEj0var9ao9459dtl7o=', 'tza', 'hagt', 'driver', '', NULL, NULL, 1, 'secondary', 0, 45.4577, -75.7659),
	(19, 'jeff@gmail.com', 'QL0AFWMIX8NRZTKeof9cXsvbvu8=', 'tmMbXh6JVDGXEQbeeAt9v2KOYlA=', 'jeff', 'peperonni', 'driver', '', NULL, NULL, 1, 'both', 0, 45.4554, -75.7777),
	(24, 'test@test', 'qUqP5cyxm6YcTAhz05Hph5gvu9M=', '7EII+q68LbDPxTD8nfSl5z1Khvs=', 'taedsa', 'sdfadf', 'driver', '', NULL, NULL, 1, 'both', 0, 45.4565, -75.7999),
	(25, 'typetest@something', 'qUqP5cyxm6YcTAhz05Hph5gvu9M=', 'Zfz9e7WZATOqxD5+mW4eD+kWoc4=', 'aaaa', 'cccc', 'driver', '', NULL, NULL, 1, 'secondary', 0, 45.4599, -75.7611);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
