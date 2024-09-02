function generateDates({ startDateTime, intervalValue, intervalType, endDateTime = null, repeatCount = null }) {
    const dates = [];
    let currentDate = new Date(startDateTime);

    const firstCurrentDate = currentDate.getUTCDate();
    
    // startDateTimeの時間部分を抽出
    const hours = currentDate.getUTCHours();
    const minutes = currentDate.getUTCMinutes();
    const seconds = currentDate.getUTCSeconds();
    const milliseconds = currentDate.getUTCMilliseconds();

    // 終了日が開始日よりも早い場合、終了日を無視して空の配列を返す
    if (endDateTime && new Date(endDateTime) <= currentDate) {
        return dates;
    }

    while (true) {
        // 月の計算
        if (intervalType === 'M') {
            const startMonth = currentDate.getUTCMonth();
            const startYear = currentDate.getUTCFullYear();

            // intervalValueだけ月を加算した後、新しい月の最初の日を計算
            const newMonth = startMonth + intervalValue;
            const newYear = startYear + Math.floor(newMonth / 12);
            const adjustedMonth = newMonth % 12;

            // 2月の場合、日付の調整
            if (adjustedMonth === 1) {
                // 2月の最終日を計算
                let daysInNewMonth = new Date(Date.UTC(newYear, adjustedMonth + 1, 0)).getUTCDate();
                // 開始日と2月の最終日を比較して小さい方の値を適用
                currentDate = new Date(Date.UTC(newYear, adjustedMonth, Math.min(firstCurrentDate, daysInNewMonth)));
            } else {
                // 2月以外の場合、元の日時を維持
                if (firstCurrentDate === 31) {
                    // 4,6,9,11月は30日で設定、それ以外は31日で設定
                    if (adjustedMonth === 3 || adjustedMonth === 5 || adjustedMonth === 8 || adjustedMonth === 10) {
                        currentDate = new Date(Date.UTC(newYear, adjustedMonth, 30));
                    } else {
                        currentDate = new Date(Date.UTC(newYear, adjustedMonth, 31));
                    }
                } else {
                    currentDate = new Date(Date.UTC(newYear, adjustedMonth, firstCurrentDate));
                }
            }

        } else if (intervalType === 'Y') {
            // 年の計算

            // currentDate.setUTCFullYear(currentDate.getUTCFullYear() + intervalValue);
            const startMonth = currentDate.getUTCMonth();
            const startYear = currentDate.getUTCFullYear();

            // intervalValueだけ年を加算した後、新しい年の最初の日を計算
            const newMonth = startMonth;
            const newYear = startYear + intervalValue;
            const adjustedMonth = newMonth % 12;

            // 2月の場合、日付の調整
            if (adjustedMonth === 1) {
                // 2月の最終日を計算
                let daysInNewMonth = new Date(Date.UTC(newYear, adjustedMonth + 1, 0)).getUTCDate();
                // 開始日と2月の最終日を比較して小さい方の値を適用
                currentDate = new Date(Date.UTC(newYear, adjustedMonth, Math.min(firstCurrentDate, daysInNewMonth)));
            } else {
                // 2月以外の場合、元の日時を維持
                if (firstCurrentDate === 31) {
                    // 4,6,9,11月は30日で設定、それ以外は31日で設定
                    if (adjustedMonth === 3 || adjustedMonth === 5 || adjustedMonth === 8 || adjustedMonth === 10) {
                        currentDate = new Date(Date.UTC(newYear, adjustedMonth, 30));
                    } else {
                        currentDate = new Date(Date.UTC(newYear, adjustedMonth, 31));
                    }
                } else {
                    currentDate = new Date(Date.UTC(newYear, adjustedMonth, firstCurrentDate));
                }
            }
        } else {
            switch (intervalType) {
                // 日の計算
                case 'D':
                    currentDate.setUTCDate(currentDate.getUTCDate() + intervalValue);
                    break;
                // 週の計算
                case 'W':
                    currentDate.setUTCDate(currentDate.getUTCDate() + intervalValue * 7);
                    break;
                default:
                    throw new Error("無効な間隔タイプです。'D'は日、'W'は週、'M'は月、'Y'は年を使用してください。");
            }
        }

        if (endDateTime && currentDate >= new Date(endDateTime)) break; // 終了日到達時にループ終了
        if (repeatCount && dates.length >= repeatCount) break; // 指定された繰り返し回数に到達時にループ終了

        // 時間も含めるように設定
        currentDate.setUTCHours(hours, minutes, seconds, milliseconds);
        
        dates.push(currentDate.toISOString()); // ISO形式で日時を保存
    }

    return dates;
}

//////// 日単位のケース ////////

