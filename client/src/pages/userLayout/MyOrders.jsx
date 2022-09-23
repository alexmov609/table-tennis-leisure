import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  Toolbar,
  Search,
} from "@syncfusion/ej2-react-grids";
import { contextMenuItems, ordersGrid } from "../../data/dummy";
import Header from "../../components/Header";
import OrderTimeChoice from "./OrderTimeChoice";

import { useOutletContext } from "react-router-dom";

//Component that gives to an user an option to browse its orders
//User can also change/delete any of its orders
const MyOrders = () => {
  const { orders } = useOutletContext();

  const editorTemplate = (args) => {
    // Calling any setState causes trouble, but still renders
    return <OrderTimeChoice dateOfGame={args.date_of_game} />;
  };
  const actionBegin = (args) => {
    console.log("actionBegin", args);
    // if (args.requestType === "delete") {
    //   fetch("/deleteOrder", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-xsrf-token": localStorage.getItem("csrf"),
    //     },
    //     body: JSON.stringify({ order_id: args.data[0].order_id }),
    //   });
    // }
  };
  const actionComplete = () => {
    console.log("complete");
  };
  const editing = {
    allowDeleting: true,
    allowEditing: true,
    mode: "Dialog",
    template: editorTemplate,
  };

  const toolbarOptions = ["Edit", "Delete", "Search"];
  return (
    <div className="flex flex-col items-center m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="My Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={orders}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        toolbar={toolbarOptions}
        actionBegin={actionBegin}
        // actionComplete={actionComplete}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
            Toolbar,
            Search,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default MyOrders;
