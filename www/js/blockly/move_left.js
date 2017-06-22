Blockly.Blocks['move_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mover izquierda");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(220);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['move_left'] = function(block) {
  return "moveLeft();\n";
};