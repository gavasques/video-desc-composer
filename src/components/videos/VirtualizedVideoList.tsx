
import React, { memo, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { VideoData } from '@/hooks/useOptimizedVideoManager';
import { Block } from '@/types/block';
import VideoCard from './VideoCard';

interface VirtualizedVideoListProps {
  videos: VideoData[];
  getAppliedGeneralBlocks: (video: VideoData) => Block[];
  getSpecificBlocks: (video: VideoData) => Block[];
  onViewDescription: (video: VideoData) => void;
  onPreviewBlocks: (video: VideoData) => void;
  onEditBlocks: (video: VideoData) => void;
  onToggleAutoUpdate: (videoId: string) => void;
  height: number;
}

interface ItemData {
  videos: VideoData[];
  getAppliedGeneralBlocks: (video: VideoData) => Block[];
  getSpecificBlocks: (video: VideoData) => Block[];
  onViewDescription: (video: VideoData) => void;
  onPreviewBlocks: (video: VideoData) => void;
  onEditBlocks: (video: VideoData) => void;
  onToggleAutoUpdate: (videoId: string) => void;
}

const VideoItem = memo<{ index: number; style: React.CSSProperties; data: ItemData }>(
  ({ index, style, data }) => {
    const video = data.videos[index];
    
    return (
      <div style={style}>
        <div className="px-2 pb-4">
          <VideoCard
            video={video}
            appliedGeneralBlocks={data.getAppliedGeneralBlocks(video)}
            specificBlocks={data.getSpecificBlocks(video)}
            onViewDescription={data.onViewDescription}
            onPreviewBlocks={data.onPreviewBlocks}
            onEditBlocks={data.onEditBlocks}
            onToggleAutoUpdate={data.onToggleAutoUpdate}
          />
        </div>
      </div>
    );
  }
);

VideoItem.displayName = 'VideoItem';

const VirtualizedVideoList = memo<VirtualizedVideoListProps>(({
  videos,
  getAppliedGeneralBlocks,
  getSpecificBlocks,
  onViewDescription,
  onPreviewBlocks,
  onEditBlocks,
  onToggleAutoUpdate,
  height
}) => {
  const itemData = useMemo(() => ({
    videos,
    getAppliedGeneralBlocks,
    getSpecificBlocks,
    onViewDescription,
    onPreviewBlocks,
    onEditBlocks,
    onToggleAutoUpdate
  }), [
    videos,
    getAppliedGeneralBlocks,
    getSpecificBlocks,
    onViewDescription,
    onPreviewBlocks,
    onEditBlocks,
    onToggleAutoUpdate
  ]);

  return (
    <List
      height={height}
      width="100%"
      itemCount={videos.length}
      itemSize={200}
      itemData={itemData}
    >
      {VideoItem}
    </List>
  );
});

VirtualizedVideoList.displayName = 'VirtualizedVideoList';

export default VirtualizedVideoList;
