/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Matplotlib for blocks.
 * @author fenichr@gmail.com
 */
'use strict';

goog.provide('Blockly.Matplotlib');

goog.require('Blockly.Generator');


/**
 * Matplotlib code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Matplotlib = new Blockly.Generator('Matplotlib');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Matplotlib.addReservedWords(
    // import keyword
    // print ','.join(keyword.kwlist)
    // http://docs.Matplotlib.org/reference/lexical_analysis.html#keywords
    'and,as,assert,break,class,continue,def,del,elif,else,except,exec,' +
    'finally,for,from,global,if,import,in,is,lambda,not,or,pass,print,raise,' +
    'return,try,while,with,yield,' +
    //http://docs.Matplotlib.org/library/constants.html
    'True,False,None,NotImplemented,Ellipsis,__debug__,quit,exit,copyright,' +
    'license,credits,' +
    // http://docs.Matplotlib.org/library/functions.html
    'abs,divmod,input,open,staticmethod,all,enumerate,int,ord,str,any,eval,' +
    'isinstance,pow,sum,basestring,execfile,issubclass,print,super,bin,file,' +
    'iter,property,tuple,bool,filter,len,range,type,bytearray,float,list,' +
    'raw_input,unichr,callable,format,locals,reduce,unicode,chr,frozenset,' +
    'long,reload,vars,classmethod,getattr,map,repr,xrange,cmp,globals,max,' +
    'reversed,zip,compile,hasattr,memoryview,round,__import__,complex,hash,' +
    'min,set,apply,delattr,help,next,setattr,buffer,dict,hex,object,slice,' +
    'coerce,dir,id,oct,sorted,intern'
);

/**
 * Order of operation ENUMs.
 * http://docs.Matplotlib.org/reference/expressions.html#summary
 */
Blockly.Matplotlib.ORDER_ATOMIC = 0;            // 0 "" ...
Blockly.Matplotlib.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Blockly.Matplotlib.ORDER_STRING_CONVERSION = 1; // `expression...`
Blockly.Matplotlib.ORDER_MEMBER = 2.1;          // . []
Blockly.Matplotlib.ORDER_FUNCTION_CALL = 2.2;   // ()
Blockly.Matplotlib.ORDER_EXPONENTIATION = 3;    // **
Blockly.Matplotlib.ORDER_UNARY_SIGN = 4;        // + -
Blockly.Matplotlib.ORDER_BITWISE_NOT = 4;       // ~
Blockly.Matplotlib.ORDER_MULTIPLICATIVE = 5;    // * / // %
Blockly.Matplotlib.ORDER_ADDITIVE = 6;          // + -
Blockly.Matplotlib.ORDER_BITWISE_SHIFT = 7;     // << >>
Blockly.Matplotlib.ORDER_BITWISE_AND = 8;       // &
Blockly.Matplotlib.ORDER_BITWISE_XOR = 9;       // ^
Blockly.Matplotlib.ORDER_BITWISE_OR = 10;       // |
Blockly.Matplotlib.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
                                            //     <, <=, >, >=, <>, !=, ==
Blockly.Matplotlib.ORDER_LOGICAL_NOT = 12;      // not
Blockly.Matplotlib.ORDER_LOGICAL_AND = 13;      // and
Blockly.Matplotlib.ORDER_LOGICAL_OR = 14;       // or
Blockly.Matplotlib.ORDER_CONDITIONAL = 15;      // if else
Blockly.Matplotlib.ORDER_LAMBDA = 16;           // lambda
Blockly.Matplotlib.ORDER_NONE = 99;             // (...)

/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.Matplotlib.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.Matplotlib.ORDER_FUNCTION_CALL, Blockly.Matplotlib.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.Matplotlib.ORDER_FUNCTION_CALL, Blockly.Matplotlib.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.Matplotlib.ORDER_MEMBER, Blockly.Matplotlib.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.Matplotlib.ORDER_MEMBER, Blockly.Matplotlib.ORDER_FUNCTION_CALL],

  // not (not foo) -> not not foo
  [Blockly.Matplotlib.ORDER_LOGICAL_NOT, Blockly.Matplotlib.ORDER_LOGICAL_NOT],
  // a and (b and c) -> a and b and c
  [Blockly.Matplotlib.ORDER_LOGICAL_AND, Blockly.Matplotlib.ORDER_LOGICAL_AND],
  // a or (b or c) -> a or b or c
  [Blockly.Matplotlib.ORDER_LOGICAL_OR, Blockly.Matplotlib.ORDER_LOGICAL_OR]
];

