import { PlayCircle, Video } from 'lucide-react';

interface LessonProps {
  title: string;
  duration: string;
  onPlay: () => void;
  isCurrent?: boolean;
}

export function Lesson({
  title,
  duration,
  onPlay,
  isCurrent = false,
}: LessonProps) {
  return (
    <button
      onClick={onPlay}
      data-active={isCurrent}
      disabled={isCurrent}
      className='flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:hover:text-zinc-100 transition duration-300'
    >
      {isCurrent ? (
        <PlayCircle className='text-emerald-400' size={16} />
      ) : (
        <Video className='text-zinc-500' size={16} />
      )}

      <span>{title}</span>

      <span className='ml-auto font-mono text-xs text-zinc-500'>
        {duration}
      </span>
    </button>
  );
}
