import { React, useState } from 'react';
import { GRAPHCMS_URL, GRAPHCMS_PERMANENTAUTH_TOKEN } from '../lib/constants';
import { GraphQLClient, gql } from 'graphql-request';
import { UserDetail } from '../components/UserDetail';
const client = new GraphQLClient("https://graphql-pokemon2.vercel.app", {
  headers: {
    // Authorization: `Bearer ${GRAPHCMS_PERMANENTAUTH_TOKEN}`,
  },
});

const query = gql
  `query pokemon($name: String){
    pokemon(name: $name){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }`;

export default function GraphQLRequest() {
  const [name, setName] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getUserDetailByGraphQLRequestAPICall = async () => {
    try {
      setIsLoading(true);
      const variables = { name };
      console.log("varaibles",variables);
      const response = await client.request(query, variables);

      console.log('RESPONSE FROM GRAPHQL-REQUEST API CALL', response);
      if (response.pokemon) {
        setUserDetails(response.pokemon);
      }
    }
    catch (err) {
      console.log('ERROR FROM GRAPHQL-REQUEST API CALL', err);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex w-full h-3/4'>
      <div className='flex flex-col justify-evenly rounded-lg shadow-xl w-1/2 p-4 m-4 bg-gray-900'>
        <h2 className="text-center text-white font-medium text-2xl mb-4 self-start ">
          GRAPHQL REQUEST CALL
        </h2>
        <input
          className="border-2 outline-none p-2 rounded-md"
          type="text"
          placeholder="Type name"
          value={name}
          onChange={(e) => { setName(e.target.value); }}
        />
        <button
          className="
            flex justify-center
            p-2 rounded-md
          bg-gray-800  text-white hover:bg-gray-700 w-1/2 self-center"
          onClick={() => getUserDetailByGraphQLRequestAPICall()}
        >
          {
            isLoading ?
              <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" /> : null
          }
          <span>
            GraphQL Request
          </span>
        </button>
      </div>
    
      <UserDetail user={userDetails} />
    </div>
  );
}  