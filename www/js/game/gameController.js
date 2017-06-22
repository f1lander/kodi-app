app.controller('GameController', function ($scope, $ocLazyLoad, $rootScope, $stateParams, $ionicPopup, $state, $ionicHistory) {
$scope.$on('$ionicView.afterLeave', function(){
    music = null;
    $scope.game.destroy();
  });
    $scope.progress = $stateParams.progress ? JSON.parse($stateParams.progress) :
        JSON.parse(localStorage.getItem('progress'));

    var _token = JSON.parse(localStorage.getItem('token'));
    $scope.showAlertLose = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Perdiste',
            template: "<img style='width:200px;height:200px;margin-left: auto; margin-right: auto; ' class='fullscreen-image' src='assets/messages/lose.png'/>"
        });
    };

    $scope.showAlertWin = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Ganaste',
            template: 'Felicidades! haz completado este nivel'
        }).then(function (params) {
            
        })
        
       
    };
    
    var currentLevel = 0;
    var params = {};
    var tiledResources;
    var _maxBlocks;
    var currentStage;
    
    var setsMissions = {
        "mission_pack_0":
        {
            "tiled_resources": {
                "background": "assets/tiled/tilesets/background_training_room.png",
                "goal": "assets/tiled/tilesets/goal_marker.png",
                "tiles": "assets/tiled/tilesets/tile.png",
                "spawn": "assets/tiled/tilesets/start_tile.png",
                "floor_id": 41,
                "goal_id": 48,
                "spawn_id": 42
            },
            "l0": {
                "maxBlocks": 3,
                "stage": "stage_0.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x466/a13c94a9b73dd793105246a02ab4316a/Stage_1.png",
                "blocksAvailable": 1
            },
            "l1": {
                "maxBlocks": 5,
                "stage": "stage_1.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/941x1006/6f6f448bf59df52cf87164dc1de9cc63/Level2.png",
                "blocksAvailable": 3
            },
            "l2": {
                "maxBlocks": 4,
                "stage": "stage_2.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x646/8d41cf95559576465939e7be379ce3d0/Level_3.png",
                "blocksAvailable": 3
            },
            "l3": {
                "maxBlocks": 12,
                "stage": "stage_3.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x646/01b8a16547298574363a0587624fc27f/Level_4.png",
                "blocksAvailable": 15
            },
            "l4": {
                "maxBlocks": 5,
                "stage": "stage_4.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x646/5aa9cc8b320dc96719663419b7d3cb1a/Nivel_5.png",
                "blocksAvailable": 15
            },
            "l5": {
                "maxBlocks": 3,
                "stage": "stage_5.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x647/02af8dc11a0c771614ad3474e4cea20c/Nivel_6.png",
                "blocksAvailable": 31
            },
            "l6": {
                "maxBlocks": 5,
                "stage": "stage_6.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x647/c71efe2aef0c0db16f7d708cdc234570/Nivel_7.png",
                "blocksAvailable": 31
            },
            "l7": {
                "maxBlocks": 15,
                "stage": "stage_7.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x647/9688a48e2d6834fcec52e1ece5d3d087/lEVEL_8.png",
                "blocksAvailable": 31
            },
            "l8": {
                "maxBlocks": 5,
                "stage": "stage_8.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x647/b7f664a89a91c867b2e60c6a01b397d2/Level_9.png",
                "blocksAvailable": 31
            },
            "l9": {
                "maxBlocks": 6,
                "stage": "stage_9.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5707e52dd033dcc80ebfbb8e/600x647/65705458f2c29fdcebf243f078307c24/Level_10.png",
                "blocksAvailable": 63
            }
        },

        "mission_pack_1": {
            "tiled_resources": {
                "background": "assets/tiled/tilesets/background_stage.png",
                "goal": "assets/tiled/tilesets/goal_marker.png",
                "tiles": "assets/tiled/tilesets/tiles.png",
                "spawn": "assets/tiled/tilesets/start_tile.png",
                "floor_id": 3,
                "goal_id": 69,
                "spawn_id": 78
            },
            "l0": {
                "maxBlocks": 10,
                "stage": "stage_10.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/482af55ad7a4f17f53a5b89b3a6f9871/g12872.png",
                "blocksAvailable": 63
            },
            "l1": {
                "maxBlocks": 3,
                "stage": "stage_11.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/26f0fd719dcb08546a8cbff90f9d9086/g12739.png",
                "blocksAvailable": 63
            },
            "l2": {
                "maxBlocks": 11,
                "stage": "stage_12.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/fb4fa2f1b60255f9901e3432177c867d/g12606.png",
                "blocksAvailable": 63
            },
            "l3": {
                "maxBlocks": 11,
                "stage": "stage_13.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/a5da090a83997b15e91cb9b0b4390bc5/g12467.png",
                "blocksAvailable": 63
            },
            "l4": {
                "maxBlocks": 8,
                "stage": "stage_14.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/bee74734fdc7c831d2dec705b361f956/g12304.png",
                "blocksAvailable": 63
            },
            "l5": {
                "maxBlocks": 12,
                "stage": "stage_15.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/d68d574f2e028b951d210e2792f75536/g12171.png",
                "blocksAvailable": 63
            },
            "l6": {
                "maxBlocks": 11,
                "stage": "stage_16.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/e5e93283fc339fc755e319c417dd8c5c/g12044.png",
                "blocksAvailable": 63
            },
            "l7": {
                "maxBlocks": 11,
                "stage": "stage_17.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/f500fd3c54376ccf8530e6df2d75339b/g11911.png",
                "blocksAvailable": 63
            },
            "l8": {
                "maxBlocks": 8,
                "stage": "stage_18.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/f0f0d4b7151fe189f336af140cd6ff9d/g11766.png",
                "blocksAvailable": 63
            },
            "l9": {
                "maxBlocks": 11,
                "stage": "stage_19.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/382f3d6ec21187d31499ca48088ca885/g11627.png",
                "blocksAvailable": 63
            }
        }, "mission_pack_2": {
            "tiled_resources": {
                "background": "assets/tiled/tilesets/background_stage.png",
                "goal": "assets/tiled/tilesets/goal_marker.png",
                "tiles": "assets/tiled/tilesets/tiles.png",
                "spawn": "assets/tiled/tilesets/start_tile.png",
                "floor_id": 3,
                "goal_id": 69,
                "spawn_id": 78
            },
            "l0": {
                "maxBlocks": 10,
                "stage": "stage_20.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/482af55ad7a4f17f53a5b89b3a6f9871/g12872.png",
                "blocksAvailable": 63
            },
            "l1": {
                "maxBlocks": 3,
                "stage": "stage_21.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/26f0fd719dcb08546a8cbff90f9d9086/g12739.png",
                "blocksAvailable": 63
            },
            "l2": {
                "maxBlocks": 11,
                "stage": "stage_22.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/fb4fa2f1b60255f9901e3432177c867d/g12606.png",
                "blocksAvailable": 63
            },
            "l3": {
                "maxBlocks": 11,
                "stage": "stage_23.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/a5da090a83997b15e91cb9b0b4390bc5/g12467.png",
                "blocksAvailable": 63
            },
            "l4": {
                "maxBlocks": 8,
                "stage": "stage_24.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/bee74734fdc7c831d2dec705b361f956/g12304.png",
                "blocksAvailable": 63
            },
            "l5": {
                "maxBlocks": 12,
                "stage": "stage_25.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/d68d574f2e028b951d210e2792f75536/g12171.png",
                "blocksAvailable": 63
            },
            "l6": {
                "maxBlocks": 11,
                "stage": "stage_26.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/e5e93283fc339fc755e319c417dd8c5c/g12044.png",
                "blocksAvailable": 63
            },
            "l7": {
                "maxBlocks": 11,
                "stage": "stage_27.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/f500fd3c54376ccf8530e6df2d75339b/g11911.png",
                "blocksAvailable": 63
            },
            "l8": {
                "maxBlocks": 8,
                "stage": "stage_28.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/f0f0d4b7151fe189f336af140cd6ff9d/g11766.png",
                "blocksAvailable": 63
            },
            "l9": {
                "maxBlocks": 11,
                "stage": "stage_29.json",
                "imgSrc": "https://trello-attachments.s3.amazonaws.com/5728f3fb6ef18fda43d345af/600x641/382f3d6ec21187d31499ca48088ca885/g11627.png",
                "blocksAvailable": 63
            }
        }
    }

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

    currentLevel = $scope.progress.level || 0;

    _maxBlocks = setsMissions["mission_pack_" + $scope.progress.mission]["l" + currentLevel].maxBlocks;
    currentStage = 'assets/tiled/maps/' + setsMissions["mission_pack_" + $scope.progress.mission]["l" + currentLevel].stage;
    tiledResources = setsMissions["mission_pack_" + $scope.progress.mission].tiled_resources;
  
    var workspace = Blockly.inject('blocklyDiv',
    {
        toolbox: getToolbox(setsMissions["mission_pack_" + $scope.progress.mission]["l" + currentLevel].blocksAvailable), 
        maxBlocks: _maxBlocks,
        zoom:
            {
                controls: false,
                wheel: false,
                startScale: 0.8,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            },
            trashcan: true 
    });
    function getToolbox(availableBlocks) {
        
        console.log(availableBlocks);
        var toolbox = '<xml id="toolbox" style="display: none;">';
        toolbox += availableBlocks & 1 ? '\n<block type="move_right"></block>' : '';
        toolbox += availableBlocks & 2 ? '\n<block type="move_down"></block>' : '';
        toolbox += availableBlocks & 4 ? '\n<block type="move_left"></block>' : '';
        toolbox += availableBlocks & 8 ? '\n<block type="move_up"></block>' : '';

        toolbox += availableBlocks & 16 ? '\n<block type="move_jump"></block>' : '';
        toolbox += availableBlocks & 32 ? '\n<block type="loop_for"></block>' : '';
        toolbox += availableBlocks & 64 ? '\n<block type="loop_while_not_reached_goal"></block>' : '';
        toolbox += '\n</xml>';
        return toolbox;
    };
    function restartBlockly(availableBlocks) {
        
        $('.blocklySvg').remove();
        workspace = Blockly.inject('blocklyDiv',
        {
            toolbox : getToolbox(availableBlocks),
            maxBlocks:_maxBlocks,
            zoom:
            {
                controls: false,
                wheel: false,
                startScale: 0.8,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            },
            trashcan: true 
        });
    };
    $scope.game = new Phaser.Game(512, 512, Phaser.AUTO, 'gameAction',
    
    { preload: preload, create: create, update: update, init: init, execute: onButtonExecuteClick, restart: restart });

    //Types of actions we can find in the executionQueue
    var TAKE_OFF = -111;
    var LANDING = -222;
    var MOVE_RIGHT = 0;
    var MOVE_LEFT = 111;
    var MOVE_UP = 222;
    var MOVE_DOWN = 333;
    var CHECK_IF_WON = 444;
    var MOVE_JUMP = 555;
    var TURN = 1;
    var IF_STATEMENT = 2;
    var WHILE_STATEMENT_ENDING = 3;
    var TILE_OFFSET_Y = 15.0;

    var MOVING_SPEED = 64.0;
    var ROTATION_SPEED = 90.0;
    var TILE_SIZE = 64.0;

    var playerSprite;

    var lastTime;
    var gameRunning = false;
    var currentAction = 0;
    var executionQueue = [];

    var goalSprite;
    var _hasReachedGoal;

    var map;
    var mazeGroup;
    var spawnPoint;
    var goal;

    var currentAnimation;
    var music;

    var globalContext = this;

    var blockId;
    var current_music_pack = "music_pack" + $scope.progress.mission;

    function init() {
        $scope.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        $scope.game.scale.pageAlignHorizontally = true;
        $scope.game.scale.pageAlignVertically = true;
    }
    
    function preload() {
        $scope.game.load.spritesheet('player', 'assets/robo_joh.png', 128, 128);

        $scope.game.load.tilemap('map', currentStage, null, Phaser.Tilemap.TILED_JSON);

        //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:
        $scope.game.load.image('background', tiledResources.background);
        $scope.game.load.spritesheet('tiles', tiledResources.tiles, 64, 64);
        $scope.game.load.spritesheet('goal', tiledResources.goal, 64, 64);
        $scope.game.load.spritesheet('spawn', tiledResources.spawn, 64, 64)

        //  Firefox doesn't support mp3 files, so use ogg
        $scope.game.load.audio('music_pack1', ['assets/audio/music_pack2.ogg']);
        $scope.game.load.audio('music_pack0', ['assets/audio/music_pack1.ogg']);
        $scope.game.load.audio('music_pack2', ['assets/audio/music_pack3.ogg']);

    }
    
    function playLevelMusic() {
        music.play("", 0, 1, true);
    }
    
    function create() {
        if(!music){
            music = $scope.game.add.audio(current_music_pack);
            music.play("", 0, 1, true);
            music.onLoop.add(playLevelMusic, this);
        }
        $scope.game.physics.startSystem(Phaser.Physics.ARCADE);
        map = $scope.game.add.tilemap('map');

        map.addTilesetImage('tiles', 'tiles');
        map.addTilesetImage('background', 'background');
        map.addTilesetImage('goal', 'goal');
        map.addTilesetImage('spawn', 'spawn')

        //  Creates a layer from the World1 layer in the map data.
        //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
        var layer = map.createLayer('Background');
        layer.resizeWorld();

        /**
         * We know that there will be only one spawn point and one goal, so we use this fact to
         * build the maze and get the correct spawn and goal points, they need to be created in this order
         * goal -> spawnPoint -> maze 
         */
        mazeGroup = $scope.game.add.group();
        mazeGroup.enableBody = true;

        map.createFromObjects('Objects', tiledResources.floor_id, 'tiles', 2, true, false, mazeGroup);

        var spawnGroup = $scope.game.add.group();
        map.createFromObjects('Objects', tiledResources.spawn_id, 'spawn', 0, true, false, spawnGroup);
        spawnPoint = spawnGroup.children[0];
        spawnPoint.animations.add('idle', [0, 1, 2, 3, 4], 5, true);
        spawnPoint.animations.play('idle');
        
        var goalGroup = $scope.game.add.group();
        goalGroup.enableBody = true;

        map.createFromObjects('Objects', tiledResources.goal_id, 'goal', 0, true, false, goalGroup);
        goal = goalGroup.children[0];
        goal.y -= 15; //TODO: Quick fix for the goal appearing too near the edge of the block
        goal.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        goal.animations.play('idle');

        playerSprite = $scope.game.add.sprite(spawnPoint.x - spawnPoint.width / 2,
            spawnPoint.y - spawnPoint.height / 2 - TILE_OFFSET_Y,
            'player', 1);

        var animation = playerSprite.animations.add('take_off', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 8, false);
        animation.onComplete.add(function () {
            currentAction++;
            playerSprite.animations.stop();
            currentAnimation = undefined;
        });

        animation = playerSprite.animations.add('land', [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 1], 8, false);
        animation.onComplete.add(function () {
            currentAction++;
            playerSprite.animations.stop();
            currentAnimation = undefined;
            if (!isRoboOnTile()) {
                //Not touching the maze, the player lost the $scope.game
                $scope.gameRunning = false;
                //bootbox.alert("<h1>Perdiste</h1><img class='img-responsive center-block' src='/assets/messages/lose.png'/>", loseCallback);
                $scope.showAlertLose();
                $scope.gameRunning = false;
            }
            $scope.game.physics.arcade.overlap(playerSprite, goal, onReachedGoalHandler, null, globalContext);
        });

        playerSprite.animations.add('move_up', [13, 14], 10, true);
        playerSprite.animations.add('move_down', [29, 30], 10, true);

        playerSprite.animations.add('move_right', [33, 34, 35], 10, true);
        playerSprite.animations.add('stop_right', [36, 37, 38, 39, 40], 10, true);

        playerSprite.animations.add('move_left', [49, 50, 51], 10, true);
        playerSprite.animations.add('stop_left', [52, 53, 54, 55, 56], 10, true);

        playerSprite.animations.add('idle', [65, 66], 5, true);

        playerSprite.animations.play('idle');

        $scope.game.physics.arcade.enable(playerSprite);
        playerSprite.body.allowGravity = false;
    }

    function onButtonExecuteClick() {
        executionQueue = [];
        currentAction = 0;
        _hasReachedGoal = false;
        $scope.gameRunning = true;

        playerSprite.x = spawnPoint.x - spawnPoint.width / 2;
        playerSprite.y = spawnPoint.y - spawnPoint.height / 2 - TILE_OFFSET_Y;

        Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
        Blockly.JavaScript.addReservedWords('highlightBlock');
        var code = Blockly.JavaScript.workspaceToCode(workspace) + "\n" + "checkIfWon();";
        eval(code);
    }

    function highlightBlock(id) {
        blockId = id;
    }

    function restart() {
        executionQueue = [];
        currentAction = 0;
        _hasReachedGoal = false;
        $scope.gameRunning = false;
        playerSprite.x = spawnPoint.x - spawnPoint.width / 2;
        playerSprite.y = spawnPoint.y - spawnPoint.height / 2 - TILE_OFFSET_Y;
    }

    function isRoboOnTile() {
        var playerX = playerSprite.x + playerSprite.width / 2;
        var playerY = playerSprite.y + playerSprite.height / 2 + TILE_OFFSET_Y;

        for (var i = 0; i < mazeGroup.children.length; i++) {
            var tile = mazeGroup.children[i];

            var tileLowerBoundX = tile.x;
            var tileLowerBoundY = tile.y;
            var tileUpperBoundX = tile.x + tile.width;
            var tileUpperBoundY = tile.y + tile.height;
            if (playerX >= tileLowerBoundX && playerY >= tileLowerBoundY && playerX < tileUpperBoundX && playerY < tileUpperBoundY)
                return true;
        }
        return false;
    }

    function loseCallback() {
        restart();
    }

    function update() {
        if ($scope.gameRunning) {

            var current = executionQueue[currentAction];

            if (current) {


                var deltaTime = ($scope.game.time.now - lastTime) / 1000;
                if (current.type === MOVE_RIGHT || current.type === MOVE_LEFT || current.type === MOVE_DOWN || current.type === MOVE_UP) {
                    if (current.toMove <= 0) {
                        current.toMove = TILE_SIZE;
                        currentAction++;
                        playerSprite.animations.stop();
                    } else {

                        var toMoveThisFrame = MOVING_SPEED * deltaTime;
                        //We are about to start to move
                        var animName;
                        var startAnimation = current.toMove == TILE_SIZE;

                        current.toMove -= toMoveThisFrame;

                        if (current.type == MOVE_DOWN) {
                            animName = "move_down";
                            playerSprite.y += toMoveThisFrame;
                        } else if (current.type == MOVE_UP) {
                            animName = "move_up";
                            playerSprite.y -= toMoveThisFrame;
                        } else if (current.type == MOVE_LEFT) {
                            animName = "move_left";
                            playerSprite.x -= toMoveThisFrame;
                        } else if (current.type == MOVE_RIGHT) {
                            animName = "move_right";
                            playerSprite.x += toMoveThisFrame;
                        }

                        if (startAnimation) {
                            playerSprite.animations.play(animName);
                        }
                    }
                } else if (current.type === MOVE_JUMP) {
                    var deltaTime = ($scope.game.time.now - lastTime) / 1000;

                    if (current.toMove <= 0) {
                        current.toMove = TILE_SIZE * 2;
                        currentAction++;
                        playerSprite.animations.stop();
                    } else {

                        // if (current.toMove === TILE_SIZE * 2) {
                        //     playerSprite.animations.play('jump');    
                        // }

                        var animName;
                        var startAnimation = current.toMove == TILE_SIZE * 2;

                        var toMoveThisFrame = MOVING_SPEED * deltaTime;

                        current.toMove -= toMoveThisFrame;

                        if (current.direction === "DOWN") {
                            animName = "move_down";
                            playerSprite.y += toMoveThisFrame;
                        } else if (current.direction === "UP") {
                            animName = "move_up";
                            playerSprite.y -= toMoveThisFrame;
                        } else if (current.direction === "LEFT") {
                            animName = "move_left";
                            playerSprite.x -= toMoveThisFrame;
                        } else if (current.direction === "RIGHT") {
                            animName = "move_right";
                            playerSprite.x += toMoveThisFrame;
                        }

                        if (startAnimation) playerSprite.animations.play(animName);
                    }
                } else if (current.type === CHECK_IF_WON) {
                    console.log("Checking if won");
                    if (!_hasReachedGoal) {
                        //bootbox.alert("<h1>Perdiste</h1><img class='img-responsive center-block' src='/assets/messages/lose.png'/>", loseCallback);
                        $scope.showAlertLose();
                        $scope.gameRunning = false;
                    }
                } else if (current.type === TURN) {
                    console.log('turning');
                    var rotateThisFrame = ROTATION_SPEED * deltaTime;
                    if (current.toRotate <= 0) {

                        if (current.direction === 'izquierda') {
                            playerSprite.facing -= 1;
                            if (playerSprite.facing < 0)
                                playerSprite.facing += 4;
                        } else if (current.direction === 'derecha') {
                            playerSprite.facing = ++playerSprite.facing % 4;
                        }

                        current.toRotate = 45.0;
                        currentAction++;
                    } else {
                        current.toRotate -= rotateThisFrame;
                    }
                } else if (current.type === IF_STATEMENT) {
                    if (current.condition) {
                        currentAction++;
                    } else {
                        currentAction = current.ending + 1;
                    }
                } else if (current.type === WHILE_STATEMENT_ENDING) {
                    currentAction = current.ifStatement;
                } else if (current.type === TAKE_OFF) {
                    if (!currentAnimation) {
                        workspace.highlightBlock(current.blockId);
                        currentAnimation = playerSprite.animations.play('take_off');
                    }
                } else if (current.type === LANDING) {
                    if (!currentAnimation) {
                        currentAnimation = playerSprite.animations.play('land');
                    }
                }
            }
        }
        lastTime = $scope.game.time.now;
    }

    function onMazeCollisionHandler(player, tile) {
        /*var current = executionQueue[currentAction];
        if (current.type === MOVE_JUMP)return;
        
        var playerHalfX = player.x + player.width / 2;
        var playerHalfY = player.y + player.height / 2;
        
        var boundOffsetX = bound.width / 2.5;
        var boundOffsetY = bound.height / 2.5;
        
        if (playerHalfX >= bound.x + boundOffsetX && playerHalfX <= bound.x + bound.width - boundOffsetX &&
             playerHalfY >= bound.y + boundOffsetY && playerHalfY <= bound.y + bound.height - boundOffsetY) {
            $scope.gameRunning = false;
            alert('Perdiste, mi papa');    
            $scope.gameRunning = false;
            //restart();      
        }*/
    }

    function onReachedGoalHandler(player, goal) {

        var current = executionQueue[currentAction];
        if (current.type === MOVE_JUMP) return;

        var playerHalfX = player.x + player.width / 2;
        var playerHalfY = player.y + player.height / 2 + TILE_OFFSET_Y;

        var goalOffsetX = goal.width / 2.5;
        var goalOffsetY = goal.height / 2.5 - 15;

        if (playerHalfX >= goal.x + goalOffsetX && playerHalfX < goal.x + goal.width - goalOffsetX &&
            playerHalfY >= goal.y + goalOffsetY && playerHalfY < goal.y + goal.height - goalOffsetY) {
            _hasReachedGoal = true;
            //bootbox.alert("<h1>Ganaste</h1><img class='img-responsive center-block' src='/assets/messages/win.png'/>", function() {
           var alertPopup = $ionicPopup.alert({
            title: 'Ganaste',
            template: "<img style='width:200px;height:200px;margin-left: auto; margin-right: auto; ' class='fullscreen-image' src='assets/messages/win.png'/>"
        }).then(function (params) {
          
            $scope.gameRunning = false;
            var nextLevel = (parseInt(currentLevel) + 1);


            _locked['l' + nextLevel] = false;
            localStorage.setItem('locked', JSON.stringify(_locked));

            if (currentLevel == 4 || currentLevel == 8 || currentLevel == 9) {
                var achiev = currentLevel == 4 ? 7 : currentLevel == 8 ? 8 : 9;
                $.post("http://kusuk.in/api/v1/achievements/unlock", { achievement_id: achiev, user_email: _token.user_email, user_token: _token.user_token }).done(
                    function (data) {
                        if (data) {
                            alert(data.achievement.name, ': ', data.achievement.description);
                            $.post("http://kusuk.in/api/v1/progress/save", { "course_id": 13, progress: { "current_level": nextLevel }, user_email: _token.user_email, user_token: _token.user_token }).done(
                                function (data) {
                                    if (data) {
                                       currentLevel = nextLevel;
                                        _maxBlocks = setsMissions["mission_pack_" + $scope.progress.mission]["l" + currentLevel].maxBlocks;
                                        currentStage = 'assets/tiled/maps/' + setsMissions["mission_pack_" + $scope.progress.mission]["l" + currentLevel].stage;
                                        localStorage.setItem('progress', JSON.stringify({mission:$scope.progress.mission, level:currentLevel}));
                                        restartBlockly(setsMissions["mission_pack_" + $scope.progress.mission]["l" + currentLevel].blocksAvailable);
                                        $scope.game.state.restart();
                                        //window.location = '/$scope.game.html?level=' + nextLevel;
                                    }
                                }
                            ).fail(function (params) {
                                if (params.status === 401) {
                                    // window.location = '/signin.html'
                                }
                                console.log(params);
                            })
                        }
                    }
                ).fail(function (params) {
                    if (params.status === 401) {
                        // window.location = '/signin.html'
                    }
                    console.log(params);
                })
            } else {
                $.post("http://kusuk.in/api/v1/progress/save",
                    { "course_id": 13, "progress": { "current_level": nextLevel }, "user_email": _token.user_email, "user_token": _token.user_token }).done(
                    function (data) {
                        if (data) {
                            currentLevel = nextLevel;
                            _maxBlocks = setsMissions["mission_pack_" + $scope.progress.mission]["l" + currentLevel].maxBlocks;
                            currentStage = 'assets/tiled/maps/' + setsMissions["mission_pack_" + $scope.progress.mission]["l" + currentLevel].stage;
                            localStorage.setItem('progress', JSON.stringify({mission:$scope.progress.mission, level:currentLevel}));
                            restartBlockly(setsMissions["mission_pack_" + $scope.progress.mission]["l" + currentLevel].blocksAvailable);
                            $scope.game.state.restart();

                        }
                    }
                    ).fail(function (params) {
                        if (params.status === 401) {
                            // window.location = '/signin.html'
                        }
                        console.log(params);
                    })
            }
            });       
        }
    }

    /*
        These functions push the objects to the executionQueue
    */
    function didResolveTheMaze() {
        return this._hasReachedGoal;
    }

    //TODO: We must find a way to pass the condition from the generated code, since we are going to use the 
    //if statement to evalute different cases
    function ifStatement() {
        executionQueue.push(
            {
                type: IF_STATEMENT,
                condition: !_hasReachedGoal
            });
        return executionQueue.length - 1;
    }

    function endingIfStatement(ifStatementIndex) {
        executionQueue.push(
            {
                type: IF_STATEMENT_ENDING,
                ifStatement: ifStatementIndex
            }
        );
        executionQueue[ifStatementIndex].ending = executionQueue.length - 1;
    }

    function endingWhileStatement(ifStatementIndex) {
        executionQueue.push(
            {
                type: WHILE_STATEMENT_ENDING,
                ifStatement: ifStatementIndex
            }
        );
        executionQueue[ifStatementIndex].ending = executionQueue.length - 1;
    }

    function turn(direction) {
        executionQueue.push({
            type: TURN,
            direction: direction,
            toRotate: 45.0
        });
    }

    function moveLeft() {
        executionQueue.push({
            blockId: blockId,
            type: TAKE_OFF
        });
        executionQueue.push({
            toMove: TILE_SIZE,
            type: MOVE_LEFT
        });

        executionQueue.push({
            type: LANDING
        });
    }

    function moveUp() {
        executionQueue.push({
            blockId: blockId,
            type: TAKE_OFF
        });

        executionQueue.push({
            toMove: TILE_SIZE,
            type: MOVE_UP
        });

        executionQueue.push({
            type: LANDING
        });
    }

    function moveDown() {
        executionQueue.push({ blockId: blockId, type: TAKE_OFF });
        executionQueue.push({
            toMove: TILE_SIZE,
            type: MOVE_DOWN
        });
        executionQueue.push({ type: LANDING });
    }

    function moveRight() {
        executionQueue.push({ blockId: blockId, type: TAKE_OFF });
        executionQueue.push({
            toMove: TILE_SIZE,
            type: MOVE_RIGHT
        });
        executionQueue.push({ type: LANDING });
    }

    function moveJump(direction) {
        executionQueue.push({ type: TAKE_OFF });
        executionQueue.push({
            toMove: TILE_SIZE * 2,
            type: MOVE_JUMP,
            direction: direction
        });
        executionQueue.push({ type: LANDING });
    }

    function checkIfWon() {
        executionQueue.push({
            type: CHECK_IF_WON
        });
    }

    $scope.execute = function () {
        onButtonExecuteClick();
    }

    $scope.restart = function () {
        restart();
    }
});


