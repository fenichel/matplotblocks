Blockly.Blocks['create_graph'] = {
init: function() {
    this.appendDummyInput()
        .appendField("Create line plot with ")
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
    this.appendStatementInput("ADD_DATA_TO_PRIMARY_Y_AXIS")
        .setCheck("configure_plot")
        .appendField("add data to primary y axis:");
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210)
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
        this.moveInputBefore('CONFIG_SECONDARY_Y_AXIS', 'ADD_DATA_TO_PRIMARY_Y_AXIS');
      }
    } else if (inputExists) {
      this.removeInput('CONFIG_SECONDARY_Y_AXIS');
    }

    inputExists = this.getInput('ADD_DATA_TO_SECONDARY_Y_AXIS');
    if (secondary_axis) {
      if (!inputExists) {
        this.appendStatementInput("ADD_DATA_TO_SECONDARY_Y_AXIS")
            .setCheck("configure_plot")
            .appendField("add data to secondary y axis:");
      }
    } else if (inputExists) {
      this.removeInput('ADD_DATA_TO_SECONDARY_Y_AXIS');
    }
  }
};
Blockly.Blocks['create_scatter_plot'] = {
init: function() {
    this.appendDummyInput()
        .appendField("Create scatter plot with ")
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
    this.appendStatementInput("ADD_DATA_TO_PRIMARY_Y_AXIS")
        .setCheck("configure_plot")
        .appendField("add data to primary y axis:");
    this.setNextStatement(true, null);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210)
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
        this.moveInputBefore('CONFIG_SECONDARY_Y_AXIS', 'ADD_DATA_TO_PRIMARY_Y_AXIS');
      }
    } else if (inputExists) {
      this.removeInput('CONFIG_SECONDARY_Y_AXIS');
    }

    inputExists = this.getInput('ADD_DATA_TO_SECONDARY_Y_AXIS');
    if (secondary_axis) {
      if (!inputExists) {
        this.appendStatementInput("ADD_DATA_TO_SECONDARY_Y_AXIS")
            .setCheck("configure_plot")
            .appendField("add data to secondary y axis:");
      }
    } else if (inputExists) {
      this.removeInput('ADD_DATA_TO_SECONDARY_Y_AXIS');
    }
  }
};

