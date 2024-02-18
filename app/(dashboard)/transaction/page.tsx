import {CoffeeCard} from "@/components/content/coffee-card";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {CurrentUser} from "@/lib/auth";

const Transaction = () => {
  return (
    <div className="flex flex-row m-2 p-4 gap-x-2">
      <aside className="flex">
        <span>ASIDE CONTENTTTTTTTTTTTTTTT</span>
      </aside>
      <main className="flex flex-wrap gap-2">
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
      </main>
    </div>
  );
};

export default Transaction;