// var $scope.game = new Phaser.$scope.game(512, 512, Phaser.AUTO, '$scope.gameAction',

//     { preload: preload, create: create, update: update, init: init, execute: onButtonExecuteClick, restart: restart });

// //Types of actions we can find in the executionQueue
// var TAKE_OFF = -111;
// var LANDING = -222;
// var MOVE_RIGHT = 0;
// var MOVE_LEFT = 111;
// var MOVE_UP = 222;
// var MOVE_DOWN = 333;
// var CHECK_IF_WON = 444;
// var MOVE_JUMP = 555;
// var TURN = 1;
// var IF_STATEMENT = 2;
// var WHILE_STATEMENT_ENDING = 3;
// var TILE_OFFSET_Y = 15.0;

// var MOVING_SPEED = 64.0;
// var ROTATION_SPEED = 90.0;
// var TILE_SIZE = 64.0;

// var playerSprite;

// var lastTime;
// var $scope.gameRunning = false;
// var currentAction = 0;
// var executionQueue = [];

// var goalSprite;
// var _hasReachedGoal;

// var map;
// var mazeGroup;
// var spawnPoint;
// var goal;

// var currentAnimation;
// var music;

// var globalContext = this;

// var blockId;
// var current_music_pack = "music_pack3";
// function init() {
//     $scope.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//     $scope.game.scale.pageAlignHorizontally = true;
//     $scope.game.scale.pageAlignVertically = true;
//     current_music_pack = "music_pack" + $scope.progress.mission;
// }

