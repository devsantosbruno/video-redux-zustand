import { describe, expect, it } from 'vitest';
import { PlayerState, next, play, player as reducer } from './player';

const exampleState: PlayerState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: 'Iniciando com React',
        lessons: [
          { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
          {
            id: 'w-DW4DhDfcw',
            title: 'Estilização do Post',
            duration: '10:05',
          },
        ],
      },
      {
        id: 2,
        title: 'Estrutura da aplicação',
        lessons: [
          {
            id: 'gE48FQXRZ_o',
            title: 'Componente: Comment',
            duration: '13:45',
          },
          { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
        ],
      },
    ],
  },
  current: {
    moduleIndex: 0,
    lessonIndex: 0,
  },
};

describe('player slice', () => {
  it('should be able to play', () => {
    const state = reducer(exampleState, play([1, 2]));

    expect(state.current.moduleIndex).toEqual(1);
    expect(state.current.lessonIndex).toEqual(2);
  });

  it('should be able to play next video automatically', () => {
    const state = reducer(exampleState, next());

    expect(state.current.moduleIndex).toEqual(0);
    expect(state.current.lessonIndex).toEqual(1);
  });

  it('should be able to jump to the next module automatically', () => {
    const state = reducer(
      {
        ...exampleState,
        current: {
          ...exampleState.current,
          lessonIndex: 1,
        },
      },
      next()
    );

    expect(state.current.moduleIndex).toEqual(1);
    expect(state.current.lessonIndex).toEqual(0);
  });

  it('should not update the current module and lesson index if there is not next lesson available', () => {
    const state = reducer(
      {
        ...exampleState,
        current: {
          moduleIndex: 1,
          lessonIndex: 1,
        },
      },
      next()
    );

    expect(state.current.moduleIndex).toEqual(1);
    expect(state.current.lessonIndex).toEqual(1);
  });
});
