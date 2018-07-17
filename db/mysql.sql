-- 创建用户
CREATE USER 'hybroot'@'localhost'  IDENTIFIED BY '123456'; 

-- 创建数据库
create database huiyanbang default charset utf8mb4 collate utf8mb4_general_ci;

-- 加数据库权限
grant all privileges on huiyanbang.* to 'hybroot'@'localhost' identified by '123456';
-- 刷新
flush privileges; 

-- 用户表
CREATE TABLE `huiyanbang`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `openid` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT 'openid',
  `nickName` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci' NULL COMMENT '昵称',
  `avatarUrl` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '头像',
  `gender` TINYINT NULL DEFAULT 0 COMMENT '1男 2女 0未知',
  `city` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '城市',
  `province` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '省份',
  `country` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '国家',
  `language` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '语言',
  `days` INT(11)  NULL DEFAULT 0 COMMENT '连续打卡天数',
  `createTime` DATETIME NULL COMMENT '创建时间',
  `updateTime` DATETIME NULL COMMENT '最后修改时间',
  `status` TINYINT NULL DEFAULT 1 COMMENT '1正常 2禁用',
  PRIMARY KEY (`id`));

 
ALTER TABLE `huiyanbang`.`user` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;



-- 音频表 慧言帮
CREATE TABLE `huiyanbang`.`audio` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'audio',
  `title` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '标题',
  `author` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '文章作者',
  `audioAuthor` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '音频作者',
  `content` VARCHAR(20000) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '文章内容',
  `time` INT(11)  NULL COMMENT '时长',
  `url` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '音频地址', 
  `banner` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT 'banner地址', 
  `type` TINYINT NULL DEFAULT 1 COMMENT '类型',
  `createTime` DATETIME NULL COMMENT '创建时间',
  `updateTime` DATETIME NULL COMMENT '最后修改时间',
  `status` TINYINT NULL DEFAULT 1 COMMENT '1正常 2禁用',
  PRIMARY KEY (`id`));


-- 排序表
CREATE TABLE `huiyanbang`.`recommend` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'recommend',
  `audioId` INT(11) NOT NULL COMMENT 'audioId',
  `sort` INT(11)  NOT NULL COMMENT '排序',
  `createTime` DATETIME NULL COMMENT '创建时间',
  PRIMARY KEY (`id`));

--  
-- INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (1,1 ,now());
-- INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (2,2 ,now());
-- INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (3,3 ,now());
-- 

