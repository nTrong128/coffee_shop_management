"use client";
import {LineChart} from "@tremor/react";

export function LineChartHero(prop: {data: any[]}) {
  const data = prop.data;
  const customTooltip = (props: any) => {
    const {payload, active} = props;
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        {payload.map((category: any, idx: any) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">
                {category.value} hóa đơn
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      <h3 className="text-lg font-medium text-center text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Số lượng hóa đơn theo ngày trong 30 ngày vừa qua
      </h3>
      <LineChart
        className="mt-4 h-72"
        data={data}
        index="date"
        categories={["value"]}
        colors={["blue"]}
        yAxisWidth={30}
        customTooltip={customTooltip}
        curveType="monotone"
      />
    </>
  );
}
