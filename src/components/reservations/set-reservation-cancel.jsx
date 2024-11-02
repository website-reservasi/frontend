import PropTypes from "prop-types";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reservationService } from "@/services/reservation-service";
import { toast } from "sonner";
import { useState } from "react";

export default function SetReservationCancel({ id }) {
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const setCancelMutation = useMutation({
    mutationFn: () => reservationService.setCancel(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries("reservations");
      toast(data.message);
      setIsProcessing(false);
    },
    onError: (error) => {
      toast(error.message);
      console.error(error.message);
      setIsProcessing(false);
    },
  });

  const handleSetSuccess = async () => {
    setIsProcessing(true);
    try {
      await setCancelMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Batal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apakah anda yakin?</DialogTitle>
          <DialogDescription>
            Reservasi akan dibatalkan. Tindakan ini tidak dapat diurungkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row items-center justify-center gap-2 lg:justify-end">
          <DialogClose asChild>
            <Button variant="outline">Tidak</Button>
          </DialogClose>
          <Button onClick={handleSetSuccess} isLoading={isProcessing}>
            Ya
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

SetReservationCancel.propTypes = {
  id: PropTypes.number.isRequired,
};
