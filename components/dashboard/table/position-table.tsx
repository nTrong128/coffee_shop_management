import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import {PositionType} from "@/types";
import {UpdatePositionDialog} from "../dialogs/update-position-form";
import {DeletePositionDialog} from "../dialogs/delete-position-dialog";

export function PositionTable(props: {position: PositionType[]}) {
  if (!props.position) {
    return (
      <div className="text-center p-4 bg-gray-100 rounded-lg">
        Không có dữ liệu
      </div>
    );
  }
  return (
    <Table className="border rounded mx-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">STT</TableHead>
          <TableHead>Tên chức vụ</TableHead>
          <TableHead>Ghi chú</TableHead>
          <TableHead>Tác vụ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.position.map((position: PositionType, index) => {
          return (
            <TableRow key={position.position_id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{position.position_name}</TableCell>
              <TableCell>{position.position_desc}</TableCell>
              <TableCell className="flex gap-x-4">
                <UpdatePositionDialog position={position} />
                <DeletePositionDialog position={position} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
