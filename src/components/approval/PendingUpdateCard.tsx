
import React from 'react';
import { Play, Pause, AlertCircle, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import VideoThumbnail from "@/components/common/VideoThumbnail";
import { PendingUpdate } from "@/hooks/useApprovalQueue";

interface PendingUpdateCardProps {
  update: PendingUpdate;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onApprove: () => void;
  onReject: () => void;
}

const PendingUpdateCard = React.memo(({ update, isSelected, onSelect, onApprove, onReject }: PendingUpdateCardProps) => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'add': return <Play className="w-4 h-4 text-green-600" />;
      case 'remove': return <Pause className="w-4 h-4 text-red-600" />;
      case 'update': return <AlertCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'add': return 'bg-green-100 text-green-800';
      case 'remove': return 'bg-red-100 text-red-800';
      case 'update': return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
          />
          
          <VideoThumbnail
            src={update.videoThumbnail}
            alt={update.videoTitle}
            className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {update.videoTitle}
                </h3>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className={getActionColor(update.action)}>
                    {getActionIcon(update.action)}
                    <span className="ml-1 capitalize">{update.action}</span>
                  </Badge>
                  <Badge variant="outline">
                    {update.blockTitle}
                  </Badge>
                  <Badge className={getPriorityColor(update.priority)}>
                    {update.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(update.createdAt).toLocaleString('pt-BR')}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Preview da Atualização</DialogTitle>
                      <DialogDescription>
                        Compare o antes e depois da descrição
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Antes</h4>
                        <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto">
                          <pre className="text-sm whitespace-pre-wrap font-mono">
                            {update.currentDescription}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Depois</h4>
                        <div className="bg-green-50 p-4 rounded-lg h-64 overflow-y-auto">
                          <pre className="text-sm whitespace-pre-wrap font-mono">
                            {update.newDescription}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button
                  onClick={onApprove}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aprovar
                </Button>
                
                <Button
                  onClick={onReject}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PendingUpdateCard.displayName = 'PendingUpdateCard';

export default PendingUpdateCard;
