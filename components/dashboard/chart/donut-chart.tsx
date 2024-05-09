"use client";
import {DonutChart, Legend} from "@tremor/react";

export function DonutChartHero(prop: {
  data: any;
  index: string;
  category: string;
}) {
  const {data, index, category} = prop;
  type CustomTooltipTypeDonut = {
    payload: any;
    active: boolean | undefined;
    label: any;
  };

  const customTooltip = (props: CustomTooltipTypeDonut) => {
    const {payload, active} = props;
    if (!active || !payload) return null;
    const categoryPayload = payload?.[0];
    if (!categoryPayload) return null;
    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        <div className="flex flex-1 space-x-2.5">
          <div
            className={`flex w-1.5 flex-col bg-${categoryPayload?.color}-500 rounded`}
          />
          <div className="w-full">
            <div className="flex items-center justify-between space-x-8">
              <p className="whitespace-nowrap text-right text-tremor-content">
                {categoryPayload.name}
              </p>
              <p className="whitespace-nowrap text-right font-medium text-tremor-content-emphasis">
                {categoryPayload.value}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const names = data.map((item: any) => item.name);
  const dataFormatter = (number: number) => `Tổng số: ${number}`;
  return (
    <div className="my-10">
      <DonutChart
        data={data}
        index={index}
        category={category}
        valueFormatter={dataFormatter}
        variant="donut"
        customTooltip={customTooltip}
        showAnimation={true}
      />
      <Legend
        categories={names}
        colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
        className="max-w-xs mx-auto"
      />
    </div>
  );
}
