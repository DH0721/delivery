// index.js 
// TODO npm install axios axios-mock-adapter

const apis = require('./apis');

const workPlans = async () => {
    try {
        //TODO erase
        misc = [];

        let conditions = {
            params: {
                // siteCode: "PR-Test", 
                siteCode: "DUMMY-SITE2", 
                input_pvJobCategory: "5", 
                // input_locationName: "01DUMMY", 
                // input_parentEquipmentName: "01DUMMY-EQU", 
            }
        };
        // input サイトコード
        let siteCode = conditions.params.siteCode;
        // // input 作業カテゴリー
        // let input_pvJobCategory = conditions.params.input_pvJobCategory;
        // // input 設置場所
        // let input_locationName = conditions.params.input_locationName;
        // // input 親設備名前
        // let input_parentEquipmentName = conditions.params.input_parentEquipmentName;
        let siteName = "";

        let planData = {
            rows: [],
        };

        let res = await apis.getSite(misc, siteCode);
        const siteData = res.data;
        siteCode = siteData.siteCode;
        siteName = siteData.siteName;

        res = await apis.getWorkListBySiteCode(misc, siteCode);
        let workList = res.data;

        for (let work of workList) {
            let actionPlanId = work.actionPlanId

            res = await apis.getWorkDetails(misc,siteCode,actionPlanId)
            if(!res) continue
            // TODO 設備なし->点検名にだけ出す。
            let worksDetails = res.data

            // 点検カテゴリ
            let tmpJobCategory;
            // worksDetails.actionPlanClassTypeを文字から数字に変換して数字ではない場合、定期点検に固定
            if ("actionPlanClassType" in worksDetails && !isNaN(Number(worksDetails.actionPlanClassType))) {
                tmpJobCategory = worksDetails.actionPlanClassType;
            } else {
                tmpJobCategory = "5";
            }

            // 関連オブジェクト情報処理
            let tmpActionPlanRelatedObject;
            // 設備なしフラグ : 作業詳細の関連オブジェクトに設備情報がなければ「true」にする。
            let EquipmentFlag = false;
            let parentEquipmentName =""
            let locationName =""
            if ("actionPlanRelatedObject" in worksDetails && worksDetails.actionPlanRelatedObject.length > 0) {
                // ex) actionPlanRelatedObjectList = ['site:DUMMY-SITE2','equipment:vAdwa1zKTnaKZBsTiI3-FQ']設備一つに想定する。
                let actionPlanRelatedObjectList = worksDetails.actionPlanRelatedObject;
                
                let tmpEquipList = [];
                for (let item of actionPlanRelatedObjectList) {
                    if (item.startsWith("equipment:")) {
                        
                        let equipmentId = item.substring("equipment:".length);

                        // 設備IDで(設備名称,メーカ,設置場所)情報取得
                        let res = await apis.searchAssetID(misc, equipmentId);

                        if (!("err" in res) && res.data[equipmentId]) {
                            let equipRow = {
                                "equipmentId": equipmentId,
                                // 設備名称
                                "equipmentName": "asEquipmentProductName" in res.data[equipmentId] ? res.data[equipmentId].asEquipmentProductName : "",
                                // 設備番号
                                "equipmentNo": "asEquipmentReference" in res.data[equipmentId] ? res.data[equipmentId].asEquipmentReference[0] : "",
                                // 設備分類
                                "equipmentType": "equipmentType" in res.data[equipmentId].asEquipmentTags ? res.data[equipmentId].asEquipmentTags.equipmentType : "",
                                // debug用
                                "ALLPROP": res.data
                            };
                            tmpEquipList.push(equipRow);

                            // case 1 設備RDS検索 -> 親RDS：7桁、子RDS：12桁
                            // case 2 設備RDS検索 -> 親RDS：12桁、子RDS：12 + α桁
                            let equipmentReference = res.data[equipmentId].asEquipmentReference[0];
                            
                            // 設備番号でRDSフィルター検索
                            let filterParam = {
                                filter: 'rdsReferenceDesignation=' + equipmentReference
                            };
                            
                            res = await apis.getRDS(misc, siteCode, filterParam);
                            let rdsInfo = res.data[equipmentReference];
                            // case 1
                            // 親RDSが7桁であれば、親RDSは設置場所/RDSは設置場所である。
                            if (rdsInfo.rdsParentReferenceDesignation.length == 7) {
                                // 装置
                                parentEquipmentName = rdsInfo.rdsName;
                                let deviceRDS = rdsInfo.rdsParentReferenceDesignation;
                                let devicefilterParam = {
                                    filter: 'rdsReferenceDesignation=' + deviceRDS
                                };

                                res = await apis.getRDS(misc, siteCode, devicefilterParam);
                                // 設置場所
                                locationName = res.data[deviceRDS].rdsName;
                                EquipmentFlag = true;
                                
                            } else if (rdsInfo.rdsParentReferenceDesignation.length == 12) {
                                // case 2
                                // 親RDSが12桁であれば、親RDSをもう一度フィルターして「装置」確定、
                                // その親RDSをもう一度フィルターして「設備場所」確定する。
                                let equipmentRDS = rdsInfo.rdsParentReferenceDesignation;
                                let equipfilterParam = {
                                    filter: 'rdsReferenceDesignation=' + equipmentRDS
                                };

                                res = await apis.getRDS(misc, siteCode, equipfilterParam);
                                // 装置
                                parentEquipmentName = res.data[equipmentRDS].rdsName;
                                let deviceRDS = res.data[equipmentRDS].rdsParentReferenceDesignation;
                                
                                let devicefilterParam = {
                                    filter: 'rdsReferenceDesignation=' + deviceRDS
                                };
                                
                                res = await apis.getRDS(misc, siteCode, devicefilterParam);
                                if (!("err" in res)) {
                                    // 設置場所
                                    locationName = res.data[deviceRDS].rdsName;
                                }
                                EquipmentFlag = true;

                            } else {
                                locationName = "設置場所情報なし";
                                parentEquipmentName = "装置情報なし";
                            }
                        } 
                    }
                }
                tmpActionPlanRelatedObject = tmpEquipList;
            } 
            // worksDetails.actionPlanTags?.jobCycleがnull又はundefinedの場合１にする。
            // 必須パラメータ
            let actionPlanCycle = (worksDetails && worksDetails.actionPlanTags && worksDetails.actionPlanTags.jobCycle) !== undefined ? worksDetails.actionPlanTags.jobCycle : 1;
            let actionPlanDetails = tmpJobCategory;
            let actionPlanSiteCode = (worksDetails && worksDetails.actionPlanSiteCode) !== undefined ? worksDetails.actionPlanSiteCode : "";
            let actionPlanTitle = (worksDetails && worksDetails.actionPlanTitle) !== undefined ? worksDetails.actionPlanTitle : "";
            let pvJobCategory = tmpJobCategory;
            
            let tmpPlanDateItems = [];
            let onePlanDateItems = createPlanDateItems(worksDetails, actionPlanId)
            tmpPlanDateItems.push(onePlanDateItems);

            let row;
            // 関連オブジェクトの設備情報がない場合の形式
            if(EquipmentFlag){
                row = {
                    isParent: false,
                    // "Message":"親なし、設備あり",
                    // 作業繰り返し回数(actionPlanCycle)
                    actionPlanCycle:actionPlanCycle,
                    // 詳細(actionPlanDetails)
                    // actionPlanDetails:("actionPlanDetails" in worksDetails) ? worksDetails.actionPlanDetails : "NO actionPlanDetails",
                    actionPlanDetails:pvJobCategory,
                    // 作業サイトコード(actionPlanSiteCode)
                    actionPlanSiteCode:actionPlanSiteCode,
                    // 作業名称(actionPlanTitle)
                    actionPlanTitle:actionPlanTitle,
                    // 作業種別 actionPlanClassType : "Job" -> "5" 変更予定
                    // TODO 画面出力のため強制挿入(pvJobCategory)
                    pvJobCategory: pvJobCategory,
                    
                    // 設備名称
                    // actionPlanRelatedObject:("actionPlanRelatedObject" in worksDetails) ? worksDetails.actionPlanRelatedObject : [],
                    actionPlanRelatedObject:tmpActionPlanRelatedObject,
                    equipmentName: tmpActionPlanRelatedObject.length > 0 ? tmpActionPlanRelatedObject[0].equipmentName : "",
                    equipmentNo: tmpActionPlanRelatedObject.length > 0 ? tmpActionPlanRelatedObject[0].equipmentNo : "",
                    equipmentType: tmpActionPlanRelatedObject.length > 0 ? tmpActionPlanRelatedObject[0].equipmentType : "",

                    // 実績、計画表示
                    // ------8/2--8/3---8/4---8/5---8/6---
                    //case 1 ------●-----〇----〇----------  START(計画)
                    //case 2 ------〇----●-----〇----------　START(計画)
                    //case 3 ------〇----〇-----●----------  END(実績)
                    //case 1 開始時刻 > 現在時刻、(Start : 8/3, End : 8/5, Now : 8/3)
                    //case 2 終了時刻 > 現在時刻、(Start : 8/3, End : 8/5, Now : 8/4)
                    //case 3 終了時刻 < 現在時刻、(Start : 8/3, End : 8/4, Now : 8/5)
                    planDateItems: tmpPlanDateItems,
                    // 作業ID
                    actionPlanId:worksDetails.actionPlanId,
                    // 親作業ID
                    actionPlanParentId:worksDetails.actionPlanParentId,
                    
                    // 設備場所
                    locationName:locationName,
                    // 設備場所と同じ
                    locationId:locationName,
                    // 装置
                    parentEquipmentName:parentEquipmentName,

                    // 実際使用しない
                    DEBUG_compare: onePlanDateItems.planDate,
                    // 開始日時
                    DEBUG_actionPlanStartDaytime:("actionPlanStartDaytime" in worksDetails) ? worksDetails.actionPlanStartDaytime : "",
                    // 終了日時
                    DEBUG_actionPlanEndDaytime:("DEBUG_actionPlanEndDaytime" in worksDetails) ? worksDetails.DEBUG_actionPlanEndDaytime : "",
                }
            }  else {
                row = {    
                    isParent: false,
                    // "Message":"親なし、設備なし",
                    // 作業繰り返し回数(actionPlanCycle)
                    actionPlanCycle:actionPlanCycle,
                    // 詳細(actionPlanDetails)
                    // actionPlanDetails:("actionPlanDetails" in worksDetails) ? worksDetails.actionPlanDetails : "NO actionPlanDetails",
                    actionPlanDetails:pvJobCategory,
                    // 作業サイトコード(actionPlanSiteCode)
                    actionPlanSiteCode:actionPlanSiteCode,
                    // 作業名称(actionPlanTitle)
                    actionPlanTitle:actionPlanTitle,
                    // 作業種別 actionPlanClassType : "Job" -> "5" 変更予定
                    // TODO 画面出力のため強制挿入(pvJobCategory)
                    pvJobCategory: pvJobCategory,
                    // 実績、計画表示
                    // ------8/2--8/3---8/4---8/5---8/6---
                    //case 1 ------●-----〇----〇----------  START(計画)
                    //case 2 ------〇----●-----〇----------　START(計画)
                    //case 3 ------〇----〇-----●----------  END(実績)
                    //case 1 開始時刻 > 現在時刻、(Start : 8/3, End : 8/5, Now : 8/3)
                    //case 2 終了時刻 > 現在時刻、(Start : 8/3, End : 8/5, Now : 8/4)
                    //case 3 終了時刻 < 現在時刻、(Start : 8/3, End : 8/4, Now : 8/5)
                    planDateItems: tmpPlanDateItems,
                    // 作業ID
                    actionPlanId:worksDetails.actionPlanId,
                    // 親作業ID
                    actionPlanParentId:worksDetails.actionPlanParentId,

                    // 設備場所
                    locationName:locationName,
                    // 装置
                    parentEquipmentName:parentEquipmentName,

                    // 開始日時
                    DEBUG_actionPlanStartDaytime:worksDetails.actionPlanStartDaytime,
                    // 終了日時
                    DEBUG_actionPlanEndDaytime:worksDetails.actionPlanEndDaytime,

                }
            }

            if(worksDetails.actionPlanParentId != ""){
                row["isParent"] = true;
            }
            
            // サイト名称(siteName)
            row['siteName'] = siteName;

            planData.rows.push(row)
        }

        // 関数の呼び出しおよび結果の出力
        let allActionPlanRows = planData.rows
        // 検索条件フィルターを掛ける
        const filteredActionPlans = filterActionPlans(allActionPlanRows, conditions);
        // 「作業親がない物」が先に配置するようにフィルターを掛ける。
        const sortedActionPlanRows = moveParentRelatedMessagesToBottom(filteredActionPlans);
        // 「作業親がある物」リストを「作業親がない物」をmergeする。
        let mergeRows = mergePlanDateItems(sortedActionPlanRows);
        planData.expectUpdate = mergeRows;
        return planData.expectUpdate

    } catch (e) {
        return { err: e.message };
    }
};

