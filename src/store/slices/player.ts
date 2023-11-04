import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '..';
import { api } from '../../lib/axios';

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
}

const initialState: PlayerState = {
  course: null,
  current: {
    moduleIndex: 0,
    lessonIndex: 0,
  },
  isLoading: true,
};

export const loadCourse = createAsyncThunk('player/load', async () => {
  const response = await api.get('/courses/1');
  return response.data;
});

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
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
  extraReducers(builder) {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    });
  },
});

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { lessonIndex, moduleIndex } = state.player.current;

    const currentModule = state.player.course?.modules[moduleIndex];
    const currentLesson = currentModule?.lessons[lessonIndex];

    return { currentModule, currentLesson };
  });
};
