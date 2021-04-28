import { IServerSideStore, LoadSuccessParams, NumberSequence, RowBounds, RowNode, RowNodeBlock, ServerSideStoreParams, ServerSideStoreState, ServerSideTransaction, ServerSideTransactionResult, StoreRefreshAfterParams } from "@ag-grid-community/core";
import { SSRMParams } from "../serverSideRowModel";
export declare class FullStore extends RowNodeBlock implements IServerSideStore {
    private storeUtils;
    private blockUtils;
    private columnController;
    private rowNodeBlockLoader;
    private rowNodeSorter;
    private sortController;
    private nodeManager;
    private filterManager;
    private transactionManager;
    private readonly level;
    private readonly groupLevel;
    private readonly leafGroup;
    private readonly ssrmParams;
    private readonly parentRowNode;
    private nodeIdSequence;
    private usingTreeData;
    private allRowNodes;
    private nodesAfterFilter;
    private nodesAfterSort;
    private allNodesMap;
    private groupField;
    private rowGroupColumn;
    private nodeIdPrefix;
    private displayIndexStart;
    private displayIndexEnd;
    private topPx;
    private heightPx;
    private info;
    constructor(ssrmParams: SSRMParams, storeParams: ServerSideStoreParams, parentRowNode: RowNode);
    private postConstruct;
    private destroyRowNodes;
    private initialiseRowNodes;
    getBlockStateJson(): {
        id: string;
        state: any;
    };
    protected loadFromDatasource(): void;
    getStartRow(): number;
    getEndRow(): number;
    private createDataNode;
    private prefixId;
    protected processServerFail(): void;
    protected processServerResult(params: LoadSuccessParams): void;
    private createOrRecycleNodes;
    private flushAsyncTransactions;
    private filterAndSortNodes;
    private sortRowNodes;
    private filterRowNodes;
    clearDisplayIndexes(): void;
    getDisplayIndexEnd(): number | undefined;
    isDisplayIndexInStore(displayIndex: number): boolean;
    setDisplayIndexes(displayIndexSeq: NumberSequence, nextRowTop: {
        value: number;
    }): void;
    forEachNodeDeep(callback: (rowNode: RowNode, index: number) => void, sequence?: NumberSequence): void;
    getRowUsingDisplayIndex(displayRowIndex: number): RowNode | null;
    getRowBounds(index: number): RowBounds | null;
    isPixelInRange(pixel: number): boolean;
    getRowIndexAtPixel(pixel: number): number | null;
    getChildStore(keys: string[]): IServerSideStore | null;
    private forEachChildStoreShallow;
    refreshAfterFilter(params: StoreRefreshAfterParams): void;
    refreshAfterSort(params: StoreRefreshAfterParams): void;
    applyTransaction(transaction: ServerSideTransaction): ServerSideTransactionResult;
    private updateSelection;
    private executeAdd;
    private executeRemove;
    private executeUpdate;
    private lookupRowNode;
    addStoreStates(result: ServerSideStoreState[]): void;
    refreshStore(purge: boolean): void;
    retryLoads(): void;
    private scheduleLoad;
    private fireStoreUpdatedEvent;
    getRowCount(): number;
    getTopLevelRowDisplayedIndex(topLevelIndex: number): number;
    isLastRowIndexKnown(): boolean;
    getRowNodesInRange(firstInRange: RowNode, lastInRange: RowNode): RowNode[];
}
