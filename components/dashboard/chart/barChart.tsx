import {BarList} from "@tremor/react";

export function BarChartHero(prop: {data: any; sum: number}) {
  const {data, sum} = prop;
  return (
    <div>
      <BarList data={data} className="mx-auto max-w-sm" />
      <p className="text-center">Tổng số: {sum}</p>
    </div>
  );
}
