Blockly.Blocks['move_up'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mover arriba");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['move_up'] = function(block) {
  return "moveUp();\n";
};