---
title: "Getting Started with AG Grid"
frameworks: ["react"]
---

As of AG Grid v28.2.0, AG Grid comes with full support for [SolidJS](https://www.solidjs.com/). When using AG Grid with Solid, all of the grid's core rendering (headers, rows, cells etc) is rendered using Solid.

<video-section id="0yksxqGDdqQ" title="Video Tutorial for Getting Started with AG Grid Community">
<p>
AG Grid Solid shares the same 'business logic layer' as the other AG Grid versions (React, Angular, Vue, or just JavaScript). This means the features of AG Grid Solid are identical to the features in AG Grid's other framework flavours. However because the rendering is done 100% in Solid, the grid works as a native Solid Component.

AG Grid Solid is NOT a JavaScript component with a thin Solid wrapper. AG Grid is the Real Deal when it comes to a Data Grid Implementation for SolidJS.
</p>
</video-section>


## Show Me

Below is a simple example using AG Grid with SolidJS. Take a look at the code and note the use of the ```AgGridSolid``` component.

<iframe style="width:100%; height: 500px" src="https://stackblitz.com/edit/solidjs-template-gvftye?embed=1&file=src/App.tsx"></iframe>

This page does not introduce the basics of AG Grid, it is assumed you are already familiar with it. This is because SolidJS is an emerging technology and we assume if you are developing with SolidJS then you are a confident and knowledged developer. If you are not familiar with AG Grid, then it is recommended you start with [Getting Started with AG Grid and React](/getting-started/) and then refer back to here.

This page explains how a AG Grid Solid application is wired up. Once this is understood, you should refer to the the AG Grid React documentation on how to use AG Grid, as AG Grid React code examples are the most similar to AG Grid Solid.

## Dependencies

The NPM dependency for AG Grid Solid is `ag-grid-solid`. When adding this to your `package.json`, make sure the version numbers match `ag-grid-community` and `ag-grid-enterprise` (if using Enterprise).

```jsx
"dependencies": {
   "ag-grid-community": "28.2.0",
   "ag-grid-solid": "28.2.0",
   ...
```

The AG Grid Solid component can then be imported in the application.

```jsx
import AgGridSolid from 'ag-grid-solid';
```

## Grid Component

Once the Solid grid component is imported, it can then be inserted into the Solid application using JSX.

```jsx
<AgGridSolid
    rowData={...}
    columnDefs={...}
/>
```

It's best to place the grid component inside another DOM element that has a set size. The grid will then fill the size of the parent element. You also need to import CSS files for a) the core CSS which is mandatory and b) a grid theme which is optional. The theme also needs to be specified as a CSS class in a parent element to the grid.


```jsx
import AgGridSolid from 'ag-grid-solid';

import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme

const MySolidApp = ()=> {

    return (
        // set fixed size to parent div, and apply grid theme ag-theme-alpine
        <div style={{height: '500px'}} class="ag-theme-alpine">
            <AgGridSolid
                rowData={...}
                columnDefs={...}
            />
        </div>
    );
};

```

## Binding Properties

You can use [Grid Properties](/grid-options/), either bind Solid Signals (for changing properties) or directly (if static properties). [Grid Events](/grid-events/) are also bound via properties.


```jsx
import AgGridSolid from 'ag-grid-solid';

import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme

const MySolidApp = ()=> {

    // use signal, as row data will change
    const [rowData, setRowData] = createSignal();

    // if columns will change, best use a signal, however if column definitions
    // are static, we don't need to use a signal
    const columnDefs = [
        {field: 'name'},
        {field: 'age'}
    ];

    // event listener
    const selectionChangedCallback = e => {
        console.log('selection has changed', e);
    };

    return (
        <div style={{height: '500px'}} class="ag-theme-alpine">
            <AgGridSolid
                rowData={rowData()} // use signal
                columnDefs={columnDefs} // no signal
                rowSelection="single" // no signal, inline
                onSelectionChanged={selectionChangedCallback} // listen for grid event
            />
        </div>
    );
};

```

## Grid API

The grid API is accessed as a Solid Ref.

```jsx
const MySolidApp = ()=> {

    let grid; // ref for the grid

    const myAction = ()=> {
        // use grid api
        gridRef.api.selectAll();
        // use grid column api
        gridRef.columnApi.applyColumnState(...);
    };

    return (
        <div style={{height: '500px'}} class="ag-theme-alpine">
            <AgGridSolid
                rowData={...}
                columnDefs={...}
                ref={gridRef} 
            />
        </div>
    );
};

```

If using TypeScript, the type to use is ```AgGridSolidRef```.


```jsx
import AgGridSolid, {AgGridSolidRef} from 'ag-grid-solid';

const MySolidApp = ()=> {

    let grid: AgGridSolidRef;

    // ...
};

```

## Custom Cells

The example below demonstrates using [Cell Renderer](/component-cell-renderer/) to customise the cells in the Age Column. Note that the Cell Renderer is a standard Solid Component and is set onto the grid using the Column Definitions.

<div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
    <img src="resources/renderer.png" alt="Simple Renderer" style="width: 30%;" />
    <div>Fig 1. Simple Cell Renderer Component</div>
    <div>
        <a class="btn btn-dark mb-2 mr-3" href="https://stackblitz.com/edit/solidjs-template-z3ncqk?embed=1&file=src/App.tsx" target="_blank" style="display: block; float: right">
                Open in <img src="resources/stackBlitz_icon.svg" alt="Open in StackBlitz" style="height: 2.5rem"/> StackBlitz
        </a>
    </div>
    <div style="clear:both"></div>
</div>

See [Cell Renderers](/component-cell-renderer/) for full details on creating React Cell Renderers and then apply this knowledge to Solid.

## Using Cell Editors

Below is an example showing different types of Solid [Cell Editors](/component-cell-editor/). Edit any cell by double clicking the mouse. The Gold and Silver Columns use custom Solid Components. Gold edits inside the cell and and Silver edits in a popup (`cellEditorPopup=true`).

A custom Cell Editor component requires the component to expose an API from the componet to the grid. Using React this is done using an Imperative Handle. In Solid this is done by calling `ref(api)` on the props.

```jsx
const api = {
    ...
};

props.ref(api);
```

<div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
    <img src="resources/editor.png" alt="Simple Editor" style="width: 30%;" />
    <div>Fig 2. Simple Cell Editor Component</div>
    <div>
        <a class="btn btn-dark mb-2 mr-3" href="https://stackblitz.com/edit/solidjs-template-bhhxsm?embed=1&file=src/App.tsx" target="_blank" style="display: block; float: right">
                Open in <img src="resources/stackBlitz_icon.svg" alt="Open in StackBlitz" style="height: 2.5rem"/> StackBlitz
        </a>
    </div>
    <div style="clear:both"></div>
</div>

See [Cell Editors](/component-cell-editor/) for full details on creating React Cell Editors and then apply this knowledge to Solid.

## Customising Headers

This example demonstrates custom [Column Headers](/component-header/) and [Column Group Headers](/component-header/#header-group-components) using Solid components.

<div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
    <img src="resources/header.png" alt="Simple Header" style="width: 30%;" />
    <div>Fig 3. Simple Header Component</div>
    <div>
        <a class="btn btn-dark mb-2 mr-3" href="https://stackblitz.com/edit/solidjs-template-wnpr7s?embed=1&file=src/App.tsx" target="_blank" style="display: block; float: right">
                Open in <img src="resources/stackBlitz_icon.svg" alt="Open in StackBlitz" style="height: 2.5rem"/> StackBlitz
        </a>
    </div>
    <div style="clear:both"></div>
</div>

See [Column Headers](/component-header/) and [Column Group Headers](/component-header/#header-group-components) for full details on creating these components with React and then apply this knowledge to Solid.


## Advanced Grid Features

Below is an example of AG Grid Solid showing more advanced features such as [Row Grouping](/grouping/), [Range Selection](/range-selection/) and [Integrated Charting](/integrated-charts/).

<div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
    <img src="resources/advanced.png" alt="Advanced Grid" style="width: 30%;" />
    <div>Fig 4. Advanced Grid</div>
    <div>
        <a class="btn btn-dark mb-2 mr-3" href="https://stackblitz.com/edit/solidjs-template-qsmpa3?embed=1&file=src/App.tsx" target="_blank" style="display: block; float: right">
                Open in <img src="resources/stackBlitz_icon.svg" alt="Open in StackBlitz" style="height: 2.5rem"/> StackBlitz
        </a>
    </div>
    <div style="clear:both"></div>
</div>

## Master Detail

When the master grid is AG Grid Solid, then the detail grids also use AG Grid Solid. In the example both Master and Detail grids are using Solid Cell Renderers.

<div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
    <img src="resources/master-detail.png" alt="Master Detail Grid" style="width: 30%;" />
    <div>Fig 5. Master Detail Grid</div>
    <div>
        <a class="btn btn-dark mb-2 mr-3" href="https://stackblitz.com/edit/solidjs-template-vt3cco?embed=1&file=src/App.tsx" target="_blank" style="display: block; float: right">
                Open in <img src="resources/stackBlitz_icon.svg" alt="Open in StackBlitz" style="height: 2.5rem"/> StackBlitz
        </a>
    </div>
    <div style="clear:both"></div>
</div>

## Modules

If using [AG Grid Modules](/modules/), the dependencies will be different.

```jsx
"dependencies": {
    "@ag-grid-community/core": "28.2.0",
    "@ag-grid-community/client-side-row-model": "28.2.0",
    "@ag-grid-community/solid": "28.2.0",
   ...
```

And the import will also be different.

```jsx
import AgGridSolid from '@ag-grid-community/solid';
```

The example below shows an AG Grid Solid example using modules.

<div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
    <img src="resources/simple.png" alt="Module Imports" style="width: 30%;" />
    <div>Fig 6. Simple Grid using Modules</div>
    <div>
        <a class="btn btn-dark mb-2 mr-3" href="https://stackblitz.com/edit/solidjs-template-skz4ot?embed=1&file=src/App.tsx" target="_blank" style="display: block; float: right">
                Open in <img src="resources/stackBlitz_icon.svg" alt="Open in StackBlitz" style="height: 2.5rem"/> StackBlitz
        </a>
    </div>
    <div style="clear:both"></div>
</div>

