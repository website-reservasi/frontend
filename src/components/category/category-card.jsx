import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    category.category_packages.length > 0 && (
      <Card className="max-w-xs rounded-none border-none shadow-lg md:max-w-[350px]">
        <CardContent className="flex flex-col justify-center gap-2 p-[10px]">
          <img
            src={category.images[0]}
            alt={category.name}
            className="object-cover md:h-52 md:w-80"
          />
          <div className="flex w-full flex-col gap-4">
            <p className="text-2xl font-normal">{category.name}</p>
            <Link
              to={`/category/${category.id}`}
              className={cn(buttonVariants(), "font-bold")}
            >
              Detail
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  );
}

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    category_packages: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
