// apis.js TODO npm install

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Mocking the API response
const mock = new MockAdapter(axios);

// getSite (DUMMY-SITE2 or PR-Test)
mock.onGet(/\/site\/DUMMY-SITE2/).reply(200, {
    powerPlantGeneratedEnergy: { pfx: "kWh" },
    powerPlantGeneratorPower: { pfx: "kW" },
    powerPlantRatedGeneratorPower: 200,
    powerPlantRatedGeneratorPower: { pfx: "kW" },
    siteClassType: "SolarPowerPlant",
    siteCode: "DUMMY-SITE2",
    siteCreatedAt: "2024-03-05T02:45:54.520132Z",
    siteCreatedBy: "user:1192789625727356673",
    siteDaylightSavingUtcOffset: { pfx: "H" },
    siteName: "ダミーサイト2",
    siteOperationStartDate: "2024-01-16",
    siteOrganizationId: "A8AMS9KP3D0Q97X6KC9FWQQPQC",
    siteTags: {},
    siteUpdatedAt: "2024-07-18T05:20:22.010989Z",
    siteUpdatedBy: "user:1192789625727356673",
    siteUtcOffset: { pfx: "H" },
    solarIlluminanceIntensity: { pfx: "kW/m2" }
});
mock.onGet(/\/site\/PR-Test/).reply(200, {
    powerPlantGeneratedEnergy: { pfx: "MWh" },
    powerPlantGeneratorPower: { pfx: "MW" },
    powerPlantRatedGeneratorPower: 500,
    powerPlantRatedGeneratorPower: { pfx: "MW" },
    siteClassType: "WindPowerPlant",
    siteCode: "PR-Test",
    siteCreatedAt: "2023-11-01T12:00:00.000Z",
    siteCreatedBy: "user:1192789625727356673",
    siteDaylightSavingUtcOffset: { pfx: "H" },
    siteName: "PRモニタリング用",
    siteOperationStartDate: "2024-02-01",
    siteOrganizationId: "B1BCD2EFG3H4567IJK8LMNOP",
    siteTags: {},
    siteUpdatedAt: "2024-08-07T00:00:00.000Z",
    siteUpdatedBy: "user:1192789625727356673",
    siteUtcOffset: { pfx: "H" },
    solarIlluminanceIntensity: { pfx: "W/m2" }
});

