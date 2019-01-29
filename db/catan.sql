/*
Navicat MySQL Data Transfer

Source Server         : 珊珊
Source Server Version : 50718
Source Host           : 127.0.0.1:3306
Source Database       : catan

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2019-01-30 07:44:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(100) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickName` varchar(255) DEFAULT NULL,
  `tongbi` int(20) DEFAULT NULL,
  `tili` int(3) DEFAULT NULL,
  `money` int(20) DEFAULT NULL,
  `head` int(3) DEFAULT NULL,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('zvnz25bs', 'q', 'q', 'Q', '2366725', '12', '438', '4');
INSERT INTO `user` VALUES ('tntzyyis', 'w', 'w', 'W', '542754', '64', '325', '2');
INSERT INTO `user` VALUES ('mgw0elds', 's', 's', 'S', '34235', '6', '3252', '1');
INSERT INTO `user` VALUES ('z21al2nj', 'a', 'a', 'A', '21443', '31', '354', '7');
INSERT INTO `user` VALUES ('rmq0avwy', 'e', 'e', 'E', '234', '34', '564', '2');
INSERT INTO `user` VALUES ('s5dsg4r5', 'r', 'r', 'R', '2145136', '3', '5546', '8');
INSERT INTO `user` VALUES ('taylal4k', 'd', 'd', 'D', '23247', '43', '3452', '4');
