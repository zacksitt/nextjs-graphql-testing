import React from 'react';
export const UserDetail = ({ user }) => {
  return (
    <>
      {
        Object.keys(user)?.length > 0 ?
          <div className='flex flex-col justify-evenly rounded-lg shadow-xl w-1/2 p-4 m-4 bg-gray-900 text-white'>
            <h2 className="text-center font-medium text-2xl mb-4 self-start ">
              USER DETAILS
            </h2>
            <div className="font-bold"> ID: {user.id} </div >
            <div className="font-bold"> Name: {user.name} </div >
            {/* <div> {user.email} </div> */}
            <div className="font-bold"> Resistant </div >
            {user.resistant.map((r) => <div key={r}> -- {r}</div>)}
            <div className="font-bold"> Weaknesses </div >
            {user.weaknesses.map((w) => <div key={w}> -- {w}</div>)}
          </div> : null
      }
    </>
  );
};
