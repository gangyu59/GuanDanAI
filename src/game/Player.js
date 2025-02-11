class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    receiveCards(cards) {
        this.hand.push(...cards);
    }

    playCards(selectedCards) {
        let type = RuleChecker.getHandType(selectedCards);

        if (type === 'Invalid') {
            console.log(`${this.name} 出的牌不符合规则！`);
            return false;
        }

        // 从手牌中移除打出的牌
        this.hand = this.hand.filter(card => !selectedCards.includes(card));

        console.log(`${this.name} 出牌: ${selectedCards.map(card => card.getName()).join(' ')} (${type})`);
        return true;
    }
}
