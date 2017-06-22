Blockly.Blocks['move_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mover derecha");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(100);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['move_right'] = function(block) {
  return "moveRight();\n";
};