class Deck {
    constructor() {
        this.cards = [];

        // 生成 2 副扑克牌
        for (let i = 0; i < 2; i++) {
            for (let suit of SUITS) {
                for (let rank of RANKS) {
                    this.cards.push(new Card(rank, suit));
                }
            }
        }
    }

    // 洗牌算法 (Fisher-Yates 洗牌)
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    // 发牌 (默认发一张)
    drawCard() {
        return this.cards.pop();
    }

    // 批量发牌
    drawCards(count) {
        return this.cards.splice(-count, count);
    }
}