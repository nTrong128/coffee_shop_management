"use client";
import { Button } from "@/components/ui/button";
import { CustomerType, GiftType, Role } from "@/types";
import { Gift } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ExchangeGiftDialog } from "./exchange-gift";
import { UpdateExchangeGift } from "./update-exchange-dialog";
import { DeleteExchageDialog } from "./delete-exchange-dialog";
import { useCurrentUser } from "@/hooks/use-current-user";

export function ExchangeTable(props: {
  gifts: GiftType[];
  customers: CustomerType[];
}) {
  const gifts = props.gifts;
  const user = useCurrentUser();
  const [selected, setSelected] = useState<GiftType>();
  const [open, setOpen] = useState(false);
  return (
    <>
      <p className="text-3xl text-center my-2 font-semibold">
        Menu quà đổi điểm
      </p>
      <div className="lg:grid xl:grid-cols-4 grid-cols-3 sm:block">
        {gifts.map((gift: GiftType) => (
          <div
            key={gift.gift_id}
            className="flex flex-col justify-between rounded-2xl p-4 m-2 shadow-md"
          >
            <div
              className="flex flex-col gap-y-4 hover:opacity-75"
              onClick={() => {
                setSelected(gift);
                setOpen(true);
              }}
            >
              <p className="text-3xl font-semibold text-center my-2">
                {gift.gift_name}
              </p>
              <div className="h-72">
                {gift.gift_image ? (
                  <Image
                    loading="lazy"
                    className="mx-auto"
                    alt="quà"
                    src={gift?.gift_image}
                    width={280}
                    height={280}
                  />
                ) : (
                  <div>
                    <Gift size={"2xl"} />
                  </div>
                )}
              </div>
              <div className="mt-4">
                <p>Giá quy đổi: {gift.gift_price}</p>
                <p className="italic mt-2">{gift.gift_desc}</p>
              </div>
            </div>
            {user?.role === Role.ADMIN && (
              <div className="flex justify-around mx-4 mt-4 gap-4">
                <UpdateExchangeGift gift={gift} />
                <DeleteExchageDialog gift={gift} />
              </div>
            )}
          </div>
        ))}
      </div>
      {selected && (
        <ExchangeGiftDialog
          gift={selected}
          open={open}
          setOpen={setOpen}
          customers={props.customers}
        />
      )}
    </>
  );
}
