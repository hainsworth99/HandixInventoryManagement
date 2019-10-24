/*
*********************
* Handix Scientific *
*********************
*
* Assemblies.sql - 
* Author: Harold Ainsworth
* Version 1.0: 
* 	initial add of all assemblies used in POPS manufacturing process from POPS Inventory google sheets document 
*
*/

USE `HandixInventory`; 

/* data for table `assembly` */

INSERT INTO `assembly`(`AssemblyID`, `AssemblyName`, `ParentAssembly`)

	VALUES 
    
	('ASM-0100', 'POPS', 'ASM-0100'),
	('ASM-0101', 'POPS Baseplate Assembly', 'ASM-0100'),
	('ASM-0102', 'POPS Chamber Assembly', 'ASM-0100'),
	('ASM-0103', 'Computer Stack Assembly', 'ASM-0100'),
    ('ASM-0106', 'Chamber Cover and Digitizer Assembly', 'ASM-0102'),
    ('ASM-0104', 'Chamber Cover and PMT', 'ASM-0106'),
    ('ASM-0105', 'Digitizer and Shield', 'ASM-0106'),
	('ASM-0110', 'Laser Block Assembly', 'ASM-0102'),
	('ASM-0109', 'Laser Block Slit Holder', 'ASM-0110'),
    ('ASM-0108', 'Laser and Plate', 'ASM-0110'),
    ('ASM-0107', 'Laser and Barrel', 'ASM-0108'),
	('ASM-0111B', 'Slit Holder #2', 'ASM-0102'),
	('ASM-0111C', 'Slit Holder #3', 'ASM-0102'),
	('ASM-0111D', 'Slit Holder #4', 'ASM-0102'),
	('ASM-0112', 'Mirror and Frame Assembly', 'ASM-0102'),
	('ASM-0113', 'Inlet Nozzle', 'ASM-0102'),
	('ASM-0114', 'LFE Assembly', 'ASM-0100'),
	('ASM-0115', 'POPS Pump Assembly', 'ASM-0100'),
	('ASM-0118', 'Short Wire Harness ', 'ASM-0102'),
	('ASM-0119', 'Long Wire Harness ', 'ASM-0100'),
	-- ('ASM-0121', 'POPS External Power Switch', 'ASM-0100'),
	('ASM-0122', 'Sheath Filter Assembly', 'ASM-0100');