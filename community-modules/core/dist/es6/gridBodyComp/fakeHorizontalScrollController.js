/**
 * @ag-grid-community/core - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v25.2.0
 * @link http://www.ag-grid.com/
 * @license MIT
 */
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BeanStub } from "../context/beanStub";
import { isBrowserIE } from "../utils/browser";
import { Autowired, PostConstruct } from "../context/context";
import { Events } from "../eventKeys";
import { GridOptionsWrapper } from "../gridOptionsWrapper";
var FakeHorizontalScrollController = /** @class */ (function (_super) {
    __extends(FakeHorizontalScrollController, _super);
    function FakeHorizontalScrollController() {
        return _super.call(this) || this;
    }
    FakeHorizontalScrollController.prototype.setView = function (view, eViewport, eContainer) {
        this.view = view;
        this.eViewport = eViewport;
        this.eContainer = eContainer;
        this.addManagedListener(this.eventService, Events.EVENT_SCROLL_VISIBILITY_CHANGED, this.onScrollVisibilityChanged.bind(this));
        this.onScrollVisibilityChanged();
        // When doing printing, this changes whether cols are pinned or not
        var spacerWidthsListener = this.setFakeHScrollSpacerWidths.bind(this);
        this.addManagedListener(this.eventService, Events.EVENT_DISPLAYED_COLUMNS_CHANGED, spacerWidthsListener);
        this.addManagedListener(this.eventService, Events.EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED, spacerWidthsListener);
        this.addManagedListener(this.gridOptionsWrapper, GridOptionsWrapper.PROP_DOM_LAYOUT, spacerWidthsListener);
        this.setFakeHScrollSpacerWidths();
        this.controllersService.registerFakeHScrollCon(this);
    };
    FakeHorizontalScrollController.prototype.postConstruct = function () {
        this.enableRtl = this.gridOptionsWrapper.isEnableRtl();
    };
    FakeHorizontalScrollController.prototype.onScrollVisibilityChanged = function () {
        this.setScrollVisible();
        this.setFakeHScrollSpacerWidths();
    };
    FakeHorizontalScrollController.prototype.setFakeHScrollSpacerWidths = function () {
        var vScrollShowing = this.scrollVisibleService.isVerticalScrollShowing();
        // we pad the right based on a) if cols are pinned to the right and
        // b) if v scroll is showing on the right (normal position of scroll)
        var rightSpacing = this.columnController.getDisplayedColumnsRightWidth();
        var scrollOnRight = !this.enableRtl && vScrollShowing;
        var scrollbarWidth = this.gridOptionsWrapper.getScrollbarWidth();
        if (scrollOnRight) {
            rightSpacing += scrollbarWidth;
        }
        this.view.setRightSpacerFixedWidth(rightSpacing);
        this.view.includeRightSpacerScrollerCss('ag-scroller-corner', rightSpacing <= scrollbarWidth);
        // we pad the left based on a) if cols are pinned to the left and
        // b) if v scroll is showing on the left (happens in LTR layout only)
        var leftSpacing = this.columnController.getDisplayedColumnsLeftWidth();
        var scrollOnLeft = this.enableRtl && vScrollShowing;
        if (scrollOnLeft) {
            leftSpacing += scrollbarWidth;
        }
        this.view.setLeftSpacerFixedWidth(leftSpacing);
        this.view.includeLeftSpacerScrollerCss('ag-scroller-corner', leftSpacing <= scrollbarWidth);
    };
    FakeHorizontalScrollController.prototype.setScrollVisible = function () {
        var hScrollShowing = this.scrollVisibleService.isHorizontalScrollShowing();
        var isSuppressHorizontalScroll = this.gridOptionsWrapper.isSuppressHorizontalScroll();
        var scrollbarWidth = hScrollShowing ? (this.gridOptionsWrapper.getScrollbarWidth() || 0) : 0;
        var scrollContainerSize = !isSuppressHorizontalScroll ? scrollbarWidth : 0;
        var addIEPadding = isBrowserIE() && hScrollShowing;
        this.view.setHeight(scrollContainerSize);
        // we have to add an extra pixel to the scroller viewport on IE because
        // if the container has the same size as the scrollbar, the scroll button won't work
        this.view.setViewportHeight(scrollContainerSize + (addIEPadding ? 1 : 0));
        this.view.setContainerHeight(scrollContainerSize);
    };
    FakeHorizontalScrollController.prototype.getViewport = function () {
        return this.eViewport;
    };
    FakeHorizontalScrollController.prototype.getContainer = function () {
        return this.eContainer;
    };
    __decorate([
        Autowired('scrollVisibleService')
    ], FakeHorizontalScrollController.prototype, "scrollVisibleService", void 0);
    __decorate([
        Autowired('columnController')
    ], FakeHorizontalScrollController.prototype, "columnController", void 0);
    __decorate([
        Autowired('controllersService')
    ], FakeHorizontalScrollController.prototype, "controllersService", void 0);
    __decorate([
        PostConstruct
    ], FakeHorizontalScrollController.prototype, "postConstruct", null);
    return FakeHorizontalScrollController;
}(BeanStub));
export { FakeHorizontalScrollController };
