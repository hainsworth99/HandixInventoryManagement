/*
*********************
* Handix Scientific *
*********************
*
* PartsInAssemblies.sql - 
* Author: Harold Ainsworth
* Version 1.0: 
* 	initial add of all part-assembly relationships used in POPS manufacturing process 
*
*/

USE `HandixInventory`; 

/* data for table Part_has_Assembly */ 

INSERT INTO `Part_has_Assembly`(`Part_PartID`, `Assembly_AssemblyID`, `PartCountPerAssembly`)

	VALUES 
    
    /* ASM-0100 POPS */
    -- TODO 
    
    /* ASM-0101 POPS Baseplate Assembly */
    ('EL-0101', 'ASM-0101', 1),
    ('CON-0106', 'ASM-0101', 1),
    ('EL-0203', 'ASM-0101', 3),
    ('CON-0108', 'ASM-0101', 3),
    ('EL-0201', 'ASM-0101', 1),
    ('CON-0114', 'ASM-0101', 2),
    ('CON-0115', 'ASM-0101', 1),
    ('PP-0112', 'ASM-0101', 2),
    ('PP-0113', 'ASM-0101', 1),
    ('HW-0105', 'ASM-0101', 6),
    ('HW-0120', 'ASM-0101', 6),
    ('HW-0111', 'ASM-0101', 2),
    ('HW-0119', 'ASM-0101', 2),
    
    /* ASM-0102 POPS Chamber Assembly */ 
    ('PP-0101', 'ASM-0102', 1),
    ('OP-0106', 'ASM-0102', 1),
    ('OP-0107', 'ASM-0102', 2),
    ('PP-0104', 'ASM-0102', 1),
    ('HW-0104', 'ASM-0102', 4),
    ('HW-0203', 'ASM-0102', 1),
    ('HW-0105', 'ASM-0102', 38),
    ('PP-0111', 'ASM-0102', 1),
    ('HW-0209', 'ASM-0102', 1),
    ('HW-0113', 'ASM-0102', 7),
    ('PP-0103', 'ASM-0102', 1),
    ('EL-0107', 'ASM-0102', 1),
    ('MP-0109', 'ASM-0102', 1),
    
    /* ASM-0103 Computer Stack Assembly */
    ('EL-0103', 'ASM-0103', 1),
    ('EL-0102', 'ASM-0103', 1),
    ('EL-0205', 'ASM-0103', 1),
    ('HW-0118', 'ASM-0103', 3),
    ('HW-0116', 'ASM-0103', 3),
    ('HW-0110', 'ASM-0103', 3),
    ('HW-0117', 'ASM-0103', 1),
    ('HW-0115', 'ASM-0103', 1),
    ('HW-0109', 'ASM-0103', 1),
    ('MP-0108', 'ASM-0103', 1),
    ('HW-0001', 'ASM-0103', 1),
    
    /* ASM-0104 Chamber Cover and PMT */
    ('PP-0102', 'ASM-0104', 1),
    ('HW-0207', 'ASM-0104', 1),
    ('OP-0101', 'ASM-0104', 1),
    ('HW-0201', 'ASM-0104', 4),
    ('HW-0101', 'ASM-0104', 4),
    
    /* ASM-0105 Digitizer and Shield */
    ('CON-0105', 'ASM-0105', 6),
    ('MP-0107', 'ASM-0105', 1),
    ('MP-0106', 'ASM-0105', 1),
    ('EL-0104', 'ASM-0105', 1),
    
    /* ASM-0106 Chamber Cover and Digitizer Assembly */
    ('HW-0105', 'ASM-0106', 2),
    
    /* ASM-0107 Laser and Barrel */
    ('MP-0103', 'ASM-0107', 1),
    ('HW-0204', 'ASM-0107', 1),
    ('OP-0103', 'ASM-0107', 1),
    
    /* ASM-0108 Laser and Plate */
    ('MP-0105', 'ASM-0108', 1),
    ('HW-0102', 'ASM-0108', 3),
    ('EL-0106', 'ASM-0108', 1),
    ('EL-0206', 'ASM-0108', 1),
    
    /* ASM-0109 Laser Block Slit Holder */
    ('PP-0107', 'ASM-0109', 1),
    ('MP-0102A', 'ASM-0109', 1),
    ('HW-0114', 'ASM-0109', 2),
    ('MP-0101A', 'ASM-0109', 1),
    ('HW-0106', 'ASM-0109', 2),
    ('HW-0122', 'ASM-0109', 2),
    ('PP-0109', 'ASM-0109', 1),
    ('HW-0103', 'ASM-0109', 2),
    
    /* ASM-0110 Laser Block Assembly */
    ('PP-0105', 'ASM-0110', 1),
    ('HW-0123', 'ASM-0110', 1),
    ('HW-0107', 'ASM-0110', 3),
    ('OP-0105', 'ASM-0110', 1),
    ('HW-0206', 'ASM-0110', 2),
    ('PP-0106', 'ASM-0110', 1),
    ('OP-0104', 'ASM-0110', 1),
    ('HW-0108', 'ASM-0110', 4),
    
    /* ASM-0111B Slit Holder #2 */
    ('PP-0108B', 'ASM-0111B', 1),
    ('MP-0102B', 'ASM-0111B', 1),
    ('HW-0114', 'ASM-0111B', 2),
    ('MP-0101B', 'ASM-0111B', 1),
    ('HW-0106', 'ASM-0111B', 2),
    ('HW-0122', 'ASM-0111B', 2),
    ('PP-0109', 'ASM-0111B', 1),
    ('HW-0103', 'ASM-0111B', 2),
    
    /* ASM-0111C Slit Holder #2 */
    ('PP-0108C', 'ASM-0111C', 1),
    ('MP-0102C', 'ASM-0111C', 1),
    ('HW-0114', 'ASM-0111C', 2),
    ('MP-0101C', 'ASM-0111C', 1),
    ('HW-0106', 'ASM-0111C', 2),
    ('HW-0122', 'ASM-0111C', 2),
    ('PP-0109', 'ASM-0111C', 1),
    ('HW-0103', 'ASM-0111C', 2),
    
    /* ASM-0111D Slit Holder #2 */
    ('PP-0108D', 'ASM-0111D', 1),
    ('MP-0102D', 'ASM-0111D', 1),
    ('HW-0114', 'ASM-0111D', 2),
    ('MP-0101D', 'ASM-0111D', 1),
    ('HW-0106', 'ASM-0111D', 2),
    ('HW-0122', 'ASM-0111D', 2),
    ('PP-0109', 'ASM-0111D', 1),
    ('HW-0103', 'ASM-0111D', 2),
    
    /* ASM-0112 Mirror and Frame Assembly */ 
    ('OP-0102', 'ASM-0112', 1),
    ('PP-0110', 'ASM-0112', 1),
    ('HW-0105', 'ASM-0112', 4),
    ('HW-0122', 'ASM-0112', 4),
    ('HW-0201', 'ASM-0112', 4),
    
    /* ASM-0113 Inlet Nozzle */
    ('HW-0403', 'ASM-0113', 1),
    ('HW-0404', 'ASM-0113', 1),
    
    /* ASM-0114 LFE Assembly */
    ('HW-0401', 'ASM-0114', 2),
    ('HW-0402', 'ASM-0114', 1),
    
    /* ASM-0115 POPS Pump Assembly */
    ('HW-0301', 'ASM-0115', 1),
    ('CON-0107', 'ASM-0115', 1),
    ('CON-0101', 'ASM-0115', 2),
    
    /* ASM-0118 Short Wire Harness */
    /* ASM-0119 Long Wire Harness */
    -- long and short wire harnesses are ordered, not assembled in-house
    
    /* ASM-0122 Sheath Filter Assembly */
    ('HW-0302', 'ASM-0122', 1),
    ('HW-0303', 'ASM-0122', 1),
    ('HW-0405', 'ASM-0122', 0);

