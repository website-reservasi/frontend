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
import { packageService } from "@/services/package-service";
import DeletePackage from "../package/delete-package";

export default function PackagesTable() {
  const {
    data: packages,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: () => packageService.getPackages(),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (!packages || packages.data.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">No</TableHead>
            <TableHead className="w-36">Nama Paket</TableHead>
            <TableHead className="w-48">Kategori</TableHead>
            <TableHead>Deskripsi</TableHead>
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
          <TableHead className="w-36">Nama Paket</TableHead>
          <TableHead className="w-48">Kategori</TableHead>
          <TableHead>Deskripsi</TableHead>
          <TableHead className="w-48">Harga</TableHead>
          <TableHead className="w-48 text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {packages.data.map((pack, index) => (
          <TableRow key={pack.id}>
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell>{pack.name}</TableCell>
            <TableCell>{pack.category.name}</TableCell>
            <TableCell className="whitespace-pre-line">
              {pack.description}
            </TableCell>
            <TableCell>{rupiahFormat(pack.price)}</TableCell>
            <TableCell className="flex flex-wrap items-center justify-center gap-2 text-center">
              <Link
                to={`/dashboard/packages/${pack.id}`}
                className={cn(buttonVariants(), "lg:font-bold")}
              >
                Ubah
              </Link>
              <DeletePackage packageId={pack.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
