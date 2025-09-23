import { deleteSession, getSession } from '@/lib/sessions';
import { NextResponse } from 'next/server';

export const GET = async () => {
   const session = await getSession();
   return NextResponse.json(session);
};

export const DELETE = async () => {
   await deleteSession();

   return NextResponse.json({ success: true });
};
