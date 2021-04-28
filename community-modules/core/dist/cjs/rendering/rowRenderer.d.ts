// Type definitions for @ag-grid-community/core v25.2.0
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { RowController } from "./row/rowController";
import { Column } from "../entities/column";
import { RowNode } from "../entities/rowNode";
import { CellComp } from "./cellComp";
import { LoggerFactory } from "../logger";
import { CellPosition } from "../entities/cellPosition";
import { BeanStub } from "../context/beanStub";
import { FlashCellsParams, GetCellRendererInstancesParams, RefreshCellsParams } from "../gridApi";
import { ICellRendererComp } from "./cellRenderers/iCellRenderer";
import { ICellEditorComp } from "../interfaces/iCellEditor";
import { RowPosition } from "../entities/rowPosition";
export interface RowMap {
    [key: string]: RowController;
}
export declare class RowRenderer extends BeanStub {
    private paginationProxy;
    private columnController;
    private $scope;
    private pinnedRowModel;
    private rowModel;
    private focusController;
    private cellNavigationService;
    private columnApi;
    private gridApi;
    private beans;
    private rowContainerHeightService;
    private animationFrameService;
    private rowPositionUtils;
    private rangeController;
    private controllersService;
    private gridBodyCon;
    private destroyFuncsForColumnListeners;
    private firstRenderedRow;
    private lastRenderedRow;
    private rowConsByRowIndex;
    private zombieRowCons;
    private allRowCons;
    private topRowCons;
    private bottomRowCons;
    private pinningLeft;
    private pinningRight;
    private refreshInProgress;
    private logger;
    private printLayout;
    private embedFullWidthRows;
    agWire(loggerFactory: LoggerFactory): void;
    private postConstruct;
    private initialise;
    getRowCons(): RowController[];
    private updateAllRowCons;
    private registerCellEventListeners;
    private removeGridColumnListeners;
    private refreshListenersToColumnsForCellComps;
    private onDomLayoutChanged;
    datasourceChanged(): void;
    private onPageLoaded;
    getAllCellsForColumn(column: Column): HTMLElement[];
    refreshFloatingRowComps(): void;
    getTopRowCons(): RowController[];
    getBottomRowCons(): RowController[];
    private refreshFloatingRows;
    private onPinnedRowDataChanged;
    private getRenderedIndexesForRowNodes;
    redrawRows(rowNodes?: RowNode[]): void;
    private getCellToRestoreFocusToAfterRefresh;
    private redrawAfterModelUpdate;
    private scrollToTopIfNewData;
    private updateContainerHeights;
    private getLockOnRefresh;
    private releaseLockOnRefresh;
    private restoreFocusedCell;
    stopEditing(cancel?: boolean): void;
    private onNewColumnsLoaded;
    forEachCellComp(callback: (cellComp: CellComp) => void): void;
    private forEachRowComp;
    addRenderedRowListener(eventName: string, rowIndex: number, callback: Function): void;
    flashCells(params?: FlashCellsParams): void;
    refreshCells(params?: RefreshCellsParams): void;
    getCellRendererInstances(params: GetCellRendererInstancesParams): ICellRendererComp[];
    getCellEditorInstances(params: GetCellRendererInstancesParams): ICellEditorComp[];
    getEditingCells(): CellPosition[];
    private forEachCellCompFiltered;
    protected destroy(): void;
    private removeAllRowComps;
    private recycleRows;
    private removeRowComps;
    redrawAfterScroll(): void;
    private removeRowCompsNotToDraw;
    private calculateIndexesToDraw;
    private redraw;
    private dispatchDisplayedRowsChanged;
    private onDisplayedColumnsChanged;
    private redrawFullWidthEmbeddedRows;
    refreshFullWidthRows(rowNodesToRefresh?: RowNode[]): void;
    private createOrUpdateRowCon;
    private destroyRowCons;
    private checkAngularCompile;
    private workOutFirstAndLastRowsToRender;
    private ensureAllRowsInRangeHaveHeightsCalculated;
    getFirstVirtualRenderedRow(): number;
    getLastVirtualRenderedRow(): number;
    private doNotUnVirtualiseRow;
    private createRowCon;
    getRenderedNodes(): RowNode[];
    navigateToNextCell(event: KeyboardEvent | null, key: number, currentCell: CellPosition, allowUserOverride: boolean): void;
    private getNormalisedPosition;
    private tryToFocusFullWidthRow;
    private focusPosition;
    private isValidNavigateCell;
    private getLastCellOfColSpan;
    ensureCellVisible(gridCell: CellPosition): void;
    startEditingCell(gridCell: CellPosition, keyPress?: number | null, charPress?: string | null): void;
    getRowConByPosition(rowPosition: RowPosition): RowController | null;
    getComponentForCell(cellPosition: CellPosition): CellComp | null;
    getRowNode(gridRow: RowPosition): RowNode | null;
    onTabKeyDown(previousRenderedCell: CellComp | RowController, keyboardEvent: KeyboardEvent): void;
    tabToNextCell(backwards: boolean): boolean;
    private tabToNextCellCommon;
    private moveToNextEditingCell;
    private moveToNextEditingRow;
    private moveToNextCellNotEditing;
    private findNextCellToFocusOn;
    private isCellEditable;
    private lookupRowNodeForCell;
    isRangeInRenderedViewport(startIndex: number, endIndex: number): boolean;
}
export interface RefreshViewParams {
    recycleRows?: boolean;
    animate?: boolean;
    suppressKeepFocus?: boolean;
    onlyBody?: boolean;
    newData?: boolean;
    newPage?: boolean;
}
