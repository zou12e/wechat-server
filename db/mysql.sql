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

-- SET SQL_SAFE_UPDATES = 0;
 
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/1.jpg', content = '山前有个圆圆脸，山后有个圆脸圆。两人山上比脸圆。圆圆脸比圆脸圆脸扁，圆脸圆比圆圆脸脸圆。' where title = '圆脸';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/2.jpg', content = '司小四和史小世，四月四十四日十四时四十上集市，司小四买了四十四斤四两西红柿，史小世买了十四斤四两细蚕丝。司小四要拿四十四斤四两西红柿换史小世十四斤四两细蚕丝。史小世十四斤四两细蚕丝不换司小四四十四斤四两西红柿。司小四说我四十四斤四两西红柿可以增加营养防近视，史小世说我十四斤四两细蚕丝可以织绸织缎又抽丝。' where title = '司小四和史小世';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/3.jpg', content = '送给情绪低点的你，在一切变好之前，我们总要经历一些不开心的日子，这段日子也许很长也许只是一觉醒来，所以耐心点给好运一点时间，要坚信每件事的最后都会是好事，如果不是好事说明还没到最后 。' where title = '送给情绪低点的你';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/4.jpg', content = '如果提前了解你们所要面对的人生，不知你们是否还有勇气前来？看到的和听到的，经常会令你们沮丧。世俗是这样的强大，强大到生不出改变他们的念头来。可是如果有机会提前了解你们的人生，知道青春也不过只是这些日子，不知你们是否还会在意那些世俗希望你们在意的事情。比如占有多少才更荣耀，拥有什么才能被爱，等你们长大，你们会因绿芽冒出土地而喜悦，会对初生的朝阳欢呼跳跃，也会给别人善意和温暖。但是却会在赞美别的生命的同时，常常，甚至永远地忘了自己的珍贵。愿你在被打击时，坚信你的珍贵，爱你所爱，行你所行，听从你心，无问东西。' where title = '无问西东';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/5.jpg', content = '母亲在台湾，知道我婚姻后因为荷西工作的关系，要到大荒漠地区的非洲去，十二分的心痛，但是因为钱都是荷西赚，我只有跟了饭票走，毫无选择的余地。婚后开厨不久，我们吃的全都是西菜。后来家中航空包裹飞来接济，我收到大批粉丝、紫菜、冬菇、生力面、猪肉干等珍贵食品，我乐得爱不释手，加上欧洲女友寄来罐头酱油，我的家庭“中国饭店”马上开张，可惜食客只有一个不付钱的。' where title = '沙漠中的饭店';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/6.jpg', content = '近几年来，父亲和我都是东奔西走，家中光景是一日不如一日。他少年出外谋生，独力支持，做了许多大事。那知老境却如此颓唐！他触目伤怀，自然情不能自已。情郁于中，自然要发之于外；家庭琐屑便往往触他之怒。他待我渐渐不同往日。但最近两年的不见，他终于忘却我的不好，只是惦记着我，惦记着我的儿子。我北来后，他写了一信给我，信中说道，我身体平安，惟膀子疼痛利害，举箸提笔，诸多不便，大约大去之期不远矣。我读到此处，在晶莹的泪光中，又看见那肥胖的，青布棉袍，黑布马褂的背影。唉！我不知何时再能与他相见！' where title = '背影';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/7.jpg', content = '也许每个男子都有过这样两个女人，至少两个。娶了红玫瑰，久而久之，红的变了墙上的一抹蚊子血，白的还是窗前明月光。娶了白玫瑰，白的便是衣服上沾的一粒饭粘子，红的却是心口的一颗朱砂痣。' where title = '红玫瑰与白玫瑰';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/8.jpg', content = '那是最美好的时代，那是最糟糕的时代;那是智慧的年头，那是愚昧的年头;那是信仰的时期，那是怀疑的时期;那是光明的季节，那是黑暗的季节;那是希望的春天，那是失望的冬天;我们全都在直奔天堂，我们全都在直奔相反的方向——简而言之，那时跟现在非常相像，某些最喧嚣的权威坚持要用形容词的最高级来形容它。说它好，是最高级的;说它不好，也是最高级的。' where title = '双城记';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/9.jpg', content = '国破山河在，城春草木深。感时花溅泪，恨别鸟惊心。烽火连三月，家书抵万金。白头搔更短，浑欲不胜簪。' where title = '春望';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/10.jpg', content = '金樽清酒斗十千，玉盘珍羞直万钱。停杯投箸不能食，拔剑四顾心茫然。欲渡黄河冰塞川，将登太行雪满山。闲来垂钓碧溪上，忽复乘舟梦日边。行路难！行路难！多歧路，今安在？长风破浪会有时，直挂云帆济沧海。' where title = '行路难·其一';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/11.jpg', content = '人往往以为若离开了神就可以自由了，却不知我们无时无刻都在不自由地服侍某些人或事，或是地上的君王、政府、私人机构，或是我们自私的欲望。正如鱼离开了水、树离开了泥土就失去了自由的基础一样，我们离开了主，同样无自由可言。惟一确实的自由之路就是尽心尽意地服事这位创造主，他创造了我们，也可以使我们得著自由。' where title = '圣经12';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/12.jpg', content = '曾子曰：“吾日三省吾身：为人谋而不忠乎？与朋友交而不信乎？传不习乎？”子曰：“道千乘之国，敬事而信，节用而爱人，使民以时。”子曰：“弟子入则孝，出则弟，谨而信，泛爱众，而亲仁，行有余力，则以学文。”子夏曰：“贤贤易色；事父母，能竭其力；事君，能致其身；与朋友交，言而有信。虽曰未学，吾必谓之学矣。”' where title = '论语·学而篇2';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/13.jpg', content = '子曰：“君子喻于义，小人喻于利。”子曰：“见贤思齐焉，见不贤而内自省也。”子曰：“事父母，几谏，谏志不从，又敬不违，劳而不怨。”子曰：“父母在，不远游，游必有方。”子曰：“父母之年，不可不知也，一则以喜，一则以惧。”子曰：“古者言之不出，耻躬之不逮也。”子曰：“以约失者鲜矣。”子曰：“君子欲讷于言而敏于行。”子曰：“德不孤，必有邻。”子游曰：“事君数，斯辱矣；朋友数，斯疏矣。”' where title = '论语·里仁篇5';
update audio set banner = 'https://audio.wisdomwords.cn/images/dk1/14.jpg', content = '如是我闻：一时，佛在忉利天宫白玉座上，与大比丘、大菩萨等，及彼天主无量众俱。时大梵天王、那罗延天、大自在天及五乾闼婆王等，各与眷属俱，来至佛所，欲问如来造塔之法，及塔所生功德之量。会中有菩萨，名观世音，知其意，即从座起，偏袒右肩，右膝著地，合掌向佛，而作是言：‘世尊！今此诸天、乾闼婆等故来至此，欲请如来造塔之法，及塔所生功德之量。惟愿世尊为彼解说，利益一切无量众生！' where title = '佛经片段2';
 



INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (183,1 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (171,2 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (30,3 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (37,4 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (116,5 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (123,6 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (246,7 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (205,8 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (68,9 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (91,10 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (270,11 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (291,12 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (289,13 ,now());
INSERT INTO `huiyanbang`.`recommend` (`audioId`, `sort`, `createTime`)VALUES (17,14 ,now());


update audio set banner = 'https://audio.wisdomwords.cn/images/183.jpg' where id = 183;
update audio set banner = 'https://audio.wisdomwords.cn/images/171.jpg' where id = 171;
update audio set banner = 'https://audio.wisdomwords.cn/images/30.jpg' where id = 30;
update audio set banner = 'https://audio.wisdomwords.cn/images/37.jpg' where id = 37;
update audio set banner = 'https://audio.wisdomwords.cn/images/116.jpg' where id = 116;
update audio set banner = 'https://audio.wisdomwords.cn/images/123.jpg' where id = 123;
update audio set banner = 'https://audio.wisdomwords.cn/images/246.jpg' where id = 246;
update audio set banner = 'https://audio.wisdomwords.cn/images/205.jpg' where id = 205;
update audio set banner = 'https://audio.wisdomwords.cn/images/68.jpg' where id = 68;
update audio set banner = 'https://audio.wisdomwords.cn/images/91.jpg' where id = 91;
update audio set banner = 'https://audio.wisdomwords.cn/images/270.jpg' where id = 270;
update audio set banner = 'https://audio.wisdomwords.cn/images/291.jpg' where id = 291;
update audio set banner = 'https://audio.wisdomwords.cn/images/289.jpg' where id = 289;
update audio set banner = 'https://audio.wisdomwords.cn/images/17.jpg' where id = 17;                                                                                             