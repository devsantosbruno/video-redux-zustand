import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '..';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    course: {
      modules: [
        {
          id: '1',
          title: 'Iniciando com React',
          lessons: [
            { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
            {
              id: 'w-DW4DhDfcw',
              title: 'Estilização do Post',
              duration: '10:05',
            },
            {
              id: 'D83-55LUdKE',
              title: 'Componente: Header',
              duration: '06:33',
            },
            {
              id: 'W_ATsETujaY',
              title: 'Componente: Sidebar',
              duration: '09:12',
            },
            { id: 'Pj8dPeameYo', title: 'CSS Global', duration: '03:23' },
            {
              id: '8KBq2vhwbac',
              title: 'Form de comentários',
              duration: '11:34',
            },
          ],
        },
        {
          id: '2',
          title: 'Estrutura da aplicação',
          lessons: [
            {
              id: 'gE48FQXRZ_o',
              title: 'Componente: Comment',
              duration: '13:45',
            },
            { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
            {
              id: 'h5JA3wfuW1k',
              title: 'Interações no JSX',
              duration: '06:33',
            },
            {
              id: '1G0vSTqWELg',
              title: 'Utilizando estado',
              duration: '09:12',
            },
          ],
        },
      ],
    },
    current: {
      moduleIndex: 0,
      lessonIndex: 0,
    },
  },
  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.current.moduleIndex = action.payload[0];
      state.current.lessonIndex = action.payload[1];
    },

    next: (state) => {
      const nextLessonIndex = state.current.lessonIndex + 1;
      const nextLesson =
        state.course.modules[state.current.moduleIndex].lessons[
          nextLessonIndex
        ];

      if (nextLesson) {
        state.current.lessonIndex = nextLessonIndex;
      } else {
        const nextModuleIndex = state.current.moduleIndex + 1;
        const nextModule = state.course.modules[nextModuleIndex];

        if (nextModule) {
          state.current.moduleIndex = nextModuleIndex;
          state.current.lessonIndex = 0;
        }
      }
    },
  },
});

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { lessonIndex, moduleIndex } = state.player.current;

    const currentModule = state.player.course.modules[moduleIndex];
    const currentLesson = currentModule.lessons[lessonIndex];

    return { currentModule, currentLesson };
  });
};
