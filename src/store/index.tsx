import AsyncStorage from '@react-native-async-storage/async-storage';
import {create, createStore} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface IGlobalStore {
  categories: ICategory[];
  tasks: ITask[];
  setCategories: (category: ICategory) => void;
}

const useGlobalStore = create<IGlobalStore>()(
  persist(
    (set, get) => ({
      categories: [
        {
          id: 1,
          name: 'text',
          title: 'REact NAtive',
          description: 'y you chose coding',
          time: '12 Feb 2018',
        },
        {
          id: 2,
          name: 'text',
          title: 'Java ',
          description: 'y you chose coding',
          time: '12 Feb 2017',
        },
      ],
      tasks: [],
      setCategories: (category: ICategory) =>
        set(state => ({categories: [...state.categories, category]})),
      removeTodo: (id: number) =>
        set(state => ({
          categories: state?.categories.filter(item => item.id !== id),
        })),
    }),
    {
      name: 'todo-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useGlobalStore;
