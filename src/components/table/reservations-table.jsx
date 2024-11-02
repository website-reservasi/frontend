import { reservationService } from "@/services/reservation-service";
import { useQuery } from "@tanstack/react-query";
import Loading from "../ui/loading";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, dateFormat, timeFormat } from "@/lib/utils";
import { Badge } from "../ui/badge";
import SetReservationSuccess from "../reservations/set-reservation-success";
import SetReservationCancel from "../reservations/set-reservation-cancel";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

export default function ReservationsTable() {
  const {
    data: reservations,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => reservationService.getReservations(),
    queryKey: ["reservations"],
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16 text-center">No</TableHead>
          <TableHead className="w-32 text-center">ID Reservasi</TableHead>
          <TableHead className="w-36 text-center">Customer</TableHead>
          <TableHead className="w-40 text-center">Tanggal</TableHead>
          <TableHead className="w-16 text-center">Waktu</TableHead>
          <TableHead className="text-center">Kategori</TableHead>
          <TableHead className="text-center">Paket</TableHead>
          <TableHead className="w-32 text-center">Status</TableHead>
          <TableHead className="w-64 text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.data.length > 0 ? (
          reservations.data.map((reservation, index) => {
            const rsrvStatus =
              reservation.status === "success"
                ? "Selesai"
                : reservation.status === "cancelled"
                  ? "Dibatalkan"
                  : "Pending";

            const isCancelled = rsrvStatus === "Dibatalkan";
            const isSuccess = rsrvStatus === "Selesai";

            return (
              <TableRow key={index}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell className="text-center">{reservation.id}</TableCell>
                <TableCell className="text-center">
                  {reservation.user.name}
                </TableCell>
                <TableCell className="text-center">
                  {dateFormat(reservation.date)}
                </TableCell>
                <TableCell className="text-center">
                  {timeFormat(reservation.timeSlot.time)}
                </TableCell>
                <TableCell className="text-center">
                  {reservation.category.name}
                </TableCell>
                <TableCell className="text-center">
                  {reservation.categoryPackage.name}
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={cn(
                      "bg-yellow-500",
                      isSuccess && "bg-green-500",
                      isCancelled && "bg-red-500",
                    )}
                  >
                    {rsrvStatus}
                  </Badge>
                </TableCell>
                <TableCell className="flex flex-wrap items-center justify-center gap-2 text-center">
                  {reservation.status === "pending" ? (
                    <div className="inline-flex gap-2">
                      <SetReservationCancel id={reservation.id} />
                      {reservation.transactions.status === "paid" && (
                        <SetReservationSuccess id={reservation.id} />
                      )}
                    </div>
                  ) : null}
                  {reservation.status === "success" && (
                    <Link
                      to={`/dashboard/reservations/${reservation.id}/detail`}
                      className={cn(buttonVariants({ size: "sm" }))}
                    >
                      Detail
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center text-muted-foreground"
            >
              Tidak ada data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
