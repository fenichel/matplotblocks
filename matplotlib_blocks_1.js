Blockly.Blocks['create_graph'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("Create graph with filename");
    this.setNextStatement(true, "configure_plot");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_x_axis_label'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("set x axis label to");
    this.setPreviousStatement(true, "configure_plot");
    this.setNextStatement(true, "configure_plot");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_y_axis_label'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("set y axis label");
    this.setPreviousStatement(true, "configure_plot");
    this.setNextStatement(true, "configure_plot");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['add_data'] = {
  init: function() {
    this.appendValueInput("DATA")
        .setCheck("String")
        .appendField("add data");
    this.setPreviousStatement(true, "configure_plot");
    this.setNextStatement(true, "configure_plot");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['add_data_two'] = {
  init: function() {
    this.appendValueInput("DATA_x")
        .setCheck("String")
        .appendField("add data x");
    this.appendValueInput("DATA_Y")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("y");
    this.appendStatementInput("NAME")
        .setCheck("configure_dataseries");
    this.setPreviousStatement(true, "configure_plot");
    this.setNextStatement(true, "configure_plot");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['specify_variable'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("variable name:")
        .appendField(new Blockly.FieldTextInput(""), "VARIABLE_NAME");
    this.setOutput(true, null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_axis_limits'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set ")
        .appendField(new Blockly.FieldDropdown([["x", "x"], ["y", "y"]]), "AXIS")
        .appendField("axis limits to")
        .appendField(new Blockly.FieldNumber(0), "LIMIT_1")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0), "LIMIT_2");
    this.setPreviousStatement(true, "configure_plot");
    this.setNextStatement(true, "configure_plot");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_axis_label'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("set")
        .appendField(new Blockly.FieldDropdown([["x", "x"], ["y", "y"]]), "AXIS")
        .appendField("axis label to");
    this.setPreviousStatement(true, "configure_plot");
    this.setNextStatement(true, "configure_plot");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['dataseries_set_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set color")
        .appendField(new Blockly.FieldColour("#ff0000"), "NAME");
    this.setPreviousStatement(true, "configure_dataseries");
    this.setNextStatement(true, "configure_dataseries");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['dataseries_set_linewidth'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set line width")
        .appendField(new Blockly.FieldNumber(0), "WIDTH");
    this.setPreviousStatement(true, "configure_dataseries");
    this.setNextStatement(true, "configure_dataseries");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['dataseries_set_linestyle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set line style")
        .appendField(new Blockly.FieldDropdown([["solid", "-"], ["dashed", "--"], ["dashdot", "-."], ["dotted", ":"], ["don't draw", "None"]]), "STYLE");
    this.setPreviousStatement(true, "configure_dataseries");
    this.setNextStatement(true, "configure_dataseries");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['dataseries_set_marker'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set marker style")
        .appendField(new Blockly.FieldDropdown([["point", "."], ["square", "s"], ["circle", "o"], ["x", "x"], ["plus", "+"], ["triangle down", "v"], ["no marker", "None"], ["octagon", "8"], ["pentagon", "p"], ["star", "*"], ["pixel", ","], ["hexagon1", "h"], ["diamond", "D"], ["thin diamond", "d"], ["vline", "|"], ["hline", "_"], ["tick left", "TICKLEFT"], ["tick right", "TICKRIGHT"], ["tick up", "TICKUP"], ["tick down", "TICKDOWN"], ["caret left", "CARETLEFT"], ["caret right", "CARETRIGHT"], ["caret up", "CARETUP"], ["caret down", "CARETDOWN"], ["triangle up", "^"], ["triangle left", "<"], ["triangle right", ">"], ["tri down", "1"], ["tri up", "2"], ["tri left", "3"], ["tri right", "4"]]), "MARKER");
    this.setPreviousStatement(true, "configure_dataseries");
    this.setNextStatement(true, "configure_dataseries");
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};