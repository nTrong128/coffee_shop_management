import {Label} from "@/components/ui/label";
import {CardContent, CardFooter, Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import ProductImg from "@/public/products/Cappuchino.png";

export function CoffeeCard() {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex items-start p-6">
        <Image
          alt="Cappuccino"
          className="rounded-lg object-cover"
          height="120"
          src={ProductImg}
          style={{
            aspectRatio: "120/120",
            objectFit: "cover",
          }}
          width="120"
        />
        <div className="ml-6 grid gap-1.5">
          <h1 className="text-2xl font-semibold">Cappuccino</h1>
          <p className="text-lg font-semibold">$3.50</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Rich espresso marked with a frothy layer of steamed milk
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div />
              <Label className="text-sm font-medium " htmlFor="small">
                Small
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <div />
              <Label className="text-sm font-medium " htmlFor="medium">
                Medium
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <div />
              <Label className="text-sm font-medium " htmlFor="large">
                Large
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-6">
        <Button>Order</Button>
      </CardFooter>
    </Card>
  );
}