// function preload() {
//     $scope.game.load.spritesheet('player', 'assets/robo_joh.png', 128, 128);

//     $scope.game.load.tilemap('map', currentStage, null, Phaser.Tilemap.TILED_JSON);

//     //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:
//     $scope.game.load.image('background', 'assets/tiled/tilesets/background_stage.png');
//     $scope.game.load.spritesheet('tiles', 'assets/tiled/tilesets/tiles.png', 64, 64, 4);
//     $scope.game.load.spritesheet('star', 'assets/tiled/tilesets/star_spritesheet.png', 62, 64);

//     //  Firefox doesn't support mp3 files, so use ogg
//     $scope.game.load.audio('music_pack2', ['assets/audio/robostart.ogg']);
//     $scope.game.load.audio('music_pack1', ['assets/audio/music_pack1.ogg']);
//     $scope.game.load.audio('music_pack3', ['assets/audio/music_pack3.ogg']);
// }
// function playLevelMusic() {
//     music.play("", 0, 1, true);
// }
// function create() {

//     music = $scope.game.add.audio(current_music_pack);

//     music.play("", 0, 1, true);
//     music.onLoop.add(playLevelMusic, this);

//     $scope.game.physics.startSystem(Phaser.Physics.ARCADE);
//     map = $scope.game.add.tilemap('map');

