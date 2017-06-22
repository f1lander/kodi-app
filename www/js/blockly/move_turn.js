Blockly.Blocks['move_turn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["girar a la izquierda", "izquierda"], ["girar a la derecha", "derecha"]]), "direction");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(150);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.JavaScript['move_turn'] = function(block) {
    var direction = block.getFieldValue('direction');
    
    return "turn(" + "'" + direction + "'" + ');\n';
};