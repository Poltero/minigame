var paths = {

	maps: "maps/",
	music: "music/",
	images: "img/"

};

var musicLoader = {

	music: {
		level_one_bg: { file: "test3.wav", loop: true }
	},

	sounds: {
		jump: { file: "test.wav" }
	}

};

var tplLoader = {
	template: "tpl.png"
};

var bootstrap = {

	levels: {
		one: { 
			map: "level1s.txt",
			music: musicLoader.music.level_one_bg.file,
			splash: [2048, 2048],
			background: [2048, 0]
		},

		bonus_one: {
			map: "bonus1.txt",
			music: musicLoader.music.level_one_bg.file,
			splash: [2048, 2048],
			background: [2048, 0]
		},

		bonus_two: {
			map: "bonus2.txt",
			music: musicLoader.music.level_one_bg.file,
			splash: [2048, 2048],
			background: [2048, 0]
		}
	}

};

var config = {

	player: {
		speed: 200,
		speedDown: 350,
		speedJump: 300
	},

	enemy: {
		speed: 100
	},

	boss: {
		prob_teleport: 0.2 
	},

	bullet: {
		speed: 300
	}
};