//     map.addTilesetImage('tiles', 'tiles');
//     map.addTilesetImage('background', 'background');
//     map.addTilesetImage('star', 'star');

//     //  Creates a layer from the World1 layer in the map data.
//     //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
//     var layer = map.createLayer('Background');
//     layer.resizeWorld();

//     /**
//      * We know that there will be only one spawn point and one goal, so we use this fact to
//      * build the maze and get the correct spawn and goal points, they need to be created in this order
//      * goal -> spawnPoint -> maze 
//      */
//     mazeGroup = $scope.game.add.group();
//     mazeGroup.enableBody = true;

//     map.createFromObjects('Objects', 69, 'star', 0, true, false, mazeGroup);
//     goal = mazeGroup.children[0];

//     goal.animations.add('idle', [0, 1], 7, true);
//     goal.animations.play('idle');

//     map.createFromObjects('Objects', 1, 'tiles', 0, true, false, mazeGroup);
//     spawnPoint = mazeGroup.children[1];

//     map.createFromObjects('Objects', 3, 'tiles', 2, true, false, mazeGroup);

//     playerSprite = $scope.game.add.sprite(spawnPoint.x - spawnPoint.width / 2,
//         spawnPoint.y - spawnPoint.height / 2 - TILE_OFFSET_Y,
//         'player', 1);