Blockly.Matplotlib.workspaceToCode = function(workspace) {
  if (!workspace) {
    // Backwards compatibility from before there could be multiple workspaces.
    console.warn('No workspace specified in workspaceToCode call.  Guessing.');
    workspace = Blockly.getMainWorkspace();
  }
  var code = [];
  this.init(workspace);
  var blocks = workspace.getTopBlocks(true);
  for (var x = 0, block; block = blocks[x]; x++) {
    var chunk = this.stackToCode(block);
    if (chunk) {
    	code.push(chunk);
    }
  }
  code = code.join('\n');  // Blank line between each section.
  code = this.finish(code);
  // Final scrubbing of whitespace.
  code = code.replace(/^\s+\n/, '');
  code = code.replace(/\n\s+$/, '\n');
  code = code.replace(/[ \t]+\n/g, '\n');
  return code;
};

Blockly.Matplotlib.stackToCode = function(block) {
	if (!block) {
		return [];
	}
	var code = [];
	while (block) {
		var line = this.blockToCode(block);
		if (goog.isArray(line)) {
      		// Value blocks return tuples of code and operator order.
      		// Top-level blocks don't care about operator order.
      		line = line[0];
		}
	    if (line) {
	      if (block.outputConnection && this.scrubNakedValue) {
	        // This block is a naked value.  Ask the language's code generator if
	        // it wants to append a semicolon, or something.
	        line = this.scrubNakedValue(line);
	      }
	      code.push(line);
	    }
	    block = block.getNextBlock();
	}
	code = code.join('');
	return code;
};

Blockly.Matplotlib.blockToCode = function(block) {
  if (!block || block.disabled) {
    return '';
  }

  var func = this[block.type];
  goog.asserts.assertFunction(func,
      'Language "%s" does not know how to generate code for block type "%s".',
      this.name_, block.type);
  // First argument to func.call is the value of 'this' in the generator.
  // Prior to 24 September 2013 'this' was the only way to access the block.
  // The current prefered method of accessing the block is through the second
  // argument to func.call, which becomes the first parameter to the generator.
  var code = func.call(block, block);
  if (goog.isArray(code)) {
    // Value blocks return tuples of code and operator order.
    goog.asserts.assert(block.outputConnection,
        'Expecting string from statement block "%s".', block.type);
    return [this.scrub_(block, code[0]), code[1]];
  } else if (goog.isString(code)) {
    var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
    if (this.STATEMENT_PREFIX) {
      code = this.STATEMENT_PREFIX.replace(/%1/g, '\'' + id + '\'') +
          code;
    }
    return this.scrub_(block, code);
  } else if (code === null) {
    // Block has handled code generation itself.
    return '';
  } else {
    goog.asserts.fail('Invalid code generated: %s', code);
  }
};

/**
 * Generate code representing the statement.  Indent the code.
 * @param {!Blockly.Block} block The block containing the input.
 * @param {string} name The name of the input.
 * @return {string} Generated code or '' if no blocks are connected.
 */
Blockly.Matplotlib.statementToCode = function(block, name) {
  var targetBlock = block.getInputTargetBlock(name);
  if (!targetBlock) {
    return '';
  }
  var code = this.stackToCode(targetBlock);
  // Value blocks must return code and order of operations info.
  // Statement blocks must only return code.
  goog.asserts.assertString(code, 'Expecting code from statement block "%s".',
      targetBlock && targetBlock.type);
  if (code) {
    code = this.prefixLines(/** @type {string} */ (code), this.INDENT);
  }
  return code;
};



