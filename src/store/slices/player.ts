import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '..';

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
}

const initialState: PlayerState = {
  course: null,
  current: {
    moduleIndex: 0,
    lessonIndex: 0,
  },
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<Course>) => {
      state.course = action.payload;
    },

    play: (state, action: PayloadAction<[number, number]>) => {
      state.current.moduleIndex = action.payload[0];
      state.current.lessonIndex = action.payload[1];
    },

    next: (state) => {
      const nextLessonIndex = state.current.lessonIndex + 1;
      const nextLesson =
        state.course?.modules[state.current.moduleIndex].lessons[
          nextLessonIndex
        ];

      if (nextLesson) {
        state.current.lessonIndex = nextLessonIndex;
      } else {
        const nextModuleIndex = state.current.moduleIndex + 1;
        const nextModule = state.course?.modules[nextModuleIndex];

        if (nextModule) {
          state.current.moduleIndex = nextModuleIndex;
          state.current.lessonIndex = 0;
        }
      }
    },
  },
});

export const player = playerSlice.reducer;
export const { start, play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { lessonIndex, moduleIndex } = state.player.current;

    const currentModule = state.player.course?.modules[moduleIndex];
    const currentLesson = currentModule?.lessons[lessonIndex];

    return { currentModule, currentLesson };
  });
};