// getWorkListBySiteCode (作業:7個)
mock.onGet(/\/workList\/DUMMY-SITE2/).reply(200, [
    {
        actionPlanId: "9UAO9W5-QXEU5-WMPCN4FA",
        actionPlanClassType: "Job",
        actionPlanCost: 50000,
        actionPlanCostPfx: "円",
        actionPlanCreatedAt: "2024-08-07T01:14:57Z",
        actionPlanCreatedBy: "user:1252976885210548025",
        actionPlanDetails: "detail11",
        actionPlanItems: [{}],
        actionPlanSiteCode: "DUMMY-SITE2",
        actionPlanStartDaytime: "2024-08-06T15:00:00Z",
        actionPlanTags: { contractVendor: 'vendor001' },
        actionPlanTitle: "Dummy-親なし",
        actionPlanUpdatedAt: "2024-08-07T04:17:31Z",
        actionPlanUpdatedBy: "user:1252976885210548025",
        jobMemo: "workMemo1",
        jobStatus: 2,
    },
    {
        actionPlanId: "95SOF06SRJMHATPMNS0M_W",
        actionPlanClassType: "Job",
        actionPlanCost: 50000,
        actionPlanCostPfx: "円",
        actionPlanCreatedAt: "2024-07-29T01:31:20Z",
        actionPlanCreatedBy: "user:1252976885210548025",
        actionPlanDetails: "DummyTest44",
        actionPlanEndDaytime: "2024-08-01T15:00:00Z",
        actionPlanSiteCode: "DUMMY-SITE2",
        actionPlanStartDaytime: "2024-07-28T15:00:00Z",
        actionPlanTitle: "DummyTest4",
        actionPlanUpdatedAt: "2024-07-29T01:31:20Z",
        actionPlanUpdatedBy: "user:1252976885210548025",
        jobMemo: "設備2",
        jobStatus: 2,
    },
    {
        actionPlanId: "ACSWSNUWSQYNZQ_U3QM4YG",
        actionPlanClassType: "Job",
        actionPlanCost: 3333,
        actionPlanCostPfx: "円",
        actionPlanCreatedAt: "2024-07-31T04:56:55Z",
        actionPlanCreatedBy: "user:1252976885210548025",
        actionPlanDetails: "pri",
        actionPlanEndDaytime: "2024-08-06T15:00:00Z",
        actionPlanSiteCode: "DUMMY-SITE2",
        actionPlanStartDaytime: "2024-07-30T15:00:00Z",
        actionPlanTitle: "PriorityTest1",
        actionPlanUpdatedAt: "2024-08-07T04:11:04Z",
        actionPlanUpdatedBy: "user:1252976885210548025",
        jobMemo: "isogi",
        jobStatus: 1,
    },{
        actionPlanId: "LHPKY2-LSV-PGRYYBXOSYQ",
        actionPlanClassType: "Job",
        actionPlanCost: 4400,
        actionPlanCostPfx: "円",
        actionPlanCreatedAt: "2024-08-07T06:21:19Z",
        actionPlanCreatedBy: "user:1252976885210548025",
        actionPlanDetails: "actionItemTest11",
        actionPlanEndDaytime: "2024-08-29T15:00:00Z",
        actionPlanItems: [{}],
        actionPlanSiteCode: "DUMMY-SITE2",
        actionPlanStartDaytime: "2024-08-08T15:00:00Z",
        actionPlanParentId: "WCVZ4KCRTQKKIACPKKI7TQ",
        actionPlanPriority: "Normal",
        actionPlanRelatedObject: ['equipment:DZhZbOhxS1muGcjJeMi8SQ'],
        actionPlanTitle: "actionItemTest1",
        actionPlanUpdatedAt: "2024-08-07T06:21:19Z",
        actionPlanUpdatedBy: "user:1252976885210548025",
        jobMemo: "memotest",
        jobStatus: 1,
    },
    {
        actionPlanId: "TE4CJVHTTE2U43JZUUSHGG",
        actionPlanClassType: "Job",
        actionPlanCost: 21999,
        actionPlanCostPfx: "円",
        actionPlanCreatedAt: "2024-07-29T07:44:00Z",
        actionPlanCreatedBy: "user:1252976885210548025",
        actionPlanDetails: "registerTest11",
        actionPlanEndDaytime: "2024-08-06T15:00:00Z",
        actionPlanItems: [{}, {}, {}, {}, {}],
        actionPlanSiteCode: "DUMMY-SITE2",
        actionPlanStartDaytime: "2024-07-28T15:00:00Z",
        actionPlanParentId: "",
        actionPlanPriority: "Low",
        actionPlanRelatedObject: [
            'site:DUMMY-SITE2',
            'equipment:vAdwa1zKTnaKZBsTiI3-FQ',
            'equipment:DZhZbOhxS1muGcjJeMi8SQ'
        ],
        actionPlanTitle: "registerTest1",
        actionPlanUpdatedAt: "2024-08-07T05:14:33Z",
        actionPlanUpdatedBy: "user:1252976885210548025",
        jobMemo: "memo5",
        jobStatus: 2,
    },
    {
        actionPlanId: "WCVZ4KCRTQKKIACPKKI7TQ",
        actionPlanClassType: "Job",
        actionPlanCostPfx: "円",
        actionPlanCreatedAt: "2024-07-26T08:48:04Z",
        actionPlanCreatedBy: "user:1252976885210548025",
        actionPlanDetails: "DummyTest33",
        actionPlanEndDaytime: "2024-07-29T15:03:00Z",
        actionPlanItems: [{}, {}],
        actionPlanSiteCode: "DUMMY-SITE2",
        actionPlanStartDaytime: "2024-07-25T15:03:00Z",
        actionPlanParentId: "",
        actionPlanPriority: "Normal",
        actionPlanRelatedObject: [
            'site:DUMMY-SITE2',
            'equipment:DZhZbOhxS1muGcjJeMi8SQ'
        ],
        actionPlanTitle: "DummyTest3",
        actionPlanUpdatedAt: "2024-07-26T08:48:04Z",
        actionPlanUpdatedBy: "user:1252976885210548025",
        jobMemo: "memo1",
        jobStatus: 2,
    },
    {
        actionPlanId: "XHU60VXJTESCP93TM57F_A",
        actionPlanClassType: "Job",
        actionPlanCostPfx: "円",
        actionPlanCreatedAt: "2024-07-26T06:12:07Z",
        actionPlanCreatedBy: "user:1252976885210548025",
        actionPlanDetails: "DummyTest22",
        actionPlanEndDaytime: "2024-07-26T15:02:00Z",
        actionPlanItems: [{}, {}],
        actionPlanSiteCode: "DUMMY-SITE2",
        actionPlanStartDaytime: "2024-07-25T15:01:00Z",
        actionPlanParentId: "95SOF06SRJMHATPMNS0M_W",
        actionPlanPriority: "High",
        actionPlanRelatedObject: ['equipment:DZhZbOhxS1muGcjJeMi8SQ'],
        actionPlanTitle: "DummyTest2",
        actionPlanUpdatedAt: "2024-07-31T05:31:55Z",
        actionPlanUpdatedBy: "user:1252976885210548025",
        jobMemo: "作業メモ1",
        jobStatus: 1,
    },
    {
        actionPlanId: "ABBCCC",
        actionPlanClassType: "Job",
        actionPlanCost: 50000,
        actionPlanCostPfx: "円",
        actionPlanCreatedAt: "2024-08-07T01:14:57Z",
        actionPlanCreatedBy: "user:1252976885210548025",
        actionPlanDetails: "detail11",
        actionPlanItems: [{}],
        actionPlanSiteCode: "DUMMY-SITE2",
        actionPlanStartDaytime: "2024-08-06T15:00:00Z",
        actionPlanTags: { contractVendor: 'vendor001' },
        actionPlanTitle: "test_親あり、設備なし",
        actionPlanUpdatedAt: "2024-08-07T04:17:31Z",
        actionPlanUpdatedBy: "user:1252976885210548025",
        jobMemo: "workMemo1",
        jobStatus: 2,
    },
]);

