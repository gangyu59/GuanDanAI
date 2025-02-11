class CanvasManager {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 600;
        this.canvas.height = 600;
    }

    drawTable() {
        this.ctx.fillStyle = "#2d9a9e";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawAllPlayers(players, currentPlayerIndex) {
        const positions = [
            { x: this.canvas.width / 2 - 150, y: this.canvas.height - 120 }, // 玩家1（底部）
            { x: 20, y: this.canvas.height / 2 - 50 }, // 玩家2（左侧）
            { x: this.canvas.width / 2 - 150, y: 20 }, // 玩家3（顶部）
            { x: this.canvas.width - 180, y: this.canvas.height / 2 - 50 } // 玩家4（右侧）
        ];

        players.forEach((player, index) => {
            let pos = positions[index];
            this.drawPlayerHand(player, pos.x, pos.y, index === currentPlayerIndex, index);
        });
    }

    drawPlayerHand(player, x, y, isCurrentTurn, position) {
        let cardWidth = 50;
        let cardHeight = 70;
        let gap = 20;
        let vertical = position === 1 || position === 3;

        this.ctx.fillStyle = isCurrentTurn ? "yellow" : "white";
        this.ctx.font = "bold 16px Arial";
        this.ctx.fillText(player.name, x, y - 10);

        player.hand.forEach((card, i) => {
            let offsetX = vertical ? 0 : i * gap;
            let offsetY = vertical ? i * gap : 0;
            this.drawCard(x + offsetX, y + offsetY, cardWidth, cardHeight, card);
        });
    }

    drawPlayedCards(cards) {
        if (!cards) return;
        let centerX = this.canvas.width / 2 - cards.length * 25;
        let centerY = this.canvas.height / 2;

        cards.forEach((card, i) => {
            this.drawCard(centerX + i * 50, centerY, 50, 70, card);
        });
    }

    drawCard(x, y, width, height, card) {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeStyle = "#000000";
        this.ctx.strokeRect(x, y, width, height);

        let isRed = card.suit === "♥" || card.suit === "♦";
        this.ctx.fillStyle = isRed ? "red" : "black";
        this.ctx.font = "bold 14px Arial";
        this.ctx.fillText(card.getName(), x + 5, y + 20);
    }
}