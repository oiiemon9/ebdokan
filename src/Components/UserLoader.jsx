'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, loadUser } from '@/store/userSlice';

export default function UserLoader() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.user.user);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session?.user?.id) {
      dispatch(clearUser());
      return;
    }

    // ইতিমধ্যে একই user থাকলে আবার fetch করবে না
    if (reduxUser?.userId === session.user.id) {
      return;
    }

    dispatch(loadUser(session.user.id));
  }, [status, session, reduxUser, dispatch]);

  return null;
}
