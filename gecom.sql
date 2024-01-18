DROP DATABASE IF EXISTS gecom ;

CREATE DATABASE gecom ;
USE gecom;

CREATE TABLE famille (
    id INT AUTO_INCREMENT PRIMARY KEY,
    famille VARCHAR(255)
);

CREATE TABLE article (
    id INT AUTO_INCREMENT PRIMARY KEY,
    designation VARCHAR(255),
    prix_ht DOUBLE(8, 2),
    tva DOUBLE(8, 2),
    stock INT,
    famille_id INT,
    FOREIGN KEY (famille_id) REFERENCES famille(id) ON DELETE CASCADE
);

CREATE TABLE client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    adresse VARCHAR(255),
    ville VARCHAR(255)
);

CREATE TABLE caissier (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    poste VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    admin TINYINT(1)
);

CREATE TABLE bonLivraison (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    regle TINYINT(1),
    client_id INT,
    caissier_id INT,
    FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE,
    FOREIGN KEY (caissier_id) REFERENCES caissier(id) ON DELETE CASCADE
);

CREATE TABLE modeReglement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mode VARCHAR(255)
);

CREATE TABLE detailBl (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT,
    bl_id INT,
    qte DOUBLE(8, 2),
    FOREIGN KEY (article_id) REFERENCES article(id) ON DELETE CASCADE,
    FOREIGN KEY (bl_id) REFERENCES bonLivraison(id) ON DELETE CASCADE
);

CREATE TABLE reglement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    montant DOUBLE(8, 2),
    bl_id INT,
    mode_id INT,
    FOREIGN KEY (bl_id) REFERENCES bonLivraison(id) ON DELETE CASCADE,
    FOREIGN KEY (mode_id) REFERENCES modeReglement(id) ON DELETE CASCADE
);


DELIMITER $$
CREATE TRIGGER t1 AFTER UPDATE ON detailBl
FOR EACH ROW
BEGIN
    UPDATE article
    SET stock = stock + (OLD.qte - NEW.qte)
    WHERE id = NEW.article_id;
END;
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER t2 AFTER INSERT ON detailBl
FOR EACH ROW
BEGIN
    UPDATE article
    SET stock = stock  - NEW.qte
    WHERE id = NEW.article_id;
END;
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER t3 BEFORE DELETE ON detailBl
FOR EACH ROW
BEGIN
    UPDATE article
    SET stock = stock +  OLD.qte
    WHERE id = OLD.article_id;
END;
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER t4 BEFORE DELETE ON bonLivraison
FOR EACH ROW
BEGIN
    Delete from detailBl where bl_id=old.id;
END;
$$
DELIMITER ;

INSERT INTO `famille` (`id`, `famille`) VALUES
(1, 'Fruits'),
(2, 'Vegetables'),
(3, 'Clothes'),
(4, 'Cars'),
(5, 'Electronics');

INSERT INTO `article` (`id`, `designation`, `prix_ht`, `tva`, `stock`, `famille_id`) VALUES
(1, 'BMW', 300000.00, 0.20, 150, 4),
(2, 'Mercedes', 250000.00, 0.20, 130, 4),
(3, 'Banana', 10.00, 0.20, 500, 1),
(4, 'Apple', 10.00, 0.20, 600, 1),
(5, 'Onion', 7.00, 0.20, 5600, 2),
(6, 'Potato', 8.00, 0.20, 6000, 2),
(7, 'Gloves', 40.00, 0.30, 90, 3),
(8, 'Pants', 150.00, 0.30, 600, 3),
(9, 'Carrots', 8.00, 0.20, 560, 2),
(10, 'Tomato', 12.00, 0.20, 200, 1);