// Function call for testing
result = workPlans().then(result => {
    console.log(result);
}).catch(err => {
    console.error(err);
});

// new Date形式をYYYY-MM-DD形式に変換する。(日本時間)
function formatDateToYMD(date, timeZone) {
    try {
        const options = { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' };
        const formatter = new Intl.DateTimeFormat('en-CA', options);
        const parts = formatter.formatToParts(date);
        const year = parts.find(part => part.type === 'year').value;
        const month = parts.find(part => part.type === 'month').value;
        const day = parts.find(part => part.type === 'day').value;
        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error("Error formatting date:", error);
        return null;
    }
}

// 作業日付(計画, 実績)生成する。
function createPlanDateItems(worksDetails, actionPlanId) {
    // バックに計算するパラメータ
    const AC_startDate = worksDetails.actionPlanStartDaytime ? new Date(worksDetails.actionPlanStartDaytime) : null;
    const AC_endDate = worksDetails.actionPlanEndDaytime ? new Date(worksDetails.actionPlanEndDaytime) : null;

    const startDate = AC_startDate ? formatDateToYMD(AC_startDate, 'Asia/Tokyo') : null;
    const endDate = AC_endDate ? formatDateToYMD(AC_endDate, 'Asia/Tokyo') : null;
    const now = new Date();
    const nowInTokyo = new Intl.DateTimeFormat('en-CA', { 
        timeZone: 'Asia/Tokyo', 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).formatToParts(now).reduce((acc, part) => {
        if (part.type === 'literal') return acc;
        return { ...acc, [part.type]: part.value };
    }, {});

    const nowTokyoDate = new Date(`${nowInTokyo.year}-${nowInTokyo.month}-${nowInTokyo.day}T${nowInTokyo.hour}:${nowInTokyo.minute}:${nowInTokyo.second}+09:00`);
    
    // 現在時刻と比較して終了時刻を過ぎた場合、終了時刻を「実績」に追加する。
    // 現在時刻と比較して終了時刻を過ぎない場合、開始時刻を「計画」に追加する。
    const comparisonType = AC_endDate && AC_endDate < nowTokyoDate ? "実績" : "計画";
    const comparisonDate = AC_endDate && AC_endDate < nowTokyoDate ? endDate : startDate;
    
    // 実績、計画表示
    const onePlanDateItems = {
        planType: comparisonType,
        planDate: comparisonDate,
        actionPlanId: actionPlanId
    };

    return onePlanDateItems;
}

// 親なしリストに親ありリストの作業日付をmergeする。
function mergePlanDateItems(rows) {
    // actionPlanIdとactionPlanParentIdをマッピングするためのマップを作成
    let map = new Map();

    // rowsを巡回してデータを整理
    rows.forEach(row => {
        let { actionPlanId, actionPlanParentId, planDateItems } = row;
        
        // planDateItemsが配列であるか確認し、配列でない場合や存在しない場合は空の配列で初期化
        if (!Array.isArray(planDateItems)) {
            planDateItems = [];
        }

        if (actionPlanParentId === '') {
            // actionPlanParentIdが空文字列の場合
            map.set(actionPlanId, {
                ...row,
                planDateItems: [...planDateItems] // 初期のplanDateItemsを設定
            });
        } else {
            // actionPlanParentIdがある項目は親のplanDateItemsに追加
            if (map.has(actionPlanParentId)) {
                let parentItem = map.get(actionPlanParentId);
                if (!Array.isArray(parentItem.planDateItems)) {
                    parentItem.planDateItems = [];
                }
                parentItem.planDateItems.push(...planDateItems);
            } else {
                // 親項目がマップに存在しない場合の処理
                map.set(actionPlanParentId, {
                    planDateItems: [...planDateItems]
                });
            }
        }
    });

    // 最終結果の配列を生成
    return Array.from(map.values());
}

// 親の設備がある配列を後ろに配置する。
function moveParentRelatedMessagesToBottom(actionPlanRows) {
    return actionPlanRows.sort((a, b) => {
        if (a.isParent && !b.isParent) {
            return 1; // aをb後ろに配置
        }
        if (!a.isParent && b.isParent) {
            return -1; // aをb前に配置
        }
        return 0; 
    });
}

// 作業種別・設置場所・装置をフィルターする。
function filterActionPlans(allActionPlanRows, conditions) {
    const { siteCode, input_pvJobCategory, input_locationName, input_parentEquipmentName } = conditions.params;

    return allActionPlanRows.filter(row => {
        let siteCodeMatch = true;
        let categoryMatch = true;
        let locationMatch = true;
        let parentEquipmentMatch = true;

        if (siteCode) {
            siteCodeMatch = row.actionPlanSiteCode === siteCode;
        }

        if (input_pvJobCategory) {
            categoryMatch = row.pvJobCategory === input_pvJobCategory;
        }

        if (input_locationName) {
            locationMatch = row.locationName === input_locationName;
        }

        if (input_parentEquipmentName) {
            parentEquipmentMatch = row.parentEquipmentName === input_parentEquipmentName;
        }

        return siteCodeMatch && categoryMatch && locationMatch && parentEquipmentMatch;
    });
}

// -------------------------------------------------------------------------------------------------------------------------------
// 予備品削除
async function spareDelete(){
    try{
        // 削除するデータIDを取得
        let spare_id = param.params

        // 予備品情報取得
        let res = await apis.searchSpareID(misc,spare_id)
        if(!("err" in res)){
            let siteCodeList = res.data
            // ヒットした最初の予備品を抜き出し
            let assetCode = Object.keys(siteCodeList)[0];
            let assetParam = siteCodeList[assetCode]

            // 予備品情報削除
            let result = await apis.deleteSpare(misc,assetParam.asSpareSiteCode,spare_id)

            // 添付ファイルがあるか?
            let fileName = assetParam.asSpareTags.fileName
            if(fileName != null){
                let fileList = fileName.split(",")
                for(let fileCount=0;fileCount<fileList.length;fileCount++){
                    result = await apis.deleteDeviceFile(misc,assetParam.asSpareSiteCode,fileList[fileCount])
                }
            }

            return result
        }

        return {err:"err"}
    }
    catch(e){
        return {err:e.message}
    }
}

// 作業削除
async function workDelete(){
    try{
        // 削除するデータIDを取得
        let work_id = param.params

        // 予備品情報取得
        // let res = await apis.searchSpareID(misc,work_id)
        // 作業情報取得
        let res = await apis.searchWorkID(misc,work_id)
        if(!("err" in res)){
            let siteCodeList = res.data
            // ヒットした最初の予備品を抜き出し
            let workCode = Object.keys(siteCodeList)[0];
            let workParam = siteCodeList[workCode]

            // // 予備品情報削除
            // let result = await apis.deleteSpare(misc,workParam.asSpareSiteCode,work_id)
            // 作業情報削除　TODO　workParam.asSpareSiteCode -> workParam.???
            let result = await apis.deleteSpare(misc,workParam.actionPlanSiteCode,work_id)

            // 添付ファイルがあるか? TODO workParam.asSpareTags -> workParam.???
            let fileName = workParam.asSpareTags.fileName
            if(fileName != null){
                let fileList = fileName.split(",")
                for(let fileCount=0;fileCount<fileList.length;fileCount++){
                    result = await apis.deleteDeviceFile(misc,workParam.asSpareSiteCode,fileList[fileCount])
                }
            }

            return result
        }

        return {err:"err"}
    }
    catch(e){
        return {err:e.message}
    }
}
// -------------------------------------------------------------------------------------------------------------------------------