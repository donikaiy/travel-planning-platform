import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import {Button} from "../ui/button"
import React from "react";

type DeleteDialogProps = {
    buttonName: string;
    title: string;
    description: string;
    id: number;
    deleteMutation: any;
}

const DeleteDialog = ({buttonName, title, description, id, deleteMutation}: DeleteDialogProps) => {
    const [open, setOpen] = React.useState(false)

    const handleDelete = () => {
        deleteMutation.mutate(id)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="font-medium font-[Figtree] text-gray-800">{buttonName}</DialogTrigger>
            <DialogContent className="flex flex-col items-center gap-4">
                <DialogHeader className="flex flex-col items-center gap-2">
                    <DialogTitle className="text-2xl font-medium font-[Figtree] text-gray-800">{title}</DialogTitle>
                    <DialogDescription className="text-md font-medium font-[Figtree] text-gray-700 text-center">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button size="lg" type="button" variant="secondary"
                                className="text-md font-medium font-[Figtree]">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button size="lg" type="button" onClick={handleDelete} disabled={deleteMutation.isPending}
                            className="text-md font-medium font-[Figtree] bg-red-600 hover:bg-red-500">Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDialog
