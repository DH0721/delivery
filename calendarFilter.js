// ダミーデータの準備 - 9つのケース
// const worksList = [
//     { id: 1, actionPlanStartDaytime: '2024-09-22T00:00:00.000Z', actionPlanEndDaytime: '2024-09-26T23:59:00.000Z' },
//     { id: 2, actionPlanStartDaytime: '2024-09-26T00:00:00.000Z', actionPlanEndDaytime: '2024-09-28T23:59:00.000Z' },
//     { id: 3, actionPlanStartDaytime: '2024-09-25T00:00:00.000Z', actionPlanEndDaytime: '2024-09-25T23:59:00.000Z' },
//     { id: 4, actionPlanStartDaytime: '2024-09-27T00:00:00.000Z', actionPlanEndDaytime: '2024-09-28T23:59:00.000Z' },
//     { id: 5, actionPlanStartDaytime: '2024-09-22T00:00:00.000Z', actionPlanEndDaytime: '2024-09-23T23:59:00.000Z' }, 
//     { id: 6, actionPlanStartDaytime: '2024-09-23T00:00:00.000Z', actionPlanEndDaytime: '2024-09-27T23:59:00.000Z' }, 
//     { id: 7, actionPlanEndDaytime: '2024-09-25T23:59:00.000Z' },  // 開始日なし
//     { id: 8, actionPlanStartDaytime: '2024-09-25T00:00:00.000Z' }, // 終了日なし
//     { id: 9 }, // 開始日と終了日が両方なし
// ];
const worksList = [
    { id: 1, actionPlanStartDaytime: '2024-09-24T00:00:00.000Z', actionPlanEndDaytime: '2024-09-26T23:59:00.000Z' },
    { id: 2, actionPlanEndDaytime: '2024-09-26T23:59:00.000Z' },  // 開始日なし
    { id: 3, actionPlanStartDaytime: '2024-09-24T00:00:00.000Z' }, // 終了日なし
    { id: 4 }, // 開始日と終了日が両方なし
];

// フィルター条件 (例)
let startDaytimeFilter = ''; 
let endDaytimeFilter = ''; 
// startDaytimeFilter = '2024-09-23T00:00:00.000Z'; 
// endDaytimeFilter = '2024-09-27T23:59:00.000Z'; 

// フィルター結果を格納する配列
const jobs = {
    rows: []
};

// フィルタリングロジック
worksList.forEach(item => {
    const row = { id: item.id, actionPlanStartDaytime: item.actionPlanStartDaytime || null, actionPlanEndDaytime: item.actionPlanEndDaytime || null }; // 基本行設定

    const startDate = item.actionPlanStartDaytime ? new Date(item.actionPlanStartDaytime) : null;
    const endDate = item.actionPlanEndDaytime ? new Date(item.actionPlanEndDaytime) : null;

    // パターン 1, 2, 3 の共通条件
    let inDateRange = false;

    // 条件チェック
    if (startDate && endDate) {
        inDateRange = (startDate <= new Date(endDaytimeFilter) && endDate >= new Date(startDaytimeFilter));
    } 
    // パターン 2: actionPlanStartDaytimeがなくて actionPlanEndDaytimeだけ存在
    else if (!startDate && endDate) {
        if(!startDaytimeFilter) {
            inDateRange = (endDate >= new Date(endDaytimeFilter)); 
        } else {
            inDateRange = (endDate >= new Date(startDaytimeFilter)); 
        }
    } 
    // パターン 3: actionPlanEndDaytimeがなくて actionPlanStartDaytimeだけ存在
    else if (startDate && !endDate) {
        if(!endDaytimeFilter) {
            inDateRange = (startDate <= new Date(startDaytimeFilter)); 
        } else {
            inDateRange = (startDate <= new Date(endDaytimeFilter));
        }
    } 
    // パターン 4: 両方ともない場合
    else {
        inDateRange = false; // 常に false
    }

    // パターン 5: filter条件がない場合、true
    if (!startDaytimeFilter && !endDaytimeFilter) {
        inDateRange = true;
    } 

    // startDaytimeFilterが空文字列の場合の追加処理
    if (startDaytimeFilter === "") {
        if (startDate) {
            inDateRange = inDateRange || (startDate <= new Date(endDaytimeFilter));
        }
        if (endDate) {
            inDateRange = inDateRange || (endDate <= new Date(endDaytimeFilter));
        }
    }
    // endDaytimeFilterが空文字列の場合の追加処理
    if (endDaytimeFilter === "") {
        if (startDate) {
            inDateRange = inDateRange || (startDate >= new Date(startDaytimeFilter));
        }
        if (endDate) {
            inDateRange = inDateRange || (endDate >= new Date(startDaytimeFilter));
        }
    }

    // 結果を追加
    if (inDateRange) {
        // actionPlanStartDaytimeが null の場合、キーを削除
        if (row.actionPlanStartDaytime === null) {
            delete row.actionPlanStartDaytime;
        }

        // actionPlanEndDaytimeが null の場合、キーを削除
        if (row.actionPlanEndDaytime === null) {
            delete row.actionPlanEndDaytime;
        }

        jobs.rows.push(row);
    }
});

// フィルタリングされた結果を JSON 形式で出力
console.log("Filtered Results:", JSON.stringify(jobs.rows, null, 2));