//     var animation = playerSprite.animations.add('take_off', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 8, false);
//     animation.onComplete.add(function () {
//         currentAction++;
//         playerSprite.animations.stop();
//         currentAnimation = undefined;
//     });

//     animation = playerSprite.animations.add('land', [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 1], 8, false);
//     animation.onComplete.add(function () {
//         currentAction++;
//         playerSprite.animations.stop();
//         currentAnimation = undefined;

//         $scope.game.physics.arcade.overlap(playerSprite, goal, onReachedGoalHandler, null, globalContext);
//     });

//     playerSprite.animations.add('move_up', [13, 14], 10, true);
//     playerSprite.animations.add('move_down', [29, 30], 10, true);

//     playerSprite.animations.add('move_right', [33, 34, 35], 10, true);
//     playerSprite.animations.add('stop_right', [36, 37, 38, 39, 40], 10, true);

//     playerSprite.animations.add('move_left', [49, 50, 51], 10, true);
//     playerSprite.animations.add('stop_left', [52, 53, 54, 55, 56], 10, true);

//     playerSprite.animations.add('idle', [65, 66], 5, true);

//     playerSprite.animations.play('idle');

//     $scope.game.physics.arcade.enable(playerSprite);
//     playerSprite.body.allowGravity = false;
// }

