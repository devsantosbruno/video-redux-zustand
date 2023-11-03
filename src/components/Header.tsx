import { useAppSelector } from '../store';

export function Header() {
  const { currentModule, currentLesson } = useAppSelector((state) => {
    const { lessonIndex, moduleIndex } = state.player.current;

    const currentModule = state.player.course.modules[moduleIndex];
    const currentLesson = currentModule.lessons[lessonIndex];

    return { currentModule, currentLesson };
  });

  return (
    <div className='flex flex-col gap-1'>
      <h1 className='text-2xl font-bold'>{currentLesson.title}</h1>
      <span className='text-sm text-zinc-400'>
        Módulo "{currentModule.title}"
      </span>
    </div>
  );
}
