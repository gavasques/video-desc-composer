
import React from "react";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useApprovalQueue } from "@/hooks/useApprovalQueue";
import BulkActionsBar from "@/components/approval/BulkActionsBar";
import PendingUpdateCard from "@/components/approval/PendingUpdateCard";

const ApprovalQueue = () => {
  const {
    pendingUpdates,
    selectedUpdates,
    handleSelectUpdate,
    handleSelectAll,
    handleApproveSelected,
    handleRejectSelected,
    approveSingleUpdate,
    rejectSingleUpdate
  } = useApprovalQueue();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fila de Aprovação</h2>
          <p className="text-gray-600">
            Revise e aprove atualizações antes de aplicá-las no YouTube
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            {pendingUpdates.length} pendentes
          </Badge>
          <Badge variant="outline" className="text-sm">
            {selectedUpdates.length} selecionados
          </Badge>
        </div>
      </div>

      {/* Bulk Actions */}
      {pendingUpdates.length > 0 && (
        <BulkActionsBar
          totalCount={pendingUpdates.length}
          selectedCount={selectedUpdates.length}
          allSelected={selectedUpdates.length === pendingUpdates.length}
          onSelectAll={handleSelectAll}
          onApproveSelected={handleApproveSelected}
          onRejectSelected={handleRejectSelected}
        />
      )}

      {/* Pending Updates List */}
      <div className="space-y-4">
        {pendingUpdates.map((update) => (
          <PendingUpdateCard
            key={update.id}
            update={update}
            isSelected={selectedUpdates.includes(update.id)}
            onSelect={(checked) => handleSelectUpdate(update.id, checked)}
            onApprove={() => approveSingleUpdate(update.id)}
            onReject={() => rejectSingleUpdate(update.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {pendingUpdates.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma atualização pendente
          </h3>
          <p className="text-gray-500">
            Todas as atualizações foram processadas ou não há alterações na fila
          </p>
        </div>
      )}
    </div>
  );
};

export default ApprovalQueue;