/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Matplotlib.init = function(workspace) {
  /**
   * Empty loops or conditionals are not allowed in Python.
   */
  Blockly.Matplotlib.PASS = this.INDENT + 'pass\n';
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Matplotlib.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Matplotlib.functionNames_ = Object.create(null);

  if (!Blockly.Matplotlib.variableDB_) {
    Blockly.Matplotlib.variableDB_ =
        new Blockly.Names(Blockly.Matplotlib.RESERVED_WORDS_);
  } else {
    Blockly.Matplotlib.variableDB_.reset();
  }

  var defvars = [];
  var variables = workspace.variableList;
  for (var i = 0; i < variables.length; i++) {
    defvars[i] = Blockly.Matplotlib.variableDB_.getName(variables[i],
        Blockly.Variables.NAME_TYPE) + ' = None';
  }
  Blockly.Matplotlib.definitions_['variables'] = defvars.join('\n');

  Blockly.Matplotlib.axisConfigs = {
  	"x": {},
  	"y1": {},  
  	"y2": {}
  };

  Blockly.Matplotlib.secondaryYAxis = false;

  Blockly.Matplotlib.dataConfigurations = {
    "y1": [],  
    "y2": []
  };

  Blockly.Matplotlib.currDataSink = null;
};

Blockly.Matplotlib.getDefaultAxisConfig = function() {
	return {
		"label": "",
		"tick_frequency": 0,
		"limits": []
	}
};

Blockly.Matplotlib.emitXAxisConfig = function() {
  var xAxisConfig = Blockly.Matplotlib.axisConfigs["x"];
  var xAxisConfigCode = "";
  if (xAxisConfig["label"]) {
    xAxisConfigCode += "primary_scale.set_xlabel(\'" +
        xAxisConfig["label"] + "\')\n";
  }
  if (xAxisConfig["tick_frequency"]) {
    xAxisConfigCode += "primary_scale.xaxis.set_major_locator(" + 
        "ticker.MultipleLocator(" + xAxisConfig["tick_frequency"] + "))\n"
  }
  var limits = xAxisConfig["limits"];
  if (limits && limits.length == 2) {
    xAxisConfigCode += "primary_scale.set_xlim([" + limits[0] + ", " +
        limits[1]+ "])\n";
  }
  return xAxisConfigCode;
};

Blockly.Matplotlib.emitYAxisConfig = function(primary) {
  var scaleName = primary ? "primary_scale" : "secondary_scale";
  var configName = primary ? "y1" : "y2";

  var yAxisConfig = Blockly.Matplotlib.axisConfigs[configName];
  var scaleName = primary ? "primary_scale" : "secondary_scale";

  var yAxisConfigCode = "";

  if (yAxisConfig["label"]) {
    var code = scaleName + ".set_ylabel(\'" + yAxisConfig["label"] + "\')\n";
    yAxisConfigCode += code;
  }
  if (yAxisConfig["tick_frequency"]) {
    var code = scaleName + ".yaxis.set_major_locator(" + 
        "ticker.MultipleLocator(" + yAxisConfig["tick_frequency"] + "))\n"
    yAxisConfigCode += code;
  }

  var limits = yAxisConfig["limits"];
  if (limits && limits.length == 2) {
    var code = scaleName + ".set_ylim([" + limits[0] + ", " +
        limits[1]+ "])\n";
    yAxisConfigCode += code;
  }
  return yAxisConfigCode;
};

Blockly.Matplotlib.emitAxisConfigurations = function() {
	var code = "";

	var xAxisConfigCode = Blockly.Matplotlib.emitXAxisConfig();
  if (xAxisConfigCode) {
    code += "\n# X axis configuration\n" + xAxisConfigCode;
  }
  var y1AxisConfigCode = Blockly.Matplotlib.emitYAxisConfig(true);
  if (y1AxisConfigCode) {
    code += "\n# Primary Y axis configuration\n" + y1AxisConfigCode;
  }

  if (Blockly.Matplotlib.secondaryYAxis) {
    var y2AxisConfigCode = Blockly.Matplotlib.emitYAxisConfig(false);
    if (y2AxisConfigCode) {
      code += "\n# Secondary Y axis configuration\n" + y2AxisConfigCode;
    }
  }

  if (code) {
    code = "\n# Axis configuration must come after the data is plotted.\n" +
        code;
  }
	return code;
};

