import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addonsService } from "@/services/addons-service";
import { useQuery } from "@tanstack/react-query";
import Loading from "../ui/loading";
import { Link } from "react-router-dom";
import { cn, rupiahFormat } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import DeleteAddon from "../addons/delete-addon";

export default function AddonsTable() {
  const {
    data: addons,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["addons"],
    queryFn: () => addonsService.getAddons(),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (!addons || addons.data.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">No</TableHead>
            <TableHead>Nama Tambahan</TableHead>
            <TableHead className="w-48">Kategori</TableHead>
            <TableHead className="w-36">Unit</TableHead>
            <TableHead className="w-48">Harga</TableHead>
            <TableHead className="w-48 text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={6}
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
          <TableHead>Nama Tambahan</TableHead>
          <TableHead className="w-48">Kategori</TableHead>
          <TableHead className="w-36">Unit</TableHead>
          <TableHead className="w-48">Harga</TableHead>
          <TableHead className="w-48 text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {addons.data.map((addon, index) => (
          <TableRow key={addon.id}>
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell>{addon.name}</TableCell>
            <TableCell>{addon.category.name}</TableCell>
            <TableCell>{addon.unit}</TableCell>
            <TableCell>{rupiahFormat(addon.price)}</TableCell>
            <TableCell className="flex flex-wrap items-center justify-center gap-2 text-center">
              <Link
                to={`/dashboard/addons/${addon.id}`}
                className={cn(buttonVariants(), "lg:font-bold")}
              >
                Ubah
              </Link>
              <DeleteAddon addonId={addon.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
