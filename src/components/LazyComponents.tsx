
import { lazy } from 'react';

// Lazy load heavy tab components for better performance
export const LazyDashboard = lazy(() => import('./Dashboard'));
export const LazyBlockManager = lazy(() => import('./BlockManager'));
export const LazyCategoryManager = lazy(() => import('./CategoryManager'));
export const LazyVideoManager = lazy(() => import('./OptimizedVideoManager'));
export const LazyPendingVideos = lazy(() => import('./PendingVideos'));
export const LazyApprovalQueue = lazy(() => import('./ApprovalQueue'));
export const LazyScheduleManager = lazy(() => import('./ScheduleManager'));
