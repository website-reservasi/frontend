import { CalendarRange } from "lucide-react";
import {
  WhatsAppIcon,
  TiktokIcon,
  FacebookIcon,
  InstagramIcon,
} from "../icons";
import { Store } from "lucide-react";
import { Book } from "lucide-react";
import { Clock3 } from "lucide-react";
import { Blocks } from "lucide-react";
import { CreditCard } from "lucide-react";
import { LucideBookOpen } from "lucide-react";
import { NotebookPen } from "lucide-react";

const links = [
  {
    label: "Beranda",
    path: "/",
  },
  {
    label: "Kategori",
    path: "/category",
  },
  {
    label: "Galeri",
    path: "/gallery",
  },
  {
    label: "Hubungi",
    path: "/contact",
  },
];

const contacts = [
  {
    icon: WhatsAppIcon,
    social: "0898-8500-034",
  },
  {
    icon: TiktokIcon,
    social: "Infokus_id",
  },
  {
    icon: FacebookIcon,
    social: "Infokus.id",
  },
  {
    icon: InstagramIcon,
    social: "infokus.studio",
  },
];

const sidebarLinks = [
  {
    icon: CalendarRange,
    label: "Jadwal Hari Ini",
    path: "/dashboard/today-schedule",
  },
  {
    icon: Store,
    label: "Kategori",
    path: "/dashboard/categories",
  },
  {
    icon: Book,
    label: "Paket",
    path: "/dashboard/packages",
  },
  {
    icon: Blocks,
    label: "Tambahan",
    path: "/dashboard/addons",
  },
  {
    icon: Clock3,
    label: "Waktu",
    path: "/dashboard/times",
  },
  {
    icon: LucideBookOpen,
    label: "Reservasi",
    path: "/dashboard/reservations",
  },
  {
    icon: CreditCard,
    label: "Transaksi",
    path: "/dashboard/transactions",
  },
  {
    icon: NotebookPen,
    label: "Ulasan",
    path: "/dashboard/reviews",
  },
];

export { links, contacts, sidebarLinks };
