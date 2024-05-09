"use client";
import {AreaChart} from "@tremor/react";

import {formatCurrency} from "@/lib/formatCurrency";

import {useState} from "react";
import {Button} from "@/components/ui/button";

export function AreaChartHero(prop: {data: any}) {
  const data = prop.data;
  const weekly_data = data.slice(23, 30);
  const [content, setContent] = useState(data);
  const [active, setActive] = useState(30);
  return (
    <div className="mx-2">
      <div className="flex gap-4">
        <Button
          variant={"outline"}
          disabled={active === 7}
          onClick={() => {
            setContent(weekly_data);
            setActive(7);
          }}>
          7 ngày vừa qua
        </Button>
        <Button
          variant={"outline"}
          disabled={active === 30}
          onClick={() => {
            setContent(data);
            setActive(30);
          }}>
          30 ngày vừa qua
        </Button>
      </div>
      <AreaChart
        className="h-80"
        data={content}
        categories={["income", "consume"]}
        index="date"
        colors={["red", "blue"]}
        yAxisWidth={60}
        valueFormatter={formatCurrency}
        onValueChange={(v) => console.log(v)}
        showLegend={true}
        curveType="monotone"
        showAnimation={true}
      />
    </div>
  );
}