// getWorkDetails
mock.onGet(/\/workDetail\/DUMMY-SITE2\/WCVZ4KCRTQKKIACPKKI7TQ/).reply(200, 
    {
        actionPlanAttachedFile: [],
        actionPlanClassType: "Job",
        actionPlanCost: {
            pfx: "円"
        },
        actionPlanCreatedAt: "2024-07-26T08:48:04Z",
        actionPlanCreatedBy: "user:1252976885210548025",
        actionPlanDetails: "DummyTest33",
        actionPlanEndDaytime: "2024-07-29T15:03:00Z",
        actionPlanId: "WCVZ4KCRTQKKIACPKKI7TQ",
        actionPlanItems: [
            {
                actionPlanItemActionPlanId: null,
                actionPlanItemCompletedAt: "2024-07-25T15:08:00Z",
                actionPlanItemNumber: 1,
                actionPlanItemPriority: "Low",
                actionPlanItemRequiredTime: 1,
                actionPlanItemStatus: "2",
                actionPlanItemTitle: "test44"
            },
            {
                actionPlanItemActionPlanId: null,
                actionPlanItemCompletedAt: "2024-07-27T15:06:00Z",
                actionPlanItemNumber: 2,
                actionPlanItemPriority: "Normal",
                actionPlanItemRequiredTime: 1,
                actionPlanItemStatus: "1",
                actionPlanItemTitle: "test444"
            }
        ],
        actionPlanMessages: [],
        actionPlanObjectId: ['user:1252976885210548025'],
        actionPlanParentId: "",
        actionPlanPriority: "Normal",
        actionPlanRelatedEvent: [],
        actionPlanRelatedObject: ['site:DUMMY-SITE2', 'equipment:DZhZbOhxS1muGcjJeMi8SQ'],
        actionPlanRequestBy: "user:1252976885210548025",
        actionPlanSiteCode: "DUMMY-SITE2",
        actionPlanStartDaytime: "2024-07-25T15:03:00Z",
        actionPlanTags: {},
        actionPlanTitle: "DummyTest3",
        actionPlanUpdatedAt: "2024-07-26T08:48:04Z",
        actionPlanUpdatedBy: "user:1252976885210548025",
        actionPlanWatchers: [],
        jobConcernId: "",
        jobConcernInstanceId: "",
        jobMemo: "memo1",
        jobStatus: 2
    }
);
mock.onGet(/\/workDetail\/DUMMY-SITE2\/95SOF06SRJMHATPMNS0M_W/).reply(200, 
    {
        "actionPlanAttachedFile": [],
        "actionPlanClassType": "Job",
        "actionPlanCost": 50000,
        "actionPlanCost.pfx": "円",
        "actionPlanCreatedAt": "2024-07-29T01:31:20Z",
        "actionPlanCreatedBy": "user:1252976885210548025",
        "actionPlanDetails": "DummyTest44",
        "actionPlanEndDaytime": "2024-08-01T15:00:00Z",
        "actionPlanId": "95SOF06SRJMHATPMNS0M_W",
        "actionPlanItems": [
            {
                // item details here
            }
        ],
        "actionPlanMessages": [],
        "actionPlanObjectId": ["user:1252976885210548025"],
        "actionPlanParentId": "",
        "actionPlanPriority": "Urgent",
        "actionPlanRelatedEvent": [],
        "actionPlanRelatedObject": ["equipment:vAdwa1zKTnaKZBsTiI3-FQ"],
        "actionPlanRequestBy": "user:1252976885210548025",
        "actionPlanSiteCode": "DUMMY-SITE2",
        "actionPlanStartDaytime": "2024-07-28T15:00:00Z",
        "actionPlanTags": {},
        "actionPlanTitle": "DummyTest4",
        "actionPlanUpdatedAt": "2024-07-29T01:31:20Z",
        "actionPlanUpdatedBy": "user:1252976885210548025",
        "actionPlanWatchers": [],
        "jobConcernId": "",
        "jobConcernInstanceId": "",
        "jobMemo": "設備2",
        "jobStatus": 2
    }
);
mock.onGet(/\/workDetail\/DUMMY-SITE2\/XHU60VXJTESCP93TM57F_A/).reply(200, 
    {
        "actionPlanAttachedFile": [],
        "actionPlanClassType": "Job",
        "actionPlanCost": {
            "pfx": "円"
        },
        "actionPlanCreatedAt": "2024-07-26T06:12:07Z",
        "actionPlanCreatedBy": "user:1252976885210548025",
        "actionPlanDetails": "DummyTest22",
        "actionPlanEndDaytime": "2024-07-26T15:02:00Z",
        "actionPlanId": "XHU60VXJTESCP93TM57F_A",
        "actionPlanItems": [
        ],
        "actionPlanMessages": [],
        "actionPlanObjectId": ["user:1252976885210548025"],
        "actionPlanParentId": "95SOF06SRJMHATPMNS0M_W",
        "actionPlanPriority": "High",
        "actionPlanRelatedEvent": [],
        "actionPlanRelatedObject": ["equipment:DZhZbOhxS1muGcjJeMi8SQ"],
        "actionPlanRequestBy": "user:1252976885210548025",
        "actionPlanSiteCode": "DUMMY-SITE2",
        "actionPlanStartDaytime": "2024-07-25T15:01:00Z",
        "actionPlanTags": {"contractVendor": "vendorTest1"},
        "actionPlanTitle": "DummyTest2",
        "actionPlanUpdatedAt": "2024-07-31T05:31:55Z",
        "actionPlanUpdatedBy": "user:1252976885210548025",
        "actionPlanWatchers": [],
        "jobConcernId": "",
        "jobConcernInstanceId": "",
        "jobMemo": "作業メモ1",
        "jobStatus": 1
    }
);
mock.onGet(/\/workDetail\/DUMMY-SITE2\/TE4CJVHTTE2U43JZUUSHGG/).reply(200, 
    {
        "actionPlanAttachedFile": [],
        "actionPlanClassType": "Job",
        "actionPlanCost": 21999,
        "actionPlanCost.pfx": "円",
        "actionPlanCreatedAt": "2024-07-29T07:44:00Z",
        "actionPlanCreatedBy": "user:1252976885210548025",
        "actionPlanDetails": "registerTest11",
        "actionPlanEndDaytime": "2024-08-06T15:00:00Z",
        "actionPlanId": "TE4CJVHTTE2U43JZUUSHGG",
        "actionPlanItems": [
            {
                // item details here
            },
            {
                // item details here
            },
            {
                // item details here
            },
            {
                // item details here
            },
            {
                // item details here
            }
        ],
        "actionPlanMessages": [],
        "actionPlanObjectId": [
            "user:1252976885210548025",
            "organization:A8AMS9KP3D0Q97X6KC9FWQQPQC"
        ],
        "actionPlanParentId": "",
        "actionPlanPriority": "Low",
        "actionPlanRelatedEvent": [
            "meFTxk5MQ0uutDERwhL7AQ",
            "emA4Bet3RjGwG6XrFqweXA"
        ],
        "actionPlanRelatedObject": [
            "site:DUMMY-SITE2",
            "equipment:vAdwa1zKTnaKZBsTiI3-FQ",
            "equipment:DZhZbOhxS1muGcjJeMi8SQ"
        ],
        "actionPlanRequestBy": "user:1252976885210548025",
        "actionPlanSiteCode": "DUMMY-SITE2",
        "actionPlanStartDaytime": "2024-07-28T15:00:00Z",
        "actionPlanTags": {
            "jobCycle": 5,
            "contractVendor": "vendorTest2",
            "jobCycleNumber": 5,
            "jobTotalStatus": 10
        },
        "actionPlanTitle": "registerTest1",
        "actionPlanUpdatedAt": "2024-08-07T05:14:33Z",
        "actionPlanUpdatedBy": "user:1252976885210548025",
        "actionPlanWatchers": [],
        "jobConcernId": "",
        "jobConcernInstanceId": "",
        "jobMemo": "memo5",
        "jobStatus": 2
    }
);
mock.onGet(/\/workDetail\/DUMMY-SITE2\/9UAO9W5-QXEU5-WMPCN4FA/).reply(200, 
    {
        "actionPlanAttachedFile": [],
        "actionPlanClassType": "Job",
        "actionPlanCost": 50000,
        "actionPlanCost.pfx": "円",
        "actionPlanCreatedAt": "2024-08-07T01:14:57Z",
        "actionPlanCreatedBy": "user:1252976885210548025",
        "actionPlanDetails": "detail11",
        "actionPlanEndDaytime": "",
        "actionPlanId": "9UAO9W5-QXEU5-WMPCN4FA",
        "actionPlanItems": [
            // item details here
        ],
        "actionPlanMessages": [],
        "actionPlanObjectId": [
            "user:1252976885210548025"
        ],
        "actionPlanParentId": "",
        "actionPlanPriority": "Normal",
        "actionPlanRelatedEvent": [],
        "actionPlanRelatedObject": [
            "equipment:DZhZbOhxS1muGcjJeMi8SQ"
        ],
        "actionPlanRequestBy": "user:1252976885210548025",
        "actionPlanSiteCode": "DUMMY-SITE2",
        "actionPlanStartDaytime": "2024-08-06T15:00:00Z",
        "actionPlanTags": {
            "contractVendor": "vendor001"
        },
        "actionPlanTitle": "Dummy-親なし",
        "actionPlanUpdatedAt": "2024-08-07T04:17:31Z",
        "actionPlanUpdatedBy": "user:1252976885210548025",
        "actionPlanWatchers": [],
        "jobConcernId": "",
        "jobConcernInstanceId": "",
        "jobMemo": "workMemo1",
        "jobStatus": 2
    }
);
mock.onGet(/\/workDetail\/DUMMY-SITE2\/ACSWSNUWSQYNZQ_U3QM4YG/).reply(200, 
    {
        "actionPlanAttachedFile": [
            // file details here
        ],
        "actionPlanClassType": "Job",
        "actionPlanCost": 3333,
        "actionPlanCost.pfx": "円",
        "actionPlanCreatedAt": "2024-07-31T04:56:55Z",
        "actionPlanCreatedBy": "user:1252976885210548025",
        "actionPlanDetails": "pri",
        "actionPlanEndDaytime": "2024-08-06T15:00:00Z",
        "actionPlanId": "ACSWSNUWSQYNZQ_U3QM4YG",
        "actionPlanItems": [
            // item details here
        ],
        "actionPlanMessages": [],
        "actionPlanObjectId": [
            "user:1252976885210548025"
        ],
        "actionPlanParentId": "95SOF06SRJMHATPMNS0M_W",
        "actionPlanPriority": "Immediate",
        "actionPlanRelatedEvent": [],
        "actionPlanRelatedObject": [
            "equipment:DZhZbOhxS1muGcjJeMi8SQ"
        ],
        "actionPlanRequestBy": "user:1252976885210548025",
        "actionPlanSiteCode": "DUMMY-SITE2",
        "actionPlanStartDaytime": "2024-07-30T15:00:00Z",
        "actionPlanTags": {},
        "actionPlanTitle": "PriorityTest1",
        "actionPlanUpdatedAt": "2024-08-07T04:11:04Z",
        "actionPlanUpdatedBy": "user:1252976885210548025",
        "actionPlanWatchers": [],
        "jobConcernId": "",
        "jobConcernInstanceId": "",
        "jobMemo": "isogi",
        "jobStatus": 1
    }
);
mock.onGet(/\/workDetail\/DUMMY-SITE2\/LHPKY2-LSV-PGRYYBXOSYQ/).reply(200, 
    {
        "actionPlanAttachedFile": [],
        "actionPlanClassType": "Job",
        "actionPlanCost": 4400,
        "actionPlanCost.pfx": "円",
        "actionPlanCreatedAt": "2024-08-07T06:21:19Z",
        "actionPlanCreatedBy": "user:1252976885210548025",
        "actionPlanDetails": "actionItemTest11",
        "actionPlanEndDaytime": "2024-08-29T15:00:00Z",
        "actionPlanId": "LHPKY2-LSV-PGRYYBXOSYQ",
        "actionPlanItems": [
            // item details here
        ],
        "actionPlanMessages": [],
        "actionPlanObjectId": [
            "user:1252976885210548025"
        ],
        "actionPlanParentId": "WCVZ4KCRTQKKIACPKKI7TQ",
        "actionPlanPriority": "Normal",
        "actionPlanRelatedEvent": [],
        "actionPlanRelatedObject": [
            "equipment:DZhZbOhxS1muGcjJeMi8SQ"
        ],
        "actionPlanRequestBy": "user:1252976885210548025",
        "actionPlanSiteCode": "DUMMY-SITE2",
        "actionPlanStartDaytime": "2024-08-08T15:00:00Z",
        "actionPlanTags": {},
        "actionPlanTitle": "actionItemTest1",
        "actionPlanUpdatedAt": "2024-08-07T06:21:19Z",
        "actionPlanUpdatedBy": "user:1252976885210548025",
        "actionPlanWatchers": [],
        "jobConcernId": "",
        "jobConcernInstanceId": "",
        "jobMemo": "memotest",
        "jobStatus": 1
    }
);
mock.onGet(/\/workDetail\/DUMMY-SITE2\/ABBCCC/).reply(200, 
    {
        "actionPlanAttachedFile": [],
        "actionPlanClassType": "Job",
        "actionPlanCost": 4400,
        "actionPlanCost.pfx": "円",
        "actionPlanCreatedAt": "2024-08-07T06:21:19Z",
        "actionPlanCreatedBy": "user:1252976885210548025",
        "actionPlanDetails": "actionItemTest11",
        "actionPlanEndDaytime": "2024-08-29T15:00:00Z",
        "actionPlanId": "ABBCCC",
        "actionPlanItems": [
            // item details here
        ],
        "actionPlanMessages": [],
        "actionPlanObjectId": [
            "user:1252976885210548025"
        ],
        "actionPlanParentId": "WCVZ4KCRTQKKIACPKKI7TQ",
        "actionPlanPriority": "Normal",
        "actionPlanRelatedEvent": [],
        "actionPlanRelatedObject": [
            "user:no equip",
            // parentSevenLengthCheck
            "equipment:parentSevenLengthCheck",
        ],
        "actionPlanRequestBy": "user:1252976885210548025",
        "actionPlanSiteCode": "DUMMY-SITE2",
        "actionPlanStartDaytime": "2024-08-08T15:00:00Z",
        "actionPlanTags": {},
        "actionPlanTitle": "actionItemTest1",
        "actionPlanUpdatedAt": "2024-08-07T06:21:19Z",
        "actionPlanUpdatedBy": "user:1252976885210548025",
        "actionPlanWatchers": [],
        "jobConcernId": "",
        "jobConcernInstanceId": "",
        "jobMemo": "memotest",
        "jobStatus": 1
    }
);

