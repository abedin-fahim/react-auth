import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request }) => {
  const params = new URL(request.url).searchParams;
  const mode = params.get('mode') || 'login';

  if (mode !== 'login' && mode !== 'signup') {
    return json({ message: 'Unsupported mode' }, { status: 422 })
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password')
  }

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(authData)
  })

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    return json({ message: 'Could not authenticate user.' }, { status: 500 })
  }

  const responseData = await response.json();
  const token = responseData.token;

  localStorage.setItem('token', token);

  return redirect('/');
}