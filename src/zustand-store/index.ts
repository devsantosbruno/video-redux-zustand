import axios from 'axios';
import { create } from 'zustand';

interface Course {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{ id: string; title: string; duration: string }>;
  }>;
}

export interface PlayerState {
  course: Course | null;
  current: {
    moduleIndex: number;
    lessonIndex: number;
  };
  isLoading: boolean;

  play: (moduleAndLessonIndex: [number, number]) => void;
  next: () => void;
  load: () => Promise<void>;
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    current: {
      moduleIndex: 0,
      lessonIndex: 0,
    },
    isLoading: true,

    load: async () => {
      set({ isLoading: true });

      const response = await axios
        .get('https://api.npoint.io/89582992c665a6675442/courses')
        .then((response) => response.data[0]);

      set({
        course: response,
        isLoading: false,
      });
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex;

      set({
        current: {
          moduleIndex: moduleIndex,
          lessonIndex: lessonIndex,
        },
      });
    },

    next: () => {
      const { course, current } = get();

      const nextLessonIndex = current.lessonIndex + 1;
      const nextLesson =
        course?.modules[current.moduleIndex].lessons[nextLessonIndex];

      if (nextLesson) {
        set({
          current: {
            ...current, //PODE DAR CAGADA
            // moduleIndex: current.moduleIndex, //PODE DAR CAGADA
            lessonIndex: nextLessonIndex,
          },
        });
      } else {
        const nextModuleIndex = current.moduleIndex + 1;
        const nextModule = course?.modules[nextModuleIndex];

        if (nextModule) {
          set({
            current: {
              moduleIndex: nextModuleIndex,
              lessonIndex: 0,
            },
          });
        }
      }
    },
  };
});

export const useCurrentLesson = () => {
  return useStore((state) => {
    const { lessonIndex, moduleIndex } = state.current;

    const currentModule = state.course?.modules[moduleIndex];
    const currentLesson = currentModule?.lessons[lessonIndex];

    return { currentModule, currentLesson };
  });
};
