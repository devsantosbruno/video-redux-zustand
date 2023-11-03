import ReactPlayer from 'react-player';
import { useAppSelector } from '../store';

export function Video() {
  const lesson = useAppSelector((state) => {
    const { lessonIndex, moduleIndex } = state.player.current;

    const currentLesson =
      state.player.course.modules[moduleIndex].lessons[lessonIndex];

    return currentLesson;
  });

  return (
    <div className='w-full bg-zinc-950 aspect-video'>
      <ReactPlayer
        width='100%'
        height='100%'
        url={`https://www.youtube.com/watch?v=${lesson.id}`}
        controls
      />
    </div>
  );
}
