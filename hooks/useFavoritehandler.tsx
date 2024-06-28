import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '@/lib/redux/slices/booksSlice'; // Ganti dengan path yang sesuai

import { RootState } from '@/lib/redux/store'

const useFavoriteHandler = (dataId: number) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.book.favorites); // Ganti sesuai dengan state Anda
  const isFavorites = favorites.includes(Number(dataId));

  const handleFavorite = useCallback(() => {
    if (isFavorites) {
      dispatch(removeFromFavorites(Number(dataId)));
    } else {
      dispatch(addToFavorites(Number(dataId)));
    }
  }, [dispatch, isFavorites, dataId]);

  return { isFavorites, handleFavorite };
};

export default useFavoriteHandler;