-- insert
-- INSERT INTO `huiyanbang`.`audio` (`banner`, `title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('https://www.zourunze.com/static/wechat/images/1.jpg', '歌曲是有记忆的', '来自网络', '鹤翔', '一种感觉,歌曲是有记忆的。某个时候你经常听的某一首歌，后来你不再听它了。但有天你偶然间路过接口拐角又刚好听到，还是会一瞬间沉寂到当时的那种心情里。这种感觉就像空气中的味道一样。那是属于你自己的味道，说不清道不明。反正你一闻到空气中某个季节的某个味道，就会回想起很久以前的某些事。即便你心里早就已经忘了,但那一瞬间，你心里还是会咯噔一下。这种感觉很奇妙，很难用言语表达出来。也许它并不能影响你当下的状态,可你心里知道，这些歌曲真真切切地承载过你的记忆。', '80', 'https://www.zourunze.com/static/wechat/audio/1.m4a', '1',now(), now(),'1');
-- INSERT INTO `huiyanbang`.`audio` (`banner`, `title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('https://www.zourunze.com/static/wechat/images/2.jpg', '大地', '来自网络', '陈俊麟', '创作者不必夸耀，也不必妄自菲薄，画家把色彩留给大地，音乐家把声音留给大地，作家把文字留给大地……因为大地不欺，地无私载，我们才可以真诚地吐露，才值得用一生的力量去完成。在我们的内心深处，必然有一些东西可以超越局限，穿透生死，就像点燃黑夜的天上星月，那些超越与穿透虽然来自个人的情感，但是如果不予大地相呼应，不与季节的转移相和谐，不与日升月沉相契入，就像那玫瑰剪枝，在动剪的刹那，玫瑰已死亡。', '64', 'https://www.zourunze.com/static/wechat/audio/2.m4a', '2',now(), now(),'1');
-- INSERT INTO `huiyanbang`.`audio` (`banner`, `title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('https://www.zourunze.com/static/wechat/images/3.jpg', '激昂的话', '来自网络', '鹤翔', '最激昂的话往往是低声说的。也许更加激昂的时候完全失去了声音。电闪雷鸣当然是激昂的，但我也往往震惊于那因久旱而龟裂的土的，那土的的裂纹才叫激昂！激昂是水到渠成，有时候是缓缓发展的结果。激昂又是突然的一擊、一翻，一次灵魂的突然高扬。激昂是一次牺牲，一次慷慨就义。激昂也要有自知之明。战马的激昂令人振奋，青蛙的激昂令人掩耳。真正激昂的人一定不会意识到自己在激昂，一定不承认自己在激昂。分明的意识到自己正在慷慨激昂的人，多半是在表演着激昂。', '75', 'https://www.zourunze.com/static/wechat/audio/3.m4a', '3',now(), now(),'1');
-- INSERT INTO `huiyanbang`.`audio` (`banner`, `title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('https://www.zourunze.com/static/wechat/images/4.jpg', '孤困', '来自网络', '陈俊麟', '美好的创作不是玫瑰剪枝，而是走入田园去看那些盛开的玫瑰，若能瞥见玫瑰的精魂，玫瑰在心里就永远不谢，永远留香。若在某一个春日，形之笔墨，玫瑰就超越了局限，穿透了生死!洗砚池边的梅花，正是大地的梅花。清淡的墨痕，正是梅花留在大地的精魂!我们不宁静，是由于我们不完整的缘故。我们不完整，是因为我们孤困了自己。如果打开了与大地的一点灵犀，我们就走出孤困，我们就完整了，我们也宁静了，至少，在创作的时刻。', '69', 'https://www.zourunze.com/static/wechat/audio/4.m4a', '4',now(), now(),'1');
-- INSERT INTO `huiyanbang`.`audio` (`banner`, `title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('https://www.zourunze.com/static/wechat/images/5.jpg', '人和人的区别', '来自网络', '吴静', '其实人和人到最后的区别，就是这一个又一个的坎儿，能熬过去，你就不一样了，可能连你自己都预料不到，在那些负重前行的日子里，能激发出自身多大的潜能来，但是你要坚信，你所付出的努力总有一天，命运会偷偷奖励你，你吃过的苦，受过的难，流过的泪，最终都会变成一束光，带你抵达你想去的地方，这一路风雨兼程，那个拼命想要打好一手烂牌的好孩子，才更值得被岁月温柔以待。', '54', 'https://www.zourunze.com/static/wechat/audio/5.m4a', '5',now(), now(),'1');
-- INSERT INTO `huiyanbang`.`audio` (`banner`, `title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('https://www.zourunze.com/static/wechat/images/6.jpg', '野草', '来自网络', '鹤翔', '朋友是一名登山队员。他家里最显著的位置，常年养着一束山坡上常见的野草。一般人家都在这样的位置养名贵的花，他怎么养普通的野草？而且他对那束野草，似乎有着庄严的崇敬。他对我说：一束普通的野草，对一般人来说，什么意义也没有，对于登山队员却不同。许多队员都会有过这样的经历，在攀爬悬崖峭壁的一刹那，是抓住了一束野草而救了性命。因此，对他来说，一束野草是命悬一线时上天的恩惠。我看着那束野草，心生敬畏：不论多么的微不足道，一定都有重若千钧的时刻。我們每一个人，在世界中自有其位置与分量，任何人都不该妄自菲薄。', '72', 'https://www.zourunze.com/static/wechat/audio/6.m4a', '6',now(), now(),'1');
-- INSERT INTO `huiyanbang`.`audio` (`banner`, `title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('https://www.zourunze.com/static/wechat/images/7.jpg', '哭着', '来自网络', '陈俊麟', '我们哭着来到这个世界，扮演了种种不同的角色，演出种种虚假的剧本，最后又哭着离开这世界。每天我走完了黄昏的散步，将归家的时候，我就怀着感恩的心情摸摸夕阳的头发，说一些赞美与感激的话。感恩这人世的缺憾，使我们警觉不至于堕落。感恩这都市的污染，使我们有追求明净的智慧。感恩那些看似无知的花树，使我们深刻的认清自我。即使生活条件只能像动物那样，人也不应该活得如动物失去人的有情、从容、温柔与尊严，在中国历代的忧患悲苦之中，中国人之所以没有失去本质，实在是来自这个简单的意念：“人活着，要像个人”!', '83', 'https://www.zourunze.com/static/wechat/audio/7.m4a', '7',now(), now(),'1');
-- INSERT INTO `huiyanbang`.`audio` (`banner`, `title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('https://www.zourunze.com/static/wechat/images/8.jpg', '大概人这一生', '来自网络', '吴静', '大概人这一生，总会遇见这样一个人，他曾让你对明天充满期待，确没有出现在你的明天里，也正是因为这样，才会有这世间，罪难逃避命运的感慨。如果我一辈子没有结婚的念头，那我终生不嫁，这是我的选择，而不是我的失败。以前总觉得，人生最美好的就是相遇，后来才懂得，最难得的其实是重逢，因为到那时候，你刚好成熟，我恰好温柔，就像李宗盛在歌里唱到的那样，我从来不想独身，确预感晚婚，我在等，世上为一契合的灵魂。', '57', 'https://www.zourunze.com/static/wechat/audio/8.m4a', '8',now(), now(),'1');
-- INSERT INTO `huiyanbang`.`audio` (`banner`, `title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('https://www.zourunze.com/static/wechat/images/9.jpg', '手中的茶杯', '来自网络', '吴静', '轻轻晃动手中的茶杯，看淡绿色的茶或针或片，忽上忽下，簇拥着，沉沉浮浮，变换着不同的位置，试图寻找－个属于自己的最佳平衡点。心急的我常常等不得茶泡好，就轻吹杯口，带动－漾－漾的茶涡，看茶叶聚聚散散，无奈分离。喝－小口茶，任清清浅浅的苦涩在舌间荡漾开来，充溢齿喉。之后，深吸－口气，余香满唇，在肺腑间蔓延开来，涤尽了－切的疲惫冷漠。人仿佛也醉了，朦胧中，久久不愿醒来。是夜，茶香满室，杯中茶由淡变浓，浮浮沉沉，聚聚散散，苦涩清香中慢慢感悟：人生亦如茶。', '85', 'https://www.zourunze.com/static/wechat/audio/9.m4a', '1',now(), now(),'1');
-- INSERT INTO `huiyanbang`.`audio` (`banner`, `title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('https://www.zourunze.com/static/wechat/images/10.jpg', '余生很长', '来自网络', '吴静', '余生很长，请别慌张，在人生这条路上，我们好像被圈死在一个个方格里，不敢有太多期待，不敢走的太远，也没有余的往后退，也许正因为这样，我们才会在午夜梦回的时候轻轻问自己：难道这一生，只能有这一种活法吗？当然不，人生就像一个盛大的表盘，每个人都有自己的人生时机，有些难过失落和沮丧，不过是因为时机未到，就好像，我们会因为失去心爱之人痛苦，也会在下一个路口遇见真正对的人；就好像我们这一秒距离实现梦想还很遥远，下一秒就能迎来春暖花开。', '60', 'https://www.zourunze.com/static/wechat/audio/10.m4a', '1',now(), now(),'1');
-- INSERT INTO `huiyanbang`.`audio` (`banner`, `title`, `author`, `audioAuthor`, `content`, `time`, `url`, `type`,`createTime`,`updateTime`, `status`)VALUES ('https://www.zourunze.com/static/wechat/images/11.jpg', '雨水', '来自网络', '吴静', '雨水轻轻的、柔柔的洒在大地上，冲洗掉人间的面上－切脏乱的灰尘，给人们带来清洁干净的感觉，然而冰冷的雨水却不能冲洗掉我身上灰色的心情！我从喧闹的街心走出来，那灯光的世界距我是那样地遥远。我走到那条林荫道中央，站在那里，前后只有雨声，人们不知藏到哪儿去了。这样真好！撑着－把伞，心中有－种柔软而又温馨的几乎不敢呼吸的感觉。曾经有过的－幕－幕，－个又－个镜头仿佛早就商量好，慢慢的从我雨中的眼前走过，慢慢的走过。', '68', 'https://www.zourunze.com/static/wechat/audio/11.m4a', '2',now(), now(),'1');



-- 博客表
CREATE TABLE `huiyanbang`.`blog` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` INT(11) NOT NULL COMMENT 'userId',
  `audioId` INT(11) NOT NULL COMMENT 'audioId',
  `time` INT(11)  NULL COMMENT '时长',
  `url` VARCHAR(255) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '音频地址', 
  `type` TINYINT NULL DEFAULT 1 COMMENT '类型',
  `score` INT(11)  NULL DEFAULT 0 COMMENT '分数时长',
  `isRecommend` TINYINT NULL DEFAULT 0 COMMENT '1置顶 0未置顶',
  `createTime` DATETIME NULL COMMENT '创建时间',
  `updateTime` DATETIME NULL COMMENT '最后修改时间',
  `status` TINYINT NULL DEFAULT 1 COMMENT '1正常 2禁用',
  PRIMARY KEY (`id`));

-- 收藏表
CREATE TABLE `huiyanbang`.`collection` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` INT(11) NOT NULL COMMENT 'userId',
  `blogId` INT(11) NOT NULL COMMENT 'blogId',
  `createTime` DATETIME NULL COMMENT '创建时间',
  PRIMARY KEY (`id`));
 
-- 关注表
CREATE TABLE `huiyanbang`.`follow` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` INT(11) NOT NULL COMMENT 'userId',
  `toUserId` INT(11) NOT NULL COMMENT '关注的userId',
  `createTime` DATETIME NULL COMMENT '创建时间',
  PRIMARY KEY (`id`));

-- 点赞表
CREATE TABLE `huiyanbang`.`thumb` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` INT(11) NOT NULL COMMENT 'userId',
  `blogId` INT(11) NOT NULL COMMENT 'blogId',
  `createTime` DATETIME NULL COMMENT '创建时间',
  PRIMARY KEY (`id`));
  
  -- 评价表
CREATE TABLE `huiyanbang`.`comment` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` INT(11) NOT NULL COMMENT 'userId',
  `toUserId` INT(11) NOT NULL COMMENT 'toUserId',
  `blogId` INT(11) NOT NULL COMMENT 'blogId',
  `parentId` INT(11) NOT NULL COMMENT 'parentId',
  `content` VARCHAR(255) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_general_ci' NULL COMMENT '评论内容',
  `createTime` DATETIME NULL COMMENT '创建时间',
  `status` TINYINT NULL DEFAULT 1 COMMENT '1正常 2禁用',
  PRIMARY KEY (`id`));

ALTER TABLE `huiyanbang`.`comment` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- 打卡记录
CREATE TABLE `huiyanbang`.`record` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `userId` INT(11) NOT NULL COMMENT 'userId',
  `date` VARCHAR(45) CHARACTER SET 'utf8' COLLATE 'utf8_general_ci' NULL COMMENT '打卡时间',
  `createTime` DATETIME NULL COMMENT '创建时间',
  PRIMARY KEY (`id`));

-- TRUNCATE record;
-- TRUNCATE audio;
-- TRUNCATE follow;
-- TRUNCATE collection;
-- TRUNCATE comment;
-- TRUNCATE recommend;
-- TRUNCATE thumb;
-- DROP TABLE blog;
 



--------------------------------心灵鸡汤----------------- --------- --------
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/1.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/1.mp3','1',now(), now(),'不抱怨',     '来自网络',  '主播', '65', '永远不要埋怨已经发生的事情，埋怨无任何意义，我们最好的办法就是坦然的接受它，从中吸取教训，改变当下的行动，不再后犯。你生命中的回报，是由你付出多少而决定的。你未来的秘密，隐藏在你的日常生活和习惯当中。人生的意义不在于你得到什么失去什么，而在于你在这个过程中，有什么思考和收获.');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/2.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/2.mp3','1',now(), now(),'当你迷茫时', '来自网络',  '主播', '71', '当你感到迷茫的时候，请你抬头看看天边的阳光，看着它是顺着怎样的路找到落山的点；当你感到委屈的时候，请你静心回忆的心房，看看它装着怎样的喜怒哀乐；当你感到彷徨的时候，请你细心阅读成功的故事。每个人的路都不是一帆风顺的，你该有的辛酸别人也曾有过。想要成功，必须莫畏前路艰辛，放手去博！');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/3.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/3.mp3','1',now(), now(),'真',        '来自网络',  '主播', '74', '一个从不回头的人，未必是因勇敢，也许是怕被识破脸上的泪痕。一个时刻微笑的人，未必是因快乐，可能是怕被看穿心底的叹息。真实，是件很难的事。人总怕被生活轻视，拼命活出一副坚硬的样子。久了，就离自己越来越远。要有多强大，才终于学会不掩饰。一生中最有分量的一个字，原来是--真。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/4.jpg','https://www.wisdomwords.cn/static/wechat/audio/2/1.mp3','2',now(), now(),'送杜少府之任蜀州', '唐代：王勃',   '主播', '60', '城阙辅三秦，风烟望五津。\r\n与君离别意，同是宦游人。\r\n海内存知己，天涯若比邻。\r\n无为在歧路，儿女共沾巾。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/5.jpg','https://www.wisdomwords.cn/static/wechat/audio/2/2.mp3','2',now(), now(),'云阳馆与韩绅宿别', '唐代：司空曙', '主播', '67', '故人江海别，几度隔山川。\r\n乍见翻疑梦，相悲各问年。\r\n孤灯寒照雨，深竹暗浮烟。\r\n更有明朝恨，离杯惜共传。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/6.jpg','https://www.wisdomwords.cn/static/wechat/audio/2/3.mp3','2',now(), now(),'次北固山下',  '唐代：王湾',  '主播', '68', '客路青山外，行舟绿水前。\r\n潮平两岸阔，风正一帆悬。\r\n海日生残夜，江春入旧年。\r\n乡书何处达？归雁洛阳边。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/7.jpg','https://www.wisdomwords.cn/static/wechat/audio/3/1.mp3','3',now(), now(),'荷塘月色1', '朱自清',  '主播', '113', '月光如流水一般，静静地泻在这一片叶子和花上。薄薄的青雾浮起在荷塘里。叶子和花仿佛在牛乳中洗过一样；又像笼着轻纱的梦。虽然是满月，天上却有一层淡淡的云，所以不能朗照；但我以为这恰是到了好处——酣眠固不可少，小睡也别有风味的。月光是隔了树照过来的，高处丛生的灌木，落下参差的斑驳的黑影，峭楞楞如鬼一般；弯弯的杨柳的稀疏的倩影，却又像是画在荷叶上。塘中的月色并不均匀；但光与影有着和谐的旋律，如梵婀玲上奏着的名曲。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/8.jpg','https://www.wisdomwords.cn/static/wechat/audio/3/2.mp3','3',now(), now(),'荷塘月色2', '朱自清',  '主播', '105', '曲曲折折的荷塘上面，弥望的是田田的叶子。叶子出水很高，像亭亭的舞女的裙。层层的叶子中间，零星地点缀着些白花，有袅娜地开着的，有羞涩地打着朵儿的；正如一粒粒的明珠，又如碧天里的星星，又如刚出浴的美人。微风过处，送来缕缕清香，仿佛远处高楼上渺茫的歌声似的。这时候叶子与花也有一丝的颤动，像闪电般，霎时传过荷塘的那边去了。叶子本是肩并肩密密地挨着，这便宛然有了一道凝碧的波痕。叶子底下是脉脉的流水，遮住了，不能见一些颜色；而叶子却更见风致了。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/9.jpg','https://www.wisdomwords.cn/static/wechat/audio/3/3.mp3','3',now(), now(),'边城',     '沈从文',  '主播', '87',   '水中游鱼来去，全如浮在空气里。两岸多高山，山中多可以造纸的细竹，长年作深翠颜色，逼人眼目。近水人家多在桃杏花里，春天时只需注意，凡有桃花处必有人家，凡有人家处必可沽酒。夏天则晒晾在日光下耀目的紫花布衣裤，可以作为人家所在的旗帜。秋冬来时，房屋在悬崖上的，滨水的，无不朗然入目。黄泥的墙，乌黑的瓦，位置则永远那么妥贴，且与四围环境极其调和，使人迎面得到的印象，实在非常愉快。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/10.jpg','https://www.wisdomwords.cn/static/wechat/audio/4/1.mp3','4',now(), now(),'磨墨',    '绕口令',  '主播', '32', '磨房磨墨，墨碎磨房一磨墨；梅香添煤，煤爆梅香两眉灰。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/11.jpg','https://www.wisdomwords.cn/static/wechat/audio/4/2.mp3','4',now(), now(),'借绿豆',   '绕口令',  '主播', '31', '出南门，走六步，见着六叔和六舅，叫声六叔和六舅，借我六斗六升好绿豆；过了秋，打了豆，还我六叔六舅六十六斗六升好绿豆。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/12.jpg','https://www.wisdomwords.cn/static/wechat/audio/4/3.mp3','4',now(), now(),'哥哥过沟', '绕口令',  '主播', '22', '哥挎瓜筐过宽沟，过沟筐漏瓜滚沟。隔沟挎筐瓜筐扣，瓜滚筐空哥怪沟。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/13.jpg','https://www.wisdomwords.cn/static/wechat/audio/5/1.mp3','5',now(), now(),'草房子',    '曹文轩',  '主播', '97', '桑桑在校园里随便走走，就走到了小屋前。这时，桑桑被一股浓烈的苦艾味包围了。他的眼前是一片艾。艾前后左右地包围了小屋。当风吹过时，艾叶哗啦哗啦地翻卷着。艾叶的正面与反面的颜色是两样的，正面是一般的绿色，而反面是淡绿色，加上茸茸的细毛，几乎呈灰白色。因此，当艾叶翻卷时，就像不同颜色的碎片混杂在一起，闪闪烁烁。艾虽然长不很高，但杆都长得像毛笔的笔杆一样，不知是因为人工的原因，还是艾的习性，艾与艾之间，总是适当地保持着距离，既不过于稠密，却又不过于疏远。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/14.jpg','https://www.wisdomwords.cn/static/wechat/audio/5/2.mp3','5',now(), now(),'倪焕之',    '叶圣陶',  '主播', '105', '一阵暖风吹来，带着新生、发展、繁荣的消息，几乎传达到每一个细胞。湖那边的远山已从沉睡中醒来，盈盈地凝着春的盼睐。田里的春苗犹如嬉春的女子，恣意舞动她们的嫩绿的衣裳。河岸上的柳丝，刚透出鹅黄色的叶芽。鸟雀飞鸣追逐，好像正在进行伟大的事业。几簇村屋，形式大体一样，屋瓦鳞鳞可数。住在那些屋里的人们，男的，女的，老的，少的，看见春天降临，大地将有一番新的事业，新的成功，他们也欢欣鼓舞：不贪懒，不避劳，在那里努力工作着吧。 ');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/15.jpg','https://www.wisdomwords.cn/static/wechat/audio/5/3.mp3','5',now(), now(),'平凡的世界1', '路遥',  '主播', '95', '这姑娘仍不失往日那种风度，薄毛衣外面象男孩一样披件夹克衫，两条胳膊绑在鼓囊囊的胸前，似乎陷入到一种深邃的沉思之中；但脸上还带着通常那种无意识的、骄傲的微笑。这是一个美好的夜晚，远远近近，灯光点点，绿意朦胧，空气中弥漫着槐花甜丝丝的芬芳。对这位二十三岁的大学生来说，日子过得既快活又不尽人意。她没有什么大苦恼，但内心常常感到骚动不安。一天里也充满了小小的成功与欢乐，充满了烦恼与忧伤，充满着愤懑与不平，也充满着友爱和思念。唉，时光就是在这样飞逝着——转眼又是冬去春来了！');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/16.jpg','https://www.wisdomwords.cn/static/wechat/audio/6/1.mp3','6',now(), now(),'佛经片段1', '佛经',  '主播', '64', '佛说一切法，为度一切心；若无一切心，何用一切法。我心自有佛，自佛是真佛；自若无佛心，何处求真佛？若真修道人，不见世间过；若见他人非，自非却是左。菩提本无树，明镜亦非台；本来无一物，何处惹尘埃？');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/17.jpg','https://www.wisdomwords.cn/static/wechat/audio/6/2.mp3','6',now(), now(),'佛经片段2', '佛经',  '主播', '90', '如是我闻：一时，佛在忉利天宫白玉座上，与大比丘、大菩萨等，及彼天主无量众俱。时大梵天王、那罗延天、大自在天及五乾闼婆王等，各与眷属俱，来至佛所，欲问如来造塔之法，及塔所生功德之量。会中有菩萨，名观世音，知其意，即从座起，偏袒右肩，右膝著地，合掌向佛，而作是言：‘世尊！今此诸天、乾闼婆等故来至此，欲请如来造塔之法，及塔所生功德之量。惟愿世尊为彼解说，利益一切无量众生！’');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/18.jpg','https://www.wisdomwords.cn/static/wechat/audio/6/3.mp3','6',now(), now(),'佛经片段3', '佛经',  '主播', '104', '尔时世尊告观世音菩萨言：‘善男子！若此现在诸天众等，及未来世一切众生，随所在方未有塔处，能于其中建立之者，其状高妙出过三界，乃至至小如庵罗果；所有表刹上至梵天，乃至至小犹如针等；所有轮盖覆彼大千，乃至至小犹如枣叶，于彼塔内藏掩如来所有舍利、发、牙、髭、爪，下至一分；或置如来所有法藏十二部经，下至于一四句偈。其人功德如彼梵天，命终之后生于梵世。于彼寿尽，生五净居，与彼诸天等无有异。善男子！如我所说如是之事，是彼塔量功德因缘，汝诸天等应当修学！’');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/19.jpg','https://www.wisdomwords.cn/static/wechat/audio/6/4.mp3','6',now(), now(),'佛经片段4', '佛经',  '主播', '126', '尔时观世音菩萨复白佛言：‘世尊！如向所说，安置舍利及以法藏，我已受持。不审如来四句之义，惟愿为我分别演说！’尔时世尊说是偈言：诸法因缘生　我说是因缘因缘尽故灭　我作如是说‘善男子！如是偈义名佛法身，汝当书写置彼塔内。何以故？一切因缘及所生法性空寂故，是故我说名为法身。若有众生解了如是因缘之义，当知是人即为见佛。’尔时观世音菩萨及彼诸天一切大众、乾闼婆等，闻佛所说，皆大欢喜，信受奉行。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/20.jpg','https://www.wisdomwords.cn/static/wechat/audio/6/5.mp3','6',now(), now(),'佛经片段5', '佛经',  '主播', '127', '便梵行至佛已到为佛足下礼一处止。已一处止。自梵为佛说。是我为自光明。夜亦已明为至佛。已至是时火神足行。我便思惟念。尚早至见佛。我已到见佛火神足。我便念令我居前。行俱披犁比丘调达部。我为便至俱披犁比丘调达部。已至俱披犁比丘调达部。我便告。俱披犁俱披犁。持好心向舍利弗目干连比丘。亦同道行者。便言。卿为谁。我言梵。便报我。佛说卿阿那含不。我言是。便报若何因缘得来到是。我便思惟念。咄是何以无有悲意');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/21.jpg','https://www.wisdomwords.cn/static/wechat/audio/6/6.mp3','6',now(), now(),'佛经片段6', '佛经',  '主播', '104', '闻如是。一时佛在王舍国鸡山中。佛便告比丘。人居世间。一劫中生死。取其骨藏之。不腐不消不灭。积之与须弥山等。人或有百劫生死者或千劫生死者。尚未能得阿罗汉道泥洹。佛告比丘。人一劫中合会其骨。与须弥山等。我故现其本因缘。比丘。若曹皆当拔其本根去离本根。用是故不复生死。不复生死便得度世泥洹道。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/22.jpg','https://www.wisdomwords.cn/static/wechat/audio/6/7.mp3','6',now(), now(),'佛经片段7', '佛经',  '主播', '90', '佛说如是闻如是。一时佛在舍卫国。行在祇树须达园。佛便语比丘。比丘应唯然受佛语。佛便说色。比丘念本起苦。念非常坏。去谛观已。比丘色能谛观。若能知色本念。若能知色非常坏。若能知谛观。便色爱为去。已色爱坏便爱贪亦坏。已爱贪坏便意脱。我为说如是痛痒思想生死识。为比丘念本亦念识非常。亦当谛观。若比丘能已到谛观爱弃。已爱尽便爱贪尽。便脱生死得道。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/23.jpg','https://www.wisdomwords.cn/static/wechat/audio/6/8.mp3','6',now(), now(),'佛经片段8', '佛经',  '主播', '95', '佛说如是闻如是。一时佛在舍卫国祇树给孤独园。佛便告比丘。我为若说恶从何所起。亦说善从何所起。比丘听念着意。比丘应唯然。恶意为何等所。色过去未来今贪起自恚畏痴。一切见恶意。是名为所恶。痛痒亦尔。思想亦尔。生死亦尔。识亦尔。如是名为从所起恶。善意为何等。色过去未来今无有见是起。无有恚无有畏无有痴。无有一切娆恶意。如是名为善意。如是名为痛痒思想生死识。佛言。我所说善恶意如是');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/24.jpg','https://www.wisdomwords.cn/static/wechat/audio/7/1.mp3','7',now(), now(),'圣经1', '圣经',  '主播', '68', '大自然所彰显的是怎样的神？大自然向我们显示的是一位掌管一切的、有能力、有智慧、心思缜密的神；也是一位有秩序和喜爱完美的神。这是所谓的“一般的启示”。藉著“特殊的启示”（圣经和主耶稣来到世间），我们知道神的慈爱和饶恕，以及永生的应许。神已经满有恩惠地赐给我们这两方面的启示，使我们可以完全相信他。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/25.jpg','https://www.wisdomwords.cn/static/wechat/audio/7/2.mp3','7',now(), now(),'圣经2', '圣经',  '主播', '77', '“黑暗却不接受光”的意思是罪恶不能够胜过或消灭神的光。耶稣基督是创造生命的主，他的生命为人类带来光明。在他的光里，我们看见自己的真相──需要拯救的罪人。跟随这光使我们不至于像瞎子走路，跌进罪恶深渊里；他照亮我们的前路，使我们知道怎样生活；这真光又除去我们生活上的罪污。你是否让基督的真光照进你的生命之中呢？让基督引导你，叫你不致在黑暗中跌倒。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/26.jpg','https://www.wisdomwords.cn/static/wechat/audio/7/3.mp3','7',now(), now(),'圣经3', '圣经',  '主播', '62', '我们的过犯已经定了我们的罪，判决了我们的刑罚，但耶稣握著地狱和死亡的钥匙，只有他能够把我们从撒但的永远捆绑中释放出来，信徒不用害怕地狱或死亡。何时我们企图掌管自己的生命，或藐视神，何时我们就走向地狱。但当我们把自己的生命交在基督手中，就可以与他有永远的、和平的相交。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/27.jpg','https://www.wisdomwords.cn/static/wechat/audio/8/1.mp3','8',now(), now(),'论语·里仁篇1', '孔子及弟子',  '主播', '71', '子曰：“里仁为美。择不处仁，焉得知？”\r\n子曰：“不仁者不可以久处约，不可以长处乐。仁者安仁，知者利仁。”\r\n子曰：“唯仁者能好人，能恶人。”\r\n子曰：“苟志於仁矣，无恶也。”');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/28.jpg','https://www.wisdomwords.cn/static/wechat/audio/8/2.mp3','8',now(), now(),'论语·里仁篇2', '孔子及弟子',  '主播', '92', '子曰：“富与贵，是人之所欲也；不以其道得之，不处也。贫与贱，是人之所恶也；不以其道得之，不去也。君子去仁，恶乎成名？君子无终食之间违仁，造次必于是，颠沛必于是。“\r\n子曰：“我未见好仁者，恶不仁者。好仁者，无以尚之；恶不仁者，其为仁矣，不使不仁者加乎其身。有能一日用其力于仁矣乎？我未见力不足者。盖有之矣，我未见也。”');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/29.jpg','https://www.wisdomwords.cn/static/wechat/audio/8/3.mp3','8',now(), now(),'论语·里仁篇3', '孔子及弟子',  '主播', '78', '子曰：“人之过也，各於其党。观过，斯知仁矣。”\r\n子曰：“朝闻道，夕死可矣。“\r\n子曰：“士志于道，而耻恶衣恶食者，未足与议也。“\r\n子曰：“君子之于天下也，无适也，无莫也，义之与比。“\r\n子曰：“君子怀德，小人怀土；君子怀刑，小人怀惠。”');
 


--------------------------------心灵鸡汤----------------------------------
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/30.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/4.mp3','1',now(), now(),'送给情绪低点的你','来自网络',  '主播', '60','送给情绪低点的你，在一切变好之前。我们总要经历一些不开心的日子。这段日子也许很长也许只是一觉醒来。所以耐心点给好运一点时间，要坚信每件事的最后都会是好事，如果不是好事说明还没到最后。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/31.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/5.mp3','1',now(), now(),'及时止损', '来自网络',  '主播', '89','止损，是不与一切消耗自己的事情周旋：已经千疮百孔的情感、明知道已经挽回不了的人、迟疑着到底要不要离开的工作、搞不懂到底适不适合自己的专业.….衍生开来，甚至了包括生活中的种种琐碎，要不要倒掉的剩饭剩菜，明明不喜欢了却又舍不得丢弃的旧衣服。很多事情，在它该结束的时候就让它结束，而不是等到不得不结束的时候，才被迫停止。但愿我们都能说，这个句号，比以往任何一次都好。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/32.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/6.mp3','1',now(), now(),'愿你步伐坚定且内心温柔',   '来自网络',  '主播', '86','生而为人，总是被各种压力裹扶着，拼命加班，不敢休息，手机随时待命，披星戴月地奋战。可年轻需要奋斗，加班也要适可而止，那些爱你的人，可不希望你累垮了身体。世界很残酷，你不得不逼自己变强大，但还是希望你能注意身体，照顾好自己，你的梦想，必须以健康为前提；也希望你能有个港湾可以停靠，偶尔卸下铠甲.……生活不易，继续努力，在未来的路上，愿你步伐坚定且内心温柔。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/33.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/7.mp3','1',now(), now(),'内心强大','来自网络',  '主播', '96','没有大树可以依靠，没有捷径可以找寻，就要比他人多出几分努力，我们每天超越自己一点点，一点点。我不敢休息，因为我没有存款；我不敢说累，因为我没有成就。我不敢偷懒，因为比我牛逼的人还在努力；我能放弃选择，但是我永远不会放弃。即使你再排斥现在的不愉快，时间也不会过得慢点。所以不要随意发脾气，谁都不欠你的。学会低调，取舍间必有得失。不用太计较，要学着踏实而务实，越努力越幸运。世上没有一件工作不辛苦，没有一处人事不复杂，所以坚强是我唯一的选择，内心强大，人生就会变得底气十足。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/34.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/8.mp3','1',now(), now(),'加油', '来自网络',  '主播', '87','我不羡慕别人的收入，因为我知道他，日日夜夜的艰辛。也不羡慕别人，说走就走的自由，我知道他为这份自由，付出的代价。更不羡慕别人，不用上班有人养，却不知她在多少个日日夜夜流泪和等待。一切都有代价，无论是财富，事业，还是自由。所以不必羡慕，生活不在别处，而在于你付出了多少，就会收获多少。不攀比，不抱怨，不计较；多包容，多理解，多付出。因为有一种努力叫做，靠自己！加油，走在人生路上的我们。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/35.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/9.mp3','1',now(), now(),'时间不凑巧，等待太漫长',   '来自网络',  '主播', '125','之前很喜欢一双鞋子，可惜没有适合我的足码，店员说要不等等吧，过段时间还会补货，我说好吧，毕竟，是自已喜欢的东西，等等就等等吧。在我等它补货的那段时间，我幻想了无数个我穿上它的场景，无一例外都是百搭又好看的，简真是我这辈子最钟意的一双鞋子了。可等它补货之后我在穿上它站在镜子前的那一场间，却突然觉得失望，好像它也没有我想象中穿上的那么好有，就是一双普普通通的鞋子，前段时间那种非它不可的感觉，好像突然一下子就消失的无影无踪了。最终我还是没有买它，可能是我变的太快了，也可能是那段时间的等待耗费了我对它的喜爱，鞋子没错，我也没错，错的只是时间不凑巧，等待太漫长。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/36.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/10.mp3','1',now(), now(),'做你想做的人','来自网络',  '主播', '82','做你想做的人。这件事，没有时间的限制，只要愿意，什么时候都可以开始。你能从现在开始改变，也可以一成不变，这件事，没有规矩可言。你能活出最精彩的自己，也可能搞得一团糟。我希望，你能活出最精彩的自己。我希望，你能见识到令你惊奇的事物。我希望，你能体验未曾体验过的情感。我希望，你能遇见一些想法不同的人。如果，你发现自己还没有做到，我希望，你有勇气你有勇气重头再来。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/37.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/11.mp3','1',now(), now(),'无问西东', '来自网络',  '主播', '96','如果提前了解你们所要面对的人生，不知你们是否还有勇气前来？看到的和听到的，经常会令你们沮丧。世俗是这样的强大，强大到生不出改变他们的念头来。可是如果有机会提前了解你们的人生，知道青春也不过只是这些日子，不知你们是否还会在意那些世俗希望你们在意的事情。比如占有多少才更荣耀，拥有什么才能被爱，等你们长大，你们会因绿芽冒出土地而喜悦，会对初生的朝阳欢呼跳跃，也会给别人善意和温暖。但是却会在赞美别的生命的同时，常常，甚至永远地忘了自己的珍贵。愿你在被打击时，坚信你的珍贵，爱你所爱，行你所行，听从你心，无问东西。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/38.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/12.mp3','1',now(), now(),'专注现在',   '来自网络',  '主播', '68','试想如果你所有桌面都堆满了报纸杂志、水电账单，橱柜塞满了东西，而且你已经半年没结清支票了，想要认真思考、深呼吸甚至是简单地放松恐怕都是不太可能的吧。此外，像打扫、擦拭、擦洗这类重复性情节任务，也可以让你沉下心来认真思考，只要你专注于你正在做的事。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/39.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/13.mp3','1',now(), now(),'不要让自己活在回忆里','来自网络',  '主播', '67','一个人在外闯荡，受了再大的委屈，也不要放弃，不要流泪，要记在心里，早晚有一天，你会成功的。不要做让自己后悔的事，要做，就做让别人后悔的事。不要轻易相信誓言和承诺，事实能证明一切，真正爱你的人，不会给你太多的誓言和承诺。一辈子不长，不要让自己总是活在回忆里。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/40.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/14.mp3','1',now(), now(),'学会欣赏自己', '来自网络',  '主播', '72','学会自己欣赏自己,等于拥有了获取快乐的金钥匙.欣赏自己不是孤芳自赏，欣赏自己不是唯我独尊，欣赏自己不是自我陶醉，欣赏自己更不是固步自封…自己给自己一些自信，自己给自己一点愉快，自己给自己一脸微笑，何愁没有人生的快乐呢?经常要自己给自己过节，学会寻找愉悦的心情。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/41.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/15.mp3','1',now(), now(),'想象快乐的事',   '来自网络',  '主播', '71','仅仅是想象一下快乐有趣的事情，便可以增加安多芬等让人快乐的荷尔蒙分泌，并降低压力荷尔蒙的分泌。加州大学欧文分校的研究人员对16个人进行了测试，他们的共同特征是一致认为某种录像带非常有趣，他们中有一半的人被告知将在3天后看那个有趣的录像，这些人马上发生了生理变化，当他们真的看到录像带时，所有人的压力荷尔蒙下降相当明显，安多芬的分泌水平上升了27%，生长激素上升了87%。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/42.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/16.mp3','1',now(), now(),'与其抱怨，不如正视自己','来自网络',  '主播', '59','我觉得抱怨是可以分为两种的：有效的、无效的，正面的、负面的。怎么样抱怨才是有效又正面的？其实，所有引起我们不满的人事物，都是中性的，意味它们都是不好不坏的，是你对它们的看法和反应让它们成为令你不满意的。所以，与其埋怨那个人或是那件事情，不如我们回过头来正视自己内在的脆弱和伤痛。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/43.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/17.mp3','1',now(), now(),'别在一件别扭的事上纠缠太久', '来自网络',  '主播', '74','要在一件别扭的事上纠缠太久。纠缠久了，你会烦，会痛，会厌，会累，会神伤，会心碎。实际上，到最后，你不是跟事过不去，而是跟自己过不去。无论多别扭，你都要学会抽身而退。从一处臭水沟抽身出来，一转身你会看见一棵摇曳的树，走几步，你会看见一条清凌凌的河，一抬眼，你会看见远处白云依偎的山。不要因为一条臭水沟，坏了赏美的心境，从而耽误了其他的美。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/44.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/18.mp3','1',now(), now(),'别太把自己当盘菜',   '来自网络',  '主播', '63','你可以受伤，但不能总在受伤。也就是说，在生活中，你可能会遇到误解、冷遇和不被尊重，也可能受到排挤、压制和打击报复，还可能遭逢不公、陷阱以及暗箭冷枪。是的，你要做好受伤的准备，因为，受伤，也是生活的一部分。如果，你总在受伤，一定是太在乎自己了。有时候，太把自己当盘菜，原本就是人生一道难以治愈的暗伤。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/45.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/19.mp3','1',now(), now(),'生活在于选择','来自网络',  '主播', '65','生活，在于选择。把自己摆在一个合适的位置，选择适合自己的生活与生存的方式，即使不是大红大紫、大富大贵，只要心是快乐的，那就是最好的。法国哲学家狄德罗说过：知道事物应该是什么样，说明你是聪明的人；知道事物实际什么样，说明你是有经验的人；知道怎样使事物变得更好，说明你是有才能的人。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/46.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/20.mp3','1',now(), now(),'人生不像想的那么好，也不像想的那么坏', '来自网络',  '主播', '73','为什么，物物各异，事事不同，不适合罢了。莫泊桑说：人生从来不像意想中那么好，也不像意想中那么坏。是的，这个世界上的万事万物没有绝对，只有相对。我们常常羡慕名人，总觉自己太过平凡，事实上，名人自有名人的烦恼，凡人自有凡人的自在和洒脱。居闹市可以开怀大笑，掬山风可以纵情一吼，这种凡人的自由随性，何尝不是深居简出的名人所羡慕和企盼的呢？');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/47.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/21.mp3','1',now(), now(),'人生不必太计较', '来自网络',  '主播', '66','有人得到三，有人得到七；得到三的，只要三分幸福，就可以得到七分快乐；得到七的，拥有七分幸福，却只能得到三分快乐；有人先得到，有人后得到，有人什么都没得到。先得到的可能先失去，后得到的后失去，没得到的就不会失去。那个总数是一样。所以，人生真的不必太计较，不必刻意去算计，只要去体验就好。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/48.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/22.mp3','1',now(), now(),'过程比结果更重要',   '来自网络',  '主播', '65','过程能给你丰富的经验，而结果能给你深刻的影响，虽然过程和结果相辅相成，但过程比结果更重要！人生的奔跑，不在于瞬间的爆发，而取决于途中的坚持，纵有千百个理由放弃，也要找一个理由坚持下去；能激励你、温暖你和感动你的，不是励志语录或心灵鸡汤，而是和身边积极主动、充满正能量的人同行。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/49.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/23.mp3','1',now(), now(),'把握当下','来自网络',  '主播', '49','如果选择了安逸舒适，就不必羡慕别人的精彩；如果你不相信努力和时光，那么时光第一个就会辜负你。因为，不是有希望才去努力，而是努力了，才能看到希望。把握当下，才可得到不可知的未来。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/50.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/24.mp3','1',now(), now(),'人生就像心电图', '来自网络',  '主播', '58','有人说，人生就像一组心电图，有高峰，也有低谷。没有任何人的一生是一帆风顺的，总要在种种波折中不断前行。成功时，不要太过骄傲。你要理智地提醒自己，这成功只是短暂的。失败时，也不要过于气馁。你要冷静地告诉自己，这失败毕竟是暂时的。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/51.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/25.mp3','1',now(), now(),'行动',   '来自网络',  '主播', '60','如果你不握紧拳头，你就不知道你力量到底有多大；如果你不咬紧牙关，你就不知道你的坚持到底有多狠；如果你不跺脚而起，你就不知道你的果决到底有多正确；如果你不瞪眼，你就不知道你的内心到底多强大。年轻，最强悍的竞争力只有两个字——行动！');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/52.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/26.mp3','1',now(), now(),'人生没有如果','来自网络',  '主播', '69','生活有太多的无奈，你想抱怨但无人体会；人生有许多的不甘，你想发泄可能换来他人嘲笑。十个昨天抵不过一个今天，百个未来代替不了一个现在。活好当下，便是对未来最高的尊重；把握现在，便是对过去最好的怀念。收起爱幻想的大脑吧，怎奈何，生活不能重来，只可惜，人生没有如果。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/53.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/27.mp3','1',now(), now(),'选择坚强', '来自网络',  '主播', '52','在第一次选择坚强的时候，一定要想清楚：你是否做好了承受一切的准备。因为一旦你选择了坚强，即使只是假装的，你也必须一直坚持下去。因为你曾经的坚强会让人以为即使再大的苦，你也撑得住。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/54.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/28.mp3','1',now(), now(),'坚守的美丽',   '来自网络',  '主播', '68','坚守是一种精神，是一种力量，是一种内在涵养，坚守自我的美丽，那是张骞西行的驼铃阵阵，那是卫青迎向大漠的旌旗猎猎，那是岳飞拔剑杀敌的壮怀，那是郑和下西洋的浪花飞飞；不为世俗所染的高洁，不为利誉所惑的正气，不为物欲所污的刚毅，这些都是坚守的美丽，他们因坚守自我的个性而美丽，世界因他们而精彩。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/55.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/29.mp3','1',now(), now(),'相信自己','来自网络',  '主播', '72','追逐梦想，寻找自己的蓝天。在人生的道路上难免不会遇到挫折，偶尔遇到挫折，就犹如遇到暴风雨般的平常。当人们遇到这种挫折、困难、忧伤、失意时，不要灰心丧气，应该沉着应对。不经历风雨，怎么见彩虹？相信自己，在五彩缤纷的世界中，总有一片属于自己的蓝天。而这片蓝天，是人生旅途的终生伴侣，它将跟随每个人走完人生路上的每一条布有荆棘的征程。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/56.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/30.mp3','1',now(), now(),'坚强', '来自网络',  '主播', '86','坚强，是人生路上的精神支柱；是跨越坎坷的信念；是成功走向胜利的根本。一个人，如果不坚强，那他的心灵就永远是一片黑暗沉寂的世界。不好放下自我就是真正的坚强，能够承认自我的缺点也是难能的坚强，虚心是坚强，发奋是坚强，正直是坚强，善良是坚强，怜悯是坚强，自责是坚强，追求是坚强，自爱是坚强，宽恕是坚强。学好坚强的人，首先要学习并领悟爱惜自我，但舍已，又是最大的坚强。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/57.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/31.mp3','1',now(), now(),'不要羡慕别人',   '来自网络',  '主播', '57','每个人都有觉得自己不够好的时候，羡慕别人闪闪发光的时候，但其实大多数人都是普通的，那些闪闪发亮的背后都是努力一点点爬到山坡的，笨鸟先飞，不要沮丧，在最平凡的生活里，只要你肯付出，肯努力，总有一天没你会站在最亮的地方，活成自己曾经渴望的模样。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/58.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/32.mp3','1',now(), now(),'还有未来在','来自网络',  '主播', '50','如果你现在正走在一条看起来没有未来的弯路上，记住一定要继续走下来，只有等你走完了，你才会明白自己想要的是什么。没有人能帮你模拟只能靠自己，当什么都失去的时候，还有未来在。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/59.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/33.mp3','1',now(), now(),'给好运一点时间', '来自网络',  '主播', '43','在一切变好之前，我们总要经历一些不开心的日子，这段日子也许很长，也许只是一觉醒来，所以耐心点，给好运一点时间。');
INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/60.jpg','https://www.wisdomwords.cn/static/wechat/audio/1/34.mp3','1',now(), now(),'生活是场奇妙的旅行', '来自网络',  '主播', '40','生活是场奇妙的旅行，在时间的站台里，我们不断错过开车的时间，但总会有那么一次，我们在对的时间里来到对的车站，遇到那个给我们一张车票的人。');

                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
 --------------------------------古典诗词----------------------------------                                                                                                                                                                                                                                                                           
 -- INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/.jpg','https://www.wisdomwords.cn/static/wechat/audio/2/.mp3','2',now(), now(),'', '',  '主播', '40','');
 INSERT INTO `huiyanbang`.`audio` (`banner`, `url`, `type`,`createTime`,`updateTime`, `title`, `author`, `audioAuthor`, `time`, `content`)VALUES('https://www.wisdomwords.cn/static/wechat/images/61.jpg','https://www.wisdomwords.cn/static/wechat/audio/2/过香积寺.mp3','2',now(), now(),'过香积寺', '唐代：王维',  '牧牧', '58','不知香积寺，数里入云峰。古木无人径，深山何处钟。泉声咽危石，日色冷青松。薄暮空潭曲，安禅制毒龙。');
                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                      