// パターン 1: 終了日まで3日ごとに繰り返し
const testCase1 = generateDates({
    startDateTime: '2024-09-02T06:00:00Z',
    intervalValue: 3,
    intervalType: 'D',
    endDateTime: '2024-09-20T05:00:00Z'
});
console.log('Test Case 1 (日単位):', testCase1); 
// 予想結果: ["2024-09-05T06:00:00Z", "2024-09-08T06:00:00Z", "2024-09-11T06:00:00Z", "2024-09-14T06:00:00Z", "2024-09-17T06:00:00Z"]

// パターン 2: 9日ごとに2回繰り返し
const testCase2 = generateDates({
    startDateTime: '2024-09-02T06:00:00Z',
    intervalValue: 9,
    intervalType: 'D',
    repeatCount: 2
});
console.log('Test Case 2 (日単位):', testCase2);
// 予想結果: ["2024-09-11T06:00:00Z", "2024-09-20T06:00:00Z"]

// パターン 3: 終了日が開始日よりも早い場合
const testCase3 = generateDates({
    startDateTime: '2024-09-02T06:00:00Z',
    intervalValue: 3,
    intervalType: 'D',
    endDateTime: '2024-08-30T06:00:00Z'
});
console.log('Test Case 3 (日単位):', testCase3);
// 予想結果: []

//////// 週単位のケース ////////

// パターン 4: 終了日なしで3週間ごとに2回繰り返し
const testCase4 = generateDates({
    startDateTime: '2024-09-02T06:00:00Z',
    intervalValue: 3,
    intervalType: 'W',
    repeatCount: 2
});
console.log('Test Case 4 (週単位):', testCase4);
// 予想結果: ["2024-09-23T06:00:00Z", "2024-10-14T06:00:00Z"]

// パターン 5: 終了日まで2週間ごとに繰り返し
const testCase5 = generateDates({
    startDateTime: '2024-09-02T06:00:00Z',
    intervalValue: 2,
    intervalType: 'W',
    endDateTime: '2024-10-01T06:00:00Z'
});
console.log('Test Case 5 (週単位):', testCase5);
// 予想結果: ["2024-09-16T06:00:00Z", "2024-09-30T06:00:00Z"]

//////// 年単位のケース ////////

// パターン 6: 1年ごとに2回繰り返し
const testCase6 = generateDates({
    startDateTime: '2024-01-01T06:00:00Z',
    intervalValue: 1,
    intervalType: 'Y',
    repeatCount: 2
});
console.log('Test Case 6 (年単位):', testCase6);
// 予想結果: ["2025-01-01T06:00:00Z", "2026-01-01T06:00:00Z"]

// パターン 7: 2年ごとに終了日まで繰り返し
const testCase7 = generateDates({
    startDateTime: '2024-02-29T06:00:00Z',
    intervalValue: 2,
    intervalType: 'Y',
    endDateTime: '2028-04-01T06:00:00Z'
});
console.log('Test Case 7 (うるう年2月29日開始 / 終了日まで2年ごと):', testCase7);
// 予想結果: ["2026-01-01T06:00:00Z"]

//////// 月単位のケース ////////

// パターン 8: 2024年（うるう年）1月31日開始、1ヶ月ごとに2回繰り返し
const testCase8 = generateDates({
    startDateTime: '2024-01-31T06:00:00Z',
    intervalValue: 1,
    intervalType: 'M',
    repeatCount: 4
});
console.log('Test Case 8 (うるう年1月31日開始):', testCase8);
// 予想結果: ["2024-02-29T06:00:00Z", "2024-03-31T06:00:00Z", "2024-04-30T06:00:00Z"]

// パターン 9: 2023年（平年）1月31日開始、1ヶ月ごとに2回繰り返し
const testCase9 = generateDates({
    startDateTime: '2023-01-31T06:00:00Z',
    intervalValue: 1,
    intervalType: 'M',
    repeatCount: 4
});
console.log('Test Case 9 (平年1月31日開始):', testCase9);
// 予想結果: ["2023-02-28T06:00:00Z", "2023-03-31T06:00:00Z", "2024-04-30T06:00:00Z"]

// パターン 10: 1ヶ月ごとに終了日まで繰り返し
const testCase10 = generateDates({
    startDateTime: '2023-12-29T06:00:00Z',
    intervalValue: 1,
    intervalType: 'M',
    endDateTime: '2028-04-29T06:00:00Z'
});
console.log('Test Case 10 (終了日まで1ヶ月ごと):', testCase10);
// 予想結果: ["2024-01-31T06:00:00Z", "2024-02-29T06:00:00Z", "2024-03-31T06:00:00Z"]

// パターン 11: 6ヶ月ごとに3回繰り返し
const testCase11 = generateDates({
    startDateTime: '2024-02-29T06:00:00Z',
    intervalValue: 6,
    intervalType: 'M',
    repeatCount: 12
});
console.log('Test Case 11 (6ヶ月ごと、うるう年2月開始):', testCase11);
// 予想結果: ["2024-08-29T06:00:00Z", "2025-02-28T06:00:00Z", "2025-08-29T06:00:00Z"]