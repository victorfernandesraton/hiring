import { Chip } from "@material-ui/core";
import React, { memo } from "react";

export interface StockCompareBarItemProps {
  label: string;
  onDelete: (tip: string) => void;
  isDefault: boolean;
}
const StockCompareBarItem = ({
  label,
  onDelete,
  isDefault,
}: StockCompareBarItemProps) => (
  <Chip label={label} onDelete={() => onDelete(label)} disabled={isDefault} />
);

export default memo(StockCompareBarItem);
