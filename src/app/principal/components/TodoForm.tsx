import { useEffect } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import TitleIcon from '@assets/icons/title.svg?react';
import DescriptionIcon from '@assets/icons/description.svg?react';
import BookmarkIcon from '@assets/icons/bookmark.svg?react';
import StatusIcon from '@assets/icons/status.svg?react';
import CalendarIcon from '@assets/icons/calendar.svg?react';

import SelectBox from '@shared/components/partials/Select';
import { reset, createTodo } from 'app/principal/slices/todoSlice';
import { useAppDispatch, useAppSelector } from 'app/stores/hook';
import { useDialog } from '@shared/contexts/dialog.context';
import { TYPE_PREFIX } from '../slices/todo-slice-prefix';

interface Todo {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  status: 'new' | 'in-progress' | 'complete';
}

const TodoForm = ({ formRef }) => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => state.todo);
  const { closeDialog } = useDialog();
  const defaultValues = {
    title: '',
    description: '',
    priority: 'low',
    dueDate: new Date(),
    status: 'new'
  }
  const {
    register,
    control,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues
  });

  useEffect(() => {
    if (todo.data && todo.type === TYPE_PREFIX.TODO.CREATE) {
      console.log(123123123123);
      dispatch(reset());
      closeDialog();
    }
  }, [todo.data]);

  const saveTodo: SubmitHandler<Todo> = (data) => {
    dispatch(createTodo(data));
  };

  return (
    <form className="form-todo mb-8" onSubmit={handleSubmit(saveTodo)} ref={ formRef }>
      <div className="form-group">
        <div className="form-control">
          <TitleIcon className="prev-icon" />
          <input
            type="text"
            name="title"
            id="title"
            className="form-field"
            placeholder="Title"
            { ...register("title") }
          />
        </div>
        <p className="txt-red error-msg">{ errors?.title?.message }</p>
      </div>
      <div className="form-group">
        <div className="form-control align-items-start">
          <DescriptionIcon className="prev-icon" />
          <textarea
            name="description"
            id="description"
            className="form-field"
            placeholder="Description"
            rows={ 5 }
            { ...register("description") }
          />
        </div>
      </div>
      <SelectBox
        name="priority"
        formRegister={ register("priority") }
        setFormValue={ setValue }
        options={[
          {
            name: 'Low',
            value: 'low'
          },
          {
            name: 'Medium',
            value: 'medium'
          },
          {
            name: 'High',
            value: 'high'
          }
        ]}
        preIcon={ <BookmarkIcon /> }
        selectedValue={ defaultValues.priority }
      />
      <div className="form-group">
        <div className="form-control">
          <Controller
            control={ control }
            name="dueDate"
            render={({ field }) => (
              <DatePicker
                showIcon
                className="form-field cursor-pointer"
                calendarClassName="calendar-picker-popup"
                placeholderText="Select date"
                onChange={ (date) => field.onChange(date) }
                onKeyDown={ (event) => event.preventDefault() }
                selected={ field.value }
                icon={ <CalendarIcon className="prev-icon txt-xl" /> }
              />
            )}
          />
        </div>
      </div>
      <SelectBox
        name="status"
        formRegister={ register("status") }
        setFormValue={ setValue }
        options={[
          {
            name: 'New',
            value: 'new'
          },
          {
            name: 'In progress',
            value: 'in-progress'
          },
          {
            name: 'Done',
            value: 'done'
          }
        ]}
        preIcon={ <StatusIcon /> }
        selectedValue={ defaultValues.status }
      />
    </form>
  );
};

export default TodoForm;
