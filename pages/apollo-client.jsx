import { React, useState } from 'react';
import { UserDetail } from '../components/UserDetail';
import { gql, useQuery, useLazyQuery } from '@apollo/client';

const query = gql`
  query Countries($code:String!){
    countries(filter:{code:{eq:$code}}){
      name,
      code
    }
  }`;


export default function ApolloClient() {

  const [code, setCode] = useState('');
  // const { loading, error, data } = useQuery(query, { variables: { email:'johndoe@graphcms.com' } });
  const [getUserDetailByApolloClientAPICall, { loading, error, data }] = useLazyQuery(query, { variables: { code } });

  if (error) return <div> Error ! </div>;

  return (
    <div className='flex w-full h-3/4'>
      <div className='flex flex-col justify-evenly rounded-lg shadow-xl w-1/2 p-4 m-4 bg-gray-900'>
        <h2 className="text-center text-white font-medium text-2xl mb-4 self-start ">
          APOLLO CLIENT CALL
        </h2>
        <input
          className="border-2 outline-none p-2 rounded-md"
          type="text"
          placeholder="Code"
          value={code}
          onChange={(e) => { setCode(e.target.value); }}
        />
        <button
          className="flex justify-center p-2 rounded-md w-1/2 self-center bg-gray-800 text-white hover:bg-gray-700"
          onClick={() => getUserDetailByApolloClientAPICall()}
        >
          {
            loading ?
              <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
          }
          <span>
            APOLLO CLIENT
          </span>
        </button>
      </div>
      {
        data?.nextUser ? <UserDetail user={data.nextUser} /> : null

      }
    </div>
  );
}