// function onButtonExecuteClick() {
//     executionQueue = [];
//     currentAction = 0;
//     _hasReachedGoal = false;
//     $scope.gameRunning = true;

//     playerSprite.x = spawnPoint.x - spawnPoint.width / 2;
//     playerSprite.y = spawnPoint.y - spawnPoint.height / 2 - TILE_OFFSET_Y;

//     Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
//     Blockly.JavaScript.addReservedWords('highlightBlock');
//     var code = Blockly.JavaScript.workspaceToCode(workspace) + "\n" + "checkIfWon();";
//     eval(code);
// }

// function highlightBlock(id) {
//     blockId = id;
// }

// function restart() {
//     executionQueue = [];
//     currentAction = 0;
//     _hasReachedGoal = false;
//     $scope.gameRunning = false;
//     playerSprite.x = spawnPoint.x - spawnPoint.width / 2;
//     playerSprite.y = spawnPoint.y - spawnPoint.height / 2;
// }

// function isRoboOnTile() {
//     var playerX = playerSprite.x + playerSprite.width / 2;
//     var playerY = playerSprite.y + playerSprite.height / 2 + TILE_OFFSET_Y;

//     for (var i = 0; i < mazeGroup.children.length; i++) {
//         var tile = mazeGroup.children[i];

//         var tileLowerBoundX = tile.x;
//         var tileLowerBoundY = tile.y;
//         var tileUpperBoundX = tile.x + tile.width;
//         var tileUpperBoundY = tile.y + tile.height;
//         if (playerX >= tileLowerBoundX && playerY >= tileLowerBoundY && playerX < tileUpperBoundX && playerY < tileUpperBoundY)
//             return true;
//     }
//     return false;
// }

