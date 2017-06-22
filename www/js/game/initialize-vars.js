var currentLevel = 0;

var params = {};

var mission_pack_1 = {
    "l0":{
       "maxBlocks":3,
       "stage":"stage_0.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x466/a13c94a9b73dd793105246a02ab4316a/Stage_1.png",
       "blocksAvailable": 1
    },
    "l1":{
       "maxBlocks":5,
       "stage":"stage_1.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/941x1006/6f6f448bf59df52cf87164dc1de9cc63/Level2.png",
       "blocksAvailable": 3
    },
    "l2":{
       "maxBlocks":4,
       "stage":"stage_2.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x646/8d41cf95559576465939e7be379ce3d0/Level_3.png",
       "blocksAvailable": 3
    },
    "l3":{
       "maxBlocks":12,
       "stage":"stage_3.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x646/01b8a16547298574363a0587624fc27f/Level_4.png",
       "blocksAvailable": 15
    },
    "l4":{
       "maxBlocks":5,
       "stage":"stage_4.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x646/5aa9cc8b320dc96719663419b7d3cb1a/Nivel_5.png",
       "blocksAvailable": 15
    },
    "l5":{
       "maxBlocks":3,
       "stage":"stage_5.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x647/02af8dc11a0c771614ad3474e4cea20c/Nivel_6.png",
       "blocksAvailable": 31
    },
    "l6":{
       "maxBlocks":5,
       "stage":"stage_6.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x647/c71efe2aef0c0db16f7d708cdc234570/Nivel_7.png",
       "blocksAvailable":31
    },
    "l7":{
       "maxBlocks":15,
       "stage":"stage_7.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x647/9688a48e2d6834fcec52e1ece5d3d087/lEVEL_8.png",
       "blocksAvailable": 31
    },    
    "l8":{
       "maxBlocks":5,
       "stage":"stage_8.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x647/b7f664a89a91c867b2e60c6a01b397d2/Level_9.png",
       "blocksAvailable": 31
    },    
    "l9":{
       "maxBlocks":6,
       "stage":"stage_9.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x647/65705458f2c29fdcebf243f078307c24/Level_10.png",
       "blocksAvailable": 63
    }
};

var mission_pack_2 = {
    "l0":{
       "maxBlocks":10,
       "stage":"stage_10.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/482af55ad7a4f17f53a5b89b3a6f9871/g12872.png",
       "blocksAvailable": 63
    },
    "l1":{
       "maxBlocks":3,
       "stage":"stage_11.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/26f0fd719dcb08546a8cbff90f9d9086/g12739.png",
       "blocksAvailable": 63
    },
    "l2":{
       "maxBlocks":11,
       "stage":"stage_12.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/fb4fa2f1b60255f9901e3432177c867d/g12606.png",
       "blocksAvailable": 63
    },
    "l3":{
       "maxBlocks":11,
       "stage":"stage_13.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/a5da090a83997b15e91cb9b0b4390bc5/g12467.png",
       "blocksAvailable": 63
    },
    "l4":{
       "maxBlocks":8,
       "stage":"stage_14.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/bee74734fdc7c831d2dec705b361f956/g12304.png",
       "blocksAvailable": 63
    },
    "l5":{
       "maxBlocks":12,
       "stage":"stage_15.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/d68d574f2e028b951d210e2792f75536/g12171.png",
       "blocksAvailable": 63
    },
    "l6":{
       "maxBlocks":11,
       "stage":"stage_16.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/e5e93283fc339fc755e319c417dd8c5c/g12044.png",
       "blocksAvailable": 63
    },
    "l7":{
       "maxBlocks":11,
       "stage":"stage_17.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/f500fd3c54376ccf8530e6df2d75339b/g11911.png",
       "blocksAvailable": 63
    },
    "l8":{
       "maxBlocks":8,
       "stage":"stage_18.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/f0f0d4b7151fe189f336af140cd6ff9d/g11766.png",
       "blocksAvailable": 63
    },
    "l9":{
       "maxBlocks":11,
       "stage":"stage_19.json",
       "imgSrc":"https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/382f3d6ec21187d31499ca48088ca885/g11627.png",
       "blocksAvailable": 63
    }
};

var a = {
    l0: false,
    l1: true,
    l2: true,
    l3: true,
    l4: true,
    l5: true,
    l6: true,
    l7: true,
    l8: true,
    l9: true,
    l10: true,
    l11: true,
    l12: true,
    l13: true,
    l14: true,
    l15: true,
    l16: true,
    l17: true,
    l18: true,
    l19: true
};

localStorage.setItem('locked', JSON.stringify(a));

_locked = JSON.parse(localStorage.getItem('locked'));
//Read the json file levels


var _maxBlocks;
var currentStage;

currentLevel = params.current_level || params.level || 0;
_maxBlocks = level_config["l" + currentLevel].maxBlocks;
currentStage = 'assets/tiled/maps/' + level_config["l" + currentLevel].stage;

for (var i = 0; i <= currentLevel; i++) {
    _locked['l' + i] = false;
}

