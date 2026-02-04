import { useSelector, shallowEqual } from 'react-redux';

export const useAppSelector = (selector) => useSelector(selector, shallowEqual);