// function update() {
//     if ($scope.gameRunning) {

//         var current = executionQueue[currentAction];

//         if (current) {
//             if (!isRoboOnTile() && current.type != MOVE_JUMP) {
//                 //Not touching the maze, the player lost the $scope.game
//                 $scope.gameRunning = false;
//                 alert('Perdiste, mi papa');
//                 $scope.gameRunning = false;


//             }

//             var deltaTime = (this.$scope.game.time.now - lastTime) / 1000;
//             if (current.type === MOVE_RIGHT || current.type === MOVE_LEFT || current.type === MOVE_DOWN || current.type === MOVE_UP) {
//                 if (current.toMove <= 0) {
//                     current.toMove = TILE_SIZE;
//                     currentAction++;
//                     playerSprite.animations.stop();
//                 } else {

//                     var toMoveThisFrame = MOVING_SPEED * deltaTime;
//                     //We are about to start to move
//                     var animName;
//                     var startAnimation = current.toMove == TILE_SIZE;

//                     current.toMove -= toMoveThisFrame;

//                     if (current.type == MOVE_DOWN) {
//                         animName = "move_down";
//                         playerSprite.y += toMoveThisFrame;
//                     } else if (current.type == MOVE_UP) {
//                         animName = "move_up";
//                         playerSprite.y -= toMoveThisFrame;
//                     } else if (current.type == MOVE_LEFT) {
//                         animName = "move_left";
//                         playerSprite.x -= toMoveThisFrame;
//                     } else if (current.type == MOVE_RIGHT) {
//                         animName = "move_right";
//                         playerSprite.x += toMoveThisFrame;
//                     }

//                     if (startAnimation) {
//                         playerSprite.animations.play(animName);
//                     }
//                 }
//             } else if (current.type === MOVE_JUMP) {
//                 var deltaTime = (this.$scope.game.time.now - lastTime) / 1000;

//                 if (current.toMove <= 0) {
//                     current.toMove = TILE_SIZE * 2;
//                     currentAction++;
//                     playerSprite.animations.stop();
//                 } else {

//                     // if (current.toMove === TILE_SIZE * 2) {
//                     //     playerSprite.animations.play('jump');    
//                     // }

//                     var animName;
//                     var startAnimation = current.toMove == TILE_SIZE * 2;

//                     var toMoveThisFrame = MOVING_SPEED * deltaTime;

//                     current.toMove -= toMoveThisFrame;

//                     if (current.direction === "DOWN") {
//                         animName = "move_down";
//                         playerSprite.y += toMoveThisFrame;
//                     } else if (current.direction === "UP") {
//                         animName = "move_up";
//                         playerSprite.y -= toMoveThisFrame;
//                     } else if (current.direction === "LEFT") {
//                         animName = "move_left";
//                         playerSprite.x -= toMoveThisFrame;
//                     } else if (current.direction === "RIGHT") {
//                         animName = "move_right";
//                         playerSprite.x += toMoveThisFrame;
//                     }

//                     if (startAnimation) playerSprite.animations.play(animName);
//                 }
//             } else if (current.type === CHECK_IF_WON) {
//                 console.log("Checking if won");
//                 if (!_hasReachedGoal) {
//                     alert("Perdiste, mi papa");
//                     $scope.gameRunning = false;
//                 }
//             } else if (current.type === TURN) {
//                 console.log('turning');
//                 var rotateThisFrame = ROTATION_SPEED * deltaTime;
//                 if (current.toRotate <= 0) {

//                     if (current.direction === 'izquierda') {
//                         playerSprite.facing -= 1;
//                         if (playerSprite.facing < 0)
//                             playerSprite.facing += 4;
//                     } else if (current.direction === 'derecha') {
//                         playerSprite.facing = ++playerSprite.facing % 4;
//                     }

//                     current.toRotate = 45.0;
//                     currentAction++;
//                 } else {
//                     current.toRotate -= rotateThisFrame;
//                 }
//             } else if (current.type === IF_STATEMENT) {
//                 if (current.condition) {
//                     currentAction++;
//                 } else {
//                     currentAction = current.ending + 1;
//                 }
//             } else if (current.type === WHILE_STATEMENT_ENDING) {
//                 currentAction = current.ifStatement;
//             } else if (current.type === TAKE_OFF) {
//                 if (!currentAnimation) {
//                     workspace.highlightBlock(current.blockId);
//                     currentAnimation = playerSprite.animations.play('take_off');
//                 }
//             } else if (current.type === LANDING) {
//                 if (!currentAnimation) {
//                     currentAnimation = playerSprite.animations.play('land');
//                 }
//             }
//         }
//     }
//     lastTime = this.$scope.game.time.now;
// }

// function onMazeCollisionHandler(player, tile) {
//     /*var current = executionQueue[currentAction];
//     if (current.type === MOVE_JUMP)return;

//     var playerHalfX = player.x + player.width / 2;
//     var playerHalfY = player.y + player.height / 2;

//     var boundOffsetX = bound.width / 2.5;
//     var boundOffsetY = bound.height / 2.5;

//     if (playerHalfX >= bound.x + boundOffsetX && playerHalfX <= bound.x + bound.width - boundOffsetX &&
//          playerHalfY >= bound.y + boundOffsetY && playerHalfY <= bound.y + bound.height - boundOffsetY) {
//         $scope.gameRunning = false;
//         alert('Perdiste, mi papa');    
//         $scope.gameRunning = false;
//         //restart();      
//     }*/
// }

// function onReachedGoalHandler(player, goal) {

//     var current = executionQueue[currentAction];
//     if (current.type === MOVE_JUMP) return;

