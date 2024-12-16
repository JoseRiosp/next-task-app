'use client'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../../../../store/slices/userSlice";

export default function Layout({children}) {
    const dispatch = useDispatch();
    const { status } = useSelector((state)=>state.users);

useEffect(() => {
    if(status === 'idle'){
    dispatch(getUsers());
    }
}, [dispatch, status])

    return (
        <section>
            {children}
        </section>
    );
}