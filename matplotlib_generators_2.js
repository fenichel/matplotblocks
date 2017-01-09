Blockly.Matplotlib['create_graph'] = function(block) {

  var dropdown_num_y_axes = block.getFieldValue('NUM_Y_AXES');
  if (dropdown_num_y_axes == 2) {
    Blockly.Matplotlib.secondaryYAxis = true;
  }
  Blockly.Matplotlib.currentAxis = "x";
  var statements_config_x_axis = Blockly.Matplotlib.statementToCode(block, 'CONFIG_X_AXIS');

  Blockly.Matplotlib.currentAxis = "y1";
  var statements_config_primary_y_axis = Blockly.Matplotlib.statementToCode(block, 'CONFIG_PRIMARY_Y_AXIS');

  if (Blockly.Matplotlib.secondaryYAxis) {
    Blockly.Matplotlib.currentAxis = "y2";
    var statements_config_secondary_y_axis = Blockly.Matplotlib.statementToCode(block, 'CONFIG_SECONDARY_Y_AXIS');
  }
  
  Blockly.Matplotlib.currentAxis = "y1";
  Blockly.Matplotlib.statementToCode(block, 'ADD_DATA_TO_PRIMARY_Y_AXIS');

  if (Blockly.Matplotlib.secondaryYAxis) {
    Blockly.Matplotlib.currentAxis = "y2";
    Blockly.Matplotlib.statementToCode(block, 'ADD_DATA_TO_SECONDARY_Y_AXIS');
  }

  var code = 'figure, primary_scale = plt.subplots()\n';
  return code;
};

// NOT CURRENTLY USED
Blockly.Matplotlib['add_data'] = function(block) {
  var value_data = Blockly.Matplotlib.valueToCode(block, 'DATA', Blockly.Matplotlib.config_objectRDER_ATOMIC);
  var code = 'primary_scale.plot(' + value_data + ')\n';
  return code;
};

Blockly.Matplotlib['add_data_two'] = function(block) {
  var value_data_x = Blockly.Matplotlib.valueToCode(block, 'DATA_x', Blockly.Matplotlib.ORDER_ATOMIC);
  var value_data_y = Blockly.Matplotlib.valueToCode(block, 'DATA_Y', Blockly.Matplotlib.ORDER_ATOMIC);

  Blockly.Matplotlib.currDataSink = {"x": value_data_x, "y": value_data_y};
  Blockly.Matplotlib.statementToCode(block, 'NAME');

  if (Blockly.Matplotlib.currDataSink) {
    Blockly.Matplotlib.dataConfigurations[Blockly.Matplotlib.currentAxis].push(
        Blockly.Matplotlib.currDataSink);
  }
  return null;
};

Blockly.Matplotlib['specify_variable'] = function(block) {
  var text_variable_name = block.getFieldValue('VARIABLE_NAME');
  var code = text_variable_name;
  return [code, Blockly.Matplotlib.ORDER_ATOMIC];
};

Blockly.Matplotlib['set_axis_label'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var config = Blockly.Matplotlib.axisConfigs[Blockly.Matplotlib.currentAxis];
  config["label"] = text_name;
  return null;
};

Blockly.Matplotlib['dataseries_set_color'] = function(block) {
  var colour_name = block.getFieldValue('NAME');
  // var code = 'config_object[\'color\'] = \'' + colour_name + '\'\n';
  // return code;
  Blockly.Matplotlib.currDataSink["color"] = colour_name;
  return null;
};

Blockly.Matplotlib['dataseries_set_linewidth'] = function(block) {
  var number_width = block.getFieldValue('WIDTH');
  Blockly.Matplotlib.currDataSink["linewidth"] = number_width;
  // var code = 'config_object[\'linewidth\'] = ' + number_width + '\n';
  // return code;
  return null;
};

Blockly.Matplotlib['dataseries_set_linestyle'] = function(block) {
  var dropdown_style = block.getFieldValue('STYLE');
  Blockly.Matplotlib.currDataSink["linestyle"] = dropdown_style;
  // var code = 'config_object[\'linestyle\'] = \'' + dropdown_style + '\'\n';
  // return code;
  return null;
};

Blockly.Matplotlib['dataseries_set_marker'] = function(block) {
  var dropdown_marker = block.getFieldValue('MARKER');
  Blockly.Matplotlib.currDataSink["marker"] = dropdown_marker;
  //var number_marker_size = block.getFieldValue('MARKER_SIZE');

  // if (dropdown_marker) {
  //   var marker_code = 'config_object[\'marker\'] = \'' + dropdown_marker + '\'\n';
  // }
  // if (number_marker_size) {
  //   var size_code = 'config_object[\'markersize\'] = ' + number_marker_size + '\n';
  // }
  // var code;
  // if (dropdown_marker && number_marker_size) {
  //   code = marker_code + size_code;
  // } else if (dropdown_marker) {
  //   code = marker_code;
  // } else if (number_marker_size) {
  //   code = size_code;
  // }
  
  //return code;
  return null;
};

Blockly.Matplotlib['set_axis_ticks'] = function(block) {
  var number_frequency = block.getFieldValue('FREQUENCY');
  // TODO: Import ticker
  var config = Blockly.Matplotlib.axisConfigs[Blockly.Matplotlib.currentAxis];
  config["tick_frequency"] = number_frequency;
  return null;
};

Blockly.Matplotlib['create_scale'] = function(block) {
  var text_scale_name = block.getFieldValue('SCALE_NAME');
  var number_y_min = block.getFieldValue('Y_MIN');
  var number_y_max = block.getFieldValue('Y_MAX');

  text_scale_name = text_scale_name.replace(' ', '_');

  var code = text_scale_name + ' = axes.twinx()\n' +
      text_scale_name + '.set_ylim(' + number_y_min + ', ' + number_y_max + ')\n';
  return code;
};

Blockly.Matplotlib['pick_scale'] = function(block) {
  var dropdown_scale = block.getFieldValue('SCALE');
  if (dropdown_scale == 'PRIMARY') {
    var code = 'scale = primary_scale\n';
  } else {
    var code = 'scale = secondary_scale\n';
  }
  return code;
};

Blockly.Matplotlib['set_axis_limits'] = function(block) {
  var number_limit_1 = block.getFieldValue('LIMIT_1');
  var number_limit_2 = block.getFieldValue('LIMIT_2');

  var config = Blockly.Matplotlib.axisConfigs[Blockly.Matplotlib.currentAxis];
  config["limits"] = [number_limit_1, number_limit_2];
  return null;
};

Blockly.Matplotlib['configure_axis'] = function(block) {
  var dropdown_axis = block.getFieldValue('AXIS');
  var number_min = block.getFieldValue('MIN');
  var number_max = block.getFieldValue('MAX');
  var text_label = block.getFieldValue('LABEL');
  var number_tick_frequency = block.getFieldValue('TICK_FREQUENCY');


  var code = '...\n';
  return code;
};