Blockly.Matplotlib.emitLineConfiguration = function(config) {
  var code = "";
  if (config["color"]) {
    var line = ", color=\'" + config["color"] + "\'";
    code += line;
  }
  if (config["linestyle"] && Blockly.Matplotlib.plotType == "LINE") {
    var line = ", linestyle=\'" + config["linestyle"] + "\'";
    code += line;
  }
  if (config["marker"]) {
    var line = ", marker=\'" + config["marker"] + "\'";
    code += line;
  }
  if (config["linewidth"]) {
    var line = ", linewidth=\'" + config["linewidth"] + "\'";
    code += line;
  }
  return code;
};

Blockly.Matplotlib.emitDataConfigurations = function(primary) {
  var plotCommand = Blockly.Matplotlib.plotType == 'LINE' ? '.plot(' :
      '.scatter(';

  var code = "";
  var axis = primary ? "y1" : "y2";
  var scale = primary ? "primary_scale" : "secondary_scale";
  var configList = Blockly.Matplotlib.dataConfigurations[axis];
  for (var i = 0; i < configList.length; i++) {
    var cur = configList[i];
    var tmpCode = scale + plotCommand + cur["x"] + ", " + cur["y"] + 
        Blockly.Matplotlib.emitLineConfiguration(cur) + ")\n";
    code += tmpCode; 
  }
  if (code) {
    var axisName = primary ? "primary" : "secondary";
    code = "\n# Plot data on " + axisName + " y axis\n" + code;
  }
  return code;
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Matplotlib.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.Matplotlib.definitions_) {
    var def = Blockly.Matplotlib.definitions_[name];
    if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }

  var axisConfigs = Blockly.Matplotlib.emitAxisConfigurations();

  var baseCode = "figure, primary_scale = plt.subplots()\n";
  if (Blockly.Matplotlib.secondaryYAxis) {
    baseCode += "secondary_scale = primary_scale.twinx()\n";
  }

  var plotCode = Blockly.Matplotlib.emitDataConfigurations(true) + "\n";
  if (Blockly.Matplotlib.secondaryYAxis) {
    plotCode += Blockly.Matplotlib.emitDataConfigurations(false)
    plotCode += "\n";
  }

  // Clean up temporary data.
  delete Blockly.Matplotlib.definitions_;
  delete Blockly.Matplotlib.functionNames_;
  Blockly.Matplotlib.variableDB_.reset();
  var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n\n') +
  		'\n\n';
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + 
      baseCode + plotCode + axisConfigs;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Matplotlib.scrubNakedValue = function(line) {
  return line + '\n';
};

/**
 * Encode a string as a properly escaped Matplotlib string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Matplotlib string.
 * @private
 */
Blockly.Matplotlib.quote_ = function(string) {
  // Can't use goog.string.quote since % must also be escaped.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\%/g, '\\%');

  // Follow the CMatplotlib behaviour of repr() for a non-byte string.
  var quote = '\'';
  if (string.indexOf('\'') !== -1) {
    if (string.indexOf('"') === -1) {
      quote = '"';
    } else {
      string = string.replace(/'/g, '\\\'');
    }
  };
  return quote + string + quote;
};

/**
 * Common tasks for generating Matplotlib from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Matplotlib code created for this block.
 * @return {string} Matplotlib code with comments and subsequent blocks added.
 * @private
 */
Blockly.Matplotlib.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.Matplotlib.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        commentCode += '"""' + comment + '\n"""\n';
      } else {
        commentCode += Blockly.Matplotlib.prefixLines(comment + '\n', '# ');
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Matplotlib.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Matplotlib.prefixLines(comment, '# ');
          }
        }
      }
    }
  }
  return commentCode + code;
};

/**
 * Gets a property and adjusts the value, taking into account indexing, and
 * casts to an integer.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @return {string|number}
 */
Blockly.Matplotlib.getAdjustedInt = function(block, atId, opt_delta, opt_negate) {
  var delta = opt_delta || 0;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  var atOrder = delta ? Blockly.Matplotlib.ORDER_ADDITIVE :
      Blockly.Matplotlib.ORDER_NONE;
  var at = Blockly.Matplotlib.valueToCode(block, atId, atOrder) || defaultAtIndex;

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseInt(at, 10) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = 'int(' + at + ' + ' + delta + ')';
    } else if (delta < 0) {
      at = 'int(' + at + ' - ' + -delta + ')';
    } else {
      at = 'int(' + at + ')';
    }
    if (opt_negate) {
      at = '-' + at;
    }
  }
  return at;
};
