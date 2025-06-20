
import React from 'react';
import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface BulkActionsBarProps {
  totalCount: number;
  selectedCount: number;
  allSelected: boolean;
  onSelectAll: () => void;
  onApproveSelected: () => void;
  onRejectSelected: () => void;
}

const BulkActionsBar = React.memo(({ 
  totalCount, 
  selectedCount, 
  allSelected, 
  onSelectAll, 
  onApproveSelected, 
  onRejectSelected 
}: BulkActionsBarProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={allSelected}
              onCheckedChange={onSelectAll}
            />
            <span className="text-sm font-medium">
              Selecionar todos ({totalCount})
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={onApproveSelected}
              disabled={selectedCount === 0}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Aprovar Selecionados
            </Button>
            <Button
              onClick={onRejectSelected}
              disabled={selectedCount === 0}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Rejeitar Selecionados
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

BulkActionsBar.displayName = 'BulkActionsBar';

export default BulkActionsBar;
