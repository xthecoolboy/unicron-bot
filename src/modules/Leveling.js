const LvlChart = [];
const ReqLvlChart = [];

for (var i = 0; i < 101; i++) {
    ReqLvlChart.push(2 * (i * i) + i + 69);
}
for (var i = 0; i < 101; i++) {
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

module.exports = { 
    LvlChart, 
    ReqLvlChart,
};