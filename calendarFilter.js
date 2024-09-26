// 더미 데이터 준비 - 9개 케이스
const worksList = [
    { id: 1, actionPlanStartDaytime: '2024-09-22T00:00:00.000Z', actionPlanEndDaytime: '2024-09-26T23:59:00.000Z' },
    { id: 2, actionPlanStartDaytime: '2024-09-26T00:00:00.000Z', actionPlanEndDaytime: '2024-09-28T23:59:00.000Z' },
    { id: 3, actionPlanStartDaytime: '2024-09-25T00:00:00.000Z', actionPlanEndDaytime: '2024-09-25T23:59:00.000Z' },
    { id: 4, actionPlanStartDaytime: '2024-09-27T00:00:00.000Z', actionPlanEndDaytime: '2024-09-28T23:59:00.000Z' },
    { id: 5, actionPlanStartDaytime: '2024-09-22T00:00:00.000Z', actionPlanEndDaytime: '2024-09-23T23:59:00.000Z' }, 
    { id: 6, actionPlanStartDaytime: '2024-09-23T00:00:00.000Z', actionPlanEndDaytime: '2024-09-27T23:59:00.000Z' }, 
    { id: 7, actionPlanEndDaytime: '2024-09-25T23:59:00.000Z' },  // 시작일 없음
    { id: 8, actionPlanStartDaytime: '2024-09-25T00:00:00.000Z' }, // 종료일 없음
    { id: 9 }, // 시작일과 종료일 모두 없음
];

// 필터 조건 (예시)
const startDaytimeFilter = '2024-09-24T00:00:00.000Z'; 
const endDaytimeFilter = '2024-09-26T23:59:00.000Z'; 

// 필터링 결과를 담을 배열
const jobs = {
    rows: []
};

// 필터링 로직
worksList.forEach(item => {
    const row = { id: item.id, actionPlanStartDaytime: item.actionPlanStartDaytime || null, actionPlanEndDaytime: item.actionPlanEndDaytime || null }; // 기본 row 설정

    const startDate = item.actionPlanStartDaytime ? new Date(item.actionPlanStartDaytime) : null;
    const endDate = item.actionPlanEndDaytime ? new Date(item.actionPlanEndDaytime) : null;

    // 패턴 1, 2, 3의 공통 조건
    let inDateRange = false;

    // 조건 체크
    if (startDate && endDate) {
        inDateRange = (startDate <= new Date(endDaytimeFilter) && endDate >= new Date(startDaytimeFilter));
    } 
    // 패턴 2: actionPlanStartDaytime가 없고 actionPlanEndDaytime만 존재
    else if (!startDate && endDate) {
        inDateRange = (endDate >= new Date(startDaytimeFilter)); 
    } 
    // 패턴 3: actionPlanEndDaytime가 없고 actionPlanStartDaytime만 존재
    else if (startDate && !endDate) {
        inDateRange = (startDate >= new Date(startDaytimeFilter));
    } 
    // 패턴 4: 둘 다 없는 경우
    else {
        inDateRange = true; // 항상 true
    }

    // startDaytimeFilter이 빈 문자열인 경우 추가 처리
    if (startDaytimeFilter === "") {
        if (startDate) {
            inDateRange = inDateRange || (startDate <= new Date(endDaytimeFilter));
        }
        if (endDate) {
            inDateRange = inDateRange || (endDate <= new Date(endDaytimeFilter));
        }
    }
    // endDaytimeFilter이 빈 문자열인 경우 추가 처리
    if (endDaytimeFilter === "") {
        if (startDate) {
            inDateRange = inDateRange || (startDate >= new Date(startDaytimeFilter));
        }
        if (endDate) {
            inDateRange = inDateRange || (endDate >= new Date(startDaytimeFilter));
        }
    }

    // 결과 추가
    if (inDateRange) {
        // actionPlanStartDaytime이 null인 경우 키 삭제
        if (row.actionPlanStartDaytime === null) {
            delete row.actionPlanStartDaytime;
        }

        // actionPlanEndDaytime이 null인 경우 키 삭제
        if (row.actionPlanEndDaytime === null) {
            delete row.actionPlanEndDaytime;
        }

        jobs.rows.push(row);
    }
});

// 필터링된 결과를 JSON 형식으로 출력
console.log("Filtered Results:", JSON.stringify(jobs.rows, null, 2));
