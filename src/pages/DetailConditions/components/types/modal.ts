export type TModalMode = "region" | "job";

export type TColumnData = {
  title: string;
  data: string[];
};

export type TSelectedItems = Record<number, string | string[]>;

export type TSearchResult = {
  text: string;
  fullPath: string;
  columnIndex: number;
  isSelected: boolean;
};

export type TModalData = {
  columns: TColumnData[];
};

export type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: TModalData;
  onAreaSelect?: (area: string) => void;
  onConfirm?: (selectedAreas: string[]) => void;
};

export type TValidationResult = {
  isValid: boolean;
  message: string;
};
