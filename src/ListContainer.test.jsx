import {
  render, fireEvent,
} from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import ListContainer from './ListContainer';
import { deleteTask } from './actions';

jest.mock('react-redux');

test('ListContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    tasks: [
      { id: 1, title: '아무것도 하지 않기 #1' },
      { id: 2, title: '아무것도 하지 않기 #2' },
    ],
  }));

  const { getByText, getAllByText } = render(<ListContainer />);

  expect(getByText(/아무것도 하지 않기 #1/)).not.toBeNull();

  fireEvent.click(getAllByText('완료')[0]);

  expect(dispatch).toBeCalledWith(deleteTask(1));
});
