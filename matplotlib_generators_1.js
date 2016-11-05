Blockly.Python['create_graph'] = function(block) {

  var dropdown_num_y_axes = block.getFieldValue('NUM_Y_AXES');
  var statements_config_x_axis = Blockly.Python.statementToCode(block, 'CONFIG_X_AXIS');
  var statements_config_primary_y_axis = Blockly.Python.statementToCode(block, 'CONFIG_PRIMARY_Y_AXIS');
  var statements_config_secondary_y_axis = Blockly.Python.statementToCode(block, 'CONFIG_SECONDARY_Y_AXIS');
  var statements_add_data = Blockly.Python.statementToCode(block, 'ADD_DATA');

  var x_axis_config = 'def config_x_axis():\n' +
      Blockly.Python.INDENT + 'axis = \'x\'\n' +
      statements_config_x_axis + '\n';
  var primary_y_axis_config = 'def config_primary_y_axis():\n' +
      Blockly.Python.INDENT + 'axis = \'primary_y\'\n' +
      statements_config_primary_y_axis + '\n';
  var secondary_y_axis_config = dropdown_num_y_axes == 1 ? '' : 
      'def config_secondary_y_axis():\n' +
          Blockly.Python.INDENT + 'axis = \'secondary_y\'\n' +
          statements_config_secondary_y_axis + '\n';
  var add_data = 'def add_data():\n' + statements_add_data + '\n';

  var code = 'figure, primary_scale = plt.subplots()\n';

  if (dropdown_num_y_axes == 2) {
    code += 'secondary_scale = primary_scale.twinx()\n';
  }

  code += add_data;
  code += x_axis_config + primary_y_axis_config + secondary_y_axis_config + '\n'
  code += 'add_data()\n' +
      'config_x_axis()\n' +
      'config_primary_y_axis()\n';
  if (dropdown_num_y_axes == 2) {
    code += 'config_secondary_y_axis()\n';
  }
  return code;
};

Blockly.Python['add_data'] = function(block) {
  var value_data = Blockly.Python.valueToCode(block, 'DATA', Blockly.Python.ORDER_ATOMIC);
  var code = 'primary_scale.plot(' + value_data + ')\n';
  return code;
};

Blockly.Python['add_data_two'] = function(block) {
  var value_data_x = Blockly.Python.valueToCode(block, 'DATA_x', Blockly.Python.ORDER_ATOMIC);
  var value_data_y = Blockly.Python.valueToCode(block, 'DATA_Y', Blockly.Python.ORDER_ATOMIC);
  var statements_name = Blockly.Python.statementToCode(block, 'NAME');

  var code = '\ndef configure_this_line():\n' + 
      Blockly.Python.INDENT + 'config_object = {}\n' +
      Blockly.Python.INDENT + '# Default scale, if not specified\n' +
      Blockly.Python.INDENT + 'scale = primary_scale\n' + 
      statements_name +
      Blockly.Python.INDENT + 'scale.plot(' + value_data_x + ', ' + value_data_y + ', **config_object)\n' +
      'configure_this_line()\n\n';
  return code;
};

Blockly.Python['specify_variable'] = function(block) {
  var text_variable_name = block.getFieldValue('VARIABLE_NAME');
  var code = text_variable_name;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['set_axis_label'] = function(block) {

  var functionName = Blockly.Python.provideFunction_(
      'set_axis_label',
      ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(axis, label):',
      '  if (axis == \'x\'):',
      '    primary_scale.set_xlabel(label)',
      '  elif (axis == \'primary_y\'):',
      '    primary_scale.set_ylabel(label)',
      '  else:',
      '    secondary_scale.set_ylabel(label)']);
  var text_name = block.getFieldValue('NAME');
  var code = functionName + '(axis, \'' + text_name + '\')\n';
  return code;
};

Blockly.Python['dataseries_set_color'] = function(block) {
  var colour_name = block.getFieldValue('NAME');
  var code = 'config_object[\'color\'] = \'' + colour_name + '\'\n';
  return code;
};

