Blockly.Blocks['move_down'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mover abajo");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(200);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['move_down'] = function(block) {
  return "moveDown();\n";
};