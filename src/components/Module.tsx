import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { useStore } from '../zustand-store';
import { Lesson } from './Lesson';

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const { play, lessons, current } = useStore((store) => {
    return {
      lessons: store.course?.modules[moduleIndex].lessons,
      play: store.play,
      current: {
        moduleIndex: store.current.moduleIndex,
        lessonIndex: store.current.lessonIndex,
      },
    };
  });

  return (
    <Collapsible.Root className='group' defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className='flex w-full items-center gap-3 p-4 bg-zinc-800 hover:bg-zinc-600 transition duration-300'>
        <span className='flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs'>
          {moduleIndex + 1}
        </span>

        <div className='flex flex-col gap-1 text-left'>
          <strong className='text-sm'>{title}</strong>
          <span className='text-xs text-zinc-400'>{amountOfLessons} aulas</span>
        </div>

        <ChevronDown
          className='ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform duration-300'
          size={20}
        />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className='relative flex flex-col gap-4 p-6'>
          {lessons?.map((item, lessonIndex) => {
            const isCurrent =
              current.moduleIndex === moduleIndex &&
              current.lessonIndex === lessonIndex;

            return (
              <Lesson
                key={item.id}
                title={item.title}
                duration={item.duration}
                onPlay={() => play([moduleIndex, lessonIndex])}
                isCurrent={isCurrent}
              />
            );
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
