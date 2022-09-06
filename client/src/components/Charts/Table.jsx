import React from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Sort,
  Page,
  Filter,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

//Table Template Component
const Table = ({ data, grid }) => {
  const toolbarOptions = ["Search"];

  return (
    <GridComponent
      dataSource={data}
      width="auto"
      allowPaging
      allowSorting
      pageSettings={{ pageCount: 5 }}
      toolbar={toolbarOptions}
    >
      <ColumnsDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {grid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
        ))}
      </ColumnsDirective>
      <Inject services={[Search, Page, Filter, Sort, Toolbar]} />
    </GridComponent>
  );
};
export default Table;
