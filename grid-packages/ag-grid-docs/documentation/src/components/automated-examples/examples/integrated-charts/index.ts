/**
 * Automated Row Grouping demo
 */

// NOTE: Only typescript types should be imported from the AG Grid packages
// to prevent AG Grid from loading the code twice

import { Easing, Group } from '@tweenjs/tween.js';
import { ColDef, GridOptions, MenuItemDef } from 'ag-grid-community';
import { COUNTRY_CODES } from '../../data/constants';
import { createPeopleData } from '../../data/createPeopleData';
import { INTEGRATED_CHARTS_ID } from '../../lib/constants';
import { createMouse } from '../../lib/createMouse';
import { isInViewport } from '../../lib/dom';
import { getAdditionalContextMenuItems } from '../../lib/getAdditionalContextMenuItems';
import { ScriptDebuggerManager } from '../../lib/scriptDebugger';
import { RunScriptState, ScriptRunner } from '../../lib/scriptRunner';
import { AutomatedExample } from '../../types';
import { createScriptRunner } from './createScriptRunner';

let scriptRunner: ScriptRunner;
let restartScriptTimeout;

interface CreateAutomatedIntegratedChartsParams {
    gridClassname: string;
    mouseMaskClassname: string;
    additionalContextMenuItems?: (string | MenuItemDef)[];
    onStateChange?: (state: RunScriptState) => void;
    onGridReady?: () => void;
    suppressUpdates?: boolean;
    useStaticData?: boolean;
    runOnce: boolean;
    scriptDebuggerManager: ScriptDebuggerManager;
    visibilityThreshold: number;
}

function numberCellFormatter(params) {
    return Math.floor(params.value)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function getCountryFlagImageUrl(country: string) {
    const countryCode = COUNTRY_CODES[country];
    return `https://flags.fmcdn.net/data/flags/mini/${countryCode}.png`;
}

const columnDefs: ColDef[] = [
    {
        field: 'name',
        chartDataType: 'category',
        minWidth: 280,
        enableRowGroup: true,
    },
    {
        field: 'country',
        chartDataType: 'category',
        enableRowGroup: true,
        cellRenderer: (params) => {
            if (params.node.group) {
                return params.value;
            }

            // put the value in bold
            return `<img border="0" width="21" height="14" alt="${params.value} flag" src='${getCountryFlagImageUrl(
                params.data?.country
            )}' /> ${params.value}`;
        },
    },
    { field: 'jan', type: ['measure', 'numericColumn'], enableRowGroup: true },
    { field: 'feb', type: ['measure', 'numericColumn'], enableRowGroup: true },
    { field: 'mar', type: ['measure', 'numericColumn'], enableRowGroup: true },
    { field: 'apr', type: ['measure', 'numericColumn'], enableRowGroup: true },
    { field: 'may', type: ['measure', 'numericColumn'], enableRowGroup: true },
    { field: 'jun', type: ['measure', 'numericColumn'], enableRowGroup: true },
    { field: 'jul', type: ['measure', 'numericColumn'], enableRowGroup: true },
    { field: 'aug', type: ['measure', 'numericColumn'], enableRowGroup: true },
    { field: 'sep', type: ['measure', 'numericColumn'], enableRowGroup: true },
    { field: 'oct', type: ['measure', 'numericColumn'], enableRowGroup: true },
    { field: 'nov', type: ['measure', 'numericColumn'], enableRowGroup: true },
    { field: 'dec', type: ['measure', 'numericColumn'], enableRowGroup: true },
    { field: 'totalWinnings', type: ['measure', 'numericColumn'], enableRowGroup: true },
];

const gridOptions: GridOptions = {
    columnDefs,
    defaultColDef: {
        sortable: true,
        flex: 1,
        minWidth: 150,
        filter: true,
        resizable: true,
    },
    autoGroupColumnDef: {
        minWidth: 280,
    },
    columnTypes: {
        measure: {
            aggFunc: 'sum',
            chartDataType: 'series',
            valueFormatter: numberCellFormatter,
            cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
    },
    animateRows: true,
    enableCharts: true,
    enableRangeSelection: true,
    suppressAggFuncInHeader: true,
    rowGroupPanelShow: 'always',
};

export function createAutomatedIntegratedCharts({
    gridClassname,
    mouseMaskClassname,
    additionalContextMenuItems,
    onStateChange,
    onGridReady,
    suppressUpdates,
    scriptDebuggerManager,
    runOnce,
    visibilityThreshold,
}: CreateAutomatedIntegratedChartsParams): AutomatedExample {
    const gridSelector = `.${gridClassname}`;
    let gridDiv: HTMLElement;

    const init = () => {
        gridDiv = document.querySelector(gridSelector) as HTMLElement;
        if (!gridDiv) {
            return;
        }

        gridOptions.rowData = createPeopleData({ randomize: !suppressUpdates });

        if (additionalContextMenuItems) {
            gridOptions.getContextMenuItems = () => getAdditionalContextMenuItems(additionalContextMenuItems);
        }

        gridOptions.onGridReady = () => {
            onGridReady && onGridReady();
        };
        gridOptions.onFirstDataRendered = () => {
            if (suppressUpdates) {
                return;
            }

            const scriptDebugger = scriptDebuggerManager.add({
                id: INTEGRATED_CHARTS_ID,
                containerEl: gridDiv,
            });

            const mouse = createMouse({ containerEl: gridDiv, mouseMaskClassname });
            const tweenGroup = new Group();

            if (scriptRunner) {
                scriptRunner.stop();
            }

            scriptRunner = createScriptRunner({
                id: INTEGRATED_CHARTS_ID,
                containerEl: gridDiv,
                mouse,
                onStateChange,
                tweenGroup,
                gridOptions,
                loop: !runOnce,
                scriptDebugger,
                defaultEasing: Easing.Quadratic.InOut,
            });
        };

        new globalThis.agGrid.Grid(gridDiv, gridOptions);
    };

    const loadGrid = function () {
        if (document.querySelector(gridSelector) && globalThis.agGrid) {
            init();
        } else {
            requestAnimationFrame(() => loadGrid());
        }
    };

    loadGrid();

    return {
        start: () => scriptRunner?.play(),
        stop: () => scriptRunner?.stop(),
        inactive: () => scriptRunner?.inactive(),
        currentState: () => scriptRunner?.currentState(),
        isInViewport: () => {
            return isInViewport(gridDiv, visibilityThreshold);
        },
    };
}

/**
 * Clean up between hot module replacement on dev server
 */
// @ts-ignore
if (import.meta.webpackHot) {
    // @ts-ignore
    import.meta.webpackHot.dispose(() => {
        clearTimeout(restartScriptTimeout);
        if (scriptRunner) {
            scriptRunner.stop();
        }

        gridOptions.api?.destroy();
    });
}
