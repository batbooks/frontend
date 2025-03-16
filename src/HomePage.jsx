import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount } from './redux/infoSlice';

export default function HomePage(){
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return(
        <>
        <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
        <div>
        <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
      </div>
        
        
        </>
    )
}