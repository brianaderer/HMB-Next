import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import fetch from 'cross-fetch';

// Initialize Apollo Client
const client = new ApolloClient({
    link: new HttpLink({ uri: process.env.NEXT_PUBLIC_WORDPRESS_URL + '/' + process.env.GRAPHQL_ENDPOINT , fetch }),
    cache: new InMemoryCache(),
});

// GraphQL Mutation
const CREATE_GUEST_BOOK_ENTRY = gql`
    mutation MyMutation($beam: Float, $boat_name: String, $boat_type: String, $draft: Float, $year_make_model: String, $boat_length_loa: Float, $email: String, $full_name: String, $message: String, $phone_number: String) {
      createGuestBookEntry(
        input: {guestBookEntry: {beam: $beam, boat_name: $boat_name, boat_type: $boat_type, draft: $draft, year_make_model: $year_make_model, boat_length_loa: $boat_length_loa, email: $email, full_name: $full_name, message: $message, phone_number: $phone_number}}
      ) {
        success
      }
    }
`;

export default async function handler(req, res) {
    try {
        const { body } = req; // Extract the body from the request
        console.log(body);
        // const variables = {
        //     beam: parseFloat(body.beam),
        //     boat_name: body["boat-name"],
        //     boat_type: body["hull-plan"],
        //     draft: parseFloat(body.draft),
        //     year_make_model: body["year-make-model"],
        //     boat_length_loa: parseFloat(body["boat-length-loa"]),
        //     email: body.email,
        //     full_name: body["full-name"],
        //     message: body.message,
        //     phone_number: body["phone-number"]
        // };
        // // Execute GraphQL Mutation
        // const response = await client.mutate({
        //     mutation: CREATE_GUEST_BOOK_ENTRY,
        //     variables: variables
        // });
        //
        const response = {data: 'good'};
        return res.status(200).json(response.data); // Return the response data
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
}


