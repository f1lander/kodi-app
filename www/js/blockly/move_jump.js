Blockly.Blocks['move_jump'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("saltar hacia")
        .appendField(new Blockly.FieldDropdown([["arriba", "UP"], ["abajo", "DOWN"], ["izquierda", "LEFT"], ["derecha", "RIGHT"]]), "direction");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['move_jump'] = function(block) {
  var dropdown_direction = block.getFieldValue('direction');
  var code ='moveJump(' + '\"' + dropdown_direction + '\"' + ');\n';
  return code;
};