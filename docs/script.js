enchant();

window.onload = function(){
	// Create a window
	const game = new Game(400, 500);
	// Load contents
	const clickSndPtr = "sound/click.wav";
	game.preload([clickSndPtr]);

	const kirimochiImgPtr = "images/kirimochi.png";
	game.preload([kirimochiImgPtr]);

	const continueImgPtr = "images/retry.png";
	game.preload([continueImgPtr]);

	const tweetImgPtr = "images/tweet.png"
	game.preload([tweetImgPtr]);

	game.onload = function(){
		let point = 0;

		const mainScene = new Scene();
		game.pushScene(mainScene);
		mainScene.backgroundColor = "orange";

		const scoreText = new Label();
		scoreText.font = "20px Meiryo";
		scoreText.color = 'rbga(255, 255, 255, 1)';
		scoreText.width = 400;
		scoreText.moveTo(200, 10);
		mainScene.addChild(scoreText);

		scoreText.text = "Scores: " + point;

		const kirimochiImg = new Sprite(150, 138);
		kirimochiImg.moveTo(118, 100);
		kirimochiImg.image = game.assets[kirimochiImgPtr];
		mainScene.addChild(kirimochiImg);

		kirimochiImg.ontouchend = function () {
			point++;
			game.assets[clickSndPtr].clone().play();

			this.x = -200;
		};
		game.onenterframe = function () {
			kirimochiImg.x += 5;

			scoreText.text = "Scores: " + point;
			if(kirimochiImg.x >= 400){
				game.popScene();
				game.pushScene(endScene);
				gameOverText.text = "GAME OVER 記録: " + point;
			}
		};
		const endScene = new Scene();
		endScene.backgroundColor = "green";

		const gameOverText = new Label();
		gameOverText.font = "20px Meiryo";
		gameOverText.width = 400;
		gameOverText.moveTo(0, 30);
		endScene.addChild(gameOverText);

		const retryBtn = new Sprite(120, 60);
		retryBtn.moveTo(50, 300);
		retryBtn.image = game.assets[continueImgPtr];
		endScene.addChild(retryBtn);

		retryBtn.ontouchend = function () {
			point = 0;
			kirimochiImg.x = -200;
			game.popScene();
			game.pushScene(mainScene);
		};
	};
	game.start();
};