"use client";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Table, TableCell, TableRow} from "@/components/ui/table";
import {CustomerType, GiftType} from "@/types";
import {startTransition, useState} from "react";
import {useCurrentUser} from "@/hooks/use-current-user";
import {useToast} from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {ExchangeGift} from "@/actions/gift";

export function ExchangeGiftDialog(props: {
  gift: GiftType;
  open: boolean;
  setOpen: (open: boolean) => void;
  customers: CustomerType[];
}) {
  const currentUser = useCurrentUser();

  const staff_id = currentUser!.id;
  const customers = props.customers;
  const {gift, open, setOpen} = props;
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState<CustomerType>();
  const [openAlert, setOpenAlert] = useState(false);
  const [pending, setPending] = useState(false);
  const {toast} = useToast();
  const filteredCustomers = customers.filter(
    (customers) =>
      customers.customer_name.includes(searchText) ||
      (customers.customer_phone &&
        customers.customer_phone.includes(searchText))
  );

  const onSubmit = async () => {
    startTransition(async () => {
      setPending(true);
      ExchangeGift({
        customer_id: selected!.customer_id,
        gift_id: gift.gift_id,
        staff_id: staff_id,
      }).then((data) => {
        if (data.success) {
          setOpen(false);
          setOpenAlert(false);
          toast({
            title: "Thành công",
            description: data.success,
          });
        } else {
          toast({
            title: "Lỗi",
            description: data.error,
          });
        }
        setPending(false);
      });
    });
  };

  return (
    <>
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
                <TableRow
                  key={customer.customer_id}
                  onClick={() => {
                    setOpen(false);
                    setSelected(customer);
                    setOpenAlert(true);
                  }}>
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

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogTitle>Xác nhận đổi quả</AlertDialogTitle>
          <div>
            Bạn có chắc chắn muốn đổi quà{" "}
            <span className="font-semibold">{gift.gift_name}</span> cho{" "}
            <span className="font-semibold">{selected?.customer_name}</span>
          </div>
          <div className="flex justify-between gap-4">
            <AlertDialogCancel asChild>
              <Button
                className="text-black  hover:text-red-500"
                onClick={() => {
                  setOpenAlert(false);
                  setOpen(true);
                }}>
                Hủy
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button disabled={pending} onClick={onSubmit}>
                Xác nhận
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
