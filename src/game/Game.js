// ✅ **Game.js** (游戏管理)
class Game {
		constructor() {
		    this.deck = new Deck();
		    this.deck.shuffle();
		    console.log("✅ 扑克牌已洗牌");
		
		    this.players = [
		        new Player("玩家1"),
		        new AIPlayer("玩家2"),
		        new AIPlayer("玩家3"),
		        new Player("玩家4")
		    ];
		
		    this.currentPlayerIndex = 0;
		    this.lastPlayedCards = [];
		
		    for (let player of this.players) {
		        player.receiveCards(this.deck.drawCards(10));
		    }
		
		    this.canvasManager = new CanvasManager("gameCanvas");
		    this.canvasManager.drawTable();
		    this.canvasManager.drawAllPlayers(this.players, this.currentPlayerIndex);
		
		    // **确保 EventHandler 正确绑定 Game 实例**
		    this.eventHandler = new EventHandler(this);
		}

    playTurn(cardIndex) {
        let player = this.players[this.currentPlayerIndex];

        if (!(player instanceof Player)) {
            console.warn("⚠️ AI 不允许手动出牌！");
            return;
        }

        if (cardIndex < 0 || cardIndex >= player.hand.length) {
            console.error("❌ 选中的牌索引无效！");
            return;
        }

        let selectedCard = [player.hand.splice(cardIndex, 1)[0]]; // **改为数组，兼容多张牌**

        // **规则校验**
        if (!RuleChecker.canBeat(this.lastPlayedCards, selectedCard)) {
            console.warn("⚠️ 不能压过上一张牌，必须过牌！");
            player.hand.push(selectedCard[0]); // **放回手牌**
            return;
        }

        this.lastPlayedCards = selectedCard;
        console.log(`🎯 ${player.name} 出牌: ${selectedCard[0].getName()}`);

        this.canvasManager.drawAllPlayers(this.players, this.currentPlayerIndex);
        this.nextTurn();
    }

    nextTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        let currentPlayer = this.players[this.currentPlayerIndex];

        console.log(`🔄 轮到 ${currentPlayer.name} 出牌`);

        if (currentPlayer instanceof AIPlayer) {
            setTimeout(() => this.aiPlay(currentPlayer), 500); // AI **响应时间更快**
        }
    }

    aiPlay(aiPlayer) {
        let aiCard = aiPlayer.autoPlay(this.lastPlayedCards);

        if (aiCard) {
            this.lastPlayedCards = [aiCard];
            console.log(`🤖 ${aiPlayer.name} 出牌: ${aiCard.getName()}`);
            this.canvasManager.drawAllPlayers(this.players, this.currentPlayerIndex);
        } else {
            console.warn(`🚫 ${aiPlayer.name} 过牌！`);
        }

        this.nextTurn();
    }
}

window.Game = Game;