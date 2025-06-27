import React from 'react';

interface ActivityFeedItemProps {
  /**
   * The icon component to display, e.g., from lucide-react.
   * Recommended size: h-4 w-4
   */
  icon: React.ReactElement;
  /**
   * The main text describing the activity.
   */
  text: string;
  /**
   * The timestamp for the activity, e.g., "5m ago".
   */
  timestamp: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ icon, text, timestamp }) => {
  console.log('ActivityFeedItem loaded');

  return (
    <div className="flex items-center justify-between py-3 px-2 rounded-md transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          {/* We clone the icon element to ensure it has the correct size and styling */}
          {React.cloneElement(icon, { className: "h-4 w-4" })}
        </div>
        <p className="text-sm text-foreground">
          {text}
        </p>
      </div>
      <p className="text-xs text-muted-foreground whitespace-nowrap">
        {timestamp}
      </p>
    </div>
  );
};

export default ActivityFeedItem;