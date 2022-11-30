import { atom, useAtom } from "jotai";

type ConnectionError = {
  title: string,
  description: string,
}

const filterAtom = atom<string>("");

export const useFilter = () => {
  const [filter, setFilter] = useAtom(filterAtom);

  return {
    filter,
    setFilter,
  };
};

const sortAtom = atom<boolean>(false);

export const useSort = () => {
  const [sort, setSort] = useAtom(sortAtom);

  const toggleSort = () => setSort(!sort);

  return {
    sort,
    toggleSort,
  };
};

export const favouritesAtom = atom<boolean>(false);

export const useFavourites = () => {
  const [showFavourites, setShowFavourites] = useAtom(favouritesAtom);

  const toggleFavourites = () => setShowFavourites(!showFavourites);

  return {
    showFavourites,
    toggleFavourites,
  };
};

export const errorAtom = atom<ConnectionError | null>(null);

export const useError = () => {
  const [error, setError] = useAtom(errorAtom);

  const setTimeoutError = (error: ConnectionError) => {
    setError(error);
    setTimeout(() => setError(null), 5000);
  };

  return {
    error,
    setError: setTimeoutError,
  };
};

export const userAtom = atom<string | null>(null);

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);

  return {
    user,
    setUser,
  };
};