// Mocking the API

// searchAssetID
mock.onGet(/\/searchAssetID\/DZhZbOhxS1muGcjJeMi8SQ/).reply(200, 
    {
        "DZhZbOhxS1muGcjJeMi8SQ": {
            asEquipmentClassType: "Equipment",
            asEquipmentCreatedAt: "2024-03-22T07:01:12Z",
            asEquipmentCreatedBy: "user:1192788431525121753",
            asEquipmentInstallDate: "2023-06-10T00:00:00.000Z",
            asEquipmentLocation: "01DUMMY",
            asEquipmentManufacturer: "東芝",
            asEquipmentModelNumber: "A0123455",
            asEquipmentProductName: "TEST4",
            asEquipmentReference: ['01DUM01DUM01-AAA04'],
            asEquipmentSerialNumber: "AAAA123455",
            asEquipmentSiteCode: "DUMMY-SITE2",
            asEquipmentSpareParts: [
                'gyh-E4oGTT-W0v27Wn5tgw',
                'QQ8BarigRtS6pbY3KkqPFQ',
                'asXJzUAaSrS873a4l8D-og',
                'OMMlyOazQJSbWm7cl_HBIQ',
                'DxXGYmj1RRGpx3N_531oxw',
                'twIEXZWeS8a9SvFht6NssA'
            ],
            asEquipmentTags: {
                assetNo: 'SJISAN-12345',
                contactWay: '123-4567',
                equipmentType: 'その他',
                exchangeCycle: '3',
                exchangeCycleUnit: '年',
                fileName: '',
                madeDate: null,
                parentEquipmentId: "01DUMMY-EQU",
                retailer: 'サプライヤー',
                runningStartDate: null,
                usefulTime: '3'
            },
            asEquipmentUniqueIdentifier: "DZhZbOhxS1muGcjJeMi8SQ",
            asEquipmentUpdatedAt: "2024-03-27T03:06:33Z",
            asEquipmentUpdatedBy: "user:1192788229015736017"
        }
    }
);
mock.onGet(/\/searchAssetID\/vAdwa1zKTnaKZBsTiI3-FQ/).reply(200, 
    {
        "vAdwa1zKTnaKZBsTiI3-FQ":{
            asEquipmentClassType: "Equipment",
            asEquipmentCreatedAt: "2024-03-22T06:58:33Z",
            asEquipmentCreatedBy:"user:1192788431525121753",
            asEquipmentInstallDate:"2024-03-22T00:00:00.000Z",
            asEquipmentLocation: "01DUMMY",
            asEquipmentManufacturer: "東芝",
            asEquipmentModelNumber: "A012345",
            asEquipmentProductName: "TEST2",
            asEquipmentReference: ['01DUM01DUM01-AAA03'],
            asEquipmentSerialNumber: "AAAA12345",
            asEquipmentSiteCode: "DUMMY-SITE2",
            asEquipmentSpareParts: (3) ['PwZpPiiiRtu_K1_vDH-Hjw', '_K3VkG7jTROIVwo-9wIz6A', 'mzlctPU9Qy6ScVY4yGBFwg'],
            asEquipmentTags: {
                assetNo: 'SJISAN-12345', 
                fileName: '', 
                madeDate: null, 
                retailer: 'サプライヤー', 
                parentEquipmentId: "01DUMMY-EQU"
            },
            asEquipmentUniqueIdentifier: "vAdwa1zKTnaKZBsTiI3-FQ",
            asEquipmentUpdatedAt: "2024-03-22T12:05:46Z",
            asEquipmentUpdatedBy: "user:1192788431525121753",
        }
    }
);
mock.onGet(/\/searchAssetID\/parentSevenLengthCheck/).reply(200, 
    {
        "parentSevenLengthCheck":{
            asEquipmentClassType: "Equipment",
            asEquipmentCreatedAt: "2024-03-22T06:58:33Z",
            asEquipmentCreatedBy:"user:1192788431525121753",
            asEquipmentInstallDate:"2024-03-22T00:00:00.000Z",
            asEquipmentLocation: "01DUMMY",
            asEquipmentManufacturer: "東芝",
            asEquipmentModelNumber: "A012345",
            asEquipmentProductName: "TEST2",
            asEquipmentReference: ['01DUM01DUM01'],
            asEquipmentSerialNumber: "AAAA12345",
            asEquipmentSiteCode: "DUMMY-SITE2",
            asEquipmentSpareParts: (3) ['PwZpPiiiRtu_K1_vDH-Hjw', '_K3VkG7jTROIVwo-9wIz6A', 'mzlctPU9Qy6ScVY4yGBFwg'],
            asEquipmentTags: {
                assetNo: 'SJISAN-12345', 
                fileName: '', 
                madeDate: null, 
                retailer: 'サプライヤー', 
                parentEquipmentId: "01DUMMY-EQU"
            },
            asEquipmentUniqueIdentifier: "parentSevenLengthCheck",
            asEquipmentUpdatedAt: "2024-03-22T12:05:46Z",
            asEquipmentUpdatedBy: "user:1192788431525121753",
        }
    }
);