INSERT INTO `client` (`id`, `nom`, `prenom`, `adresse`, `ville`) VALUES
(1, 'Passager', '', '----', '----'),
(2, 'Johns', 'Kira', '335 Bosco Spurs\nJacobiton, GA 34719', 'Vickyfort'),
(3, 'Schumm', 'Rex', '667 Witting Summit\nBeierborough, GA 79484-1014', 'North Alvisland'),
(4, 'Bogisich', 'Kavon', '1703 Hodkiewicz Islands Apt. 999\nEast Nikkofurt, AL 92006-7223', 'West Calebland'),
(5, 'Miller', 'Darion', '91956 Mraz Centers\nEast Joanberg, ID 69762', 'New Sharon'),
(6, 'Waters', 'Alexandra', '6681 Dietrich Fork Apt. 088\nEast Melisashire, CO 63727-0954', 'Emelieburgh'),
(7, 'Berge', 'Rosie', '2833 Glover Shore\nReichelchester, NC 09019-1126', 'West Nolafurt'),
(8, 'Russel', 'Shanie', '5000 Frederic Lake Apt. 414\nHarrismouth, CO 83201', 'East Maximillian'),
(9, 'Kemmer', 'Abigale', '18924 Zemlak Plain Suite 509\nNorth Jaime, KY 49824-3360', 'West Taniaton'),
(10, 'Cassin', 'Tyreek', '7776 Halvorson Walks Apt. 625\nMozellborough, ID 80592', 'Teaganview'),
(11, 'Ankunding', 'Rosendo', '347 Kristina Junctions\nEmardmouth, TN 43356', 'Schmittberg'),
(12, 'Herzog', 'Salvatore', '74794 Bogisich Lights Apt. 144\nSouth Issac, CA 78220', 'Schmittport'),
(13, 'Rowe', 'Herminia', '7930 Toy Garden Apt. 545\nCoraberg, CT 89395-7051', 'Hodkiewiczfort'),
(14, 'Gerlach', 'Johnny', '9207 Yesenia Rue Apt. 869\nHannahmouth, WY 46112', 'Port Domenica'),
(15, 'Crist', 'Evert', '24744 Blaise Rapids Apt. 675\nSouth Retaville, CT 80780', 'Miracleville'),
(16, 'Christiansen', 'Milan', '65942 Adelle Plaza\nRogertown, DC 19475-8795', 'Chasityside'),
(17, 'Considine', 'Marcus', '434 Ardith Court Apt. 767\nLake Cary, NM 46658', 'West Amina'),
(18, 'Dickens', 'Luisa', '224 Kuhic Villages\nTorphaven, AZ 62799-5353', 'East Cleoburgh'),
(19, 'Monahan', 'Greg', '1635 Gloria Turnpike Suite 958\nNilshaven, MI 68498', 'Pourosberg'),
(20, 'Rice', 'Caesar', '810 Jabari Rapid Suite 299\nLake Loy, MI 25901', 'Lake Alberthaton'),
(21, 'Stokes', 'Rex', '764 Bogisich Station Apt. 827\nWest Keon, IA 28752-1016', 'Elyssaport'),
(22, 'Tremblay', 'Elvie', '52329 Weissnat Coves Apt. 967\nWest Oriestad, AZ 65451-8608', 'New Randyport'),
(23, 'Windler', 'Hershel', '62504 Myrna Plaza\nIsacside, GA 34009', 'Lake Adriennebury'),
(24, 'Armstrong', 'Genesis', '412 Greenfelder Estate\nAmelyborough, RI 46841-7895', 'Klockoshire'),
(25, 'Lueilwitz', 'Dejah', '43749 Cristopher Branch Apt. 926\nKuvalisfurt, NY 11742', 'Lelahport'),
(26, 'Morar', 'Aimee', '57140 Verda Corners Apt. 841\nSouth Graysonmouth, OH 44972-6848', 'New Geneville'),
(27, 'Schumm', 'Garrett', '6182 Okuneva Manors\nWellingtonview, DC 49283-5679', 'West Kaylee'),
(28, 'Lubowitz', 'Alayna', '460 Nolan Common\nIcieshire, MO 45096-0432', 'Noemieside'),
(29, 'Heller', 'Edwina', '59422 Schiller Expressway\nWatsicatown, DC 23157-9364', 'Rutherfordmouth'),
(30, 'Reinger', 'Roselyn', '464 Vincent Rapids\nWest Al, TN 80948', 'Port Pietro'),
(31, 'Dickens', 'Jonathon', '410 Lucious Heights Apt. 826\nVerdieton, NE 81652', 'Ernserfort'),
(32, 'Lueilwitz', 'Hester', '248 Bartell Place Suite 843\nEast Rhiannafurt, WV 95276-0961', 'Lake Hiltonstad'),
(33, 'Larson', 'Joyce', '5833 Parisian Pass Apt. 975\nEffertzside, OR 27413', 'West Ottilie'),
(34, 'Herman', 'Brooklyn', '82932 Ebony Fort Suite 103\nPhoebestad, FL 31786-1476', 'Hellermouth'),
(35, 'Bednar', 'Krystal', '503 McCullough Coves Apt. 626\nMathewfort, KS 20276', 'North Nyasia'),
(36, 'Collins', 'Wilfredo', '1340 Hillary Path Apt. 675\nEast Ruby, MD 43390-3214', 'Billybury'),
(37, 'Strosin', 'Cale', '102 Marquis Knolls Apt. 954\nWest Roychester, OH 96529', 'East Kaylahfort'),
(38, 'Gaylord', 'Sigrid', '43379 Simeon Underpass Suite 059\nMagdalenafurt, NV 34955', 'Stanleystad'),
(39, 'Parisian', 'Lilly', '2348 Elvera Lakes Suite 109\nJanychester, MT 20885-1506', 'East Clarabellemouth'),
(40, 'Morar', 'Bethany', '2582 Georgette Crest\nShieldsside, SC 16291', 'Jakobton'),
(41, 'Wisoky', 'Alfredo', '10489 Alexandrine Park Apt. 845\nMarvinland, OR 21045-4397', 'Wintheiserton'),
(42, 'Morar', 'Eve', '40820 Nienow Walks Suite 348\nCassinville, TX 01272', 'Mannmouth'),
(43, 'VonRueden', 'Julian', '64736 Baumbach Cliff\nJacintomouth, MD 77461', 'West Cortezberg'),
(44, 'Cole', 'Kitty', '15362 Dickens Plains\nNicolasville, FL 99813-2516', 'Port Kayafurt'),
(45, 'Witting', 'Jose', '313 Hane Roads\nNorth Jadamouth, OR 75665-2878', 'Edmondview'),
(46, 'Kreiger', 'Doug', '180 Barrows Mountains\nTerrymouth, CA 45317', 'North Maybellebury'),
(47, 'Emmerich', 'Alejandra', '4296 Buckridge Manors\nKiehnhaven, LA 27566', 'South Sadie'),
(48, 'Walsh', 'Emmy', '62241 Elinore Walks\nNew Kaileybury, WI 33710', 'Morissettetown'),
(49, 'Considine', 'Krystal', '9561 Shemar Crescent Suite 380\nStacyville, TN 61292-9365', 'East Reaganmouth'),
(50, 'Davis', 'Malika', '76711 Treva Center Suite 033\nAmandachester, VA 76620-1420', 'South Albinborough'),
(51, 'Emmerich', 'Jaleel', '9312 Wilderman Dam\nHowestad, ME 44842', 'South Jabari'),
(52, 'Bernhard', 'Ryley', '908 Huels Route\nHeloiseshire, AK 45380', 'New Colten'),
(53, 'Murray', 'Kameron', '5815 Barton Expressway Suite 234\nKuphalstad, WV 43581', 'Douglasbury'),
(54, 'Vandervort', 'Sister', '440 Treutel Land\nTremaynemouth, MD 15847-2625', 'East Noreneton'),
(55, 'Cassin', 'Annabelle', '83172 Louisa Burg Apt. 468\nWillmsstad, NY 53772', 'Rahsaanfort'),
(56, 'Hirthe', 'Syble', '882 Fisher Islands\nPricetown, MI 53843-9498', 'Lake Omarihaven'),
(57, 'Johnson', 'Lydia', '271 Mayer Forks Suite 546\nSouth Tristianfurt, NY 37550', 'Domenicstad'),
(58, 'Terry', 'Aleen', '8312 Konopelski Vista\nShieldsburgh, IN 63798-3178', 'South Alta'),
(59, 'Renner', 'Jalyn', '55196 Christiansen Flat Apt. 735\nVivianefurt, VA 79837', 'East Tryciafurt'),
(60, 'Reichert', 'Marcella', '15570 Parker Roads Apt. 428\nWest Wilton, CO 73139', 'Paucekhaven'),
(61, 'Sporer', 'Adaline', '3904 Simonis Ways Apt. 354\nPort Eunaport, VA 19789', 'East Therese'),
(62, 'Quitzon', 'Ettie', '516 Kling Mall Suite 718\nHaneton, VA 23111', 'North Lavonne'),
(63, 'Harber', 'Zachary', '55249 Shayna Lock Suite 899\nWest Laurenmouth, KY 39845-8865', 'Amayatown'),
(64, 'Huel', 'Angela', '83677 Sammy Views Apt. 032\nNew Veda, CO 53591-9090', 'Labadiehaven'),
(65, 'Harris', 'Emmanuel', '73884 Ansley Light\nSouth Priceberg, MO 19217', 'Kovacekshire'),
(66, 'Roob', 'Zane', '9640 Ignacio Ford\nGaylordside, AR 32388-3616', 'West Lyric'),
(67, 'Parisian', 'Alberto', '2583 Weston Throughway Apt. 779\nWest Giovani, VA 07393', 'Langworthmouth'),
(68, 'Rempel', 'Sherwood', '9877 Marlene Square\nNew Zacheryview, FL 04080', 'Schuppeview'),
(69, 'Cassin', 'Destany', '569 Lisandro Dam\nSouth Eveline, IN 30260-1960', 'Rosinaport'),
(70, 'Lowe', 'Toby', '706 Alysson Loaf Apt. 373\nBeerland, UT 31516-5761', 'Daughertymouth'),
(71, 'Boehm', 'Darrel', '255 Eino Manors\nMayfort, TX 84926', 'North Cecil'),
(72, 'Kerluke', 'Mathias', '985 Patrick Square Apt. 620\nEmmittburgh, MT 56615', 'North Tracey'),
(73, 'Thiel', 'Eileen', '5082 Salvador Route Suite 913\nOrnport, NY 32093-8554', 'Port Emilmouth'),
(74, 'Kovacek', 'Rhoda', '59497 Douglas Bridge\nKesslerchester, NC 44513-9100', 'Shannybury'),
(75, 'Stoltenberg', 'Thurman', '346 Rosenbaum Rue Suite 394\nPort Gerardshire, TN 48989', 'Stromantown'),
(76, 'Gibson', 'Arely', '135 Kaylie Harbor\nHadleyville, ME 15042', 'Garrickstad'),
(77, 'Waelchi', 'Adam', '684 Jasper Neck Suite 825\nShanahanbury, UT 37035-6841', 'Jeffreyshire'),
(78, 'Emard', 'Orval', '977 Kyla Lakes Suite 206\nShyanneland, AK 74563', 'Grantfort'),
(79, 'Pacocha', 'Vito', '8825 Price Ferry\nNew Kalefort, IA 87253', 'Littelhaven'),
(80, 'Kulas', 'Johathan', '993 Glover Stravenue\nNew Lyric, VT 27074-4270', 'West Monica'),
(81, 'Kuphal', 'Aaliyah', '825 Larson Ridges\nGaylechester, WA 54462-8724', 'Filomenamouth'),
(82, 'Douglas', 'Natalia', '226 Dewitt Mall Apt. 771\nLebsackmouth, MS 50990', 'Rosenbaumhaven'),
(83, 'Emmerich', 'Dovie', '6087 Colleen Cliffs Apt. 776\nEast Keeley, FL 59966-8030', 'Loweport'),
(84, 'Jacobson', 'Orion', '81447 Anibal Tunnel\nSalvatoreberg, WV 10365', 'Boehmfurt'),
(85, 'Gulgowski', 'Lenny', '535 Yessenia Tunnel Suite 890\nGenevieveville, MD 56686', 'Conntown'),
(86, 'Wolff', 'Lloyd', '65238 Reilly Well Apt. 894\nNew Maximillia, ND 37954-7105', 'Abernathyville'),
(87, 'Boyer', 'Royal', '549 Sincere Springs Suite 378\nSouth Greysonland, CA 03987-0703', 'Mialand'),
(88, 'Altenwerth', 'Reed', '22422 Lucinda Plaza Apt. 107\nClarabelleborough, KS 17095-2974', 'North Adriannaborough'),
(89, 'Effertz', 'Presley', '1590 Brook Orchard Apt. 793\nHowefurt, IL 30734', 'South Cleorahaven'),
(90, 'McLaughlin', 'Adolphus', '92469 Horace Extensions\nJanaeberg, AL 10996', 'Petehaven'),
(91, 'Schaden', 'Tia', '965 Krystal Mission\nAndersonborough, AL 95316-6813', 'East Dessie'),
(92, 'Conn', 'Albert', '9014 Hudson Ports Apt. 292\nWest Uriahbury, PA 69358', 'New Luebury'),
(93, 'Huels', 'Merl', '4302 Braeden Glens\nAleneberg, ND 97670', 'Waelchiburgh'),
(94, 'Wuckert', 'Ruthie', '51505 Nitzsche Ports\nWest Jay, VA 37779-5753', 'East Veronicaton'),
(95, 'Waelchi', 'Jana', '59719 Rowe Pines Suite 902\nNew Treva, HI 73342', 'North Antonietta'),
(96, 'Leannon', 'Tiana', '6673 Michele Ridge Suite 811\nWest Toy, AL 57424-2541', 'Edview'),
(97, 'Bogan', 'Fred', '94888 O\'Keefe Lakes\nPathaven, OR 96037-5973', 'Hamillton'),
(98, 'Pagac', 'Brant', '760 Bartoletti Court\nNorth Rickey, VT 29033', 'Satterfieldtown'),
(99, 'Dare', 'Estel', '5972 Johnston Summit Suite 538\nLockmanland, AR 21470-6498', 'Norbertoland'),
(100, 'Veum', 'Jean', '9989 Hartmann Ford\nRobynview, OR 24067', 'Camdenmouth'),
(101, 'Stracke', 'Rodrigo', '4382 Emerald Mall Suite 561\nNew Kieraberg, CO 39881-3376', 'Sarahmouth'),
(102, 'Hamill', 'Enoch', '66515 Schmeler Freeway Suite 237\nJavonfurt, IL 53809-5127', 'Port Kasandra'),
(103, 'Erdman', 'Avery', '6225 Kemmer Island\nLaurinemouth, VA 59229', 'Mosciskiview'),
(104, 'Crooks', 'Nayeli', '238 Bashirian Islands\nEast Kylee, FL 99247', 'Florianside'),
(105, 'Kreiger', 'Joey', '792 Ignacio Curve\nErdmanstad, OK 87223-2766', 'Keelingland'),
(106, 'Mitchell', 'Barbara', '406 Gutkowski Pass\nDonnafort, MA 67206-1929', 'New Davon'),
(107, 'Mante', 'Dayna', '97451 Schmitt Meadows\nLorashire, OH 10526', 'Jaymemouth'),
(108, 'Nicolas', 'Shanie', '151 Annetta Shore\nSouth Araland, MN 87980', 'South Cesarhaven'),
(109, 'Sipes', 'Mateo', '6369 Wintheiser Dale Apt. 551\nNew Armani, NC 24444-9966', 'North Heather'),
(110, 'Hyatt', 'Alfonso', '1296 Herzog Lakes Suite 760\nLake Terrell, NV 69425', 'Macejkovicmouth'),
(111, 'Bednar', 'Makenzie', '2715 Abagail Trace\nNorth Jewell, NY 37702-8014', 'Clevechester'),
(112, 'O\'Connell', 'Rebeka', '354 Chauncey Dale Suite 559\nFabiolafort, DE 06308-1617', 'Justicetown'),
(113, 'Oberbrunner', 'Adella', '7801 Schmidt Pike Apt. 031\nMontehaven, WA 10804', 'Pollichport'),
(114, 'Anderson', 'Jimmy', '116 Gottlieb Wells Suite 045\nSouth Emmaleeville, IA 43035', 'Ratkeburgh'),
(115, 'Rowe', 'Carissa', '9868 Pouros Plaza\nLottiefurt, RI 62192-4928', 'Kutchton'),
(116, 'Ullrich', 'Rigoberto', '4850 Olson Ports Apt. 631\nFayton, AL 16984-2096', 'Port Mattmouth'),
(117, 'Lang', 'Lupe', '60716 Parker Stravenue\nAufderharchester, MI 30262-4554', 'North Tyra'),
(118, 'Wilkinson', 'Hilton', '1520 Isabel Mountains Apt. 879\nErynhaven, KY 41643', 'West Alexandrine'),
(119, 'Thompson', 'Gerard', '466 Amy Camp Suite 265\nSouth Imogene, IL 52517', 'West Keiraview'),
(120, 'O\'Reilly', 'Eloise', '210 Cynthia Bridge Suite 472\nNew Jorge, AL 27295-3062', 'North Stewartton'),
(121, 'Yost', 'Mina', '7748 Stehr Extension\nWest Boville, WY 81328-0519', 'West Denashire'),
(122, 'Lind', 'Mariam', '6446 Kuhic Dam Apt. 974\nEast Glenda, TX 04909-2824', 'Betsymouth'),
(123, 'Keeling', 'Denis', '477 Kozey Springs\nAxelburgh, MO 37528-8612', 'Thadchester'),
(124, 'Ullrich', 'Dedrick', '77070 Legros Terrace\nLake Missouribury, OK 93513', 'Cormierchester'),
(125, 'Beatty', 'Nakia', '8838 Kilback Groves\nBrakusberg, WI 86615', 'South Mosesfort'),
(126, 'Spencer', 'Malvina', '577 Jett Dam Suite 426\nSouth Jaylenshire, CO 61255-3312', 'West Laurieborough'),
(127, 'Emmerich', 'Rachel', '1278 Johnston Spur Suite 864\nNew Destinimouth, CA 16219', 'Huelsborough'),
(128, 'Murphy', 'Abel', '3162 Abby Mountain\nWintheiserborough, AL 87030-6862', 'Collinsview'),
(129, 'Kessler', 'Dewayne', '806 Frederick Plaza Apt. 893\nLake Ettie, MT 36170-1226', 'Mikaylaton'),
(130, 'Cassin', 'Patricia', '24439 Tatyana Trail\nNorth Raquelton, TN 10766-7743', 'South Lolabury'),
(131, 'Kulas', 'Martina', '20229 McCullough Isle Suite 041\nFaheystad, ID 88764', 'Kieranfurt'),
(132, 'Feil', 'Mayra', '546 Braulio Corner\nEast Myaport, WV 82809-9912', 'Skylaton'),
(133, 'Strosin', 'Cordelia', '76235 Jude Burg Apt. 031\nSouth Avis, ND 06789', 'Hamillburgh'),
(134, 'Ernser', 'Zakary', '182 Dickinson Vista\nReinholdview, AR 11535', 'New Enrique'),
(135, 'Connelly', 'Petra', '7864 Jadon Rue\nDoylemouth, ID 64537', 'South Devinchester'),
(136, 'Lind', 'Pasquale', '9982 Boyer Lock Suite 760\nCorwinville, MT 11321', 'Vernonburgh'),
(137, 'Dietrich', 'Dana', '52998 Kling Throughway Suite 509\nPort Nicolaview, NC 18444', 'Smithamtown'),
(138, 'Cummerata', 'Randi', '36505 Metz Road Suite 863\nJohnstonbury, PA 08876-7617', 'Lindton'),
(139, 'Lynch', 'Jamil', '667 Kub Dale Suite 673\nShyannhaven, NJ 51780', 'Corwinborough'),
(140, 'Schulist', 'Emmalee', '29967 Beatty Falls Suite 483\nDamienland, HI 29284', 'Helenastad'),
(141, 'Crooks', 'Hilario', '525 Bechtelar Locks Suite 692\nSouth Effiehaven, CT 15909-0142', 'New Lisaton'),
(142, 'O\'Connell', 'Jasen', '26377 Schinner Passage\nEast Ansley, NE 85429', 'Josueberg'),
(143, 'Jenkins', 'Stacey', '816 Welch River\nBalistreriside, KY 64231', 'New Suzanne'),
(144, 'Gottlieb', 'Vinnie', '98180 Borer Parkways\nHumbertoland, NH 14702', 'Nicolashaven'),
(145, 'Osinski', 'Kayli', '4246 Bogan Pines Apt. 218\nPort Estherside, HI 12972', 'Cheyanneborough'),
(146, 'King', 'Minnie', '15600 Alejandrin Gateway\nNew Elisa, VT 72538', 'East Sebastian'),
(147, 'Labadie', 'Adella', '2195 Bailee Vista Suite 201\nNew Clementine, NM 30135-7889', 'East Henderson'),
(148, 'Carroll', 'Zita', '12174 Colten Hill Suite 393\nAuerfort, MA 33242', 'North Kelleychester'),
(149, 'Anderson', 'Lindsay', '18590 Rubye Course\nReynaborough, ID 82862', 'Lake Ikemouth'),
(150, 'Effertz', 'Eldridge', '979 Eleanore Row Suite 780\nLake Maurice, CT 17154-4123', 'Beaulahton');

INSERT INTO `caissier` (`id`, `nom`, `prenom`, `poste`, `email`, `password`, `admin`) VALUES
(1, 'SEBAA', 'Mohammed', 'Owner', 'admin@gmail.com', 'admin', 1),
(2, 'Boutarbouch', 'Mohammed', 'CEO', 'boutarbouch@gmail.com', 'boutarbouch', 1),
(3, 'Messi', 'Leonnel', 'caissier', 'messi@gmail.com', 'messi', 0),
(4, 'Nuer', 'Manuel', 'caissier', 'nuer@gmail.com', 'nuer', 0),
(5, 'Ronaldo', 'Cristiano', 'caissier', 'ronaldo@gmail.com', 'ronaldo', 0),
(6, 'Ziyech', 'Hakim', 'caissier', 'ziyech@gmail.com', 'ziyech', 0);

INSERT INTO modeReglement VALUES (1,'Cheque'),(2,'Espece'),(3,'Virement'),(4,'Depot');


