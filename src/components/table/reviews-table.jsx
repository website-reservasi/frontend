import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { reviewService } from "@/services/review-service";
import Loading from "../ui/loading";

export default function ReviewsTable() {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => reviewService.getReviews(),
    queryKey: ["reviews"],
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
          <TableHead className="w-36">Customer</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Paket</TableHead>
          <TableHead>Review</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reviews.data.length > 0 ? (
          reviews.data.map((review, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">
                {review.reservation.id}
              </TableCell>
              <TableCell>{review.user.name}</TableCell>
              <TableCell>{review.reservation.category.name}</TableCell>
              <TableCell>{review.reservation.categoryPackage.name}</TableCell>
              <TableCell className="max-w-56 truncate whitespace-pre-line">
                {review.review}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
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
