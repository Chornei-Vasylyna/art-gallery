import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

type ArtworkPaginationProps = {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

export const ArtworkPagination = ({
	page,
	totalPages,
	onPageChange,
}: ArtworkPaginationProps) => {
	if (totalPages <= 1) return null;

	return (
		<nav
			aria-label="pagination"
			className="flex items-center justify-center gap-1 pt-2 mt-6"
		>
			<Button
				variant="ghost"
				size="sm"
				disabled={page === 1}
				onClick={() => onPageChange(page - 1)}
			>
				<ChevronLeftIcon />
				<span className="hidden sm:inline">Previous</span>
			</Button>

			{Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
				<Button
					key={n}
					variant={n === page ? "outline" : "ghost"}
					size="icon"
					aria-current={n === page ? "page" : undefined}
					onClick={() => onPageChange(n)}
				>
					{n}
				</Button>
			))}

			<Button
				variant="ghost"
				size="sm"
				disabled={page === totalPages}
				onClick={() => onPageChange(page + 1)}
			>
				<span className="hidden sm:inline">Next</span>
				<ChevronRightIcon />
			</Button>
		</nav>
	);
};