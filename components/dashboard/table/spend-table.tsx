"use client";
import {Input} from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
  PaginationItem,
} from "@/components/ui/pagination";

import {formatDate} from "@/lib/DateTime";
import {formatCurrency} from "@/lib/formatCurrency";
import {useState} from "react";

export function SpendTable(props: {spending: any}) {
  const [searchText, setSearchText] = useState("");
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  const filteredSpending = props.spending.filter((spend: any) => {
    return (
      (spend?.spending_name || "")
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      (spend?.spending_desc || "")
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      (spend?.staff.name || "").toLowerCase().includes(searchText.toLowerCase())
    );
  });

  if (!props.spending) {
    return (
      <div className="text-center p-4 bg-gray-100 rounded-lg">
        Không có dữ liệu
      </div>
    );
  }

  return (
    <>
      <Input
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        placeholder="Tìm kiếm..."
        className="mx-2 my-4 w-full sm:w-5/12 rounded-full px-4 py-2 border border-gray-300 focus:ring-2"
      />
      <Table className="border rounded mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Tên chi tiêu</TableHead>
            <TableHead>Đơn giá</TableHead>
            <TableHead>Nội dung</TableHead>
            <TableHead>Ngày lập</TableHead>
            <TableHead>Người lập</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSpending
            .slice(startIndex, endIndex)
            .map((spend: any, index: any) => {
              return (
                <TableRow key={spend.spending_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{spend.spending_name}</TableCell>
                  <TableCell>{formatCurrency(spend.spending_price)}</TableCell>
                  <TableCell>{spend.spending_desc}</TableCell>
                  <TableCell>{formatDate(spend.createAt)}</TableCell>
                  <TableCell>{spend.staff.name}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        {/* //TODO CREATE SUMMARIZE HERE */}
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              <div className="flex justify-center">
                <span className="font-semibold">Tổng cộng:</span>
                <span className="ml-2 font-semibold">
                  {formatCurrency(
                    props.spending.reduce(
                      (acc: any, spend: {spending_price: any}) =>
                        acc + spend.spending_price,
                      0
                    )
                  )}
                </span>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {/* // TODO: ADD BUTTON PAGINATION{(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)} */}
            <PaginationPrevious
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                if (startIndex > 0) {
                  setStartIndex(startIndex - rowsPerPage);
                  setEndIndex(endIndex - rowsPerPage);
                }
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                endIndex >= filteredSpending.length
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={() => {
                if (endIndex < filteredSpending.length) {
                  setStartIndex(startIndex + rowsPerPage);
                  setEndIndex(endIndex + rowsPerPage);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
