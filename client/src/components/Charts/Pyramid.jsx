import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  AccumulationDataLabel,
  AccumulationTooltip,
  PyramidSeries,
  AccumulationSelection,
} from "@syncfusion/ej2-react-charts";

import { useStateContext } from "../../contexts/ContextProvider";

//Pyramid Template Component
const Pyramid = ({ data }) => {
  const { currentMode } = useStateContext();

  return (
    <AccumulationChartComponent
      id="pyramid-chart"
      legendSettings={{ background: "white" }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
    >
      <Inject
        services={[
          AccumulationDataLabel,
          AccumulationTooltip,
          PyramidSeries,
          AccumulationLegend,
          AccumulationSelection,
        ]}
      />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          // name="Food"
          dataSource={data}
          xName="x"
          yName="y"
          type="Pyramid"
          width="45%"
          height="80%"
          neckWidth="15%"
          gapRatio={0.03}
          explode
          emptyPointSettings={{ mode: "Drop", fill: "red" }}
          dataLabel={{
            visible: true,
            position: "Inside",
            name: "text",
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default Pyramid;
