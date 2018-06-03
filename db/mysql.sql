-- 创建用户
CREATE USER 'hybroot'@'localhost'  IDENTIFIED BY '123456'; 

-- 创建数据库
create database huiyanbang default charset utf8mb4 collate utf8mb4_unicode_ci;

-- 加数据库权限
grant all privileges on huiyanbang.* to 'hybroot'@'localhost' identified by '123456';
-- 刷新
flush privileges; 

-- 用户表
CREATE TABLE `huiyanbang`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `openid` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT 'openid',
  `nickName` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL COMMENT '昵称',
  `avatarUrl` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '头像',
  `gender` TINYINT NULL DEFAULT 0 COMMENT '1男 2女 0未知',
  `city` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '城市',
  `province` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '省份',
  `country` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '国家',
  `language` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '语言',
  `createTime` DATETIME NULL COMMENT '创建时间',
  `updateTime` DATETIME NULL COMMENT '最后修改时间',
  `status` TINYINT NULL DEFAULT 1 COMMENT '1正常 2禁用',
  PRIMARY KEY (`id`));

 
ALTER TABLE `huiyanbang`.`user` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
 


-- 音频表 慧言帮
CREATE TABLE `huiyanbang`.`audio` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'audio',
  `title` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '标题',
  `author` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '文章作者',
  `audioAuthor` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '音频作者',
  `content` VARCHAR(20000) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '文章内容',
  `time` INT(11)  NULL COMMENT '时长',
  `url` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '音频地址', 
  `type` TINYINT NULL DEFAULT 1 COMMENT '1早读 2晚讲',
  `createTime` DATETIME NULL COMMENT '创建时间',
  `updateTime` DATETIME NULL COMMENT '最后修改时间',
  `status` TINYINT NULL DEFAULT 1 COMMENT '1正常 2禁用',
  PRIMARY KEY (`id`));

