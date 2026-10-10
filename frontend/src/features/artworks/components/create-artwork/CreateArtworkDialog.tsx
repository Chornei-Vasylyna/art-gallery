import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/shared/components/ui/dialog";
import { CreateArtworkForm } from "./CreateArtworkForm";

export const CreateArtworkDialog = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				<Plus className="size-4" />
				New artwork
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>New artwork</DialogTitle>
						<DialogDescription>
							Fill in the details to add an artwork to the collection.
						</DialogDescription>
					</DialogHeader>
					<CreateArtworkForm
						onSuccess={() => setOpen(false)}
						onCancel={() => setOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
};
