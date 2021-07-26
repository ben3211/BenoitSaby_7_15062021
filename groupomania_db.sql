-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `groupomania_db` DEFAULT CHARACTER SET utf8 ;
USE `groupomania_db` ;

-- -----------------------------------------------------
-- Table `groupomania`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania_db`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `imageUrl` VARCHAR(255) NULL DEFAULT NULL,
  `isAdmin` TINYINT UNSIGNED NOT NULL DEFAULT '0',
  `createdAt` DATETIME NULL DEFAULT NULL,
  `updatedAt` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 87
DEFAULT CHARACTER SET = utf8mb3;

INSERT INTO `groupomania_db`.`user` (`id`, `username`, `email`, `password`, `isAdmin`) VALUES 
('69', 'Moderator', 'moderator@mail.com', '$2b$10$o34iPj5SFAsyZGR7YObaNeSgwXeAv14ZEgIpqyf1zuYRERAkOpQqG', '1'); 

-- -----------------------------------------------------
-- Table `groupomania`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania_db`.`post` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `content` VARCHAR(255) NOT NULL,
  `imageUrl` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `fk_userId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_post_user1_idx` (`fk_userId` ASC) VISIBLE,
  CONSTRAINT `fk_post_user1`
    FOREIGN KEY (`fk_userId`)
    REFERENCES `groupomania_db`.`user` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 164
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `groupomania`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania_db`.`comment` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `fk_userId` INT UNSIGNED NOT NULL,
  `fk_postId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user_idx` (`fk_userId` ASC) VISIBLE,
  INDEX `fk_comment_post1_idx` (`fk_postId` ASC) VISIBLE,
  CONSTRAINT `fk_comment_post1`
    FOREIGN KEY (`fk_postId`)
    REFERENCES `groupomania_db`.`post` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_comment_user`
    FOREIGN KEY (`fk_userId`)
    REFERENCES `groupomania_db`.`user` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 184
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `groupomania`.`like`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania_db`.`like` (
  `idlikes` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `like` SMALLINT NOT NULL,
  `fk_userId` INT UNSIGNED NOT NULL,
  `fk_postId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idlikes`),
  INDEX `fk_like_user1_idx` (`fk_userId` ASC) VISIBLE,
  INDEX `fk_like_post1_idx` (`fk_postId` ASC) VISIBLE,
  CONSTRAINT `fk_like_post1`
    FOREIGN KEY (`fk_postId`)
    REFERENCES `groupomania_db`.`post` (`id`),
  CONSTRAINT `fk_like_user1`
    FOREIGN KEY (`fk_userId`)
    REFERENCES `groupomania_db`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
