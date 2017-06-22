
//TODO: Is it the best way to store it?
var levelConfig = level_config['l'+currentLevel];

var toolbox = '<xml id="toolbox" style="display: none;">';
toolbox += levelConfig.blocksAvailable & 1 ? '  <block type="loop_while_not_reached_goal"></block>' : '';
toolbox += levelConfig.blocksAvailable & 2 ? '  <block type="move_right"></block>' : '';
toolbox += levelConfig.blocksAvailable & 4 ? '  <block type="move_left"></block>' : '';
toolbox += levelConfig.blocksAvailable & 8 ? '  <block type="move_up"></block>' : '';
toolbox += levelConfig.blocksAvailable & 16 ? '  <block type="move_down"></block>' : '';
toolbox += levelConfig.blocksAvailable & 32 ? '  <block type="move_jump"></block>' : '';
toolbox += levelConfig.blocksAvailable & 64 ?'  <block type="loop_for"></block>' : '';
toolbox += '</xml>';

var workspace = Blockly.inject('blocklyDiv',
{
     toolbox: toolbox, 
     maxBlocks: _maxBlocks,
     zoom:
         {controls: false,
          wheel: false,
          startScale: 0.8,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2},
     trashcan: true
});