-- insert
INSERT INTO `huiyanbang`.`audio` (`title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('歌曲是有记忆的', '来自网络', '鹤翔', '一种感觉,歌曲是有记忆的。某个时候你经常听的某一首歌，后来你不再听它了。但有天你偶然间路过接口拐角又刚好听到，还是会一瞬间沉寂到当时的那种心情里。这种感觉就像空气中的味道一样。那是属于你自己的味道，说不清道不明。反正你一闻到空气中某个季节的某个味道，就会回想起很久以前的某些事。即便你心里早就已经忘了,但那一瞬间，你心里还是会咯噔一下。这种感觉很奇妙，很难用言语表达出来。也许它并不能影响你当下的状态,可你心里知道，这些歌曲真真切切地承载过你的记忆。', '80', 'https://www.zourunze.com/static/wechat/audio/1.m4a', '1',now(), now(),'1');
INSERT INTO `huiyanbang`.`audio` (`title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('大地', '来自网络', '陈俊麟', '创作者不必夸耀，也不必妄自菲薄，画家把色彩留给大地，音乐家把声音留给大地，作家把文字留给大地……因为大地不欺，地无私载，我们才可以真诚地吐露，才值得用一生的力量去完成。在我们的内心深处，必然有一些东西可以超越局限，穿透生死，就像点燃黑夜的天上星月，那些超越与穿透虽然来自个人的情感，但是如果不予大地相呼应，不与季节的转移相和谐，不与日升月沉相契入，就像那玫瑰剪枝，在动剪的刹那，玫瑰已死亡。', '64', 'https://www.zourunze.com/static/wechat/audio/2.m4a', '1',now(), now(),'1');
INSERT INTO `huiyanbang`.`audio` (`title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('激昂的话', '来自网络', '鹤翔', '最激昂的话往往是低声说的。也许更加激昂的时候完全失去了声音。电闪雷鸣当然是激昂的，但我也往往震惊于那因久旱而龟裂的土的，那土的的裂纹才叫激昂！激昂是水到渠成，有时候是缓缓发展的结果。激昂又是突然的一擊、一翻，一次灵魂的突然高扬。激昂是一次牺牲，一次慷慨就义。激昂也要有自知之明。战马的激昂令人振奋，青蛙的激昂令人掩耳。真正激昂的人一定不会意识到自己在激昂，一定不承认自己在激昂。分明的意识到自己正在慷慨激昂的人，多半是在表演着激昂。', '75', 'https://www.zourunze.com/static/wechat/audio/3.m4a', '1',now(), now(),'1');
INSERT INTO `huiyanbang`.`audio` (`title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('孤困', '来自网络', '陈俊麟', '美好的创作不是玫瑰剪枝，而是走入田园去看那些盛开的玫瑰，若能瞥见玫瑰的精魂，玫瑰在心里就永远不谢，永远留香。若在某一个春日，形之笔墨，玫瑰就超越了局限，穿透了生死!洗砚池边的梅花，正是大地的梅花。清淡的墨痕，正是梅花留在大地的精魂!我们不宁静，是由于我们不完整的缘故。我们不完整，是因为我们孤困了自己。如果打开了与大地的一点灵犀，我们就走出孤困，我们就完整了，我们也宁静了，至少，在创作的时刻。', '69', 'https://www.zourunze.com/static/wechat/audio/4.m4a', '1',now(), now(),'1');
INSERT INTO `huiyanbang`.`audio` (`title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('人和人的区别', '来自网络', '吴静', '其实人和人到最后的区别，就是这一个又一个的坎儿，能熬过去，你就不一样了，可能连你自己都预料不到，在那些负重前行的日子里，能激发出自身多大的潜能来，但是你要坚信，你所付出的努力总有一天，命运会偷偷奖励你，你吃过的苦，受过的难，流过的泪，最终都会变成一束光，带你抵达你想去的地方，这一路风雨兼程，那个拼命想要打好一手烂牌的好孩子，才更值得被岁月温柔以待。', '54', 'https://www.zourunze.com/static/wechat/audio/5.m4a', '1',now(), now(),'1');
INSERT INTO `huiyanbang`.`audio` (`title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('野草', '来自网络', '鹤翔', '朋友是一名登山队员。他家里最显著的位置，常年养着一束山坡上常见的野草。一般人家都在这样的位置养名贵的花，他怎么养普通的野草？而且他对那束野草，似乎有着庄严的崇敬。他对我说：一束普通的野草，对一般人来说，什么意义也没有，对于登山队员却不同。许多队员都会有过这样的经历，在攀爬悬崖峭壁的一刹那，是抓住了一束野草而救了性命。因此，对他来说，一束野草是命悬一线时上天的恩惠。我看着那束野草，心生敬畏：不论多么的微不足道，一定都有重若千钧的时刻。我們每一个人，在世界中自有其位置与分量，任何人都不该妄自菲薄。', '72', 'https://www.zourunze.com/static/wechat/audio/6.m4a', '1',now(), now(),'1');
INSERT INTO `huiyanbang`.`audio` (`title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('哭着', '来自网络', '陈俊麟', '我们哭着来到这个世界，扮演了种种不同的角色，演出种种虚假的剧本，最后又哭着离开这世界。每天我走完了黄昏的散步，将归家的时候，我就怀着感恩的心情摸摸夕阳的头发，说一些赞美与感激的话。感恩这人世的缺憾，使我们警觉不至于堕落。感恩这都市的污染，使我们有追求明净的智慧。感恩那些看似无知的花树，使我们深刻的认清自我。即使生活条件只能像动物那样，人也不应该活得如动物失去人的有情、从容、温柔与尊严，在中国历代的忧患悲苦之中，中国人之所以没有失去本质，实在是来自这个简单的意念：“人活着，要像个人”!', '83', 'https://www.zourunze.com/static/wechat/audio/7.m4a', '1',now(), now(),'1');
INSERT INTO `huiyanbang`.`audio` (`title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('大概人这一生', '来自网络', '吴静', '大概人这一生，总会遇见这样一个人，他曾让你对明天充满期待，确没有出现在你的明天里，也正是因为这样，才会有这世间，罪难逃避命运的感慨。如果我一辈子没有结婚的念头，那我终生不嫁，这是我的选择，而不是我的失败。以前总觉得，人生最美好的就是相遇，后来才懂得，最难得的其实是重逢，因为到那时候，你刚好成熟，我恰好温柔，就像李宗盛在歌里唱到的那样，我从来不想独身，确预感晚婚，我在等，世上为一契合的灵魂。', '57', 'https://www.zourunze.com/static/wechat/audio/8.m4a', '1',now(), now(),'1');
INSERT INTO `huiyanbang`.`audio` (`title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('手中的茶杯', '来自网络', '吴静', '轻轻晃动手中的茶杯，看淡绿色的茶或针或片，忽上忽下，簇拥着，沉沉浮浮，变换着不同的位置，试图寻找－个属于自己的最佳平衡点。心急的我常常等不得茶泡好，就轻吹杯口，带动－漾－漾的茶涡，看茶叶聚聚散散，无奈分离。喝－小口茶，任清清浅浅的苦涩在舌间荡漾开来，充溢齿喉。之后，深吸－口气，余香满唇，在肺腑间蔓延开来，涤尽了－切的疲惫冷漠。人仿佛也醉了，朦胧中，久久不愿醒来。是夜，茶香满室，杯中茶由淡变浓，浮浮沉沉，聚聚散散，苦涩清香中慢慢感悟：人生亦如茶。', '85', 'https://www.zourunze.com/static/wechat/audio/9.m4a', '1',now(), now(),'1');
INSERT INTO `huiyanbang`.`audio` (`title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('余生很长', '来自网络', '吴静', '余生很长，请别慌张，在人生这条路上，我们好像被圈死在一个个方格里，不敢有太多期待，不敢走的太远，也没有余的往后退，也许正因为这样，我们才会在午夜梦回的时候轻轻问自己：难道这一生，只能有这一种活法吗？当然不，人生就像一个盛大的表盘，每个人都有自己的人生时机，有些难过失落和沮丧，不过是因为时机未到，就好像，我们会因为失去心爱之人痛苦，也会在下一个路口遇见真正对的人；就好像我们这一秒距离实现梦想还很遥远，下一秒就能迎来春暖花开。', '60', 'https://www.zourunze.com/static/wechat/audio/10.m4a', '1',now(), now(),'1');
INSERT INTO `huiyanbang`.`audio` (`title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('雨水', '来自网络', '吴静', '雨水轻轻的、柔柔的洒在大地上，冲洗掉人间的面上－切脏乱的灰尘，给人们带来清洁干净的感觉，然而冰冷的雨水却不能冲洗掉我身上灰色的心情！我从喧闹的街心走出来，那灯光的世界距我是那样地遥远。我走到那条林荫道中央，站在那里，前后只有雨声，人们不知藏到哪儿去了。这样真好！撑着－把伞，心中有－种柔软而又温馨的几乎不敢呼吸的感觉。曾经有过的－幕－幕，－个又－个镜头仿佛早就商量好，慢慢的从我雨中的眼前走过，慢慢的走过。', '68', 'https://www.zourunze.com/static/wechat/audio/11.m4a', '1',now(), now(),'1');



-- 博客表
CREATE TABLE `huiyanbang`.`blog` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` INT(11) NOT NULL COMMENT 'userId',
  `audioId` INT(11) NOT NULL COMMENT 'audioId',
  `time` INT(11)  NULL COMMENT '时长',
  `url` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '音频地址', 
  `type` TINYINT NULL DEFAULT 1 COMMENT '1早读 2晚讲',
  `isRecommend` TINYINT NULL DEFAULT 0 COMMENT '1置顶 0未置顶',
  `createTime` DATETIME NULL COMMENT '创建时间',
  `updateTime` DATETIME NULL COMMENT '最后修改时间',
  `status` TINYINT NULL DEFAULT 1 COMMENT '1正常 2禁用',
  PRIMARY KEY (`id`));

 


  
  
