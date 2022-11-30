async function fetchGraphQL(text: string, variables: any) {
  // Fetch data from SpaceX GraphQL API:
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    }
  );
  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;
