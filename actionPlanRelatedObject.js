// index.js
let equipmentId = "";

let worksList = [];
let dict1 = {
    actionPlanRelatedObject: ["user:adminUser, equipment:12DZhZbOhxS1muGcjJeMi8SQ"],
};
let dict2 = {
    actionPlanRelatedObject: ["equipment:34DZhZbOhxS1muGcjJeMi8SQ"],
};
worksList.push(dict1);
worksList.push(dict2);

console.log(worksList);

// for (let item of worksList) {
//     for (let obj of item.actionPlanRelatedObject) {
//         let parts = obj.split(", ");
//         for (let part of parts) {
//             if (part.startsWith("equipment:")) {
//                 let equipmentId = part.substring("equipment:".length);
//                 console.log(equipmentId);
//                 break;  // 가장 첫번째 발견된 equipment: 뒤의 값을 찾으면 종료
//             }
//         }
//     }
// }

// let worksList = [
//   { actionPlanRelatedObject: ["equipment:DZhZbOhxS1muGcjJeMi8SQ"] },
//   { actionPlanRelatedObject: ["user:adminUser, equipment:DZhZbOhxS1muGcjJeMi8SQ"] }
// ];

for (let item of worksList) {
    for (let obj of item.actionPlanRelatedObject) {
        let equipmentId = obj.split(", ").find(part => part.startsWith("equipment:"))?.split("equipment:")[1];
        if (equipmentId) {
            console.log(equipmentId);
            break;
        }
    }
}
console.log(equipmentId); // "DZhZbOhxS1muGcjJeMi8SQ"