// getRDS
mock.onGet(/\/getRDS\/DUMMY-SITE2\/01DUM01DUM01-AAA03/).reply(200, 
    {
        "01DUM01DUM01-AAA03":{
            rdsClassType: "Rds",
            rdsCreatedAt: "2024-03-22T06:58:33Z",
            rdsCreatedBy: "user:1192788431525121753",
            rdsName: "TEST2",
            rdsParentReferenceDesignation: "01DUM01DUM01",
            rdsReferenceDesignation: "01DUM01DUM01-AAA03",
            rdsSiteCode: "DUMMY-SITE2",
            rdsTags: null,
            rdsUpdatedAt: "2024-03-22T06:58:33Z",
            rdsUpdatedBy: "user:1192788431525121753",
        }
    }
);
mock.onGet(/\/getRDS\/DUMMY-SITE2\/01DUM01DUM01-AAA04/).reply(200, 
    {
        "01DUM01DUM01-AAA04":{
            rdsClassType: "Rds",
            rdsCreatedAt: "2024-03-22T06:59:47Z",
            rdsCreatedBy: "user:1192788431525121753",
            rdsName: "TEST",
            rdsParentReferenceDesignation: "01DUM01DUM01",
            rdsReferenceDesignation: "01DUM01DUM01-AAA04",
            rdsSiteCode: "DUMMY-SITE2",
            rdsTags: null,
            rdsUpdatedAt: "2024-03-22T06:59:47Z",
            rdsUpdatedBy: "user:1192788431525121753",
        }
    }
);
mock.onGet(/\/getRDS\/DUMMY-SITE2\/01DUM01DUM01/).reply(200, 
    {
        "01DUM01DUM01":{
            rdsClassType: "Rds",
            rdsCreatedAt: "2024-03-22T05:16:46Z",
            rdsCreatedBy: "user:1192788431525121753",
            rdsName: "01DUMMY-EQU",
            rdsNameReading: [],
            rdsParentReferenceDesignation: "01DUM01",
            rdsReferenceDesignation: "01DUM01DUM01",
            rdsSiteCode: "DUMMY-SITE2",
            rdsTags: {},
            rdsUpdatedAt: "2024-03-22T05:16:46Z",
            rdsUpdatedBy: "user:1192788431525121753",
        }
    }
);
mock.onGet(/\/getRDS\/DUMMY-SITE2\/01DUM01/).reply(200, 
    {
        "01DUM01":{
            rdsClassType: "Rds",
            rdsCreatedAt: "2024-03-22T05:15:47Z",
            rdsCreatedBy: "user:1192788431525121753",
            rdsName: "01DUMMY",
            rdsNameReading: [],
            rdsParentReferenceDesignation: "01",
            rdsReferenceDesignation: "01DUM01",
            rdsSiteCode: "DUMMY-SITE2",
            rdsTags: {},
            rdsUpdatedAt: "2024-03-22T05:15:47Z",
            rdsUpdatedBy: "user:1192788431525121753",
        }
    }
);

