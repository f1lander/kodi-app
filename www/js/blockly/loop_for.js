Blockly.Blocks['loop_for'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("repetir")
        .appendField(new Blockly.FieldTextInput("1"), "limit");
    this.appendStatementInput("FOR_STATEMENTS")
        .setCheck(null)
        .appendField("hacer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setColour(330);
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.JavaScript['loop_for'] = function(block) {
  var text_limit = parseInt(block.getFieldValue('limit'));
  var statements_for_statements = Blockly.JavaScript.statementToCode(block, 'FOR_STATEMENTS');
  // TODO: Assemble JavaScript into code variable.
  var code = 'for (i = 0; i <' + text_limit + '; i++) {\n'+ statements_for_statements + '\n}';
  return code;
};