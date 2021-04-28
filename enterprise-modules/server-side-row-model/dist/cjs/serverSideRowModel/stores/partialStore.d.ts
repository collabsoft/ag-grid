import { BeanStub, IServerSideStore, LoadSuccessParams, NumberSequence, RowBounds, RowNode, RowRenderer, ServerSideStoreParams, ServerSideStoreState, ServerSideTransaction, ServerSideTransactionResult, StoreRefreshAfterParams } from "@ag-grid-community/core";
import { SSRMParams } from "../serverSideRowModel";
import { PartialStoreBlock } from "../blocks/partialStoreBlock";
export declare class PartialStore extends BeanStub implements IServerSideStore {
    private static MAX_EMPTY_BLOCKS_TO_KEEP;
    private static INITIAL_ROW_COUNT;
    private static OVERFLOW_SIZE;
    protected rowRenderer: RowRenderer;
    private rowNodeBlockLoader;
    private storeUtils;
    private focusController;
    private readonly ssrmParams;
    private readonly storeParams;
    private readonly parentRowNode;
    private readonly blocks;
    private readonly blockHeights;
    private defaultRowHeight;
    private logger;
    private rowCount;
    private lastRowIndexKnown;
    private displayIndexStart;
    private displayIndexEnd;
    private cacheTopPixel;
    private cacheHeightPixels;
    private info;
    constructor(ssrmParams: SSRMParams, storeParams: ServerSideStoreParams, parentRowNode: RowNode);
    private postConstruct;
    private destroyAllBlocks;
    private setBeans;
    getRowCount(): number;
    isLastRowIndexKnown(): boolean;
    retryLoads(): void;
    onBlockLoadFailed(block: PartialStoreBlock): void;
    onBlockLoaded(block: PartialStoreBlock, params: LoadSuccessParams): void;
    private purgeBlocksIfNeeded;
    private isBlockFocused;
    private isBlockCurrentlyDisplayed;
    removeDuplicateNode(id: string): void;
    private checkRowCount;
    forEachNodeDeep(callback: (rowNode: RowNode, index: number) => void, sequence?: NumberSequence): void;
    getBlocksInOrder(): PartialStoreBlock[];
    private destroyBlock;
    private fireCacheUpdatedEvent;
    private destroyAllBlocksPastVirtualRowCount;
    refreshStore(showLoading: boolean): void;
    private refreshBlocks;
    private resetStore;
    getRowNodesInRange(firstInRange: RowNode, lastInRange: RowNode): RowNode[];
    private findBlockAndExecute;
    getRowBounds(index: number): RowBounds;
    getRowIndexAtPixel(pixel: number): number;
    clearDisplayIndexes(): void;
    setDisplayIndexes(displayIndexSeq: NumberSequence, nextRowTop: {
        value: number;
    }): void;
    getRowUsingDisplayIndex(displayRowIndex: number, dontCreateBlock?: boolean): RowNode | null;
    getTopLevelRowDisplayedIndex(topLevelIndex: number): number;
    addStoreStates(result: ServerSideStoreState[]): void;
    private createBlock;
    getDisplayIndexEnd(): number | undefined;
    isDisplayIndexInStore(displayIndex: number): boolean;
    applyTransaction(transaction: ServerSideTransaction): ServerSideTransactionResult;
    getChildStore(keys: string[]): IServerSideStore | null;
    isPixelInRange(pixel: number): boolean;
    refreshAfterFilter(params: StoreRefreshAfterParams): void;
    refreshAfterSort(params: StoreRefreshAfterParams): void;
    private forEachChildStoreShallow;
}
