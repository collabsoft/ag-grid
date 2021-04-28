"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@ag-grid-community/core");
var excelXmlFactory_1 = require("./excelXmlFactory");
var baseExcelSerializingSession_1 = require("./baseExcelSerializingSession");
var ExcelXmlSerializingSession = /** @class */ (function (_super) {
    __extends(ExcelXmlSerializingSession, _super);
    function ExcelXmlSerializingSession() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExcelXmlSerializingSession.prototype.createExcel = function (data) {
        return excelXmlFactory_1.ExcelXmlFactory.createExcel(this.excelStyles, data);
    };
    ExcelXmlSerializingSession.prototype.getDataTypeForValue = function (valueForCell) {
        return core_1._.isNumeric(valueForCell) ? 'Number' : 'String';
    };
    ExcelXmlSerializingSession.prototype.getType = function (type, style, value) {
        if (this.isFormula(value)) {
            return 'Formula';
        }
        if (style && style.dataType) {
            switch (style.dataType.toLocaleLowerCase()) {
                case 'string':
                    return 'Formula';
                case 'number':
                    return 'Number';
                case 'datetime':
                    return 'DateTime';
                case 'error':
                    return 'Error';
                case 'boolean':
                    return 'Boolean';
                default:
                    console.warn("ag-grid: Unrecognized data type for excel export [" + style.id + ".dataType=" + style.dataType + "]");
            }
        }
        return type;
    };
    ExcelXmlSerializingSession.prototype.addImage = function () {
        return;
    };
    ExcelXmlSerializingSession.prototype.createCell = function (styleId, type, value) {
        var _this = this;
        var actualStyle = this.getStyleById(styleId);
        var typeTransformed = (this.getType(type, actualStyle, value) || type);
        var massageText = function (val) {
            if (_this.config.suppressTextAsCDATA) {
                return core_1._.escapeString(val);
            }
            var cdataStart = '<![CDATA[';
            var cdataEnd = ']]>';
            var cdataEndRegex = new RegExp(cdataEnd, "g");
            return cdataStart
                // CDATA sections are closed by the character sequence ']]>' and there is no
                // way of escaping this, so if the text contains the offending sequence, emit
                // multiple CDATA sections and split the characters between them.
                + String(val).replace(cdataEndRegex, ']]' + cdataEnd + cdataStart + '>')
                + cdataEnd;
        };
        var convertBoolean = function (val) {
            if (!val || val === '0' || val === 'false') {
                return '0';
            }
            return '1';
        };
        return {
            styleId: !!actualStyle ? styleId : undefined,
            data: {
                type: typeTransformed,
                value: typeTransformed === 'String' ? massageText(value) :
                    typeTransformed === 'Number' ? Number(value).valueOf() + '' :
                        typeTransformed === 'Boolean' ? convertBoolean(value) :
                            value
            }
        };
    };
    ExcelXmlSerializingSession.prototype.createMergedCell = function (styleId, type, value, numOfCells) {
        return {
            styleId: !!this.getStyleById(styleId) ? styleId : undefined,
            data: {
                type: type,
                value: value
            },
            mergeAcross: numOfCells
        };
    };
    return ExcelXmlSerializingSession;
}(baseExcelSerializingSession_1.BaseExcelSerializingSession));
exports.ExcelXmlSerializingSession = ExcelXmlSerializingSession;
//# sourceMappingURL=excelXmlSerializingSession.js.map