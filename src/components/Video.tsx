import { Loader } from 'lucide-react';
import ReactPlayer from 'react-player';
import { useCurrentLesson, useStore } from '../zustand-store';

export function Video() {
  const { currentLesson } = useCurrentLesson();
  const { isLoading, next } = useStore((store) => {
    return {
      isLoading: store.isLoading,
      next: store.next,
    };
  });

  function handlePlayNext() {
    next();
  }

  return (
    <div className='w-full bg-zinc-950 aspect-video'>
      {isLoading ? (
        <div className='flex h-full items-center justify-center'>
          <Loader className='text-zinc-400 animate-spin' size={24} />
        </div>
      ) : (
        <ReactPlayer
          width='100%'
          height='100%'
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
          onEnded={handlePlayNext}
          playing
          controls
        />
      )}
    </div>
  );
}
