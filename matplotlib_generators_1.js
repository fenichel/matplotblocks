Blockly.Python['create_graph'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'figure, axes = plt.subplots()\n';
  return code;
};

Blockly.Python['set_x_axis_label'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'axes.set_xlabel(' + value_name + ')\n';
  return code;
};

Blockly.Python['set_y_axis_label'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = 'axes.set_ylabel(' + value_name + ')\n';
  return code;
};

Blockly.Python['add_data'] = function(block) {
  var value_data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_ATOMIC);
  var code = 'axes.plot(' + value_data + ')\n';
  return code;
};

Blockly.Python['add_data_two'] = function(block) {
  var value_data_x = Blockly.Python.valueToCode(block, 'DATA_x', Blockly.Python.ORDER_ATOMIC);
  var value_data_y = Blockly.Python.valueToCode(block, 'DATA_Y', Blockly.Python.ORDER_ATOMIC);

  var statement_block = block.getInput('NAME').connection.targetBlock();

  var statement_blocks_map = {};
  while (statement_block) {
    var type = statement_block.type;
    if (!statement_blocks_map[type]) {
      statement_blocks_map[type] = [];
    }
    statement_blocks_map[type].push(statement_block);
    statement_block = statement_block.getNextBlock();
  }

  var modifier_string = '';
  for (modifier in statement_blocks_map) {
    var value = statement_blocks_map[modifier];
    var most_recent = value[value.length - 1];
    modifier_string += ', ' + Blockly.Python.blockToCode(most_recent);
  }

  var code = 'axes.plot(' + value_data_x + ', ' + value_data_y + modifier_string + ')\n';
  // if (statements_name) {
  //   if (statements_name.endsWith(' ')) {
  //     statements_name = statements_name.slice(0, -2);
  //   }
  //   code = code + ', ' + statements_name;
  // }

  //code += ')\n';
  return code;
};

Blockly.Python['specify_variable'] = function(block) {
  var text_variable_name = block.getFieldValue('VARIABLE_NAME');
  var code = text_variable_name;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['set_axis_limits'] = function(block) {
  var dropdown_axis = block.getFieldValue('AXIS');
  var number_limit_1 = block.getFieldValue('LIMIT_1');
  var number_limit_2 = block.getFieldValue('LIMIT_2');
  var code = 'axes.set_' + dropdown_axis + 
      'lim([' + number_limit_1 + ', ' + number_limit_2 + '])\n';
  return code;
};

Blockly.Python['set_axis_label'] = function(block) {
  var dropdown_axis = block.getFieldValue('AXIS');
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  
  var code = 'axes.set_' + dropdown_axis + 
      'label(' + value_name + ')\n';
  return code;
};

Blockly.Python['dataseries_set_color'] = function(block) {
  var colour_name = block.getFieldValue('NAME');
  var code = 'color=\'' + colour_name + '\'';
  return code;
};

Blockly.Python['dataseries_set_linewidth'] = function(block) {
  var number_width = block.getFieldValue('WIDTH');
  var code = 'linewidth=' + number_width;
  return code;
};

Blockly.Python['dataseries_set_linestyle'] = function(block) {
  var dropdown_style = block.getFieldValue('STYLE');
  var code = 'linestyle=\'' + dropdown_style + '\'';
  return code;
};

Blockly.Python['dataseries_set_marker'] = function(block) {
  var dropdown_marker = block.getFieldValue('MARKER');
  var code = 'marker=\'' + dropdown_marker + '\'';
  return code;
};