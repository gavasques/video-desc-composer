
import { useQuery } from "@tanstack/react-query";

export const useDashboardData = () => {
  return useQuery({
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
  });
};
