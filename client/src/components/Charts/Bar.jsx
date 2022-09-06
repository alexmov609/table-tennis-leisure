import * as React from "react";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Export,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  LineSeries,
} from "@syncfusion/ej2-react-charts";

//Bar Chart Template Component
const Bar = ({ data }) => {
  const primaryxAxis = { valueType: "Category" };

  return (
    <div>
      <ChartComponent id="charts" primaryXAxis={primaryxAxis}>
        <Inject
          services={[
            ColumnSeries,
            Legend,
            Tooltip,
            DataLabel,
            Export,
            LineSeries,
            Category,
          ]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            dataSource={data}
            xName="x"
            yName="y"
            type="Column"
            name="Profit"
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default Bar;
