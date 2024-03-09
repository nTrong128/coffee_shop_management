import {Label} from "@/components/ui/label";
import {CardContent, CardFooter, Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import ProductImg from "@/public/products/Cappuchino.png";

export function CoffeeCard() {
  return (
    <Card className="w-full">
      <CardContent className=" p-6">
        <Image
          alt="Cappuccino"
          className="m-auto rounded-lg object-cover"
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

          <div className="flex justify-around">
            <input hidden name="small" />
            <Label className="text-sm font-medium " htmlFor="small">
              S
            </Label>
            <input hidden name="medium" />
            <Label className="text-sm font-medium " htmlFor="medium">
              M
            </Label>
            <input hidden name="large" />
            <Label className="text-sm font-medium " htmlFor="large">
              L
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-6">
        <Button>Order</Button>
      </CardFooter>
    </Card>
  );
}
