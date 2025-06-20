
import React from 'react';

interface VideoThumbnailProps {
  src: string;
  alt: string;
  className?: string;
}

const VideoThumbnail = React.memo(({ src, alt, className = "w-32 h-20 object-cover rounded-lg flex-shrink-0" }: VideoThumbnailProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
});

VideoThumbnail.displayName = 'VideoThumbnail';

export default VideoThumbnail;
