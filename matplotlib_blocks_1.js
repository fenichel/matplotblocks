Blockly.Blocks['create_graph'] = {
init: function() {
    this.appendDummyInput()
        .appendField("Create graph with ")
        .appendField(new Blockly.FieldDropdown(
              [["1 y scale", "1"], ["2 y scales", "2"]],
              function(option) {
                var secondary_axis = (option == '2');
                this.sourceBlock_.updateShape_(secondary_axis);
              }
          ), "NUM_Y_AXES");
    this.appendStatementInput("CONFIG_X_AXIS")
        .setCheck("config_axis")
        .appendField("x axis configuration");
    this.appendStatementInput("CONFIG_PRIMARY_Y_AXIS")
        .setCheck("config_axis")
        .appendField("y axis configuration");
    this.appendStatementInput("ADD_DATA")
        .setCheck("configure_plot")
        .appendField("add data:");
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  /**
   * Create XML to represent whether the 'secondary_axis' should be present.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var secondary_axis = (this.getFieldValue('NUM_Y_AXES') == '2');
    container.setAttribute('secondary_axis', secondary_axis);
    return container;
  },
  /**
   * Parse XML to restore the 'divisorInput'.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var secondary_axis = (xmlElement.getAttribute('secondary_axis') == 'true');
    this.updateShape_(secondary_axis);
  },
  /**
   * Modify this block to have (or not have) an input for configuring the 
   * secondary y axis.
   * @param {boolean} secondary_axis True if this should have an input for
   * configuring the secondary y axis.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function(secondary_axis) {
    // Add or remove a statement input Input.
    var inputExists = this.getInput('CONFIG_SECONDARY_Y_AXIS');
    if (secondary_axis) {
      if (!inputExists) {
        this.appendStatementInput("CONFIG_SECONDARY_Y_AXIS")
            .setCheck("config_axis")
            .appendField("secondary y axis configuration");
        this.moveInputBefore('CONFIG_SECONDARY_Y_AXIS', 'ADD_DATA');
      }
    } else if (inputExists) {
      this.removeInput('CONFIG_SECONDARY_Y_AXIS');
    }
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
        .appendField("set label");
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
    this.setColour(260);
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
        .appendField("Set limits to")
        .appendField(new Blockly.FieldNumber(0), "LIMIT_1")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(10), "LIMIT_2");
    this.setPreviousStatement(true, "config_axis");
    this.setNextStatement(true, "config_axis");
    this.setColour(330);
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
    this.setColour(120);
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
    this.setColour(120);
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['dataseries_set_linestyle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set line style")
        .appendField(new Blockly.FieldDropdown([["solid", "-"], ["dashed", "--"], ["dashdot", "-."], ["dotted", ":"], ["only points", "None"]]), "STYLE");
    this.setPreviousStatement(true, "configure_dataseries");
    this.setNextStatement(true, "configure_dataseries");
    this.setTooltip('');
    this.setColour(120);
    this.setHelpUrl('http://matplotlib.org/1.5.3/api/lines_api.html#matplotlib.lines.Line2D.set_linestyle');
  }
};

Blockly.Blocks['dataseries_set_marker'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set marker style")
        .appendField(new Blockly.FieldDropdown([["point", "."], ["square", "s"], ["circle", "o"], ["x", "x"], ["plus", "+"], ["triangle down", "v"], ["no marker", "None"], ["octagon", "8"], ["pentagon", "p"], ["star", "*"], ["pixel", ","], ["hexagon1", "h"], ["diamond", "D"], ["thin diamond", "d"], ["vline", "|"], ["hline", "_"], ["tick left", "TICKLEFT"], ["tick right", "TICKRIGHT"], ["tick up", "TICKUP"], ["tick down", "TICKDOWN"], ["caret left", "CARETLEFT"], ["caret right", "CARETRIGHT"], ["caret up", "CARETUP"], ["caret down", "CARETDOWN"], ["triangle up", "^"], ["triangle left", "<"], ["triangle right", ">"], ["tri down", "1"], ["tri up", "2"], ["tri left", "3"], ["tri right", "4"]]), "MARKER")
        .appendField("size")
        .appendField(new Blockly.FieldNumber(1), "MARKER_SIZE");
    this.setPreviousStatement(true, "configure_dataseries");
    this.setNextStatement(true, "configure_dataseries");
    this.setTooltip('');
    this.setColour(120);
    this.setHelpUrl('http://matplotlib.org/1.5.3/api/markers_api.html#module-matplotlib.markers');
  }
};

Blockly.Blocks['set_axis_ticks'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set tick frequency to")
        .appendField(new Blockly.FieldNumber(1), "FREQUENCY");
    this.setPreviousStatement(true, "config_axis");
    this.setNextStatement(true, "config_axis");
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('https://stackoverflow.com/questions/12608788/changing-the-tick-frequency-on-x-or-y-axis-in-matplotlib');
  }
};

Blockly.Blocks['pick_scale'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("use")
        .appendField(new Blockly.FieldDropdown(
          [["primary", "PRIMARY"], ["secondary", "SECONDARY"]]), "SCALE")
        .appendField("y scale");
    this.setPreviousStatement(true, "configure_dataseries");
    this.setNextStatement(true, "configure_dataseries");
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_y_axis_limits'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set ")
        .appendField(new Blockly.FieldDropdown([["primary", "primary_scale"], ["secondary", "secondary_scale"]]), "SCALE")
        .appendField("y axis limits to")
        .appendField(new Blockly.FieldNumber(0), "LIMIT_1")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(0), "LIMIT_2");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['configure_axis'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Configure")
        .appendField(new Blockly.FieldDropdown([["x", "X_AXIS"], ["primary y", "PRIMARY_Y_AXIS"], ["secondary y", "SECONDARY_Y_AXIS"]]), "AXIS")
        .appendField("axis:");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("limits:")
        .appendField(new Blockly.FieldNumber(0), "MIN")
        .appendField(",")
        .appendField(new Blockly.FieldNumber(10), "MAX");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("label")
        .appendField(new Blockly.FieldTextInput(""), "LABEL");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("tick frequency")
        .appendField(new Blockly.FieldNumber(0), "TICK_FREQUENCY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['set_axis_label'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set label to")
        .appendField(new Blockly.FieldTextInput(""), "NAME");
    this.setPreviousStatement(true, "config_axis");
    this.setNextStatement(true, "config_axis");
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};