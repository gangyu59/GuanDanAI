window.onload = function () {
    console.log("✅ 游戏加载完成！");

    // 创建游戏实例
    let game = new Game();

    // 绑定事件
    new EventHandler(game);
};