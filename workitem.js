// index.js
let worksList = [
  { id: "EPAN", workname:"name1", category:"A", status:"ON" },
  { id: "KMAI", workname:"name2", category:"B", status:"OFF" },
  { id: "KRRO", workname:"name3", category:"B", status:"OFF" },
  { id: "ZZ2d", workname:"name4", category:"A", status:"ON" },
];

convertStatus = {
    "ON":"GO",
    "OFF":"STOP",
}

for (let item of worksList) {
    if (item.status in convertStatus) {
      item.status = convertStatus[item.status];
    }
  }
  
console.log(worksList);