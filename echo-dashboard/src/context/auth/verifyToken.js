import API from '../../utils/API';

export default function verifyToken({ token: token }) {
  const isValid = verify(token);
  return isValid.then((data) => {
    return data;
  });
}

async function verify(token) {
  try {
    const res = await API.get(`/admins/profile?token=${token}`);
    if (res.status === 200) {
      localStorage.setItem('admin', JSON.stringify(res.data.admin._id));
      return true;
    }
  } catch (error) {
    return false;
  }
}
