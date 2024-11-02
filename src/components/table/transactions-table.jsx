import { useQuery } from "@tanstack/react-query";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import Loading from "../ui/loading";
import { cn, rupiahFormat } from "@/lib/utils";
import { transactionService } from "@/services/transaction-service";
import { Badge } from "../ui/badge";

export default function TransactionsTable() {
  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionService.getTransactions(),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (!transactions || transactions.data.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">No</TableHead>
            <TableHead className="w-32 text-center">ID Reservasi</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="w-32">Metode Pelunasan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="hidden lg:table-cell">Kategori</TableHead>
            <TableHead className="hidden lg:table-cell">Paket</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={9}
              className="text-center text-muted-foreground"
            >
              Tidak ada data
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16 text-center">No</TableHead>
          <TableHead className="w-32 text-center">ID Reservasi</TableHead>
          <TableHead>User</TableHead>
          <TableHead className="text-center lg:w-64 lg:text-left">
            Metode Pelunasan
          </TableHead>
          <TableHead className="text-center lg:w-48 lg:text-left">
            Status
          </TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="hidden lg:table-cell">Kategori</TableHead>
          <TableHead className="hidden lg:table-cell">Paket</TableHead>
          <TableHead className="text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.data.map((trx, index) => {
          const trxStatus =
            trx.status === "paid"
              ? "Lunas"
              : trx.status === "expired"
                ? "Kadaluarsa"
                : "Belum Lunas";
          const trxType =
            trx.type === "fullpayment" ? "Pembayaran Lunas" : "DP 50%";
          const isPaid = trxStatus === "Lunas";
          const isExpired = trxStatus === "Kadaluarsa";

          const fullPayment = trx.type === "fullpayment";
          const dpPayment = trx.type === "downpayment";

          return (
            <TableRow key={trx.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">
                {trx.reservation.id}
              </TableCell>
              <TableCell>{trx.reservation.user.name}</TableCell>
              <TableCell className="text-center lg:text-left">
                <Badge
                  className={cn(
                    fullPayment && "bg-sky-500",
                    dpPayment && "bg-teal-500",
                    "text-center lg:text-left",
                  )}
                >
                  {trxType}
                </Badge>
              </TableCell>
              <TableCell className="text-center lg:text-left">
                <Badge
                  className={cn(
                    "bg-yellow-500",
                    isPaid && "bg-green-500",
                    isExpired && "bg-red-500",
                    "text-center lg:text-left",
                  )}
                >
                  {trxStatus}
                </Badge>
              </TableCell>
              <TableCell>{rupiahFormat(trx.total)}</TableCell>
              <TableCell className="hidden lg:table-cell">
                {trx.reservation.category.name}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {trx.reservation.categoryPackage.name}
              </TableCell>
              <TableCell className="text-center">
                <Link
                  to={`/dashboard/transactions/${trx.id}/detail`}
                  className={cn(buttonVariants(), "font-bold")}
                >
                  Detail
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