var block_arr = [
{
  "type": "set_x_axis_label",
  "message0": "set x axis label to %1",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME",
      "check": "String"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "set_y_axis_label",
  "message0": "set y axis label %1",
  "args0": [
    {
      "type": "input_value",
      "name": "NAME",
      "check": "String"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "add_data",
  "message0": "add data %1",
  "args0": [
    {
      "type": "input_value",
      "name": "DATA",
      "check": "String"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "add_data_two",
  "message0": "add data x %1 y %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "DATA_x",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "DATA_Y",
      "align": "RIGHT"
    },
    {
      "type": "input_statement",
      "name": "NAME",
      "check": "configure_dataseries"
    }
  ],
  "previousStatement": "configure_plot",
  "nextStatement": "configure_plot",
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "specify_variable",
  "message0": "variable name: %1",
  "args0": [
    {
      "type": "field_input",
      "name": "VARIABLE_NAME",
      "text": ""
    }
  ],
  "output": null,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "set_axis_limits",
  "message0": "Set limits to %1 , %2",
  "args0": [
    {
      "type": "field_number",
      "name": "LIMIT_1",
      "value": 0
    },
    {
      "type": "field_number",
      "name": "LIMIT_2",
      "value": 10
    }
  ],
  "previousStatement": "config_axis",
  "nextStatement": "config_axis",
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "set_axis_label",
  "message0": "set label to %1",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": ""
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "dataseries_set_color",
  "message0": "set color %1",
  "args0": [
    {
      "type": "field_colour",
      "name": "NAME",
      "colour": "#ff0000"
    }
  ],
  "previousStatement": "configure_dataseries",
  "nextStatement": "configure_dataseries",
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "dataseries_set_linewidth",
  "message0": "set line width %1",
  "args0": [
    {
      "type": "field_number",
      "name": "WIDTH",
      "value": 1
    }
  ],
  "previousStatement": "configure_dataseries",
  "nextStatement": "configure_dataseries",
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "dataseries_set_linestyle",
  "message0": "set line style %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "STYLE",
      "options": [
        [
          "solid",
          "-"
        ],
        [
          "dashed",
          "--"
        ],
        [
          "dashdot",
          "-."
        ],
        [
          "dotted",
          ":"
        ],
        [
          "don't draw",
          "None"
        ]
      ]
    }
  ],
  "previousStatement": "configure_dataseries",
  "nextStatement": "configure_dataseries",
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "dataseries_set_marker",
  "message0": "set marker style %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "MARKER",
      "options": [
        [
          "point",
          "."
        ],
        [
          "square",
          "s"
        ],
        [
          "circle",
          "o"
        ],
        [
          "x",
          "x"
        ],
        [
          "plus",
          "+"
        ],
        [
          "triangle down",
          "v"
        ],
        [
          "no marker",
          "None"
        ],
        [
          "octagon",
          "8"
        ],
        [
          "pentagon",
          "p"
        ],
        [
          "star",
          "*"
        ],
        [
          "pixel",
          ","
        ],
        [
          "hexagon1",
          "h"
        ],
        [
          "diamond",
          "D"
        ],
        [
          "thin diamond",
          "d"
        ],
        [
          "vline",
          "|"
        ],
        [
          "hline",
          "_"
        ],
        [
          "tick left",
          "TICKLEFT"
        ],
        [
          "tick right",
          "TICKRIGHT"
        ],
        [
          "tick up",
          "TICKUP"
        ],
        [
          "tick down",
          "TICKDOWN"
        ],
        [
          "caret left",
          "CARETLEFT"
        ],
        [
          "caret right",
          "CARETRIGHT"
        ],
        [
          "caret up",
          "CARETUP"
        ],
        [
          "caret down",
          "CARETDOWN"
        ],
        [
          "triangle up",
          "^"
        ],
        [
          "triangle left",
          "<"
        ],
        [
          "triangle right",
          ">"
        ],
        [
          "tri down",
          "1"
        ],
        [
          "tri up",
          "2"
        ],
        [
          "tri left",
          "3"
        ],
        [
          "tri right",
          "4"
        ]
      ]
    }
  ],
  "previousStatement": "configure_dataseries",
  "nextStatement": "configure_dataseries",
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "set_axis_ticks",
  "message0": "set tick frequency to %1",
  "args0": [
    {
      "type": "field_number",
      "name": "FREQUENCY",
      "value": 1
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 330,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "create_scale",
  "lastDummyAlign0": "RIGHT",
  "message0": "create scale %1 with y limits %2 , %3",
  "args0": [
    {
      "type": "field_input",
      "name": "SCALE_NAME",
      "text": "scale one"
    },
    {
      "type": "field_number",
      "name": "Y_MIN",
      "value": 0
    },
    {
      "type": "field_number",
      "name": "Y_MAX",
      "value": 10
    }
  ],
  "previousStatement": "configure_plot",
  "nextStatement": "configure_plot",
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "pick_scale",
  "message0": "use %1 y scale",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "SCALE",
      "options": [
        [
          "primary",
          "PRIMARY"
        ],
        [
          "secondary",
          "SECONDARY"
        ]
      ]
    }
  ],
  "previousStatement": "configure_dataseries",
  "nextStatement": "configure_dataseries",
  "colour": 120,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "set_y_axis_limits",
  "message0": "Set  %1 y axis limits to %2 , %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "SCALE",
      "options": [
        [
          "primary",
          "primary_scale"
        ],
        [
          "secondary",
          "secondary_scale"
        ]
      ]
    },
    {
      "type": "field_number",
      "name": "LIMIT_1",
      "value": 0
    },
    {
      "type": "field_number",
      "name": "LIMIT_2",
      "value": 0
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "configure_axis",
  "lastDummyAlign0": "RIGHT",
  "message0": "Configure %1 axis: %2 limits: %3 , %4 %5 label %6 %7 tick frequency %8",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "AXIS",
      "options": [
        [
          "x",
          "X_AXIS"
        ],
        [
          "primary y",
          "PRIMARY_Y_AXIS"
        ],
        [
          "secondary y",
          "SECONDARY_Y_AXIS"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "align": "RIGHT"
    },
    {
      "type": "field_number",
      "name": "MIN",
      "value": 0
    },
    {
      "type": "field_number",
      "name": "MAX",
      "value": 10
    },
    {
      "type": "input_dummy",
      "align": "RIGHT"
    },
    {
      "type": "field_input",
      "name": "LABEL",
      "text": ""
    },
    {
      "type": "input_dummy",
      "align": "RIGHT"
    },
    {
      "type": "field_number",
      "name": "TICK_FREQUENCY",
      "value": 0
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "tooltip": "",
  "helpUrl": ""
}]