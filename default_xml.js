
var defaultXml = '<xml xmlns="http://www.w3.org/1999/xhtml">' +
  '<block type="create_line_plot" id="_qU**`G._i9a5H-vjl^v" x="0" y="88">' +
    '<mutation secondary_axis="true"></mutation>' +
    '<field name="NUM_Y_AXES">2</field>' +
    '<statement name="CONFIG_X_AXIS">' +
      '<block type="set_axis_label" id="`iBzy?MThtR}|/n{q.qf">' +
        '<field name="NAME">my first x axis</field>' +
        '<next>' +
          '<block type="set_axis_ticks" id="hWNcl,(hfq,A0hV[Lb?!">' +
            '<field name="FREQUENCY">1</field>' +
            '<next>' +
              '<block type="set_axis_limits" id="Af@EELp:8FR(FZ$:|Rtf">' +
                '<field name="LIMIT_1">0</field>' +
                '<field name="LIMIT_2">10</field>' +
              '</block>' +
            '</next>' +
          '</block>' +
        '</next>' +
      '</block>' +
    '</statement>' +
    '<statement name="CONFIG_PRIMARY_Y_AXIS">' +
      '<block type="set_axis_label" id="7JW?o8|?//;qPv%gDr{1">' +
        '<field name="NAME">myfirst y axis</field>' +
      '</block>' +
    '</statement>' +
    '<statement name="CONFIG_SECONDARY_Y_AXIS">' +
      '<block type="set_axis_label" id="nzd5R,-qflkt*57I8~Yb">' +
        '<field name="NAME">my second y axis</field>' +
      '</block>' +
    '</statement>' +
    '<statement name="ADD_DATA_TO_PRIMARY_Y_AXIS">' +
      '<block type="add_dataseries" id="4zes=.CKWJ|V[0fauR@e">' +
        '<value name="DATA_x">' +
          '<shadow type="specify_variable" id="eNl]COXW;Q[0U8_kU5=a">' +
            '<field name="VARIABLE_NAME">my_first_big_data</field>' +
          '</shadow>' +
        '</value>' +
        '<value name="DATA_Y">' +
          '<shadow type="specify_variable" id="_NW!WWybWmAdUC3r70*x">' +
            '<field name="VARIABLE_NAME">my_second_big_data</field>' +
          '</shadow>' +
        '</value>' +
        '<statement name="NAME">' +
          '<block type="dataseries_set_color" id="xSLKr/tsO2?obKa0EW3G">' +
            '<field name="NAME">#ff0000</field>' +
            '<next>' +
              '<block type="dataseries_set_linewidth" id=",OQ8,r$iq[;Y~9)(qK-a">' +
                '<field name="WIDTH">1</field>' +
                '<next>' +
                  '<block type="dataseries_set_linestyle" id=".]^LS55]+A|78H#O:g+Q">' +
                    '<field name="STYLE">-</field>' +
                    '<next>' +
                      '<block type="dataseries_set_marker" id="-dFFd;D!zL,:itszs)[u">' +
                        '<field name="MARKER">.</field>' +
                      '</block>' +
                    '</next>' +
                  '</block>' +
                '</next>' +
              '</block>' +
            '</next>' +
          '</block>' +
        '</statement>' +
      '</block>' +
    '</statement>' +
    '<statement name="ADD_DATA_TO_SECONDARY_Y_AXIS">' +
      '<block type="add_dataseries" id="Vgj[gGX/i9R,8[j!f6Ab">' +
        '<value name="DATA_x">' +
          '<shadow type="specify_variable" id=").mB`f%YKc?iivgegzyz">' +
            '<field name="VARIABLE_NAME">more_data</field>' +
          '</shadow>' +
        '</value>' +
        '<value name="DATA_Y">' +
          '<shadow type="specify_variable" id="`Y28jJwKjOQi52-1l-}M">' +
            '<field name="VARIABLE_NAME">list2</field>' +
          '</shadow>' +
        '</value>' +
        '<statement name="NAME">' +
          '<block type="dataseries_set_color" id="unl:(b=z@EtP#y/OTX/=">' +
            '<field name="NAME">#ff0000</field>' +
            '<next>' +
              '<block type="dataseries_set_linewidth" id="uN#0W:AAe|Y-V=66L/HN">' +
                '<field name="WIDTH">1</field>' +
                '<next>' +
                  '<block type="dataseries_set_linestyle" id="Nyi%e8?/|T`hi@OCp)wA">' +
                    '<field name="STYLE">-</field>' +
                    '<next>' +
                      '<block type="dataseries_set_marker" id="Nc-r2yq9Zr]On~R.:$/J">' +
                        '<field name="MARKER">.</field>' +
                      '</block>' +
                    '</next>' +
                  '</block>' +
                '</next>' +
              '</block>' +
            '</next>' +
          '</block>' +
        '</statement>' +
      '</block>' +
    '</statement>' +
  '</block>' +
'</xml>';