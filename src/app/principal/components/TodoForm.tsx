import { SubmitHandler, useForm } from 'react-hook-form';

import TitleIcon from '@assets/icons/title.svg?react';

interface Todo {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high'
}

const TodoForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const onSubmit: SubmitHandler<Todo> = (data) => {
    // dispatch(signin(data));
  };

  return (
    <form className="form-login mb-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <div className="input-wrapper">
          <TitleIcon className="prev-icon" />
          <input
            type="text"
            name="title"
            id="title"
            className="input"
            placeholder="Title"
            { ...register("title") }
          />
        </div>
        <p className="txt-red error-msg">{ errors?.title?.message }</p>
      </div>
    </form>
  );
};

export default TodoForm;
