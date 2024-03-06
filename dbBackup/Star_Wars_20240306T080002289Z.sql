-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: Star_Wars
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

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
-- Table structure for table `film`
--

DROP TABLE IF EXISTS `film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `film` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `episode_id` varchar(255) NOT NULL,
  `opening_crawl` text NOT NULL,
  `director` varchar(255) NOT NULL,
  `producer` varchar(255) NOT NULL,
  `release_date` varchar(255) NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `edited` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film`
--

LOCK TABLES `film` WRITE;
/*!40000 ALTER TABLE `film` DISABLE KEYS */;
INSERT INTO `film` VALUES (1,'A New Hope','4','It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire\'s\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire\'s\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....','George Lucas','Gary Kurtz, Rick McCallum','1977-05-25','2014-12-10 16:23:31.880000','2014-12-20 19:49:45.256000',NULL,'localhost:3000/films/1/'),(2,'The Empire Strikes Back','5','It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....','Irvin Kershner','Gary Kurtz, Rick McCallum','1980-05-17','2014-12-12 13:26:24.656000','2014-12-15 13:07:53.386000',NULL,'localhost:3000/films/2/'),(3,'Return of the Jedi','6','Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...','Richard Marquand','Howard G. Kazanjian, George Lucas, Rick McCallum','1983-05-25','2014-12-18 12:39:33.255000','2014-12-20 09:48:37.462000',NULL,'localhost:3000/films/3/'),(4,'The Phantom Menace','1','Turmoil has engulfed the\r\nGalactic Republic. The taxation\r\nof trade routes to outlying star\r\nsystems is in dispute.\r\n\r\nHoping to resolve the matter\r\nwith a blockade of deadly\r\nbattleships, the greedy Trade\r\nFederation has stopped all\r\nshipping to the small planet\r\nof Naboo.\r\n\r\nWhile the Congress of the\r\nRepublic endlessly debates\r\nthis alarming chain of events,\r\nthe Supreme Chancellor has\r\nsecretly dispatched two Jedi\r\nKnights, the guardians of\r\npeace and justice in the\r\ngalaxy, to settle the conflict....','George Lucas','Rick McCallum','1999-05-19','2014-12-19 18:52:55.740000','2014-12-20 10:54:07.216000',NULL,'localhost:3000/films/4/'),(5,'Attack of the Clones','2','There is unrest in the Galactic\r\nSenate. Several thousand solar\r\nsystems have declared their\r\nintentions to leave the Republic.\r\n\r\nThis separatist movement,\r\nunder the leadership of the\r\nmysterious Count Dooku, has\r\nmade it difficult for the limited\r\nnumber of Jedi Knights to maintain \r\npeace and order in the galaxy.\r\n\r\nSenator Amidala, the former\r\nQueen of Naboo, is returning\r\nto the Galactic Senate to vote\r\non the critical issue of creating\r\nan ARMY OF THE REPUBLIC\r\nto assist the overwhelmed\r\nJedi....','George Lucas','Rick McCallum','2002-05-16','2014-12-20 12:57:57.886000','2014-12-20 20:18:48.516000',NULL,'localhost:3000/films/5/'),(6,'Revenge of the Sith','3','War! The Republic is crumbling\r\nunder attacks by the ruthless\r\nSith Lord, Count Dooku.\r\nThere are heroes on both sides.\r\nEvil is everywhere.\r\n\r\nIn a stunning move, the\r\nfiendish droid leader, General\r\nGrievous, has swept into the\r\nRepublic capital and kidnapped\r\nChancellor Palpatine, leader of\r\nthe Galactic Senate.\r\n\r\nAs the Separatist Droid Army\r\nattempts to flee the besieged\r\ncapital with their valuable\r\nhostage, two Jedi Knights lead a\r\ndesperate mission to rescue the\r\ncaptive Chancellor....','George Lucas','Rick McCallum','2005-05-19','2014-12-20 20:49:38.403000','2014-12-20 20:47:52.073000',NULL,'localhost:3000/films/6/');
/*!40000 ALTER TABLE `film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image_person`
--

DROP TABLE IF EXISTS `image_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `personId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_41b33f410c401c115103b703969` (`personId`),
  CONSTRAINT `FK_41b33f410c401c115103b703969` FOREIGN KEY (`personId`) REFERENCES `person` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image_person`
--

LOCK TABLES `image_person` WRITE;
/*!40000 ALTER TABLE `image_person` DISABLE KEYS */;
/*!40000 ALTER TABLE `image_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1707415715063,'V11707415715063'),(2,1707415740552,'V21707415740552'),(3,1708323556318,'V31708323556318'),(4,1708582780733,'V41708582780733'),(5,1708928865859,'V51708928865859'),(6,1709185756585,'V61709185756585'),(7,1709535122503,'V71709535122503'),(8,1709619561287,'V81709619561287');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `height` varchar(255) NOT NULL,
  `mass` varchar(255) NOT NULL,
  `hair_color` varchar(255) NOT NULL,
  `skin_color` varchar(255) NOT NULL,
  `eye_color` varchar(255) NOT NULL,
  `birth_year` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `edited` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `homeworld` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bc15517e0ebbab3fd38edf4029a` (`homeworld`),
  CONSTRAINT `FK_bc15517e0ebbab3fd38edf4029a` FOREIGN KEY (`homeworld`) REFERENCES `planet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'Luke Skywalker','172','77','blond','fair','blue','19BBY','male','2014-12-09 15:50:51.644000','2014-12-20 21:17:56.891000',NULL,'localhost:3000/people/1/',1),(2,'C-3PO','167','75','n/a','gold','yellow','112BBY','n/a','2014-12-10 17:10:51.357000','2014-12-20 21:17:50.309000',NULL,'localhost:3000/people/2/',1),(3,'R2-D2','96','32','n/a','white, blue','red','33BBY','n/a','2014-12-10 17:11:50.376000','2014-12-20 21:17:50.311000',NULL,'localhost:3000/people/3/',8),(4,'Darth Vader','202','136','none','white','yellow','41.9BBY','male','2014-12-10 17:18:20.704000','2014-12-20 21:17:50.313000',NULL,'localhost:3000/people/4/',1),(5,'Leia Organa','150','49','brown','light','brown','19BBY','female','2014-12-10 17:20:09.791000','2014-12-20 21:17:50.315000',NULL,'localhost:3000/people/5/',2),(6,'Owen Lars','178','120','brown, grey','light','blue','52BBY','male','2014-12-10 17:52:14.024000','2014-12-20 21:17:50.317000',NULL,'localhost:3000/people/6/',1),(7,'Beru Whitesun lars','165','75','brown','light','blue','47BBY','female','2014-12-10 17:53:41.121000','2014-12-20 21:17:50.319000',NULL,'localhost:3000/people/7/',1),(8,'R5-D4','97','32','n/a','white, red','red','unknown','n/a','2014-12-10 17:57:50.959000','2014-12-20 21:17:50.321000',NULL,'localhost:3000/people/8/',1),(9,'Biggs Darklighter','183','84','black','light','brown','24BBY','male','2014-12-10 17:59:50.509000','2014-12-20 21:17:50.323000',NULL,'localhost:3000/people/9/',1),(10,'Obi-Wan Kenobi','182','77','auburn, white','fair','blue-gray','57BBY','male','2014-12-10 18:16:29.192000','2014-12-20 21:17:50.325000',NULL,'localhost:3000/people/10/',20),(11,'Anakin Skywalker','188','84','blond','fair','blue','41.9BBY','male','2014-12-10 18:20:44.310000','2014-12-20 21:17:50.327000',NULL,'localhost:3000/people/11/',1),(12,'Wilhuff Tarkin','180','unknown','auburn, grey','fair','blue','64BBY','male','2014-12-10 18:26:56.138000','2014-12-20 21:17:50.330000',NULL,'localhost:3000/people/12/',21),(13,'Chewbacca','228','112','brown','unknown','blue','200BBY','male','2014-12-10 18:42:45.066000','2014-12-20 21:17:50.332000',NULL,'localhost:3000/people/13/',14),(14,'Han Solo','180','80','brown','fair','brown','29BBY','male','2014-12-10 18:49:14.582000','2014-12-20 21:17:50.334000',NULL,'localhost:3000/people/14/',22),(15,'Greedo','173','74','n/a','green','black','44BBY','male','2014-12-10 19:03:30.334000','2014-12-20 21:17:50.336000',NULL,'localhost:3000/people/15/',23),(16,'Jabba Desilijic Tiure','175','1,358','n/a','green-tan, brown','orange','600BBY','hermaphrodite','2014-12-10 19:11:31.638000','2014-12-20 21:17:50.338000',NULL,'localhost:3000/people/16/',24),(18,'Wedge Antilles','170','77','brown','fair','hazel','21BBY','male','2014-12-12 13:08:06.469000','2014-12-20 21:17:50.341000',NULL,'localhost:3000/people/18/',22),(19,'Jek Tono Porkins','180','110','brown','fair','blue','unknown','male','2014-12-12 13:16:56.569000','2014-12-20 21:17:50.343000',NULL,'localhost:3000/people/19/',26),(20,'Yoda','66','17','white','green','brown','896BBY','male','2014-12-15 14:26:01.042000','2014-12-20 21:17:50.345000',NULL,'localhost:3000/people/20/',28),(21,'Palpatine','170','75','grey','pale','yellow','82BBY','male','2014-12-15 14:48:05.971000','2014-12-20 21:17:50.347000',NULL,'localhost:3000/people/21/',8),(22,'Boba Fett','183','78.2','black','fair','brown','31.5BBY','male','2014-12-15 14:49:32.457000','2014-12-20 21:17:50.349000',NULL,'localhost:3000/people/22/',10),(23,'IG-88','200','140','none','metal','red','15BBY','none','2014-12-15 14:51:10.076000','2014-12-20 21:17:50.351000',NULL,'localhost:3000/people/23/',28),(24,'Bossk','190','113','none','green','red','53BBY','male','2014-12-15 14:53:49.297000','2014-12-20 21:17:50.355000',NULL,'localhost:3000/people/24/',29),(25,'Lando Calrissian','177','79','black','dark','brown','31BBY','male','2014-12-15 14:56:32.683000','2014-12-20 21:17:50.357000',NULL,'localhost:3000/people/25/',30),(26,'Lobot','175','79','none','light','blue','37BBY','male','2014-12-15 15:01:57.178000','2014-12-20 21:17:50.359000',NULL,'localhost:3000/people/26/',6),(27,'Ackbar','180','83','none','brown mottle','orange','41BBY','male','2014-12-18 13:07:50.584000','2014-12-20 21:17:50.362000',NULL,'localhost:3000/people/27/',31),(28,'Mon Mothma','150','unknown','auburn','fair','blue','48BBY','female','2014-12-18 13:12:38.895000','2014-12-20 21:17:50.364000',NULL,'localhost:3000/people/28/',32),(29,'Arvel Crynyd','unknown','unknown','brown','fair','brown','unknown','male','2014-12-18 13:16:33.020000','2014-12-20 21:17:50.367000',NULL,'localhost:3000/people/29/',28),(30,'Wicket Systri Warrick','88','20','brown','brown','brown','8BBY','male','2014-12-18 13:21:58.954000','2014-12-20 21:17:50.369000',NULL,'localhost:3000/people/30/',7),(31,'Nien Nunb','160','68','none','grey','black','unknown','male','2014-12-18 13:26:18.541000','2014-12-20 21:17:50.371000',NULL,'localhost:3000/people/31/',33),(32,'Qui-Gon Jinn','193','89','brown','fair','blue','92BBY','male','2014-12-19 18:54:53.618000','2014-12-20 21:17:50.375000',NULL,'localhost:3000/people/32/',28),(33,'Nute Gunray','191','90','none','mottled green','red','unknown','male','2014-12-19 19:05:57.357000','2014-12-20 21:17:50.377000',NULL,'localhost:3000/people/33/',18),(34,'Finis Valorum','170','unknown','blond','fair','blue','91BBY','male','2014-12-19 19:21:45.915000','2014-12-20 21:17:50.379000',NULL,'localhost:3000/people/34/',9),(35,'Padmé Amidala','185','45','brown','light','brown','46BBY','female','2014-12-19 19:28:26.926000','2014-12-20 21:17:50.381000',NULL,'localhost:3000/people/35/',8),(36,'Jar Jar Binks','196','66','none','orange','orange','52BBY','male','2014-12-19 19:29:32.489000','2014-12-20 21:17:50.383000',NULL,'localhost:3000/people/36/',8),(37,'Roos Tarpals','224','82','none','grey','orange','unknown','male','2014-12-19 19:32:56.741000','2014-12-20 21:17:50.385000',NULL,'localhost:3000/people/37/',8),(38,'Rugor Nass','206','unknown','none','green','orange','unknown','male','2014-12-19 19:33:38.909000','2014-12-20 21:17:50.388000',NULL,'localhost:3000/people/38/',8),(39,'Ric Olié','183','unknown','brown','fair','blue','unknown','male','2014-12-19 19:45:01.522000','2014-12-20 21:17:50.392000',NULL,'localhost:3000/people/39/',8),(40,'Watto','137','unknown','black','blue, grey','yellow','unknown','male','2014-12-19 19:48:54.647000','2014-12-20 21:17:50.395000',NULL,'localhost:3000/people/40/',34),(41,'Sebulba','112','40','none','grey, red','orange','unknown','male','2014-12-19 19:53:02.586000','2014-12-20 21:17:50.397000',NULL,'localhost:3000/people/41/',35),(42,'Quarsh Panaka','183','unknown','black','dark','brown','62BBY','male','2014-12-19 19:55:43.348000','2014-12-20 21:17:50.399000',NULL,'localhost:3000/people/42/',8),(43,'Shmi Skywalker','163','unknown','black','fair','brown','72BBY','female','2014-12-19 19:57:41.191000','2014-12-20 21:17:50.401000',NULL,'localhost:3000/people/43/',1),(44,'Darth Maul','175','80','none','red','yellow','54BBY','male','2014-12-19 20:00:41.929000','2014-12-20 21:17:50.403000',NULL,'localhost:3000/people/44/',36),(45,'Bib Fortuna','180','unknown','none','pale','pink','unknown','male','2014-12-20 11:47:02.512000','2014-12-20 21:17:50.407000',NULL,'localhost:3000/people/45/',37),(46,'Ayla Secura','178','55','none','blue','hazel','48BBY','female','2014-12-20 11:48:01.172000','2014-12-20 21:17:50.409000',NULL,'localhost:3000/people/46/',37),(47,'Ratts Tyerel','79','15','none','grey, blue','unknown','unknown','male','2014-12-20 11:53:15.086000','2014-12-20 21:17:50.410000',NULL,'localhost:3000/people/47/',38),(48,'Dud Bolt','94','45','none','blue, grey','yellow','unknown','male','2014-12-20 11:57:31.858000','2014-12-20 21:17:50.414000',NULL,'localhost:3000/people/48/',39),(49,'Gasgano','122','unknown','none','white, blue','black','unknown','male','2014-12-20 12:02:12.223000','2014-12-20 21:17:50.416000',NULL,'localhost:3000/people/49/',40),(50,'Ben Quadinaros','163','65','none','grey, green, yellow','orange','unknown','male','2014-12-20 12:08:33.777000','2014-12-20 21:17:50.417000',NULL,'localhost:3000/people/50/',41),(51,'Mace Windu','188','84','none','dark','brown','72BBY','male','2014-12-20 12:12:30.846000','2014-12-20 21:17:50.420000',NULL,'localhost:3000/people/51/',42),(52,'Ki-Adi-Mundi','198','82','white','pale','yellow','92BBY','male','2014-12-20 12:15:32.293000','2014-12-20 21:17:50.422000',NULL,'localhost:3000/people/52/',43),(53,'Kit Fisto','196','87','none','green','black','unknown','male','2014-12-20 12:18:57.202000','2014-12-20 21:17:50.424000',NULL,'localhost:3000/people/53/',44),(54,'Eeth Koth','171','unknown','black','brown','brown','unknown','male','2014-12-20 12:26:47.902000','2014-12-20 21:17:50.427000',NULL,'localhost:3000/people/54/',45),(55,'Adi Gallia','184','50','none','dark','blue','unknown','female','2014-12-20 12:29:11.661000','2014-12-20 21:17:50.432000',NULL,'localhost:3000/people/55/',9),(56,'Saesee Tiin','188','unknown','none','pale','orange','unknown','male','2014-12-20 12:32:11.669000','2014-12-20 21:17:50.434000',NULL,'localhost:3000/people/56/',47),(57,'Yarael Poof','264','unknown','none','white','yellow','unknown','male','2014-12-20 12:34:48.725000','2014-12-20 21:17:50.437000',NULL,'localhost:3000/people/57/',48),(58,'Plo Koon','188','80','none','orange','black','22BBY','male','2014-12-20 12:49:19.859000','2014-12-20 21:17:50.439000',NULL,'localhost:3000/people/58/',49),(59,'Mas Amedda','196','unknown','none','blue','blue','unknown','male','2014-12-20 12:53:26.457000','2014-12-20 21:17:50.442000',NULL,'localhost:3000/people/59/',50),(60,'Gregar Typho','185','85','black','dark','brown','unknown','male','2014-12-20 13:10:10.381000','2014-12-20 21:17:50.445000',NULL,'localhost:3000/people/60/',8),(61,'Cordé','157','unknown','brown','light','brown','unknown','female','2014-12-20 13:11:39.630000','2014-12-20 21:17:50.449000',NULL,'localhost:3000/people/61/',8),(62,'Cliegg Lars','183','unknown','brown','fair','blue','82BBY','male','2014-12-20 17:59:03.958000','2014-12-20 21:17:50.451000',NULL,'localhost:3000/people/62/',1),(63,'Poggle the Lesser','183','80','none','green','yellow','unknown','male','2014-12-20 18:40:43.977000','2014-12-20 21:17:50.453000',NULL,'localhost:3000/people/63/',11),(64,'Luminara Unduli','170','56.2','black','yellow','blue','58BBY','female','2014-12-20 18:45:53.668000','2014-12-20 21:17:50.455000',NULL,'localhost:3000/people/64/',51),(65,'Barriss Offee','166','50','black','yellow','blue','40BBY','female','2014-12-20 18:46:40.440000','2014-12-20 21:17:50.457000',NULL,'localhost:3000/people/65/',51),(66,'Dormé','165','unknown','brown','light','brown','unknown','female','2014-12-20 18:49:14.640000','2014-12-20 21:17:50.460000',NULL,'localhost:3000/people/66/',8),(67,'Dooku','193','80','white','fair','brown','102BBY','male','2014-12-20 18:52:14.726000','2014-12-20 21:17:50.462000',NULL,'localhost:3000/people/67/',52),(68,'Bail Prestor Organa','191','unknown','black','tan','brown','67BBY','male','2014-12-20 18:53:08.575000','2014-12-20 21:17:50.463000',NULL,'localhost:3000/people/68/',2),(69,'Jango Fett','183','79','black','tan','brown','66BBY','male','2014-12-20 18:54:41.620000','2014-12-20 21:17:50.465000',NULL,'localhost:3000/people/69/',53),(70,'Zam Wesell','168','55','blonde','fair, green, yellow','yellow','unknown','female','2014-12-20 18:57:44.471000','2014-12-20 21:17:50.468000',NULL,'localhost:3000/people/70/',54),(71,'Dexter Jettster','198','102','none','brown','yellow','unknown','male','2014-12-20 19:28:27.248000','2014-12-20 21:17:50.470000',NULL,'localhost:3000/people/71/',55),(72,'Lama Su','229','88','none','grey','black','unknown','male','2014-12-20 19:30:50.416000','2014-12-20 21:17:50.473000',NULL,'localhost:3000/people/72/',10),(73,'Taun We','213','unknown','none','grey','black','unknown','female','2014-12-20 19:31:21.195000','2014-12-20 21:17:50.474000',NULL,'localhost:3000/people/73/',10),(74,'Jocasta Nu','167','unknown','white','fair','blue','unknown','female','2014-12-20 19:32:51.996000','2014-12-20 21:17:50.476000',NULL,'localhost:3000/people/74/',9),(75,'R4-P17','96','unknown','none','silver, red','red, blue','unknown','female','2014-12-20 19:43:36.409000','2014-12-20 21:17:50.478000',NULL,'localhost:3000/people/75/',28),(76,'Wat Tambor','193','48','none','green, grey','unknown','unknown','male','2014-12-20 19:53:52.607000','2014-12-20 21:17:50.481000',NULL,'localhost:3000/people/76/',56),(77,'San Hill','191','unknown','none','grey','gold','unknown','male','2014-12-20 19:58:17.049000','2014-12-20 21:17:50.484000',NULL,'localhost:3000/people/77/',57),(78,'Shaak Ti','178','57','none','red, blue, white','black','unknown','female','2014-12-20 20:44:01.103000','2014-12-20 21:17:50.486000',NULL,'localhost:3000/people/78/',58),(79,'Grievous','216','159','none','brown, white','green, yellow','unknown','male','2014-12-20 21:43:53.348000','2014-12-20 21:17:50.488000',NULL,'localhost:3000/people/79/',59),(80,'Tarfful','234','136','brown','brown','blue','unknown','male','2014-12-20 21:46:34.209000','2014-12-20 21:17:50.491000',NULL,'localhost:3000/people/80/',14),(81,'Raymus Antilles','188','79','brown','light','brown','unknown','male','2014-12-20 21:49:35.583000','2014-12-20 21:17:50.493000',NULL,'localhost:3000/people/81/',2),(82,'Sly Moore','178','48','none','pale','white','unknown','female','2014-12-20 22:18:37.619000','2014-12-20 21:17:50.496000',NULL,'localhost:3000/people/82/',60),(83,'Tion Medon','206','80','none','grey','black','unknown','male','2014-12-20 22:35:04.260000','2014-12-20 21:17:50.498000',NULL,'localhost:3000/people/83/',12);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person_film`
--

DROP TABLE IF EXISTS `person_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person_film` (
  `person_id` int NOT NULL,
  `film_id` int NOT NULL,
  PRIMARY KEY (`person_id`,`film_id`),
  KEY `IDX_52aefcfd3f58e9091e43396872` (`person_id`),
  KEY `IDX_22f984b92dee71af3d7daa5f82` (`film_id`),
  CONSTRAINT `person_film_character_id` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `person_film_film_id` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person_film`
--

LOCK TABLES `person_film` WRITE;
/*!40000 ALTER TABLE `person_film` DISABLE KEYS */;
INSERT INTO `person_film` VALUES (1,1),(1,2),(1,3),(1,6),(2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(3,1),(3,2),(3,3),(3,4),(3,5),(3,6),(4,1),(4,2),(4,3),(4,6),(5,1),(5,2),(5,3),(5,6),(6,1),(6,5),(6,6),(7,1),(7,5),(7,6),(8,1),(9,1),(10,1),(10,2),(10,3),(10,4),(10,5),(10,6),(11,4),(11,5),(11,6),(12,1),(12,6),(13,1),(13,2),(13,3),(13,6),(14,1),(14,2),(14,3),(15,1),(16,1),(16,3),(16,4),(18,1),(18,2),(18,3),(19,1),(20,2),(20,3),(20,4),(20,5),(20,6),(21,2),(21,3),(21,4),(21,5),(21,6),(22,2),(22,3),(22,5),(23,2),(24,2),(25,2),(25,3),(26,2),(27,3),(28,3),(29,3),(30,3),(31,3),(32,4),(33,4),(33,5),(33,6),(34,4),(35,4),(35,5),(35,6),(36,4),(36,5),(37,4),(38,4),(39,4),(40,4),(40,5),(41,4),(42,4),(43,4),(43,5),(44,4),(45,3),(46,4),(46,5),(46,6),(47,4),(48,4),(49,4),(50,4),(51,4),(51,5),(51,6),(52,4),(52,5),(52,6),(53,4),(53,5),(53,6),(54,4),(54,6),(55,4),(55,6),(56,4),(56,6),(57,4),(58,4),(58,5),(58,6),(59,4),(59,5),(60,5),(61,5),(62,5),(63,5),(63,6),(64,5),(64,6),(65,5),(66,5),(67,5),(67,6),(68,5),(68,6),(69,5),(70,5),(71,5),(72,5),(73,5),(74,5),(75,5),(75,6),(76,5),(77,5),(78,5),(78,6),(79,6),(80,6),(81,1),(81,6),(82,5),(82,6),(83,6);
/*!40000 ALTER TABLE `person_film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planet`
--

DROP TABLE IF EXISTS `planet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `rotation_period` varchar(255) NOT NULL,
  `orbital_period` text NOT NULL,
  `diameter` varchar(255) NOT NULL,
  `climate` varchar(255) NOT NULL,
  `gravity` varchar(255) NOT NULL,
  `terrain` varchar(255) NOT NULL,
  `surface_water` varchar(255) NOT NULL,
  `population` varchar(255) NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `edited` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planet`
--

LOCK TABLES `planet` WRITE;
/*!40000 ALTER TABLE `planet` DISABLE KEYS */;
INSERT INTO `planet` VALUES (1,'Tatooine','23','304','10465','arid','1 standard','desert','1','200000','2014-12-09 15:50:49.641000','2014-12-20 20:58:18.411000',NULL,'localhost:3000/planets/1/'),(2,'Alderaan','24','364','12500','temperate','1 standard','grasslands, mountains','40','2000000000','2014-12-10 13:35:48.479000','2014-12-20 20:58:18.420000',NULL,'localhost:3000/planets/2/'),(3,'Yavin IV','24','4818','10200','temperate, tropical','1 standard','jungle, rainforests','8','1000','2014-12-10 13:37:19.144000','2014-12-20 20:58:18.421000',NULL,'localhost:3000/planets/3/'),(4,'Hoth','23','549','7200','frozen','1.1 standard','tundra, ice caves, mountain ranges','100','unknown','2014-12-10 13:39:13.934000','2014-12-20 20:58:18.423000',NULL,'localhost:3000/planets/4/'),(5,'Dagobah','23','341','8900','murky','N/A','swamp, jungles','8','unknown','2014-12-10 13:42:22.590000','2014-12-20 20:58:18.425000',NULL,'localhost:3000/planets/5/'),(6,'Bespin','12','5110','118000','temperate','1.5 (surface), 1 standard (Cloud City)','gas giant','0','6000000','2014-12-10 13:43:55.240000','2014-12-20 20:58:18.427000',NULL,'localhost:3000/planets/6/'),(7,'Endor','18','402','4900','temperate','0.85 standard','forests, mountains, lakes','8','30000000','2014-12-10 13:50:29.349000','2014-12-20 20:58:18.429000',NULL,'localhost:3000/planets/7/'),(8,'Naboo','26','312','12120','temperate','1 standard','grassy hills, swamps, forests, mountains','12','4500000000','2014-12-10 13:52:31.066000','2014-12-20 20:58:18.430000',NULL,'localhost:3000/planets/8/'),(9,'Coruscant','24','368','12240','temperate','1 standard','cityscape, mountains','unknown','1000000000000','2014-12-10 13:54:13.921000','2014-12-20 20:58:18.432000',NULL,'localhost:3000/planets/9/'),(10,'Kamino','27','463','19720','temperate','1 standard','ocean','100','1000000000','2014-12-10 14:45:06.577000','2014-12-20 20:58:18.434000',NULL,'localhost:3000/planets/10/'),(11,'Geonosis','30','256','11370','temperate, arid','0.9 standard','rock, desert, mountain, barren','5','100000000000','2014-12-10 14:47:22.350000','2014-12-20 20:58:18.437000',NULL,'localhost:3000/planets/11/'),(12,'Utapau','27','351','12900','temperate, arid, windy','1 standard','scrublands, savanna, canyons, sinkholes','0.9','95000000','2014-12-10 14:49:01.491000','2014-12-20 20:58:18.439000',NULL,'localhost:3000/planets/12/'),(13,'Mustafar','36','412','4200','hot','1 standard','volcanoes, lava rivers, mountains, caves','0','20000','2014-12-10 14:50:16.526000','2014-12-20 20:58:18.440000',NULL,'localhost:3000/planets/13/'),(14,'Kashyyyk','26','381','12765','tropical','1 standard','jungle, forests, lakes, rivers','60','45000000','2014-12-10 15:32:00.124000','2014-12-20 20:58:18.442000',NULL,'localhost:3000/planets/14/'),(15,'Polis Massa','24','590','0','artificial temperate ','0.56 standard','airless asteroid','0','1000000','2014-12-10 15:33:46.405000','2014-12-20 20:58:18.444000',NULL,'localhost:3000/planets/15/'),(16,'Mygeeto','12','167','10088','frigid','1 standard','glaciers, mountains, ice canyons','unknown','19000000','2014-12-10 15:43:39.139000','2014-12-20 20:58:18.446000',NULL,'localhost:3000/planets/16/'),(17,'Felucia','34','231','9100','hot, humid','0.75 standard','fungus forests','unknown','8500000','2014-12-10 15:44:50.397000','2014-12-20 20:58:18.447000',NULL,'localhost:3000/planets/17/'),(18,'Cato Neimoidia','25','278','0','temperate, moist','1 standard','mountains, fields, forests, rock arches','unknown','10000000','2014-12-10 15:46:28.704000','2014-12-20 20:58:18.449000',NULL,'localhost:3000/planets/18/'),(19,'Saleucami','26','392','14920','hot','unknown','caves, desert, mountains, volcanoes','unknown','1400000000','2014-12-10 15:47:46.874000','2014-12-20 20:58:18.450000',NULL,'localhost:3000/planets/19/'),(20,'Stewjon','unknown','unknown','0','temperate','1 standard','grass','unknown','unknown','2014-12-10 18:16:26.566000','2014-12-20 20:58:18.452000',NULL,'localhost:3000/planets/20/'),(21,'Eriadu','24','360','13490','polluted','1 standard','cityscape','unknown','22000000000','2014-12-10 18:26:54.384000','2014-12-20 20:58:18.454000',NULL,'localhost:3000/planets/21/'),(22,'Corellia','25','329','11000','temperate','1 standard','plains, urban, hills, forests','70','3000000000','2014-12-10 18:49:12.453000','2014-12-20 20:58:18.456000',NULL,'localhost:3000/planets/22/'),(23,'Rodia','29','305','7549','hot','1 standard','jungles, oceans, urban, swamps','60','1300000000','2014-12-10 19:03:28.110000','2014-12-20 20:58:18.458000',NULL,'localhost:3000/planets/23/'),(24,'Nal Hutta','87','413','12150','temperate','1 standard','urban, oceans, swamps, bogs','unknown','7000000000','2014-12-10 19:11:29.452000','2014-12-20 20:58:18.460000',NULL,'localhost:3000/planets/24/'),(25,'Dantooine','25','378','9830','temperate','1 standard','oceans, savannas, mountains, grasslands','unknown','1000','2014-12-10 19:23:29.896000','2014-12-20 20:58:18.461000',NULL,'localhost:3000/planets/25/'),(26,'Bestine IV','26','680','6400','temperate','unknown','rocky islands, oceans','98','62000000','2014-12-12 13:16:55.078000','2014-12-20 20:58:18.463000',NULL,'localhost:3000/planets/26/'),(27,'Ord Mantell','26','334','14050','temperate','1 standard','plains, seas, mesas','10','4000000000','2014-12-15 14:23:41.661000','2014-12-20 20:58:18.464000',NULL,'localhost:3000/planets/27/'),(28,'unknown','0','0','0','unknown','unknown','unknown','unknown','unknown','2014-12-15 14:25:59.569000','2014-12-20 20:58:18.466000',NULL,'localhost:3000/planets/28/'),(29,'Trandosha','25','371','0','arid','0.62 standard','mountains, seas, grasslands, deserts','unknown','42000000','2014-12-15 14:53:47.695000','2014-12-20 20:58:18.468000',NULL,'localhost:3000/planets/29/'),(30,'Socorro','20','326','0','arid','1 standard','deserts, mountains','unknown','300000000','2014-12-15 14:56:31.121000','2014-12-20 20:58:18.469000',NULL,'localhost:3000/planets/30/'),(31,'Mon Cala','21','398','11030','temperate','1','oceans, reefs, islands','100','27000000000','2014-12-18 13:07:01.792000','2014-12-20 20:58:18.471000',NULL,'localhost:3000/planets/31/'),(32,'Chandrila','20','368','13500','temperate','1','plains, forests','40','1200000000','2014-12-18 13:11:51.872000','2014-12-20 20:58:18.472000',NULL,'localhost:3000/planets/32/'),(33,'Sullust','20','263','12780','superheated','1','mountains, volcanoes, rocky deserts','5','18500000000','2014-12-18 13:25:40.243000','2014-12-20 20:58:18.474000',NULL,'localhost:3000/planets/33/'),(34,'Toydaria','21','184','7900','temperate','1','swamps, lakes','unknown','11000000','2014-12-19 19:47:54.403000','2014-12-20 20:58:18.476000',NULL,'localhost:3000/planets/34/'),(35,'Malastare','26','201','18880','arid, temperate, tropical','1.56','swamps, deserts, jungles, mountains','unknown','2000000000','2014-12-19 19:52:13.106000','2014-12-20 20:58:18.478000',NULL,'localhost:3000/planets/35/'),(36,'Dathomir','24','491','10480','temperate','0.9','forests, deserts, savannas','unknown','5200','2014-12-19 20:00:40.142000','2014-12-20 20:58:18.480000',NULL,'localhost:3000/planets/36/'),(37,'Ryloth','30','305','10600','temperate, arid, subartic','1','mountains, valleys, deserts, tundra','5','1500000000','2014-12-20 11:46:25.740000','2014-12-20 20:58:18.481000',NULL,'localhost:3000/planets/37/'),(38,'Aleen Minor','unknown','unknown','unknown','unknown','unknown','unknown','unknown','unknown','2014-12-20 11:52:23.452000','2014-12-20 20:58:18.483000',NULL,'localhost:3000/planets/38/'),(39,'Vulpter','22','391','14900','temperate, artic','1','urban, barren','unknown','421000000','2014-12-20 11:56:58.874000','2014-12-20 20:58:18.485000',NULL,'localhost:3000/planets/39/'),(40,'Troiken','unknown','unknown','unknown','unknown','unknown','desert, tundra, rainforests, mountains','unknown','unknown','2014-12-20 12:01:37.395000','2014-12-20 20:58:18.487000',NULL,'localhost:3000/planets/40/'),(41,'Tund','48','1770','12190','unknown','unknown','barren, ash','unknown','0','2014-12-20 12:07:29.578000','2014-12-20 20:58:18.489000',NULL,'localhost:3000/planets/41/'),(42,'Haruun Kal','25','383','10120','temperate','0.98','toxic cloudsea, plateaus, volcanoes','unknown','705300','2014-12-20 12:12:28.980000','2014-12-20 20:58:18.491000',NULL,'localhost:3000/planets/42/'),(43,'Cerea','27','386','unknown','temperate','1','verdant','20','450000000','2014-12-20 12:14:48.178000','2014-12-20 20:58:18.493000',NULL,'localhost:3000/planets/43/'),(44,'Glee Anselm','33','206','15600','tropical, temperate','1','lakes, islands, swamps, seas','80','500000000','2014-12-20 12:18:26.110000','2014-12-20 20:58:18.495000',NULL,'localhost:3000/planets/44/'),(45,'Iridonia','29','413','unknown','unknown','unknown','rocky canyons, acid pools','unknown','unknown','2014-12-20 12:26:05.788000','2014-12-20 20:58:18.497000',NULL,'localhost:3000/planets/45/'),(46,'Tholoth','unknown','unknown','unknown','unknown','unknown','unknown','unknown','unknown','2014-12-20 12:28:31.117000','2014-12-20 20:58:18.498000',NULL,'localhost:3000/planets/46/'),(47,'Iktotch','22','481','unknown','arid, rocky, windy','1','rocky','unknown','unknown','2014-12-20 12:31:32.413000','2014-12-20 20:58:18.500000',NULL,'localhost:3000/planets/47/'),(48,'Quermia','unknown','unknown','unknown','unknown','unknown','unknown','unknown','unknown','2014-12-20 12:34:08.249000','2014-12-20 20:58:18.502000',NULL,'localhost:3000/planets/48/'),(49,'Dorin','22','409','13400','temperate','1','unknown','unknown','unknown','2014-12-20 12:48:36.141000','2014-12-20 20:58:18.504000',NULL,'localhost:3000/planets/49/'),(50,'Champala','27','318','unknown','temperate','1','oceans, rainforests, plateaus','unknown','3500000000','2014-12-20 12:52:51.524000','2014-12-20 20:58:18.506000',NULL,'localhost:3000/planets/50/'),(51,'Mirial','unknown','unknown','unknown','unknown','unknown','deserts','unknown','unknown','2014-12-20 18:44:46.318000','2014-12-20 20:58:18.508000',NULL,'localhost:3000/planets/51/'),(52,'Serenno','unknown','unknown','unknown','unknown','unknown','rainforests, rivers, mountains','unknown','unknown','2014-12-20 18:52:13.357000','2014-12-20 20:58:18.510000',NULL,'localhost:3000/planets/52/'),(53,'Concord Dawn','unknown','unknown','unknown','unknown','unknown','jungles, forests, deserts','unknown','unknown','2014-12-20 18:54:39.909000','2014-12-20 20:58:18.512000',NULL,'localhost:3000/planets/53/'),(54,'Zolan','unknown','unknown','unknown','unknown','unknown','unknown','unknown','unknown','2014-12-20 18:56:37.250000','2014-12-20 20:58:18.514000',NULL,'localhost:3000/planets/54/'),(55,'Ojom','unknown','unknown','unknown','frigid','unknown','oceans, glaciers','100','500000000','2014-12-20 19:27:41.286000','2014-12-20 20:58:18.516000',NULL,'localhost:3000/planets/55/'),(56,'Skako','27','384','unknown','temperate','1','urban, vines','unknown','500000000000','2014-12-20 19:50:47.864000','2014-12-20 20:58:18.517000',NULL,'localhost:3000/planets/56/'),(57,'Muunilinst','28','412','13800','temperate','1','plains, forests, hills, mountains','25','5000000000','2014-12-20 19:57:47.420000','2014-12-20 20:58:18.519000',NULL,'localhost:3000/planets/57/'),(58,'Shili','unknown','unknown','unknown','temperate','1','cities, savannahs, seas, plains','unknown','unknown','2014-12-20 20:43:14.049000','2014-12-20 20:58:18.521000',NULL,'localhost:3000/planets/58/'),(59,'Kalee','23','378','13850','arid, temperate, tropical','1','rainforests, cliffs, canyons, seas','unknown','4000000000','2014-12-20 21:43:51.278000','2014-12-20 20:58:18.523000',NULL,'localhost:3000/planets/59/'),(60,'Umbara','unknown','unknown','unknown','unknown','unknown','unknown','unknown','unknown','2014-12-20 22:18:36.256000','2014-12-20 20:58:18.525000',NULL,'localhost:3000/planets/60/');
/*!40000 ALTER TABLE `planet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planet_film`
--

DROP TABLE IF EXISTS `planet_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planet_film` (
  `planet_id` int NOT NULL,
  `film_id` int NOT NULL,
  PRIMARY KEY (`planet_id`,`film_id`),
  KEY `IDX_0eb506799ac4bf5f78570a2450` (`planet_id`),
  KEY `IDX_092b0534049588c9622b44874b` (`film_id`),
  CONSTRAINT `planet_film_film_id` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`),
  CONSTRAINT `planet_film_planet_id` FOREIGN KEY (`planet_id`) REFERENCES `planet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planet_film`
--

LOCK TABLES `planet_film` WRITE;
/*!40000 ALTER TABLE `planet_film` DISABLE KEYS */;
INSERT INTO `planet_film` VALUES (1,1),(1,3),(1,4),(1,5),(1,6),(2,1),(2,6),(3,1),(4,2),(5,2),(5,3),(5,6),(6,2),(7,3),(8,3),(8,4),(8,5),(8,6),(9,3),(9,4),(9,5),(9,6),(10,5),(11,5),(12,6),(13,6),(14,6),(15,6),(16,6),(17,6),(18,6),(19,6),(27,2);
/*!40000 ALTER TABLE `planet_film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planet_species`
--

DROP TABLE IF EXISTS `planet_species`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planet_species` (
  `planet_id` int NOT NULL,
  `species_id` int NOT NULL,
  PRIMARY KEY (`planet_id`,`species_id`),
  KEY `IDX_b1dd5afead177d1c0d2d3a79b9` (`planet_id`),
  KEY `IDX_95094b6b3dfb31859956d52396` (`species_id`),
  CONSTRAINT `planet_species_planet_id` FOREIGN KEY (`planet_id`) REFERENCES `planet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `planet_species_species_id` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planet_species`
--

LOCK TABLES `planet_species` WRITE;
/*!40000 ALTER TABLE `planet_species` DISABLE KEYS */;
/*!40000 ALTER TABLE `planet_species` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `species`
--

DROP TABLE IF EXISTS `species`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `species` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `classification` varchar(255) NOT NULL,
  `designation` varchar(255) NOT NULL,
  `average_height` varchar(255) NOT NULL,
  `skin_colors` varchar(255) NOT NULL,
  `hair_colors` varchar(255) NOT NULL,
  `eye_colors` varchar(255) NOT NULL,
  `average_lifespan` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `edited` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `homeworld` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_609aca3a2f74ce1bc351251be75` (`homeworld`),
  CONSTRAINT `FK_609aca3a2f74ce1bc351251be75` FOREIGN KEY (`homeworld`) REFERENCES `planet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `species`
--

LOCK TABLES `species` WRITE;
/*!40000 ALTER TABLE `species` DISABLE KEYS */;
INSERT INTO `species` VALUES (1,'Human','mammal','sentient','180','caucasian, black, asian, hispanic','blonde, brown, black, red','brown, blue, green, hazel, grey, amber','120','Galactic Basic','2014-12-10 15:52:11.567000','2024-03-06 06:42:36.297577',NULL,'localhost:3000/species/1/',1),(2,'Droid','artificial','sentient','n/a','n/a','n/a','n/a','indefinite','n/a','2014-12-10 17:16:16.259000','2014-12-20 21:36:42.139000',NULL,'localhost:3000/species/2/',NULL),(3,'Wookie','mammal','sentient','210','gray','black, brown','blue, green, yellow, brown, golden, red','400','Shyriiwook','2014-12-10 18:44:31.486000','2024-03-06 06:42:36.304612',NULL,'localhost:3000/species/3/',14),(4,'Rodian','sentient','reptilian','170','green, blue','n/a','black','unknown','Galatic Basic','2014-12-10 19:05:26.471000','2024-03-06 06:42:36.309761',NULL,'localhost:3000/species/4/',23),(5,'Hutt','gastropod','sentient','300','green, brown, tan','n/a','yellow, red','1000','Huttese','2014-12-10 19:12:50.410000','2024-03-06 06:42:36.314838',NULL,'localhost:3000/species/5/',24),(6,'Yoda\'s species','mammal','sentient','66','green, yellow','brown, white','brown, green, yellow','900','Galactic basic','2014-12-15 14:27:22.877000','2024-03-06 06:42:36.321431',NULL,'localhost:3000/species/6/',28),(7,'Trandoshan','reptile','sentient','200','brown, green','none','yellow, orange','unknown','Dosh','2014-12-15 15:07:47.704000','2024-03-06 06:42:36.326529',NULL,'localhost:3000/species/7/',29),(8,'Mon Calamari','amphibian','sentient','160','red, blue, brown, magenta','none','yellow','unknown','Mon Calamarian','2014-12-18 13:09:52.263000','2024-03-06 06:42:36.331991',NULL,'localhost:3000/species/8/',31),(9,'Ewok','mammal','sentient','100','brown','white, brown, black','orange, brown','unknown','Ewokese','2014-12-18 13:22:00.285000','2024-03-06 06:42:36.341152',NULL,'localhost:3000/species/9/',7),(10,'Sullustan','mammal','sentient','180','pale','none','black','unknown','Sullutese','2014-12-18 13:26:20.103000','2024-03-06 06:42:36.347744',NULL,'localhost:3000/species/10/',33),(11,'Neimodian','unknown','sentient','180','grey, green','none','red, pink','unknown','Neimoidia','2014-12-19 19:07:31.319000','2024-03-06 06:42:36.355090',NULL,'localhost:3000/species/11/',18),(12,'Gungan','amphibian','sentient','190','brown, green','none','orange','unknown','Gungan basic','2014-12-19 19:30:37.341000','2024-03-06 06:42:36.361534',NULL,'localhost:3000/species/12/',8),(13,'Toydarian','mammal','sentient','120','blue, green, grey','none','yellow','91','Toydarian','2014-12-19 19:48:56.893000','2024-03-06 06:42:36.366654',NULL,'localhost:3000/species/13/',34),(14,'Dug','mammal','sentient','100','brown, purple, grey, red','none','yellow, blue','unknown','Dugese','2014-12-19 19:53:11.214000','2024-03-06 06:42:36.371983',NULL,'localhost:3000/species/14/',35),(15,'Twi\'lek','mammals','sentient','200','orange, yellow, blue, green, pink, purple, tan','none','blue, brown, orange, pink','unknown','Twi\'leki','2014-12-20 11:48:02.406000','2024-03-06 06:42:36.377750',NULL,'localhost:3000/species/15/',37),(16,'Aleena','reptile','sentient','80','blue, gray','none','unknown','79','Aleena','2014-12-20 11:53:16.481000','2024-03-06 06:42:36.383344',NULL,'localhost:3000/species/16/',38),(17,'Vulptereen','unknown','sentient','100','grey','none','yellow','unknown','vulpterish','2014-12-20 11:57:33.128000','2024-03-06 06:42:36.388551',NULL,'localhost:3000/species/17/',39),(18,'Xexto','unknown','sentient','125','grey, yellow, purple','none','black','unknown','Xextese','2014-12-20 12:02:13.915000','2024-03-06 06:42:36.393696',NULL,'localhost:3000/species/18/',40),(19,'Toong','unknown','sentient','200','grey, green, yellow','none','orange','unknown','Tundan','2014-12-20 12:08:36.795000','2024-03-06 06:42:36.398599',NULL,'localhost:3000/species/19/',41),(20,'Cerean','mammal','sentient','200','pale pink','red, blond, black, white','hazel','unknown','Cerean','2014-12-20 12:15:33.765000','2024-03-06 06:42:36.404026',NULL,'localhost:3000/species/20/',43),(21,'Nautolan','amphibian','sentient','180','green, blue, brown, red','none','black','70','Nautila','2014-12-20 12:18:58.610000','2024-03-06 06:42:36.411112',NULL,'localhost:3000/species/21/',44),(22,'Zabrak','mammal','sentient','180','pale, brown, red, orange, yellow','black','brown, orange','unknown','Zabraki','2014-12-20 12:26:59.894000','2024-03-06 06:42:36.416660',NULL,'localhost:3000/species/22/',45),(23,'Tholothian','mammal','sentient','unknown','dark','unknown','blue, indigo','unknown','unknown','2014-12-20 12:29:13.798000','2024-03-06 06:42:36.422366',NULL,'localhost:3000/species/23/',46),(24,'Iktotchi','unknown','sentient','180','pink','none','orange','unknown','Iktotchese','2014-12-20 12:32:13.046000','2024-03-06 06:42:36.429836',NULL,'localhost:3000/species/24/',47),(25,'Quermian','mammal','sentient','240','white','none','yellow','86','Quermian','2014-12-20 12:34:50.827000','2024-03-06 06:42:36.434862',NULL,'localhost:3000/species/25/',48),(26,'Kel Dor','unknown','sentient','180','peach, orange, red','none','black, silver','70','Kel Dor','2014-12-20 12:49:21.692000','2024-03-06 06:42:36.440188',NULL,'localhost:3000/species/26/',49),(27,'Chagrian','amphibian','sentient','190','blue','none','blue','unknown','Chagria','2014-12-20 12:53:28.795000','2024-03-06 06:42:36.445559',NULL,'localhost:3000/species/27/',50),(28,'Geonosian','insectoid','sentient','178','green, brown','none','green, hazel','unknown','Geonosian','2014-12-20 18:40:45.618000','2024-03-06 06:42:36.451734',NULL,'localhost:3000/species/28/',11),(29,'Mirialan','mammal','sentient','180','yellow, green','black, brown','blue, green, red, yellow, brown, orange','unknown','Mirialan','2014-12-20 18:46:48.290000','2024-03-06 06:42:36.457047',NULL,'localhost:3000/species/29/',51),(30,'Clawdite','reptilian','sentient','180','green, yellow','none','yellow','70','Clawdite','2014-12-20 18:57:46.171000','2024-03-06 06:42:36.463144',NULL,'localhost:3000/species/30/',54),(31,'Besalisk','amphibian','sentient','178','brown','none','yellow','75','besalisk','2014-12-20 19:28:28.821000','2024-03-06 06:42:36.468405',NULL,'localhost:3000/species/31/',55),(32,'Kaminoan','amphibian','sentient','220','grey, blue','none','black','80','Kaminoan','2014-12-20 19:31:24.838000','2024-03-06 06:42:36.475082',NULL,'localhost:3000/species/32/',10),(33,'Skakoan','mammal','sentient','unknown','grey, green','none','unknown','unknown','Skakoan','2014-12-20 19:53:54.515000','2024-03-06 06:42:36.480251',NULL,'localhost:3000/species/33/',56),(34,'Muun','mammal','sentient','190','grey, white','none','black','100','Muun','2014-12-20 19:58:19.088000','2024-03-06 06:42:36.485647',NULL,'localhost:3000/species/34/',57),(35,'Togruta','mammal','sentient','180','red, white, orange, yellow, green, blue','none','red, orange, yellow, green, blue, black','94','Togruti','2014-12-20 20:44:03.246000','2024-03-06 06:42:36.492680',NULL,'localhost:3000/species/35/',58),(36,'Kaleesh','reptile','sentient','170','brown, orange, tan','none','yellow','80','Kaleesh','2014-12-20 21:45:42.537000','2024-03-06 06:42:36.498270',NULL,'localhost:3000/species/36/',59),(37,'Pau\'an','mammal','sentient','190','grey','none','black','700','Utapese','2014-12-20 22:35:06.777000','2024-03-06 06:42:36.512733',NULL,'localhost:3000/species/37/',12);
/*!40000 ALTER TABLE `species` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `species_film`
--

DROP TABLE IF EXISTS `species_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `species_film` (
  `species_id` int NOT NULL,
  `film_id` int NOT NULL,
  PRIMARY KEY (`species_id`,`film_id`),
  KEY `IDX_5faf4f27306eebd5a407e6c26e` (`species_id`),
  KEY `IDX_78aad5950b7e32ce123b5f3fed` (`film_id`),
  CONSTRAINT `species_film_film_id` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`),
  CONSTRAINT `species_film_species_id` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `species_film`
--

LOCK TABLES `species_film` WRITE;
/*!40000 ALTER TABLE `species_film` DISABLE KEYS */;
INSERT INTO `species_film` VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(3,1),(3,2),(3,3),(3,6),(4,1),(5,1),(5,3),(6,2),(6,3),(6,4),(6,5),(6,6),(7,2),(8,3),(9,3),(10,3),(11,4),(12,4),(12,5),(13,4),(13,5),(14,4),(15,3),(15,4),(15,5),(15,6),(16,4),(17,4),(18,4),(19,4),(19,6),(20,4),(20,6),(21,4),(22,4),(23,4),(23,6),(24,4),(24,6),(25,4),(25,6),(26,4),(26,6),(27,4),(27,6),(28,5),(28,6),(29,5),(29,6),(30,5),(30,6),(31,5),(32,5),(33,5),(33,6),(34,5),(34,6),(35,5),(35,6),(36,6),(37,6);
/*!40000 ALTER TABLE `species_film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `species_person`
--

DROP TABLE IF EXISTS `species_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `species_person` (
  `species_id` int NOT NULL,
  `person_id` int NOT NULL,
  PRIMARY KEY (`species_id`,`person_id`),
  KEY `IDX_5f4a67c6e3c15e881a21a419ac` (`species_id`),
  KEY `IDX_d558e4914b65efd642b9f66f13` (`person_id`),
  CONSTRAINT `species_person_person_id` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  CONSTRAINT `species_person_species_id` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `species_person`
--

LOCK TABLES `species_person` WRITE;
/*!40000 ALTER TABLE `species_person` DISABLE KEYS */;
INSERT INTO `species_person` VALUES (1,66),(1,67),(1,68),(1,74),(2,2),(2,3),(2,8),(2,23),(3,13),(3,80),(4,15),(5,16),(6,20),(7,24),(8,27),(9,30),(10,31),(11,33),(12,36),(12,37),(12,38),(13,40),(14,41),(15,45),(15,46),(16,47),(17,48),(18,49),(19,50),(20,52),(21,53),(22,44),(22,54),(23,55),(24,56),(25,57),(26,58),(27,59),(28,63),(29,64),(29,65),(30,70),(31,71),(32,72),(32,73),(33,76),(34,77),(35,78),(36,79),(37,83);
/*!40000 ALTER TABLE `species_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `starship`
--

DROP TABLE IF EXISTS `starship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `starship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `cost_in_credits` varchar(255) NOT NULL,
  `length` varchar(255) NOT NULL,
  `max_atmosphering_speed` varchar(255) NOT NULL,
  `crew` varchar(255) NOT NULL,
  `passengers` varchar(255) NOT NULL,
  `cargo_capacity` varchar(255) NOT NULL,
  `consumables` varchar(255) NOT NULL,
  `hyperdrive_rating` varchar(255) NOT NULL,
  `MGLT` varchar(255) NOT NULL,
  `starship_class` varchar(255) NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `edited` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `starship`
--

LOCK TABLES `starship` WRITE;
/*!40000 ALTER TABLE `starship` DISABLE KEYS */;
INSERT INTO `starship` VALUES (2,'CR90 corvette','CR90 corvette','Corellian Engineering Corporation','3500000','150','950','30-165','600','3000000','1 year','2.0','60','corvette','2014-12-10 16:20:33.369000','2014-12-20 21:23:49.867000',NULL,'localhost:3000/starships/2/'),(3,'Star Destroyer','Imperial I-class Star Destroyer','Kuat Drive Yards','150000000','1,600','975','47,060','n/a','36000000','2 years','2.0','60','Star Destroyer','2014-12-10 17:08:19.848000','2014-12-20 21:23:49.870000',NULL,'localhost:3000/starships/3/'),(5,'Sentinel-class landing craft','Sentinel-class landing craft','Sienar Fleet Systems, Cyngus Spaceworks','240000','38','1000','5','75','180000','1 month','1.0','70','landing craft','2014-12-10 17:48:00.586000','2014-12-20 21:23:49.873000',NULL,'localhost:3000/starships/5/'),(9,'Death Star','DS-1 Orbital Battle Station','Imperial Department of Military Research, Sienar Fleet Systems','1000000000000','120000','n/a','342,953','843,342','1000000000000','3 years','4.0','10','Deep Space Mobile Battlestation','2014-12-10 18:36:50.509000','2014-12-20 21:26:24.783000',NULL,'localhost:3000/starships/9/'),(10,'Millennium Falcon','YT-1300 light freighter','Corellian Engineering Corporation','100000','34.37','1050','4','6','100000','2 months','0.5','75','Light freighter','2014-12-10 18:59:45.094000','2014-12-20 21:23:49.880000',NULL,'localhost:3000/starships/10/'),(11,'Y-wing','BTL Y-wing','Koensayr Manufacturing','134999','14','1000km','2','0','110','1 week','1.0','80','assault starfighter','2014-12-12 13:00:39.817000','2014-12-20 21:23:49.883000',NULL,'localhost:3000/starships/11/'),(12,'X-wing','T-65 X-wing','Incom Corporation','149999','12.5','1050','1','0','110','1 week','1.0','100','Starfighter','2014-12-12 13:19:05.340000','2014-12-20 21:23:49.886000',NULL,'localhost:3000/starships/12/'),(13,'TIE Advanced x1','Twin Ion Engine Advanced x1','Sienar Fleet Systems','unknown','9.2','1200','1','0','150','5 days','1.0','105','Starfighter','2014-12-12 13:21:32.991000','2014-12-20 21:23:49.889000',NULL,'localhost:3000/starships/13/'),(15,'Executor','Executor-class star dreadnought','Kuat Drive Yards, Fondor Shipyards','1143350000','19000','n/a','279,144','38000','250000000','6 years','2.0','40','Star dreadnought','2014-12-15 14:31:42.547000','2014-12-20 21:23:49.893000',NULL,'localhost:3000/starships/15/'),(17,'Rebel transport','GR-75 medium transport','Gallofree Yards, Inc.','unknown','90','650','6','90','19000000','6 months','4.0','20','Medium transport','2014-12-15 14:34:52.264000','2014-12-20 21:23:49.895000',NULL,'localhost:3000/starships/17/'),(21,'Slave 1','Firespray-31-class patrol and attack','Kuat Systems Engineering','unknown','21.5','1000','1','6','70000','1 month','3.0','70','Patrol craft','2014-12-15 15:00:56.332000','2014-12-20 21:23:49.897000',NULL,'localhost:3000/starships/21/'),(22,'Imperial shuttle','Lambda-class T-4a shuttle','Sienar Fleet Systems','240000','20','850','6','20','80000','2 months','1.0','50','Armed government transport','2014-12-15 15:04:47.235000','2014-12-20 21:23:49.900000',NULL,'localhost:3000/starships/22/'),(23,'EF76 Nebulon-B escort frigate','EF76 Nebulon-B escort frigate','Kuat Drive Yards','8500000','300','800','854','75','6000000','2 years','2.0','40','Escort ship','2014-12-15 15:06:30.813000','2014-12-20 21:23:49.902000',NULL,'localhost:3000/starships/23/'),(27,'Calamari Cruiser','MC80 Liberty type Star Cruiser','Mon Calamari shipyards','104000000','1200','n/a','5400','1200','unknown','2 years','1.0','60','Star Cruiser','2014-12-18 12:54:57.804000','2014-12-20 21:23:49.904000',NULL,'localhost:3000/starships/27/'),(28,'A-wing','RZ-1 A-wing Interceptor','Alliance Underground Engineering, Incom Corporation','175000','9.6','1300','1','0','40','1 week','1.0','120','Starfighter','2014-12-18 13:16:34.542000','2014-12-20 21:23:49.907000',NULL,'localhost:3000/starships/28/'),(29,'B-wing','A/SF-01 B-wing starfighter','Slayn & Korpil','220000','16.9','950','1','0','45','1 week','2.0','91','Assault Starfighter','2014-12-18 13:18:04.763000','2014-12-20 21:23:49.909000',NULL,'localhost:3000/starships/29/'),(31,'Republic Cruiser','Consular-class cruiser','Corellian Engineering Corporation','unknown','115','900','9','16','unknown','unknown','2.0','unknown','Space cruiser','2014-12-19 19:01:31.488000','2014-12-20 21:23:49.912000',NULL,'localhost:3000/starships/31/'),(32,'Droid control ship','Lucrehulk-class Droid Control Ship','Hoersch-Kessel Drive, Inc.','unknown','3170','n/a','175','139000','4000000000','500 days','2.0','unknown','Droid control ship','2014-12-19 19:04:06.323000','2014-12-20 21:23:49.915000',NULL,'localhost:3000/starships/32/'),(39,'Naboo fighter','N-1 starfighter','Theed Palace Space Vessel Engineering Corps','200000','11','1100','1','0','65','7 days','1.0','unknown','Starfighter','2014-12-19 19:39:17.582000','2014-12-20 21:23:49.917000',NULL,'localhost:3000/starships/39/'),(40,'Naboo Royal Starship','J-type 327 Nubian royal starship','Theed Palace Space Vessel Engineering Corps, Nubia Star Drives','unknown','76','920','8','unknown','unknown','unknown','1.8','unknown','yacht','2014-12-19 19:45:03.506000','2014-12-20 21:23:49.919000',NULL,'localhost:3000/starships/40/'),(41,'Scimitar','Star Courier','Republic Sienar Systems','55000000','26.5','1180','1','6','2500000','30 days','1.5','unknown','Space Transport','2014-12-20 11:39:56.116000','2014-12-20 21:23:49.922000',NULL,'localhost:3000/starships/41/'),(43,'J-type diplomatic barge','J-type diplomatic barge','Theed Palace Space Vessel Engineering Corps, Nubia Star Drives','2000000','39','2000','5','10','unknown','1 year','0.7','unknown','Diplomatic barge','2014-12-20 13:05:51.237000','2014-12-20 21:23:49.925000',NULL,'localhost:3000/starships/43/'),(47,'AA-9 Coruscant freighter','Botajef AA-9 Freighter-Liner','Botajef Shipyards','unknown','390','unknown','unknown','30000','unknown','unknown','unknown','unknown','freighter','2014-12-20 19:24:23.509000','2014-12-20 21:23:49.928000',NULL,'localhost:3000/starships/47/'),(48,'Jedi starfighter','Delta-7 Aethersprite-class interceptor','Kuat Systems Engineering','180000','8','1150','1','0','60','7 days','1.0','unknown','Starfighter','2014-12-20 19:35:23.906000','2014-12-20 21:23:49.930000',NULL,'localhost:3000/starships/48/'),(49,'H-type Nubian yacht','H-type Nubian yacht','Theed Palace Space Vessel Engineering Corps','unknown','47.9','8000','4','unknown','unknown','unknown','0.9','unknown','yacht','2014-12-20 19:46:46.847000','2014-12-20 21:23:49.932000',NULL,'localhost:3000/starships/49/'),(52,'Republic Assault ship','Acclamator I-class assault ship','Rothana Heavy Engineering','unknown','752','unknown','700','16000','11250000','2 years','0.6','unknown','assault ship','2014-12-20 20:08:42.926000','2014-12-20 21:23:49.935000',NULL,'localhost:3000/starships/52/'),(58,'Solar Sailer','Punworcca 116-class interstellar sloop','Huppla Pasa Tisc Shipwrights Collective','35700','15.2','1600','3','11','240','7 days','1.5','unknown','yacht','2014-12-20 20:37:56.969000','2014-12-20 21:23:49.937000',NULL,'localhost:3000/starships/58/'),(59,'Trade Federation cruiser','Providence-class carrier/destroyer','Rendili StarDrive, Free Dac Volunteers Engineering corps.','125000000','1088','1050','600','48247','50000000','4 years','1.5','unknown','capital ship','2014-12-20 21:40:21.902000','2014-12-20 21:23:49.941000',NULL,'localhost:3000/starships/59/'),(61,'Theta-class T-2c shuttle','Theta-class T-2c shuttle','Cygnus Spaceworks','1000000','18.5','2000','5','16','50000','56 days','1.0','unknown','transport','2014-12-20 21:48:40.409000','2014-12-20 21:23:49.944000',NULL,'localhost:3000/starships/61/'),(63,'Republic attack cruiser','Senator-class Star Destroyer','Kuat Drive Yards, Allanteen Six shipyards','59000000','1137','975','7400','2000','20000000','2 years','1.0','unknown','star destroyer','2014-12-20 21:52:56.232000','2014-12-20 21:23:49.946000',NULL,'localhost:3000/starships/63/'),(64,'Naboo star skiff','J-type star skiff','Theed Palace Space Vessel Engineering Corps/Nubia Star Drives, Incorporated','unknown','29.2','1050','3','3','unknown','unknown','0.5','unknown','yacht','2014-12-20 21:55:15.396000','2014-12-20 21:23:49.948000',NULL,'localhost:3000/starships/64/'),(65,'Jedi Interceptor','Eta-2 Actis-class light interceptor','Kuat Systems Engineering','320000','5.47','1500','1','0','60','2 days','1.0','unknown','starfighter','2014-12-20 21:56:57.468000','2014-12-20 21:23:49.951000',NULL,'localhost:3000/starships/65/'),(66,'arc-170','Aggressive Reconnaissance-170 starfighte','Incom Corporation, Subpro Corporation','155000','14.5','1000','3','0','110','5 days','1.0','100','starfighter','2014-12-20 22:03:48.603000','2014-12-20 21:23:49.953000',NULL,'localhost:3000/starships/66/'),(68,'Banking clan frigte','Munificent-class star frigate','Hoersch-Kessel Drive, Inc, Gwori Revolutionary Industries','57000000','825','unknown','200','unknown','40000000','2 years','1.0','unknown','cruiser','2014-12-20 22:07:11.538000','2014-12-20 21:23:49.956000',NULL,'localhost:3000/starships/68/'),(74,'Belbullab-22 starfighter','Belbullab-22 starfighter','Feethan Ottraw Scalable Assemblies','168000','6.71','1100','1','0','140','7 days','6','unknown','starfighter','2014-12-20 22:38:05.031000','2014-12-20 21:23:49.959000',NULL,'localhost:3000/starships/74/'),(75,'V-wing','Alpha-3 Nimbus-class V-wing starfighter','Kuat Systems Engineering','102500','7.9','1050','1','0','60','15 hours','1.0','unknown','starfighter','2014-12-20 22:43:04.349000','2014-12-20 21:23:49.961000',NULL,'localhost:3000/starships/75/');
/*!40000 ALTER TABLE `starship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `starships_film`
--

DROP TABLE IF EXISTS `starships_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `starships_film` (
  `starship_id` int NOT NULL,
  `film_id` int NOT NULL,
  PRIMARY KEY (`starship_id`,`film_id`),
  KEY `IDX_199ec4b25699908a6d507dcce1` (`starship_id`),
  KEY `IDX_cb5e3484f0fe0a779049c1fe3e` (`film_id`),
  CONSTRAINT `starship_film_film_id` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`),
  CONSTRAINT `starship_film_starship_id` FOREIGN KEY (`starship_id`) REFERENCES `starship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `starships_film`
--

LOCK TABLES `starships_film` WRITE;
/*!40000 ALTER TABLE `starships_film` DISABLE KEYS */;
INSERT INTO `starships_film` VALUES (2,1),(2,3),(2,6),(3,1),(3,2),(3,3),(5,1),(9,1),(10,1),(10,2),(10,3),(11,1),(11,2),(11,3),(12,1),(12,2),(12,3),(13,1),(15,2),(15,3),(17,2),(17,3),(21,2),(21,5),(22,2),(22,3),(23,2),(23,3),(27,3),(28,3),(29,3),(31,4),(32,4),(32,5),(32,6),(39,4),(39,5),(40,4),(41,4),(43,5),(47,5),(48,5),(48,6),(49,5),(52,5),(58,5),(59,6),(61,6),(63,6),(64,6),(65,6),(66,6),(68,6),(74,6),(75,6);
/*!40000 ALTER TABLE `starships_film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `starships_person`
--

DROP TABLE IF EXISTS `starships_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `starships_person` (
  `starship_id` int NOT NULL,
  `person_id` int NOT NULL,
  PRIMARY KEY (`starship_id`,`person_id`),
  KEY `IDX_21fc491395d026eb07a518b71e` (`starship_id`),
  KEY `IDX_a5772881beef0be99f472d608d` (`person_id`),
  CONSTRAINT `starship_person_person_id` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  CONSTRAINT `starship_person_starship_id` FOREIGN KEY (`starship_id`) REFERENCES `starship` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `starships_person`
--

LOCK TABLES `starships_person` WRITE;
/*!40000 ALTER TABLE `starships_person` DISABLE KEYS */;
INSERT INTO `starships_person` VALUES (10,13),(10,14),(10,25),(10,31),(12,1),(12,9),(12,18),(12,19),(13,4),(21,22),(22,1),(22,13),(22,14),(28,29),(39,11),(39,35),(39,60),(40,39),(41,44),(48,10),(48,58),(49,35),(59,10),(59,11),(64,10),(64,35),(65,10),(65,11),(74,10),(74,79);
/*!40000 ALTER TABLE `starships_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin@test.test','02edd97f0f814a6c.a5a95295ea6f9bdd8338e123214ed14ae30532654e1a87a15eb719ef8dee8584','admin','localhost:3000/users/1/'),(2,'user@test.test','02edd97f0f814a6c.a5a95295ea6f9bdd8338e123214ed14ae30532654e1a87a15eb719ef8dee8584','user','localhost:3000/users/2/');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `cost_in_credits` varchar(255) NOT NULL,
  `length` varchar(255) NOT NULL,
  `max_atmosphering_speed` varchar(255) NOT NULL,
  `crew` varchar(255) NOT NULL,
  `passengers` varchar(255) NOT NULL,
  `cargo_capacity` varchar(255) NOT NULL,
  `consumables` varchar(255) NOT NULL,
  `vehicle_class` varchar(255) NOT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `edited` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` timestamp(6) NULL DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (4,'Sand Crawler','Digger Crawler','Corellia Mining Corporation','150000','36.8 ','30','46','30','50000','2 months','wheeled','2014-12-10 17:36:25.724000','2014-12-20 21:30:21.661000',NULL,'localhost:3000/vehicles/4/'),(6,'T-16 skyhopper','T-16 skyhopper','Incom Corporation','14500','10.4 ','1200','1','1','50','0','repulsorcraft','2014-12-10 18:01:52.434000','2014-12-20 21:30:21.665000',NULL,'localhost:3000/vehicles/6/'),(7,'X-34 landspeeder','X-34 landspeeder','SoroSuub Corporation','10550','3.4 ','250','1','1','5','unknown','repulsorcraft','2014-12-10 18:13:52.586000','2014-12-20 21:30:21.668000',NULL,'localhost:3000/vehicles/7/'),(8,'TIE/LN starfighter','Twin Ion Engine/Ln Starfighter','Sienar Fleet Systems','unknown','6.4','1200','1','0','65','2 days','starfighter','2014-12-10 18:33:52.860000','2014-12-20 21:30:21.670000',NULL,'localhost:3000/vehicles/8/'),(14,'Snowspeeder','t-47 airspeeder','Incom corporation','unknown','4.5','650','2','0','10','none','airspeeder','2014-12-15 14:22:12.000000','2014-12-20 21:30:21.672000',NULL,'localhost:3000/vehicles/14/'),(16,'TIE bomber','TIE/sa bomber','Sienar Fleet Systems','unknown','7.8','850','1','0','none','2 days','space/planetary bomber','2014-12-15 14:33:15.838000','2014-12-20 21:30:21.675000',NULL,'localhost:3000/vehicles/16/'),(18,'AT-AT','All Terrain Armored Transport','Kuat Drive Yards, Imperial Department of Military Research','unknown','20','60','5','40','1000','unknown','assault walker','2014-12-15 14:38:25.937000','2014-12-20 21:30:21.677000',NULL,'localhost:3000/vehicles/18/'),(19,'AT-ST','All Terrain Scout Transport','Kuat Drive Yards, Imperial Department of Military Research','unknown','2','90','2','0','200','none','walker','2014-12-15 14:46:42.384000','2014-12-20 21:30:21.679000',NULL,'localhost:3000/vehicles/19/'),(20,'Storm IV Twin-Pod cloud car','Storm IV Twin-Pod','Bespin Motors','75000','7','1500','2','0','10','1 day','repulsorcraft','2014-12-15 14:58:50.530000','2014-12-20 21:30:21.681000',NULL,'localhost:3000/vehicles/20/'),(24,'Sail barge','Modified Luxury Sail Barge','Ubrikkian Industries Custom Vehicle Division','285000','30','100','26','500','2000000','Live food tanks','sail barge','2014-12-18 12:44:14.217000','2014-12-20 21:30:21.684000',NULL,'localhost:3000/vehicles/24/'),(25,'Bantha-II cargo skiff','Bantha-II','Ubrikkian Industries','8000','9.5','250','5','16','135000','1 day','repulsorcraft cargo skiff','2014-12-18 12:48:03.208000','2014-12-20 21:30:21.688000',NULL,'localhost:3000/vehicles/25/'),(26,'TIE/IN interceptor','Twin Ion Engine Interceptor','Sienar Fleet Systems','unknown','9.6','1250','1','0','75','2 days','starfighter','2014-12-18 12:50:28.225000','2014-12-20 21:30:21.691000',NULL,'localhost:3000/vehicles/26/'),(30,'Imperial Speeder Bike','74-Z speeder bike','Aratech Repulsor Company','8000','3','360','1','1','4','1 day','speeder','2014-12-18 13:20:04.625000','2014-12-20 21:30:21.693000',NULL,'localhost:3000/vehicles/30/'),(33,'Vulture Droid','Vulture-class droid starfighter','Haor Chall Engineering, Baktoid Armor Workshop','unknown','3.5','1200','0','0','0','none','starfighter','2014-12-19 19:09:53.584000','2014-12-20 21:30:21.697000',NULL,'localhost:3000/vehicles/33/'),(34,'Multi-Troop Transport','Multi-Troop Transport','Baktoid Armor Workshop','138000','31','35','4','112','12000','unknown','repulsorcraft','2014-12-19 19:12:04.400000','2014-12-20 21:30:21.700000',NULL,'localhost:3000/vehicles/34/'),(35,'Armored Assault Tank','Armoured Assault Tank','Baktoid Armor Workshop','unknown','9.75','55','4','6','unknown','unknown','repulsorcraft','2014-12-19 19:13:29.799000','2014-12-20 21:30:21.703000',NULL,'localhost:3000/vehicles/35/'),(36,'Single Trooper Aerial Platform','Single Trooper Aerial Platform','Baktoid Armor Workshop','2500','2','400','1','0','none','none','repulsorcraft','2014-12-19 19:15:09.511000','2014-12-20 21:30:21.705000',NULL,'localhost:3000/vehicles/36/'),(37,'C-9979 landing craft','C-9979 landing craft','Haor Chall Engineering','200000','210','587','140','284','1800000','1 day','landing craft','2014-12-19 19:20:36.373000','2014-12-20 21:30:21.707000',NULL,'localhost:3000/vehicles/37/'),(38,'Tribubble bongo','Tribubble bongo','Otoh Gunga Bongameken Cooperative','unknown','15','85','1','2','1600','unknown','submarine','2014-12-19 19:37:37.924000','2014-12-20 21:30:21.710000',NULL,'localhost:3000/vehicles/38/'),(42,'Sith speeder','FC-20 speeder bike','Razalon','4000','1.5','180','1','0','2','unknown','speeder','2014-12-20 12:09:56.095000','2014-12-20 21:30:21.712000',NULL,'localhost:3000/vehicles/42/'),(44,'Zephyr-G swoop bike','Zephyr-G swoop bike','Mobquet Swoops and Speeders','5750','3.68','350','1','1','200','none','repulsorcraft','2014-12-20 18:24:16.026000','2014-12-20 21:30:21.714000',NULL,'localhost:3000/vehicles/44/'),(45,'Koro-2 Exodrive airspeeder','Koro-2 Exodrive airspeeder','Desler Gizh Outworld Mobility Corporation','unknown','6.6','800','1','1','80','unknown','airspeeder','2014-12-20 19:17:33.526000','2014-12-20 21:30:21.716000',NULL,'localhost:3000/vehicles/45/'),(46,'XJ-6 airspeeder','XJ-6 airspeeder','Narglatch AirTech prefabricated kit','unknown','6.23','720','1','1','unknown','unknown','airspeeder','2014-12-20 19:19:19.991000','2014-12-20 21:30:21.719000',NULL,'localhost:3000/vehicles/46/'),(50,'LAAT/i','Low Altitude Assault Transport/infrantry','Rothana Heavy Engineering','unknown','17.4','620','6','30','170','unknown','gunship','2014-12-20 20:01:21.014000','2014-12-20 21:30:21.723000',NULL,'localhost:3000/vehicles/50/'),(51,'LAAT/c','Low Altitude Assault Transport/carrier','Rothana Heavy Engineering','unknown','28.82','620','1','0','40000','unknown','gunship','2014-12-20 20:02:46.802000','2014-12-20 21:30:21.725000',NULL,'localhost:3000/vehicles/51/'),(53,'AT-TE','All Terrain Tactical Enforcer','Rothana Heavy Engineering, Kuat Drive Yards','unknown','13.2','60','6','36','10000','21 days','walker','2014-12-20 20:10:07.560000','2014-12-20 21:30:21.728000',NULL,'localhost:3000/vehicles/53/'),(54,'SPHA','Self-Propelled Heavy Artillery','Rothana Heavy Engineering','unknown','140','35','25','30','500','7 days','walker','2014-12-20 20:12:32.315000','2014-12-20 21:30:21.731000',NULL,'localhost:3000/vehicles/54/'),(55,'Flitknot speeder','Flitknot speeder','Huppla Pasa Tisc Shipwrights Collective','8000','2','634','1','0','unknown','unknown','speeder','2014-12-20 20:15:20.312000','2014-12-20 21:30:21.735000',NULL,'localhost:3000/vehicles/55/'),(56,'Neimoidian shuttle','Sheathipede-class transport shuttle','Haor Chall Engineering','unknown','20','880','2','6','1000','7 days','transport','2014-12-20 20:25:44.912000','2014-12-20 21:30:21.739000',NULL,'localhost:3000/vehicles/56/'),(57,'Geonosian starfighter','Nantex-class territorial defense','Huppla Pasa Tisc Shipwrights Collective','unknown','9.8','20000','1','0','unknown','unknown','starfighter','2014-12-20 20:34:12.541000','2014-12-20 21:30:21.742000',NULL,'localhost:3000/vehicles/57/'),(60,'Tsmeu-6 personal wheel bike','Tsmeu-6 personal wheel bike','Z-Gomot Ternbuell Guppat Corporation','15000','3.5','330','1','1','10','none','wheeled walker','2014-12-20 21:43:54.870000','2014-12-20 21:30:21.745000',NULL,'localhost:3000/vehicles/60/'),(62,'Emergency Firespeeder','Fire suppression speeder','unknown','unknown','unknown','unknown','2','unknown','unknown','unknown','fire suppression ship','2014-12-20 21:50:58.559000','2014-12-20 21:30:21.749000',NULL,'localhost:3000/vehicles/62/'),(67,'Droid tri-fighter','tri-fighter','Colla Designs, Phlac-Arphocc Automata Industries','20000','5.4','1180','1','0','0','none','droid starfighter','2014-12-20 22:05:19.992000','2014-12-20 21:30:21.752000',NULL,'localhost:3000/vehicles/67/'),(69,'Oevvaor jet catamaran','Oevvaor jet catamaran','Appazanna Engineering Works','12125','15.1','420','2','2','50','3 days','airspeeder','2014-12-20 22:20:53.931000','2014-12-20 21:30:21.756000',NULL,'localhost:3000/vehicles/69/'),(70,'Raddaugh Gnasp fluttercraft','Raddaugh Gnasp fluttercraft','Appazanna Engineering Works','14750','7','310','2','0','20','none','air speeder','2014-12-20 22:21:55.648000','2014-12-20 21:30:21.759000',NULL,'localhost:3000/vehicles/70/'),(71,'Clone turbo tank','HAVw A6 Juggernaut','Kuat Drive Yards','350000','49.4','160','20','300','30000','20 days','wheeled walker','2014-12-20 22:24:45.587000','2014-12-20 21:30:21.762000',NULL,'localhost:3000/vehicles/71/'),(72,'Corporate Alliance tank droid','NR-N99 Persuader-class droid enforcer','Techno Union','49000','10.96','100','0','4','none','none','droid tank','2014-12-20 22:26:55.522000','2014-12-20 21:30:21.765000',NULL,'localhost:3000/vehicles/72/'),(73,'Droid gunship','HMP droid gunship','Baktoid Fleet Ordnance, Haor Chall Engineering','60000','12.3','820','0','0','0','none','airspeeder','2014-12-20 22:32:05.687000','2014-12-20 21:30:21.768000',NULL,'localhost:3000/vehicles/73/'),(76,'AT-RT','All Terrain Recon Transport','Kuat Drive Yards','40000','3.2','90','1','0','20','1 day','walker','2014-12-20 22:47:49.189000','2014-12-20 21:30:21.772000',NULL,'localhost:3000/vehicles/76/');
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles_film`
--

DROP TABLE IF EXISTS `vehicles_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles_film` (
  `vehicle_id` int NOT NULL,
  `film_id` int NOT NULL,
  PRIMARY KEY (`vehicle_id`,`film_id`),
  KEY `IDX_5419daffae6088b3809c93cd79` (`vehicle_id`),
  KEY `IDX_afc98cd9b4ed2555ad1fda3738` (`film_id`),
  CONSTRAINT `vehicles_film_film_id` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`),
  CONSTRAINT `vehicles_film_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles_film`
--

LOCK TABLES `vehicles_film` WRITE;
/*!40000 ALTER TABLE `vehicles_film` DISABLE KEYS */;
INSERT INTO `vehicles_film` VALUES (4,1),(4,5),(6,1),(7,1),(8,1),(8,2),(8,3),(14,2),(16,2),(16,3),(18,2),(18,3),(19,2),(19,3),(20,2),(24,3),(25,3),(26,3),(30,3),(33,4),(33,6),(34,4),(35,4),(36,4),(37,4),(38,4),(42,4),(44,5),(45,5),(46,5),(50,5),(50,6),(51,5),(53,5),(53,6),(54,5),(55,5),(56,5),(56,6),(57,5),(60,6),(62,6),(67,6),(69,6),(70,6),(71,6),(72,6),(73,6),(76,6);
/*!40000 ALTER TABLE `vehicles_film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles_person`
--

DROP TABLE IF EXISTS `vehicles_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles_person` (
  `vehicle_id` int NOT NULL,
  `person_id` int NOT NULL,
  PRIMARY KEY (`vehicle_id`,`person_id`),
  KEY `IDX_8a743eebcb4295fa098b1100a5` (`vehicle_id`),
  KEY `IDX_bc7633a1366439bcee113a033c` (`person_id`),
  CONSTRAINT `vehicles_person_person_id` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  CONSTRAINT `vehicles_person_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles_person`
--

LOCK TABLES `vehicles_person` WRITE;
/*!40000 ALTER TABLE `vehicles_person` DISABLE KEYS */;
INSERT INTO `vehicles_person` VALUES (14,1),(14,18),(19,13),(30,1),(30,5),(38,10),(38,32),(42,44),(44,11),(45,70),(46,11),(55,67),(60,79);
/*!40000 ALTER TABLE `vehicles_person` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-06 10:00:02
