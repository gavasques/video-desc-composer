
import React, { useEffect, useState, memo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PerformanceMetrics {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  memoryUsage?: number;
}

interface PerformanceMonitorProps {
  componentName: string;
  enabled?: boolean;
}

const PerformanceMonitor = memo<PerformanceMonitorProps>(({ 
  componentName, 
  enabled = process.env.NODE_ENV === 'development' 
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0
  });

  useEffect(() => {
    if (!enabled) return;

    const startTime = performance.now();
    
    setMetrics(prev => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      const newRenderCount = prev.renderCount + 1;
      const newAverageRenderTime = (prev.averageRenderTime * prev.renderCount + renderTime) / newRenderCount;

      return {
        renderCount: newRenderCount,
        lastRenderTime: renderTime,
        averageRenderTime: newAverageRenderTime,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || undefined
      };
    });
  });

  if (!enabled) return null;

  return (
    <Card className="mb-4 border-orange-200 bg-orange-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-orange-800">
          Performance Monitor - {componentName}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            Renders: {metrics.renderCount}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Last: {metrics.lastRenderTime.toFixed(2)}ms
          </Badge>
          <Badge variant="outline" className="text-xs">
            Avg: {metrics.averageRenderTime.toFixed(2)}ms
          </Badge>
          {metrics.memoryUsage && (
            <Badge variant="outline" className="text-xs">
              Memory: {(metrics.memoryUsage / 1024 / 1024).toFixed(1)}MB
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

PerformanceMonitor.displayName = 'PerformanceMonitor';

export default PerformanceMonitor;
