import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, EyeIcon } from "lucide-react";
import type { TaskActionMenuProps } from "@/modules/task/types/task";

export function TaskActionMenu({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onViewDetail,
  showViewDetail = false,
}: TaskActionMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div
        className={`absolute z-20 min-w-[120px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg`}
      >
        {showViewDetail && onViewDetail && (
          <Button
            variant="ghost"
            size="xs"
            onClick={onViewDetail}
            className="w-full justify-start"
          >
            <EyeIcon className="mr-2 h-3.5 w-3.5" />
            Detail
          </Button>
        )}
        <Button
          variant="ghost"
          size="xs"
          onClick={onEdit}
          className="w-full justify-start"
        >
          <PencilIcon className="mr-2 h-3.5 w-3.5" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="xs"
          onClick={onDelete}
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-800"
        >
          <TrashIcon className="mr-2 h-3.5 w-3.5" />
          Delete
        </Button>
      </div>
    </>
  );
}