const apis = {
    getSite: async (misc, siteCode) => {
        try {
            const response = await axios.get(`/site/${siteCode}`);
            return response;
        } catch (error) {
            console.error(`Failed to get site data: ${error.message}`);
            return null;
        }
    },
    getWorkListBySiteCode: async (misc, siteCode) => {
        try {
            const response = await axios.get(`/workList/${siteCode}`);
            return response;
        } catch (error) {
            console.error(`Failed to get work list: ${error.message}`);
            return null; 
        }
    },
    getWorkDetails: async (misc, siteCode, actionPlanId) => {
        try {
            const response = await axios.get(`/workDetail/${siteCode}/${actionPlanId}`);
            return response;
        } catch (error) {
            console.error(`Failed to get work details: ${error.message}`);
            return null;
        }
    },
    searchAssetID: async (misc, equipmentId) => {
        try {
            const response = await axios.get(`/searchAssetID/${equipmentId}`);
            return response;
        } catch (error) {
            console.error(`Failed to get work searchAssetID: ${error.message}`);
            return null;
        }
    },
    getRDS: async (misc, siteCode, filterParam) => {
        try {
            const prefix = "rdsReferenceDesignation=";
            const prefixLength = prefix.length;
            let filter = filterParam.filter.substring(filterParam.filter.indexOf(prefix) + prefixLength);
            const response = await axios.get(`/getRDS/${siteCode}/${filter}`);
            return response;
        } catch (error) {
            console.error(`Failed to get work getRDS: ${error.message}`);
            return null;
        }
    },
};

module.exports = apis;
