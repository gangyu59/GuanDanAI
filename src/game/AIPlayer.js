// ✅ **AIPlayer.js** (AI 玩家自动出牌)
class AIPlayer extends Player {
    constructor(name) {
        super(name);
    }

    autoPlay(lastPlayedCard) {
        if (this.hand.length === 0) return null;

        // **找出可以出的牌**
        let playableCards = this.hand.filter(card => RuleChecker.canBeat(lastPlayedCard, [card]));

        if (playableCards.length === 0) {
            console.log(`🚫 ${this.name} 过牌`);
            return null;
        }

        // **简单策略：AI 出最小的可行牌**
        let selectedCard = playableCards[0];
        this.hand.splice(this.hand.indexOf(selectedCard), 1);

        console.log(`🤖 ${this.name} 出牌: ${selectedCard.getName()}`);
        return selectedCard;
    }
}

window.AIPlayer = AIPlayer;