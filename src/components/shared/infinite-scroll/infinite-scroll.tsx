import { ILoadingPrimary } from '@/components/shared';
import { ReactElement, ReactNode, useEffect, useRef } from 'react';

export interface InfiniteScrollProps {
  // Required
  fetchMore(): void;
  hasMore: boolean | undefined;
  isLoading: boolean | undefined;

  children?: ReactNode | ReactElement;
  loader?: ReactNode | ReactElement;

  className?: string;
  endMessage?: ReactNode | ReactElement;
}

/**
 *
 * @param fetchMore: function fetch more
 * @param isLoading: is loading
 * @param className: custom className for wraper InfiniteScroll
 * @returns children
 */

export const InfiniteScroll = ({
  children,
  loader,
  fetchMore,
  hasMore,
  endMessage,
  className,
  isLoading,
}: InfiniteScrollProps) => {
  const pageEndRef = useRef(null);
  useEffect(() => {
    if (hasMore) {
      const observer = new IntersectionObserver((entries) => {
        // Check if elemnt exist on viewport?
        if (entries[0].isIntersecting) {
          // If true => call fetchMore function
          fetchMore();
        }
      });

      if (pageEndRef.current) {
        observer.observe(pageEndRef.current);
      }

      return () => {
        if (pageEndRef.current) {
          observer.unobserve(pageEndRef.current);
        }
      };
    }
  }, [hasMore]);
  return (
    <>
      <div className={className}>
        {children}

        {hasMore ? <div ref={pageEndRef}>{loader}</div> : endMessage}
      </div>
      {isLoading && <ILoadingPrimary />}
    </>
  );
};
