import gql from "graphql-tag";

const GET_SHOP = gql`
  query {
    shop {
      name
    }
  }
`;

export { GET_SHOP };
