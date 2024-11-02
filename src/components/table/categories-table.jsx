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
import { categoryService } from "@/services/category-service";
import { Link } from "react-router-dom";
import Loading from "../ui/loading";
import DeleteCategory from "../category/delete-category";
import { cn } from "@/lib/utils";

export default function CategoriesTable() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getCategories(),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (!categories || categories.data.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24 text-center">No</TableHead>
            <TableHead className="text-center">Nama Kategori</TableHead>
            <TableHead className="text-center">Foto</TableHead>
            <TableHead className="w-48 text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={4}
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
          <TableHead>Nama Kategori</TableHead>
          <TableHead className="hidden text-center lg:table-cell">
            Foto
          </TableHead>
          <TableHead className="w-48 text-center">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.data.map((category, index) => (
          <TableRow key={category.id}>
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell className="hidden lg:table-cell">
              <img
                src={category.images[0]}
                alt={`${category.name} Image`}
                className="mx-auto h-32 w-48 object-cover"
              />
            </TableCell>
            <TableCell className="flex flex-wrap items-center justify-center gap-2 text-center">
              <Link
                to={`/dashboard/categories/${category.id}`}
                className={cn(buttonVariants(), "lg:font-bold")}
              >
                Ubah
              </Link>
              <DeleteCategory categoryId={category.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
