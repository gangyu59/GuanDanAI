class Card {
    constructor(rank, suit) {
        this.rank = rank; // 点数 (2, 3, ..., 10, J, Q, K, A)
        this.suit = suit; // 花色 ('♠', '♥', '♦', '♣')
    }

    // 获取牌的名称（如 "A♠"、"10♥"）
    getName() {
        return `${this.rank}${this.suit}`;
    }
}

// 定义四种花色
const SUITS = ['♠', '♥', '♦', '♣'];
// 定义点数（A-K-Q-J-10-3-2）
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
