// EventHandler.js
class EventHandler {
    constructor(game) {
        this.game = game; // **确保绑定 Game 实例**
        this.canvas = document.getElementById("gameCanvas");

        this.canvas.addEventListener("click", this.handleInteraction.bind(this));
        this.canvas.addEventListener("touchstart", this.handleInteraction.bind(this));
    }

    handleInteraction(event) {
		    event.preventDefault(); // **防止 iPhone 触摸滚动**
		    
		    let rect = this.canvas.getBoundingClientRect();
		    let x, y;
		
		    // **支持 iPhone 触摸 (touchstart) 和 PC 点击 (click)**
		    if (event.touches && event.touches.length > 0) {
		        x = event.touches[0].clientX - rect.left;
		        y = event.touches[0].clientY - rect.top;
		    } else {
		        x = event.clientX - rect.left;
		        y = event.clientY - rect.top;
		    }
		
		    if (isNaN(x) || isNaN(y)) {
		        console.error("❌ 获取坐标失败: (NaN, NaN)");
		        return;
		    }
		
		    console.log(`📍 触摸 / 点击 位置 (Canvas 相对): (${x}, ${y})`);
		
		    let player = this.game.players[this.game.currentPlayerIndex];
		
		    // **防止 `player` 未定义**
		    if (!player || !player.hand) {
		        console.error("❌ 当前玩家数据错误，无法获取手牌！");
		        return;
		    }
		
		    let cardIndex = this.getCardIndex(x, y, player);
		    
		    if (cardIndex !== -1) {
		        console.log(`✅ 命中第 ${cardIndex} 张牌`);
		        this.game.playTurn(cardIndex);
		    } else {
		        console.warn("⚠️ 点击未命中任何牌！");
		    }
		}
		
    getCardIndex(x, y, player) {
    let handStartX, handStartY;
    let cardWidth = 50;
    let cardHeight = 80;
    
    console.log(`🎯 计算牌位置: 玩家(${player.name}) 位置(${player.position})`);

    if (player.position === "bottom") {
        // 玩家1（自己） - 横向排列
        handStartX = 100;
        handStartY = this.canvas.height - cardHeight - 10;

        for (let i = 0; i < player.hand.length; i++) {
            let cardX = handStartX + i * (cardWidth + 5);
            console.log(`🃏 牌 ${i} 坐标: (${cardX}, ${handStartY})`);

            if (x >= cardX && x <= cardX + cardWidth && y >= handStartY && y <= handStartY + cardHeight) {
                return i;
            }
        }
    } else if (player.position === "top") {
        // 玩家3（对面）
        handStartX = 100;
        handStartY = 50;

        for (let i = 0; i < player.hand.length; i++) {
            let cardX = handStartX + i * (cardWidth + 5);
            console.log(`🃏 牌 ${i} 坐标: (${cardX}, ${handStartY})`);

            if (x >= cardX && x <= cardX + cardWidth && y >= handStartY && y <= handStartY + cardHeight) {
                return i;
            }
        }
    } else if (player.position === "left") {
        // 玩家2（左侧）
        handStartX = 50;
        handStartY = 100;

        for (let i = 0; i < player.hand.length; i++) {
            let cardY = handStartY + i * (cardHeight / 2);
            console.log(`🃏 牌 ${i} 坐标: (${handStartX}, ${cardY})`);

            if (x >= handStartX && x <= handStartX + cardWidth && y >= cardY && y <= cardY + cardHeight) {
                return i;
            }
        }
    } else if (player.position === "right") {
        // 玩家4（右侧）
        handStartX = this.canvas.width - cardWidth - 50;
        handStartY = 100;

        for (let i = 0; i < player.hand.length; i++) {
            let cardY = handStartY + i * (cardHeight / 2);
            console.log(`🃏 牌 ${i} 坐标: (${handStartX}, ${cardY})`);

            if (x >= handStartX && x <= handStartX + cardWidth && y >= cardY && y <= cardY + cardHeight) {
                return i;
            }
        }
    }

    return -1; // 没有命中任何牌
}
}

window.EventHandler = EventHandler;