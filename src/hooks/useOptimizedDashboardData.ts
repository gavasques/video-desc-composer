
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useOptimizedDashboardData = () => {
  const dashboardQuery = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => Promise.resolve({
      totalVideos: 127,
      videosWithCustomBlocks: 89,
      totalBlocks: 23,
      categories: 8,
      recentActivity: [
        { id: 1, action: "Bloco estático atualizado", time: "5 min atrás", type: "update" },
        { id: 2, action: "Nova categoria criada", time: "1 hora atrás", type: "create" },
        { id: 3, action: "15 vídeos atualizados", time: "2 horas atrás", type: "batch" },
        { id: 4, action: "Bloco de categoria editado", time: "1 dia atrás", type: "update" }
      ],
      topCategories: [
        { name: "Tutoriais", videos: 34, color: "bg-blue-500" },
        { name: "Reviews", videos: 28, color: "bg-green-500" },
        { name: "Vlogs", videos: 21, color: "bg-purple-500" },
        { name: "Gaming", videos: 18, color: "bg-orange-500" }
      ]
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Memoize computed stats to prevent unnecessary recalculations
  const computedStats = useMemo(() => {
    if (!dashboardQuery.data) return null;

    const data = dashboardQuery.data;
    return {
      ...data,
      automationRate: Math.round((data.videosWithCustomBlocks / data.totalVideos) * 100),
      averageBlocksPerVideo: Math.round(data.totalBlocks / data.totalVideos * 10) / 10,
    };
  }, [dashboardQuery.data]);

  return {
    data: computedStats,
    isLoading: dashboardQuery.isLoading,
    error: dashboardQuery.error,
    refetch: dashboardQuery.refetch
  };
};