Blockly.Python['dataseries_set_linewidth'] = function(block) {
  var number_width = block.getFieldValue('WIDTH');
  var code = 'config_object[\'linewidth\'] = ' + number_width + '\n';
  return code;
};

Blockly.Python['dataseries_set_linestyle'] = function(block) {
  var dropdown_style = block.getFieldValue('STYLE');
  var code = 'config_object[\'linestyle\'] = \'' + dropdown_style + '\'\n';
  return code;
};

Blockly.Python['dataseries_set_marker'] = function(block) {
  var dropdown_marker = block.getFieldValue('MARKER');
  var number_marker_size = block.getFieldValue('MARKER_SIZE');

  if (dropdown_marker) {
    var marker_code = 'config_object[\'marker\'] = \'' + dropdown_marker + '\'\n';
  }
  if (number_marker_size) {
    var size_code = 'config_object[\'markersize\'] = ' + number_marker_size + '\n';
  }
  var code;
  if (dropdown_marker && number_marker_size) {
    code = marker_code + size_code;
  } else if (dropdown_marker) {
    code = marker_code;
  } else if (number_marker_size) {
    code = size_code;
  }
  
  return code;
};

Blockly.Python['set_axis_ticks'] = function(block) {
  var functionName = Blockly.Python.provideFunction_(
    'set_axis_ticks',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(axis, frequency):',
    '  if (axis == \'x\'):',
    '    primary_scale.xaxis.set_major_locator(ticker.MultipleLocator(frequency))',
    '  elif (axis == \'primary_y\'):',
    '    primary_scale.yaxis.set_major_locator(ticker.MultipleLocator(frequency))',
    '  else:',
    '    secondary_scale.yaxis.set_major_locator(ticker.MultipleLocator(frequency))']);

  var number_frequency = block.getFieldValue('FREQUENCY');
  // TODO: Import ticker
  var code = 'set_axis_ticks(axis, ' + number_frequency + ')\n';
  return code;
};

Blockly.Python['create_scale'] = function(block) {
  var text_scale_name = block.getFieldValue('SCALE_NAME');
  var number_y_min = block.getFieldValue('Y_MIN');
  var number_y_max = block.getFieldValue('Y_MAX');

  text_scale_name = text_scale_name.replace(' ', '_');

  var code = text_scale_name + ' = axes.twinx()\n' +
      text_scale_name + '.set_ylim(' + number_y_min + ', ' + number_y_max + ')\n';
  return code;
};

Blockly.Python['pick_scale'] = function(block) {
  var dropdown_scale = block.getFieldValue('SCALE');
  if (dropdown_scale == 'PRIMARY') {
    var code = 'scale = primary_scale\n';
  } else {
    var code = 'scale = secondary_scale\n';
  }
  return code;
};

Blockly.Python['set_axis_limits'] = function(block) {

  var functionName = Blockly.Python.provideFunction_(
    'set_axis_limits',
    ['def ' + Blockly.Python.FUNCTION_NAME_PLACEHOLDER_ + '(axis, limit1, limit2):',
    '  if (axis == \'x\'):',
    '    primary_scale.set_xlim([limit1, limit2])',
    '  elif (axis == \'primary_y\'):',
    '    primary_scale.set_ylim([limit1, limit2])',
    '  else:',
    '    secondary_scale.set_ylim([limit1, limit2])']);

  var number_limit_1 = block.getFieldValue('LIMIT_1');
  var number_limit_2 = block.getFieldValue('LIMIT_2');
  // TODO: Assemble Python into code variable.
  var code = 'set_axis_limits(axis, ' + number_limit_1 + ', ' + number_limit_2 + ')\n';
  return code;
};

Blockly.Python['configure_axis'] = function(block) {
  var dropdown_axis = block.getFieldValue('AXIS');
  var number_min = block.getFieldValue('MIN');
  var number_max = block.getFieldValue('MAX');
  var text_label = block.getFieldValue('LABEL');
  var number_tick_frequency = block.getFieldValue('TICK_FREQUENCY');


  var code = '...\n';
  return code;
};