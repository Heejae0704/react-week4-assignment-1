import { render, fireEvent } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import ListContainer from './ListContainer';

jest.mock('react-redux');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ListContainer', () => {
  context('할 일 목록이 없으면', () => {
    it('할 일이 없다는 메시지가 보인다.', () => {
      useSelector.mockImplementation((selector) => selector({
        tasks: [],
      }));

      const { container } = render((
        <ListContainer />
      ));

      expect(container).toHaveTextContent(('할 일이 없어요!'));
    });
  });

  context('할 일 목록이 있으면', () => {
    const tasks = [
      { id: 1, title: 'Task-1' },
      { id: 2, title: 'Task-2' },
    ];

    it('할 일 목록이 보인다.', () => {
      useSelector.mockImplementation((selector) => selector({
        tasks,
      }));

      const { container, getAllByRole } = render((
        <ListContainer />
      ));

      expect(getAllByRole('listitem')).toHaveLength(2);

      tasks.forEach((task) => {
        expect(container).toHaveTextContent(task.title);
      });
    });

    describe('완료 버튼 클릭', () => {
      it('할 일을 삭제한다.', () => {
        useSelector.mockImplementation((selector) => selector({
          tasks,
        }));

        const dispatch = jest.fn();

        useDispatch.mockImplementation(() => dispatch);

        const { getAllByText } = render((
          <ListContainer />
        ));

        const completeButtons = getAllByText('완료');

        fireEvent.click(completeButtons[0]);

        expect(dispatch).toBeCalledWith({
          type: 'deleteTask',
          payload: {
            id: 1,
          },
        });
      });
    });
  });
});
