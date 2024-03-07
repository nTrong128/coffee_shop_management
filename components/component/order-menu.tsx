import {Input} from "@/components/ui/input";
import {AvatarImage, AvatarFallback, Avatar} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {CardContent, Card} from "@/components/ui/card";
import Image from "next/image";
import {Menu, PizzaIcon, ShoppingCartIcon} from "lucide-react";

export function OrderMenu() {
  return (
    <div className="bg-[#FFF8E5] min-h-screen p-8">
      <header className="flex justify-between items-center mb-8">
        <Menu />
        <div className="flex items-center space-x-4">
          <Input className="rounded-full px-4 py-2" placeholder="Search" />
          <Avatar>
            <AvatarImage
              alt="Sarah James"
              src="/placeholder.svg?height=40&width=40"
            />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div className="flex items-center space-x-1">
            <ShoppingCartIcon />
            <span className="bg-green-500 text-white font-semibold text-sm px-2 py-1 rounded-full">
              4
            </span>
          </div>
        </div>
      </header>
      <main className="grid grid-cols-3 gap-8">
        <section className="col-span-2 bg-white p-8 rounded-xl shadow">
          <h1 className="text-4xl font-bold mb-6">Order something</h1>
          <div className="flex space-x-4 mb-8">
            <Button className="bg-green-500 text-white rounded-full px-4 py-2">
              All
            </Button>
            <Button variant="ghost">Pizza</Button>
            <Button variant="ghost">Burger</Button>
            <Button variant="ghost">Sushi</Button>
            <Button variant="ghost">Meat</Button>
            <Button variant="ghost">Fruits</Button>
            <Button variant="ghost">Pasta</Button>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Popular dishes</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="w-full">
              <Image
                alt="Classic Caesar Salad"
                className="rounded-t-xl"
                height="150"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/150",
                  objectFit: "cover",
                }}
                width="300"
              />
              <CardContent>
                <h3 className="font-semibold">Classic Caesar Salad</h3>
                <p className="text-sm text-gray-500">4.5 · Deep Cafe · Salad</p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <Image
                alt="Pizza Margherita"
                className="rounded-t-xl"
                height="150"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/150",
                  objectFit: "cover",
                }}
                width="300"
              />
              <CardContent>
                <h3 className="font-semibold">Pizza Margherita</h3>
                <p className="text-sm text-gray-500">
                  4.0 · Neapolitan · Pizza
                </p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <Image
                alt="Muesli with Mango"
                className="rounded-t-xl"
                height="150"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/150",
                  objectFit: "cover",
                }}
                width="300"
              />
              <CardContent>
                <h3 className="font-semibold">Muesli with Mango</h3>
                <p className="text-sm text-gray-500">5.0 · Vegasa · Fruits</p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <Image
                alt="Avocado and Egg Sandwich"
                className="rounded-t-xl"
                height="150"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/150",
                  objectFit: "cover",
                }}
                width="300"
              />
              <CardContent>
                <h3 className="font-semibold">Avocado and Egg Sandwich</h3>
                <p className="text-sm text-gray-500">
                  4.0 · Vegan Cafe · Sandwich
                </p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <Image
                alt="Avocado Pesto Pasta"
                className="rounded-t-xl"
                height="150"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/150",
                  objectFit: "cover",
                }}
                width="300"
              />
              <CardContent>
                <h3 className="font-semibold">Avocado Pesto Pasta</h3>
                <p className="text-sm text-gray-500">5.0 · Cafeteria · Pasta</p>
              </CardContent>
            </Card>
            <Card className="w-full">
              <Image
                alt="Burger with Hamon"
                className="rounded-t-xl"
                height="150"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "300/150",
                  objectFit: "cover",
                }}
                width="300"
              />
              <CardContent>
                <h3 className="font-semibold">Burger with Hamon</h3>
                <p className="text-sm text-gray-500">
                  4.5 · Beefer Club · Burger
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <aside className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">My order</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between">
              <span>1 x Greek Salad</span>
              <span>€34</span>
            </div>
            <div className="flex justify-between">
              <span>2 x Grilled Fish</span>
              <span>€52</span>
            </div>
            <div className="flex justify-between">
              <span>1 x Beef Steak</span>
              <span>€48</span>
            </div>
            <div className="flex justify-between">
              <span>1 x Ramen</span>
              <span>€29</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-8">
            <PizzaIcon />
            <div>
              <p className="font-semibold">Delivery</p>
              <p className="text-sm text-gray-500">30-40 min</p>
            </div>
            <span>€5</span>
          </div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold">Total Amount:</h3>
            <span className="text-xl font-bold">€168</span>
          </div>
          <Button className="w-full bg-green-500 text-white">Checkout</Button>
        </aside>
      </main>
    </div>
  );
}
