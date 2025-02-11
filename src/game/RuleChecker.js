// ✅ **RuleChecker.js** (牌型判定 & 出牌规则)
class RuleChecker {
    static isSingle(cards) {
        return cards.length === 1;
    }

    static isPair(cards) {
        return cards.length === 2 && cards[0].rank === cards[1].rank;
    }

    static isTriple(cards) {
        return cards.length === 3 &&
               cards[0].rank === cards[1].rank &&
               cards[1].rank === cards[2].rank;
    }

    static isStraight(cards) {
        if (cards.length < 5) return false;
        let indices = cards.map(card => RANKS.indexOf(card.rank)).sort((a, b) => a - b);
        for (let i = 1; i < indices.length; i++) {
            if (indices[i] !== indices[i - 1] + 1) return false;
        }
        return true;
    }

    static isBomb(cards) {
        return cards.length >= 4 && cards.every(card => card.rank === cards[0].rank);
    }

    // **识别牌型**
    static getHandType(cards) {
        if (this.isSingle(cards)) return 'Single';
        if (this.isPair(cards)) return 'Pair';
        if (this.isTriple(cards)) return 'Triple';
        if (this.isStraight(cards)) return 'Straight';
        if (this.isBomb(cards)) return 'Bomb';
        return 'Invalid';
    }

    // **检查是否能压住前面的牌**
    static canBeat(previousCards, currentCards) {
        if (!previousCards || previousCards.length === 0) return true; // **第一轮可以随意出**

        let prevType = this.getHandType(previousCards);
        let currType = this.getHandType(currentCards);

        if (currType === 'Invalid') return false; // **不能出无效牌型**

        if (prevType === currType) {
            // **相同牌型，点数必须更大**
            return RANKS.indexOf(currentCards[0].rank) > RANKS.indexOf(previousCards[0].rank);
        }

        // **炸弹可以压制所有非炸弹牌型**
        if (currType === 'Bomb') return true;

        return false; // **否则不能出牌**
    }

    // **判断是否需要过牌**
    static isPass(previousCards, playerHand) {
        return !playerHand.some(card => this.canBeat(previousCards, [card]));
    }
}

window.RuleChecker = RuleChecker;