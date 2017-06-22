Blockly.Blocks['conditional_if_path_at'] = {
  init: function() {
    this.appendStatementInput("IF_PATH")
        .appendField("si hay camino")
        .appendField(new Blockly.FieldDropdown([["ahead", "ahead"], ["left", "left"], ["right", "right"]]), "");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(255);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['conditional_if_path_at'] = function(block) {
  var statements_if_path = Blockly.JavaScript.statementToCode(block, 'IF_PATH');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};