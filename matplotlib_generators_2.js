Blockly.Matplotlib['create_line_plot'] = function(block) {
  Blockly.Matplotlib.definitions_['import_matplotlib'] = 'import matplotlib.pyplot as plt';
  Blockly.Matplotlib.definitions_['import_numpy'] = 'import numpy as np';
  Blockly.Matplotlib.definitions_['import_ticker'] = 'import matplotlib.ticker as ticker';

  Blockly.Matplotlib.plotType = 'LINE';

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

Blockly.Matplotlib['create_scatter_plot'] = function(block) {
  Blockly.Matplotlib.definitions_['import_matplotlib'] = 'import matplotlib.pyplot as plt';
  Blockly.Matplotlib.definitions_['import_numpy'] = 'import numpy as np';
  Blockly.Matplotlib.definitions_['import_ticker'] = 'import matplotlib.ticker as ticker';

  Blockly.Matplotlib.plotType = 'SCATTER';

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

Blockly.Matplotlib['add_legend'] = function(block) {
  var dropdown_which_axes = block.getFieldValue('WHICH_AXES');
  var dropdown_location = block.getFieldValue('LOCATION');
  var dropdown_marker_position = block.getFieldValue('MARKER_POSITION');
  var text_name = block.getFieldValue('TITLE');

  Blockly.Matplotlib.legendConfig = {};
  Blockly.Matplotlib.legendConfig['WHICH_AXES'] = dropdown_which_axes;
  Blockly.Matplotlib.legendConfig['MARKER_POSITION'] = dropdown_marker_position;
  Blockly.Matplotlib.legendConfig['LOCATION'] = dropdown_location;
  Blockly.Matplotlib.legendConfig['TITLE'] = text_name;
  return null;
};

Blockly.Matplotlib['set_plot_title'] = function(block) {
  var text_name = block.getFieldValue('TITLE');
  var dropdown_title_position = block.getFieldValue('POSITION');
  Blockly.Matplotlib.title = {};
  Blockly.Matplotlib.title['label'] = text_name;
  Blockly.Matplotlib.title['position'] = dropdown_title_position;
  return null;
};

Blockly.Matplotlib['add_dataseries'] = function(block) {
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
  Blockly.Matplotlib.currDataSink["color"] = colour_name;
  return null;
};

Blockly.Matplotlib['dataseries_set_label'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  Blockly.Matplotlib.currDataSink["label"] = text_name;
  return null;
};

Blockly.Matplotlib['dataseries_set_linewidth'] = function(block) {
  var number_width = block.getFieldValue('WIDTH');
  Blockly.Matplotlib.currDataSink["linewidth"] = number_width;
  return null;
};

Blockly.Matplotlib['dataseries_set_linestyle'] = function(block) {
  var dropdown_style = block.getFieldValue('STYLE');
  Blockly.Matplotlib.currDataSink["linestyle"] = dropdown_style;
  return null;
};

Blockly.Matplotlib['dataseries_set_marker'] = function(block) {
  var dropdown_marker = block.getFieldValue('MARKER');
  Blockly.Matplotlib.currDataSink["marker"] = dropdown_marker;
  return null;
};

Blockly.Matplotlib['set_axis_ticks'] = function(block) {
  var number_frequency = block.getFieldValue('FREQUENCY');
  var config = Blockly.Matplotlib.axisConfigs[Blockly.Matplotlib.currentAxis];
  config["tick_frequency"] = number_frequency;
  return null;
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