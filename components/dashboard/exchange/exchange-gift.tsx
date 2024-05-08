"use client";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Table, TableCell, TableRow} from "@/components/ui/table";
import {CustomerType, GiftType} from "@/types";
import {useState} from "react";

export function ExchangeGiftDialog(props: {
  gift: GiftType;
  open: boolean;
  setOpen: (open: boolean) => void;
  customers: CustomerType[];
}) {
  const customers = props.customers;
  const {gift, open, setOpen} = props;
  const [searchText, setSearchText] = useState("");

  const filteredCustomers = customers.filter(
    (customers) =>
      customers.customer_name.includes(searchText) ||
      customers.customer_phone?.includes(searchText)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Chọn khách hàng đổi thưởng</DialogTitle>
        <div className="min-h-80 max-h-80 overflow-y-scroll">
          <Input
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            type="text"
            placeholder="Tìm kiếm..."
            className="my-4 mx-auto w-5/6 rounded-2xl py-2 border border-gray-300 focus:ring-2"
          />
          <Table className="">
            {filteredCustomers.map((customer: CustomerType, index: any) => (
              <TableRow key={customer.customer_id} onClick={() => {}}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{customer.customer_name}</TableCell>
                <TableCell>{customer.customer_phone}</TableCell>
                <TableCell>{customer.customer_point}</TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