//     var playerHalfX = player.x + player.width / 2;
//     var playerHalfY = player.y + player.height / 2 + TILE_OFFSET_Y;

//     var goalOffsetX = goal.width / 2.5;
//     var goalOffsetY = goal.height / 2.5;

//     if (playerHalfX >= goal.x + goalOffsetX && playerHalfX < goal.x + goal.width - goalOffsetX &&
//         playerHalfY >= goal.y + goalOffsetY && playerHalfY < goal.y + goal.height - goalOffsetY) {
//         _hasReachedGoal = true;
//         $scope.gameRunning = false;
//         var nextLevel = (parseInt(currentLevel) + 1);
//         alert("Ganaste! Siiiiii!!");
//         _locked['l' + nextLevel] = false;
//         localStorage.setItem('locked', JSON.stringify(_locked));
//         var _token = JSON.parse(localStorage.getItem('token'));
//         if (currentLevel == 4 || currentLevel == 8 || currentLevel == 9) {
//             var achiev = currentLevel == 4 ? 7 : currentLevel == 8 ? 8 : 9;
//             $.post("http://kusuk.in/api/v1/achievements/unlock", { achievement_id: achiev, user_email: _token.user_email, user_token: _token.user_token }).done(
//                 function (data) {
//                     if (data) {
//                         alert(data.achievement.name, ': ', data.achievement.description);
//                         $.post("http://kusuk.in/api/v1/progress/save", { "course_id": 13, progress: { "current_level": nextLevel }, user_email: _token.user_email, user_token: _token.user_token }).done(
//                             function (data) {
//                                 if (data) {
//                                     currentLevel = nextLevel;
//                                     _maxBlocks = setsMissions["mission_pack_"+$scope.progress.mission]["l" + currentLevel].maxBlocks;
//                                     currentStage = 'assets/tiled/maps/' + setsMissions["mission_pack_"+$scope.progress.mission]["l" + currentLevel].stage;
//                                     $scope.game.state.restart();
//                                     //window.location = '/$scope.game.html?level=' + nextLevel;
//                                 }
//                             }
//                         ).fail(function (params) {
//                             if (params.status === 401) {
//                                 // window.location = '/signin.html'
//                             }
//                             console.log(params);
//                         })
//                     }
//                 }
//             ).fail(function (params) {
//                 if (params.status === 401) {
//                     // window.location = '/signin.html'
//                 }
//                 console.log(params);
//             })
//         } else {
//             $.post("http://kusuk.in/api/v1/progress/save",
//                 { "course_id": 13, progress: { "current_level": nextLevel }, user_email: _token.user_email, user_token: _token.user_token }).done(
//                 function (data) {
//                     if (data) {
//                         currentLevel = nextLevel;
//                         _maxBlocks = setsMissions["mission_pack_"+$scope.progress.mission]["l" + currentLevel].maxBlocks;
//                         currentStage = 'assets/tiled/maps/' + setsMissions["mission_pack_"+$scope.progress.mission]["l" + currentLevel].stage;
//                         $scope.game.state.restart();
//                         //window.location = '/$scope.game.html?level=' + nextLevel;
//                     }
//                 }
//                 ).fail(function (params) {
//                     if (params.status === 401) {
//                         // window.location = '/signin.html'
//                     }
//                     console.log(params);
//                 })
//         }
//     }
// }

// /*
//     These functions push the objects to the executionQueue
// */
// function didResolveTheMaze() {
//     return this._hasReachedGoal;
// }

// //TODO: We must find a way to pass the condition from the generated code, since we are going to use the 
// //if statement to evalute different cases
// function ifStatement() {
//     executionQueue.push(
//         {
//             type: IF_STATEMENT,
//             condition: !_hasReachedGoal
//         });
//     return executionQueue.length - 1;
// }

// function endingIfStatement(ifStatementIndex) {
//     executionQueue.push(
//         {
//             type: IF_STATEMENT_ENDING,
//             ifStatement: ifStatementIndex
//         }
//     );
//     executionQueue[ifStatementIndex].ending = executionQueue.length - 1;
// }

// function endingWhileStatement(ifStatementIndex) {
//     executionQueue.push(
//         {
//             type: WHILE_STATEMENT_ENDING,
//             ifStatement: ifStatementIndex
//         }
//     );
//     executionQueue[ifStatementIndex].ending = executionQueue.length - 1;
// }

// function turn(direction) {
//     executionQueue.push({
//         type: TURN,
//         direction: direction,
//         toRotate: 45.0
//     });
// }

// function moveLeft() {
//     executionQueue.push({
//         blockId: blockId,
//         type: TAKE_OFF
//     });
//     executionQueue.push({
//         toMove: TILE_SIZE,
//         type: MOVE_LEFT
//     });

//     executionQueue.push({
//         type: LANDING
//     });
// }

// function moveUp() {
//     executionQueue.push({
//         blockId: blockId,
//         type: TAKE_OFF
//     });

//     executionQueue.push({
//         toMove: TILE_SIZE,
//         type: MOVE_UP
//     });

//     executionQueue.push({
//         type: LANDING
//     });
// }

// function moveDown() {
//     executionQueue.push({ blockId: blockId, type: TAKE_OFF });
//     executionQueue.push({
//         toMove: TILE_SIZE,
//         type: MOVE_DOWN
//     });
//     executionQueue.push({ type: LANDING });
// }

// function moveRight() {
//     executionQueue.push({ blockId: blockId, type: TAKE_OFF });
//     executionQueue.push({
//         toMove: TILE_SIZE,
//         type: MOVE_RIGHT
//     });
//     executionQueue.push({ type: LANDING });
// }

// function moveJump(direction) {
//     executionQueue.push({ type: TAKE_OFF });
//     executionQueue.push({
//         toMove: TILE_SIZE * 2,
//         type: MOVE_JUMP,
//         direction: direction
//     });
//     executionQueue.push({ type: LANDING });
// }

// function checkIfWon() {
//     executionQueue.push({
//         type: CHECK_IF_WON
//     });
// }

// $scope.execute = function () {
//     onButtonExecuteClick();
// }

// $scope.restart = function () {
//     restart();
// }

// })