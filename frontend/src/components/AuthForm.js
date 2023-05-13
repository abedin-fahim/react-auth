import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';

import classes from './AuthForm.module.css';
import { Fragment } from 'react';

function AuthForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'

  const data = useActionData();

  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login'

  return (
    <Fragment>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        {/* {data && data.errors && (
          <ul>
            {Object.keys(data.errors).map(error => <li key={error}>{error}</li>)}
          </ul>
        )} */}
        {data && data.message && <p>{data.message}</p>}

        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Save'}</button>
        </div>
      </Form>
    </Fragment>
  );
}

export default AuthForm;
