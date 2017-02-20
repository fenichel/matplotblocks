Blockly.Blocks['create_line_plot'] = {
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
        .setCheck("axis_config")
        .appendField("x axis configuration");
    this.appendStatementInput("CONFIG_PRIMARY_Y_AXIS")
        .setCheck("axis_config")
        .appendField("y axis configuration");
    this.appendStatementInput("ADD_DATA_TO_PRIMARY_Y_AXIS")
        .setCheck("dataseries_config_outer")
        .appendField("add data to primary y axis:");
    this.setNextStatement(true, "plot_config");
    this.setTooltip('Create a line plot');
    this.setHelpUrl('http://matplotlib.org/api/pyplot_api.html#matplotlib.pyplot.plot');
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
            .setCheck("axis_config")
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
            .setCheck("dataseries_config_outer")
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
        .setCheck("axis_config")
        .appendField("x axis configuration");
    this.appendStatementInput("CONFIG_PRIMARY_Y_AXIS")
        .setCheck("axis_config")
        .appendField("y axis configuration");
    this.appendStatementInput("ADD_DATA_TO_PRIMARY_Y_AXIS")
        .setCheck("dataseries_config_outer")
        .appendField("add data to primary y axis:");
    this.setNextStatement(true, "plot_config");
    this.setTooltip('Create a scatter plot');
    this.setHelpUrl('http://matplotlib.org/api/pyplot_api.html#matplotlib.pyplot.scatter');
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
            .setCheck("axis_config")
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
            .setCheck("dataseries_config_outer")
            .appendField("add data to secondary y axis:");
      }
    } else if (inputExists) {
      this.removeInput('ADD_DATA_TO_SECONDARY_Y_AXIS');
    }
  }
};

var block_arr = [
{
  "type": "add_dataseries",
  "message0": "add data x %1 y %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "DATA_x",
      "check": "variable_name"
    },
    {
      "type": "input_value",
      "name": "DATA_Y",
      "check": "variable_name",
      "align": "RIGHT"
    },
    {
      "type": "input_statement",
      "name": "NAME",
      "check": "dataseries_config"
    }
  ],
  "previousStatement": "dataseries_config_outer",
  "nextStatement": "dataseries_config_outer",
  "colour": 120,
  "tooltip": "Add data to a line plot or a scatter plot",
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
  "previousStatement": "axis_config",
  "nextStatement": "axis_config",
  "colour": 330,
  "tooltip": "Set limits for an x or y axis",
  "helpUrl": "http://matplotlib.org/api/axes_api.html#axis-limits-and-direction"
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
  "previousStatement": "axis_config",
  "nextStatement": "axis_config",
  "colour": 330,
  "tooltip": "Set the label on an x or y axis",
  "helpUrl": "http://matplotlib.org/api/axes_api.html#axis-labels-title-and-legend"
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
  "previousStatement": "dataseries_config",
  "nextStatement": "dataseries_config",
  "colour": 120,
  "tooltip": "Set the color of data being plotted",
  "helpUrl": "http://matplotlib.org/api/lines_api.html#matplotlib.lines.Line2D.set_color"
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
  "previousStatement": "dataseries_config",
  "nextStatement": "dataseries_config",
  "colour": 120,
  "tooltip": "Set the width of a line on a line plot",
  "helpUrl": "http://matplotlib.org/api/lines_api.html#matplotlib.lines.Line2D.set_linewidth"
},
{
  "type": "dataseries_set_label",
  "message0": "set label to %1",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": ""
    }
  ],
  "previousStatement": "dataseries_config",
  "nextStatement": "dataseries_config",
  "colour": 120,
  "tooltip": "Set the label that will be used if a legend is created",
  "helpUrl": "http://matplotlib.org/api/_as_gen/matplotlib.artist.Artist.set_label.html#matplotlib.artist.Artist.set_label"
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
  "previousStatement": "dataseries_config",
  "nextStatement": "dataseries_config",
  "colour": 120,
  "tooltip": "Set the style of the line (e.g. dashed, dotted, solid)",
  "helpUrl": "http://matplotlib.org/api/lines_api.html#matplotlib.lines.Line2D.set_linestyle"
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
          "no marker",
          "None"
        ],
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
  "previousStatement": "dataseries_config",
  "nextStatement": "dataseries_config",
  "colour": 120,
  "tooltip": "Set markers for data points (e.g. circles, squares, crosses)",
  "helpUrl": "http://matplotlib.org/api/lines_api.html#matplotlib.lines.Line2D.set_marker"
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
  "previousStatement": "axis_config",
  "nextStatement": "axis_config",
  "colour": 330,
  "tooltip": "Set frequency of markers on the given axis",
  "helpUrl": "http://matplotlib.org/api/_as_gen/matplotlib.axis.YAxis.set_major_locator.html#matplotlib.axis.YAxis.set_major_locator"
},
{
  "type": "add_legend",
  "lastDummyAlign0": "RIGHT",
  "message0": "add legend for %1 %2 in position %3 %4 marker at %5 %6 title %7",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "WHICH_AXES",
      "options": [
        [
          "primary y axis",
          "PRIMARY"
        ],
        [
          "secondary y axis",
          "SECONDARY"
        ],
        [
          "both y axes",
          "BOTH"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "LOCATION",
      "options": [
        [
          "best",
          "best"
        ],
        [
          "upper right",
          "upper right"
        ],
        [
          "upper left",
          "upper left"
        ],
        [
          "lower left",
          "lower left"
        ],
        [
          "lower right",
          "lower right"
        ],
        [
          "right",
          "right"
        ],
        [
          "center left",
          "center left"
        ],
        [
          "center right",
          "center right"
        ],
        [
          "lower center",
          "lower center"
        ],
        [
          "upper center",
          "upper center"
        ],
        [
          "center",
          "center"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "align": "RIGHT"
    },
    {
      "type": "field_dropdown",
      "name": "MARKER_POSITION",
      "options": [
        [
          "left",
          "LEFT"
        ],
        [
          "right",
          "RIGHT"
        ]
      ]
    },
    {
      "type": "input_dummy",
      "align": "RIGHT"
    },
    {
      "type": "field_input",
      "name": "TITLE",
      "text": ""
    }
  ],
  "previousStatement": "plot_config",
  "nextStatement": "plot_config",
  "colour": 210,
  "tooltip": "Add a legend to the plot",
  "helpUrl": "http://matplotlib.org/api/pyplot_api.html#matplotlib.pyplot.legend"
},
{
  "type": "set_plot_title",
  "message0": "set plot title to %1 at %2",
  "args0": [
    {
      "type": "field_input",
      "name": "TITLE",
      "text": "Placeholder title"
    },
    {
      "type": "field_dropdown",
      "name": "POSITION",
      "options": [
        [
          "center",
          "center"
        ],
        [
          "left",
          "left"
        ],
        [
          "right",
          "right"
        ]
      ]
    }
  ],
  "previousStatement": "plot_config",
  "nextStatement": "plot_config",
  "colour": 210,
  "tooltip": "Add a title to the plot",
  "helpUrl": "http://matplotlib.org/api/pyplot_api.html#matplotlib.pyplot.title"
},
{
  "type": "specify_variable",
  "message0": "variable name %1",
  "args0": [
    {
      "type": "field_input",
      "name": "VARIABLE_NAME",
      "text": ""
    }
  ],
  "output": "variable_name",
  "tooltip": "The name of a variable in your python code",
  "helpUrl": ""
}]