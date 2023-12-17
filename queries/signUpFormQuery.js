import {gql} from "@apollo/client";

export const signUpFormQuery = gql`
  query GetPageData{
    globalSignUpForm
}
`;