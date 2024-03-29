-- MySQL Script generated by MySQL Workbench
-- Thu Oct 10 16:55:36 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema HandixInventory
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `HandixInventory` ;

-- -----------------------------------------------------
-- Schema HandixInventory
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `HandixInventory` DEFAULT CHARACTER SET utf8 ;
USE `HandixInventory` ;

-- -----------------------------------------------------
-- Table `HandixInventory`.`Part`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HandixInventory`.`Part` ;

CREATE TABLE IF NOT EXISTS `HandixInventory`.`Part` (
  `PartID` VARCHAR(20) NOT NULL,
  `PartName` VARCHAR(100) NOT NULL,
  `PartDescription` TINYTEXT NULL,
  `QuantityPerPOPS` INT UNSIGNED NOT NULL,
  `CostPerUnit` DECIMAL(9,2) UNSIGNED NOT NULL,
  `URLForReorder` MEDIUMTEXT NULL,
  `CurrentInventoryCount` INT UNSIGNED NOT NULL DEFAULT 0,
  `PartNotes` MEDIUMTEXT NULL,
  PRIMARY KEY (`PartID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HandixInventory`.`Assembly`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HandixInventory`.`Assembly` ;

CREATE TABLE IF NOT EXISTS `HandixInventory`.`Assembly` (
  `AssemblyID` VARCHAR(20) NOT NULL,
  `AssemblyName` VARCHAR(100) NOT NULL,
  `CurrentInventoryCount` INT UNSIGNED NOT NULL DEFAULT 0,
  `AssemblyNotes` MEDIUMTEXT NULL,
  `ParentAssembly` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`AssemblyID`),
  INDEX `fk_Assembly_Assembly1_idx` (`ParentAssembly` ASC),
  CONSTRAINT `fk_Assembly_Assembly1`
    FOREIGN KEY (`ParentAssembly`)
    REFERENCES `HandixInventory`.`Assembly` (`AssemblyID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `HandixInventory`.`Part_has_Assembly`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HandixInventory`.`Part_has_Assembly` ;

CREATE TABLE IF NOT EXISTS `HandixInventory`.`Part_has_Assembly` (
  `Part_PartID` VARCHAR(20) NOT NULL,
  `Assembly_AssemblyID` VARCHAR(20) NOT NULL,
  `PartCountPerAssembly` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`Part_PartID`, `Assembly_AssemblyID`),
  INDEX `fk_Part_has_Assembly_Assembly1_idx` (`Assembly_AssemblyID` ASC),
  INDEX `fk_Part_has_Assembly_Part_idx` (`Part_PartID` ASC),
  CONSTRAINT `fk_Part_has_Assembly_Part`
    FOREIGN KEY (`Part_PartID`)
    REFERENCES `HandixInventory`.`Part` (`PartID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Part_has_Assembly_Assembly1`
    FOREIGN KEY (`Assembly_AssemblyID`)
    REFERENCES `HandixInventory`.`Assembly` (`AssemblyID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
