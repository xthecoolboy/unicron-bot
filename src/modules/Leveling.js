const { Collection } = require('discord.js');
const LvlChart = [];
const ReqLvlChart = [];
const graph = new Collection();

(function () {
    for (let i = 0; i < 101; i++) {
        ReqLvlChart.push(2 * (i * i) + (50 * i) + 69);
    }
    for (let i = 0; i < 101; i++) {
        if (i === 0) {
            LvlChart.push(i);
            continue;
        } else if (i === 1) {
            LvlChart.push(ReqLvlChart[0]);
            continue;
        } else if (i === 2) {
            const cur = ReqLvlChart[0] + ReqLvlChart[1];
            LvlChart.push(cur);
            continue;
        }
        const cur = LvlChart[i - 1] + ReqLvlChart[i - 1];
        LvlChart.push(cur);
    };
    graph.set(0, '□□□□□□□□□□');
    graph.set(1, '■□□□□□□□□□');
    graph.set(2, '■■□□□□□□□□');
    graph.set(3, '■■■□□□□□□□');
    graph.set(4, '■■■■□□□□□□');
    graph.set(5, '■■■■■□□□□□');
    graph.set(6, '■■■■■■□□□□');
    graph.set(7, '■■■■■■■□□□');
    graph.set(8, '■■■■■■■■□□');
    graph.set(9, '■■■■■■■■■□');
})();

module.exports = {
    LevelChart: LvlChart,
    RequiredLevelChart: ReqLvlChart,
    ProgressBar: function (percent) {
        if (percent < 10) return graph.get(0);
        else if (percent < 20) return graph.get(1);
        else if (percent < 30) return graph.get(2);
        else if (percent < 40) return graph.get(3);
        else if (percent < 50) return graph.get(4);
        else if (percent < 60) return graph.get(5);
        else if (percent < 70) return graph.get(6);
        else if (percent < 80) return graph.get(7);
        else if (percent < 90) return graph.get(8);
        else return graph.get(9);
    },
};