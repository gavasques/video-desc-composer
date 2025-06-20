
export interface Block {
  id: string;
  title: string;
  content: string;
  type: 'static' | 'category' | 'specific';
  category?: string;
  videoId?: string;
  isActive: boolean;
  order: number;
  affectedVideos: number;
  lastModified: string;
  schedule?: {
    type: 'permanent' | 'specific';
    startDate?: Date;
    endDate?: Date;
  };
}

export interface BlockFormData {
  title: string;
  content: string;
  type: 'static' | 'category' | 'specific';
  category: string;
  videoId: string;
  order: number;
  schedule: {
    type: 'permanent' | 'specific';
    startDate?: Date;
    endDate?: Date;
  };
}
