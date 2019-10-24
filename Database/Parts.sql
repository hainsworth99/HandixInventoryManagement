/*
*********************
* Handix Scientific *
*********************
*
* Parts.sql - 
* Author: Harold Ainsworth
* Version 1.0: 
* 	initial add of all parts used in POPS manufacturing process from POPS Inventory google sheets document 
*
*/

USE `HandixInventory`; 

/* data for table `part` */

INSERT INTO `part`(`PartID`, `PartName`, `PartDescription`, `QuantityPerPOPS`, `CostPerUnit`)

	VALUES

	/* Connecters */ 
	('CON-0101', 'Socket Contact 22-24 AWG Crimp', NULL, 2, 0.32),
    ('CON-0102', 'Minifit Jr Socket Contact Crimp M', 'Male', 2, 0.20),
    ('CON-0103', 'Minifit Jr Socket Contact Crimp F', 'Female', 4, 0.40), 
    ('CON-0104', 'Laser Crimps', NULL, 14, 1.54), 
    ('CON-0105', 'Socket Receptacle', 'For PMT', 6, 2.76),
    ('CON-0106', 'Pump Power Baseplate Header', NULL, 1, 0.84),
	('CON-0107', 'Pump Power Connector Housing', NULL, 1, 0.27),
	('CON-0108', 'Minifit Jr 2 POS Connector Header', NULL, 3, 1.95), 
	('CON-0109', 'Minifit Jr 2 POS Rectangular Housing Connector', NULL, 2, 0.54),
	('CON-0110', 'Pico-Clasp 2 POS Housing Connector Receptacle', NULL, 1, 0.27),
	('CON-0111', 'Pico-Clasp 5 POS Housing Connector Receptacle', NULL, 2, 0.54),
	('CON-0112', 'Pico-Clasp 7 POS Connector Header Surface Mount', NULL, 2, 1.58), 
	('CON-0113', 'Pico-Clasp 7 POS Housing Connector Receptacle', NULL, 2, 0.86), 
	('CON-0114', '46 Pin Baseplate Header', NULL, 2, 4.70),
	('CON-0114B', '46 Pin Cape Connector', NULL, 2, 6.38),
    ('CON-0115', '14 Pin Baseplate Header', 'Cut from CON-0114', 1, 0),
    
    /* Electrical Components */ 
    ('EL-0101', 'POPS Baseplate', NULL, 1, 167.00), 
	('EL-0102', 'BeagleBone Black', 'Industrial 4G', 1, 75.07),
	('EL-0103', 'Cape', 'Including old capes (EL-0103B)', 1, 382.00),
	('EL-0104', 'Digitizer', NULL, 1, 228.00),
	('EL-0105', 'Laser Connector', NULL, 1, 0),
	('EL-0107', 'Laser Connector with Pico-Clasp', NULL, 1, 6.15),
	('EL-0106', 'Laser Circuit Board', NULL, 1, 11.00),
	('EL-0201', 'Differential Pressure Sensor', NULL, 1, 68.99),
	('EL-0203', 'Super Caps 5F 5.4V', NULL, 3, 47.91),
	('EL-0204', 'SATA Cable 4in', NULL, 1, 2.53),
	('EL-0205', 'uSD Card', '32 GB', 1, 8.49),
	('EL-0206', 'Laser Heater', NULL, 1, 21.15),
	('EL-0207', 'POPS Battery', NULL, 1, 0),
	('EL-0210', 'POPS Laser 405nm', NULL, 1, 0),
	('EL-0213', 'Thermistor Assembly', NULL, 1, 3.19),
	('EL-0214', 'POPS Power Adapters', NULL, 1, 0),
	('EL-0215', 'Cape Battery - BR-1225', NULL, 1, 1.25),
    
    /* Hardware */ 
	('HW-0001', 'Serial Label', NULL, 1, 1.82),
	('HW-0101', 'Pan Head Phillips M2-0.4mm x 6 mm', NULL, 4, 0.37),
	('HW-0102', 'Flat Head Phillips 0-80 1/8"', NULL, 3, 0.25),
	('HW-0103', 'SHCS 2-56 3/16"', NULL, 6, 0.35),
	('HW-0104', 'SHCS 2-56 1/4"', NULL, 4, 0.25),
	('HW-0105', 'SHCS 2-56 5/16"', NULL, 44, 2.86),
	('HW-0106', 'SHCS 2-56 3/8"', NULL, 8, 0.54),
	('HW-0107', 'SHCS 2-56 1/2"', NULL, 3, 0.19),
	('HW-0108', 'Flat Head Phillips 2-56 5/8"', NULL, 4, 0.19),
	('HW-0109', 'Pan Head Phillips 4-40 1/4"', NULL, 1, 0.03),
	('HW-0110', 'Nylon Pan Head Phillips 4-40 1/4"', NULL, 3, 0.17),
	('HW-0111', 'Pan Head Phillips 4-40 11/16"', NULL, 2, 0.09),
	('HW-0112', 'Pan Head Phillips Seal Screw 4-40 1/4"', NULL, 7, 0.32),
	('HW-0113', 'Pan Head Phillips Seal Screw 8-32 1/4"', NULL, 7, 5.40),
	('HW-0114', 'Narrow Hex Nut 2-56', NULL, 8, 0.29),
	('HW-0115', 'Hex Nut 4-40', NULL, 3, 0.09),
	('HW-0116', 'Nylon Hex Nut 4-40', NULL, 8, 0.57),
	('HW-0117', 'Standoff 4-40 1/4" Hex 1/4"', NULL, 1, 1.46),
	('HW-0118', 'Nylon Standoff 4-40 1/4" Hex 1/4"', NULL, 8, 2.56),
	('HW-0119', '18-8 SS Nylon Insert Locknut 4-40', NULL, 2, 0.08),
	('HW-0120', 'No. 2 Washer', NULL, 6, 0.08),
	('HW-0121', 'No. 2 External-Tooth Lock Washer', NULL, 2, 0.05),
	('HW-0122', 'Compression Spring 0.25in x 0.125in OD', NULL, 12, 5.17),
	('HW-0123', 'Stacked Wave Disc Spring .4125in x 0.24in', NULL, 1, 4.78),
	('HW-0125', 'Cone Point Socket Set Screw M3', NULL, 0, 0),
	('HW-0126', 'Brass Inserts', NULL, 0, 0),
	('HW-0127', 'Chamber Outlet Washer', NULL, 1, 0),
	('HW-0201', 'O-Ring -001-1/2 1/32 FW', NULL, 4, 0.96),
	('HW-0203', 'O-Ring -006 1/16 FW', NULL, 1, 0.16),
	('HW-0204', 'O-Ring 1.5mm W 6mm ID', NULL, 1, 0.18),
	('HW-0205', 'O-Ring 1mm W 7mm ID', NULL, 0, 0),
	('HW-0206', 'O-Ring 1mm W 8.5mm ID', NULL, 2, 0.26),
	('HW-0207', 'O-Ring -013 1/16 FW', NULL, 1, 0.17),
	('HW-0208', 'O-Ring -016 1/16 FW', NULL, 1, 0.18),
	('HW-0209', 'O-Ring -043 1/16 FW', NULL, 1, 0.98),
	('HW-0301', 'Miniature Rotary Vane Pump', NULL, 1, 45.57),
	('HW-0302', 'Sheath Inlet Filter', NULL, 1, 6.80),
	('HW-0303', 'Orifice (0.040" diam)', NULL, 1, 1.60),
	('HW-0304', 'Hose Clamp', NULL, 2, 0.33),
	('HW-0401', 'LFE Short Tube', NULL, 2, 0),
	('HW-0402', 'LFE Long Tube', NULL, 1, 0),
	('HW-0403', 'Outer Inlet Tube', NULL, 1, 1.00),
	('HW-0404', 'Inner Inlet Tube', NULL, 1, 0),
	('HW-0405', 'Blue Silicon Tubing (total cut)', NULL, 1, 0.75),
	('HW-0405A', '5" Blue Silicon Tubing', NULL, 1, 0),
	('HW-0405B', '3" Blue Silicon Tubing', NULL, 1, 0),
	('HW-0405C', '2.75" Blue Silicon Tubing', NULL, 1, 0),
	('HW-0405D', '1" Blue Silicon Tubing', NULL, 1, 0),
    
    /* machined parts */ 
	('MP-0101A', 'Laser Block Horizontal Slit Plate .056"', NULL, 1, 1.70),
	('MP-0101B', 'Mount 2 Horizontal Slit Plate .046"', NULL, 1, 1.70),
	('MP-0101C', 'Mount 3 Horizontal Slit Plate .042"', NULL, 1, 1.70),
	('MP-0101D', 'Mount 4 Horizontal Slit Plate .066"', NULL, 1, 1.70),
	('MP-0102A', 'Laser Block Vertical Slit Plate .031"', NULL, 1, 1.70),
	('MP-0102B', 'Mount 2 Vertical Slit Plate .023"', NULL, 1, 1.70),
	('MP-0102C', 'Mount 3 Vertical Slit Plate .051"', NULL, 1, 1.70),
	('MP-0102D', 'Mount 4 Vertical Slit Plate .106"', NULL, 1, 1.70),
	('MP-0103', 'Laser Optics Outer Barrel', NULL, 1, 12.83),
	('MP-0104', 'Barrel Insert with Lens and Retaining Ring', NULL, 1, 0),
	('MP-0105', 'Laser Mounting Plate', NULL, 1, 22.75),
	('MP-0106', 'EMI Shield Cover', NULL, 1, 3.80),
	('MP-0107', 'EMI Shield Fence', NULL, 1, 2.93),
	('MP-0108', 'BBB Cover', NULL, 1, 8.00),
	('MP-0109', 'Chamber Outlet Tube 0.61"', NULL, 1, 0),
    
    /* optical parts */ 
	('OP-0101', 'Photomultiplier Tube', 'PMT', 1, 411.00),
	('OP-0102', 'Spherical Mirror', NULL, 1, 38.50),
	('OP-0103', 'Laser Diode', '405 nm', 1, 8.00),
	('OP-0104', 'Round Laser Lens 25 mm', NULL, 1, 49.00),
	('OP-0105', 'Round Laser Lens 75 mm', NULL, 1, 49.00),
	('OP-0106', 'OD2.0 ND Filter', NULL, 1, 8.78),
	('OP-0107', 'OD3.0 ND Filter', NULL, 1, 8.78),
    
    /* printed parts */
	('PP-0101', 'POPS Main Housing', NULL, 1, 88.00),
	('PP-0102', 'POPS Cover', NULL, 1, 27.00),
	('PP-0103', 'Dump Cover', NULL, 1, 7.00),
	('PP-0104', 'Inlet Manifold', NULL, 1, 6.00),
	('PP-0105', 'Laser Block Backing', NULL, 1, 12.00),
	('PP-0106', 'Laser Block Middle', NULL, 1, 8.00),
	('PP-0107', 'Laser Block Slit Holder', NULL, 1, 6.00),
	('PP-0108', 'Slit Holder', NULL, 1, 9.50),
	('PP-0108B', 'Slit Holder #2', NULL, 1, 9.50),
	('PP-0108C', 'Slit Holder #3', NULL, 1, 9.50),
	('PP-0108D', 'Slit Holder #4', NULL, 1, 9.50),
	('PP-0109', 'Slit Clamp', NULL, 4, 8.00),
	('PP-0110', 'POPS Mirror Frame', NULL, 1, 4.00),
	('PP-0111', 'Light Baffel', NULL, 1, 6.00),
	('PP-0112', 'LFE Mounting Bracket', NULL, 2, 20.00),
	('PP-0113', 'Filter Mounting Bracket', NULL, 1, 8.00);
    